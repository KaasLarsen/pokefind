export default function CookiesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Cookievalg</h1>
      <p className="mt-2 text-sm text-slate-700">
        Udkast til cookievalg. I MVP viser vi først siden uden avanceret
        cookie-banner; når vi tilføjer analytics og andre cookies, tilpasser
        vi samtykke-UI’et efter krav.
      </p>

      <div className="mt-6 space-y-4 rounded border border-slate-200 p-4 text-sm">
        <section>
          <div className="font-semibold">Nødvendige cookies</div>
          <div className="mt-1 text-slate-700">
            Bruges til at siden kan fungere korrekt.
          </div>
        </section>
        <section>
          <div className="font-semibold">Statistik/marketing</div>
          <div className="mt-1 text-slate-700">
            I denne MVP bruger vi endnu ikke analytics/markedsføring. Når
            tracking aktiveres, vil statistiske/marketing-cookies kun blive
            sat efter samtykke.
          </div>
        </section>
        <section>
          <div className="font-semibold">Hvordan gemmes dit valg?</div>
          <div className="mt-1 text-slate-700">
            Cookievalget gemmes som standard i <code>localStorage</code> på
            din enhed, så vi kan respektere dit samtykke ved næste besøg.
          </div>
        </section>
      </div>
    </div>
  );
}

