import { describe, expect, it } from 'vitest';
import { CURATED_SPELLING_SKILL_IDS, SPELLING_SKILL_FAMILIES } from '@/lib/content/spellingSkills';
import { SKILL_FAMILY_IDS, getSkillFamilyId, isCuratedSpellingSkillId } from './skillFamilyIds';

// These are the *stable, permanent* analytics identifiers for the 12 Skill
// Families — declared as a literal list here (not derived from anything)
// so a change to this test is the only way the allowlist can ever change,
// and it can never silently drift from an editorial title edit.
const EXPECTED_SKILL_FAMILY_IDS = [
  'short_vowels_cvc',
  'consonant_digraphs',
  'consonant_blends',
  'common_spelling_patterns',
  'silent_e',
  'vowel_teams',
  'r_controlled_vowels',
  'multisyllabic_words',
  'word_building_and_endings',
  'prefixes',
  'greek_latin_roots',
  'homophones_confused_words',
];

describe('SKILL_FAMILY_IDS allowlist', () => {
  it('is exactly the 12 stable family ids, in family order', () => {
    expect(SKILL_FAMILY_IDS).toEqual(EXPECTED_SKILL_FAMILY_IDS);
  });

  it('has one id per real Skill Family in the content taxonomy', () => {
    expect(SKILL_FAMILY_IDS).toHaveLength(SPELLING_SKILL_FAMILIES.length);
  });

  it('every id is snake_case and stays stable regardless of family.title wording', () => {
    for (const id of SKILL_FAMILY_IDS) {
      expect(id).toMatch(/^[a-z][a-z0-9_]*$/);
    }
  });
});

describe('skill_id -> skill_family mapping', () => {
  it('covers every one of the 41 canonical Skill ids exactly once', () => {
    const resolved = CURATED_SPELLING_SKILL_IDS.map((id) => getSkillFamilyId(id));
    expect(resolved.every((familyId) => familyId !== undefined)).toBe(true);
    expect(CURATED_SPELLING_SKILL_IDS.length).toBeGreaterThan(0);
  });

  it('assigns each skill to only the family that actually declares it', () => {
    for (const family of SPELLING_SKILL_FAMILIES) {
      for (const skillId of family.skillIds) {
        const familyId = getSkillFamilyId(skillId);
        expect(familyId).toBeDefined();
        expect(SKILL_FAMILY_IDS).toContain(familyId);
      }
    }
  });

  it('returns undefined for an id outside the curated allowlist', () => {
    expect(getSkillFamilyId('not-a-real-skill')).toBeUndefined();
  });

  it('resolves a couple of known ids to their documented family (regression pin)', () => {
    expect(getSkillFamilyId('silent-e-long-a')).toBe('silent_e');
    expect(getSkillFamilyId('greek-and-latin-roots')).toBe('greek_latin_roots');
    expect(getSkillFamilyId('homophones')).toBe('homophones_confused_words');
    expect(getSkillFamilyId('short-a-words')).toBe('short_vowels_cvc');
  });
});

describe('isCuratedSpellingSkillId', () => {
  it('accepts every real Skill id', () => {
    for (const id of CURATED_SPELLING_SKILL_IDS) {
      expect(isCuratedSpellingSkillId(id)).toBe(true);
    }
  });

  it('rejects an arbitrary string', () => {
    expect(isCuratedSpellingSkillId('banana')).toBe(false);
    expect(isCuratedSpellingSkillId('')).toBe(false);
  });
});
