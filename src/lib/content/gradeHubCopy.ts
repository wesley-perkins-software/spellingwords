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
      'Free kindergarten spelling word lists following a structured phonics sequence — first words, short vowels (A, I, O, U, E), mixed vowel review, consonant digraphs, the -ck ending rule, double consonants, and kindergarten heart words — plus supplemental animal and number/color word practice. Calm, simple practice with audio support.',
    heroParagraphs: [
      'Here are free kindergarten spelling word lists following a structured phonics sequence: First Words, then short-vowel practice (Short A, I, O, U, and E), Mixed Vowel CVC Review, Consonant Digraphs, the -ck Ending Rule, Double Consonants, and Kindergarten Heart Words. Animal Words and Number & Color Words offer supplemental vocabulary practice alongside the sequence. All lists include audio support — a child can hear each word read aloud before typing it.',
      'Kindergarten spelling practice should feel simple, encouraging, and concrete. This sequence builds one spelling pattern at a time — starting with easy, familiar words and moving through short vowels, digraphs, and a few spelling rules, in the order most kindergarteners are ready for them. There are no timers or scores, just calm, supported practice.',
    ],
    guidanceBody:
      'Start with First Words if your child is just beginning to connect letters to sounds. From there, work through the short-vowel sequence in order — Short A, I, O, U, then E — followed by Mixed Vowel Review, Consonant Digraphs, the -ck Ending Rule, Double Consonants, and Kindergarten Heart Words. Animal Words and Number & Color Words are good supplemental practice alongside that sequence, not a required step. Dolch pre-primer sight words are great for daily repetition — short sessions of five to ten minutes work best at this age.',
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
      'Free 2nd grade spelling word lists for phonics, word study, contractions, prefixes, suffixes, plurals, homophones, silent letters, and everyday vocabulary. Simple audio-supported practice for second graders.',
    heroParagraphs: [
      'Here are free 2nd grade spelling word lists covering everyday words, compound words, contractions, prefixes, suffixes, regular plurals, homophones, silent letters, action and describing words, and Grade 2 phonics patterns. All lists include audio support so children can hear each word read aloud before typing it.',
      'Second grade spelling practice connects everyday words with stronger phonics patterns, early word study, and vocabulary growth. These lists are a good match for children building fluency, learning how word parts work, and starting to write more independently.',
    ],
    guidanceBody:
      "Start with Everyday Words for a general Grade 2 foundation, then use Compound Words, Contractions, Prefixes, Suffixes, Regular Plurals, Homophones, Silent Letter Words, and Comparatives for focused word-study practice. The action and describing word lists pair well with writing practice — they're the words children reach for often in sentences.",
    emptyStateLabel: 'Second grade',
  },
  '3': {
    metaDescription:
      'Free 3rd grade spelling word lists for vocabulary, sight words, prefixes, suffixes, spelling rules, multisyllabic words, homophones, and root word families. Calm audio-supported practice.',
    heroParagraphs: [
      'Here are free 3rd grade spelling word lists including everyday words, reading and writing vocabulary, describing words, Dolch third grade sight words, prefixes, suffixes, spelling rules, multisyllabic words, homophones, and root word families. All lists include audio support so students can hear each word before typing it.',
      'Third grade spelling is the bridge from phonics into morphology. Students still need high-frequency vocabulary, but they are also ready to study prefixes, suffixes, suffix spelling changes, longer multisyllabic words, and meaning-based spelling choices.',
    ],
    guidanceBody:
      'Start with Everyday Words, Describing Words, and Reading & Writing Words for a Grade 3 vocabulary foundation. Then move into Prefix Words and Suffix Words before practicing the three spelling-rule lists: Dropping Silent E, Doubling Final Consonants, and Changing Y to I. Multisyllabic Words, Homophones, and Root Word Families complete the bridge into Grade 4 morphology.',
    emptyStateLabel: 'Third grade',
  },
  '4': {
    metaDescription:
      'Free 4th grade spelling word lists for multisyllabic academic words, advanced prefixes and suffixes, Greek and Latin roots, commonly confused words, and content vocabulary.',
    heroParagraphs: [
      'Here are free 4th grade spelling word lists covering everyday words, reading and writing vocabulary, multisyllabic academic words, advanced prefixes and suffixes, Greek and Latin roots, commonly confused words, and content-area vocabulary. All lists include audio support so students can hear each word read aloud before typing it.',
      'Fourth grade spelling is the expansion year after introductory morphology. Students move from basic prefixes, suffixes, and root families into longer academic words, derivational suffixes, advanced prefixes, and Greek and Latin roots that support reading across subjects.',
    ],
    guidanceBody:
      'Start with Everyday Words and Reading & Writing Words, then practice Multisyllabic Academic Words before moving into Advanced Prefixes, Advanced Suffixes, Latin Root Words, and Greek Root Words. Commonly Confused Words supports more accurate writing, while Academic & Content Words gathers high-value science and social studies vocabulary without splitting fourth grade into narrow topical lists.',
    emptyStateLabel: 'Fourth grade',
  },
  '5': {
    metaDescription:
      'Free 5th grade spelling word lists for academic words, multisyllabic words, prefixes and suffixes, Greek and Latin word parts, spelling rules, science, civics, and math vocabulary.',
    heroParagraphs: [
      'Here are free 5th grade spelling word lists covering everyday and academic words, reading and writing vocabulary, opinion and argument words, multisyllabic academic words, prefix and suffix words, Greek and Latin word parts, spelling rules, commonly confused words, and science, social studies, civics, and math vocabulary. All lists include audio support so students can hear each word read aloud before typing it.',
      'Fifth grade is the capstone of elementary spelling. Students still need useful vocabulary, but they are also ready to use word parts, syllables, roots, suffix patterns, and careful word choice to spell longer words with confidence before middle school.',
    ],
    guidanceBody:
      'Start with Everyday Words and Academic Words for review, then use Reading & Writing Words and Opinion & Argument Words for ELA practice. Multisyllabic Academic Words, Prefix & Suffix Words, Greek & Latin Word Parts, Spelling Rules, and Commonly Confused Words form the Grade 5 word-study core. Science Words and Social Studies & Civics Words are the strongest content-area follow-ups; Math Vocabulary is available as a lower-priority extension when students need it.',
    emptyStateLabel: 'Fifth grade',
  },
};
