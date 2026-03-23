import type { Guide } from "./content";
import { siteUrl } from "./site";
import type { ProductRecord } from "./productTypes";

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

function buildBreadcrumbListJsonLd(url: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Forside",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Produkt",
        item: url,
      },
    ],
  };
}

/** Product — bruges på `/product/[id]` sider for at skabe unikt, crawlbart indhold. */
export function buildProductJsonLd(
  product: ProductRecord,
  canonicalUrl?: string,
): Record<string, unknown> {
  const url = canonicalUrl ?? `${siteUrl}/product/${encodeURIComponent(product.id)}`;

  const productNode: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    sku: product.id,
    name: product.title,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.merchant,
    },
    image: product.imageUrl ? [product.imageUrl] : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: product.price,
      availability: "https://schema.org/InStock",
      url: product.affiliateUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  // Fjern `image: undefined` for renere output.
  if (!product.imageUrl) delete productNode.image;

  return {
    "@context": "https://schema.org",
    "@graph": [productNode, buildBreadcrumbListJsonLd(url)],
  };
}
