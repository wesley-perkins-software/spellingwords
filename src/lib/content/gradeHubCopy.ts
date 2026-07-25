import type { GradeCode } from "@/lib/content/gradeConfig";

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
      "Free kindergarten spelling word lists with a core phonics route, four high-frequency-word sets, and optional number, color, and animal word practice.",
    heroParagraphs: [
      "Start with Core Spelling for a short kindergarten route from first words through short vowels, mixed CVC review, and a digraph preview. All lists include audio support — a child can hear each word read aloud before typing it.",
      "Kindergarten spelling practice should feel simple, encouraging, and concrete. High-Frequency Words offers four small cumulative sets of common sight and writing words with phonics-first Heart Word guidance, while Additional Practice offers number, color, and animal words.",
    ],
    guidanceBody:
      "Start with First Words and work through Core Spelling when possible. Use the Kindergarten High-Frequency Words sets for everyday sight and writing words with Heart Word guidance, and choose Number Words, Color Words, or Animal Words whenever a child wants additional practice.",
    emptyStateLabel: "Kindergarten",
  },
  "1": {
    metaDescription:
      "Free 1st grade spelling curriculum with a core route through phonics and spelling patterns plus six planned cumulative high-frequency-word sets.",
    heroParagraphs: [
      "Use Core Spelling for the Grade 1 route: short-vowel review, spelling rules, digraphs, blends, long vowels, endings, r-controlled vowels, and final -tch and -dge. All lists include audio support so children can hear each word before typing it.",
      "First grade spelling is about learning how words work, not memorizing giant vocabulary lists. High-Frequency Words adds small cumulative writing-word sets with Heart Word support for unexpected parts.",
    ],
    guidanceBody:
      "Start with Core Spelling and move through the twelve major spelling concepts when possible. Use Grade 1 High-Frequency Words alongside the route for useful writing words; focused Skills remain available elsewhere when a child needs extra practice with one pattern.",
    emptyStateLabel: "First grade",
  },
  "2": {
    metaDescription:
      "Free 2nd grade spelling curriculum with a ten-step Core Spelling route through vowel patterns, soft c and g, syllables, and word endings, plus six cumulative high-frequency-word sets.",
    heroParagraphs: [
      "Use Core Spelling for the Grade 2 route: the vowel patterns that finish the basic code — oi/oy, ou/ow, oo, au/aw — then soft c and g, two-syllable words, the quiet -le ending, silent letters, compound words, and contractions. All lists include audio support so children can hear each word before typing it.",
      "Second grade is the year spelling stops being one syllable at a time. Children learn to break longer words into beats and to notice which letters do something unexpected. High-Frequency Words adds six cumulative sets of common writing words with Heart Word support for the parts that still need to be remembered.",
    ],
    guidanceBody:
      "Start with Core Spelling and work through the ten steps in order — each one builds on the last, and the vowel patterns come first because everything longer depends on them. Use Grade 2 High-Frequency Words alongside the route rather than after it; the six sets are the words your child needs for everyday writing right now. Additional Practice is optional and can be used whenever a child wants something familiar.",
    emptyStateLabel: "Second grade",
  },
  "3": {
    metaDescription:
      "Free 3rd grade spelling word lists for vocabulary, sight words, prefixes, suffixes, spelling rules, multisyllabic words, homophones, and root word families. Calm audio-supported practice.",
    heroParagraphs: [
      "Here are free 3rd grade spelling word lists including everyday words, reading and writing vocabulary, describing words, Dolch third grade sight words, prefixes, suffixes, spelling rules, multisyllabic words, homophones, and root word families. All lists include audio support so students can hear each word before typing it.",
      "Third grade spelling is the bridge from phonics into morphology. Students still need high-frequency vocabulary, but they are also ready to study prefixes, suffixes, suffix spelling changes, longer multisyllabic words, and meaning-based spelling choices.",
    ],
    guidanceBody:
      "Start with Everyday Words, Describing Words, and Reading & Writing Words for a Grade 3 vocabulary foundation. Then move into Prefix Words and Suffix Words before practicing the three spelling-rule lists: Dropping Silent E, Doubling Final Consonants, and Changing Y to I. Multisyllabic Words, Homophones, and Root Word Families complete the bridge into Grade 4 morphology.",
    emptyStateLabel: "Third grade",
  },
  "4": {
    metaDescription:
      "Free 4th grade spelling word lists for multisyllabic academic words, advanced prefixes and suffixes, Greek and Latin roots, commonly confused words, and content vocabulary.",
    heroParagraphs: [
      "Here are free 4th grade spelling word lists covering everyday words, reading and writing vocabulary, multisyllabic academic words, advanced prefixes and suffixes, Greek and Latin roots, commonly confused words, and content-area vocabulary. All lists include audio support so students can hear each word read aloud before typing it.",
      "Fourth grade spelling is the expansion year after introductory morphology. Students move from basic prefixes, suffixes, and root families into longer academic words, derivational suffixes, advanced prefixes, and Greek and Latin roots that support reading across subjects.",
    ],
    guidanceBody:
      "Start with Everyday Words and Reading & Writing Words, then practice Multisyllabic Academic Words before moving into Advanced Prefixes, Advanced Suffixes, Latin Root Words, and Greek Root Words. Commonly Confused Words supports more accurate writing, while Academic & Content Words gathers high-value science and social studies vocabulary without splitting fourth grade into narrow topical lists.",
    emptyStateLabel: "Fourth grade",
  },
  "5": {
    metaDescription:
      "Free 5th grade spelling word lists for academic words, multisyllabic words, prefixes and suffixes, Greek and Latin word parts, spelling rules, science, civics, and math vocabulary.",
    heroParagraphs: [
      "Here are free 5th grade spelling word lists covering everyday and academic words, reading and writing vocabulary, opinion and argument words, multisyllabic academic words, prefix and suffix words, Greek and Latin word parts, spelling rules, commonly confused words, and science, social studies, civics, and math vocabulary. All lists include audio support so students can hear each word read aloud before typing it.",
      "Fifth grade is the capstone of elementary spelling. Students still need useful vocabulary, but they are also ready to use word parts, syllables, roots, suffix patterns, and careful word choice to spell longer words with confidence before middle school.",
    ],
    guidanceBody:
      "Start with Everyday Words and Academic Words for review, then use Reading & Writing Words and Opinion & Argument Words for ELA practice. Multisyllabic Academic Words, Prefix & Suffix Words, Greek & Latin Word Parts, Spelling Rules, and Commonly Confused Words form the Grade 5 word-study core. Science Words and Social Studies & Civics Words are the strongest content-area follow-ups; Math Vocabulary is available as a lower-priority extension when students need it.",
    emptyStateLabel: "Fifth grade",
  },
};
