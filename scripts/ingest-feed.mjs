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
 * Encoding: feeds kan variere (ofte ISO-8859-1 / Windows-1252, men nogle er UTF-8).
 * Vi prøver først at aflæse `encoding=` fra XML-prologen; ellers vælger vi det decode der
 * ser mindst ud til at være "mojibake".
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

/** Hold synkron med src/lib/pokemonScope.ts (samme regex + rækkefølge). */
const EXCLUDE_OTHER_TCG =
  /yu[- ]?gi[- ]?oh|yugioh|遊戯王|magic\s*:\s*the\s*gathering|\bmagic\s*tg\b|\bmtg\b|\bdigimon\b|one[\s-]piece\s*(tcg|card|trading)?|flesh\s+and\s+blood|disney\s*lorcana|\blorcana\b|dragon\s*ball\s*(tcg|card)?|beyblade|weiss\s*schwarz|cardfight|vanguard|shadowverse|final\s*fantasy\s*tcg|warhammer|keyforge/i;
const INCLUDE_POKEMON =
  /pokemon|pokémon|pok\s*&\s*mon|pok[eé]mon|ポケモン|pocket\s*monsters/i;

function isPokemonProductText(blob) {
  const s = String(blob ?? "").trim();
  if (!s) return false;
  if (INCLUDE_POKEMON.test(s)) return true;
  if (EXCLUDE_OTHER_TCG.test(s)) return false;
  return false;
}

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
  return isPokemonProductText(
    `${p.title} ${p.description} ${p.merchant} ${p.feedSource}`,
  );
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

function countChar(s, ch) {
  let n = 0;
  for (let i = 0; i < s.length; i++) if (s[i] === ch) n++;
  return n;
}

function countMojibakeScore(s) {
  // Typiske mønstre når UTF-8 er blevet læst som latin1/iso-8859-1 (eller lign.).
  let score = 0;
  score += countChar(s, "Ã");
  score += countChar(s, "â");
  // Når UTF-8 emoji bytes (fx ðŸ…) bliver læst som latin1, ender det ofte som `ðŸ`-mønstre.
  score += countChar(s, "ð");
  score += countChar(s, "Ÿ");
  score += countChar(s, "�"); // replacement char

  const sequences = ["â€", "â€œ", "â€™", "â€“", "â€”", "â€¦", "Â"];
  for (const seq of sequences) {
    if (s.includes(seq)) score += 3;
  }

  return score;
}

function decodeXmlBuffer(buf) {
  // Mixed encoding:
  // Nogle feeds er "iso-8859-1" for bogstaver, men indeholder emoji/UTF-8 bytes.
  // Vi går derfor buffer'en igennem:
  // - Hvis der ligger en gyldig UTF-8-sekvens ved positionen, dekoder vi den som UTF-8.
  // - Ellers dekoder vi den enkelte byte som latin1 (samme byte->codepoint mapping).

  const decoderLatin1 = new TextDecoder("iso-8859-1", { fatal: false });
  const decoderUtf8Fatal = new TextDecoder("utf-8", { fatal: true });

  function utf8SeqLen(firstByte) {
    // Returnerer forventet længde hvis byte ser ud som en UTF-8 startbyte (valideres senere af decoder).
    if ((firstByte & 0xe0) === 0xc0) return 2;
    if ((firstByte & 0xf0) === 0xe0) return 3;
    if ((firstByte & 0xf8) === 0xf0) return 4;
    return 0;
  }

  const outParts = [];
  let i = 0;

  while (i < buf.length) {
    const first = buf[i];
    const seqLen = utf8SeqLen(first);

    if (seqLen && i + seqLen <= buf.length) {
      let contOk = true;
      for (let j = 1; j < seqLen; j++) {
        if ((buf[i + j] & 0xc0) !== 0x80) {
          contOk = false;
          break;
        }
      }

      if (contOk) {
        try {
          outParts.push(
            decoderUtf8Fatal.decode(buf.subarray(i, i + seqLen)),
          );
          i += seqLen;
          continue;
        } catch {
          // Fald tilbage til latin1 for denne byte.
        }
      }
    }

    // Gruppér non-UTF8-start-bytes for performance (latin1 decode på slices).
    const start = i;
    i += 1;
    while (i < buf.length && utf8SeqLen(buf[i]) === 0) i += 1;
    outParts.push(decoderLatin1.decode(buf.subarray(start, i)));
  }

  return outParts.join("");
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
    const xml = decodeXmlBuffer(buf);
    const mapped = parseFeedXml(xml, label);
    allMapped = allMapped.concat(mapped);
  }

  allMapped = dedupeById(allMapped);

  const withLinks = allMapped.filter((p) => p.affiliateUrl);
  const chosen = withLinks.filter(isPokemonRelevant);

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(chosen, null, 2), "utf-8");

  if (chosen.length === 0 && withLinks.length > 0) {
    console.warn(
      "[ingest-feed] ADVARSEL: 0 Pokémon-varer efter filter — products.json er tom. Tjek feeds eller filter.",
    );
  }

  console.log(
    `[ingest-feed] Skrev ${chosen.length} Pokémon-produkter til data/products.json (feeds: ${entries.length}, rækker: ${allMapped.length}, med link: ${withLinks.length}, efter Pokémon-filter: ${chosen.length}).`,
  );
}

main().catch((e) => {
  console.error("[ingest-feed]", e);
  process.exit(1);
});
