import { sanitizeSpellingCharacters } from './characters';
import { validateWordInput } from './validateWordInput';
import type { InvalidWordEntry } from './validateWordList';

/**
 * A more specific, UI-facing reason why one custom-list entry failed
 * `validateWordInput` — purely diagnostic. This never changes what passes
 * or fails (that's still entirely `validateWordInput`'s structural
 * grammar); it only explains, after the fact, which part of that grammar
 * an already-invalid entry broke, so custom-list feedback can say *why*
 * (`"don''t" has two apostrophes together`) instead of repeating the same
 * generic allowed-character sentence for every kind of mistake.
 */
export type SpellingIssueReason =
  | 'contains_digits'
  | 'too_long'
  | 'too_short'
  | 'adjacent_apostrophes'
  | 'adjacent_hyphens'
  | 'mixed_adjacent_joiners'
  | 'leading_joiner'
  | 'trailing_hyphen'
  | 'internal_space'
  | 'unsupported_symbol'
  | 'unrecognized';

const ADJACENT_APOSTROPHES = /['’]{2,}/;
const ADJACENT_HYPHENS = /-{2,}/;
const MIXED_ADJACENT_JOINERS = /['’]-|-['’]/;
const LEADING_JOINER = /^['’-]/;
const TRAILING_HYPHEN = /-$/;

/**
 * Classify why one invalid custom-list entry failed, most specific reason
 * first. Reads only `entry.errors`/`entry.normalized` — the same data
 * `validateWordInput` already produced — so this can never disagree with
 * the actual validation result.
 */
export function classifySpellingIssue(entry: InvalidWordEntry): SpellingIssueReason {
  const codes = entry.errors.map((e) => e.code);

  if (codes.includes('too_long')) return 'too_long';
  if (codes.includes('too_short')) return 'too_short';
  if (codes.includes('contains_digits')) return 'contains_digits';

  if (codes.includes('invalid_characters')) {
    const normalized = entry.normalized;
    if (ADJACENT_APOSTROPHES.test(normalized)) return 'adjacent_apostrophes';
    if (ADJACENT_HYPHENS.test(normalized)) return 'adjacent_hyphens';
    if (MIXED_ADJACENT_JOINERS.test(normalized)) return 'mixed_adjacent_joiners';
    if (LEADING_JOINER.test(normalized)) return 'leading_joiner';
    if (TRAILING_HYPHEN.test(normalized)) return 'trailing_hyphen';
    if (/\s/.test(normalized)) return 'internal_space';
    return 'unsupported_symbol';
  }

  // Covers the 'empty' code — normalization reduced the entry to nothing
  // (symbols-only, emoji-only): there's no recognizable word underneath.
  return 'unrecognized';
}

/**
 * A corrected form worth offering as "Try ...", or `undefined` when no
 * confident correction exists. Only ever returns a value that (a) differs
 * from what was typed and (b) itself passes `validateWordInput` — so a
 * suggestion is never itself still broken.
 *
 * Reuses `sanitizeSpellingCharacters` (the same live-typing sanitizer
 * `/play`'s answer field runs) to collapse malformed adjacent/leading
 * punctuation and drop digits/symbols; a bare trailing hyphen (the one
 * shape that sanitizer deliberately leaves alone, since it's a legitimate
 * mid-typing state) is trimmed separately here, because a *completed*
 * custom-list entry ending in a hyphen has no such excuse.
 */
export function suggestSpellingFix(
  entry: InvalidWordEntry,
  reason: SpellingIssueReason,
): string | undefined {
  if (
    reason === 'internal_space' ||
    reason === 'too_long' ||
    reason === 'too_short' ||
    reason === 'unrecognized'
  ) {
    return undefined;
  }

  const candidate =
    reason === 'trailing_hyphen'
      ? entry.normalized.replace(/-+$/, '')
      : sanitizeSpellingCharacters(entry.raw);

  if (!candidate || candidate === entry.raw) return undefined;
  return validateWordInput(candidate).valid ? candidate : undefined;
}
