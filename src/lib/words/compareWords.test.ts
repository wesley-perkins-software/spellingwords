import { describe, expect, it } from 'vitest';
import { compareWords } from './compareWords';

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
