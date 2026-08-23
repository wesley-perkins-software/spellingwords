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

/**
 * The orthographic-input policy: the exact set of characters that may ever
 * appear in a spelling word or answer. Backed by an audit of the full
 * canonical curriculum corpus (1,083 words across Core Spelling,
 * High-Frequency Words, Themed Spelling Practice, and skill banks) — every
 * canonical word is plain Unicode letters, with a small set of apostrophe
 * contractions (`don't`) and possessives (`boys'`, `teacher's`); none
 * contain hyphens, digits, internal spaces, or other punctuation. Hyphens
 * are included anyway because `validateWordInput` already supports them for
 * legitimate custom words (`mother-in-law`, `well-known`) and no canonical
 * data contradicts that. Digits, symbols, and emoji are never legitimate
 * spelling characters.
 */
const SPELLING_CHARACTER_PATTERN = /[\p{L}\p{M}'’-]/u;

/** Whether a single character may ever appear in a spelling word or answer. */
export function isSpellingCharacter(char: string): boolean {
  return SPELLING_CHARACTER_PATTERN.test(char);
}

/**
 * Strip every character that could never legitimately appear in a spelling
 * word — digits, symbols, emoji, stray whitespace — keeping only Unicode
 * letters, combining marks, apostrophes (straight and curly), and hyphens,
 * wherever in the string they occur. Unlike `stripEdgePunctuation` (which
 * only trims accidental leading/trailing punctuation and leaves interior
 * characters for `validateWordInput` to flag), this filters the whole
 * string. Iterates by Unicode code point so surrogate-pair characters
 * (emoji) are removed cleanly rather than left as broken halves.
 *
 * Used to sanitize live input calmly — no error, invalid characters simply
 * never accumulate — such as the `/play` answer field as a student types,
 * pastes, dictates, or autofills.
 */
export function sanitizeSpellingCharacters(value: string): string {
  return Array.from(value)
    .filter(isSpellingCharacter)
    .join('');
}
