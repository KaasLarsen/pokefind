import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../../src/components/JsonLd";
import { IconPackage } from "../../../src/components/icons";
import { buildProductJsonLd } from "../../../src/lib/structuredData";
import { getIndexableProductIds, getProductById } from "../../../src/lib/searchProducts";
import { siteUrl } from "../../../src/lib/site";
import ProductCard from "../../../src/components/ProductCard";
import { getRelatedProducts } from "../../../src/lib/searchProducts";

export function generateStaticParams() {
  return getIndexableProductIds().map((id) => ({ id }));
}

/** Tillader at andre produkt-ID’er også kan komme ind ved på/omrendering. */
export const dynamicParams = true;

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const product = getProductById(params.id);
  if (!product) return { title: "Produkt — PokéFind" };

  return {
    title: `${product.title} — PokéFind`,
    description: `${product.merchant}. Pris: ${product.currency} ${product.price}.`,
    openGraph: {
      title: `${product.title} — PokéFind`,
      description: `${product.merchant}. Pris: ${product.currency} ${product.price}.`,
      type: "website",
      images: product.imageUrl ? [product.imageUrl] : undefined,
    },
  };
}

function shouldUnoptimize(src: string) {
  try {
    const u = new URL(src);
    return u.hostname === "proshop.dk" || u.hostname === "www.proshop.dk";
  } catch {
    return false;
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const canonicalUrl = `${siteUrl}/product/${encodeURIComponent(product.id)}`;
  const related = getRelatedProducts(product, 6);

  return (
    <div className="space-y-8">
      <JsonLd data={buildProductJsonLd(product, canonicalUrl)} />

      <div className="pk-card">
        <div className="pk-card-inner flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="w-full md:max-w-[420px]">
            {product.imageUrl ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-pk-blue/10 bg-white/60">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 92vw, 420px"
                  quality={88}
                  unoptimized={shouldUnoptimize(product.imageUrl)}
                  className="object-contain p-2 sm:p-3"
                  priority
                />
              </div>
            ) : (
              <div className="relative mx-auto flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-pk-blue/10 bg-gradient-to-br from-pk-cream to-white ring-1 ring-black/[0.04]">
                <div className="flex flex-col items-center justify-center gap-2 px-2 text-pk-navy/35">
                  <IconPackage className="h-12 w-12 sm:h-14 sm:w-14" />
                  <span className="text-center text-xs font-semibold uppercase tracking-wider">
                    Produktbillede
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-5">
            <div className="text-xs text-pk-navy/60">
              <span className="rounded-md bg-pk-yellow/90 px-2 py-1 font-semibold text-pk-navy">
                Reklamelink
              </span>{" "}
              · {product.merchant}
            </div>

            <h1 className="font-display text-3xl font-extrabold text-pk-navy md:text-4xl">
              {product.title}
            </h1>

            <p className="text-sm text-pk-navy/75">{product.description}</p>

            <div className="text-lg font-extrabold text-pk-navy">
              {product.currency}{" "}
              {product.price.toLocaleString("da-DK", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noreferrer sponsored nofollow"
                data-track="affiliate_click"
                data-category-slug="product-cta"
                data-provider-id={product.feedSource}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pk-blue to-pk-navy px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-pk-blue/25 transition hover:scale-[1.02] hover:shadow-xl"
              >
                Køb hos butikken →
              </a>

              <Link
                href={`/soeg?q=${encodeURIComponent(product.title)}`}
                className="inline-flex items-center justify-center rounded-full border border-pk-blue/20 bg-white/90 px-6 py-3 text-sm font-bold text-pk-navy shadow-sm hover:bg-pk-cream"
              >
                Søg flere lignende →
              </Link>
            </div>

          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="space-y-5">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-pk-navy">
              Relaterede produkter
            </h2>
            <p className="mt-1 text-sm text-pk-navy/75">
              Match baseret på titel-lighed (og dermed ofte samme type produkt hos forskellige butikker).
            </p>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((p, i) => (
              <li key={p.id}>
                <ProductCard product={p} imagePriority={i === 0} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

