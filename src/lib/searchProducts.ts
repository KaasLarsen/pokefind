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
export function getIndexableProductIds(): string[] {
  const ids = new Set<string>();
  for (const g of guides) {
    for (const id of g.featuredProductIds ?? []) ids.add(id);
  }
  // Kun IDs der faktisk findes i vores nuværende products.json.
  return [...ids].filter((id) => productById.has(id));
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
