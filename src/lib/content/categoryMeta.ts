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

export const categoryOrder = [
  'sight-words',
  'phonics',
  'grade-level',
  'challenge',
] as const;
