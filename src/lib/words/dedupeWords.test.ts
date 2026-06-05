import { describe, expect, it } from 'vitest';
import { dedupeWords } from './dedupeWords';

describe('dedupeWords', () => {
  it('removes case-insensitive duplicates and keeps first surface form', () => {
    expect(dedupeWords(['Cat', 'cat', 'CAT'])).toEqual(['Cat']);
  });

  it('preserves order of first occurrence', () => {
    expect(dedupeWords(['dog', 'cat', 'dog', 'bird', 'cat'])).toEqual(['dog', 'cat', 'bird']);
  });

  it('keeps accent variants distinct by default', () => {
    expect(dedupeWords(['café', 'cafe'])).toEqual(['café', 'cafe']);
    expect(dedupeWords(['résumé', 'resume'])).toEqual(['résumé', 'resume']);
  });

  it('collapses accent variants when foldDiacritics is set', () => {
    expect(dedupeWords(['café', 'cafe'], { foldDiacritics: true })).toEqual(['café']);
  });

  it('treats case as significant when caseSensitive is set', () => {
    expect(dedupeWords(['Cat', 'cat'], { caseSensitive: true })).toEqual(['Cat', 'cat']);
  });

  it('does not mutate the input array', () => {
    const input = ['a', 'a', 'b'];
    dedupeWords(input);
    expect(input).toEqual(['a', 'a', 'b']);
  });

  it('handles an empty array', () => {
    expect(dedupeWords([])).toEqual([]);
  });
});
