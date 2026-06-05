import { describe, expect, it } from 'vitest';
import { normalizeWord } from './normalizeWord';

describe('normalizeWord', () => {
  it.each([
    ['  hello  ', 'hello'],
    ['multiple   spaces', 'multiple spaces'],
    ['line\nbreak', 'line break'],
    ['don’t', "don't"],
    ['cat,', 'cat'],
    ['"fish"', 'fish'],
    ['o’clock', "o'clock"],
    ['well-known', 'well-known'],
    ['', ''],
    ['   ', ''],
    ['...', ''],
  ])('normalizes %j -> %j', (input, expected) => {
    expect(normalizeWord(input)).toBe(expected);
  });

  it('preserves original case by default', () => {
    expect(normalizeWord('England')).toBe('England');
    expect(normalizeWord('iPhone')).toBe('iPhone');
  });

  it('preserves accents by default', () => {
    expect(normalizeWord('café')).toBe('café');
    expect(normalizeWord('résumé')).toBe('résumé');
  });

  it('lowercases when the lowercase option is set', () => {
    expect(normalizeWord('England', { lowercase: true })).toBe('england');
  });

  it('folds diacritics when the foldDiacritics option is set', () => {
    expect(normalizeWord('café', { foldDiacritics: true })).toBe('cafe');
  });

  it('is idempotent', () => {
    const once = normalizeWord('  “Don’t”  ');
    expect(normalizeWord(once)).toBe(once);
  });

  it('does not mutate input (strings are immutable, but confirm referential return)', () => {
    const input = 'plain';
    expect(normalizeWord(input)).toBe('plain');
    expect(input).toBe('plain');
  });
});
