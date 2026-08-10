import type { GradeCode } from './gradeConfig';
import type { GradeRouteClassification } from './canonicalGradeRoutes';

export interface GradeStrandGatewayFacts {
  memberCount: number;
  wordCount: number;
}

export interface GradeStrandGatewayCopy {
  orientation: string;
  synthesis: string;
  guidance?: string;
}

type GatewayCopyAuthor = (facts: GradeStrandGatewayFacts) => GradeStrandGatewayCopy;

const kindergartenGatewayCopy: Record<GradeRouteClassification, GatewayCopyAuthor> = {
  'core-spelling': ({ memberCount }) => ({
    orientation: `Kindergarten Core Spelling is the systematic starting sequence: ${memberCount} units move from familiar first words through short-vowel spelling, mixed CVC review, and consonant digraphs.`,
    synthesis:
      'The sequence first gives each short vowel its own focused practice, then asks children to distinguish those vowel sounds in fresh CVC words before introducing SH, CH, and TH.',
    guidance:
      'Begin with First Words if spelling from sounds is new. If simple short-vowel words are already comfortable, choose the earliest vowel unit that still feels useful and continue in order.',
  }),
  'high-frequency-words': ({ memberCount, wordCount }) => ({
    orientation: `Kindergarten High-Frequency Words brings together ${wordCount} commonly used spellings in ${memberCount} manageable sets.`,
    synthesis:
      'High-frequency describes how often a word is encountered or used; it does not mean that every word has an irregular spelling. Children can use sound–spelling information wherever it helps, while giving extra attention to any less-predictable detail in a word.',
    guidance:
      `The ${wordCount}-word inventory is divided into ${memberCount} sets so a child can work with a small group of spellings at a time.`,
  }),
  'themed-spelling-practice': ({ memberCount }) => ({
    orientation: `These ${memberCount} optional Kindergarten spelling-practice lists use familiar themes and are not a sequence.`,
    synthesis:
      'Animal, body, number, color, and family words each provide a recognizable context for additional spelling practice.',
    guidance:
      'Choose the theme that connects with what a child is interested in, reading about, or using in conversation. Each theme stands on its own, so there is no required order.',
  }),
};

const grade1GatewayCopy: Record<GradeRouteClassification, GatewayCopyAuthor> = {
  'core-spelling': ({ memberCount }) => ({
    orientation: `Grade 1 Core Spelling covers ${memberCount} ordered units: it consolidates one-syllable short-vowel and consonant spelling, moves into long-vowel spelling with silent e, open syllables, and vowel teams, adds the inflectional endings -s/-es and -ed/-ing, and closes with r-controlled vowels and the tch/dge ending rule.`,
    synthesis:
      'Early units stay with familiar short-vowel words while adding the c/k choice, the FLOSS rule, consonant digraphs, and beginning and ending blends. The sequence then pivots to long vowels — silent e, short open-syllable words and final y, then the ai/ay and oa/ow vowel teams — before returning to word endings and, finally, r-controlled vowels and the tch/dge rule.',
    guidance:
      'Begin at CVC Short Vowel Review and the C/K Rule. If that opening review is already secure, the FLOSS Rule or the Consonant Digraphs and Final -ck unit is a reasonable place to start — the blend, long-vowel, and ending units that follow still build on those, so continue in order from there rather than skipping ahead.',
  }),
  'high-frequency-words': ({ memberCount, wordCount }) => ({
    orientation: `Grade 1 High-Frequency Words organizes ${wordCount} spellings into ${memberCount} sets.`,
    synthesis:
      'High-frequency describes how often a word appears in reading and writing, not whether its spelling is irregular — many Grade 1 high-frequency words follow familiar sound-spelling patterns, while a smaller number have a specific detail worth extra attention. The sets build cumulatively, with the later sets introducing more of that less-predictable spelling detail than the earlier ones.',
    guidance: `Working through the ${memberCount} sets in order keeps the word count in each session manageable and matches the gradual rise in spelling difficulty across the inventory.`,
  }),
  'themed-spelling-practice': ({ memberCount }) => ({
    orientation: `These ${memberCount} optional Grade 1 spelling-practice lists use familiar themes and are not a sequence.`,
    synthesis:
      'Weather, clothing, shape, number, and day-of-the-week words each give a recognizable, real-world context for additional spelling practice alongside Core Spelling and High-Frequency Words.',
    guidance:
      'Choose the theme that matches what a child is currently talking about, reading, or encountering at school — the weather this week, getting dressed, a shape lesson, or the calendar. Each list stands on its own, so there is no required order.',
  }),
};

