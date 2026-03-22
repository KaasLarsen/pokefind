/**
 * Flad tekst til FAQ JSON-LD — skal matche rækkefølge og mening på /faq.
 */
export const faqItemsForJsonLd: { question: string; answer: string }[] = [
  {
    question: "Hvad er PokéFind?",
    answer:
      "PokéFind er en uafhængig dansk købsguide til Pokémon TCG og relateret tilbehør. Vi sælger ikke selv — vi hjælper dig med at finde rundt i formater, kategorier og korte guides, så du lettere kan træffe et godt køb. Læs mere på siden Om PokéFind.",
  },
  {
    question: "Hvor kommer produkterne i kataloget fra?",
    answer:
      "Vores vareliste bygger på produktfeeds fra partnere (fx Partner-ads). Butikkerne ejer pris, lager og leveringsbetingelser — vi viser data, som feedet leverer, og linker videre til forhandleren når du klikker.",
  },
  {
    question: "Hvor ofte opdateres kataloget?",
    answer:
      "Data opdateres, når vi kører import-scriptet (npm run ingest:feed) mod de feed-URL'er, der er sat op i data/feeds.json. På den live side afspejler indholdet den version af data og kode, der sidst er blevet deployet.",
  },
  {
    question: "Hvorfor matcher et produkt ikke altid min søgning?",
    answer:
      "Vi matcher mod titel og beskrivelse fra feedet. Brug kategorier og filtre på søgesiden — og tjek altid den endelige varetekst hos forhandleren før du betaler.",
  },
  {
    question: "Er links på PokéFind reklame eller affiliate?",
    answer:
      "Nogle udgående links kan være affiliate- eller partnerlinks. De er mærket efter gældende praksis; du kan læse den fulde forklaring under Reklame og affiliate.",
  },
  {
    question: "Hvordan vælger I produkter i guides?",
    answer:
      "I vores guides kan vi fremhæve konkrete varer fra kataloget (produkt-ID'er i koden). Det er et redaktionelt udvalg til at illustrere et format — ikke en garanti for laveste pris eller bedste tilbud på markedet.",
  },
  {
    question: "Er PokéFind officielt Pokémon eller Nintendo?",
    answer:
      "Nej. PokéFind er ikke officielt forbundet med Nintendo, Game Freak eller The Pokémon Company. Pokémon og varemærker tilhører deres respektive ejere.",
  },
  {
    question: "Hvem kan jeg kontakte?",
    answer:
      "Skriv til kontakt@pokefind.dk eller se kontakt-siden.",
  },
  {
    question: "Hvorfor vises der ikke Yu-Gi-Oh eller andre kortspil i produktsøgningen?",
    answer:
      "PokéFind er målrettet Pokémon TCG. Vores katalog og søgning er filtreret, så du primært ser Pokémon-relaterede varer. Søger du efter andre kortspil som søgeord, viser vi typisk ingen produkter — det er bevidst for at holde oplevelsen fokuseret.",
  },
  {
    question: "Hvorfor kan prisen hos butikken afvige fra det, jeg ser her?",
    answer:
      "Priser og lager kommer fra feeds og kan ændre sig mellem opdateringer. Vi viser, hvad partneren senest har sendt; den endelige pris, moms og fragt står altid hos forhandleren på tidspunktet for køb.",
  },
  {
    question: "Skriver I selv anmeldelser af produkter?",
    answer:
      "Nej. PokéFind er en guide og et katalogudsnit — ikke et anmeldelsessite. Vi forklarer formater og viser eksempler; meninger om konkrete produkter bør du søge hos fællesskaber, anmeldere eller ved at læse butikkens beskrivelse.",
  },
  {
    question: "Hvordan finder jeg en bestemt Pokémon-serie eller udvidelse?",
    answer:
      "Brug søgningen med seriens navn eller gå ind på den relevante kategori (fx booster packs) og brug filter og søgeord. Tjek altid produktnavnet hos forhandleren, så serien matcher det, du leder efter.",
  },
  {
    question: "Er PokéFind gratis at bruge?",
    answer:
      "Ja. Det er gratis at bruge søgning, kategorier og guides. Vi kan tjene provision på nogle udgående links, som er markeret som reklame.",
  },
];
