/**
 * Low-level, single-purpose string primitives. Each function does exactly one
 * transformation and is pure (no mutation, no side effects, no browser APIs).
 * Higher-level utilities (normalizeWord, parseWordInput, ...) compose these.
 */

/** Collapse any run of whitespace (spaces, tabs, newlines) into a single space, then trim. */
export function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/**
 * Normalize curly/smart quotes and apostrophe variants to straight ASCII
 * equivalents so `don’t` becomes `don't` and `“fish”` becomes `"fish"`.
 */
export function normalizeQuotes(value: string): string {
  return value
    .replace(/[‘’‛′´`]/g, "'") // ‘ ’ ‛ ′ ´ ` -> '
    .replace(/[“”‟″]/g, '"'); // “ ” ‟ ″ -> "
}

/** Apply Unicode NFC so accented characters use a single canonical code point. */
export function normalizeUnicode(value: string): string {
  return value.normalize('NFC');
}

/**
 * Strip diacritics/accents by decomposing to NFD and removing combining marks
 * (e.g. `café` -> `cafe`). Used only when the `foldDiacritics` option is set.
 */
export function removeDiacritics(value: string): string {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/**
 * Remove a single leading ordered-list or bullet marker from one line, along
 * with the whitespace that follows it. Inner text is left untouched.
 *
 * Handles: `1.` `1)` `1:` `1 -` ordered markers and `- * • – — ‣ · *` bullets.
 */
export function stripListMarker(line: string): string {
  return line
    .replace(/^\s*\d+\s*[-.):]\s+/, '') // numbered: "1. ", "2) ", "3: ", "4 - "
    .replace(/^\s*[-*•–—‣·▪●]\s+/, ''); // bullets
}

/**
 * Trim stray leading/trailing punctuation (commas, periods, brackets, quotes,
 * etc.) while preserving apostrophes and hyphens that belong to the word, so
 * `cat,` -> `cat` but `o'clock` and `well-known` survive intact.
 */
export function stripEdgePunctuation(value: string): string {
  // Strip leading/trailing characters that are not letters, numbers, whitespace,
  // apostrophes, or hyphens.
  return value
    .replace(/^[^\p{L}\p{N}\s'-]+/u, '')
    .replace(/[^\p{L}\p{N}\s'-]+$/u, '');
}
