import type { GradeRouteClassification } from './canonicalGradeRoutes';
import type { GradeCode } from './gradeConfig';

export const CROSS_GRADE_STRAND_PATHS = {
  'core-spelling': '/core-spelling',
  'high-frequency-words': '/high-frequency-words',
  'themed-spelling-practice': '/themed-spelling-practice',
} as const satisfies Record<GradeRouteClassification, string>;

export type CrossGradeStrandCopy = {
  title: string;
  description: string;
  eyebrow: string;
  intro: readonly string[];
  gradeSummaries: Record<GradeCode, string>;
  coreRepresentativeIds?: Record<GradeCode, readonly [string, string, string]>;
};

/** Cross-grade synthesis copy; intentionally distinct from the Grade Hub preview blocks. */
export const crossGradeStrandCopy: Record<GradeRouteClassification, CrossGradeStrandCopy> = {
  'core-spelling': {
    title: 'K–5 Core Spelling Curriculum',
    description:
      'See how the systematic Core Spelling curriculum develops from sound-letter foundations in Kindergarten to integrated academic spelling in 5th Grade.',
    eyebrow: 'The systematic path',
    intro: [
      'Core Spelling is the main, ordered spelling path for each grade. Across K–5, students move from connecting sounds and letters to using vowel patterns, syllables, meaningful word parts, and word relationships together.',
      'This overview shows the developmental arc without repeating every unit. Choose a grade to see its complete sequence and where to begin.',
    ],
    gradeSummaries: {
      K: 'Connect spoken sounds with letters, establish short-vowel spelling, and begin combining those foundations in simple words.',
      '1': 'Consolidate one-syllable spelling, then extend it through consonant patterns, long vowels, common endings, and early r-controlled vowels.',
      '2': 'Broaden the vowel system and use syllable structure, consonant choices, silent letters, and word building to spell longer words.',
      '3': 'Bridge from phonics-heavy work into morphology through prefixes, suffixes, spelling changes, longer words, and meaning distinctions.',
      '4': 'Use advanced affixes, Latin roots, syllable knowledge, and derived-word relationships to manage longer academic spellings.',
      '5': 'Integrate roots, affixes, syllables, spelling changes, and meaning-based choices for upper-elementary academic vocabulary.',
    },
    coreRepresentativeIds: {
      K: [
        'kindergarten-short-i-words',
        'kindergarten-short-e-words',
        'kindergarten-consonant-digraphs',
      ],
      '1': [
        'grade-1-consonant-digraphs-final-ck',
        'grade-1-long-a-long-o-vowel-teams',
        'grade-1-tch-dge-ending-rules',
      ],
      '2': ['grade-2-long-e-ee-ea', 'grade-2-soft-c-soft-g', 'grade-2-final-stable-le'],
      '3': ['grade-3-suffix-words', 'grade-3-possessives', 'grade-3-homophones'],
      '4': [
        'grade-4-advanced-suffixes',
        'grade-4-commonly-confused-words',
        'grade-4-derived-words',
      ],
      '5': [
        'grade-5-prefix-suffix-words',
        'grade-5-commonly-confused-words',
        'grade-5-spelling-changes-related-words',
      ],
    },
  },
  'high-frequency-words': {
    title: 'High-Frequency Words by Grade',
    description:
      'Understand how 316 High-Frequency Words are organized into 27 cumulative spelling sets from Kindergarten through 5th Grade.',
    eyebrow: '27 sets · 316 words',
    intro: [
      'High-Frequency Words are words students encounter often in reading and writing. “High-frequency” describes use, not spelling regularity: some words follow familiar patterns, while others contain details that need closer attention.',
      'The sets provide focused practice alongside Core Spelling. They build cumulatively within each grade, but they do not match Core units one for one.',
    ],
    gradeSummaries: {
      K: 'Begin with short, frequently needed words that support children’s earliest reading and sentence writing.',
      '1': 'Expand the working spelling vocabulary across seven manageable sets as reading and writing become more independent.',
      '2': 'Practice a broad collection of frequently used words, including longer forms and varied vowel and consonant spellings.',
      '3': 'Strengthen accurate retrieval of longer everyday and school words used in increasingly sustained writing.',
      '4': 'Focus on a smaller, deliberate collection of frequently used words that still merit attention in upper-elementary writing.',
      '5': 'Consolidate frequently used academic and general-purpose spellings important for independent writing across subjects.',
    },
  },
  'themed-spelling-practice': {
    title: 'Themed Spelling Practice by Grade',
    description:
      'Browse all 27 optional K–5 themed spelling lists by grade, from early familiar topics to upper-elementary school subjects.',
    eyebrow: 'Optional additional practice',
    intro: [
      'Themed Spelling Practice offers optional, nonsequential word lists organized around recognizable school and everyday topics. These lists provide additional spelling practice; they are not part of the required Core sequence.',
      'Choose the student’s grade, then select any useful or interesting topic. Each grade page explains the available lists and links to practice.',
    ],
    gradeSummaries: {
      K: 'Familiar people, things, and early concepts make the first themed choices easy to recognize.',
      '1': 'Everyday topics and calendar language extend practice beyond the systematic Core sequence.',
      '2': 'Practical community, number, money, transportation, and calendar topics provide varied contexts.',
      '3': 'School subjects become more prominent through geography, science, time, and multiplication and division.',
      '4': 'Measurement, geometry, careers, and the solar system provide upper-elementary topic choices.',
      '5': 'Money, ecosystems, fractions and decimals, and civics connect practice with later elementary subjects.',
    },
  },
};

