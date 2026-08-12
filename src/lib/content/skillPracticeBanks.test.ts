import { describe, expect, it } from 'vitest';
import { comparisonKey } from '@/lib/words';
import { getSentenceBankEntry } from '@/lib/sentenceBank/lookup';
import { CURATED_SPELLING_SKILL_IDS, isCuratedSpellingSkillId } from './spellingSkills';
import {
  SKILL_PRACTICE_BANKS,
  bankItemWord,
  getSkillPracticeBank,
  selectSkillPracticeSession,
  toPlayableSkillPracticeWords,
} from './skillPracticeBanks';

const MEANING_DEPENDENT_SKILL_IDS = ['homophones', 'commonly-confused-words'];

describe('SKILL_PRACTICE_BANKS', () => {
  const banks = Object.values(SKILL_PRACTICE_BANKS);

  it('covers every one of the 41 canonical Skills', () => {
    expect(CURATED_SPELLING_SKILL_IDS.length).toBe(41);
    expect(Object.keys(SKILL_PRACTICE_BANKS).sort()).toEqual(
      [...CURATED_SPELLING_SKILL_IDS].sort(),
    );
  });

  it('has exactly the piloted and expansion-batch Skills, plus the two meaning-dependent Skills', () => {
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
        ...MEANING_DEPENDENT_SKILL_IDS,
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
      for (const item of bank!.words) {
        const word = bankItemWord(item);
        expect(word).toBe(word.trim());
        expect(word.length).toBeGreaterThan(0);
      }
    }
  });

  it('has no duplicate words within a bank', () => {
    for (const bank of banks) {
      const keys = bank!.words.map((item) => comparisonKey(bankItemWord(item)));
      expect(new Set(keys).size).toBe(keys.length);
    }
  });

  it('has an example sentence for every plain-string word in every bank', () => {
    for (const bank of banks) {
      for (const item of bank!.words) {
        if (typeof item !== 'string') continue;
        expect(
          getSentenceBankEntry(item)?.exampleSentence,
          `expected a sentence-bank example sentence for "${item}" (Skill: ${bank!.skillId})`,
        ).toBeTruthy();
      }
    }
  });

  it('gives every meaning-dependent item a context sentence with exactly one blank', () => {
    for (const skillId of MEANING_DEPENDENT_SKILL_IDS) {
      const bank = SKILL_PRACTICE_BANKS[skillId as keyof typeof SKILL_PRACTICE_BANKS]!;
      for (const item of bank.words) {
        expect(
          typeof item,
          `expected "${bankItemWord(item)}" (Skill: ${skillId}) to be a context item`,
        ).not.toBe('string');
        if (typeof item === 'string') continue;
        expect(item.context.split('___').length - 1, `"${item.context}"`).toBe(1);
        expect(item.context).not.toContain(item.word);
      }
    }
  });

  it('does not require context metadata for ordinary (non-meaning-dependent) banks', () => {
    for (const [skillId, bank] of Object.entries(SKILL_PRACTICE_BANKS)) {
      if (MEANING_DEPENDENT_SKILL_IDS.includes(skillId)) continue;
      for (const item of bank!.words) {
        expect(
          typeof item,
          `expected plain word for "${bankItemWord(item)}" (Skill: ${skillId})`,
        ).toBe('string');
      }
    }
  });
});

describe('getSkillPracticeBank', () => {
  it('returns the bank for a piloted Skill', () => {
    expect(getSkillPracticeBank('short-a-words')?.words.length).toBeGreaterThan(0);
  });

  it('returns the bank for the meaning-dependent Skills', () => {
    expect(getSkillPracticeBank('homophones')?.words.length).toBeGreaterThan(0);
    expect(getSkillPracticeBank('commonly-confused-words')?.words.length).toBeGreaterThan(0);
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

  it('marks meaning-dependent items as context-required with a filled sentence and a blanked one', () => {
    const bank = getSkillPracticeBank('homophones')!;
    const playable = toPlayableSkillPracticeWords(bank);
    for (const word of playable) {
      expect(word.contextRequired).toBe(true);
      expect(word.exampleSentence, word.word).toBeTruthy();
      expect(word.exampleSentence).not.toContain('___');
      expect(word.contextSentence, word.word).toBeTruthy();
      expect(word.contextSentence).toContain('___');
    }
  });

  it('leaves ordinary items without context metadata', () => {
    const bank = getSkillPracticeBank('short-a-words')!;
    const playable = toPlayableSkillPracticeWords(bank);
    for (const word of playable) {
      expect(word.contextRequired).toBeUndefined();
      expect(word.contextSentence).toBeUndefined();
    }
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
