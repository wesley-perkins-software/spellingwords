/**
 * Shared option and result types for the word normalization/validation core.
 *
 * These utilities are pure and framework-agnostic: no DOM, no browser APIs, and
 * no runtime dependencies. Options default to the most spelling-correct behavior
 * (preserve case in the canonical form, preserve accents), with opt-in leniency.
 */

/** Options controlling how a single word is normalized. */
export interface NormalizeOptions {
  /** Lowercase the result. Defaults to `false` (original case is preserved). */
  lowercase?: boolean;
  /**
   * Remove diacritics/accents (e.g. `café` -> `cafe`). Defaults to `false`
   * (accents are preserved as part of the canonical spelling).
   */
  foldDiacritics?: boolean;
}

/**
 * The result of grading a submitted answer against a canonical word.
 *
 * `caseMismatch` is distinct from `correct` only when the canonical word's
 * own casing is meaningful (e.g. `January`, `Wednesday`) — a case-only
 * mismatch against an all-lowercase canonical word (`cat` vs `Cat`/`CAT`) is
 * plain `correct`, not a reminder. Counts as correct for scoring either way;
 * `caseMismatch` exists purely to drive a calm capitalization reminder.
 */
export type AnswerOutcome = 'correct' | 'caseMismatch' | 'incorrect';

/** Options controlling how two words are compared (and how duplicates match). */
export interface CompareOptions {
  /** Require identical casing. Defaults to `false` (case-insensitive). */
  caseSensitive?: boolean;
  /**
   * Treat accented and unaccented letters as equal (e.g. `café` === `cafe`).
   * Defaults to `false` (accent-sensitive): accents may be part of the
   * intended spelling.
   */
  foldDiacritics?: boolean;
}

/** Options for parsing arbitrary pasted text into a clean word array. */
export interface ParseOptions extends NormalizeOptions {
  /** Also split entries on semicolons, not just commas. Defaults to `true`. */
  splitOnSemicolons?: boolean;
  /** Remove duplicate words from the result. Defaults to `true`. */
  dedupe?: boolean;
  /**
   * Comparison options used when deduping the parsed result. Defaults to
   * case-insensitive, accent-sensitive matching.
   */
  compare?: CompareOptions;
}

/** Stable, machine-readable validation failure codes. */
export type ValidationErrorCode =
  | 'empty'
  | 'too_short'
  | 'too_long'
  | 'invalid_characters'
  | 'contains_digits';

/** A single validation failure with a stable code and readable message. */
export interface ValidationError {
  code: ValidationErrorCode;
  message: string;
}

/** Structured result of validating a single word entry. */
export interface ValidationResult {
  /** `true` when there are no errors. */
  valid: boolean;
  /** The normalized form the validation was performed against. */
  normalized: string;
  /** All validation failures (empty when `valid` is `true`). */
  errors: ValidationError[];
}

/** Options controlling single-word validation. */
export interface ValidationOptions {
  /** Minimum allowed length after normalization. Defaults to `1`. */
  minLength?: number;
  /** Maximum allowed length after normalization. Defaults to `45`. */
  maxLength?: number;
  /** Allow internal spaces (multi-word entries). Defaults to `false`. */
  allowSpaces?: boolean;
  /** Allow digits within the word. Defaults to `false`. */
  allowDigits?: boolean;
}
