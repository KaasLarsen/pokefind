# Datafiler

- **`feeds.json`** — Jeres faste Partner-ads feed-URL’er (én `url` pr. butik/feed). Repoet indeholder **8 feeds** (samme `partnerid`, forskellige `bannerid`/`feedid`) som i chat-historikken.
- **`products.json`** — Genereres af `npm run ingest:feed` ud fra feeds (ikke redigér manuelt med mindre I ved hvad I gør).

Hvis I mener der mangler feeds i `feeds.json`, så kopier de resterende URL’er ind fra Partner-ads — de kan ikke altid genskabes fra chat-historik.
