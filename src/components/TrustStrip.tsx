import { IconBolt, IconBook, IconShield } from "./icons";

const items = [
  {
    title: "Ét sted at starte",
    body: "Kategorier og guides på dansk — mindre støj, mere retning end et råt Google-søgeresultat.",
    icon: IconBook,
    shell:
      "border-pk-blue/25 bg-gradient-to-br from-white to-sky-50/80 shadow-md shadow-sky-200/40",
    iconBg: "from-sky-400 to-pk-blue text-white",
  },
  {
    title: "Tydelig reklame",
    body: "Når et link kan give os provision, siger vi det. Ingen skjulte “mærkelige” købslinks.",
    icon: IconShield,
    shell:
      "border-amber-200/80 bg-gradient-to-br from-white to-amber-50/90 shadow-md shadow-amber-200/50",
    iconBg: "from-pk-yellow to-pk-electric text-pk-ink",
  },
  {
    title: "Skarp søgning",
    body: "Find produkter, guides og kategorier samlet — bygget til Pokémon TCG og tilbehør.",
    icon: IconBolt,
    shell:
      "border-emerald-200/70 bg-gradient-to-br from-white to-emerald-50/80 shadow-md shadow-emerald-200/40",
    iconBg: "from-pk-mint to-teal-500 text-pk-ink",
  },
];

export default function TrustStrip() {
  return (
    <section
      aria-label="Hvorfor PokéFind"
      className="grid gap-4 md:grid-cols-3"
    >
      {items.map(({ title, body, icon: Icon, shell, iconBg }) => (
        <div
          key={title}
          className={`rounded-3xl border p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${shell}`}
        >
          <div className="flex items-start gap-4">
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg ${iconBg}`}
            >
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-pk-navy">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-pk-navy/75">
                {body}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
