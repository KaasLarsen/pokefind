const steps = [
  {
    n: "1",
    title: "Vælg retning",
    body: "Start med en kategori, en guide — eller søg direkte efter det du står og mangler.",
  },
  {
    n: "2",
    title: "Sammenlign og læs",
    body: "Vi forklarer forskelle (fx ETB vs. booster box) så du ikke køber “det forkerte” i panik.",
  },
  {
    n: "3",
    title: "Køb med overblik",
    body: "Klik videre til butik — betalt reklame er tydeligt markeret. Vi tilføjer løbende flere butikker.",
  },
];

export default function HowItWorks() {
  return (
    <section className="pk-card">
      <div className="pk-card-inner">
        <h2 className="font-display text-xl font-bold text-pk-navy">
          Sådan bruger du PokéFind
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-pk-navy/70">
          Målet er simpelt: gøre det nemt for danskere at handle Pokémon trygt — med bedre
          struktur end et tilfældigt søgeresultat.
        </p>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-2xl border border-pk-blue/10 bg-pk-cream/50 p-5"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-pk-navy text-sm font-black text-white">
                {s.n}
              </span>
              <div className="mt-3 font-display font-bold text-pk-navy">
                {s.title}
              </div>
              <p className="mt-2 text-sm text-pk-navy/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
