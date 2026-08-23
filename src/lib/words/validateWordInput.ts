import { normalizeWord } from './normalizeWord';
import type { ValidationError, ValidationOptions, ValidationResult } from './types';

const DEFAULT_MIN_LENGTH = 1;
const DEFAULT_MAX_LENGTH = 45;

/**
 * Build the structural pattern for a well-formed spelling word: one or more
 * letter runs, optionally joined by a single apostrophe or hyphen between
 * runs, with at most one trailing apostrophe (covers plural possessives like
 * `boys'`, confirmed in the canonical corpus alongside singular `boy's`).
 * Rejects malformed punctuation such as repeated hyphens (`cat---dog`),
 * doubled apostrophes (`don''t`), or a word that is punctuation with no
 * letters — without needing a separate error code, since these can never be
 * legitimate spelling targets either way.
 */
function buildWordShapePattern(allowDigits: boolean): RegExp {
  const letters = allowDigits ? '\\p{L}\\p{M}\\p{N}' : '\\p{L}\\p{M}';
  return new RegExp(`^[${letters}]+(?:['-][${letters}]+)*'?$`, 'u');
}

/**
 * Validate a single word entry, returning a structured result rather than
 * throwing. Validation runs against the normalized form (case and accents
 * preserved).
 *
 * Checks, in order: non-empty, length within `[minLength, maxLength]`, no digits
 * (unless `allowDigits`), and a well-formed spelling shape — Unicode letters
 * joined only by single apostrophes/hyphens, plus spaces (each space-separated
 * token checked independently) when `allowSpaces`.
 */
export function validateWordInput(
  word: string,
  options: ValidationOptions = {},
): ValidationResult {
  const {
    minLength = DEFAULT_MIN_LENGTH,
    maxLength = DEFAULT_MAX_LENGTH,
    allowSpaces = false,
    allowDigits = false,
  } = options;

  const normalized = normalizeWord(word);
  const errors: ValidationError[] = [];

  if (normalized.length === 0) {
    errors.push({ code: 'empty', message: 'Word must not be empty.' });
    return { valid: false, normalized, errors };
  }

  if (normalized.length < minLength) {
    errors.push({
      code: 'too_short',
      message: `Word must be at least ${minLength} character(s).`,
    });
  }
  if (normalized.length > maxLength) {
    errors.push({
      code: 'too_long',
      message: `Word must be at most ${maxLength} character(s).`,
    });
  }

  if (!allowDigits && /\p{N}/u.test(normalized)) {
    errors.push({ code: 'contains_digits', message: 'Word must not contain digits.' });
  }

  const wordShapePattern = buildWordShapePattern(allowDigits);
  const tokens = allowSpaces ? normalized.split(' ') : [normalized];
  if (!tokens.every((token) => wordShapePattern.test(token))) {
    errors.push({
      code: 'invalid_characters',
      message: 'Word contains characters that are not allowed.',
    });
  }

  return { valid: errors.length === 0, normalized, errors };
}

/**
 * Filter an already-normalized word list down to entries that pass the
 * spelling character policy. Used at decode boundaries (`decodeWordList`,
 * `decodeSharedList`) so a malformed or manually crafted shared payload can
 * never smuggle in words the same policy would reject from ordinary custom
 * word entry (e.g. `!/3428922`). Decoding drops them silently, matching
 * `parseWordInput`'s existing silent-drop behavior for garbage tokens,
 * rather than surfacing an error for content the recipient didn't type.
 */
export function filterValidSpellingWords(
  words: string[],
  options: ValidationOptions = {},
): string[] {
  return words.filter((word) => validateWordInput(word, options).valid);
}
