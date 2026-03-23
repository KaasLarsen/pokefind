import type { MetadataRoute } from "next";
import { categories, guides } from "../src/lib/content";
import { siteUrl } from "../src/lib/site";
import { getIndexableProductIds } from "../src/lib/searchProducts";

const base = siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/soeg`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/kategorier`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/guider`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/om`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.55 },
    { url: `${base}/kontakt`, lastModified: now, changeFrequency: "yearly", priority: 0.45 },
    {
      url: `${base}/affiliate-disclosure`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.35 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.35 },
  ];

  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${base}/guider/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/kat/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = getIndexableProductIds().map(
    (id) => ({
      url: `${base}/product/${encodeURIComponent(id)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.45,
    }),
  );

  return [...staticRoutes, ...guideRoutes, ...categoryRoutes, ...productRoutes];
}
