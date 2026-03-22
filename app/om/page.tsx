import type { Metadata } from "next";
import JsonLd from "../../src/components/JsonLd";
import { buildOrganizationJsonLd } from "../../src/lib/structuredData";

export const metadata: Metadata = {
  title: "Om PokéFind",
  description:
    "PokéFind er en uafhængig dansk købsguide til Pokémon TCG og tilbehør — ikke officielt forbundet med The Pokémon Company.",
};

export default function OmPage() {
  return (
    <div className="max-w-2xl">
      <JsonLd data={buildOrganizationJsonLd()} />
      <h1 className="font-display text-3xl font-extrabold text-pk-navy">Om PokéFind</h1>
      <p className="mt-4 text-sm leading-relaxed text-pk-navy/80">
        PokéFind hjælper dig med at finde produkter, sammenligne formater og læse korte,
        danske guides — så du hurtigere kan træffe et godt køb. Vi samler søgning,
        kategorier og indhold ét sted.
      </p>
      <div className="mt-8 space-y-4 rounded-2xl border border-pk-blue/15 bg-white/80 p-5 text-sm leading-relaxed text-pk-navy/85">
        <section>
          <h2 className="font-semibold text-pk-navy">Uafhængig guide</h2>
          <p className="mt-2">
            Vi er en uafhængig købsguide. Vi sælger ikke selv produkterne — vi linker til
            butikker og markedspladser, hvor du kan handle. Nogle links kan være
            affiliate/reklame; de er markeret tydeligt, og du kan læse mere under{" "}
            <a className="font-semibold text-pk-blue underline hover:text-pk-navy" href="/affiliate-disclosure">
              reklame/affiliate
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-pk-navy">Ikke officielt Pokémon</h2>
          <p className="mt-2">
            PokéFind er <strong>ikke</strong> officielt forbundet med, sponsoreret af eller
            godkendt af Nintendo, Game Freak eller The Pokémon Company. Pokémon og
            tilhørende varemærker tilhører deres respektive ejere.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-pk-navy">Spørgsmål?</h2>
          <p className="mt-2">
            Skriv til os på{" "}
            <a
              className="font-semibold text-pk-blue underline hover:text-pk-navy"
              href="mailto:kontakt@pokefind.dk"
            >
              kontakt@pokefind.dk
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
