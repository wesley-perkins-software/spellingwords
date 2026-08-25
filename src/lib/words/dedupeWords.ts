import { comparisonKey } from './compareWords';
import type { CompareOptions } from './types';

/**
 * Remove duplicate words while preserving the order and surface form of the
 * first occurrence of each.
 *
 * Matching uses the shared comparison key: case-insensitive but accent-sensitive
 * by default, so `Cat`/`cat` collapse while `café`/`cafe` and `résumé`/`resume`
 * remain distinct. Pass `foldDiacritics: true` to also collapse accent variants.
 */
export function dedupeWords(words: string[], options: CompareOptions = {}): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const word of words) {
    const key = comparisonKey(word, options);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    result.push(word);
  }

  return result;
}
