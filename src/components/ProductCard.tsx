import Link from "next/link";
import type { ProductRecord } from "../lib/productTypes";
import { IconPackage } from "./icons";
import { ProductCardImage } from "./ProductCardImage";

type Props = {
  product: ProductRecord;
  /** Sæt på første synlige kort for hurtigere LCP */
  imagePriority?: boolean;
};

export default function ProductCard({ product, imagePriority = false }: Props) {
  const productHref = `/product/${encodeURIComponent(product.id)}`;

  const affiliateLinkAttrs = {
    href: product.affiliateUrl,
    target: "_blank",
    rel: "noreferrer sponsored nofollow",
    "data-track": "affiliate_click",
    "data-category-slug": "product-cta",
    "data-provider-id": product.feedSource,
    "aria-label": `Køb hos ${product.merchant} for "${product.title}"`,
  } as const;

  return (
    <article className="pk-card group flex h-full flex-col transition duration-300 hover:-translate-y-1 hover:no-underline hover:shadow-2xl hover:shadow-pk-navy/20">
      <div className="pk-card-inner flex flex-1 flex-col space-y-3 pb-5 pt-5">
        {product.imageUrl ? (
          <Link href={productHref} className="block no-underline hover:opacity-95">
            <ProductCardImage
              src={product.imageUrl}
              alt={product.title}
              priority={imagePriority}
            />
          </Link>
        ) : (
          <Link href={productHref} className="block no-underline hover:opacity-95">
            <div className="relative mx-auto flex h-40 w-full max-w-full items-center justify-center overflow-hidden rounded-2xl border border-pk-blue/10 bg-gradient-to-br from-pk-cream to-white ring-1 ring-black/[0.04] sm:h-44 md:aspect-[4/3] md:h-auto md:min-h-[10.5rem] md:max-h-[13.5rem] lg:max-h-[15rem]">
              <div className="flex flex-col items-center justify-center gap-2 px-2 text-pk-navy/35">
                <IconPackage className="h-12 w-12 sm:h-14 sm:w-14" />
                <span className="text-center text-xs font-semibold uppercase tracking-wider">
                  Produktbillede
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="text-xs text-pk-navy/60">
          <span className="rounded-md bg-pk-yellow/90 px-2 py-1 font-semibold text-pk-navy">
            Reklamelink
          </span>{" "}
          · {product.merchant}
        </div>

        <Link
          href={productHref}
          className="break-words text-base font-bold leading-snug text-pk-navy underline decoration-pk-yellow/70 underline-offset-4 hover:text-pk-blue"
        >
          {product.title}
        </Link>

        <a
          {...affiliateLinkAttrs}
          className="inline-flex items-center justify-center rounded-full border border-pk-blue/20 bg-white/90 px-4 py-2 text-sm font-extrabold text-pk-navy shadow-sm transition hover:bg-pk-cream"
        >
          Køb hos butikken →
        </a>

        <p className="line-clamp-3 flex-1 text-sm text-pk-navy/75">
          {product.description}
        </p>

        <p className="text-lg font-extrabold text-pk-navy">
          {product.currency}{" "}
          {product.price.toLocaleString("da-DK", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </p>
      </div>
    </article>
  );
}
