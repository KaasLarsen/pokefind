import Link from "next/link";
import { categories, guides } from "../src/lib/content";
import HeroSearch from "../src/components/HeroSearch";
import HomeQuickNav from "../src/components/HomeQuickNav";
import PartnerAdsDisplayBanner from "../src/components/PartnerAdsDisplayBanner";
import HowItWorks from "../src/components/HowItWorks";
import ProductCard from "../src/components/ProductCard";
import SectionTitle from "../src/components/SectionTitle";
import TrustStrip from "../src/components/TrustStrip";
import HomepageProductCarousel from "../src/components/HomepageProductCarousel";
import { getFeaturedProducts } from "../src/lib/searchProducts";
import { getHomepageCarouselProducts } from "../src/lib/searchProducts";

export default function HomePage() {
  const topCats = categories.slice(0, 6);
  const topGuides = guides.slice(0, 4);
  const featured = getFeaturedProducts(6);
  const carouselProducts = getHomepageCarouselProducts({
    theme: "mixed",
    limit: 12,
  });

  return (
    <div className="space-y-14 md:space-y-16">
      <HeroSearch />

      <PartnerAdsDisplayBanner />

      <HomeQuickNav />

      <TrustStrip />

      <HowItWorks />

      <section>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            kicker="Udvalgt for dig"
            title={
              <>
                Udvalgte{" "}
                <span className="text-pk-blue">produkter</span>
              </>
            }
            subtitle="Opdateres løbende fra butikker vi linker til. Markerede links kan være reklame."
          />
          <Link
            href="/soeg"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pk-blue to-pk-navy px-5 py-3 text-sm font-bold !text-white shadow-lg shadow-pk-blue/30 transition hover:scale-[1.02] hover:shadow-xl"
          >
            Åbn søgning →
          </Link>
        </div>
        <ul className="mt-2 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((p, i) => (
            <li key={p.id}>
              <ProductCard product={p} imagePriority={i === 0} />
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <HomepageProductCarousel
            title="Flere Pokémon-produkter"
            subtitle="Scroll for at se flere (billede og titel linker til produkt-sider)."
            products={carouselProducts}
            viewAllHref={`/soeg?q=${encodeURIComponent("pokemon booster lego plush")}`}
          />
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="pk-card ring-1 ring-pk-electric/20">
          <div className="pk-card-inner">
            <h2 className="font-display text-xl font-bold text-pk-navy">
              Populære kategorier
            </h2>
            <div className="mt-5 grid gap-3">
              {topCats.map((c) => (
                <Link
                  key={c.id}
                  href={`/kat/${c.slug}`}
                  className="group rounded-2xl border border-pk-blue/12 bg-white/60 p-4 transition hover:border-pk-electric/55 hover:bg-white hover:shadow-md"
                >
                  <div className="font-semibold text-pk-navy group-hover:text-pk-blue">
                    {c.title}
                  </div>
                  <div className="mt-1 text-sm text-pk-navy/65">{c.description}</div>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/kategorier"
                className="inline-flex items-center gap-2 font-semibold text-pk-blue hover:underline"
              >
                Se alle kategorier →
              </Link>
            </div>
          </div>
        </section>

        <section className="pk-card ring-1 ring-pk-mint/25" id="guides">
          <div className="pk-card-inner">
            <h2 className="font-display text-xl font-bold text-pk-navy">
              Guides &amp; tips
            </h2>
            <div className="mt-5 grid gap-3">
              {topGuides.map((g) => (
                <Link
                  key={g.id}
                  href={`/guider/${g.slug}`}
                  className="group rounded-2xl border border-pk-blue/12 bg-white/60 p-4 transition hover:border-pk-electric/55 hover:bg-white hover:shadow-md"
                >
                  <div className="font-semibold text-pk-navy group-hover:text-pk-blue">
                    {g.title}
                  </div>
                  <div className="mt-1 text-sm text-pk-navy/65">{g.summary}</div>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/guider"
                className="inline-flex items-center gap-2 font-semibold text-pk-blue hover:underline"
              >
                Alle guides →
              </Link>
              <Link
                href="/guider/hvad-skal-jeg-koebe-som-begynder"
                className="inline-flex items-center gap-2 font-semibold text-pk-blue hover:underline"
              >
                Start som nybegynder →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
