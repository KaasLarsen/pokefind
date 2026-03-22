import type { Guide } from "./content";
import { siteUrl } from "./site";

/** FAQPage — svar skal matche synlig tekst på /faq. */
export function buildFaqPageJsonLd(
  items: { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** Article — guides. */
export function buildGuideArticleJsonLd(
  guide: Guide,
  slug: string,
): Record<string, unknown> {
  const url = `${siteUrl}/guider/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.summary,
    inLanguage: "da-DK",
    author: {
      "@type": "Organization",
      name: "PokéFind",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "PokéFind",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    datePublished: "2024-06-01",
    dateModified: "2025-03-22",
  };
}

/** Organization — Om-siden. */
export function buildOrganizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PokéFind",
    url: siteUrl,
    logo: `${siteUrl}/logo-pokefind.svg`,
    description:
      "Uafhængig dansk købsguide til Pokémon TCG og tilbehør. Vi sælger ikke selv — vi linker til butikker og markedspladser.",
  };
}
