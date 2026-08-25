import { describe, it, expect } from 'vitest';
import { shuffleWords } from './order';

describe('shuffleWords', () => {
  it('returns the same elements in possibly different order', () => {
    const words = ['apple', 'banana', 'cherry', 'date'];
    const result = shuffleWords(words);
    expect(result).toHaveLength(words.length);
    expect(result.sort()).toEqual([...words].sort());
  });

  it('does not mutate the input array', () => {
    const words = Object.freeze(['apple', 'banana', 'cherry']);
    expect(() => shuffleWords(words)).not.toThrow();
    expect(words).toEqual(['apple', 'banana', 'cherry']);
  });

  it('returns empty array for empty input', () => {
    expect(shuffleWords([])).toEqual([]);
  });

  it('returns single-element array unchanged', () => {
    expect(shuffleWords(['only'])).toEqual(['only']);
  });

  it('produces deterministic output with a seeded rng', () => {
    const words = ['a', 'b', 'c', 'd', 'e'];
    const fixedRng = () => 0.3;
    const first = shuffleWords(words, fixedRng);
    const second = shuffleWords(words, fixedRng);
    expect(first).toEqual(second);
  });

  it('works with SpellingWord objects', () => {
    const words = [{ word: 'cat' }, { word: 'dog' }, { word: 'bird' }];
    const result = shuffleWords(words);
    expect(result).toHaveLength(3);
    expect(result.map((w) => w.word).sort()).toEqual(['bird', 'cat', 'dog']);
  });
});
