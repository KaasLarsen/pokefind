import productsData from "../../data/products.json";
import type { Category } from "./content";
import { guides } from "./content";
import {
  isBlockedNonPokemonFranchiseQuery,
  isPokemonProductRecord,
} from "./pokemonScope";
import type { ProductRecord } from "./productTypes";

const productsRaw = productsData as ProductRecord[];
/** Kun varer der tydeligt er Pokémon — aldrig Yu-Gi-Oh, MTG m.m. */
const products = productsRaw.filter(isPokemonProductRecord);

const productById = new Map(products.map((p) => [p.id, p]));

/** Slå et enkelt produkt op fra den allerede filtrerede Pokémon-liste. */
export function getProductById(id: string): ProductRecord | undefined {
  return productById.get(id);
}

/**
 * Produkt-IDs vi bør indexere (subset).
 * I dag er det de produkter som allerede er featured i redaktionelle guides.
 */
export function getIndexableProductIds(limit = 200): string[] {
  const featured = new Set<string>();
  for (const g of guides) {
    for (const id of g.featuredProductIds ?? []) featured.add(id);
  }

  const featuredIds = [...featured].filter((id) => productById.has(id));

  // Kvalitets-filter: vi vil primært indexere sider hvor vi har billede og noget tekst.
  // Det giver bedre odds for at Google vælger dem til resultater i stedet for "thin" pages.
  const eligible = products
    .filter((p) => p.imageUrl && p.title.trim().length >= 5 && p.description.trim().length >= 20)
    .map((p) => p.id)
    .filter((id) => !featured.has(id));

  const remaining = Math.max(0, limit - featuredIds.length);
  return [...featuredIds, ...eligible.slice(0, remaining)].slice(0, limit);
}

/** Hent produkter efter id i samme rækkefølge som angivet (spring over ukendte id’er). */
export function getProductsByIds(ids: string[]): ProductRecord[] {
  const out: ProductRecord[] = [];
  for (const id of ids) {
    const p = productById.get(id);
    if (p) out.push(p);
  }
  return out;
}

function normalize(s: string) {
  return s.toLowerCase().trim();
}

export type HomepageCarouselTheme = "mixed" | "kort" | "lego" | "bamser";

const HOMEPAGE_CAROUSEL_KEYWORDS: Record<HomepageCarouselTheme, string[]> = {
  // "Mixed" samler alt vi forventer giver god visuel spredning.
  mixed: [
    // Kort/format
    "booster pack",
    "booster",
    "etb",
    "tin",
    "blister",
    "sleeves",
    // LEGO
    "lego",
    // Bamser/mjuke dyr
    "plush",
    "bamse",
    "squishmallows",
  ],
  kort: ["booster pack", "booster", "etb", "tin", "blister", "sleeves"],
  lego: ["lego"],
  bamser: ["plush", "bamse", "squishmallows"],
};

/**
 * Produkter til forsiden — let filtrering via nøgleord i title/description.
 * (Pilot: deterministisk udvælgelse = stabil karusel mellem deploys.)
 */
export function getHomepageCarouselProducts({
  theme = "mixed",
  limit = 12,
}: {
  theme?: HomepageCarouselTheme;
  limit?: number;
}): ProductRecord[] {
  const keywords = HOMEPAGE_CAROUSEL_KEYWORDS[theme] ?? HOMEPAGE_CAROUSEL_KEYWORDS.mixed;

  const normalizedKeywords = keywords.map((k) => normalize(k));

  const eligible = products.filter(
    (p) =>
      p.imageUrl &&
      p.title.trim().length >= 5 &&
      p.description.trim().length >= 10,
  );

  const matches = eligible.filter((p) => {
    const hay = normalize(`${p.title} ${p.description} ${p.merchant} ${p.feedSource}`);
    return normalizedKeywords.some((k) => k.length >= 2 && hay.includes(k));
  });

  return matches.slice(0, limit);
}

const TITLE_STOPWORDS = new Set([
  "pokemon",
  "pokémon",
  "tcg",
  "pokemon-tcg",
  "og",
  "med",
  "til",
  "for",
  "fra",
  "den",
  "det",
  "en",
  "et",
  "i",
  "på",
  "af",
  "the",
  "a",
  "an",
  "and",
  "or",
]);

function tokenizeTitle(s: string): string[] {
  const q = normalize(s);
  const raw = q
    .replace(/[^a-z0-9æøå\s-]/gi, " ")
    .replace(/[\s-]+/g, " ")
    .trim();
  if (!raw) return [];

  return raw
    .split(" ")
    .map((t) => t.trim())
    .filter((t) => t.length >= 3 && !TITLE_STOPWORDS.has(t));
}

