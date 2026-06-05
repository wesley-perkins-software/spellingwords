import { describe, expect, it } from 'vitest';
import { normalizeWordList } from './normalizeWordList';

describe('normalizeWordList', () => {
  it('normalizes each word and drops empties', () => {
    expect(normalizeWordList(['  cat ', '', 'dog,', '...', 'fish'])).toEqual([
      'cat',
      'dog',
      'fish',
    ]);
  });

  it('dedupes by default (case-insensitive, accent-sensitive)', () => {
    expect(normalizeWordList(['Cat', 'cat', 'café', 'cafe'])).toEqual(['Cat', 'café', 'cafe']);
  });

  it('preserves duplicates when dedupe is disabled', () => {
    expect(normalizeWordList(['cat', 'cat'], { dedupe: false })).toEqual(['cat', 'cat']);
  });

  it('passes normalize options through', () => {
    expect(normalizeWordList(['Café'], { lowercase: true, foldDiacritics: true })).toEqual([
      'cafe',
    ]);
  });

  it('preserves order', () => {
    expect(normalizeWordList(['zebra', 'apple', 'mango'])).toEqual(['zebra', 'apple', 'mango']);
  });

  it('does not mutate the input array', () => {
    const input = ['  cat ', 'dog'];
    normalizeWordList(input);
    expect(input).toEqual(['  cat ', 'dog']);
  });
});
