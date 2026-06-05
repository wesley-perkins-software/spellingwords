import { stripListMarker } from './characters';
import { dedupeWords } from './dedupeWords';
import { normalizeWord } from './normalizeWord';
import type { ParseOptions } from './types';

/**
 * Split raw pasted text into candidate tokens, before per-word normalization.
 *
 * Splits on line breaks, strips a leading list marker per line, then splits each
 * line further on commas (and semicolons when requested). Returns raw,
 * un-normalized, possibly-empty tokens; normalization/filtering happens later.
 */
function splitIntoRawTokens(text: string, splitOnSemicolons: boolean): string[] {
  const lineDelimiters = /\r\n|\r|\n/;
  const inlineDelimiters = splitOnSemicolons ? /[,;]/ : /,/;

  return text
    .split(lineDelimiters)
    .map(stripListMarker)
    .flatMap((line) => line.split(inlineDelimiters));
}

/**
 * Parse arbitrary pasted text into a clean array of words.
 *
 * Handles line breaks, numbered lists (`1.`, `2)`, `3:`), bullet lists
 * (`- `, `* `, `• `), comma- and semicolon-separated entries, smart quotes,
 * accidental punctuation, and blank lines. By default the result is normalized
 * (preserving case and accents) and deduplicated.
 */
export function parseWordInput(text: string, options: ParseOptions = {}): string[] {
  const {
    splitOnSemicolons = true,
    dedupe = true,
    compare,
    ...normalizeOptions
  } = options;

  const words = splitIntoRawTokens(text, splitOnSemicolons)
    .map((token) => normalizeWord(token, normalizeOptions))
    .filter((word) => word.length > 0);

  return dedupe ? dedupeWords(words, compare) : words;
}