function jaccard(a: string[], b: string[]): number {
  const A = new Set(a);
  const B = new Set(b);
  if (A.size === 0 || B.size === 0) return 0;

  let intersection = 0;
  for (const t of A) if (B.has(t)) intersection += 1;
  const union = A.size + B.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

export function searchProducts(query: string, limit = 24): ProductRecord[] {
  const q = normalize(query);
  if (!q) return [];
  if (isBlockedNonPokemonFranchiseQuery(query)) return [];

  const matches = products.filter((p) => {
    const hay = normalize(
      `${p.title} ${p.description} ${p.merchant} ${p.feedSource}`,
    );
    return hay.includes(q);
  });

  return matches.slice(0, limit);
}

/**
 * Relaterede produkter baseret på titel-lighed.
 * Implementeret med 1-2 opslag via `searchProducts()` for at holde build-tid i check.
 */
export function getRelatedProducts(
  product: ProductRecord,
  limit = 6,
): ProductRecord[] {
  const titleTokens = tokenizeTitle(product.title);
  if (!titleTokens.length) return [];

  // Brug de mest “informative” tokens (længst først).
  const sortedTokens = [...titleTokens].sort((a, b) => b.length - a.length);
  const queries = sortedTokens.slice(0, 2);

  const candidates = new Map<string, { p: ProductRecord; score: number }>();

  for (const q of queries) {
    const hits = searchProducts(q, Math.max(limit * 6, 24));
    for (const p of hits) {
      if (p.id === product.id) continue;
      if (candidates.has(p.id)) continue;
      const score = jaccard(titleTokens, tokenizeTitle(p.title));
      if (score > 0) candidates.set(p.id, { p, score });
    }
  }

  return [...candidates.values()]
    .sort((a, b) => b.score - a.score || a.p.merchant.localeCompare(b.p.merchant))
    .slice(0, limit)
    .map((x) => x.p);
}

/**
 * Forside / tom søgning: spred udvalg ud over hele kataloget (ikke kun “første rækker”
 * fra ét feed).
 */
export function getFeaturedProducts(limit = 8): ProductRecord[] {
  const n = products.length;
  if (n === 0) return [];
  if (n <= limit) return products.slice();
  const step = Math.max(1, Math.floor(n / limit));
  const out: ProductRecord[] = [];
  for (let i = 0; i < limit; i++) {
    out.push(products[Math.min(i * step, n - 1)]);
  }
  return out;
}

/**
 * Tjek om et produkt plausibelt hører til kategorien (feed-tekst vs. kategori-nøgleord).
 */
function productMatchesCategoryScope(p: ProductRecord, category: Category): boolean {
  const hay = normalize(
    `${p.title} ${p.description} ${p.merchant} ${p.feedSource}`,
  );
  const needles = [
    ...category.searchKeywords,
    category.slug.replace(/-/g, " "),
    category.title,
  ];
  return needles.some((n) => {
    const k = normalize(n);
    return k.length >= 2 && hay.includes(k);
  });
}

/** Produkter der matcher en kategori ud fra dens søgeord (feed-data). */
export function getProductsForCategory(
  category: Category,
  limit = 12,
  /** Ekstra fritekst fra kategori-siden (?q=) — søger i hele kataloget og filtrerer/fallback. */
  extraQuery?: string,
): ProductRecord[] {
  const userQ = extraQuery?.trim();

  if (userQ) {
    const wide = searchProducts(userQ, Math.max(limit * 4, 48));
    const scoped = wide.filter((p) => productMatchesCategoryScope(p, category));
    if (scoped.length > 0) return scoped.slice(0, limit);
    /* Ingen træf der også rammer kategori-nøgleord — vis alligevel søgeresultater (brugeren bad om et ord) */
    return wide.slice(0, limit);
  }

  const queries = [
    ...category.searchKeywords,
    category.slug.replace(/-/g, " "),
  ];
  const seen = new Set<string>();
  const out: ProductRecord[] = [];
  for (const query of queries) {
    const q = normalize(query);
    if (q.length < 2) continue;
    for (const p of products) {
      if (seen.has(p.id)) continue;
      const hay = normalize(
        `${p.title} ${p.description} ${p.merchant} ${p.feedSource}`,
      );
      if (hay.includes(q)) {
        seen.add(p.id);
        out.push(p);
        if (out.length >= limit) return out;
      }
    }
  }
  return out;
}
