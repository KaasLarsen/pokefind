import type { ProductRecord } from "./productTypes";

/**
 * Andre kortspil / mærker — vis ikke på PokéFind (tit/beskrivelse fra feeds).
 * Tjekkes før Pokémon-match, så "tcg" alene ikke slipper generiske kortspil igennem.
 */
const EXCLUDE_OTHER_TCG =
  /yu[- ]?gi[- ]?oh|yugioh|遊戯王|magic\s*:\s*the\s*gathering|\bmagic\s*tg\b|\bmtg\b|\bdigimon\b|one[\s-]piece\s*(tcg|card|trading)?|flesh\s+and\s+blood|disney\s*lorcana|\blorcana\b|dragon\s*ball\s*(tcg|card)?|beyblade|weiss\s*schwarz|cardfight|vanguard|shadowverse|final\s*fantasy\s*tcg|warhammer|keyforge/i;

/** Pokémon TCG / merch der tydeligt er Pokémon (ikke kun "tcg"). */
const INCLUDE_POKEMON =
  /pokemon|pokémon|pok\s*&\s*mon|pok[eé]mon|ポケモン|pocket\s*monsters/i;

/**
 * Om varetekst (titel + beskrivelse + butik) skal vises som Pokémon på PokéFind.
 * Pokémon nævnt eksplicit → vis (også når MTG/YGO nævnes som “passer til”).
 * Ellers: skjul kendte andre kortspil (fx Yu-Gi-Oh!) og generisk “kun tcg”.
 */
export function isPokemonProductText(blob: string): boolean {
  const s = blob.trim();
  if (!s) return false;
  if (INCLUDE_POKEMON.test(s)) return true;
  if (EXCLUDE_OTHER_TCG.test(s)) return false;
  return false;
}

export function isPokemonProductRecord(p: ProductRecord): boolean {
  return isPokemonProductText(
    `${p.title} ${p.description} ${p.merchant} ${p.feedSource}`,
  );
}

/**
 * Brugerens søgestreng sigter mod et andet kortspil — vis ingen produkter.
 * (PokéFind er kun Pokémon; undgår at “yugioh” rammer YuGiOh i tilbehørstekst.)
 */
export function isBlockedNonPokemonFranchiseQuery(query: string): boolean {
  const s = query.trim().toLowerCase();
  if (!s) return false;
  return /yu[- ]?gi[- ]?oh|yugioh|遊戯王|magic\s*:\s*the\s*gathering|\bmagic\s*tg\b|\bmtg\b|\bdigimon\b|one[\s-]piece\s*tcg|flesh\s+and\s*blood|disney\s*lorcana|\blorcana\b|dragon\s*ball\s*tcg|beyblade|warhammer|keyforge/i.test(
    s,
  );
}
