import { describe, it, expect } from 'vitest';
import { SENTENCE_BANK } from './data';
import { K1_ENTRIES } from './data/k1';
import { GRADE23_ENTRIES } from './data/grade23';
import { GRADE45_ENTRIES } from './data/grade45';
import { normalizeWord } from '@/lib/words';

// Words where the target appears in a possessive/inflected form in the sentence.
// Format: word → token that counts as a match (after stripping punctuation).
const SENTENCE_WORD_ALLOWLIST: Record<string, string[]> = {
  pony: ["ponys"], // pony's → ponys after stripping punctuation
  // Abbreviations carry a trailing period in the word field; the sentence token
  // loses it during punctuation stripping (e.g. "Mr." → "mr").
  'mr.': ['mr'],
  'mrs.': ['mrs'],
  'ms.': ['ms'],
};

function sentenceContainsWord(word: string, sentence: string): boolean {
  const normalizedWord = word.toLowerCase().replace(/['’]/g, "'");
  const sentenceLower = sentence.toLowerCase();

  // Tokenize sentence: split on whitespace, strip leading/trailing punctuation from each token
  const tokens = sentenceLower
    .split(/\s+/)
    .map(t => t.replace(/^[^a-z']+|[^a-z']+$/g, ''));

  // Direct match
  if (tokens.includes(normalizedWord)) return true;

  // For contractions: strip apostrophe and check (e.g., can't → cant)
  const strippedWord = normalizedWord.replace(/'/g, '');
  if (strippedWord !== normalizedWord && tokens.some(t => t.replace(/'/g, '') === strippedWord)) return true;

  // Check allowlist
  const allowed = SENTENCE_WORD_ALLOWLIST[normalizedWord];
  if (allowed) {
    const strippedTokens = tokens.map(t => t.replace(/[^a-z]/g, ''));
    if (allowed.some(a => strippedTokens.includes(a))) return true;
  }

  return false;
}

describe('sentence bank data integrity', () => {
  it('has no duplicate normalized words', () => {
    const seen = new Map<string, string>();
    const duplicates: string[] = [];
    for (const entry of SENTENCE_BANK) {
      const key = normalizeWord(entry.word, { lowercase: true });
      if (seen.has(key)) {
        duplicates.push(`"${entry.word}" duplicates "${seen.get(key)}"`);
      } else {
        seen.set(key, entry.word);
      }
    }
    expect(duplicates).toEqual([]);
  });

  it('every entry has a non-empty word', () => {
    const bad = SENTENCE_BANK.filter(e => !e.word.trim());
    expect(bad.map(e => e.word)).toEqual([]);
  });

  it('every entry has exactly one of exampleSentence or sentenceOmissionReason', () => {
    // Discriminated-union invariant: an entry has a real example sentence OR an
    // explicit omission reason (e.g. a heteronym), never both and never neither.
    const validOmissionReasons = new Set(['heteronym']);
    const bad: string[] = [];
    for (const entry of SENTENCE_BANK) {
      const hasSentence = Boolean(entry.exampleSentence && entry.exampleSentence.trim());
      const hasOmission = entry.sentenceOmissionReason !== undefined;
      if (hasSentence === hasOmission) {
        bad.push(`"${entry.word}": sentence=${hasSentence}, omission=${hasOmission}`);
      } else if (hasOmission && !validOmissionReasons.has(entry.sentenceOmissionReason as string)) {
        bad.push(`"${entry.word}": invalid omission reason "${entry.sentenceOmissionReason}"`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('every entry has sourceType curated', () => {
    const bad = SENTENCE_BANK.filter(e => e.sourceType !== 'curated');
    expect(bad.map(e => e.word)).toEqual([]);
  });

  it('every entry has a valid gradeBand', () => {
    const valid = new Set(['K-1', '2-3', '4-5']);
    const bad = SENTENCE_BANK.filter(e => !valid.has(e.gradeBand ?? ''));
    expect(bad.map(e => e.word)).toEqual([]);
  });

  it('every exampleSentence contains the target word', () => {
    const failing: string[] = [];
    for (const entry of SENTENCE_BANK) {
      if (!entry.exampleSentence) continue; // spelling-only entries have no sentence
      if (!sentenceContainsWord(entry.word, entry.exampleSentence)) {
        failing.push(`"${entry.word}": "${entry.exampleSentence}"`);
      }
    }
    expect(failing).toEqual([]);
  });

  it('all sentences are between 5 and 25 words long', () => {
    const bad = SENTENCE_BANK.filter(e => {
      if (!e.exampleSentence) return false; // spelling-only entries have no sentence
      const count = e.exampleSentence.trim().split(/\s+/).length;
      return count < 5 || count > 25;
    });
    expect(
      bad.map(e => ({ word: e.word, length: e.exampleSentence!.split(/\s+/).length })),
    ).toEqual([]);
  });

  it('no mojibake characters in any entry', () => {
    const mojibakePattern = /[â€œâ€™]/;
    const bad = SENTENCE_BANK.filter(
      e =>
        mojibakePattern.test(e.word) ||
        (e.exampleSentence !== undefined && mojibakePattern.test(e.exampleSentence))
    );
    expect(bad.map(e => e.word)).toEqual([]);
  });

  it('K-1 entries are sorted alphabetically', () => {
    const outOfOrder: string[] = [];
    for (let i = 1; i < K1_ENTRIES.length; i++) {
      const a = K1_ENTRIES[i - 1].word.toLowerCase();
      const b = K1_ENTRIES[i].word.toLowerCase();
      if (a.localeCompare(b) > 0) {
        outOfOrder.push(`"${K1_ENTRIES[i - 1].word}" before "${K1_ENTRIES[i].word}"`);
      }
    }
    expect(outOfOrder).toEqual([]);
  });

  it('grade 2-3 entries are sorted alphabetically', () => {
    const outOfOrder: string[] = [];
    for (let i = 1; i < GRADE23_ENTRIES.length; i++) {
      const a = GRADE23_ENTRIES[i - 1].word.toLowerCase();
      const b = GRADE23_ENTRIES[i].word.toLowerCase();
      if (a.localeCompare(b) > 0) {
        outOfOrder.push(`"${GRADE23_ENTRIES[i - 1].word}" before "${GRADE23_ENTRIES[i].word}"`);
      }
    }
    expect(outOfOrder).toEqual([]);
  });

  it('grade 4-5 entries are sorted alphabetically', () => {
    const outOfOrder: string[] = [];
    for (let i = 1; i < GRADE45_ENTRIES.length; i++) {
      const a = GRADE45_ENTRIES[i - 1].word.toLowerCase();
      const b = GRADE45_ENTRIES[i].word.toLowerCase();
      if (a.localeCompare(b) > 0) {
        outOfOrder.push(`"${GRADE45_ENTRIES[i - 1].word}" before "${GRADE45_ENTRIES[i].word}"`);
      }
    }
    expect(outOfOrder).toEqual([]);
  });
});
