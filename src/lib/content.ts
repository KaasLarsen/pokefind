export type Audience = "begynder" | "erfaren" | "børn";
export type PriceTier = "budget" | "mellem" | "premium";
export type Format =
  | "booster-pack"
  | "booster-box"
  | "etb"
  | "blister"
  | "tin"
  | "single-card"
  | "accessory-sleeves"
  | "accessory-storage"
  | "playmat"
  | "grading"
  | "tcg-online";

export type Category = {
  id: string;
  slug: string;
  title: string;
  description: string;
  searchKeywords: string[]; // used to build outbound search links
  formats: Format[];
  audiences: Audience[];
  priceTiers?: PriceTier[];
};

export type Guide = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  audience: Exclude<Audience, "børn">;
  recommendedCategorySlugs: string[];
  steps: { heading: string; body: string }[];
};

export type AffiliateProvider = {
  id: string;
  name: string;
  enabled: boolean;
  network: "amazon" | "ebay" | "awin" | "partner-ads";
  buildSearchUrl: (query: string) => string;
};

export const affiliateProviders: AffiliateProvider[] = [
  /* Kun slå til når I har aktiv aftale + korrekt taggede links (Associates/EPN el.lign.) */
  {
    id: "amazon",
    name: "Amazon.dk (affiliate)",
    enabled: false,
    network: "amazon",
    buildSearchUrl: (query) =>
      `https://www.amazon.dk/s?k=${encodeURIComponent(query)}`,
  },
  {
    id: "ebay",
    name: "eBay (affiliate)",
    enabled: false,
    network: "ebay",
    buildSearchUrl: (query) =>
      `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}`,
  },
  {
    id: "awin",
    name: "Awin (kommer snart)",
    enabled: false,
    network: "awin",
    buildSearchUrl: (query) => `https://example.com/awin?query=${query}`,
  },
  {
    id: "partner-ads",
    name: "Partner-ads (kommer snart)",
    enabled: false,
    network: "partner-ads",
    buildSearchUrl: (query) => `https://example.com/partner-ads?query=${query}`,
  },
];

export const categories: Category[] = [
  {
    id: "booster-packs",
    slug: "booster-packs",
    title: "Booster packs",
    description:
      "Små, sjove pakker til overraskelser. Perfekt når du vil i gang uden at bruge en stor sum.",
    searchKeywords: ["pokemon booster pack", "pokemon booster packs"],
    formats: ["booster-pack"],
    audiences: ["børn", "begynder"],
    priceTiers: ["budget", "mellem"],
  },
  {
    id: "booster-boxes",
    slug: "booster-boxes",
    title: "Booster boxes / displays",
    description:
      "Når du vil have mange boosters i én investering. Typisk favorit blandt dedikerede samlere.",
    searchKeywords: ["pokemon booster box", "pokemon booster display"],
    formats: ["booster-box"],
    audiences: ["erfaren", "begynder"],
    priceTiers: ["mellem", "premium"],
  },
  {
    id: "etb",
    slug: "etb",
    title: "Elite Trainer Boxes (ETB)",
    description:
      "En “alt-i-en” løsning med booster packs + ekstra tilbehør. God værdi til både samling og startpakker.",
    searchKeywords: ["pokemon elite trainer box", "pokemon etb"],
    formats: ["etb"],
    audiences: ["begynder", "børn"],
    priceTiers: ["mellem", "premium"],
  },
  {
    id: "blister-packs",
    slug: "blister-packs",
    title: "Blister packs",
    description:
      "Ofte 1 booster + et ekstra promo-element. God mellemting mellem booster packs og større bokse.",
    searchKeywords: ["pokemon blister pack", "pokemon blister packs"],
    formats: ["blister"],
    audiences: ["begynder", "børn"],
    priceTiers: ["budget", "mellem"],
  },
  {
    id: "tins",
    slug: "tins",
    title: "Tins / Collection tins",
    description:
      "En fed gave-løsning: booster(s) + ofte promo-kort og en praktisk opbevaringsdåse.",
    searchKeywords: ["pokemon collection tin", "pokemon tin"],
    formats: ["tin"],
    audiences: ["begynder", "børn"],
    priceTiers: ["budget", "mellem", "premium"],
  },
  {
    id: "single-cards",
    slug: "single-cards",
    title: "Enkeltkort",
    description:
      "Når du vil vælge præcis det kort du mangler (eller bygge et deck målrettet).",
    searchKeywords: ["pokemon singles", "pokemon card singles"],
    formats: ["single-card"],
    audiences: ["erfaren", "begynder"],
    priceTiers: ["budget", "mellem", "premium"],
  },
  {
    id: "sleeves-protectors",
    slug: "sleeves-protectors",
    title: "Sleeves & protectors",
    description:
      "Sådan beskytter du dine kort mod slid. For mange er sleeves det vigtigste “før køb”.",
    searchKeywords: ["pokemon card sleeves", "pokemon card protectors"],
    formats: ["accessory-sleeves"],
    audiences: ["begynder", "erfaren"],
    priceTiers: ["budget", "mellem"],
  },
  {
    id: "deck-boxes-binders",
    slug: "deck-boxes-binders",
    title: "Deck boxes & binders",
    description:
      "Praktisk opbevaring til deckbuilding og samling. Perfekt når du både spiller og samler.",
    searchKeywords: ["pokemon deck box", "pokemon binder"],
    formats: ["accessory-storage"],
    audiences: ["begynder", "erfaren"],
    priceTiers: ["budget", "mellem", "premium"],
  },
  {
    id: "playmats",
    slug: "playmats",
    title: "Playmats",
    description:
      "Gør spillet rarere og mere “pro”. En playmat beskytter bordet og samler dine kort pænt.",
    searchKeywords: ["pokemon playmat"],
    formats: ["playmat"],
    audiences: ["begynder", "erfaren"],
    priceTiers: ["budget", "mellem", "premium"],
  },
  {
    id: "grading-psa",
    slug: "grading-psa",
    title: "PSA grading (graded cards)",
    description:
      "Når du vil vurdere og beskytte særligt værdifulde kort. Læs hvornår det giver mening før du går all-in.",
    searchKeywords: ["psa graded pokemon card", "pokemon grading psa"],
    formats: ["grading"],
    audiences: ["erfaren"],
    priceTiers: ["premium"],
  },
  {
    id: "tcg-online-codes",
    slug: "tcg-online-codes",
    title: "TCG Online koder",
    description:
      "Hvis du spiller TCG Online: brug koder til at komme i gang med decks og udvidelser.",
    searchKeywords: ["pokemon tcg online code", "tcg online code"],
    formats: ["tcg-online"],
    audiences: ["begynder", "erfaren", "børn"],
    priceTiers: ["budget", "mellem"],
  },
  {
    id: "starter-bundles",
    slug: "starter-bundles",
    title: "Starter-bundles",
    description:
      "Kuraterede “kom hurtigt i gang”-sammensætninger til børn, begyndere og gave-køb.",
    searchKeywords: ["pokemon starter set", "pokemon bundle"],
    formats: ["booster-pack", "etb"],
    audiences: ["børn", "begynder"],
    priceTiers: ["budget", "mellem"],
  },
];

