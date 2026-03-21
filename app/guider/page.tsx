import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "../../src/lib/content";

export const metadata: Metadata = {
  title: "Guides — PokéFind",
  description:
    "Nyttige, evergreen guides til Pokémon TCG og tilbehør — skrevet til danske købere.",
};

export default function GuidesIndexPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-pk-navy md:text-4xl">
          Guides
        </h1>
        <p className="mt-2 max-w-2xl text-pk-navy/75">
          Korte, praktiske artikler du kan stole på, når du skal vælge rigtigt første gang —
          eller når du vil spare tid og undgå dyre fejlkøb.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {guides.map((g) => (
          <li key={g.id}>
            <Link
              href={`/guider/${g.slug}`}
              className="pk-card block hover:no-underline"
            >
              <div className="pk-card-inner py-6">
                <span className="font-display text-lg font-bold text-pk-navy">
                  {g.title}
                </span>
                <p className="mt-2 text-sm text-pk-navy/70">{g.summary}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-pk-blue">
                  Læs guiden →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