const grade2GatewayCopy: Record<GradeRouteClassification, GatewayCopyAuthor> = {
  'core-spelling': ({ memberCount }) => ({
    orientation: `2nd Grade Core Spelling continues the sequence with ${memberCount} units: vowel-team and diphthong spellings, r-controlled vowels, and soft c/soft g, followed by syllable-level and word-building patterns.`,
    synthesis:
      "The sequence opens with the vowel patterns that vary most in spelling — long e, long i, oi/oy, ou/ow, the two sounds of oo, au/aw, and r-controlled vowels — before moving into syllable structure: breaking two-syllable words into parts and recognizing the quiet final -le ending. It then turns to less predictable spellings, silent letters, and closes with words built from smaller words, compounds and contractions.",
    guidance:
      'Begin with Long E Vowel Teams if 2nd Grade Core Spelling is new. Comfort with one early vowel-team unit does not mean the later syllable, silent-letter, or word-building units can be skipped — each teaches a distinct spelling skill.',
  }),
  'high-frequency-words': ({ memberCount, wordCount }) => ({
    orientation: `2nd Grade High-Frequency Words brings together ${wordCount} commonly used spellings in ${memberCount} sets of 12 words each.`,
    synthesis:
      'High-frequency describes how often a word is encountered or used, not that every word has an irregular spelling. Children can rely on sound–spelling knowledge for most of each word, while a handful of less-predictable letters — in words such as people, again, and could — get focused, explicit attention. The sets build cumulatively, moving from shared spelling chunks like any/many and could/would toward vowel teams, syllable patterns, and compounds in later sets.',
    guidance: `The ${wordCount}-word inventory is divided into ${memberCount} sets of 12 so a child can work with one manageable group at a time.`,
  }),
  'themed-spelling-practice': ({ memberCount }) => ({
    orientation: `These ${memberCount} optional 2nd Grade spelling-practice lists use familiar real-world themes and are not a sequence.`,
    synthesis:
      'Transportation, money, community helpers, number words to 100, and the months of the year each provide a recognizable context for additional spelling practice.',
    guidance:
      'Choose the theme that matches what a child is reading, doing, or curious about. Each theme stands on its own, so there is no required order.',
  }),
};

const gatewayCopyByGrade: Partial<Record<GradeCode, Record<GradeRouteClassification, GatewayCopyAuthor>>> = {
  K: kindergartenGatewayCopy,
  '1': grade1GatewayCopy,
  '2': grade2GatewayCopy,
};

/** Returns authored gateway copy where available; Grades 3–5 continue to use the renderer fallback. */
export function getGradeStrandGatewayCopy(
  grade: GradeCode,
  strand: GradeRouteClassification,
  facts: GradeStrandGatewayFacts,
): GradeStrandGatewayCopy | undefined {
  const copyForGrade = gatewayCopyByGrade[grade];
  if (!copyForGrade) return undefined;
  return copyForGrade[strand](facts);
}

/**
 * Every HFW set's `description` opens by repeating its own title verbatim
 * (`{title} contrasts…`) — useful as a member-page summary, redundant one
 * line below the same title on a gateway card. Each set's `shortAnswer`
 * states the same differentiating content without the repeated title, and
 * is otherwise unused on HFW set pages (member pages only render
 * `shortAnswer` for Skill pages), so it's the right existing field to reuse
 * for the gateway card rather than transforming or duplicating `description`.
 */
export function getGatewayCardDescription(
  strand: GradeRouteClassification,
  description: string,
  shortAnswer: string | undefined,
): string {
  if (strand === 'high-frequency-words' && shortAnswer) return shortAnswer;
  return description;
}
