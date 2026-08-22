import { describe, expect, it } from 'vitest';
import { compareWords, getAnswerOutcome } from './compareWords';

describe('compareWords', () => {
  it('is case-insensitive by default', () => {
    expect(compareWords('Cat', 'cat')).toBe(true);
    expect(compareWords('FRIEND', 'friend')).toBe(true);
  });

  it('is accent-sensitive by default', () => {
    expect(compareWords('café', 'cafe')).toBe(false);
    expect(compareWords('résumé', 'resume')).toBe(false);
  });

  it('normalizes whitespace and quotes before comparing', () => {
    expect(compareWords('  don’t ', "don't")).toBe(true);
    expect(compareWords('mother in   law', 'mother in law')).toBe(true);
  });

  it('respects caseSensitive option', () => {
    expect(compareWords('Cat', 'cat', { caseSensitive: true })).toBe(false);
    expect(compareWords('cat', 'cat', { caseSensitive: true })).toBe(true);
  });

  it('respects foldDiacritics option', () => {
    expect(compareWords('café', 'cafe', { foldDiacritics: true })).toBe(true);
  });

  it('combines options', () => {
    expect(
      compareWords('Café', 'cafe', { foldDiacritics: true, caseSensitive: false }),
    ).toBe(true);
    expect(
      compareWords('Café', 'cafe', { foldDiacritics: true, caseSensitive: true }),
    ).toBe(false);
  });
});

describe('getAnswerOutcome', () => {
  it('is correct for an exact lowercase match', () => {
    expect(getAnswerOutcome('cat', 'cat')).toBe('correct');
  });

  it('ignores leading/trailing whitespace', () => {
    expect(getAnswerOutcome('  cat  ', 'cat')).toBe('correct');
  });

  it('is correct for an exact match against a capitalized canonical word', () => {
    expect(getAnswerOutcome('January', 'January')).toBe('correct');
  });

  it('is a caseMismatch for a lowercase answer to a capitalized canonical word', () => {
    expect(getAnswerOutcome('january', 'January')).toBe('caseMismatch');
    expect(getAnswerOutcome('wednesday', 'Wednesday')).toBe('caseMismatch');
  });

  it('is incorrect for a genuine misspelling of a proper noun, not a caseMismatch', () => {
    expect(getAnswerOutcome('Janury', 'January')).toBe('incorrect');
    expect(getAnswerOutcome('janury', 'January')).toBe('incorrect');
  });

  // Refinement: a case-only difference against an all-lowercase canonical
  // word is plain `correct` — no capitalization reminder for ordinary words.
  it('does not flag a case-only difference against an all-lowercase canonical word', () => {
    expect(getAnswerOutcome('Cat', 'cat')).toBe('correct');
    expect(getAnswerOutcome('CAT', 'cat')).toBe('correct');
    expect(getAnswerOutcome('cAt', 'cat')).toBe('correct');
  });

  it('accepts a straight apostrophe', () => {
    expect(getAnswerOutcome("don't", "don't")).toBe('correct');
  });

  it('accepts a curly apostrophe as equivalent to straight', () => {
    expect(getAnswerOutcome('don’t', "don't")).toBe('correct');
    expect(getAnswerOutcome("don't", 'don’t')).toBe('correct');
  });

  it('treats a missing apostrophe as incorrect, not equivalent', () => {
    expect(getAnswerOutcome('dont', "don't")).toBe('incorrect');
  });

  it('treats a contraction whose de-apostrophed form is another real word as incorrect', () => {
    // "we'll" without its apostrophe collides with "well" — must not match.
    expect(getAnswerOutcome('well', "we'll")).toBe('incorrect');
  });

  it('is consistent for custom-word case behavior (same shared comparison policy)', () => {
    // A custom list preserves the student's supplied canonical form, but is
    // not unnecessarily punitive about case-only differences either: same
    // rule as curated content, driven by whether the canonical form itself
    // carries meaningful capitalization.
    expect(getAnswerOutcome('paris', 'paris')).toBe('correct'); // custom lowercase word
    expect(getAnswerOutcome('Paris', 'paris')).toBe('correct'); // case-only, not meaningful
    expect(getAnswerOutcome('paris', 'Paris')).toBe('caseMismatch'); // custom capitalized word
  });
});
