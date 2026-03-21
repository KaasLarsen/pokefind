import Link from "next/link";
import { IconBook, IconPackage } from "../../src/components/icons";
import ProductCard from "../../src/components/ProductCard";
import SearchBar from "../../src/components/SearchBar";
import { searchCategoriesAndGuides } from "../../src/lib/search";
import { getFeaturedProducts, searchProducts } from "../../src/lib/searchProducts";

export const dynamic = "force-dynamic";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams.q ?? "").trim();
  const { categories: cats, guides: gds } = searchCategoriesAndGuides(q);
  const products = searchProducts(q, 24);
  const featuredEmpty = getFeaturedProducts(8);

  return (
    <div>
      <div className="pk-card mb-10">
        <div className="pk-card-inner space-y-6">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-pk-navy md:text-4xl">
              Søgning
            </h1>
            {q ? (
              <p className="mt-2 text-pk-navy/70">
                Resultater for{" "}
                <span className="font-semibold text-pk-navy">&quot;{q}&quot;</span>
              </p>
            ) : (
              <p className="mt-2 text-pk-navy/70">
                Søg i kategorier, guides og produkter i kataloget.{" "}
                <strong className="text-pk-navy">Betalt reklame</strong> er markeret
                på produktkort.
              </p>
            )}
          </div>
          <SearchBar variant="header" defaultValue={q} inputId="soeg-page-search" />
        </div>
      </div>

      {!q && (
        <div className="space-y-10">
          <div className="rounded-3xl border border-pk-blue/15 bg-white/90 p-8 shadow-sm backdrop-blur-sm md:p-10">
            <p className="text-center text-lg font-medium text-pk-navy">
              Skriv fx <strong>ETB</strong>, <strong>sleeves</strong> eller{" "}
              <strong>booster box</strong> — eller gå til{" "}
              <Link href="/kategorier" className="font-bold text-pk-blue underline">
                kategorier
              </Link>{" "}
              /{" "}
              <Link href="/guider" className="font-bold text-pk-blue underline">
                guides
              </Link>
              .
            </p>
          </div>

          <section>
            <h2 className="mb-4 font-display text-xl font-bold text-pk-navy">
              Populære produkter lige nu
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {featuredEmpty.map((p, i) => (
                <li key={p.id}>
                  <ProductCard product={p} imagePriority={i === 0} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {q && (
        <div className="space-y-12">
          <section>
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-pk-navy">
              <IconPackage className="h-7 w-7 text-pk-blue" aria-hidden />
              Kategorier
            </h2>
            {cats.length === 0 ? (
              <p className="text-sm text-pk-navy/60">Ingen kategorier matchede.</p>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {cats.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/kat/${c.slug}`}
                      className="pk-card block hover:no-underline"
                    >
                      <div className="pk-card-inner py-5">
                        <span className="font-semibold text-pk-navy">{c.title}</span>
                        <p className="mt-1 text-sm text-pk-navy/65">{c.description}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-pk-navy">
              <IconBook className="h-7 w-7 text-pk-mint" aria-hidden />
              Guides
            </h2>
            {gds.length === 0 ? (
              <p className="text-sm text-pk-navy/60">Ingen guides matchede.</p>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {gds.map((g) => (
                  <li key={g.id}>
                    <Link
                      href={`/guider/${g.slug}`}
                      className="pk-card block hover:no-underline"
                    >
                      <div className="pk-card-inner py-5">
                        <span className="font-semibold text-pk-navy">{g.title}</span>
                        <p className="mt-1 text-sm text-pk-navy/65">{g.summary}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-pk-navy">
              <IconPackage className="h-7 w-7 text-pk-electric" aria-hidden />
              Produkter
            </h2>
            {products.length === 0 ? (
              <p className="text-sm text-pk-navy/60">
                Ingen produkter matchede — prøv andre ord eller bredere søgning.
              </p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((p, i) => (
                  <li key={p.id}>
                    <ProductCard product={p} imagePriority={i === 0} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
