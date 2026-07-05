import type { SpellingListEntry } from './spellingLists';

type Category = SpellingListEntry['data']['category'];
type Difficulty = SpellingListEntry['data']['difficulty'];

export const categoryLabels: Record<Category, string> = {
  'sight-words': 'Sight Words',
  phonics: 'Phonics',
  'grade-level': 'Grade-Level',
  challenge: 'Challenge',
  theme: 'Theme',
  seasonal: 'Seasonal',
};

export const difficultyLabels: Record<Difficulty, string> = {
  beginner: 'Beginner',
  developing: 'Developing',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  challenge: 'Challenge',
};

export const categoryDescriptions: Record<Category, string> = {
  'sight-words':
    'High-frequency words students should recognize and spell automatically, drawn from graded tiers like the Dolch sight word lists.',
  phonics:
    'Lists organized around a single sound-spelling pattern, building from short vowels through silent-e and beyond.',
  'grade-level':
    'Words matched to what students are expected to read, write, and spell at a given grade.',
  challenge:
    'Advanced lists for spelling-bee prep and strong spellers, built around Greek and Latin roots and tricky patterns.',
  theme: 'Lists grouped around a shared topic or subject area.',
  seasonal: 'Lists tied to a particular time of year or holiday.',
};

/**
 * Display priority for grade-hub sections: grade-level is the primary,
 * most-searched family (see docs/GRADE_LEVEL_STRATEGY.md); others support it.
 */
export const categoryOrder = ['grade-level', 'sight-words', 'phonics', 'challenge'] as const;

/**
 * The list-detail template's card-family accent. Earlier revisions varied
 * this per category (blue/green/sun/berry), but that read as scattered
 * category tagging rather than a recognizable brand color — the category
 * itself is already named in the badge text. This is now a single constant:
 * brand blue is the one color every hero/word-list/FAQ card shares, so the
 * "same family" signal stays consistent across every page on the site.
 */
export const cardAccent = {
  bg: 'bg-brand-blue',
  border: 'border-brand-blue/40',
  glow: 'shadow-[0_4px_14px_-4px_rgba(47,111,237,0.55)]',
} as const;

/**
 * The site's one supporting accent color, reserved specifically for
 * "moving forward" in a learning progression (next-list direction). Paired
 * intentionally with brand blue rather than scattered decoratively — see
 * the progression path in the list-detail template.
 */
export const journeyForwardAccent = {
  bg: 'bg-chip-sun',
  line: 'from-chip-sun/60',
} as const;
