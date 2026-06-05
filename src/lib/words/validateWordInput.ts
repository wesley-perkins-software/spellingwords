import { normalizeWord } from './normalizeWord';
import type { ValidationError, ValidationOptions, ValidationResult } from './types';

const DEFAULT_MIN_LENGTH = 1;
const DEFAULT_MAX_LENGTH = 45;

/**
 * Validate a single word entry, returning a structured result rather than
 * throwing. Validation runs against the normalized form (case and accents
 * preserved).
 *
 * Checks, in order: non-empty, length within `[minLength, maxLength]`, no digits
 * (unless `allowDigits`), and only allowed characters — Unicode letters,
 * apostrophes, and hyphens (plus spaces when `allowSpaces`).
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

  // Allowed: Unicode letters and combining marks, apostrophe, hyphen, optionally
  // spaces. Digits are intentionally treated as "allowed" here so they surface
  // only as the dedicated `contains_digits` error above, never doubled up as
  // `invalid_characters`.
  const allowed = ['\\p{L}', '\\p{M}', '\\p{N}', "'", '\\-'];
  if (allowSpaces) {
    allowed.push(' ');
  }
  const disallowedPattern = new RegExp(`[^${allowed.join('')}]`, 'u');
  if (disallowedPattern.test(normalized)) {
    errors.push({
      code: 'invalid_characters',
      message: 'Word contains characters that are not allowed.',
    });
  }

  return { valid: errors.length === 0, normalized, errors };
}
