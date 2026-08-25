import { describe, expect, it } from 'vitest';
import { validateWordListInput } from './validateWordList';

describe('validateWordListInput', () => {
  it('accepts a simple list of valid words', () => {
    const result = validateWordListInput('cat\ndog\nJanuary');
    expect(result.words).toEqual(['cat', 'dog', 'January']);
    expect(result.invalidEntries).toEqual([]);
  });

  it('accepts contractions and hyphenated words', () => {
    const result = validateWordListInput("don't\nmother-in-law\nO'Brien");
    expect(result.words).toEqual(["don't", 'mother-in-law', "O'Brien"]);
    expect(result.invalidEntries).toEqual([]);
  });

  it('flags a digit-bearing entry with its raw text and error code', () => {
    const result = validateWordListInput('cat\ncat2\ndog');
    expect(result.words).toEqual(['cat', 'dog']);
    expect(result.invalidEntries).toHaveLength(1);
    expect(result.invalidEntries[0].raw).toBe('cat2');
    expect(result.invalidEntries[0].errors.map((e) => e.code)).toContain('contains_digits');
  });

  it('flags an interior-symbol entry', () => {
    const result = validateWordListInput('c@t');
    expect(result.words).toEqual([]);
    expect(result.invalidEntries[0].raw).toBe('c@t');
    expect(result.invalidEntries[0].errors.map((e) => e.code)).toContain('invalid_characters');
  });

  it('flags the reported bug case', () => {
    const result = validateWordListInput('!/3428922');
    expect(result.words).toEqual([]);
    expect(result.invalidEntries).toHaveLength(1);
  });

  it('silently drops accidental edge punctuation rather than flagging it (existing normalization behavior)', () => {
    const result = validateWordListInput('hello!\n#dog\nfriend,');
    expect(result.words).toEqual(['hello', 'dog', 'friend']);
    expect(result.invalidEntries).toEqual([]);
  });

  it('flags an emoji-only line and a mixed letters+emoji line separately', () => {
    const result = validateWordListInput('😀\ncat');
    expect(result.words).toEqual(['cat']);
    expect(result.invalidEntries).toHaveLength(1);
  });

  it('rejects internal spaces by default (one word per line)', () => {
    const result = validateWordListInput('mother in law');
    expect(result.words).toEqual([]);
    expect(result.invalidEntries[0].errors.map((e) => e.code)).toContain('invalid_characters');
  });

  it('deduplicates valid words case-insensitively', () => {
    const result = validateWordListInput('cat\nCat\ndog');
    expect(result.words).toEqual(['cat', 'dog']);
  });

  it('handles comma/semicolon/bulleted/numbered lists like parseWordInput', () => {
    const result = validateWordListInput('1. cat\n- dog, bird; fish');
    expect(result.words).toEqual(['cat', 'dog', 'bird', 'fish']);
  });

  it('ignores blank lines', () => {
    const result = validateWordListInput('cat\n\n\ndog');
    expect(result.words).toEqual(['cat', 'dog']);
    expect(result.invalidEntries).toEqual([]);
  });
});
