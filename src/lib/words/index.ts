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
export {
  MAX_PAYLOAD_LENGTH,
  MAX_WORD_COUNT,
  SERIALIZATION_FORMAT_VERSION,
  createShareableListPayload,
  decodeWordList,
  encodeWordList,
  isValidSerializedList,
  parseShareableListPayload,
} from './serialization';
export type {
  DecodeErrorCode,
  DecodeResult,
  EncodeErrorCode,
  EncodeResult,
} from './serialization';
export type {
  CompareOptions,
  NormalizeOptions,
  ParseOptions,
  ValidationError,
  ValidationErrorCode,
  ValidationOptions,
  ValidationResult,
} from './types';
