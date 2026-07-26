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
      "Free 3rd grade spelling word lists with a seven-step Core Spelling route through prefixes, suffixes, suffix spelling changes, possessives, multisyllabic words, homophones, and root word families, plus five cumulative high-frequency-word sets.",
    heroParagraphs: [
      "Use Core Spelling for the Grade 3 route: prefixes, suffixes, the spelling changes suffixes trigger, possessives, longer multisyllabic words, and homophones and commonly confused words. All lists include audio support so students can hear each word before typing it.",
      "Third grade spelling is the bridge from phonics into morphology. Students build on the word-part knowledge from Grade 1 and Grade 2 to study prefixes, suffixes, suffix spelling changes, apostrophe conventions, longer words, and meaning-based spelling choices. High-Frequency Words adds five cumulative sets of everyday writing words and persistent trouble words with Heart Word support for unexpected parts.",
    ],
    guidanceBody:
      "Start with Core Spelling and move through the seven steps in order — Prefixes and Suffixes come first because the spelling-change, possessive, and multisyllabic-word lessons that follow all depend on them. Root Word Families closes the sequence and previews the Greek and Latin root study that begins in Grade 4. Use the Grade 3 High-Frequency Words sets alongside the route for the writing words your child needs right now.",
    emptyStateLabel: "Third grade",
  },
  "4": {
    metaDescription:
      "Free 4th grade spelling word lists with a six-step Core Spelling route through advanced multisyllabic words, advanced prefixes, advanced suffixes and final stable syllables, Greek and Latin roots, commonly confused words, and derived words and word meaning, plus four high-frequency-word sets and customary measurement words.",
    heroParagraphs: [
      "Use Core Spelling for the Grade 4 route: advanced multisyllabic words, advanced prefixes, advanced suffixes and final stable syllables, Greek and Latin roots, commonly confused words, and derived words and word meaning. All lists include audio support so students can hear each word before typing it.",
      "Fourth grade spelling is the expansion year after introductory morphology. Students move from basic prefixes, suffixes, and root families into longer academic words, advanced affixes, the final stable syllables that complete common word endings, formal Greek and Latin root study, and the derived-word families that connect spelling and meaning across a base word. High-Frequency Words adds four narrower, corrective sets for silent letters, doubled consonants, unstressed vowels, and confusable connecting words, while Additional Practice offers customary measurement words.",
    ],
    guidanceBody:
      "Start with Core Spelling and move through the six steps in order — Advanced Multisyllabic Words and Advanced Prefixes come first because the suffix, root, and confusable-word lessons that follow all build on them. Advanced Suffixes and Final Stable Syllables leads into Greek and Latin Roots, since recognizing a stable ending is part of the same skill as recognizing a root inside a longer word. Derived Words and Word Meaning closes the sequence and previews the related-word study that continues in Grade 5. Use the Grade 4 High-Frequency Words sets alongside the route for words your child still needs to nail down, and reach for Measurement Words whenever measurement vocabulary comes up in math.",
    emptyStateLabel: "Fourth grade",
  },
  "5": {
    metaDescription:
      "Free 5th grade spelling word lists with a five-step Core Spelling route through advanced multisyllabic academic words, advanced prefixes and suffixes, Greek and Latin word parts, commonly confused words, and spelling changes in related words, plus four high-frequency-word sets.",
    heroParagraphs: [
      "Use Core Spelling for the Grade 5 route: advanced multisyllabic academic words, advanced prefixes and suffixes, Greek and Latin word parts, commonly confused words, and spelling changes in related words. All lists include audio support so students can hear each word before typing it.",
      "Fifth grade is the capstone of elementary spelling. Students bring together the roots, affixes, syllables, and careful word choice built up since Grade 3, then use meaning and word-family knowledge — not sound alone — to spell longer, more academic words with confidence before middle school. High-Frequency Words adds four narrower, corrective sets for silent or hidden letters, doubled letters, unstressed vowels, and the editing and connecting words longer writing calls for.",
    ],
    guidanceBody:
      "Start with Core Spelling and move through the five steps in order — Advanced Multisyllabic Academic Words comes first because the prefix, suffix, and root lessons that follow all build on it. Advanced Prefixes and Suffixes leads into Greek and Latin Word Parts, since recognizing a stable suffix ending is part of the same skill as recognizing a word part inside a longer word. Commonly Confused Words checks accuracy before Spelling Changes in Related Words closes the sequence, bringing every earlier skill together into one integrated capstone for middle school. Use the Grade 5 High-Frequency Words sets alongside the route for words your child still needs to nail down before middle school.",
    emptyStateLabel: "Fifth grade",
  },
};
