export interface LearningPath {
  id: string;
  title: string;
  description: string;
  listIds: readonly string[];
}

export const LEARNING_PATHS: readonly LearningPath[] = [
  {
    id: 'dolch-sight-words',
    title: 'Dolch Sight Word Path',
    description: 'The classic K–3 sight word sequence, from the most common words a child encounters to the full first-grade reading vocabulary.',
    listIds: ['dolch-pre-primer', 'dolch-primer', 'dolch-first-grade', 'dolch-second-grade', 'dolch-third-grade'],
  },
  {
    id: 'phonics-patterns',
    title: 'Phonics Patterns Path',
    description: 'A step-by-step phonics sequence: short vowels, silent-e long vowels, vowel-team digraphs, and r-controlled vowels.',
    listIds: ['short-vowels-cvc-words', 'silent-e-long-a', 'silent-e-long-i', 'silent-e-long-o', 'vowel-teams-ai-ay', 'vowel-teams-ee-ea', 'vowel-teams-oa-ow', 'vowel-teams-oi-oy', 'vowel-teams-ou-ow', 'r-controlled-ar'],
  },
] as const;

/** Returns the path (if any) that a list belongs to, by list id. */
export function getListPath(listId: string): LearningPath | undefined {
  return LEARNING_PATHS.find((path) => (path.listIds as readonly string[]).includes(listId));
}

/** Returns the position of a list within its path (1-based), or undefined if not on a path. */
export function getListPathPosition(listId: string): number | undefined {
  for (const path of LEARNING_PATHS) {
    const idx = (path.listIds as readonly string[]).indexOf(listId);
    if (idx !== -1) return idx + 1;
  }
  return undefined;
}
