import { normalizeWord } from './normalizeWord';
import type { CompareOptions } from './types';

/**
 * Build the canonical key used to test two words for equality. Normalizes the
 * word, then applies the comparison policy: case-insensitive by default
 * (lowercased unless `caseSensitive`), accent-sensitive by default (accents
 * folded only when `foldDiacritics` is set).
 *
 * Exported for reuse by deduplication, which must match comparison semantics.
 */
export function comparisonKey(word: string, options: CompareOptions = {}): string {
  return normalizeWord(word, {
    foldDiacritics: options.foldDiacritics ?? false,
    lowercase: !(options.caseSensitive ?? false),
  });
}

/**
 * Compare two words for equality after normalization.
 *
 * Defaults to case-insensitive, accent-sensitive matching, so `Cat` === `cat`
 * but `café` !== `cafe` (accents may be part of the intended spelling). This is
 * a strict boolean check — no fuzzy/"close enough" scoring.
 */
export function compareWords(a: string, b: string, options: CompareOptions = {}): boolean {
  return comparisonKey(a, options) === comparisonKey(b, options);
}
