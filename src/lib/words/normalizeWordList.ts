import { dedupeWords } from './dedupeWords';
import { normalizeWord } from './normalizeWord';
import type { CompareOptions, NormalizeOptions } from './types';

/** Options for normalizing a list of words. */
export interface NormalizeWordListOptions extends NormalizeOptions {
  /** Remove duplicates from the result. Defaults to `true`. */
  dedupe?: boolean;
  /** Comparison options used when deduping. */
  compare?: CompareOptions;
}

/**
 * Normalize an array of words: clean each entry, drop entries that reduce to
 * empty, and (by default) remove duplicates. Order is preserved.
 */
export function normalizeWordList(
  words: string[],
  options: NormalizeWordListOptions = {},
): string[] {
  const { dedupe = true, compare, ...normalizeOptions } = options;

  const cleaned = words
    .map((word) => normalizeWord(word, normalizeOptions))
    .filter((word) => word.length > 0);

  return dedupe ? dedupeWords(cleaned, compare) : cleaned;
}
