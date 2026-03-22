# SEO- og indholdskalender (PokéFind)

Brug som checklist — tilpas datoer efter jeres kapacitet.

## Hver måned

- Kør `npm run ingest:feed` (eller CI) så `data/products.json` matcher aktuelle feeds.
- Deploy til produktion så priser og udvalg ikke ser forældede ud.

## Hvert kvartal

- Vælg **1–2** sider fra [seo-content-pillars.md](./seo-content-pillars.md) og udvid teksten (nye afsnit, eksempler, interne links).
- Gennemgå **top 3 guides** i Analytics/Search Console: opdatér årstal, serienavne eller prisniveau hvis teksten er forældet.
- Tjek at [sitemap.xml](https://www.pokefind.dk/sitemap.xml) og vigtige URL’er returnerer 200.

## Ved nye Pokémon TCG-serier / større produktlanceringer

- Tilføj **én sætning** i relevant kategori-`longBody` eller begynderguide om den nye serie (friskhedssignal).
- Opdatér evt. FAQ hvis brugere ofte spørger om det samme.

## Google Search Console

- Verificér ejendommen for `pokefind.dk` (hvis ikke gjort).
- Følg **Sideoplevelser** og **Søgeforespørgsler** — justér titler/beskrivelser kun når data viser et klart mønster.
