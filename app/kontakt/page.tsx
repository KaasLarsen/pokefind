import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt PokéFind på kontakt@pokefind.dk — spørgsmål om siden, privatliv eller affiliatesamarbejde.",
};

export default function KontaktPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-extrabold text-pk-navy">Kontakt</h1>
      <p className="mt-4 text-sm leading-relaxed text-pk-navy/80">
        Har du spørgsmål om PokéFind, indholdet på siden, privatliv eller
        affiliatesamarbejde? Vi hører gerne fra dig.
      </p>

      <div className="mt-8 rounded-2xl border border-pk-blue/15 bg-white/80 p-6">
        <p className="text-sm font-medium text-pk-navy/70">E-mail</p>
        <p className="mt-2">
          <a
            className="font-display text-xl font-bold text-pk-blue underline decoration-2 underline-offset-4 hover:text-pk-navy"
            href="mailto:kontakt@pokefind.dk"
          >
            kontakt@pokefind.dk
          </a>
        </p>
        <p className="mt-4 text-xs text-pk-navy/60">
          Vi bestræber os på at svare inden for et par hverdage. Ved henvendelser om
          persondata henviser vi til vores{" "}
          <a className="underline hover:text-pk-navy" href="/privacy">
            privatlivspolitik
          </a>
          .
        </p>
      </div>
    </div>
  );
}
