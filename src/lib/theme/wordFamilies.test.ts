import { describe, expect, it } from 'vitest';
import { groupByWordFamily } from './wordFamilies';

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
