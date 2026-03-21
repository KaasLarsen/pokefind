#!/usr/bin/env node
/**
 * Henter ét eller flere Partner-ads XML-produktfeeds (dine rigtige partner-feeds)
 * og skriver data/products.json med felter der matcher ProductRecord (src/lib/productTypes.ts).
 *
 * Brug:
 *   FEED_URL="https://www.partner-ads.com/dk/feed_udlaes.php?..." node scripts/ingest-feed.mjs
 *   FEED_URLS="https://...feed1...,https://...feed2..." node scripts/ingest-feed.mjs
 *
 * Hvis FEED_URL(S) ikke er sat, læses `data/feeds.json` (liste over jeres partner-feeds).
 *
 * Encoding: feeds er ofte ISO-8859-1; vi læser som latin1 og parser derefter.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { XMLParser } from "fast-xml-parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outFile = path.join(root, "data", "products.json");
const feedsConfigFile = path.join(root, "data", "feeds.json");

function collectFeedEntries() {
  const single = process.env.FEED_URL?.trim() ?? "";
  const multi = process.env.FEED_URLS?.trim() ?? "";
  const fromMulti = multi
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (fromMulti.length) {
    return fromMulti.map((url, i) => ({ url, label: `feed-${i + 1}` }));
  }
  if (single) return [{ url: single, label: "feed-1" }];

  if (fs.existsSync(feedsConfigFile)) {
    try {
      const raw = JSON.parse(fs.readFileSync(feedsConfigFile, "utf-8"));
      const feeds = raw.feeds;
      if (Array.isArray(feeds)) {
        const out = [];
        for (let i = 0; i < feeds.length; i++) {
          const f = feeds[i];
          const url = typeof f === "string" ? f : f?.url;
          const label =
            (typeof f === "object" &&
              f &&
              typeof f.id === "string" &&
              f.id.trim()) ||
            `feed-${i + 1}`;
          if (url && /^https?:\/\//i.test(String(url))) {
            out.push({ url: String(url).trim(), label: String(label) });
          }
        }
        if (out.length) return out;
      }
    } catch (e) {
      console.error("[ingest-feed] Kunne ikke læse data/feeds.json:", e.message);
    }
  }
  return [];
}

const POKEMON_RE =
  /pokemon|pokémon|pok\s*&\s*mon|pok[eé]mon|tcg/i;

function toArray(v) {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

function str(x) {
  if (x == null) return "";
  if (typeof x === "string") return x.trim();
  return String(x).trim();
}

function pickUrl(p) {
  const keys = [
    "link",
    "url",
    "vareurl",
    "produkturl",
    "affiliateurl",
    "affiliate_link",
  ];
  for (const k of keys) {
    const u = str(p[k]);
    if (u && /^https?:\/\//i.test(u)) return u;
  }
  return "";
}

function pickImage(p) {
  const keys = [
    "billedurl",
    "billede",
    "billedeurl",
    "image",
    "imageurl",
    "img",
    "thumbnail",
  ];
  for (const k of keys) {
    const u = str(p[k]);
    if (u && /^https?:\/\//i.test(u)) return u;
  }
  return null;
}

function parsePrice(raw) {
  const s = str(raw).replace(/\s/g, "").replace(",", ".");
  const n = Number.parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

function normalizeProduct(raw, idx, feedLabel = "partner-ads") {
  const title =
    str(raw.produktnavn) ||
    str(raw.titel) ||
    str(raw.navn) ||
    `Produkt ${idx + 1}`;
  const description =
    str(raw.beskrivelse) || str(raw.description) || "";
  const merchant =
    str(raw.forhandler) || str(raw.brand) || "Ukendt forhandler";
  const affiliateUrl = pickUrl(raw);
  const imageUrl = pickImage(raw);
  const price = parsePrice(
    raw.nypris ??
      raw.Nypris ??
      raw.pris ??
      raw.Pris ??
      raw.price ??
      raw.glpris ??
      raw.Glpris,
  );
  const currency = str(raw.valuta || raw.currency || "DKK") || "DKK";
  const produktid = str(raw.produktid ?? raw.id ?? raw.ean ?? "");
  const id = produktid ? `${feedLabel}-${produktid}` : `${feedLabel}-${idx}`;

  return {
    id,
    title,
    description,
    price,
    currency: currency.length <= 5 ? currency : "DKK",
    imageUrl,
    merchant,
    affiliateUrl,
    feedSource: feedLabel,
    lastSeen: new Date().toISOString().slice(0, 10),
  };
}

function isPokemonRelevant(p) {
  const blob = `${p.title} ${p.description}`.toLowerCase();
  return POKEMON_RE.test(blob);
}

function parseFeedXml(xml, feedLabel) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true,
    // Store feeds har mange &amp; / specialtegn — standard max (1000) er for lavt.
    processEntities: {
      enabled: true,
      maxTotalExpansions: 10_000_000,
      maxEntityCount: 500_000,
    },
  });
  const doc = parser.parse(xml);

  const produkterRoot = doc.produkter ?? doc.products ?? doc.feed ?? doc;
  const rawList = toArray(
    produkterRoot?.produkt ?? produkterRoot?.product ?? [],
  );

  return rawList.map((r, i) => normalizeProduct(r, i, feedLabel));
}

function dedupeById(products) {
  const map = new Map();
  for (const p of products) {
    map.set(p.id, p);
  }
  return [...map.values()];
}

async function main() {
  const entries = collectFeedEntries();
  if (entries.length === 0) {
    console.log(
      "[ingest-feed] Ingen feeds fundet.\n  • Sæt FEED_URL eller FEED_URLS, eller\n  • Tilføj URL’er i data/feeds.json under \"feeds\".\n  Eksempel:\n  FEED_URL=\"https://www.partner-ads.com/dk/feed_udlaes.php?...\" npm run ingest:feed",
    );
    process.exit(0);
  }

  let allMapped = [];
  let feedIndex = 0;
  for (const { url, label } of entries) {
    feedIndex += 1;
    const res = await fetch(url);
    if (!res.ok) {
      console.error(
        `[ingest-feed] HTTP ${res.status} fra feed ${feedIndex} (${label}): ${url.slice(0, 80)}…`,
      );
      process.exit(1);
    }

    const buf = Buffer.from(await res.arrayBuffer());
    const xml = buf.toString("latin1");
    const mapped = parseFeedXml(xml, label);
    allMapped = allMapped.concat(mapped);
  }

  allMapped = dedupeById(allMapped);

  const withLinks = allMapped.filter((p) => p.affiliateUrl);
  const pokemon = withLinks.filter(isPokemonRelevant);

  const chosen = pokemon.length > 0 ? pokemon : withLinks;

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(chosen, null, 2), "utf-8");

  console.log(
    `[ingest-feed] Skrev ${chosen.length} produkter til data/products.json (feeds: ${entries.length}, rækker: ${allMapped.length}, med link: ${withLinks.length}, pokemon-filter: ${pokemon.length}).`,
  );
}

main().catch((e) => {
  console.error("[ingest-feed]", e);
  process.exit(1);
});
