# Datafiler

- **`feeds.json`** — Jeres faste Partner-ads feed-URL’er (én `url` pr. butik/feed). Repoet indeholder **9 feeds** (samme `partnerid`, forskellige `bannerid`/`feedid`) som i chat-historikken.
- **`products.json`** — Genereres af `npm run ingest:feed` ud fra feeds (ikke redigér manuelt med mindre I ved hvad I gør).

Hvis I mener der mangler feeds i `feeds.json`, så kopier de resterende URL’er ind fra Partner-ads — de kan ikke altid genskabes fra chat-historik.

## Guides med fremhævede produkter

I `src/lib/content.ts` kan hver guide have **`featuredProductIds`**: en liste af streng-id’er der findes i `products.json` (samme som feltet `id` på hvert produkt). Bruges til at vise **produktkort** på `/guider/[slug]`.

Efter et nyt ingest: tjek at id’erne stadig findes — ellers opdatér listen eller fjern udløbne varer.

## Billeder fra feeds

- Ingest-scriptet lægger billed-URL’er i feltet **`imageUrl`** pr. produkt (se `ProductRecord` i `src/lib/productTypes.ts`).
- På websitet vises de med **Next.js `Image`** (AVIF/WebP, korrekt `sizes` til grid) i en **fast kvadratisk ramme** med **`object-contain`**, så forskellige billedformater ikke beskæres mærkeligt.
- **Nye butiksdomæner:** Tilføj `hostname` under `images.remotePatterns` i **`next.config.mjs`**, ellers kan billedet ikke optimeres. Kør evt. `node -e "const j=require('./data/products.json');..."` for at liste unikke domæner.
