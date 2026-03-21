import Link from "next/link";
import SearchBar from "./SearchBar";

export default function HeroSearch() {
  return (
    <section className="pk-hero-shell relative z-0 overflow-hidden rounded-[2rem] border-2 border-white/25 px-5 py-16 shadow-2xl shadow-pk-navy/50 md:px-12 md:py-24">
      <div className="pk-hero-grid pointer-events-none absolute inset-0 opacity-35" aria-hidden />
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 animate-pk-pulse-soft rounded-full bg-pk-electric/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-pk-blue/25 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-pk-yellow-bright shadow-inner backdrop-blur-sm">
          Danmarks Pokémon-købsguide
        </p>
        <h1 className="pk-hero-headline text-balance font-display text-4xl font-extrabold leading-[1.08] md:text-6xl md:leading-[1.05]">
          Gør{" "}
          <span className="pk-hero-accent">jagten</span> på kort &amp; gear{" "}
          <span className="whitespace-nowrap">— uden at hoppe mellem butikker</span>
        </h1>
        <div className="pk-heading-line mx-auto mt-6 max-w-xs opacity-95" aria-hidden />
        <p className="pk-hero-sub mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed md:text-xl">
          Kategorier, <strong className="text-white">varekatalog</strong> og{" "}
          <strong className="text-white">danske guides</strong> samlet ét sted.
        </p>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-[1.35rem] bg-gradient-to-r from-pk-electric/50 via-pk-yellow-bright/40 to-pk-mint/50 p-[2px] shadow-[0_12px_48px_-12px_rgba(255,210,74,0.55)]">
            <div className="rounded-[1.28rem] bg-pk-ink/95 p-1 backdrop-blur-md md:p-2">
              <SearchBar variant="hero" defaultValue="" inputId="hero-search" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="font-semibold text-white/70">Populært:</span>
          {["Booster packs", "ETB", "Sleeves", "Enkeltkort", "Paldea"].map((t) => (
            <Link
              key={t}
              href={`/soeg?q=${encodeURIComponent(t)}`}
              className="rounded-full border border-white/25 bg-white/15 px-3.5 py-2 font-semibold text-white shadow-md backdrop-blur-sm transition hover:scale-105 hover:border-pk-electric/60 hover:bg-white/25"
            >
              {t}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
