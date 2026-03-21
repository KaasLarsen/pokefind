# Partner-feeds (Partner-ads m.fl.)

De produkt-feeds du får fra **Partner-ads** (URL’er med `feed_udlaes.php`, `partnerid`, `bannerid`, `feedid`) er **rigtige affiliate-feeds** fra dine godkendte partnere — ikke “demo-data”. De skal bare **hentes og mappes** ind i `data/products.json` via vores ingest-script.

## Sådan opdaterer du kataloget

1. Læg **alle** faste Partner-ads-feeds i **`data/feeds.json`** (ét objekt pr. feed med `id` + `url`). Så kan du bare køre `npm run ingest:feed` uden at sætte miljøvariabler hver gang.
2. Alternativt (CI eller engangskørsel): sæt `FEED_URL` eller `FEED_URLS` — de **overskriver ikke** `feeds.json` i den forstand at de bruges *i stedet for* filen, hvis de er sat (prioritet: miljø først, derefter `data/feeds.json`).

```bash
# Bruger automatisk data/feeds.json hvis FEED_URL(S) ikke er sat
npm run ingest:feed

# Ét feed (overskriver filen)
FEED_URL="https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=...&bannerid=...&feedid=..." npm run ingest:feed

# Flere feeds (komma- eller linjeskilt liste)
FEED_URLS="https://...feed1...,https://...feed2..." npm run ingest:feed
```

3. Commit den genererede `data/products.json` **eller** generér den ved build/deploy (så den altid er frisk).

## Sikkerhed

- Feed-URL’er indeholder ofte **partner- og banner-id’er**. Behandl dem som **hemmelige** hvis I ønsker det: læg dem i `.env.local` (ikke commit) og injicer som miljøvariabler i build.

## Filtrering

Scriptet beholder som udgangspunkt kun rækker der matcher Pokémon/TCG (`pokemon`, `pokémon`, `tcg` osv. i titel/beskrivelse). Matcher intet, falder det tilbage til **alle varer med gyldigt link** (så I stadig får data hvis filteret er for stramt). Juster regex i `scripts/ingest-feed.mjs` efter behov.

## Felter vi læser fra XML

Typisk Partner-ads: `produktnavn`, `beskrivelse`, `forhandler`, `nypris` / `glpris`, `billedurl`, `vareurl`, `produktid`, `ean`, `kategorinavn`.

## Relateret

- `scripts/ingest-feed.mjs` — fetch, parse, skriv `data/products.json`
- `src/lib/productTypes.ts` — datastruktur på sitet
