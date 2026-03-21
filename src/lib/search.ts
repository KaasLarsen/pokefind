import { categories, guides, type Category, type Guide } from "./content";

function normalize(s: string) {
  return s.toLowerCase().trim();
}

export function searchCategoriesAndGuides(query: string): {
  categories: Category[];
  guides: Guide[];
} {
  const q = normalize(query);
  if (!q) {
    return { categories: [], guides: [] };
  }

  const catMatches = categories.filter((c) => {
    const hay = normalize(
      `${c.title} ${c.description} ${c.searchKeywords.join(" ")} ${c.slug}`,
    );
    return hay.includes(q);
  });

  const guideMatches = guides.filter((g) => {
    const hay = normalize(`${g.title} ${g.summary} ${g.slug}`);
    return hay.includes(q);
  });

  return { categories: catMatches, guides: guideMatches };
}
