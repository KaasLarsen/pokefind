import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Information om cookies og samtykke på PokéFind. Kontakt: kontakt@pokefind.dk.",
};

export default function CookiesPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-extrabold text-pk-navy">Cookies</h1>
      <p className="mt-2 text-sm text-slate-700">
        Udkast til cookievalg. I MVP viser vi først siden uden avanceret
        cookie-banner; når vi tilføjer analytics og andre cookies, tilpasser
        vi samtykke-UI’et efter krav.
      </p>

      <div className="mt-6 space-y-4 rounded border border-slate-200 p-4 text-sm">
        <section>
          <div className="font-semibold text-pk-navy">Nødvendige cookies</div>
          <div className="mt-2">
            Bruges så siden kan fungere korrekt (fx visning af indhold og
            cookievalg).
          </div>
        </section>
        <section>
          <div className="font-semibold text-pk-navy">Statistik/marketing</div>
          <div className="mt-2">
            Vi udvider løbende med statistik, når det er relevant. Sådanne cookies
            sættes kun efter dit samtykke i cookie-banneret.
          </div>
        </section>
        <section>
          <div className="font-semibold text-pk-navy">Hvordan gemmes dit valg?</div>
          <div className="mt-2">
            Cookievalget gemmes typisk i{" "}
            <code className="rounded bg-pk-navy/5 px-1">localStorage</code> på din
            enhed, så vi kan respektere dit samtykke ved næste besøg.
          </div>
        </section>
      </div>
    </div>
  );
}

