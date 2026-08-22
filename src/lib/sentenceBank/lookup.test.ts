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

  it('includes the heteronym "minute" as a spelling-only entry', () => {
    const entry = getSentenceBankEntry('minute');
    expect(entry).toBeDefined();
    expect(entry?.word).toBe('minute');
    expect(entry?.sentenceOmissionReason).toBe('heteronym');
    expect(entry?.exampleSentence).toBeUndefined();
  });
});

describe('mixed word lists never make a session-level sentence promise', () => {
  // Regression guard for the /play custom-list enrichment path (play.astro),
  // which maps each word through getSentenceBankEntry independently. A
  // mixed list must enrich only the words that actually have bank
  // coverage — never assume every word in a session has a sentence just
  // because some do, and never silently borrow one word's sentence for
  // another.
  it('enriches only the words that have bank coverage, leaving the rest without exampleSentence', () => {
    const words = ['friend', 'xylophone', 'because', 'zzzznotaword'];
    const enriched = words.map((w) => {
      const entry = getSentenceBankEntry(w);
      return entry ? { word: w, exampleSentence: entry.exampleSentence } : { word: w };
    });

    expect(enriched[0]).toMatchObject({ word: 'friend' });
    expect(enriched[0].exampleSentence).toBeTruthy();

    expect(enriched[1]).toEqual({ word: 'xylophone' });
    expect('exampleSentence' in enriched[1]).toBe(false);

    expect(enriched[2]).toMatchObject({ word: 'because' });
    expect(enriched[2].exampleSentence).toBeTruthy();

    expect(enriched[3]).toEqual({ word: 'zzzznotaword' });
    expect('exampleSentence' in enriched[3]).toBe(false);
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

  it('returns undefined for a spelling-only heteronym entry', () => {
    expect(getSentenceForWord('minute')).toBeUndefined();
  });

  it('handles uppercase input', () => {
    expect(getSentenceForWord('SCHOOL')).toBe(getSentenceForWord('school'));
  });
});
