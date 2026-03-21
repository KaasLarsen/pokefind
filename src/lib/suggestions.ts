import { categories, guides } from "./content";

export const POPULAR_SEARCHES: string[] = [
  "Booster packs",
  "ETB",
  "Sleeves",
  "Enkeltkort",
  "Booster box",
  "Paldea",
  "Charizard",
];

function normalize(s: string) {
  return s.toLowerCase().trim();
}

export type SuggestionItem =
  | {
      kind: "category";
      id: string;
      title: string;
      subtitle: string;
      href: string;
    }
  | {
      kind: "guide";
      id: string;
      title: string;
      subtitle: string;
      href: string;
    }
  | {
      kind: "popular";
      id: string;
      label: string;
      href: string;
    };

export function getSuggestions(query: string, limit = 8): SuggestionItem[] {
  const q = normalize(query);
  if (!q) {
    return POPULAR_SEARCHES.slice(0, 6).map((label, i) => ({
      kind: "popular" as const,
      id: `pop-${i}-${label}`,
      label,
      href: `/soeg?q=${encodeURIComponent(label)}`,
    }));
  }

  const out: SuggestionItem[] = [];

  for (const c of categories) {
    const hay = normalize(
      `${c.title} ${c.description} ${c.searchKeywords.join(" ")} ${c.slug}`,
    );
    if (hay.includes(q)) {
      out.push({
        kind: "category",
        id: `cat-${c.id}`,
        title: c.title,
        subtitle: c.description.slice(0, 72) + (c.description.length > 72 ? "…" : ""),
        href: `/kat/${c.slug}`,
      });
    }
  }

  for (const g of guides) {
    const hay = normalize(`${g.title} ${g.summary} ${g.slug}`);
    if (hay.includes(q)) {
      out.push({
        kind: "guide",
        id: `guide-${g.id}`,
        title: g.title,
        subtitle: g.summary.slice(0, 72) + (g.summary.length > 72 ? "…" : ""),
        href: `/guider/${g.slug}`,
      });
    }
  }

  for (const label of POPULAR_SEARCHES) {
    if (normalize(label).includes(q)) {
      out.push({
        kind: "popular",
        id: `pop-match-${label}`,
        label,
        href: `/soeg?q=${encodeURIComponent(label)}`,
      });
    }
  }

  const seen = new Set<string>();
  const deduped: SuggestionItem[] = [];
  for (const item of out) {
    const key =
      item.kind === "popular" ? `p:${item.label}` : `${item.kind}:${item.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
    if (deduped.length >= limit) break;
  }

  return deduped;
}
