import type { WordList } from '@/types/spelling';

export const sampleLists: WordList[] = [
  {
    id: 'list-001',
    slug: 'elementary-grade-3',
    title: 'Grade 3 Essentials',
    description: 'Core spelling words for third-grade readers building fluency.',
    category: 'general',
    grade: '3rd Grade',
    tags: ['elementary', 'grade-3', 'curated'],
    sourceType: 'curated',
    relatedLists: ['phonics-short-vowels'],
    words: [
      { word: 'because' },
      { word: 'different' },
      { word: 'through' },
      { word: 'between' },
      { word: 'important' },
      { word: 'children' },
      { word: 'example' },
      { word: 'together' },
    ],
  },

  {
    id: 'list-002',
    slug: 'phonics-short-vowels',
    title: 'Short Vowel Patterns',
    description: 'Words that demonstrate CVC and CCVC short-vowel phonics patterns.',
    category: 'phonics',
    grade: '2nd Grade',
    tags: ['phonics', 'short-vowels', 'curated'],
    sourceType: 'curated',
    relatedLists: ['elementary-grade-3'],
    words: [
      { word: 'snap', phonicsPattern: ['CVC', 'blend-sn'] },
      { word: 'clap', phonicsPattern: ['CVC', 'blend-cl'] },
      { word: 'frog', phonicsPattern: ['CCVC', 'blend-fr'] },
      { word: 'slim', phonicsPattern: ['CCVC', 'blend-sl'] },
      { word: 'trip', phonicsPattern: ['CCVC', 'blend-tr'] },
      { word: 'drip', phonicsPattern: ['CCVC', 'blend-dr'] },
    ],
  },

  {
    id: 'list-003',
    slug: 'sight-words-dolch',
    title: 'Dolch Sight Words',
    description: 'High-frequency words that readers should recognize on sight.',
    category: 'sight-words',
    grade: '1st Grade',
    tags: ['sight-words', 'dolch', 'high-frequency', 'curated'],
    sourceType: 'curated',
    relatedLists: [],
    words: [
      {
        word: 'always',
        hint: 'Think: "all ways" — every single way, every time.',
        exampleSentence: 'She always brushes her teeth before bed.',
      },
      {
        word: 'would',
        hint: 'Rhymes with "could" and "should" — the silent L family.',
        exampleSentence: 'He said he would help carry the boxes.',
      },
      {
        word: 'people',
        hint: 'The "eo" makes a long-E sound — unusual but common.',
        exampleSentence: 'Many people gathered in the park that afternoon.',
      },
      {
        word: 'their',
        hint: "Contains \"heir\" — they own it, so it's theirs.",
        exampleSentence: 'The students put their backpacks by the door.',
      },
      {
        word: 'where',
        hint: 'Like "here" with a W in front — asking about a place.',
        exampleSentence: 'Do you know where the library is?',
      },
    ],
  },

  {
    id: 'list-004',
    slug: 'custom-names',
    title: 'Custom Names List',
    description: 'A personal word list including custom proper nouns and non-standard vocabulary.',
    category: 'custom',
    tags: ['custom', 'names'],
    sourceType: 'custom',
    relatedLists: [],
    words: [
      { word: 'cotton' },
      { word: 'cooper' },
      { word: 'freddy' },
      { word: 'binx' },
      { word: 'melinda' },
    ],
  },
];

export const featuredWord = sampleLists[2].words[0];
export const featuredList = sampleLists[2];
