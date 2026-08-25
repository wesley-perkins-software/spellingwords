import type { SpellingListEntry } from './spellingLists';

type Category = SpellingListEntry['data']['category'];

export const categoryLabels: Record<Category, string> = {
  'high-frequency-words': 'High-Frequency Words',
  phonics: 'Phonics',
  'grade-level': 'Grade-Level',
  theme: 'Theme',
  seasonal: 'Seasonal',
};

/**
 * Display priority for grade-hub sections: grade-level is the primary,
 * most-searched family (see docs/GRADE_LEVEL_STRATEGY.md); others support it.
 */
export const categoryOrder = ['grade-level', 'high-frequency-words', 'phonics'] as const;
