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
 * Per-category accent color for list-detail pages (hero badge, word-list
 * card, FAQ card). Reuses the same chip/brand tokens and glow shadows as
 * CategoryChip's variant map — no new colors, just a consistent category
 * identity applied beyond the homepage's browse cards.
 */
export const categoryAccent: Record<Category, { bg: string; border: string; glow: string }> = {
  'grade-level': {
    bg: 'bg-brand-blue',
    border: 'border-brand-blue/40',
    glow: 'shadow-[0_4px_14px_-4px_rgba(47,111,237,0.55)]',
  },
  phonics: {
    bg: 'bg-chip-grass',
    border: 'border-chip-grass/40',
    glow: 'shadow-[0_4px_14px_-4px_rgba(76,175,109,0.55)]',
  },
  'sight-words': {
    bg: 'bg-chip-sun',
    border: 'border-chip-sun/40',
    glow: 'shadow-[0_4px_14px_-4px_rgba(255,179,71,0.55)]',
  },
  challenge: {
    bg: 'bg-chip-berry',
    border: 'border-chip-berry/40',
    glow: 'shadow-[0_4px_14px_-4px_rgba(239,93,168,0.55)]',
  },
  theme: {
    bg: 'bg-chip-sky',
    border: 'border-chip-sky/40',
    glow: 'shadow-[0_4px_14px_-4px_rgba(63,182,232,0.55)]',
  },
  seasonal: {
    bg: 'bg-chip-sky',
    border: 'border-chip-sky/40',
    glow: 'shadow-[0_4px_14px_-4px_rgba(63,182,232,0.55)]',
  },
};
