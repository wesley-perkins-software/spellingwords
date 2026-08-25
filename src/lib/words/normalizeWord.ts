import {
  collapseWhitespace,
  normalizeQuotes,
  normalizeUnicode,
  removeDiacritics,
  stripEdgePunctuation,
} from './characters';
import type { NormalizeOptions } from './types';

/**
 * Normalize a single word into its canonical form.
 *
 * Pipeline: Unicode NFC -> straighten quotes -> collapse whitespace -> strip
 * accidental edge punctuation. Case and accents are preserved by default; pass
 * `lowercase` and/or `foldDiacritics` to opt into a more lenient form.
 *
 * Returns an empty string when the input reduces to nothing; callers decide
 * whether to drop empties.
 */
export function normalizeWord(word: string, options: NormalizeOptions = {}): string {
  let result = normalizeUnicode(word);
  result = normalizeQuotes(result);
  result = collapseWhitespace(result);
  result = stripEdgePunctuation(result);

  if (options.foldDiacritics) {
    result = removeDiacritics(result);
  }
  if (options.lowercase) {
    result = result.toLowerCase();
  }

  return result;
}
