import { describe, expect, it } from 'vitest';
import {
  collapseWhitespace,
  isSpellingCharacter,
  normalizeQuotes,
  normalizeUnicode,
  removeDiacritics,
  sanitizeSpellingCharacters,
  stripEdgePunctuation,
  stripListMarker,
} from './characters';

describe('collapseWhitespace', () => {
  it.each([
    ['  hello  ', 'hello'],
    ['a   b', 'a b'],
    ['a\tb', 'a b'],
    ['a\nb', 'a b'],
    ['a \t\n b', 'a b'],
    ['', ''],
    ['   ', ''],
  ])('collapses %j -> %j', (input, expected) => {
    expect(collapseWhitespace(input)).toBe(expected);
  });
});

describe('normalizeQuotes', () => {
  it.each([
    ['don’t', "don't"],
    ['‘single’', "'single'"],
    ['“double”', '"double"'],
    ['o′clock', "o'clock"],
  ])('straightens %j -> %j', (input, expected) => {
    expect(normalizeQuotes(input)).toBe(expected);
  });
});

describe('normalizeUnicode', () => {
  it('composes decomposed accents to NFC', () => {
    const decomposed = 'café'; // "cafe" + combining acute accent
    const composed = 'café'; // "café" as a single code point
    expect(decomposed).toHaveLength(5);
    expect(normalizeUnicode(decomposed)).toBe(composed);
    expect(normalizeUnicode(decomposed)).toHaveLength(4);
  });
});

describe('removeDiacritics', () => {
  it.each([
    ['café', 'cafe'],
    ['naïve', 'naive'],
    ['piñata', 'pinata'],
    ['résumé', 'resume'],
    ['plain', 'plain'],
  ])('strips accents %j -> %j', (input, expected) => {
    expect(removeDiacritics(input)).toBe(expected);
  });
});

describe('stripListMarker', () => {
  it.each([
    ['1. cat', 'cat'],
    ['2) dog', 'dog'],
    ['3: fish', 'fish'],
    ['10. word', 'word'],
    ['4 - bird', 'bird'],
    ['- cat', 'cat'],
    ['* dog', 'dog'],
    ['• fish', 'fish'],
    ['– dash', 'dash'],
    ['plain line', 'plain line'],
    ['  - indented bullet', 'indented bullet'],
  ])('strips marker %j -> %j', (input, expected) => {
    expect(stripListMarker(input)).toBe(expected);
  });

  it('does not strip a hyphenated word with no following space', () => {
    expect(stripListMarker('well-known')).toBe('well-known');
  });
});

describe('isSpellingCharacter', () => {
  it.each([
    ['a', true],
    ['Z', true],
    ['é', true],
    ["'", true],
    ['’', true],
    ['-', true],
    ['2', false],
    ['@', false],
    ['!', false],
    [' ', false],
    ['😀', false],
  ])('%j -> %j', (char, expected) => {
    expect(isSpellingCharacter(char)).toBe(expected);
  });
});

describe('sanitizeSpellingCharacters', () => {
  it.each([
    ['cat', 'cat'],
    ["don't", "don't"],
    ['don’t', 'don’t'],
    ['mother-in-law', 'mother-in-law'],
    ['cat2', 'cat'],
    ['c@t', 'ct'],
    ['#dog', 'dog'],
    ['hello!', 'hello'],
    ['!/3428922', ''],
    ['123', ''],
    ['c a t', 'cat'],
    ['café', 'café'],
  ])('%j -> %j', (input, expected) => {
    expect(sanitizeSpellingCharacters(input)).toBe(expected);
  });

  it('strips a mixed paste down to just the letters', () => {
    expect(sanitizeSpellingCharacters('c@a#t')).toBe('cat');
  });

  it('drops emoji cleanly, including surrogate-pair emoji, without leaving broken halves', () => {
    expect(sanitizeSpellingCharacters('cat😀')).toBe('cat');
    expect(sanitizeSpellingCharacters('😀')).toBe('');
  });

  it('handles letters plus emoji', () => {
    expect(sanitizeSpellingCharacters('c😀at')).toBe('cat');
  });
});

describe('stripEdgePunctuation', () => {
  it.each([
    ['cat,', 'cat'],
    ['dog.', 'dog'],
    ['"fish"', 'fish'],
    ['(bird)', 'bird'],
    ['!hello!', 'hello'],
    ["o'clock", "o'clock"],
    ['well-known', 'well-known'],
    ['mother-in-law', 'mother-in-law'],
  ])('trims edges %j -> %j', (input, expected) => {
    expect(stripEdgePunctuation(input)).toBe(expected);
  });
});
