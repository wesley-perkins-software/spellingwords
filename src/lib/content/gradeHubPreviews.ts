import type { GradeCode } from './gradeConfig';

export type GradeHubPreviewCopy = {
  fingerprint: readonly string[];
  core: {
    summary: string;
    representativeIds: readonly [string, string, string, string];
  };
  hfw: {
    summary: string;
    representativeWords: readonly [string, string, string, string];
  };
  themed: {
    summary: string;
    representativeIds: readonly string[];
    displayLabels: Readonly<Record<string, string>>;
  };
};

/** Explicit editorial selections for Grade Hub previews; never derive these from title order. */
export const gradeHubPreviews: Record<GradeCode, GradeHubPreviewCopy> = {
  K: {
    fingerprint: [
      'Sounds and letters',
      'First words',
      'Short vowels',
      'Mixed-vowel review',
      'Consonant digraphs',
      'First high-frequency spellings',
    ],
    core: {
      summary:
        'The sequence connects sounds with letters, builds short-vowel spelling one vowel at a time, and finishes with mixed review and early consonant digraphs.',
      representativeIds: [
        'kindergarten-first-words',
        'kindergarten-short-a-words',
        'kindergarten-mixed-vowel-review',
        'kindergarten-consonant-digraphs',
      ],
    },
    hfw: {
      summary:
        'The collection builds accuracy with words children often need in their earliest reading and writing.',
      representativeWords: ['the', 'you', 'was', 'with'],
    },
    themed: {
      summary: 'Topics draw on familiar early-learning ideas and everyday words.',
      representativeIds: [
        'kindergarten-animal-words',
        'kindergarten-body-words',
        'kindergarten-number-words',
        'kindergarten-color-words',
      ],
      displayLabels: {
        'kindergarten-animal-words': 'Animals',
        'kindergarten-body-words': 'Body',
        'kindergarten-number-words': 'Numbers',
        'kindergarten-color-words': 'Colors',
      },
    },
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
    core: {
      summary:
        'The sequence strengthens one-syllable patterns, expands into long vowels and vowel teams, and adds meaningful endings and spelling conventions.',
      representativeIds: [
        'grade-1-cvc-short-vowels-c-k-rule',
        'grade-1-beginning-consonant-blends',
        'grade-1-long-vowels-silent-e',
        'grade-1-inflectional-endings-ed-ing',
      ],
    },
    hfw: {
      summary:
        'The cumulative collection supports frequently used words as students become more independent readers and writers.',
      representativeWords: ['said', 'over', 'were', 'place'],
    },
    themed: {
      summary:
        'Topics include everyday weather and clothing alongside shapes, numbers, and calendar words.',
      representativeIds: [
        'grade-1-weather-words',
        'grade-1-clothing-words',
        'grade-1-shape-words',
        'grade-1-days-of-the-week',
      ],
      displayLabels: {
        'grade-1-weather-words': 'Weather',
        'grade-1-clothing-words': 'Clothing',
        'grade-1-shape-words': 'Shapes',
        'grade-1-days-of-the-week': 'Days of the Week',
      },
    },
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
    core: {
      summary:
        'The sequence broadens vowel spelling, then applies sound and pattern knowledge to r-controlled vowels, soft consonants, syllables, silent letters, and word building.',
      representativeIds: [
        'grade-2-r-controlled-er-ir-ur',
        'grade-2-two-syllable-words',
        'grade-2-silent-letter-words',
        'grade-2-list-02',
      ],
    },
    hfw: {
      summary:
        'The collection includes frequently used words, including spellings whose vowels, syllables, or letter sequences merit closer attention.',
      representativeWords: ['again', 'people', 'school', 'night'],
    },
    themed: {
      summary:
        'Topics range from transportation and money to community roles, larger number words, and months.',
      representativeIds: [
        'grade-2-transportation-words',
        'grade-2-money-words',
        'grade-2-community-helpers',
        'grade-2-months-of-the-year',
      ],
      displayLabels: {
        'grade-2-transportation-words': 'Transportation',
        'grade-2-money-words': 'Money',
        'grade-2-community-helpers': 'Community Helpers',
        'grade-2-months-of-the-year': 'Months of the Year',
      },
    },
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
    core: {
      summary:
        'The sequence shifts toward meaningful word parts, spelling changes, longer words, and meaning-based distinctions.',
      representativeIds: [
        'grade-3-prefix-words',
        'grade-3-suffix-spelling-changes',
        'grade-3-multisyllabic-words',
        'grade-3-root-word-families',
      ],
    },
    hfw: {
      summary:
        'The cumulative collection focuses on words that support increasingly fluent and accurate independent writing.',
      representativeWords: ['friend', 'different', 'through', 'believe'],
    },
    themed: {
      summary: 'Topics concentrate on geography, science, time, and multiplication and division.',
      representativeIds: [
        'grade-3-map-globe-words',
        'grade-3-life-cycle-words',
        'grade-3-time-words',
        'grade-3-multiplication-division-words',
      ],
      displayLabels: {
        'grade-3-map-globe-words': 'Maps & Globes',
        'grade-3-life-cycle-words': 'Life Cycles',
        'grade-3-time-words': 'Time',
        'grade-3-multiplication-division-words': 'Multiplication & Division',
      },
    },
  },
  '4': {
    fingerprint: [
      'Academic multisyllabic words',
      'Advanced affixes',
      'Latin roots',
      'Stable endings',
      'Confused words',
      'Derived-word relationships',
    ],
    core: {
      summary:
        'The sequence uses syllables, affixes, roots, and meaning relationships to support longer academic words and more independent spelling choices.',
      representativeIds: [
        'grade-4-multisyllabic-academic-words',
        'grade-4-advanced-prefixes',
        'tier-1-roots-and-patterns',
        'grade-4-derived-words',
      ],
    },
    hfw: {
      summary:
        'The focused collection addresses words that remain important in longer, more independent school writing.',
      representativeWords: ['important', 'straight', 'whether', 'however'],
    },
    themed: {
      summary: 'Topics span measurement, geometry, careers, and the solar system.',
      representativeIds: [
        'grade-4-measurement-words',
        'grade-4-solar-system-words',
        'grade-4-career-occupation-words',
        'grade-4-geometry-words',
      ],
      displayLabels: {
        'grade-4-measurement-words': 'Measurement',
        'grade-4-solar-system-words': 'Solar System',
        'grade-4-career-occupation-words': 'Careers & Occupations',
        'grade-4-geometry-words': 'Geometry',
      },
    },
  },
  '5': {
    fingerprint: [
      'Advanced academic spelling',
      'Roots and affixes',
      'Greek and Latin word parts',
      'Meaning-based choices',
      'Related-word spelling changes',
    ],
    core: {
      summary:
        'The sequence integrates syllables, roots, affixes, meaning, and related-word changes for increasingly complex academic spelling.',
      representativeIds: [
        'grade-5-multisyllabic-academic-words',
        'grade-5-prefix-suffix-words',
        'grade-5-greek-latin-word-parts',
        'grade-5-spelling-changes-related-words',
      ],
    },
    hfw: {
      summary:
        'The focused collection includes words that matter in upper-elementary academic and independent writing.',
      representativeWords: ['government', 'language', 'beautiful', 'experience'],
    },
    themed: {
      summary: 'Topics connect with mathematics, ecosystems, money management, and civic life.',
      representativeIds: [
        'grade-5-money-management-words',
        'grade-5-ecosystem-environment-words',
        'grade-5-fraction-decimal-words',
        'grade-5-community-civics-words',
      ],
      displayLabels: {
        'grade-5-money-management-words': 'Money Management',
        'grade-5-ecosystem-environment-words': 'Ecosystems & Environment',
        'grade-5-fraction-decimal-words': 'Fractions & Decimals',
        'grade-5-community-civics-words': 'Community & Civics',
      },
    },
  },
};