/** All 27 approved topic labels, kept editorial rather than derived by stripping titles. */
export const themedTopicLabels: Record<GradeCode, readonly { id: string; label: string }[]> = {
  K: [
    { id: 'kindergarten-animal-words', label: 'Animals' },
    { id: 'kindergarten-body-words', label: 'Body' },
    { id: 'kindergarten-number-words', label: 'Numbers' },
    { id: 'kindergarten-color-words', label: 'Colors' },
    { id: 'kindergarten-family-words', label: 'Family' },
  ],
  '1': [
    { id: 'grade-1-weather-words', label: 'Weather' },
    { id: 'grade-1-clothing-words', label: 'Clothing' },
    { id: 'grade-1-shape-words', label: 'Shapes' },
    { id: 'grade-1-number-words-11-20', label: 'Number Words 11–20' },
    { id: 'grade-1-days-of-the-week', label: 'Days of the Week' },
  ],
  '2': [
    { id: 'grade-2-transportation-words', label: 'Transportation' },
    { id: 'grade-2-money-words', label: 'Money' },
    { id: 'grade-2-number-words-20-100', label: 'Number Words 20–100' },
    { id: 'grade-2-community-helpers', label: 'Community Helpers' },
    { id: 'grade-2-months-of-the-year', label: 'Months of the Year' },
  ],
  '3': [
    { id: 'grade-3-map-globe-words', label: 'Maps & Globes' },
    { id: 'grade-3-life-cycle-words', label: 'Life Cycles' },
    { id: 'grade-3-time-words', label: 'Time' },
    {
      id: 'grade-3-multiplication-division-words',
      label: 'Multiplication & Division',
    },
  ],
  '4': [
    { id: 'grade-4-measurement-words', label: 'Measurement' },
    { id: 'grade-4-solar-system-words', label: 'Solar System' },
    { id: 'grade-4-career-occupation-words', label: 'Careers & Occupations' },
    { id: 'grade-4-geometry-words', label: 'Geometry' },
  ],
  '5': [
    { id: 'grade-5-money-management-words', label: 'Money Management' },
    {
      id: 'grade-5-ecosystem-environment-words',
      label: 'Ecosystems & Environment',
    },
    { id: 'grade-5-fraction-decimal-words', label: 'Fractions & Decimals' },
    { id: 'grade-5-community-civics-words', label: 'Community & Civics' },
  ],
};
