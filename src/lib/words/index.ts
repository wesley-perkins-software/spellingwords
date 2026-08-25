/**
 * Word normalization & validation core.
 *
 * Pure, framework-agnostic utilities for cleaning, comparing, parsing, and
 * validating spelling-word input. No DOM, no browser APIs, no runtime deps.
 */
export {
  collapseWhitespace,
  isSpellingCharacter,
  normalizeQuotes,
  normalizeUnicode,
  removeDiacritics,
  sanitizeSpellingCharacters,
  stripEdgePunctuation,
  stripListMarker,
} from './characters';
export { normalizeWord } from './normalizeWord';
export { normalizeWordList } from './normalizeWordList';
export type { NormalizeWordListOptions } from './normalizeWordList';
export { dedupeWords } from './dedupeWords';
export { compareWords, comparisonKey, getAnswerOutcome } from './compareWords';
export type { AnswerOutcomeOptions } from './compareWords';
export { parseWordInput, splitWordInputTokens } from './parseWordInput';
export { validateWordInput, filterValidSpellingWords } from './validateWordInput';
export { validateWordListInput } from './validateWordList';
export type { InvalidWordEntry, WordListValidationResult } from './validateWordList';
export { classifySpellingIssue, suggestSpellingFix } from './describeSpellingIssue';
export type { SpellingIssueReason } from './describeSpellingIssue';
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
export {
  MAX_SHARED_PAYLOAD_LENGTH,
  MAX_SHARED_TITLE_LENGTH,
  MAX_SHARED_WORD_COUNT,
  MAX_SHARED_WORD_LENGTH,
  SHARED_LIST_FORMAT_VERSION,
  decodeSharedList,
  encodeSharedList,
} from './sharedList';
export type {
  DecodeSharedListErrorCode,
  DecodeSharedListResult,
  EncodeSharedListErrorCode,
  EncodeSharedListResult,
} from './sharedList';
export type {
  AnswerOutcome,
  CompareOptions,
  NormalizeOptions,
  ParseOptions,
  ValidationError,
  ValidationErrorCode,
  ValidationOptions,
  ValidationResult,
} from './types';
