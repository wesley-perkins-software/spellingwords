import type { GradeCode } from './gradeConfig';

/**
 * Editorial copy for the three cross-grade strand gateways (/core-spelling,
 * /high-frequency-words, /themed-spelling-practice). Deliberately separate from
 * gradeHubPreview.ts and gradeHubCopy.ts: these sentences describe one strand across K–5, not
 * one grade across all three strands, and must not be copy-pasted from either (Part 19
 * duplication control in the feature spec this file implements).
 */

export interface CoreGradeSummary {
  summary: string;
}

/** One to two sentence, grade-specific summary of what Core Spelling covers at this grade. */
export const coreSpellingGatewaySummaries: Record<GradeCode, CoreGradeSummary> = {
  K: {
    summary:
      'Kindergarten Core Spelling connects spoken sounds to letters for the first time, moving from first words through each short vowel and into an early look at consonant digraphs.',
  },
  '1': {
    summary:
      '1st Grade Core Spelling consolidates one-syllable short-vowel spelling, then expands into consonant blends, long vowels with silent e, vowel teams, common endings, and an early r-controlled vowel pattern.',
  },
  '2': {
    summary:
      '2nd Grade Core Spelling broadens vowel spelling, then applies that pattern knowledge to r-controlled vowels, soft consonants, syllable structures, silent letters, and word building.',
  },
  '3': {
    summary:
      '3rd Grade Core Spelling shifts from a mostly phonics-based focus into prefixes and suffixes, the spelling changes they cause, possessives, multisyllabic words, and meaning-based word families.',
  },
  '4': {
    summary:
      '4th Grade Core Spelling deepens multisyllabic academic spelling with advanced prefixes and suffixes, Latin roots, commonly confused words, and relationships among derived words.',
  },
  '5': {
    summary:
      '5th Grade Core Spelling integrates advanced academic spelling, prefixes and suffixes, Greek and Latin word parts, meaning-based word choices, and spelling changes across related words.',
  },
};

export interface HfwGradeSummary {
  role: string;
}

/** A concise grade-role summary for the HFW cross-grade page — no word samples here (Part 9). */
export const hfwGatewaySummaries: Record<GradeCode, HfwGradeSummary> = {
  K: { role: 'introduces the earliest, most frequent words children meet in print, alongside Core Spelling.' },
  '1': { role: 'builds accuracy with words students regularly use in reading and writing, alongside Core Spelling.' },
  '2': { role: 'supports accurate spelling of words students frequently need for everyday reading and writing.' },
  '3': { role: 'is practiced alongside, not instead of, the growing morphological focus of Core Spelling.' },
  '4': { role: 'gives focused practice with academically weighty words that still merit dedicated attention.' },
  '5': { role: 'strengthens accuracy with frequently used words that remain important in independent writing.' },
};

export interface ThemedGradeSummary {
  intro: string;
}

/** A one-line framing sentence per grade for the Themed cross-grade page (topics come from canonical data, not curated text). */
export const themedGatewaySummaries: Record<GradeCode, ThemedGradeSummary> = {
  K: { intro: 'Kindergarten themed practice uses familiar everyday topics.' },
  '1': { intro: '1st Grade themed practice connects spelling to the classroom and calendar.' },
  '2': { intro: '2nd Grade themed practice connects spelling to community and everyday life.' },
  '3': { intro: '3rd Grade themed practice connects spelling to science and math topics.' },
  '4': { intro: '4th Grade themed practice connects spelling to academic subject topics.' },
  '5': { intro: '5th Grade themed practice connects spelling to civics, science, and math topics.' },
};

/** "How Core develops" bridge shown on /core-spelling — exactly three stages. */
export const CORE_DEVELOPMENT_BRIDGE: readonly [string, string, string] = [
  'Kindergarten and 1st Grade lay the foundation: connecting sounds to letters and building one-syllable spelling accuracy.',
  '2nd and 3rd Grade expand that foundation into broader vowel patterns, syllables, and the first prefixes and suffixes.',
  '4th and 5th Grade integrate multisyllabic academic spelling, Latin and Greek word parts, and meaning-based word relationships.',
];
