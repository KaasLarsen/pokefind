import Link from "next/link";
import { categories } from "../lib/content";

const ACCENTS = [
  "from-pk-yellow via-amber-400 to-orange-500",
  "from-pk-blue via-sky-400 to-pk-sky",
  "from-pk-mint via-emerald-400 to-teal-600",
  "from-pk-red via-rose-500 to-red-700",
  "from-violet-500 via-purple-500 to-indigo-600",
  "from-pk-electric via-pk-yellow-bright to-amber-300",
];

export default function HomeQuickNav() {
  const tiles = categories.slice(0, 6);

  return (
    <section
      aria-label="Hurtige kategorier"
      className="relative z-10 isolate"
    >
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-pk-navy md:text-3xl">
            Vælg dit{" "}
            <span className="bg-gradient-to-r from-pk-blue to-pk-mint bg-clip-text text-transparent">
              format
            </span>
          </h2>
          <p className="mt-1 text-sm font-medium text-pk-navy/65">
            Hurtige genveje — som et “team” af muligheder, ikke endnu en tom forside.
          </p>
        </div>
        <Link
          href="/kategorier"
          className="shrink-0 text-sm font-bold text-pk-blue underline decoration-2 underline-offset-4 hover:text-pk-navy"
        >
          Alle kategorier →
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {tiles.map((c, i) => (
          <li key={c.id}>
            <Link
              href={`/kat/${c.slug}`}
              className={`group relative flex min-h-[7.5rem] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-4 text-white shadow-lg shadow-pk-navy/15 transition duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-pk-navy/25 touch-manipulation active:scale-[0.99] ${ACCENTS[i % ACCENTS.length]}`}
            >
              <span
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-2xl transition group-hover:bg-white/25"
                aria-hidden
              />
              <span className="relative text-[10px] font-bold uppercase tracking-widest text-white/85">
                Kategori
              </span>
              <span className="relative font-display text-lg font-extrabold leading-tight drop-shadow-sm">
                {c.title}
              </span>
              <span className="relative text-xs font-medium text-white/90">
                Se guides + køb →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
