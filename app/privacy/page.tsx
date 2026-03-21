import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privatliv",
  description: "Privatlivspolitik for PokéFind — kontakt kontakt@pokefind.dk ved spørgsmål om dine data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-extrabold text-pk-navy">Privatlivspolitik</h1>
      <p className="mt-4 text-sm leading-relaxed text-pk-navy/80">
        Denne tekst beskriver, hvordan PokéFind (&quot;vi&quot;, &quot;os&quot;) håndterer
        personoplysninger i forbindelse med brug af pokefind.dk. Vi opdaterer den
        løbende, når vi ændrer funktioner eller indsamling.
      </p>

      <div className="mt-8 space-y-6 rounded-2xl border border-pk-blue/15 bg-white/80 p-5 text-sm leading-relaxed text-pk-navy/85">
        <section>
          <h2 className="font-semibold text-pk-navy">Dataansvarlig</h2>
          <p className="mt-2">
            Ved spørgsmål om behandling af personoplysninger kan du kontakte os på{" "}
            <a
              className="font-semibold text-pk-blue underline hover:text-pk-navy"
              href="mailto:kontakt@pokefind.dk"
            >
              kontakt@pokefind.dk
            </a>
            .
          </p>
        </section>

        <section>
          <div className="font-semibold text-pk-navy">Hvilke data kan vi behandle?</div>
          <div className="mt-2">
            Vi bruger kun data der er nødvendig for driften — fx tekniske logfiler ved
            fejl — samt evt. anonymiseret eller aggregeret statistik, når det er
            aktiveret og du har givet samtykke via vores cookievalg.
          </div>
        </section>

        <section>
          <div className="font-semibold text-pk-navy">Affiliate-links</div>
          <div className="mt-2">
            Når du klikker på reklame-/affiliate-links, kan partneren registrere klik
            og i nogle tilfælde transaktioner. På sitet markeres betalte links tydeligt,
            og du kan læse mere under{" "}
            <a className="font-semibold text-pk-blue underline" href="/affiliate-disclosure">
              reklame/affiliate
            </a>
            .
          </div>
        </section>

        <section>
          <div className="font-semibold text-pk-navy">Cookies og samtykke</div>
          <div className="mt-2">
            Vi viser et cookievalg-banner. Dit valg gemmes lokalt på din enhed (fx via{" "}
            <code className="rounded bg-pk-navy/5 px-1">localStorage</code>). Læs mere
            på siden{" "}
            <a className="font-semibold text-pk-blue underline" href="/cookies">
              Cookies
            </a>
            .
          </div>
        </section>

        <section>
          <div className="font-semibold text-pk-navy">Dine rettigheder</div>
          <div className="mt-2">
            Efter gældende regler kan du have ret til indsigt, berigtigelse, sletning,
            begrænsning eller indsigelse. Kontakt os på{" "}
            <a className="font-semibold text-pk-blue underline" href="mailto:kontakt@pokefind.dk">
              kontakt@pokefind.dk
            </a>
            .
          </div>
        </section>
      </div>
    </div>
  );
}
