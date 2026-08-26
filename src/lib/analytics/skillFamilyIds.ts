import {
  SHORT_VOWELS_AND_CVC_SKILL_FAMILY,
  CONSONANT_DIGRAPHS_SKILL_FAMILY,
  CONSONANT_BLENDS_SKILL_FAMILY,
  COMMON_SPELLING_PATTERNS_SKILL_FAMILY,
  SILENT_E_SKILL_FAMILY,
  VOWEL_TEAMS_SKILL_FAMILY,
  R_CONTROLLED_VOWELS_SKILL_FAMILY,
  MULTISYLLABIC_WORDS_SKILL_FAMILY,
  WORD_BUILDING_AND_ENDINGS_SKILL_FAMILY,
  PREFIXES_SKILL_FAMILY,
  GREEK_AND_LATIN_ROOTS_SKILL_FAMILY,
  HOMOPHONES_AND_COMMONLY_CONFUSED_WORDS_SKILL_FAMILY,
  CURATED_SPELLING_SKILL_IDS,
  type CuratedSpellingSkillId,
} from '@/lib/content/spellingSkills';

/**
 * Stable analytics identifiers for the 12 Skill Families, one explicit
 * literal per family. These are permanent telemetry values — never derive
 * them from `family.title` (editorial copy that can change) or any other
 * display string, or a future title edit would silently rewrite historical
 * GA4 dimension values.
 */
export type SkillFamilyId =
  | 'short_vowels_cvc'
  | 'consonant_digraphs'
  | 'consonant_blends'
  | 'common_spelling_patterns'
  | 'silent_e'
  | 'vowel_teams'
  | 'r_controlled_vowels'
  | 'multisyllabic_words'
  | 'word_building_and_endings'
  | 'prefixes'
  | 'greek_latin_roots'
  | 'homophones_confused_words';

export const SKILL_FAMILY_IDS: readonly SkillFamilyId[] = [
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

// Family *membership* (which skillIds belong to which family) is still read
// from the real content taxonomy (`skillIds` on each family constant) so it
// can never drift from `src/lib/content/spellingSkills.ts` — only the
// analytics id string attached to each family is our own fixed literal.
const FAMILY_ID_BY_SOURCE_FAMILY: readonly [
  { readonly skillIds: readonly string[] },
  SkillFamilyId,
][] = [
  [SHORT_VOWELS_AND_CVC_SKILL_FAMILY, 'short_vowels_cvc'],
  [CONSONANT_DIGRAPHS_SKILL_FAMILY, 'consonant_digraphs'],
  [CONSONANT_BLENDS_SKILL_FAMILY, 'consonant_blends'],
  [COMMON_SPELLING_PATTERNS_SKILL_FAMILY, 'common_spelling_patterns'],
  [SILENT_E_SKILL_FAMILY, 'silent_e'],
  [VOWEL_TEAMS_SKILL_FAMILY, 'vowel_teams'],
  [R_CONTROLLED_VOWELS_SKILL_FAMILY, 'r_controlled_vowels'],
  [MULTISYLLABIC_WORDS_SKILL_FAMILY, 'multisyllabic_words'],
  [WORD_BUILDING_AND_ENDINGS_SKILL_FAMILY, 'word_building_and_endings'],
  [PREFIXES_SKILL_FAMILY, 'prefixes'],
  [GREEK_AND_LATIN_ROOTS_SKILL_FAMILY, 'greek_latin_roots'],
  [HOMOPHONES_AND_COMMONLY_CONFUSED_WORDS_SKILL_FAMILY, 'homophones_confused_words'],
];

const SKILL_ID_TO_FAMILY_ID: ReadonlyMap<string, SkillFamilyId> = new Map(
  FAMILY_ID_BY_SOURCE_FAMILY.flatMap(([family, familyId]) =>
    family.skillIds.map((skillId): [string, SkillFamilyId] => [skillId, familyId]),
  ),
);

export function isCuratedSpellingSkillId(value: string): value is CuratedSpellingSkillId {
  return (CURATED_SPELLING_SKILL_IDS as readonly string[]).includes(value);
}

/** Resolves the stable analytics family id for a canonical Skill id, or `undefined` if unknown. */
export function getSkillFamilyId(skillId: string): SkillFamilyId | undefined {
  return SKILL_ID_TO_FAMILY_ID.get(skillId);
}
