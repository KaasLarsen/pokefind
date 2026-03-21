import productsData from "../../data/products.json";
import type { Category } from "./content";
import type { ProductRecord } from "./productTypes";

const products = productsData as ProductRecord[];

function normalize(s: string) {
  return s.toLowerCase().trim();
}

export function searchProducts(query: string, limit = 24): ProductRecord[] {
  const q = normalize(query);
  if (!q) return [];

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

/** Produkter der matcher en kategori ud fra dens søgeord (feed-data). */
export function getProductsForCategory(category: Category, limit = 12): ProductRecord[] {
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
