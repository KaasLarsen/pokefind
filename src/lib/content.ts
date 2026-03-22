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
  /** Valgfri længere SEO-tekst (afsnit adskilles med dobbelt linjeskift). */
  longBody?: string;
  searchKeywords: string[]; // used to build outbound search links
  formats: Format[];
  audiences: Audience[];
  priceTiers?: PriceTier[];
};

export type GuideStep = {
  heading: string;
  body: string;
  /** Valgfrit link til relevant kategori/guide på PokéFind */
  readMore?: { href: string; label: string };
};

export type Guide = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  audience: Exclude<Audience, "børn">;
  recommendedCategorySlugs: string[];
  steps: GuideStep[];
  /**
   * Produkt-ID’er fra `data/products.json` (fx efter ingest-feed).
   * Vises som produktkort i guiden — godt til konkrete boosters, sleeves, osv.
   */
  featuredProductIds?: string[];
  /** Valgfri introtekst over produktgitteret */
  featuredProductsIntro?: string;
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
    longBody:
      "En booster pack er den klassiske måde at få nye kort på i Pokémon TCG: du ved, at du får et lille udpluk fra den pågældende serie, men ikke præcis hvilke kort. Det gør dem ideelle til at starte en samling, mærke spillet eller give som gave uden at skulle kende alle kortnavne på forhånd.\n\nTypiske fejl er at forveksle booster packs med blisters, tins eller ETB — de kan ligne hinanden i søgeresultater, men indeholder forskellige mængder og tilbehør. Tjek altid produktnavn og hvad der står på emballagen om antal boosters og eventuelle promo-kort.\n\nVælg booster packs, når du vil have flest “træk” for pengene i små bidder, eller når du samler en bestemt udvidelse og vil åbne flere pakker over tid.",
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
    longBody:
      "En booster box (eller display) indeholder typisk mange enkelt-boosters fra samme serie. Det er derfor et favoritformat blandt samlere, der vil bygge bredt, lede efter sjældne træk eller dele oplevelsen med venner over flere åbnings-sessioner.\n\nØkonomisk handler det ofte om “mange træk på én gang” frem for at købe enkeltpakker ad gangen — men det er stadig tilfældighed, så du bør være komfortabel med varians. En box er sjældent “garanti” for bestemte kort.\n\nKøb typisk en booster box, når du allerede ved, at du elsker en given udvidelse, eller når du vil spare tid og fragt ved at handle ét stort køb frem for mange små.",
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
    longBody:
      "En Elite Trainer Box samler ofte flere booster packs med tilbehør som terning, markører og æske — alt sammen i ét samlet produkt. For mange begyndere er det et nemt første køb, fordi du får både kort og praktiske ting til at komme i gang ved bordet.\n\nSammenlignet med rene booster packs betaler du for “pakken” og oplevelsen, ikke kun for antal boosters. Det kan stadig være god værdi, især hvis du alligevel manglede sleeves, terning eller opbevaring.\n\nVælg en ETB, når du vil give en komplet gave, starte et nyt sæt, eller når du vil have struktur og tilbehør uden at skulle købe det hele separat.",
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
    longBody:
      "Et blister pack er typisk én booster (eller to) pakket ind på en pap-plade, ofte med et promo-kort, mønt eller lignende. Det er et mellemformat: billigere end en stor æske, men ofte lidt dyrere “pr. booster” end hvis du køber en hel box — til gengæld får du tit et fast promo-kort, som samlere går efter.\n\nDet er let at forveksle med almindelige løse boosters: læs beskrivelsen, så du ved om promo-kortet følger med, og hvilken serie boosteren tilhører.\n\nVælg blisters, når du vil have et bestemt promo, en lille gave, eller et hurtigt køb uden at investere i en hel display.",
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
    longBody:
      "Collection tins kombinerer ofte én eller flere boosters med promo-kort og en metal- eller plastdåse du kan genbruge til opbevaring eller display. Det gør dem oplagte som gave eller første køb, fordi du får både “noget at åbne” og et fysisk produkt der kan stå på hylden.\n\nIndhold varierer mellem udgaver: tjek altid hvilken serie boosteren tilhører, og om der er et specifikt promo-kort. Pris pr. booster kan være højere end ved løse pakker — du betaler også for emballage og tema.\n\nVælg en tin, når du vil have en samlet gave, et børnevenligt produkt med tydelig “pakkeoplevelse”, eller når du samler en bestemt promo, der følger med den pågældende tin.",
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
    longBody:
      "Enkeltkort (singles) er den direkte vej til præcis det kort, du mangler til et deck eller til samlingen. I modsætning til boosters undgår du tilfældighed — til gengæld betaler du ofte efter efterspørgsel og stand.\n\nNår du handler singles, er det vigtigt at være opmærksom på sprogudgave, stand og om kortet er lovligt i det format, du spiller (fx Standard-regler skifter over tid).\n\nVælg enkeltkort, når du har en konkret liste til dit deck, eller når du vil udfylde huller efter at have åbnet boosters.",
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
    longBody:
      "Sleeves (kortlommer) beskytter mod fingeraftryk, kanter og små ridser — især hvis du både spiller og bytter. Standard størrelse til Pokémon TCG passer til de fleste almindelige kort, men dobbelttjek, hvis du har jumbo- eller specielle kort.\n\nMange køber for få sleeves første gang: regn med et deck, ekstra kort og lidt reserve. Det er billigere at købe en æske end mange små pakker over tid.\n\nInvestér i sleeves tidligt, hvis du åbner boosters og allerede ved, at du vil spille eller opbevare kortene længe — det er ofte den bedste “forsikring” for dine træk.",
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
    longBody:
      "En deck box holder typisk ét færdigt deck (ofte 60 kort plus ekstra) og beskytter mod bøjning og støv, når du transporterer til kampe. Vælg størrelse efter om du bruger sleeves — dobbelt-sleevede kort fylder mere.\n\nBinders med lommer er bedst til samling og oversigt: du kan bladre sæt igennem uden at rode kortene sammen. Mange bruger binder til “binder pages” og deck box til det deck, de spiller med i ugen.\n\nTypisk fejl er at købe en for lille æske eller en binder, hvor kortene sidder for stramt — det kan skade kanter over tid. Gå efter kvalitet med lynlås eller fast ryg, hvis du ofte har tasken med.",
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
    longBody:
      "En playmat er et blødt underlag til bordet, ofte med trykt motiv eller markeret felt til Pokémon-kort. Den gør kort lettere at løfte uden at slide kanter, og den samler dit spilområde visuelt — særligt nyttigt hvis bordet er ru eller vådt.\n\nStørrelse er ofte “standard” til kortspil; tjek om du vil have en med taske eller rulle. Officielle og fan-motiver findes i mange designs; vælg noget du ikke bliver træt af at se på turneringer.\n\nKøb typisk en playmat, når du spiller regelmæssigt eller vil skåne kortene bedre end et bart bord. Det er sjældent “første køb”, men et naturligt andet skridt efter sleeves.",
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
    longBody:
      "Grading (fx PSA) betyder, at et professionelt firma vurderer kortets stand og indkapsler det i et holder med et score. Det kan øge salgsværdien og gøre kortet lettere at handle — men det koster gebyr og tid, og ikke alle kort lønner sig at sende ind.\n\nOvervej grading kun hvis kortet har høj nok markedsværdi og bedre stand end “gennemsnit”, eller hvis du bevidst investerer i sjældne kort. Almindelige spill-kort eller kort med synlige fejl giver sjældent gevinst efter omkostninger.\n\nKøb allerede graded kort, hvis du vil undgå processen selv eller hvis du søger en bestemt score. Læs altid sælgers fotos og returpolitik — og kombinér med vores guide om PSA, før du betaler premium.",
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
    longBody:
      "Nogle fysiske Pokémon-produkter indeholder digitale koder til kortspil på nettet (eller tilknyttede platforme — navnet på spillet kan ændre sig over tid). Koder kan også sælges separat. Vær opmærksom på udløb, region og om koden stadig er gyldig i den app du bruger.\n\nNår du køber koder fra andre brugere eller markedspladser, er risiko for svindel højere end ved fysiske varer. Brug etablerede sælgere og læs beskrivelsen grundigt.\n\nVælg denne kategori, når du spiller digitalt og vil supplere med indhold fra koder, eller når du bevidst søger efter kode-baserede tilbud frem for kun fysiske kort.",
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
    longBody:
      "Starter-bundles og samlepakker samler ofte flere produkter i ét køb — fx decks, boosters eller tilbehør — med et fælles tema. Det kan spare tid, når du ikke vil sammensætte alt selv, eller når du giver en gave og vil have en tydelig “pakke”.\n\nLæs altid, hvad bundlen faktisk indeholder: ord som “bundle” kan dække over meget forskelligt indhold. Sammenlign pris med at købe delene enkeltvis, hvis du har tid.\n\nVælg et bundle, når du vil hurtigt i gang, give en samlet begynderstart, eller når du finder en pakke, der matcher præcis den serie eller det niveau, du søger.",
    searchKeywords: ["pokemon starter set", "pokemon bundle"],
    formats: ["booster-pack", "etb"],
    audiences: ["børn", "begynder"],
    priceTiers: ["budget", "mellem"],
  },
];

