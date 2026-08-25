import { describe, expect, it } from 'vitest';
import { classifySpellingIssue, suggestSpellingFix } from './describeSpellingIssue';
import { validateWordListInput } from './validateWordList';
import type { InvalidWordEntry } from './validateWordList';

function invalidEntryFor(raw: string): InvalidWordEntry {
  const { invalidEntries } = validateWordListInput(raw);
  const entry = invalidEntries[0];
  if (!entry) throw new Error(`expected "${raw}" to be invalid`);
  return entry;
}

describe('classifySpellingIssue', () => {
  it.each([
    ["don''t", 'adjacent_apostrophes'],
    ["don'''t", 'adjacent_apostrophes'],
    ['in--depth', 'adjacent_hyphens'],
    ['in---depth', 'adjacent_hyphens'],
    ["don'-t", 'mixed_adjacent_joiners'],
    ["in-'depth", 'mixed_adjacent_joiners'],
    ['-cat', 'leading_joiner'],
    ["'cat", 'leading_joiner'],
    ['cat-', 'trailing_hyphen'],
    ['in-', 'trailing_hyphen'],
    ['mother in law', 'internal_space'],
    ['c@t', 'unsupported_symbol'],
    ['hel@lo', 'unsupported_symbol'],
    ['cat2', 'contains_digits'],
    ['123', 'contains_digits'],
    ['!/3428922', 'contains_digits'],
    ['😀', 'unrecognized'],
    ['!!!', 'unrecognized'],
  ])('%j -> %j', (raw, expected) => {
    expect(classifySpellingIssue(invalidEntryFor(raw))).toBe(expected);
  });

  it('classifies an over-length entry as too_long, not a character issue', () => {
    const entry = invalidEntryFor('a'.repeat(50));
    expect(classifySpellingIssue(entry)).toBe('too_long');
  });
});

describe('suggestSpellingFix', () => {
  it.each([
    ["don''t", "don't"],
    ['in--depth', 'in-depth'],
    ["don'-t", "don't"],
    ["in-'depth", 'in-depth'],
    ['-cat', 'cat'],
    ["'cat", 'cat'],
    ['cat-', 'cat'],
    ['in-', 'in'],
    ['cat2', 'cat'],
    ['c@t', 'ct'],
  ])('suggests a fix for %j -> %j', (raw, expected) => {
    const entry = invalidEntryFor(raw);
    const reason = classifySpellingIssue(entry);
    expect(suggestSpellingFix(entry, reason)).toBe(expected);
  });

  it('suggests no fix for an internal-space entry (ambiguous: hyphenate or split?)', () => {
    const entry = invalidEntryFor('mother in law');
    expect(suggestSpellingFix(entry, 'internal_space')).toBeUndefined();
  });

  it('suggests no fix for an entry with nothing recoverable (symbols/digits only)', () => {
    const entry = invalidEntryFor('!/3428922');
    const reason = classifySpellingIssue(entry);
    expect(suggestSpellingFix(entry, reason)).toBeUndefined();
  });

  it('suggests no fix for an unrecognized (emoji-only) entry', () => {
    const entry = invalidEntryFor('😀');
    expect(suggestSpellingFix(entry, 'unrecognized')).toBeUndefined();
  });

  it('never suggests something that would itself still be invalid', () => {
    // A degenerate case that would only leave a lone hyphen if trimmed
    // naively — suggestSpellingFix must refuse to suggest it.
    const entry: InvalidWordEntry = {
      raw: '-',
      normalized: '-',
      errors: [{ code: 'invalid_characters', message: 'x' }],
    };
    expect(suggestSpellingFix(entry, 'leading_joiner')).toBeUndefined();
  });
});
