import type { GradeCode } from './gradeConfig';

/**
 * Approved and frozen K–5 High-Frequency Words curriculum.
 *
 * Frequency determines eligibility for this strand. Spelling complexity and
 * developmental appropriateness determine the grade of spelling ownership.
 * Core Spelling and Themed Spelling Practice may overlap when a word
 * independently belongs in both strands. HFW ownership itself remains unique.
 */
export const FROZEN_HF_WORDS_CURRICULUM = {
  'K': [
    {
      id: 'kindergarten-high-frequency-words-set-1',
      setNumber: 1,
      words: ['a', 'I', 'am', 'at', 'can', 'in', 'it', 'is', 'and', 'the'],
    },
    {
      id: 'kindergarten-high-frequency-words-set-2',
      setNumber: 2,
      words: ['he', 'we', 'me', 'my', 'go', 'to', 'you', 'be', 'on', 'not'],
    },
    {
      id: 'kindergarten-high-frequency-words-set-3',
      setNumber: 3,
      words: ['she', 'do', 'like', 'for', 'was', 'are', 'see', 'this', 'that', 'here'],
    },
    {
      id: 'kindergarten-high-frequency-words-set-4',
      setNumber: 4,
      words: ['come', 'look', 'with', 'two', 'play', 'old', 'big', 'yes', 'let', 'got'],
    },
  ],
  '1': [
    {
      id: 'grade-1-high-frequency-words-set-1',
      setNumber: 1,
      words: ['of', 'said', 'have', 'they', 'one', 'all', 'after', 'an', 'what', 'down', 'or', 'but'],
    },
    {
      id: 'grade-1-high-frequency-words-set-2',
      setNumber: 2,
      words: ['as', 'when', 'back', 'just', 'did', 'if', 'who', 'over', 'us', 'no', 'ask', 'has'],
    },
    {
      id: 'grade-1-high-frequency-words-set-3',
      setNumber: 3,
      words: ['why', 'into', 'make', 'get', 'by', 'his', 'how', 'about', 'good', 'her', 'home', 'very'],
    },
    {
      id: 'grade-1-high-frequency-words-set-4',
      setNumber: 4,
      words: ['new', 'him', 'where', 'way', 'now', 'from', 'them', 'your', 'time', 'our', 'give', 'will'],
    },
    {
      id: 'grade-1-high-frequency-words-set-5',
      setNumber: 5,
      words: ['out', 'up', 'were', 'next', 'want', 'had', 'so', 'some', 'then', 'day', 'find', 'well'],
    },
    {
      id: 'grade-1-high-frequency-words-set-6',
      setNumber: 6,
      words: ['more', 'put', 'love', 'than', 'may', 'help', 'most', 'long', 'last', 'still', 'need', 'name'],
    },
    {
      id: 'grade-1-high-frequency-words-set-7',
      setNumber: 7,
      words: ['place', 'part', 'life', 'end', 'left', 'thing', 'hard', 'keep', 'room', 'man', 'top', 'oh'],
    },
  ],
  '2': [
    {
      id: 'grade-2-high-frequency-words-set-1',
      setNumber: 1,
      words: ['again', 'any', 'many', 'could', 'there', 'every', 'people', 'know', 'their', 'first', 'would', 'going'],
    },
    {
      id: 'grade-2-high-frequency-words-set-2',
      setNumber: 2,
      words: ['should', 'because', 'little', 'around', 'been', 'does', 'school', 'book', 'best', 'both', 'which', 'these'],
    },
    {
      id: 'grade-2-high-frequency-words-set-3',
      setNumber: 3,
      words: ['before', 'goes', 'gave', 'word', 'story', 'great', 'those', 'its', 'between', 'under', 'made', 'found'],
    },
    {
      id: 'grade-2-high-frequency-words-set-4',
      setNumber: 4,
      words: ['answer', 'someone', 'large', 'small', 'own', 'off', 'until', 'almost', 'told', 'began', 'learn', 'never'],
    },
    {
      id: 'grade-2-high-frequency-words-set-5',
      setNumber: 5,
      words: ['young', 'kind', 'high', 'light', 'only', 'other', 'together', 'took', 'came', 'say', 'tell', 'three'],
    },
    {
      id: 'grade-2-high-frequency-words-set-6',
      setNumber: 6,
      words: ['away', 'right', 'must', 'use', 'work', 'went', 'done', 'think', 'take', 'too', 'much', 'each'],
    },
    {
      id: 'grade-2-high-frequency-words-set-7',
      setNumber: 7,
      words: ['same', 'read', 'night', 'water', 'year', 'few', 'show', 'free', 'house', 'set', 'white', 'live'],
    },
  ],
  '3': [
    {
      id: 'grade-3-high-frequency-words-set-1',
      setNumber: 1,
      words: ['always', 'friend', 'family', 'another', 'children', 'everyone', 'different', 'question', 'something', 'enough', 'without', 'through'],
    },
    {
      id: 'grade-3-high-frequency-words-set-2',
      setNumber: 2,
      words: ['thought', 'often', 'across', 'brought', 'subject', 'already', 'above', 'also', 'below', 'caught', 'better', 'toward'],
    },
    {
      id: 'grade-3-high-frequency-words-set-3',
      setNumber: 3,
      words: ['practice', 'early', 'against', 'built', 'even', 'able', 'heard', 'difficult', 'ever', 'become', 'especially', 'later'],
    },
    {
      id: 'grade-3-high-frequency-words-set-4',
      setNumber: 4,
      words: ['world', 'believe', 'finally', 'might', 'sometimes', 'follow', 'probably', 'nothing', 'usually', 'really', 'actually', 'once'],
    },
    {
      id: 'grade-3-high-frequency-words-set-5',
      setNumber: 5,
      words: ['remember', 'instead', 'while', 'weather', 'study', 'certain', 'during', 'such', 'money', 'I\'m', 'it\'s', 'don\'t'],
    },
  ],
  '4': [
    {
      id: 'grade-4-high-frequency-words-set-1',
      setNumber: 1,
      words: ['important', 'example', 'understand', 'happened', 'straight', 'possible', 'idea', 'among', 'known', 'general', 'quite', 'several'],
    },
    {
      id: 'grade-4-high-frequency-words-set-2',
      setNumber: 2,
      words: ['since', 'whether', 'include', 'sure', 'though', 'within', 'whole', 'written', 'common', 'reason', 'course', 'however'],
    },
  ],
  '5': [
    {
      id: 'grade-5-high-frequency-words-set-1',
      setNumber: 1,
      words: ['government', 'although', 'business', 'language', 'information', 'special', 'attention', 'control', 'beautiful', 'increase', 'future', 'interest'],
    },
    {
      id: 'grade-5-high-frequency-words-set-2',
      setNumber: 2,
      words: ['process', 'piece', 'provide', 'present', 'action', 'problem', 'company', 'effect', 'suddenly', 'suppose', 'natural', 'experience'],
    },
  ],
} as const satisfies Record<GradeCode, readonly { id: string; setNumber: number; words: readonly string[] }[]>;

export const HF_WORDS_SET_IDS_BY_GRADE = Object.fromEntries(
  Object.entries(FROZEN_HF_WORDS_CURRICULUM).map(([grade, sets]) => [
    grade,
    sets.map((set) => set.id),
  ]),
) as Record<GradeCode, readonly string[]>;

export const HF_WORDS_TOTAL_SET_COUNT = Object.values(FROZEN_HF_WORDS_CURRICULUM).flat().length;
export const HF_WORDS_TOTAL_WORD_COUNT = Object.values(FROZEN_HF_WORDS_CURRICULUM)
  .flat()
  .reduce((total, set) => total + set.words.length, 0);
