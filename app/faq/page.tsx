import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — PokéFind",
  description:
    "Ofte stillede spørgsmål om PokéFind, varekataloget, affiliate-links og hvordan vi opdaterer indhold.",
};

const items: { q: string; a: ReactNode }[] = [
  {
    q: "Hvad er PokéFind?",
    a: (
      <>
        PokéFind er en uafhængig dansk købsguide til Pokémon TCG og relateret tilbehør. Vi sælger ikke
        selv — vi hjælper dig med at finde rundt i formater, kategorier og korte guides, så du lettere
        kan træffe et godt køb. Læs mere på{" "}
        <Link className="font-semibold text-pk-blue underline hover:text-pk-navy" href="/om">
          Om PokéFind
        </Link>
        .
      </>
    ),
  },
  {
    q: "Hvor kommer produkterne i kataloget fra?",
    a: (
      <>
        Vores vareliste bygger på produktfeeds fra partnere (fx Partner-ads). Butikkerne ejer pris,
        lager og leveringsbetingelser — vi viser data, som feedet leverer, og linker videre til
        forhandleren når du klikker.
      </>
    ),
  },
  {
    q: "Hvor ofte opdateres kataloget?",
    a: (
      <>
        Data opdateres, når vi kører import-scriptet (`npm run ingest:feed`) mod de feed-URL’er, der
        er sat op i{" "}
        <code className="rounded bg-pk-navy/5 px-1 text-xs">data/feeds.json</code>. På den live side
        afspejler indholdet den version af data og kode, der sidst er blevet deployet.
      </>
    ),
  },
  {
    q: "Hvorfor matcher et produkt ikke altid min søgning?",
    a: (
      <>
        Vi matcher mod titel og beskrivelse fra feedet. Brug kategorier og filtre på{" "}
        <Link className="font-semibold text-pk-blue underline hover:text-pk-navy" href="/soeg">
          søgesiden
        </Link>{" "}
        — og tjek altid den endelige varetekst hos forhandleren før du betaler.
      </>
    ),
  },
  {
    q: "Er links på PokéFind reklame eller affiliate?",
    a: (
      <>
        Nogle udgående links kan være affiliate- eller partnerlinks. De er mærket efter gældende
        praksis; du kan læse den fulde forklaring under{" "}
        <Link
          className="font-semibold text-pk-blue underline hover:text-pk-navy"
          href="/affiliate-disclosure"
        >
          Reklame og affiliate
        </Link>
        .
      </>
    ),
  },
  {
    q: "Hvordan vælger I produkter i guides?",
    a: (
      <>
        I vores guides kan vi fremhæve konkrete varer fra kataloget (produkt-ID’er i koden). Det er et
        redaktionelt udvalg til at illustrere et format — ikke en garanti for laveste pris eller
        bedste tilbud på markedet.
      </>
    ),
  },
  {
    q: "Er PokéFind officielt Pokémon eller Nintendo?",
    a: (
      <>
        Nej. PokéFind er ikke officielt forbundet med Nintendo, Game Freak eller The Pokémon Company.
        Pokémon og varemærker tilhører deres respektive ejere.
      </>
    ),
  },
  {
    q: "Hvem kan jeg kontakte?",
    a: (
      <>
        Skriv til{" "}
        <a
          className="font-semibold text-pk-blue underline hover:text-pk-navy"
          href="mailto:kontakt@pokefind.dk"
        >
          kontakt@pokefind.dk
        </a>{" "}
        eller se{" "}
        <Link className="font-semibold text-pk-blue underline hover:text-pk-navy" href="/kontakt">
          kontakt
        </Link>
        .
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-pk-navy md:text-4xl">
          Ofte stillede spørgsmål
        </h1>
        <p className="mt-3 text-pk-navy/75">
          Korte svar om kataloget, opdateringer og reklame — suppleret af vores{" "}
          <Link className="font-semibold text-pk-blue hover:underline" href="/guider">
            guides
          </Link>
          .
        </p>
      </div>

      <dl className="space-y-6">
        {items.map((item) => (
          <div
            key={item.q}
            className="rounded-2xl border border-pk-blue/12 bg-white p-5 shadow-sm md:p-6"
          >
            <dt className="font-display text-lg font-bold text-pk-navy">{item.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-pk-navy/85 md:text-base">{item.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
