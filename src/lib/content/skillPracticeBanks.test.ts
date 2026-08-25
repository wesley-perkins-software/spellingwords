import { describe, expect, it } from 'vitest';
import { comparisonKey } from '@/lib/words';
import { getSentenceBankEntry } from '@/lib/sentenceBank/lookup';
import { CURATED_SPELLING_SKILL_IDS, isCuratedSpellingSkillId } from './spellingSkills';
import {
  SKILL_PRACTICE_BANKS,
  getSkillPracticeBank,
  selectSkillPracticeSession,
  toPlayableSkillPracticeWords,
} from './skillPracticeBanks';

describe('SKILL_PRACTICE_BANKS', () => {
  const banks = Object.values(SKILL_PRACTICE_BANKS);

  it('has a bank for every one of the 41 canonical Skills', () => {
    expect(CURATED_SPELLING_SKILL_IDS.length).toBe(41);
    expect(Object.keys(SKILL_PRACTICE_BANKS).sort()).toEqual([...CURATED_SPELLING_SKILL_IDS].sort());
  });

  it('has exactly the piloted, expansion-batch, and meaning-dependent Skills', () => {
    expect(Object.keys(SKILL_PRACTICE_BANKS).sort()).toEqual(
      [
        'ck-tch-dge-word-endings',
        'common-suffixes',
        'digraph-sh-words',
        'multisyllabic-words',
        'short-a-words',
        'silent-e-long-a',
        'short-e-words',
        'short-i-words',
        'short-o-words',
        'short-u-words',
        'digraph-ch-words',
        'digraph-th-words',
        'digraph-wh-words',
        'silent-e-long-i',
        'silent-e-long-o',
        'silent-e-long-u',
        'r-controlled-ar',
        'r-controlled-or',
        'r-controlled-er-ir-ur',
        'vowel-teams-ai-ay',
        'vowel-teams-ee-ea',
        'vowel-teams-oa-ow',
        'oi-and-oy-words',
        'ou-and-ow-words',
        'ie-and-igh-words',
        'oo-words',
        'au-and-aw-words',
        'beginning-blends',
        'ending-blends',
        'silent-letters',
        'soft-c-soft-g',
        'plurals',
        'ed-and-ing',
        'suffix-spelling-changes',
        'compound-words',
        'contractions',
        'un-and-re-prefixes',
        'common-prefixes',
        'greek-and-latin-roots',
        'homophones',
        'commonly-confused-words',
      ].sort(),
    );
  });

  it('keys every bank under a real curated Skill id, matching its own skillId', () => {
    for (const [key, bank] of Object.entries(SKILL_PRACTICE_BANKS)) {
      expect(isCuratedSpellingSkillId(key)).toBe(true);
      expect(bank?.skillId).toBe(key);
    }
  });

  it('gives every bank a non-trivial, non-empty word list', () => {
    for (const bank of banks) {
      expect(bank).toBeDefined();
      expect(bank!.words.length).toBeGreaterThan(0);
      for (const word of bank!.words) {
        expect(word).toBe(word.trim());
        expect(word.length).toBeGreaterThan(0);
      }
    }
  });

  it('has no duplicate words within a bank', () => {
    for (const bank of banks) {
      const keys = bank!.words.map((w) => comparisonKey(w));
      expect(new Set(keys).size).toBe(keys.length);
    }
  });

  it('has an example sentence for every word in every bank', () => {
    for (const bank of banks) {
      for (const word of bank!.words) {
        expect(
          getSentenceBankEntry(word)?.exampleSentence,
          `expected a sentence-bank example sentence for "${word}" (Skill: ${bank!.skillId})`,
        ).toBeTruthy();
      }
    }
  });
});

describe('getSkillPracticeBank', () => {
  it('returns the bank for a piloted Skill', () => {
    expect(getSkillPracticeBank('short-a-words')?.words.length).toBeGreaterThan(0);
  });

  it('returns the bank for the meaning-dependent Skills, using the ordinary bank shape', () => {
    const homophones = getSkillPracticeBank('homophones')?.words ?? [];
    expect(homophones).toEqual(expect.arrayContaining(['to', 'too', 'two', 'there', 'their', "they're"]));
    expect(homophones.length).toBeGreaterThan(6);

    const confusedWords = getSkillPracticeBank('commonly-confused-words')?.words ?? [];
    expect(confusedWords).toEqual(
      expect.arrayContaining([
        'affect',
        'effect',
        'principal',
        'principle',
        'advice',
        'advise',
        'than',
        'then',
      ]),
    );
    expect(confusedWords.length).toBeGreaterThan(8);
  });

  it('returns undefined for an unrecognized id', () => {
    expect(getSkillPracticeBank('not-a-real-skill')).toBeUndefined();
  });
});

describe('toPlayableSkillPracticeWords', () => {
  it('maps every word to a SpellingWord with the same word text', () => {
    const bank = getSkillPracticeBank('short-a-words')!;
    const playable = toPlayableSkillPracticeWords(bank);
    expect(playable.map((w) => w.word)).toEqual(bank.words);
  });
});

describe('selectSkillPracticeSession', () => {
  const words = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];

  it('caps the selection at the requested session size when the bank is larger', () => {
    const session = selectSkillPracticeSession(words, 10, () => 0.5);
    expect(session).toHaveLength(10);
  });

  it('returns the whole (shuffled) bank when it is smaller than the session size', () => {
    const small = ['x', 'y', 'z'];
    const session = selectSkillPracticeSession(small, 10, () => 0.5);
    expect(session).toHaveLength(3);
    expect(new Set(session)).toEqual(new Set(small));
  });

  it('never returns duplicate words from a bank with no duplicates', () => {
    const session = selectSkillPracticeSession(words, 10, Math.random);
    expect(new Set(session).size).toBe(session.length);
  });

  it('is deterministic for a given rng, and produces different orders for different rngs', () => {
    const sessionA = selectSkillPracticeSession(words, 10, () => 0.1);
    const sessionB = selectSkillPracticeSession(words, 10, () => 0.1);
    const sessionC = selectSkillPracticeSession(words, 10, () => 0.9);
    expect(sessionA).toEqual(sessionB);
    expect(sessionA).not.toEqual(sessionC);
  });

  it('defaults to a session size of 10', () => {
    const session = selectSkillPracticeSession(words, undefined, () => 0.5);
    expect(session).toHaveLength(10);
  });
});