export const guides: Guide[] = [
  {
    id: "guide-produkteksempler-feed",
    slug: "produkteksempler-fra-kataloget",
    title: "Produkteksempler fra kataloget (boosters & tilbehør)",
    summary:
      "Se rigtige varer fra vores varekatalog side om side: emballage, prisniveau og type — så lettere at forstå forskellen på boosters, sleeves og mere end ren teori alene.",
    audience: "begynder",
    recommendedCategorySlugs: ["booster-packs", "sleeves-protectors", "single-cards"],
    featuredProductIds: [
      "feed-2514-54243",
      "feed-2514-63860",
      "feed-2514-15894",
      "feed-2514-51644",
      "feed-2514-18919",
    ],
    featuredProductsIntro:
      "Udpluk fra det aktuelle varekatalog (Partner-ads feeds). Priser og lager følger butikken; links er reklame.",
    steps: [
      {
        heading: "Hvorfor vise rigtige produkter?",
        body:
          "Når du læser om “booster packs” og “sleeves”, er det nemmere at vælge rigtigt, hvis du også kan se billeder, titler og prisniveau fra rigtige lister. Nedenfor ser du konkrete produkter fra vores katalog — ikke anbefalinger fra ét mærke, men eksempler du kan sammenligne med det, du selv leder efter.",
        readMore: { href: "/kat/booster-packs", label: "Se kategorien Booster packs" },
      },
      {
        heading: "Sådan læser du produktkortene",
        body:
          "Hvert kort viser navn, pris (når feedet leverer den), butik og et link videre. Brug listen til at mærke forskellen: nogle varer er rene boosters, andre er tilbehør som sleeves. Er du i tvivl om formatet, åbn butikkens side og læs den fulde beskrivelse før du køber.",
        readMore: { href: "/soeg", label: "Søg i hele kataloget" },
      },
      {
        heading: "Sådan opdaterer du listen (for udviklere)",
        body:
          "Kataloget opdateres med `npm run ingest:feed`, som henter Partner-ads-feeds og skriver `data/products.json`. Redaktionelle udvalg i guides styres med `featuredProductIds` i `src/lib/content.ts` — brug `id`-felterne fra produktfilen, så kortene matcher.",
      },
    ],
  },
  {
    id: "guide-begynder-køb",
    slug: "hvad-skal-jeg-koebe-som-begynder",
    title: "Hvad skal jeg købe som nybegynder?",
    summary:
      "Tre hurtige valg: vil du have overraskelse (boosters), en samlet startpakke (ETB) eller præcise kort (singles)? Her får du en beslutningsramme, så du ikke køber “tilfældigt” i webshoppens søgefelt.",
    audience: "begynder",
    recommendedCategorySlugs: ["etb", "booster-packs", "single-cards", "sleeves-protectors"],
    featuredProductIds: [
      "feed-2514-54243",
      "feed-2514-63860",
      "feed-2514-51644",
    ],
    featuredProductsIntro:
      "Eksempler på booster packs og sleeves fra kataloget — supplerer rådene nedenfor.",
    steps: [
      {
        heading: "Start med målet: spil, samling eller gave?",
        body:
          "Skal du spille mod venner, samle en bestemt serie, eller give en gave? Spil og deckbuilding belønner ofte enkeltkort eller målrettede køb. Ren samler-glæde og “at åbne pakker” passer godt til booster packs. En gave, der skal føles komplet, er ofte nemmere som ETB eller tin — færre løse dele at forklare.",
        readMore: { href: "/guider/booster-box-vs-etb-vs-enkeltkort", label: "Sammenlign formater dybere" },
      },
      {
        heading: "Vælg format: ETB, boosters eller singles",
        body:
          "Elite Trainer Boxes samler typisk flere boosters og tilbehør i én æske — godt hvis du vil have struktur. Løse booster packs er billigere pr. beslutning og giver små “højdepunkter”. Enkeltkort er bedst, når du allerede ved præcis hvilke kort dit deck mangler. Der findes ikke ét rigtigt svar; det rigtige er det, der matcher dit budget og tålmodighed med tilfældighed.",
        readMore: { href: "/kat/etb", label: "Udforsk Elite Trainer Boxes" },
      },
      {
        heading: "Tænk beskyttelse og opbevaring tidligt",
        body:
          "Sleeves og en simpel deck box koster lidt i forhold til værdien af de kort, du vil beholde. Selv som nybegynder er det en god vane at sleeve kort, du spiller med — det gør dem lettere at bytte eller sælge senere.",
        readMore: { href: "/kat/sleeves-protectors", label: "Se sleeves og protectors" },
      },
      {
        heading: "Gør det overskueligt for børn",
        body:
          "Til børn kan tins og klar-til-gave-pakker føles mindre overvældende end at skulle vælge mellem mange små produkter. Vælg noget med tydelig indholdsbeskrivelse på emballagen, så forventningerne matcher det, der ligger i pakken.",
        readMore: { href: "/kat/tins", label: "Se tins og collection boxes" },
      },
    ],
  },
  {
    id: "guide-værdi-sammenligning",
    slug: "booster-box-vs-etb-vs-enkeltkort",
    title: "Booster box vs ETB vs enkeltkort: hvad giver mest værdi?",
    summary:
      "“Værdi” betyder forskellige ting: flest træk for pengene, færrest skuffelser, eller hurtigst fra idé til færdigt deck. Her er en praktisk inddeling uden at love faste priser — de ændrer sig med marked og butik.",
    audience: "begynder",
    recommendedCategorySlugs: ["booster-boxes", "etb", "single-cards", "deck-boxes-binders"],
    featuredProductIds: ["feed-2514-54243", "feed-2514-63860", "feed-2514-15894"],
    featuredProductsIntro:
      "Tre forskellige Pokémon booster packs fra kataloget — til sammenligning af emballage og æra (priser varierer).",
    steps: [
      {
        heading: "Booster box: mange træk, én beslutning",
        body:
          "En booster box giver typisk mange boosters fra samme serie. Den giver ofte “mest at åbne” i forhold til at købe enkelte pakker ad gangen — men det er stadig tilfældighed. God til samlere, der vil bredde, eller som vil dele åbninger over tid. Dårlig til at garantere bestemte kort.",
        readMore: { href: "/kat/booster-boxes", label: "Se booster boxes" },
      },
      {
        heading: "ETB: samlet pakke med tilbehør",
        body:
          "En ETB kombinerer ofte flere boosters med terning, markører og æske. Du betaler for helhedsoplevelsen — ikke kun for antal boosters. Mange oplever det som bedre “startpakke-værdi” end løse boosters, især hvis tilbehøret alligevel stod på ønskelisten.",
        readMore: { href: "/kat/etb", label: "Se Elite Trainer Boxes" },
      },
      {
        heading: "Enkeltkort: betal for sikkerhed, ikke for overraskelse",
        body:
          "Singles er ofte den hurtigste vej til et spilleklart deck: du betaler for kortene du mangler, ikke for tilfældige træk. Det kan føles “dyrere pr. kort”, men billigere end at åbne boosters indtil du tilfældigvis rammer det rigtige. Tjek sprog og stand før du køber.",
        readMore: { href: "/kat/single-cards", label: "Se enkeltkort-kategorien" },
      },
      {
        heading: "Hvad skal du vælge?",
        body:
          "Vil du maksimere spænding og samleroplevelse, er boosters/boxes stærke. Vil du minimere spild og bygge konkret, er singles stærke. Vil du have en balanceret gave eller start, er ETB ofte midten.",
      },
    ],
  },
  {
    id: "guide-undgå-forkert-køb",
    slug: "sadan-undgar-du-at-koebe-det-forkerte",
    title: "Sådan undgår du at købe det forkerte kort/produkt",
    summary:
      "De dyreste fejl er ofte dem, hvor produktet er “korrekt” i sig selv — men forkert til dit behov. Her er et tjekliste-tænk, der sparer både tid og ærgrelse.",
    audience: "begynder",
    recommendedCategorySlugs: ["single-cards", "starter-bundles", "sleeves-protectors"],
    steps: [
      {
        heading: "Definér brugsscenariet først",
        body:
          "Skal kortene spilles i turnering, lægges i et album, eller gives væk? Spil kræver ofte bestemte formater og sprogudgaver. Samling handler mere om stand og æstetik. Når du ved det, kan du filtrere 90 % af forkerte tilbud væk, før du læser produktteksten.",
        readMore: { href: "/faq", label: "Læs FAQ om katalog og links" },
      },
      {
        heading: "Læs navnet på formatet — ikke kun billedet",
        body:
          "Webshops viser ofte store billeder af æsker, men forskellen mellem blister, ETB, tin og løs booster står i titlen og beskrivelsen. To produkter kan ligne hinanden visuelt men indeholde forskelligt antal boosters eller promo-kort. Scroll ned og læs, hvad der faktisk er i kassen.",
        readMore: { href: "/kat/blister-packs", label: "Se blister-packs" },
      },
      {
        heading: "Tjek sprog, serie og kompatibilitet",
        body:
          "Pokémon TCG findes på flere sprog; til turnering i Danmark er det typisk vigtigt at matche det, du spiller med. Serienavnet (fx hvilket sæt) afgør, hvilke kort der kan forekomme. Er du i tvivl, søg seriens navn og “indhold” før du betaler.",
      },
      {
        heading: "Køb beskyttelse i samme ombæring",
        body:
          "Har du fundet et enkeltkort eller en dyrere pakke, er sleeves billig forsikring. Det er lettere at købe rigtigt første gang end at erstatte ridser senere — især hvis du handler videre eller bytter.",
        readMore: { href: "/kat/sleeves-protectors", label: "Se sleeves" },
      },
    ],
  },
  {
    id: "guide-sleeves",
    slug: "sleeves-og-opbevaring-hvad-du-bruger",
    title: "Sleeves og opbevaring: hvad skal du bruge og hvorfor?",
    summary:
      "Fra første sleeve til deck box og playmat: sådan prioriterer du udstyr, så dine kort holder til både hverdagskampe og samling — uden at købe unødigt.",
    audience: "begynder",
    recommendedCategorySlugs: ["sleeves-protectors", "deck-boxes-binders", "playmats"],
    featuredProductIds: ["feed-2514-51644", "feed-2514-51640", "feed-2514-18919"],
    featuredProductsIntro:
      "Eksempler på Ultra Pro sleeves (50-pakker) fra kataloget — gode til Pokémon-kort i standardstørrelse.",
    steps: [
      {
        heading: "Sleeves først: beskyttelse mod slid og kanter",
        body:
          "Standard Pokémon-kort passer i almindelige “standard size” sleeves. De beskytter mod fingeraftryk og små ridser når du stokker og spiller. Overvej “inner sleeve” + ydre sleeve kun hvis du samler høj stand eller investerer i dyre kort — til almindelig leg rækker ofte én kvalitetssleeve.",
        readMore: { href: "/kat/sleeves-protectors", label: "Find sleeves i kataloget" },
      },
      {
        heading: "Deck box: transport og ét sted at samle decket",
        body:
          "En deck box holder dit spilledeck samlet og beskytter mod bøjning. Vælg én der kan rumme sleevede kort — nogle budgetæsker er for stramme. Har du flere decks, mærker du dem gerne med farve eller navn på æsken.",
        readMore: { href: "/kat/deck-boxes-binders", label: "Se deck boxes og binders" },
      },
      {
        heading: "Binder og opbevaring til samlingen",
        body:
          "Til sæt du ikke spiller hver dag, giver ringbind med lommer mening: overskueligt og pænt. Vær opmærksom på at kort ikke bør sidde for stramt eller bøjes når du bladrer.",
      },
      {
        heading: "Playmat: komfort og tydeligt spilleområde",
        body:
          "En playmat er ikke “påkrævet”, men den beskytter bordet og gør det lettere at holde styr på kort og zoner. Mange spillere køber den, når de er sikre på at de vil spille ofte — det er et godt andet skridt efter sleeves.",
        readMore: { href: "/kat/playmats", label: "Se playmats" },
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

