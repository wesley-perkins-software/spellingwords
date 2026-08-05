import { SKILLS_INDEX_PATH, getCanonicalSkillPathById } from './canonicalSkillRoutes';

export { SKILLS_INDEX_PATH };

export const SHORT_VOWELS_AND_CVC_SKILL_FAMILY = {
  title: 'Short Vowels',
  description: 'Practice short A, E, I, O, and U sounds.',
  guidance: 'Choose the vowel sound your child needs to practice.',
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
  description: 'Practice common two-letter consonant sounds.',
  guidance: 'Choose the letter pair your child needs to practice.',
  skillIds: [
    'digraph-ch-words',
    'digraph-sh-words',
    'digraph-th-words',
    'digraph-wh-words',
  ],
} as const;

export const CONSONANT_BLENDS_SKILL_FAMILY = {
  title: 'Consonant Blends',
  description: 'Practice adjacent consonants where both sounds are heard, at the beginning or end of a word.',
  guidance: 'Choose where the blend appears in the word.',
  skillIds: [
    'beginning-blends',
    'ending-blends',
  ],
} as const;

export const COMMON_SPELLING_PATTERNS_SKILL_FAMILY = {
  title: 'Common Spelling Patterns',
  description: 'Practice common single-syllable spelling conventions beyond basic vowels, blends, and digraphs.',
  guidance: 'Choose the spelling pattern your child needs to practice.',
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

/**
 * A small, independently-curated subset of one-syllable words from the
 * retired `silent-e-long-e` page, used only to keep the family guidance
 * sentence below concrete. Deliberately excludes multisyllabic examples
 * (e.g. "complete") since the pattern's one-syllable word bank being thin is
 * the reason Long E has no Skill page of its own (see
 * docs/architecture/SKILLS_ARCHITECTURE.md §5) — an example proving the
 * opposite would undercut the point.
 */
export const SILENT_E_LONG_E_EXAMPLES = ['eve', 'these', 'theme'] as const;

export const SILENT_E_SKILL_FAMILY = {
  title: 'Silent E',
  description: 'Practice long-vowel words with final silent e.',
  guidance:
    'Choose the vowel sound your child needs to practice. Long E Silent E is real but much less productive than A, I, O, or U: examples such as eve, these, and theme are covered here rather than as a separate Skill, while long E is more commonly spelled with patterns such as EE and EA.',
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
  description: 'Practice common vowel spellings for long vowels and other vowel sounds.',
  guidance: 'Choose the vowel sound or spelling pair your child needs to practice.',
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
  description: 'Practice vowel spellings that change when followed by the letter r.',
  guidance: 'Choose the r-controlled spelling your child needs to practice.',
  skillIds: [
    'r-controlled-ar',
    'r-controlled-or',
    'r-controlled-er-ir-ur',
  ],
} as const;

export const MULTISYLLABIC_WORDS_SKILL_FAMILY = {
  title: 'Multisyllabic Words',
  description: 'Practice spelling strategies for longer, multi-syllable words.',
  guidance:
    'A single practice destination covering longer-word spelling strategies, including open syllables and words ending in consonant-le.',
  skillIds: [
    'multisyllabic-words',
  ],
} as const;

export const WORD_BUILDING_AND_ENDINGS_SKILL_FAMILY = {
  title: 'Word Building and Endings',
  description: 'Practice inflectional endings, suffixes, compound words, and contractions.',
  guidance: 'Choose the word-building pattern your child needs to practice.',
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
  description: "Practice common prefixes that change a word's meaning.",
  guidance: 'Choose the prefix pattern your child needs to practice.',
  skillIds: [
    'un-and-re-prefixes',
    'common-prefixes',
  ],
} as const;

export const GREEK_AND_LATIN_ROOTS_SKILL_FAMILY = {
  title: 'Greek and Latin Roots',
  description: 'Practice upper-elementary roots and meaning-based word parts.',
  guidance: 'A single practice destination covering Greek and Latin roots across related words.',
  skillIds: [
    'greek-and-latin-roots',
  ],
} as const;

export const HOMOPHONES_AND_COMMONLY_CONFUSED_WORDS_SKILL_FAMILY = {
  title: 'Homophones and Commonly Confused Words',
  description:
    'Practice meaning-based spelling choices, where words sound alike or are otherwise easily confused in writing.',
  guidance: 'Choose homophones or commonly confused words to practice.',
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
