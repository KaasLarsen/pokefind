import Link from "next/link";
import type { ProductRecord } from "../lib/productTypes";
import ProductCard from "./ProductCard";

type Props = {
  title: string;
  subtitle?: string;
  products: ProductRecord[];
  viewAllHref: string;
  viewAllLabel?: string;
};

export default function HomepageProductCarousel({
  title,
  subtitle,
  products,
  viewAllHref,
  viewAllLabel = "Se flere",
}: Props) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-pk-navy">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-sm text-pk-navy/75">{subtitle}</p>
          ) : null}
        </div>

        <Link
          href={viewAllHref}
          className="inline-flex items-center justify-center rounded-2xl border border-pk-blue/20 bg-white/90 px-5 py-3 text-sm font-bold text-pk-navy shadow-sm transition hover:bg-pk-cream"
        >
          {viewAllLabel} →
        </Link>
      </div>

      <ul className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory">
        {products.map((p, i) => (
          <li
            key={p.id}
            className="snap-start shrink-0"
            style={{ width: "280px" }}
          >
            <ProductCard product={p} imagePriority={i === 0} />
          </li>
        ))}
      </ul>
    </section>
  );
}

