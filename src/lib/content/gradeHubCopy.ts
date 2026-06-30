import type { GradeCode } from '@/lib/content/gradeConfig';

export interface GradeHubCopy {
  metaDescription: string;
  heroParagraphs: readonly [string, string];
  guidanceBody: string;
  /** Word-form grade name for the empty-state message, e.g. "First grade". */
  emptyStateLabel: string;
}

export const gradeHubCopy: Record<GradeCode, GradeHubCopy> = {
  K: {
    metaDescription:
      'Free kindergarten spelling word lists for early practice — first words, number and color words, and describing words. Calm, simple practice with audio support.',
    heroParagraphs: [
      'Here are free kindergarten spelling word lists for early reading and writing practice, including first words, number words, color words, and describing words. All lists include audio support — a child can hear each word read aloud before typing it.',
      'Kindergarten spelling practice should feel simple, encouraging, and concrete. These lists focus on early words children can hear, say, and spell — words that show up in their world every day. There are no timers or scores, just calm, supported practice.',
    ],
    guidanceBody:
      'Start with First Words if your child is just beginning to connect letters to sounds. Number & Color Words and Describing Words work well alongside early reading practice. Sight word lists are great for daily repetition — short sessions of five to ten minutes work best at this age.',
    emptyStateLabel: 'Kindergarten',
  },
  '1': {
    metaDescription:
      'Free 1st grade spelling word lists — sight words, action words, describing words, and phonics practice. Calm, audio-supported spelling for early readers.',
    heroParagraphs: [
      'Here are free 1st grade spelling word lists, including Dolch sight words, action words, describing words, and phonics patterns like short vowels and consonant blends. All lists include audio support so children can hear each word before typing it.',
      'First grade spelling lists help children build confidence with common words, short vowel patterns, and early phonics skills. These lists work well for both daily practice and weekly spelling homework.',
    ],
    guidanceBody:
      "Sight word lists are good for daily review — a few minutes each day builds recognition faster than longer, infrequent sessions. Phonics lists (short vowels, blends) work well when your child is working through a specific sound pattern. The grade-level lists — action words, describing words, everyday words — are a good match for weekly homework lists or independent reading support.",
    emptyStateLabel: 'First grade',
  },
  '2': {
    metaDescription:
      'Free 2nd grade spelling word lists for phonics, sight words, compound words, and everyday vocabulary. Simple audio-supported practice for second graders.',
    heroParagraphs: [
      'Here are free 2nd grade spelling word lists covering everyday words, compound words, action and describing words, and Dolch second grade sight words. All lists include audio support so children can hear each word read aloud before typing it.',
      'Second grade spelling practice connects everyday words with stronger phonics patterns, sight words, and early vocabulary growth. These lists are a good match for children building fluency and starting to write more independently.',
    ],
    guidanceBody:
      "Compound words are a great starting point if your child is working on reading longer words by breaking them apart. Sight words are best practiced in short, frequent sessions. The everyday words and action and describing word lists pair well with writing practice — they're the words children reach for most often in sentences.",
    emptyStateLabel: 'Second grade',
  },
  '3': {
    metaDescription:
      'Free 3rd grade spelling word lists — reading and writing words, describing words, sight words, and vocabulary. Calm practice for developing spellers.',
    heroParagraphs: [
      'Here are free 3rd grade spelling word lists including everyday words, reading and writing vocabulary, describing words, and Dolch third grade sight words. All lists include audio support so students can hear each word before typing it.',
      'Third grade spellers are ready for longer words, compound words, prefixes, suffixes, and more independent practice. These lists support the wider vocabulary that third graders encounter across reading and writing.',
    ],
    guidanceBody:
      'The everyday words list is a solid starting point for general review. Reading and writing words are particularly useful alongside classroom writing assignments. Sight words at this grade include less common high-frequency words that still trip up many readers — short daily practice works well.',
    emptyStateLabel: 'Third grade',
  },
  '4': {
    metaDescription:
      'Free 4th grade spelling word lists for academic vocabulary, community words, and reading and writing skills. Audio-supported practice for upper elementary students.',
    heroParagraphs: [
      'Here are free 4th grade spelling word lists covering everyday words, reading and writing vocabulary, and community and academic terms. All lists include audio support so students can hear each word read aloud before typing it.',
      'Fourth grade spelling lists help students handle multisyllable words, academic vocabulary, and words they meet across reading, writing, and content-area subjects. These lists grow alongside the longer texts fourth graders are reading.',
    ],
    guidanceBody:
      'The everyday words list covers the general vocabulary fourth graders encounter across subjects. Reading and writing words support the more demanding writing assignments students face in upper elementary. Community words pair well with social studies and civics topics covered at this grade.',
    emptyStateLabel: 'Fourth grade',
  },
  '5': {
    metaDescription:
      'Free 5th grade spelling word lists — academic words, science words, civics vocabulary, opinion and argument terms. Calm practice for upper elementary students.',
    heroParagraphs: [
      'Here are free 5th grade spelling word lists covering everyday words, academic vocabulary, science and nature terms, civics words, opinion and argument language, and reading and writing vocabulary. All lists include audio support so students can hear each word read aloud before typing it.',
      'Fifth grade spelling practice supports stronger vocabulary, academic writing, science words, civics words, and the more advanced reading students are doing. These lists are a good fit for students preparing for middle school and standardized assessments.',
    ],
    guidanceBody:
      'Start with everyday words or academic words for general review. Science and nature words and civics words pair well with content-area units. Opinion and argument words are especially useful alongside persuasive writing assignments. Reading and writing words cover the vocabulary students need to discuss and analyze longer texts.',
    emptyStateLabel: 'Fifth grade',
  },
};
