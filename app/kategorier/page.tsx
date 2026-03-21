import Link from "next/link";
import { categories } from "../../src/lib/content";

export default function CategoriesIndexPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold text-pk-navy md:text-4xl">
        Kategorier
      </h1>
      <p className="mt-2 max-w-2xl text-pk-navy/75">
        Vælg et format — og find relaterede varer via søgningen.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/kat/${c.slug}`}
            className="pk-card block hover:no-underline"
          >
            <div className="pk-card-inner py-5">
              <div className="font-display font-bold text-pk-navy">{c.title}</div>
              <div className="mt-2 text-sm text-pk-navy/65">{c.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
