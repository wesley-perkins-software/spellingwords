import type { ReviewWordEntry } from './types';

/**
 * Words tracked during sentence-bank review.
 *
 * NOTE: Heteronyms (minute, live, read, wind, close, tear, lead, row, sow, wound,
 * bow) are NO LONGER listed here. They are now first-class, spelling-only entries
 * in the sentence bank, carrying `sentenceOmissionReason: 'heteronym'` instead of an
 * example sentence. See docs/SENTENCE_BANK.md and docs/WORD_UNIVERSE.md.
 *
 * What remains here are words that are either cleared for use with a sentence
 * (`safe-to-add`) or genuinely excluded for non-pronunciation reasons such as the
 * proper-noun / honorific rules (`avoid`).
 */
export const REVIEW_WORDS: ReviewWordEntry[] = [
  {
    word: 'Saturday',
    reason: 'Proper noun (day of week). Previously avoided under the blanket proper-noun rule.',
    recommendation: 'Safe to add. Days of the week are a closed educational set explicitly taught in K–5 curricula; they are exempt from the general proper-noun exclusion.',
    status: 'safe-to-add',
    notes: 'Policy updated to allow closed educational proper-noun sets. Added to grade23.ts.',
  },
  {
    word: 'does',
    reason: 'Irregular pronunciation: "dʌz" not "doʊz" — may trip up TTS or children',
    recommendation: 'Safe to add. TTS reliably produces "dʌz". Sentence should use clearly as third-person singular verb.',
    status: 'safe-to-add',
    notes: 'Example: "The dog does tricks when we give it a treat."',
  },
  {
    word: 'hour',
    reason: 'Silent H: "aʊər" — children may misspell thinking it sounds like "our"',
    recommendation: 'Safe to add. Pronunciation is unambiguous; TTS handles it reliably.',
    status: 'safe-to-add',
    notes: 'Common sight word, worth adding. Example: "We waited about an hour for the cookies to bake."',
  },
  {
    word: 'eight',
    reason: 'Unusual spelling for /eɪt/ sound; often on spelling lists',
    recommendation: 'Safe to add. Pronunciation is unambiguous.',
    status: 'safe-to-add',
    notes: 'Example: "There were eight chicks in the nest."',
  },
  {
    word: 'people',
    reason: 'Very common word, possibly missing from bank',
    recommendation: 'Safe to add if not present.',
    status: 'safe-to-add',
    notes: 'Example: "Many people gathered in the town square to watch the parade."',
  },
  {
    word: 'Mr.',
    reason: 'Honorific abbreviation. Any sentence naturally requires a proper name after it, violating the no-proper-nouns rule.',
    recommendation: 'Skip. The title itself is not a standalone spelling target suitable for the bank.',
    status: 'avoid',
    notes: 'Was briefly added in an expansion pass; removed in audit.',
  },
  {
    word: 'Mrs.',
    reason: 'Honorific abbreviation. Same issue as Mr. — always followed by a proper name.',
    recommendation: 'Skip.',
    status: 'avoid',
    notes: 'Was briefly added in an expansion pass; removed in audit.',
  },
  {
    word: 'Ms.',
    reason: 'Honorific abbreviation. Same issue as Mr. and Mrs.',
    recommendation: 'Skip.',
    status: 'avoid',
    notes: 'Was briefly added in an expansion pass; removed in audit.',
  },
  {
    word: 'Friday',
    reason: 'Proper noun (day of week). Previously avoided under the blanket proper-noun rule.',
    recommendation: 'Safe to add. Days of the week are a closed educational set explicitly taught in K–5 curricula; they are exempt from the general proper-noun exclusion.',
    status: 'safe-to-add',
    notes: 'Policy updated to allow closed educational proper-noun sets. Added to grade23.ts.',
  },
  {
    word: 'Sunday',
    reason: 'Proper noun (day of week). Previously avoided under the blanket proper-noun rule.',
    recommendation: 'Safe to add. Days of the week are a closed educational set explicitly taught in K–5 curricula; they are exempt from the general proper-noun exclusion.',
    status: 'safe-to-add',
    notes: 'Policy updated to allow closed educational proper-noun sets. Added to grade23.ts.',
  },
  {
    word: 'Monday',
    reason: 'Proper noun (day of week).',
    recommendation: 'Safe to add. Closed educational set; exempt from the general proper-noun exclusion.',
    status: 'safe-to-add',
    notes: 'Added to grade23.ts.',
  },
  {
    word: 'Tuesday',
    reason: 'Proper noun (day of week).',
    recommendation: 'Safe to add. Closed educational set; exempt from the general proper-noun exclusion.',
    status: 'safe-to-add',
    notes: 'Added to grade23.ts.',
  },
  {
    word: 'Wednesday',
    reason: 'Proper noun (day of week).',
    recommendation: 'Safe to add. Closed educational set; exempt from the general proper-noun exclusion.',
    status: 'safe-to-add',
    notes: 'Added to grade23.ts.',
  },
  {
    word: 'Thursday',
    reason: 'Proper noun (day of week).',
    recommendation: 'Safe to add. Closed educational set; exempt from the general proper-noun exclusion.',
    status: 'safe-to-add',
    notes: 'Added to grade23.ts.',
  },
  {
    word: 'America',
    reason: 'Proper noun (country name). Content standards prohibit proper nouns.',
    recommendation: 'Skip.',
    status: 'avoid',
    notes: 'Was briefly added in an expansion pass; removed in audit.',
  },
];
