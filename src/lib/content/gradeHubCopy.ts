import type { GradeCode } from './gradeConfig';

export interface GradeHubAuthoredCopy {
  metaDescription: string;
  orientation: readonly [string, string];
  coreScope: string;
  hfwRelationship: string;
  themedFraming: string;
  synthesis: string;
}

/** Authored, grade-specific language. Numerical facts are interpolated by the Hub model. */
export const gradeHubCopy: Record<GradeCode, GradeHubAuthoredCopy> = {
  K: {
    metaDescription: 'Explore kindergarten spelling foundations with systematic Core Spelling, High-Frequency Words, and optional Themed Spelling Practice.',
    orientation: [
      'Kindergarten spelling begins with hearing sounds in familiar words and connecting those sounds to letters. Short-vowel words and early consonant patterns give children a manageable foundation for putting spoken words on the page.',
      'This early work builds on children’s growing awareness of sounds while moving toward greater spelling independence. The goal is not to master every pattern at once, but to begin using sound and letter knowledge with confidence.',
    ],
    coreScope: 'cover connections between sounds and letters through first words, short-vowel spelling, mixed-vowel review, and an early look at consonant digraphs.',
    hfwRelationship: 'High-Frequency Words are practiced alongside Core Spelling, giving children focused practice with words they often need in reading and writing.',
    themedFraming: 'Themed Spelling Practice provides {count} optional lists for additional practice. These lists are not required or sequential.',
    synthesis: 'Begin with Core Spelling. Practice High-Frequency Words alongside it, and use Themed Spelling Practice as optional additional practice when it is useful.',
  },
  '1': {
    metaDescription: 'Explore 1st grade spelling patterns with systematic Core Spelling, High-Frequency Words, and optional Themed Spelling Practice.',
    orientation: [
      'In 1st Grade, students strengthen the sound-to-letter knowledge established in kindergarten and apply it across a wider range of one-syllable words. Consonant patterns, long-vowel spellings, and common endings become more important.',
      'Students learn that the same sound can be represented in different ways and that word endings can carry meaning. This broader pattern knowledge prepares them to work with more vowel spellings and longer words in 2nd Grade.',
    ],
    coreScope: 'cover short-vowel accuracy, consonant patterns, long-vowel spellings, inflectional endings, and additional one-syllable spelling conventions.',
    hfwRelationship: 'High-Frequency Words are practiced alongside Core Spelling so students can build accuracy with words they regularly use in reading and writing.',
    themedFraming: 'Themed Spelling Practice offers {count} optional lists for additional practice. The lists are not required and do not form a sequence.',
    synthesis: 'Start with Core Spelling. Keep High-Frequency Words in regular practice alongside it, and add Themed Spelling Practice when optional extra practice would be helpful.',
  },
  '2': {
    metaDescription: 'Explore 2nd grade spelling development with systematic Core Spelling, High-Frequency Words, and optional Themed Spelling Practice.',
    orientation: [
      'In 2nd Grade, students extend their knowledge beyond the most familiar vowel and consonant patterns. They work with a wider range of vowel spellings, r-controlled vowels, soft consonants, silent letters, and the structure of longer words.',
      'Earlier sound and pattern knowledge still matters, but students increasingly learn to divide words into syllables and notice meaningful word combinations. This prepares them for the prefixes, suffixes, and multisyllabic spelling emphasized in 3rd Grade.',
    ],
    coreScope: 'cover broader vowel-pattern knowledge and spelling with soft consonants, syllable structures, silent letters, compound words, and contractions.',
    hfwRelationship: 'High-Frequency Words are practiced alongside Core Spelling, supporting accurate spelling of words students frequently need for everyday reading and writing.',
    themedFraming: 'Themed Spelling Practice offers {count} optional lists for additional practice. The lists are neither required nor sequential.',
    synthesis: 'Use Core Spelling as the starting point. Practice High-Frequency Words alongside it, with Themed Spelling Practice available as optional additional practice when useful.',
  },
  '3': {
    metaDescription: 'Explore 3rd grade spelling and choose among Core Spelling, High-Frequency Words, and optional Themed Spelling Practice.',
    orientation: [
      'In 3rd Grade, spelling begins to move beyond a mainly phonics-based focus. Students still use sound and pattern knowledge from earlier grades, while paying more attention to prefixes, suffixes, and the structure of longer words.',
      'They also learn how word parts can affect spelling and meaning, and how meaning can distinguish words that sound alike. This work builds toward using roots, word families, and other meaningful parts to spell more complex words in later grades.',
    ],
    coreScope: 'build from prefixes and suffixes into spelling changes, possessives, multisyllabic spelling, homophones, and word families.',
    hfwRelationship: 'High-Frequency Words are practiced alongside Core Spelling, not instead of it.',
    themedFraming: 'Themed Spelling Practice offers {count} optional lists for additional practice. The lists are not required or sequential and can be explored when useful.',
    synthesis: 'Start with Core Spelling. Practice High-Frequency Words alongside it, and use Themed Spelling Practice for optional additional practice when useful.',
  },
  '4': {
    metaDescription: 'Explore 4th grade spelling with systematic Core Spelling, High-Frequency Words, and optional Themed Spelling Practice.',
    orientation: [
      'In 4th Grade, students deepen their understanding of how spelling, word structure, and meaning work together. Longer academic words, advanced prefixes and suffixes, Latin roots, and relationships among derived words become more prominent.',
      'Sound and syllable knowledge from earlier grades remains useful, but students rely more often on recognizable word parts and meaning when spelling complex words. This prepares them to integrate those strategies across an even wider academic vocabulary in 5th Grade.',
    ],
    coreScope: 'cover advanced multisyllabic spelling and affixes, Latin roots, derived-word relationships, and careful distinctions between commonly confused words.',
    hfwRelationship: 'High-Frequency Words are practiced alongside Core Spelling, providing focused work with frequently used words that still merit attention.',
    themedFraming: 'Themed Spelling Practice supplies {count} optional lists for additional practice. These lists are not required or sequential.',
    synthesis: 'Start with Core Spelling as the systematic path. Practice High-Frequency Words alongside it, and choose Themed Spelling Practice only when optional additional practice is useful.',
  },
  '5': {
    metaDescription: 'Explore 5th grade spelling integration with systematic Core Spelling, High-Frequency Words, and optional Themed Spelling Practice.',
    orientation: [
      'In 5th Grade, students bring together the sound, syllable, pattern, and word-part knowledge developed across elementary spelling. Advanced morphology, Greek and Latin word parts, and multisyllabic academic spelling help them approach unfamiliar words strategically.',
      'Students also pay closer attention to spelling changes across related words and to meaning when words are easily confused. This integrated work builds the independence needed for the broader vocabulary and writing demands of middle school.',
    ],
    coreScope: 'cover advanced multisyllabic spelling, prefixes and suffixes, Greek and Latin word parts, meaning-based distinctions, and spelling changes across related words.',
    hfwRelationship: 'High-Frequency Words are practiced alongside Core Spelling to strengthen accuracy with frequently used words that remain important in independent writing.',
    themedFraming: 'Themed Spelling Practice offers {count} optional lists for additional practice. They are not required or sequential.',
    synthesis: 'Make Core Spelling the starting point. Practice High-Frequency Words alongside it, and use Themed Spelling Practice as optional additional practice when it serves a useful purpose.',
  },
};
