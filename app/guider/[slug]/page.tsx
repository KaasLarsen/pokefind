import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateDisclosureBox } from "../../../src/components/AffiliateDisclosureBox";
import { AffiliateLink } from "../../../src/components/AffiliateLink";
import ProductCard from "../../../src/components/ProductCard";
import SectionTitle from "../../../src/components/SectionTitle";
import {
  affiliateProviders,
  categories,
  guides,
} from "../../../src/lib/content";
import { getProductsByIds } from "../../../src/lib/searchProducts";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = guides.find((g) => g.slug === params.slug);
  if (!guide) notFound();

  const enabledProviders = affiliateProviders.filter((p) => p.enabled);
  const recommendedCategories = guide.recommendedCategorySlugs
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter((c): c is (typeof categories)[number] => c != null);

  const featuredProducts =
    guide.featuredProductIds?.length ?
      getProductsByIds(guide.featuredProductIds)
    : [];

  return (
    <div>
      <AffiliateDisclosureBox />

      <div className="space-y-2">
        <h1 className="font-display text-3xl font-extrabold text-pk-navy md:text-4xl">
          {guide.title}
        </h1>
        <p className="text-pk-navy/75">{guide.summary}</p>
      </div>

      <div className="mt-6 rounded-2xl border border-pk-blue/15 bg-white p-5 shadow-sm">
        <div className="font-display font-bold text-pk-navy">Trin for trin</div>
        <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm text-pk-navy/90">
          {guide.steps.map((s) => (
            <li key={s.heading}>
              <div className="font-semibold text-pk-navy">{s.heading}</div>
              <div className="mt-1 text-pk-navy/75">{s.body}</div>
            </li>
          ))}
        </ol>
      </div>

      {featuredProducts.length > 0 ? (
        <section className="mt-10" aria-label="Udvalgte produkter fra kataloget">
          <SectionTitle
            kicker="Fra kataloget"
            title="Udvalgte produkter i denne guide"
            subtitle={
              guide.featuredProductsIntro ??
              "Konkrete varer fra vores produktfeed — klik for at gå til butikken (reklamelinks)."
            }
          />
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((p, i) => (
              <li key={p.id}>
                <ProductCard product={p} imagePriority={i === 0} />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-pk-navy/55">
            Udvalget er redaktionelt og knytter sig til guidens emne. Produkt-ID’er
            vedligeholdes i <code className="rounded bg-pk-navy/5 px-1">src/lib/content.ts</code>{" "}
            og matcher <code className="rounded bg-pk-navy/5 px-1">data/products.json</code>.
          </p>
        </section>
      ) : null}

      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-pk-navy">
          Anbefalede køb
        </h2>
        <p className="mt-1 text-sm text-pk-navy/70">
          {enabledProviders.length > 0 ? (
            <>
              Vælg et format og brug de markerede reklamelinks, når de findes. Alle
              sådanne links er tydeligt mærket.
            </>
          ) : (
            <>
              Gå ind på en kategori for at se kuraterede produkter fra vores katalog og
              søge videre på PokéFind. Eksterne partnerlinks tilføjes, når vi har aktive
              aftaler.
            </>
          )}
        </p>

        <div className="mt-4 space-y-6">
          {recommendedCategories.map((c) => (
            <section key={c.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-display font-bold text-pk-navy">
                    {c.title}
                  </div>
                  <div className="mt-1 text-sm text-pk-navy/70">
                    {c.description}
                  </div>
                </div>
                <Link
                  className="rounded-xl border border-pk-blue/20 bg-white px-3 py-2 text-sm font-semibold text-pk-navy shadow-sm hover:bg-pk-cream"
                  href={`/kat/${c.slug}`}
                >
                  Til kategori
                </Link>
              </div>

              {enabledProviders.length > 0 ? (
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {enabledProviders.map((p) => (
                    <AffiliateLink
                      key={`${c.slug}-${p.id}`}
                      providerName={p.name}
                      href={p.buildSearchUrl(c.searchKeywords[0] ?? c.title)}
                      label="Reklamelink"
                    >
                      Køb {c.title} via {p.name}
                    </AffiliateLink>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

