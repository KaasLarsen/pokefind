import type { ProductRecord } from "../lib/productTypes";
import { IconPackage } from "./icons";
import { ProductCardImage } from "./ProductCardImage";

type Props = {
  product: ProductRecord;
  /** Sæt på første synlige kort for hurtigere LCP */
  imagePriority?: boolean;
};

export default function ProductCard({ product, imagePriority = false }: Props) {
  return (
    <article className="pk-card group flex h-full flex-col transition duration-300 hover:-translate-y-1 hover:no-underline hover:shadow-2xl hover:shadow-pk-navy/20">
      <div className="pk-card-inner flex flex-1 flex-col space-y-3 pb-5 pt-5">
        {product.imageUrl ? (
          <ProductCardImage
            src={product.imageUrl}
            alt={product.title}
            priority={imagePriority}
          />
        ) : (
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-pk-blue/10 bg-gradient-to-br from-pk-cream to-white ring-1 ring-black/[0.04]">
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-pk-navy/35">
              <IconPackage className="h-14 w-14" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Produktbillede
              </span>
            </div>
          </div>
        )}

        <div className="text-xs text-pk-navy/60">
          <span className="rounded-md bg-pk-yellow/90 px-2 py-1 font-semibold text-pk-navy">
            Reklamelink
          </span>{" "}
          · {product.merchant}
        </div>

        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noreferrer sponsored nofollow"
          data-track="affiliate_click"
          data-category-slug="product-feed"
          data-provider-id={product.feedSource}
          className="text-base font-bold leading-snug text-pk-navy underline decoration-pk-yellow/70 underline-offset-4 hover:text-pk-blue"
        >
          {product.title}
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
