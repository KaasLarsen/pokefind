import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateDisclosureBox } from "../../../src/components/AffiliateDisclosureBox";
import { AffiliateLink } from "../../../src/components/AffiliateLink";
import PageViewTracker from "../../../src/components/PageViewTracker";
import ProductCard from "../../../src/components/ProductCard";
import SectionTitle from "../../../src/components/SectionTitle";
import {
  affiliateProviders,
  categories,
  type Audience,
  type PriceTier,
} from "../../../src/lib/content";
import { getProductsForCategory } from "../../../src/lib/searchProducts";

function readParam<T extends string>(value: unknown): T | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? (trimmed as T) : undefined;
}

function buildOutboundQuery({
  categoryTitle,
  categoryKeywords,
  audience,
  priceTier,
  q,
}: {
  categoryTitle: string;
  categoryKeywords: string[];
  audience?: Audience;
  priceTier?: PriceTier;
  q?: string;
}) {
  const base = categoryKeywords[0] ?? categoryTitle;
  const parts: string[] = [base];
  if (q) parts.push(q);
  if (audience) {
    if (audience === "børn") parts.push("kids");
    if (audience === "begynder") parts.push("beginner");
    if (audience === "erfaren") parts.push("advanced");
  }
  if (priceTier) {
    if (priceTier === "budget") parts.push("budget");
    if (priceTier === "mellem") parts.push("value");
    if (priceTier === "premium") parts.push("premium");
  }
  return parts.join(" ");
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  /* Pageviews: kun client-side (PageViewTracker). fs.write under SSR fejler på Vercel. */

  const audience = readParam<Audience>(searchParams?.audience);
  const priceTier = readParam<PriceTier>(searchParams?.priceTier);
  const q = readParam<string>(searchParams?.q);

  const enabledProviders = affiliateProviders.filter((p) => p.enabled);
  const outboundQuery = buildOutboundQuery({
    categoryTitle: category.title,
    categoryKeywords: category.searchKeywords,
    audience,
    priceTier,
    q,
  });

  const feedProducts = getProductsForCategory(category, 12);
  const searchDeepLink = `/soeg?q=${encodeURIComponent(
    category.searchKeywords[0] ?? category.title,
  )}`;

  return (
    <div className="space-y-10 pb-8">
      <AffiliateDisclosureBox />
      <PageViewTracker categorySlug={category.slug} />

      <nav
        className="flex flex-wrap items-center gap-2 text-sm font-medium text-pk-navy/55"
        aria-label="Brødkrummer"
      >
        <Link href="/" className="text-pk-blue hover:underline">
          Forside
        </Link>
        <span aria-hidden className="text-pk-navy/35">
          /
        </span>
        <Link href="/kategorier" className="text-pk-blue hover:underline">
          Kategorier
        </Link>
        <span aria-hidden className="text-pk-navy/35">
          /
        </span>
        <span className="font-bold text-pk-navy">{category.title}</span>
      </nav>

      <header className="relative overflow-hidden rounded-[1.75rem] border-2 border-white/80 bg-gradient-to-br from-pk-blue/15 via-white to-pk-yellow/15 px-6 py-8 shadow-xl shadow-pk-navy/10 md:px-10 md:py-10">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-pk-electric/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 left-1/4 h-40 w-40 rounded-full bg-pk-mint/20 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pk-blue/80">
            Kategori
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-pk-navy md:text-5xl">
            {category.title}
          </h1>
          <div className="pk-heading-line mt-4 max-w-xs" aria-hidden />
          <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-pk-navy/80 md:text-lg">
            {category.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={searchDeepLink}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pk-blue to-pk-navy px-5 py-3 text-sm font-bold !text-white shadow-lg shadow-pk-blue/25 transition hover:scale-[1.02]"
            >
              Søg i kataloget →
            </Link>
            <Link
              href="/guider"
              className="inline-flex items-center justify-center rounded-2xl border-2 border-pk-blue/25 bg-white/90 px-5 py-3 text-sm font-bold text-pk-navy shadow-sm hover:border-pk-electric/50"
            >
              Læs guides
            </Link>
          </div>
        </div>
      </header>

      <section className="pk-card ring-1 ring-pk-blue/10">
        <div className="pk-card-inner">
          <SectionTitle
            kicker="Tilpas"
            title="Find det rigtige — filtrér før du klikker videre"
            subtitle="Filtrér her og brug derefter søgning og kataloget på PokéFind. Tomme felter = ingen ekstra ord i søgningen."
          />
          <form className="mt-6 grid gap-4 sm:grid-cols-3" method="get">
            <label className="text-sm font-semibold text-pk-navy">
              Søgeord (valgfri)
              <input
                name="q"
                defaultValue={q ?? ""}
                className="mt-2 w-full rounded-2xl border-2 border-pk-blue/15 bg-white px-4 py-3 text-sm shadow-inner outline-none transition focus:border-pk-electric focus:ring-4 focus:ring-pk-electric/20"
                placeholder="fx Scarlet, Charizard, 151…"
              />
            </label>

            <label className="text-sm font-semibold text-pk-navy">
              Til hvem?
              <select
                name="audience"
                defaultValue={audience ?? ""}
                className="mt-2 w-full rounded-2xl border-2 border-pk-blue/15 bg-white px-4 py-3 text-sm shadow-inner outline-none focus:border-pk-electric focus:ring-4 focus:ring-pk-electric/20"
              >
                <option value="">Alle</option>
                <option value="begynder">Begynder</option>
                <option value="erfaren">Erfaren</option>
                <option value="børn">Børn</option>
              </select>
            </label>

            <label className="text-sm font-semibold text-pk-navy">
              Budget
              <select
                name="priceTier"
                defaultValue={priceTier ?? ""}
                className="mt-2 w-full rounded-2xl border-2 border-pk-blue/15 bg-white px-4 py-3 text-sm shadow-inner outline-none focus:border-pk-electric focus:ring-4 focus:ring-pk-electric/20"
              >
                <option value="">Alle</option>
                <option value="budget">Lav</option>
                <option value="mellem">Mellem</option>
                <option value="premium">Høj</option>
              </select>
            </label>

            <div className="flex flex-wrap gap-3 sm:col-span-3">
              <button
                type="submit"
                className="rounded-2xl bg-gradient-to-r from-pk-navy to-pk-blue px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:opacity-95"
              >
                Opdatér søgning
              </button>
              <a
                href={`/kat/${category.slug}`}
                className="inline-flex items-center rounded-2xl border-2 border-pk-blue/20 bg-white px-5 py-3 text-sm font-bold text-pk-navy hover:bg-pk-cream"
              >
                Nulstil filtre
              </a>
            </div>
          </form>
        </div>
      </section>

      {feedProducts.length > 0 ? (
        <section>
          <SectionTitle
            kicker="Fra kataloget"
            title={
              <>
                Varer der matcher{" "}
                <span className="text-pk-blue">{category.title}</span>
              </>
            }
            subtitle="Udvalgt ud fra varekataloget. Markerede links kan være betalt reklame."
          />
          <ul className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {feedProducts.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="rounded-3xl border border-dashed border-pk-blue/30 bg-white/70 px-6 py-10 text-center">
          <p className="font-display text-lg font-bold text-pk-navy">
            Ingen varer i kataloget matcher endnu
          </p>
          <p className="mt-2 text-sm text-pk-navy/70">
            Prøv{" "}
            <Link href={searchDeepLink} className="font-bold text-pk-blue underline">
              søgning
            </Link>{" "}
            eller et andet søgeord.
          </p>
        </section>
      )}

      {enabledProviders.length > 0 ? (
        <section className="pk-card ring-1 ring-pk-yellow/30">
          <div className="pk-card-inner">
            <SectionTitle
              kicker="Markedssøgning"
              title="Åbn mere udvalg hos partnere"
              subtitle="Eksterne søgelinks med tydelig reklamemarkering."
            />

            <div className="mt-6 space-y-4">
              {enabledProviders.map((p) => (
                <AffiliateLink
                  key={p.id}
                  providerName={p.name}
                  href={p.buildSearchUrl(outboundQuery)}
                  label="Reklamelink"
                  tracking={{ categorySlug: category.slug, providerId: p.id }}
                >
                  {category.title}: søg via {p.name}
                </AffiliateLink>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-pk-mint/30 bg-gradient-to-r from-pk-cream/90 to-white px-5 py-4 text-sm text-pk-navy/85">
              <strong className="text-pk-navy">Tip:</strong> Vi tilføjer løbende flere
              partnere, så du får flere valg herfra.
            </div>
          </div>
        </section>
      ) : (
        <section className="rounded-3xl border border-pk-blue/15 bg-white/90 px-6 py-8 text-center shadow-sm">
          <p className="text-sm font-medium text-pk-navy/85">
            Brug{" "}
            <Link href={searchDeepLink} className="font-bold text-pk-blue underline">
              søgning
            </Link>{" "}
            og varekortene ovenfor — eksterne butikslinks tilføjes, når vi har aktive
            partnerskaber.
          </p>
        </section>
      )}
    </div>
  );
}
