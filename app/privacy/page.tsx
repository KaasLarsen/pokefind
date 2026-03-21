export default function PrivacyPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Privacy policy</h1>
      <p className="mt-2 text-sm text-slate-700">
        Udkast til privacy policy for MVP. Når vi tilslutter analytics/cookies
        og evt. affiliate tracking, tilpasser vi teksten til den faktiske
        dataindsamling.
      </p>

      <div className="mt-6 space-y-4 rounded border border-slate-200 p-4 text-sm">
        <section>
          <div className="font-semibold">Hvilke data kan vi behandle?</div>
          <div className="mt-1 text-slate-700">
            Typisk bruges kun data der er nødvendig for driften (fx log-instruks
            ved fejl) samt evt. anonymiseret analyse, når det er aktiveret.
          </div>
        </section>
        <section>
          <div className="font-semibold">Affiliate links</div>
          <div className="mt-1 text-slate-700">
            Når affiliate-/reklamelinks er aktive, kan affiliate-partneren
            registrere klik og i nogle tilfælde transaktioner. På sitet
            mærker vi monetiserede CTA’er som <b>Reklamelink</b> og har en
            dedikeret disclosure-side.
          </div>
        </section>
        <section>
          <div className="font-semibold">Cookies og samtykke</div>
          <div className="mt-1 text-slate-700">
            Denne MVP viser et cookievalg-banner. Dit samtykke gemmes lokalt på
            din enhed (fx via <code>localStorage</code>). I denne MVP er der
            ikke aktiveret analytics/markedsførings-cookies, men når vi gør,
            vil de blive sat efter samtykke.
          </div>
        </section>
      </div>
    </div>
  );
}