export const guides: Guide[] = [
  {
    id: "guide-begynder-køb",
    slug: "hvad-skal-jeg-koebe-som-begynder",
    title: "Hvad skal jeg købe som nybegynder?",
    summary: "Booster packs vs ETB vs enkeltkort: sådan vælger du hurtigt det rigtige.",
    audience: "begynder",
    recommendedCategorySlugs: ["etb", "booster-packs", "single-cards", "sleeves-protectors"],
    steps: [
      {
        heading: "Start med formatet (hvad vil du have ud af købet?)",
        body: "Vil du have overraskelser, en samlet start eller præcise kort? Vælg derefter: ETB (værdi + tilbehør), booster packs (budget + sjov) eller enkeltkort (målrettet).",
      },
      {
        heading: "Tænk beskyttelse tidligt",
        body: "Sleeves er ofte den bedste “før du får sjældne kort”-investering. Det gør det lettere at samle og handle senere.",
      },
      {
        heading: "Gør det nemt for barnet/begynderen",
        body: "Starter-bundles og tins kan gøre hobbyen mere overskuelig (færre valg, mere klar pakkeværdi).",
      },
    ],
  },
  {
    id: "guide-værdi-sammenligning",
    slug: "booster-box-vs-etb-vs-enkeltkort",
    title: "Booster box vs ETB vs enkeltkort: hvad giver mest værdi?",
    summary: "Sammenlign format, kort pr. krone (princip) og “hvad du får” i praksis.",
    audience: "begynder",
    recommendedCategorySlugs: ["booster-boxes", "etb", "single-cards", "deck-boxes-binders"],
    steps: [
      {
        heading: "Booster box = volumen og samlerglæde",
        body: "Når du vil trække mange kort, og du er ok med tilfældigheden. God til at bygge bredt over tid.",
      },
      {
        heading: "ETB = værdi + organiseret start",
        body: "ETB’er giver ofte mere “pakkeoplevelse” og tilbehør. Perfekt hvis du vil have en stram startpakke.",
      },
      {
        heading: "Enkeltkort = målrettet deckbuilding",
        body: "Hvis du vil bygge et deck og mangle specifikke kort, så er enkeltkort typisk den mest effektive vej.",
      },
    ],
  },
  {
    id: "guide-undgå-forkert-køb",
    slug: "sadan-undgar-du-at-koebe-det-forkerte",
    title: "Sådan undgår du at købe det forkerte kort/produkt",
    summary: "Små fejl (forkert type, forkert behov) koster typisk mest i “frustration”, ikke kun kroner.",
    audience: "begynder",
    recommendedCategorySlugs: ["single-cards", "starter-bundles", "sleeves-protectors"],
    steps: [
      {
        heading: "Start med “brugsscenariet”",
        body: "Spil (deckbuilding) eller samle (display)? Løsningen skal passe til, hvad der giver glæde næste uge, ikke kun næste måned.",
      },
      {
        heading: "Tjek format før du trykker køb",
        body: "Booster packs, blisters, ETB og tins føles ens i søgning, men opleves meget forskelligt i indhold og værdi.",
      },
      {
        heading: "Køb beskyttelse samtidig",
        body: "Hvis du køber enkeltkort eller graded cards, så planlæg sleeves/protectors først eller samtidig.",
      },
    ],
  },
  {
    id: "guide-sleeves",
    slug: "sleeves-og-opbevaring-hvad-du-bruger",
    title: "Sleeves og opbevaring: hvad skal du bruge og hvorfor?",
    summary: "En praktisk guide til at holde kortene fine, uanset om du spiller eller samler.",
    audience: "begynder",
    recommendedCategorySlugs: ["sleeves-protectors", "deck-boxes-binders", "playmats"],
    steps: [
      {
        heading: "Sleeves: den hurtigste investering",
        body: "Hvis et kort er “sejt”, så er det også et kort du ikke vil beskadige. Sleeves beskytter mod hverdagens slid.",
      },
      {
        heading: "Opbevaring: binders/deck boxes",
        body: "Binders til samling og deck boxes til spil giver hver deres fordel i hverdagen.",
      },
      {
        heading: "Playmat til bord-oplevelsen",
        body: "En playmat gør det lettere at holde styr på turneringen, energier og placering af kort.",
      },
    ],
  },
  {
    id: "guide-deckbuilding",
    slug: "deckbuilding-for-begyndere",
    title: "Deckbuilding for begyndere: sådan samler du et deck",
    summary: "Hurtig metode til at finde din “kerne” og derefter supplere med enkeltkort.",
    audience: "begynder",
    recommendedCategorySlugs: ["single-cards", "booster-packs", "deck-boxes-binders", "sleeves-protectors"],
    steps: [
      {
        heading: "Vælg et tema du kan lide",
        body: "Dit første deck bør give dig lyst til at spille. Vælg en Pokémon/strategi du synes er sjov.",
      },
      {
        heading: "Byg kernen med enkeltkort",
        body: "Når du kender “hvad du mangler”, er enkeltkort typisk den mest direkte vej.",
      },
      {
        heading: "Afslut med beskyttelse",
        body: "Sleeves og opbevaring gør det lettere at spille igen næste dag uden at skulle starte forfra.",
      },
    ],
  },
  {
    id: "guide-psa",
    slug: "psa-grading-hvornaar-giver-det-mening",
    title: "PSA grading: hvornår giver det mening?",
    summary: "En rolig guide til at undgå at overinvestere i graderede kort tidligt.",
    audience: "erfaren",
    recommendedCategorySlugs: ["grading-psa", "single-cards"],
    steps: [
      {
        heading: "Grading = værdi/opsparing, ikke “hygge”",
        body: "Overvej om målet er dokumentation, videresalg eller maksimal beskyttelse.",
      },
      {
        heading: "Start med at forstå kortets kvalitet",
        body: "Hvis du allerede samler og håndterer korrekt (sleeves/protectors), så får du ofte et bedre udgangspunkt.",
      },
      {
        heading: "Læs markedets signaler før du betaler premium",
        body: "Hvis mange er villige til at betale, kan grading give mening. Hvis ikke, er enkeltkort ofte bedre først.",
      },
    ],
  },
  {
    id: "guide-tcg-online",
    slug: "tcg-online-koder-guide",
    title: "TCG Online codes: sådan finder du dem",
    summary: "Praktisk guide til at købe/holde styr på TCG Online koder.",
    audience: "begynder",
    recommendedCategorySlugs: ["tcg-online-codes", "starter-bundles"],
    steps: [
      {
        heading: "Kend din platform (og hvad koden bruges til)",
        body: "Tjek at koden er kompatibel med den version du spiller.",
      },
      {
        heading: "Vælg den type køb du forstår",
        body: "Koder købes ofte hurtigere og mere “specifikt” end fysiske produkter, så vær ekstra opmærksom på beskrivelsen.",
      },
      {
        heading: "Sikr dig kvaliteten via læsning før køb",
        body: "Læs teksten og undgå at købe blindt, især hvis der er mange varianter.",
      },
    ],
  },
];

