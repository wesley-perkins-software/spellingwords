import { dedupeWords } from './dedupeWords';
import { splitWordInputTokens } from './parseWordInput';
import { validateWordInput } from './validateWordInput';
import type { CompareOptions, ValidationError, ValidationOptions } from './types';

/** A raw entry that failed the spelling character policy, with why. */
export interface InvalidWordEntry {
  /** The entry as typed/pasted, before normalization. */
  raw: string;
  /** The normalized form validation actually ran against. */
  normalized: string;
  errors: ValidationError[];
}

export interface WordListValidationResult {
  /** Normalized, deduplicated valid words, in first-seen order. */
  words: string[];
  /** Entries that failed validation, in their original order (not deduped). */
  invalidEntries: InvalidWordEntry[];
}

/** Options for {@link validateWordListInput}. */
export interface WordListValidationOptions extends ValidationOptions {
  /** Also split entries on semicolons, not just commas. Defaults to `true`. */
  splitOnSemicolons?: boolean;
  /** Comparison options used when deduping the valid words. */
  compare?: CompareOptions;
}

/**
 * Parse raw pasted/typed text into candidate word entries (same tokenizing
 * `parseWordInput` uses) and validate each one against the spelling
 * character policy, rather than silently dropping anything that doesn't
 * qualify.
 *
 * This is the custom-word-entry counterpart to `parseWordInput`: `/play`'s
 * answer field sanitizes silently (see `sanitizeSpellingCharacters`) because
 * a student mid-answer shouldn't be interrupted, but a list creator
 * reviewing entries benefits from seeing exactly which lines need fixing
 * and why (see `InvalidWordEntry.errors`).
 */
export function validateWordListInput(
  text: string,
  options: WordListValidationOptions = {},
): WordListValidationResult {
  const { splitOnSemicolons = true, compare, ...validationOptions } = options;

  const rawTokens = splitWordInputTokens(text, splitOnSemicolons)
    .map((token) => token.trim())
    .filter((token) => token.length > 0);

  const words: string[] = [];
  const invalidEntries: InvalidWordEntry[] = [];

  for (const raw of rawTokens) {
    const result = validateWordInput(raw, validationOptions);
    if (result.valid) {
      words.push(result.normalized);
    } else {
      invalidEntries.push({ raw, normalized: result.normalized, errors: result.errors });
    }
  }

  return { words: dedupeWords(words, compare), invalidEntries };
}
