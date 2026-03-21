import type { Metadata } from "next";
import { AffiliateDisclosureBox } from "../../src/components/AffiliateDisclosureBox";

export const metadata: Metadata = {
  title: "Reklame og affiliate",
  description:
    "Sådan bruger PokéFind affiliate- og reklamelinks. Kontakt: kontakt@pokefind.dk.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-extrabold text-pk-navy">
        Reklame og affiliate
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-pk-navy/80">
        Denne side forklarer, hvordan affiliate-/reklamelinks kan indgå i
        anbefalinger.
      </p>

      <div className="mt-6">
        <AffiliateDisclosureBox />
      </div>

      <div className="mt-6 space-y-4 text-sm leading-relaxed text-pk-navy/85">
        <section>
          <div className="font-semibold text-pk-navy">Hvad betyder “Reklamelink”?</div>
          <div className="mt-2">
            Når du ser en anbefaling med en reklamelink-label ved CTA, kan
            vores site modtage provision, hvis du klikker videre og foretager
            et køb.
          </div>
        </section>

        <section>
          <div className="font-semibold">Vigtig for brugeren</div>
          <div className="mt-1">
            Vi gør vores bedste for at anbefale relevant og nyttig info, men
            priser og lager afhænger af den konkrete butik/partner.
          </div>
        </section>
        <section>
          <div className="font-semibold text-pk-navy">Kontakt</div>
          <div className="mt-2">
            Spørgsmål?{" "}
            <a className="font-semibold text-pk-blue underline" href="mailto:kontakt@pokefind.dk">
              kontakt@pokefind.dk
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

