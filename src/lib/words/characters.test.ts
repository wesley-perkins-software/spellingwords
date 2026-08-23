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

  describe('structurally valid partial input (mid-typing states)', () => {
    it.each([
      ["don'", "don'"],
      ['in-', 'in-'],
      ["o'", "o'"],
    ])('keeps a single trailing joiner as a legitimate mid-typing state: %j -> %j', (input, expected) => {
      expect(sanitizeSpellingCharacters(input)).toBe(expected);
    });
  });

  describe('structurally valid completed words', () => {
    it.each([
      ["don't", "don't"],
      ["boys'", "boys'"],
      ["teachers'", "teachers'"],
      ["families'", "families'"],
      ["O'Brien", "O'Brien"],
      ['in-depth', 'in-depth'],
      ['mother-in-law', 'mother-in-law'],
    ])('%j -> %j', (input, expected) => {
      expect(sanitizeSpellingCharacters(input)).toBe(expected);
    });
  });

  describe('malformed punctuation sequences (regression: manually reproduced)', () => {
    it("drops a second apostrophe immediately after a joiner — don''t -> don't", () => {
      expect(sanitizeSpellingCharacters("don''t")).toBe("don't");
    });

    it("drops a second hyphen immediately after a joiner — in--depth -> in-depth", () => {
      expect(sanitizeSpellingCharacters('in--depth')).toBe('in-depth');
    });

    it('drops a mixed adjacent pair, apostrophe then hyphen', () => {
      expect(sanitizeSpellingCharacters("don'-t")).toBe("don't");
    });

    it('drops a mixed adjacent pair, hyphen then apostrophe', () => {
      expect(sanitizeSpellingCharacters("in-'depth")).toBe('in-depth');
    });

    it('rejects a leading hyphen', () => {
      expect(sanitizeSpellingCharacters('-cat')).toBe('cat');
    });

    it('rejects a leading apostrophe', () => {
      expect(sanitizeSpellingCharacters("'cat")).toBe('cat');
    });

    it('rejects a leading curly apostrophe', () => {
      expect(sanitizeSpellingCharacters('’cat')).toBe('cat');
    });

    it('a joiner right at the start of the whole value is always dropped, even mid-string after a reset', () => {
      // Simulates pasting `-cat` into an empty field: no preceding letter
      // anywhere yet, so the leading hyphen has nothing to follow.
      expect(sanitizeSpellingCharacters('-')).toBe('');
    });

    it('three joiners in a row collapse to a single kept joiner', () => {
      expect(sanitizeSpellingCharacters("don'''t")).toBe("don't");
      expect(sanitizeSpellingCharacters('in---depth')).toBe('in-depth');
    });

    it('a digit between letters does not let a following joiner "count" as following a letter incorrectly (digit is simply invisible to the joiner rule)', () => {
      // "cat2-dog": digit dropped, hyphen follows the letter "t" (not the
      // digit) in the retained sequence, so it's a legitimate single joiner.
      expect(sanitizeSpellingCharacters('cat2-dog')).toBe('cat-dog');
    });
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
