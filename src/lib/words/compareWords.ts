import { normalizeWord } from './normalizeWord';
import type { AnswerOutcome, CompareOptions } from './types';

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

/**
 * Grades a submitted answer against a canonical word as `correct`,
 * `caseMismatch`, or `incorrect`.
 *
 * `caseMismatch` only fires when the canonical word's own casing is
 * meaningful — i.e. the canonical form isn't itself all-lowercase (e.g.
 * `January`, `Wednesday`) — and the submitted answer matches case-
 * insensitively but not case-sensitively. A case-only difference against an
 * all-lowercase canonical word (`Cat`/`CAT` vs `cat`) is `correct`, exactly
 * like today's case-insensitive grading — there is nothing case-meaningful
 * to remind the student about.
 */
export function getAnswerOutcome(
  answer: string,
  canonical: string,
  options: CompareOptions = {},
): AnswerOutcome {
  if (compareWords(answer, canonical, { ...options, caseSensitive: true })) {
    return 'correct';
  }
  if (!compareWords(answer, canonical, options)) {
    return 'incorrect';
  }

  const canonicalKey = comparisonKey(canonical, { ...options, caseSensitive: true });
  const canonicalCasingIsMeaningful = canonicalKey !== canonicalKey.toLowerCase();
  return canonicalCasingIsMeaningful ? 'caseMismatch' : 'correct';
}
