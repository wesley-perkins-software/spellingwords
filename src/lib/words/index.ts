/**
 * Word normalization & validation core.
 *
 * Pure, framework-agnostic utilities for cleaning, comparing, parsing, and
 * validating spelling-word input. No DOM, no browser APIs, no runtime deps.
 */
export {
  collapseWhitespace,
  normalizeQuotes,
  normalizeUnicode,
  removeDiacritics,
  stripEdgePunctuation,
  stripListMarker,
} from './characters';
export { normalizeWord } from './normalizeWord';
export { normalizeWordList } from './normalizeWordList';
export type { NormalizeWordListOptions } from './normalizeWordList';
export { dedupeWords } from './dedupeWords';
export { compareWords, comparisonKey } from './compareWords';
export { parseWordInput } from './parseWordInput';
export { validateWordInput } from './validateWordInput';
export type {
  CompareOptions,
  NormalizeOptions,
  ParseOptions,
  ValidationError,
  ValidationErrorCode,
  ValidationOptions,
  ValidationResult,
} from './types';
