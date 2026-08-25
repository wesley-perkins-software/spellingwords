import { SKILLS_INDEX_PATH, getCanonicalSkillPathById } from './canonicalSkillRoutes';

export { SKILLS_INDEX_PATH };

export const SHORT_VOWELS_AND_CVC_SKILL_FAMILY = {
  title: 'Short Vowels',
  description: 'Find focused practice for each of the five short vowel sounds.',
  guidance: 'The Skill titles make it easy to go straight to short A, E, I, O, or U.',
  skillIds: [
    'short-a-words',
    'short-e-words',
    'short-i-words',
    'short-o-words',
    'short-u-words',
  ],
} as const;

export const CONSONANT_DIGRAPHS_SKILL_FAMILY = {
  title: 'Consonant Digraphs',
  description: 'This family brings together the common SH, CH, TH, and WH consonant digraphs.',
  guidance: 'Each destination focuses on one two-letter spelling.',
  skillIds: [
    'digraph-ch-words',
    'digraph-sh-words',
    'digraph-th-words',
    'digraph-wh-words',
  ],
} as const;

export const CONSONANT_BLENDS_SKILL_FAMILY = {
  title: 'Consonant Blends',
  description:
    'Consonant blends can appear at either edge of a word while both consonant sounds remain present.',
  guidance: 'Use Beginning Blends or Ending Blends according to where the blend appears.',
  skillIds: [
    'beginning-blends',
    'ending-blends',
  ],
} as const;

export const COMMON_SPELLING_PATTERNS_SKILL_FAMILY = {
  title: 'Common Spelling Patterns',
  description: 'Find frequently used conventions that do not belong to one vowel or consonant family.',
  guidance: 'The choices cover CK/TCH/DGE endings, silent letters, and soft C and G.',
  skillIds: [
    'ck-tch-dge-word-endings',
    'silent-letters',
    'soft-c-soft-g',
  ],
} as const;

/**
 * Stable anchor id for the Silent E family section on the Skills Hub
 * (`/skills`). Declared explicitly, rather than computed from `family.title`
 * at render time, so it can't drift silently if the title copy ever changes.
 */
export const SILENT_E_FAMILY_ANCHOR_ID = 'silent-e-family';

/**
 * Canonical destination for the retired `silent-e-long-e` Skill page's
 * content — folded into this family anchor. Derived from
 * `SILENT_E_FAMILY_ANCHOR_ID` so the two can't drift apart.
 */
export const SILENT_E_FAMILY_URL = `${SKILLS_INDEX_PATH}#${SILENT_E_FAMILY_ANCHOR_ID}`;

export const SILENT_E_SKILL_FAMILY = {
  title: 'Silent E',
  description: 'These Skills focus on final silent e spellings for long vowel sounds.',
  guidance: 'Choose the long A, I, O, or U destination that matches the concept you are looking for.',
  anchorId: SILENT_E_FAMILY_ANCHOR_ID,
  skillIds: [
    'silent-e-long-a',
    'silent-e-long-i',
    'silent-e-long-o',
    'silent-e-long-u',
  ],
} as const;

export const VOWEL_TEAMS_SKILL_FAMILY = {
  title: 'Vowel Teams',
  description: 'Explore common vowel-letter combinations for long vowels and other vowel sounds.',
  guidance: 'Each Skill title identifies the spelling pair or vowel sound it covers.',
  skillIds: [
    'vowel-teams-ai-ay',
    'vowel-teams-ee-ea',
    'vowel-teams-oa-ow',
    'oi-and-oy-words',
    'ou-and-ow-words',
    'ie-and-igh-words',
    'oo-words',
    'au-and-aw-words',
  ],
} as const;

export const R_CONTROLLED_VOWELS_SKILL_FAMILY = {
  title: 'R-Controlled Vowels',
  description: 'This family gathers vowel spellings whose sound is shaped by a following r.',
  guidance: 'Go to AR, OR, or the combined ER/IR/UR Skill.',
  skillIds: [
    'r-controlled-ar',
    'r-controlled-or',
    'r-controlled-er-ir-ur',
  ],
} as const;

export const MULTISYLLABIC_WORDS_SKILL_FAMILY = {
  title: 'Multisyllabic Words',
  description: 'Use this destination when longer words and their syllable structure are the focus.',
  guidance: 'The family leads to one comprehensive Multisyllabic Words Skill.',
  skillIds: [
    'multisyllabic-words',
  ],
} as const;

export const WORD_BUILDING_AND_ENDINGS_SKILL_FAMILY = {
  title: 'Word Building and Endings',
  description:
    'These Skills cover ways that words change or combine through endings and word parts.',
  guidance: 'Browse plurals, -ed and -ing, suffixes, compound words, or contractions.',
  skillIds: [
    'plurals',
    'ed-and-ing',
    'common-suffixes',
    'suffix-spelling-changes',
    'compound-words',
    'contractions',
  ],
} as const;

export const PREFIXES_SKILL_FAMILY = {
  title: 'Prefixes',
  description: 'Prefixes attach at the beginning of words or roots and contribute meaning.',
  guidance: 'Choose the focused UN and RE Skill or the wider Common Prefixes collection.',
  skillIds: [
    'un-and-re-prefixes',
    'common-prefixes',
  ],
} as const;

export const GREEK_AND_LATIN_ROOTS_SKILL_FAMILY = {
  title: 'Greek and Latin Roots',
  description:
    'This family is for meaning-bearing Greek and Latin word parts found across related words.',
  guidance: 'One Skill brings the root collection together.',
  skillIds: [
    'greek-and-latin-roots',
  ],
} as const;

export const HOMOPHONES_AND_COMMONLY_CONFUSED_WORDS_SKILL_FAMILY = {
  title: 'Homophones and Commonly Confused Words',
  description:
    'Use this family when the intended meaning determines which easily confused spelling is correct.',
  guidance:
    'Choose Homophones for words that sound alike, or Commonly Confused Words for the broader set.',
  skillIds: [
    'homophones',
    'commonly-confused-words',
  ],
} as const;

export const SPELLING_SKILL_FAMILIES = [
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
] as const;

export const CURATED_SPELLING_SKILL_IDS = SPELLING_SKILL_FAMILIES.flatMap(
  (family) => family.skillIds,
);

export type CuratedSpellingSkillId = (typeof CURATED_SPELLING_SKILL_IDS)[number];

export function isCuratedSpellingSkillId(id: string): id is CuratedSpellingSkillId {
  return (CURATED_SPELLING_SKILL_IDS as readonly string[]).includes(id);
}

export function getSpellingSkillPath(entry: { data: { id: string } }): string {
  const path = getCanonicalSkillPathById(entry.data.id);
  if (!path) {
    throw new Error(`No canonical Skill path for "${entry.data.id}" — expected every entry here to be a canonical Skill.`);
  }
  return path;
}

export function resolveCuratedSkillFamilyEntries<T extends { data: { id: string } }>(
  entries: T[],
  skillIds: readonly string[],
): T[] {
  const byId = new Map(entries.map((entry) => [entry.data.id, entry]));

  return skillIds.map((id) => {
    const entry = byId.get(id);
    if (!entry) throw new Error(`Missing curated spelling Skill: ${id}`);
    return entry;
  });
}
