# Informationsarkitektur til Pokémon affiliate-katalog (MVP)

## Sidetyper (hvad brugeren ser)
1. `Hjem` (`/`)
   - Kort forklaring af værdi: “Kuraterede køb til Pokémon TCG + guides på tværs af butikker”
   - Hurtige links til top-kategorier (fx Booster boxes, ETB, Sleeves)
   - “Hvordan vi tjener penge” (disclosure entry-point)
2. `Katalog` / `Kategorier` (`/kategorier`)
   - Grid/listing af alle kategorier
   - Intern navigation til den enkelte kategori
3. `Kategori` (liste + anbefalinger) (`/kat/{slug}`)
   - Filterpanel (klient-side) baseret på behov
   - Kuraterede anbefalinger (10-30 “køb her”-kort)
   - Hver anbefaling har en label (Reklamelink/Annonce) ved outbound CTA
4. `Evergreen guide` (`/guider/{slug}`)
   - Trin-for-trin beslutningsguide
   - “Anbefalede køb” sektion med links (med disclosure)
5. `Shop/provider` (`/butikker/{slug}`)
   - Hvilke produkt-typer/provideren dækker
   - Hurtige outbound links til relevante kategorier
6. `Affiliate disclosure` (`/affiliate-disclosure`)
7. `Privacy policy` (`/privacy`)
8. `Cookie policy / cookie-samtykke` (`/cookies`)

## Dataentiteter (model vi bruger i MVP)
1. `Category`
   - `id`, `slug`, `title`
   - `searchIntent` (hvilken beslutning brugeren tager)
   - `formats` (matcher vores filter “produktformat”)
   - `audiences` (matcher “til hvem”)
2. `Guide`
   - `id`, `slug`, `title`
   - `summary`
   - `audience` (begynder/erfaren)
   - `recommendedCategoryIds`
3. `AffiliateProvider` (netværk/butik)
   - `id`, `slug`, `name`
   - `network` (amazon, ebay, awin, partner-ads)
   - `outboundUrlTemplateByFormat` (template med query placeholders)
4. `Recommendation`
   - `id`
   - `categoryId`
   - `providerId`
   - `title` (fx “Booster Box (kanaliseret søgning)”)
   - `whyThisPick` (kort tekst: “hvorfor denne løsning”)
   - `labels` (fx `Reklamelink`)
   - `outboundUrl` (udfyldes fra template + filterparametre)

## Produktkategorier til MVP (første 10-12)
MVP starter med katalog-kategorier, der matcher de mest almindelige søge-intenter:
1. `booster-packs` (Booster packs)
2. `booster-boxes` (Booster boxes / displays)
3. `etb` (Elite Trainer Boxes)
4. `blister-packs` (Blister packs)
5. `tins` (Tins / Collection tins)
6. `single-cards` (Enkeltkort / kort enkeltvis)
7. `sleeves-protectors` (Sleeves, ærmer, protectors)
8. `deck-boxes-binders` (Deck boxes og binders)
9. `playmats` (Playmats)
10. `grading-psa` (PSA/graded cards)
11. `tcg-online-codes` (TCG Online koder)
12. `starter-bundles` (Starter-bundles / begynderpakker)

## Evergreen guides til MVP (første 5-10)
Eksempler på guidetyper, der kan ranke evergreen:
1. “Hvad skal jeg købe som nybegynder?” (ETB vs boosters)
2. “Booster box vs ETB vs single cards: hvad giver mest værdi?”
3. “Sådan undgår du at købe det forkerte kort til dine børn”
4. “Sleeves og opbevaring: hvad skal du bruge og hvorfor?”
5. “Deckbuilding for begyndere: sådan samler du et deck”
6. “PSA grading: hvornår giver det mening?”
7. “TCG Online codes: hvordan finder du dem?”

## Filterfelter (for kategori-sider)
Filter skal være enkelt nok til at være brugbart i MVP, men struktureret nok til at skabe relevante outbound links.

1. `searchQuery` (valgfri fri tekst)
2. `audience`
   - `begynder`
   - `erfaren`
   - `børn`
3. `priceTier`
   - `budget` (lav)
   - `mellem`
   - `premium` (høj)
4. `format`
   - matcher kategoriens primære format (fx booster-packs, etb, tins)
5. `region`
   - `DK`
   - `EU`
6. `language` (kun hvis nødvendigt for link-URL templates; default `da`)

## SEO/URL-principper
- Kategorier: stabile slugs (ingen parametre i sluggen).
- Guides: slugs der matcher intent (fx `/guider/nybegynder-etb-vs-boosters`).
- Interne links på tværs: Kategori-sider linker til relevante guides og vice versa.

