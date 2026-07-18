import { describe, expect, it } from 'vitest';
import { groupByWordFamily, shouldGroupByWordFamily } from './wordFamilies';

describe('groupByWordFamily', () => {
  it('groups the real Kindergarten Short A word list into its natural families', () => {
    const words = ['hat', 'mat', 'sat', 'man', 'can', 'bag', 'cap', 'map'];
    const families = groupByWordFamily(words);

    expect(families).toEqual([
      { rime: 'at', words: ['hat', 'mat', 'sat'] },
      { rime: 'an', words: ['man', 'can'] },
      { rime: 'ag', words: ['bag'] },
      { rime: 'ap', words: ['cap', 'map'] },
    ]);
  });

  it('keeps a word with no matching rime as a family of one', () => {
    expect(groupByWordFamily(['cat', 'dog'])).toEqual([
      { rime: 'at', words: ['cat'] },
      { rime: 'og', words: ['dog'] },
    ]);
  });

  it('preserves first-seen order of families', () => {
    const families = groupByWordFamily(['can', 'cat', 'man', 'hat']);
    expect(families.map((f) => f.rime)).toEqual(['an', 'at']);
  });
});

describe('shouldGroupByWordFamily', () => {
  it('enables grouping for the real Kindergarten Short A tags', () => {
    expect(shouldGroupByWordFamily(['grade-K', 'short-vowels', 'short-a', 'cvc'])).toBe(true);
  });

  it('disables grouping for a consonant-digraph list', () => {
    // ship/chip share "-ip" and fish/wish share "-sh", but the taught pattern
    // is the sh-/ch- onset — rime grouping would visually teach the wrong thing.
    expect(shouldGroupByWordFamily(['grade-K', 'digraphs', 'sh', 'ch', 'th'])).toBe(false);
  });

  it('disables grouping for a spelling-rule list even though it also carries cvc/short-vowels', () => {
    // grade-1-cvc-short-vowels-c-k-rule: real tags include both cvc and
    // short-vowels, but the lesson is the c/k/ck spelling rule, not a rime family.
    expect(
      shouldGroupByWordFamily(['grade-1-core', 'short-vowels', 'cvc', 'c-k-ck', 'spelling-rules']),
    ).toBe(false);
  });

  it('disables grouping for vowel-team and silent-e lists', () => {
    expect(shouldGroupByWordFamily(['grade-1-core', 'long-a-and-long-o-vowel-teams'])).toBe(false);
    expect(shouldGroupByWordFamily(['grade-1-core', 'silent-e-long-vowels'])).toBe(false);
  });

  it('enables grouping for the mixed-short-vowels review list', () => {
    expect(shouldGroupByWordFamily(['grade-K', 'short-vowels', 'mixed-short-vowels', 'cvc'])).toBe(
      true,
    );
  });
});
