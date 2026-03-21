import { AffiliateDisclosureBox } from "../../src/components/AffiliateDisclosureBox";

export default function AffiliateDisclosurePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Reklame-/affiliate-disclosure</h1>
      <p className="mt-2 text-sm text-slate-700">
        Denne side forklarer, hvordan affiliate-/reklamelinks kan indgå i
        anbefalinger.
      </p>

      <div className="mt-6">
        <AffiliateDisclosureBox />
      </div>

      <div className="mt-6 space-y-4 text-sm text-slate-800">
        <section>
          <div className="font-semibold">Hvad betyder “Reklamelink”?</div>
          <div className="mt-1">
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
      </div>
    </div>
  );
}

