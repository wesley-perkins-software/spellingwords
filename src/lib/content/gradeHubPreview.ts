import type { GradeCode } from './gradeConfig';

/**
 * Grade Hub V2 curated preview data (docs/content/CANONICAL_GRADE_HUB_STANDARD.md §6.1).
 *
 * Every id here is validated against canonicalGradeRoutes (grade + classification match) and
 * every HFW word is validated against FROZEN_HF_WORDS_CURRICULUM in gradeHubPreview.test.ts.
 * Ids are stored, never copied titles — gradeHubModel.ts resolves display titles from the
 * canonical spelling-lists content collection so a future content edit can't silently drift.
 */
export interface GradeHubPreview {
  /** 5–6 short plain-text curriculum-concept phrases. */
  fingerprint: readonly string[];
  /** One grade-specific fact used to compose the Core card's consolidated description. */
  coreFact: string;
  /** Exactly four canonical Core ids, in curriculum sequence order. */
  coreRepresentativeIds: readonly [string, string, string, string];
  /** One grade-specific fact used to compose the HFW card's consolidated description. */
  hfwFact: string;
  /** Exactly four frozen HFW words. */
  hfwRepresentativeWords: readonly [string, string, string, string];
  /** One grade-specific fact used to compose the Themed card's consolidated description. */
  themedFact: string;
  /** Up to four canonical Themed ids. */
  themedRepresentativeIds: readonly string[];
}

export const gradeHubPreview: Record<GradeCode, GradeHubPreview> = {
  K: {
    fingerprint: [
      'Sounds and letters',
      'First words',
      'Short vowels',
      'Mixed-vowel review',
      'Consonant digraphs',
      'First high-frequency spellings',
    ],
    coreFact: 'first words through each short vowel, mixed-vowel review, and consonant digraphs',
    coreRepresentativeIds: [
      'kindergarten-first-words',
      'kindergarten-short-a-words',
      'kindergarten-mixed-vowel-review',
      'kindergarten-consonant-digraphs',
    ],
    hfwFact: 'the earliest, most frequent words children meet in print',
    hfwRepresentativeWords: ['the', 'you', 'was', 'look'],
    themedFact: 'animals, numbers, colors, and family words',
    themedRepresentativeIds: [
      'kindergarten-animal-words',
      'kindergarten-number-words',
      'kindergarten-color-words',
      'kindergarten-family-words',
    ],
  },
  '1': {
    fingerprint: [
      'Short-vowel accuracy',
      'Blends and digraphs',
      'Silent e',
      'Vowel teams',
      'Inflectional endings',
      'Early r-controlled vowels',
    ],
    coreFact:
      'one-syllable short-vowel accuracy through consonant blends, silent-e long vowels, vowel teams, endings, and an early r-controlled vowel pattern',
    coreRepresentativeIds: [
      'grade-1-cvc-short-vowels-c-k-rule',
      'grade-1-ending-consonant-blends',
      'grade-1-long-vowels-silent-e',
      'grade-1-r-controlled-ar-or',
    ],
    hfwFact: 'words that recur constantly across early reading and writing',
    hfwRepresentativeWords: ['said', 'about', 'your', 'help'],
    themedFact: 'weather, shapes, numbers, and the days of the week',
    themedRepresentativeIds: [
      'grade-1-weather-words',
      'grade-1-shape-words',
      'grade-1-number-words-11-20',
      'grade-1-days-of-the-week',
    ],
  },
  '2': {
    fingerprint: [
      'Broader vowel patterns',
      'R-controlled vowels',
      'Soft c and g',
      'Two-syllable words',
      'Silent letters',
      'Word building',
    ],
    coreFact:
      'broader vowel spelling into r-controlled vowels, soft consonants, syllables, silent letters, and word building',
    coreRepresentativeIds: [
      'grade-2-r-controlled-er-ir-ur',
      'grade-2-two-syllable-words',
      'grade-2-silent-letter-words',
      'grade-2-list-02',
    ],
    hfwFact: 'words used constantly in everyday reading and writing',
    hfwRepresentativeWords: ['again', 'people', 'school', 'night'],
    themedFact: 'transportation, money, community helpers, and the months of the year',
    themedRepresentativeIds: [
      'grade-2-transportation-words',
      'grade-2-money-words',
      'grade-2-community-helpers',
      'grade-2-months-of-the-year',
    ],
  },
  '3': {
    fingerprint: [
      'Prefixes',
      'Suffixes',
      'Spelling changes',
      'Possessives',
      'Multisyllabic words',
      'Meaning and word families',
    ],
    coreFact:
      'prefixes and suffixes into spelling changes, possessives, multisyllabic words, and meaning-based word families',
    coreRepresentativeIds: [
      'grade-3-prefix-words',
      'grade-3-suffix-words',
      'grade-3-possessives',
      'grade-3-root-word-families',
    ],
    hfwFact: 'words that keep appearing as reading and writing grow more complex',
    hfwRepresentativeWords: ['always', 'friend', 'believe', 'remember'],
    themedFact: 'maps, life cycles, time, and multiplication and division',
    themedRepresentativeIds: [
      'grade-3-map-globe-words',
      'grade-3-life-cycle-words',
      'grade-3-time-words',
      'grade-3-multiplication-division-words',
    ],
  },
  '4': {
    fingerprint: [
      'Academic multisyllabic words',
      'Advanced affixes',
      'Latin roots',
      'Confused words',
      'Derived-word relationships',
    ],
    coreFact:
      'academic multisyllabic words into advanced prefixes and suffixes, Latin roots, easily confused words, and derived-word relationships',
    coreRepresentativeIds: [
      'grade-4-multisyllabic-academic-words',
      'grade-4-advanced-prefixes',
      'tier-1-roots-and-patterns',
      'grade-4-derived-words',
    ],
    hfwFact: 'words that carry real weight in academic reading and writing',
    hfwRepresentativeWords: ['important', 'understand', 'whether', 'however'],
    themedFact: 'measurement, the solar system, careers, and geometry',
    themedRepresentativeIds: [
      'grade-4-measurement-words',
      'grade-4-solar-system-words',
      'grade-4-career-occupation-words',
      'grade-4-geometry-words',
    ],
  },
  '5': {
    fingerprint: [
      'Advanced academic spelling',
      'Prefixes and suffixes',
      'Greek and Latin word parts',
      'Meaning-based word choices',
      'Related-word spelling changes',
    ],
    coreFact:
      'advanced academic spelling into prefixes and suffixes, Greek and Latin word parts, meaning-based word choices, and spelling changes across related words',
    coreRepresentativeIds: [
      'grade-5-multisyllabic-academic-words',
      'grade-5-prefix-suffix-words',
      'grade-5-greek-latin-word-parts',
      'grade-5-spelling-changes-related-words',
    ],
    hfwFact: 'words that remain important for independent academic writing',
    hfwRepresentativeWords: ['government', 'beautiful', 'provide', 'experience'],
    themedFact: 'money management, ecosystems, fractions and decimals, and civics',
    themedRepresentativeIds: [
      'grade-5-money-management-words',
      'grade-5-ecosystem-environment-words',
      'grade-5-fraction-decimal-words',
      'grade-5-community-civics-words',
    ],
  },
};
