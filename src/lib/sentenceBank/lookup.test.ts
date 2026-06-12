import { describe, it, expect } from 'vitest';
import { getSentenceBankEntry, getSentenceForWord } from './lookup';

describe('getSentenceBankEntry', () => {
  it('returns an entry for an exact lowercase match', () => {
    const entry = getSentenceBankEntry('friend');
    expect(entry).toBeDefined();
    expect(entry?.word).toBe('friend');
    expect(entry?.exampleSentence).toBeTruthy();
  });

  it('returns an entry for an uppercase input', () => {
    const entry = getSentenceBankEntry('FRIEND');
    expect(entry).toBeDefined();
    expect(entry?.word).toBe('friend');
  });

  it('returns an entry for mixed-case input', () => {
    const entry = getSentenceBankEntry('Friend');
    expect(entry).toBeDefined();
  });

  it('returns an entry for input with leading and trailing whitespace', () => {
    const entry = getSentenceBankEntry('  friend  ');
    expect(entry).toBeDefined();
  });

  it('returns undefined for a word not in the bank', () => {
    expect(getSentenceBankEntry('xylophone')).toBeUndefined();
  });

  it('returns undefined for an empty string', () => {
    expect(getSentenceBankEntry('')).toBeUndefined();
  });

  it('preserves full entry data including gradeBand, tags, and sourceType', () => {
    const entry = getSentenceBankEntry('because');
    expect(entry).toMatchObject({
      word: 'because',
      exampleSentence: expect.any(String),
      gradeBand: '4-5',
      sourceType: 'curated',
    });
  });

  it('sourceType is always curated', () => {
    const entry = getSentenceBankEntry('school');
    expect(entry?.sourceType).toBe('curated');
  });

  it('returns a curated entry for a Grades 3–5 word', () => {
    const entry = getSentenceBankEntry('across');
    expect(entry).toBeDefined();
    expect(entry?.word).toBe('across');
    expect(entry?.sourceType).toBe('curated');
  });

  it('matches a contraction entered with a smart apostrophe', () => {
    const entry = getSentenceBankEntry('couldn’t');
    expect(entry).toBeDefined();
    expect(entry?.word).toBe("couldn't");
  });

  it('matches a hyphenated word, preserving the hyphen', () => {
    const entry = getSentenceBankEntry('good-by');
    expect(entry).toBeDefined();
    expect(entry?.word).toBe('good-by');
  });

  it('does not include the skipped heteronym "minute"', () => {
    expect(getSentenceBankEntry('minute')).toBeUndefined();
  });
});

describe('getSentenceForWord', () => {
  it('returns the sentence string for a known word', () => {
    const sentence = getSentenceForWord('friend');
    expect(typeof sentence).toBe('string');
    expect(sentence!.length).toBeGreaterThan(0);
  });

  it('returns undefined for an unknown word', () => {
    expect(getSentenceForWord('xylophone')).toBeUndefined();
  });

  it('handles uppercase input', () => {
    expect(getSentenceForWord('SCHOOL')).toBe(getSentenceForWord('school'));
  });
});
