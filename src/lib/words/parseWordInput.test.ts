import { describe, expect, it } from 'vitest';
import { parseWordInput } from './parseWordInput';

describe('parseWordInput', () => {
  it('parses newline-separated words', () => {
    expect(parseWordInput('cat\ndog\nfish')).toEqual(['cat', 'dog', 'fish']);
  });

  it('handles mixed line endings', () => {
    expect(parseWordInput('cat\r\ndog\rfish')).toEqual(['cat', 'dog', 'fish']);
  });

  it('parses comma-separated words on one line', () => {
    expect(parseWordInput('cat, dog, fish')).toEqual(['cat', 'dog', 'fish']);
  });

  it('parses semicolon-separated words by default', () => {
    expect(parseWordInput('cat; dog; fish')).toEqual(['cat', 'dog', 'fish']);
  });

  it('keeps semicolons when splitOnSemicolons is false', () => {
    expect(parseWordInput('cat; dog', { splitOnSemicolons: false })).toEqual(['cat; dog']);
  });

  it('strips numbered list markers', () => {
    expect(parseWordInput('1. cat\n2) dog\n3: fish')).toEqual(['cat', 'dog', 'fish']);
  });

  it('strips bullet list markers', () => {
    expect(parseWordInput('- cat\n* dog\n• fish')).toEqual(['cat', 'dog', 'fish']);
  });

  it('handles a messy mixed paste', () => {
    const input = ['1. Cat', '', '2. dog, BIRD', '  - fish', '', '“mouse”'].join('\n');
    expect(parseWordInput(input)).toEqual(['Cat', 'dog', 'BIRD', 'fish', 'mouse']);
  });

  it('drops empty lines and blank entries', () => {
    expect(parseWordInput('cat\n\n\ndog\n,,\nfish')).toEqual(['cat', 'dog', 'fish']);
  });

  it('dedupes by default', () => {
    expect(parseWordInput('cat\nCat\ndog')).toEqual(['cat', 'dog']);
  });

  it('keeps duplicates when dedupe is disabled', () => {
    expect(parseWordInput('cat\ncat', { dedupe: false })).toEqual(['cat', 'cat']);
  });

  it('preserves accents and keeps accent variants distinct', () => {
    expect(parseWordInput('café\ncafe')).toEqual(['café', 'cafe']);
  });

  it('preserves internal hyphens and apostrophes', () => {
    expect(parseWordInput("well-known\no'clock\nmother-in-law")).toEqual([
      'well-known',
      "o'clock",
      'mother-in-law',
    ]);
  });

  it('returns an empty array for empty input', () => {
    expect(parseWordInput('')).toEqual([]);
    expect(parseWordInput('   \n  \n')).toEqual([]);
  });
});
