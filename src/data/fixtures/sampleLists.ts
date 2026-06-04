import type { WordList } from '@/types/spelling';

export const grade2Essentials: WordList = {
  id: 'grade-2-essentials',
  slug: 'grade-2-essentials',
  title: 'Grade 2 Essentials',
  description: 'Core vocabulary words for second-grade spellers.',
  category: 'General',
  grade: '2',
  tags: ['grade-2', 'essentials', 'elementary'],
  sourceType: 'curated',
  relatedLists: ['sight-words', 'long-vowel-patterns'],
  words: [
    { word: 'friend' },
    { word: 'because' },
    { word: 'different' },
    { word: 'people' },
    { word: 'every' },
    { word: 'school' },
    { word: 'always' },
    { word: 'again' },
    { word: 'should' },
    { word: 'where' },
  ],
};

export const longVowelPatterns: WordList = {
  id: 'long-vowel-patterns',
  slug: 'long-vowel-patterns',
  title: 'Long Vowel Patterns',
  description: 'Words grouped by long vowel phonics patterns including silent-e and vowel digraphs.',
  category: 'Phonics',
  grade: '2',
  tags: ['phonics', 'long-vowels', 'patterns'],
  sourceType: 'curated',
  relatedLists: ['grade-2-essentials'],
  words: [
    { word: 'light', phonicsPattern: ['-ight'] },
    { word: 'sight', phonicsPattern: ['-ight'] },
    { word: 'bright', phonicsPattern: ['-ight'] },
    { word: 'brave', phonicsPattern: ['silent-e', 'long-a'] },
    { word: 'cake', phonicsPattern: ['silent-e', 'long-a'] },
    { word: 'stone', phonicsPattern: ['silent-e', 'long-o'] },
    { word: 'ride', phonicsPattern: ['silent-e', 'long-i'] },
    { word: 'cute', phonicsPattern: ['silent-e', 'long-u'] },
  ],
};

export const sightWords: WordList = {
  id: 'sight-words',
  slug: 'sight-words',
  title: 'Sight Words',
  description: 'High-frequency words students should recognize and spell on sight.',
  category: 'Sight Words',
  grade: '2',
  tags: ['sight-words', 'high-frequency', 'dolch'],
  sourceType: 'curated',
  relatedLists: ['grade-2-essentials'],
  words: [
    {
      word: 'their',
      hint: 'belonging to them',
      exampleSentence: 'The students put their books away.',
    },
    {
      word: 'where',
      hint: 'a place or location',
      exampleSentence: 'Where did you put your backpack?',
    },
    {
      word: 'which',
      hint: 'used to ask about a choice',
      exampleSentence: 'Which pencil is yours?',
    },
    {
      word: 'would',
      hint: 'past tense of "will"',
      exampleSentence: 'She said she would help us.',
    },
    {
      word: 'could',
      hint: 'was able to',
      exampleSentence: 'He could spell every word correctly.',
    },
    {
      word: 'should',
      hint: 'the right thing to do',
      exampleSentence: 'You should study your spelling words.',
    },
    {
      word: 'through',
      hint: 'from one side to the other',
      exampleSentence: 'She walked through the door.',
    },
  ],
};

export const petNames: WordList = {
  id: 'pet-names',
  slug: 'pet-names',
  title: 'Our Pets',
  description: 'A custom list of our family pets — proper names and nicknames.',
  category: 'Custom',
  tags: ['custom', 'names', 'pets'],
  sourceType: 'custom',
  relatedLists: [],
  words: [
    { word: 'cotton' },
    { word: 'cooper' },
    { word: 'freddy' },
    { word: 'binx' },
    { word: 'melinda' },
  ],
};

export const allSampleLists: WordList[] = [
  grade2Essentials,
  longVowelPatterns,
  sightWords,
  petNames,
];
