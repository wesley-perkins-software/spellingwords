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

const grade3GatewayCopy: Record<GradeRouteClassification, GatewayCopyAuthor> = {
  'core-spelling': ({ memberCount }) => ({
    orientation: `3rd Grade Core Spelling covers ${memberCount} ordered units: it opens with prefixes and suffixes as meaning-carrying word parts, adds the spelling changes a suffix can trigger, turns to possessive apostrophes, applies syllable-based strategies to longer words, and closes with homophones and an early look at root word families.`,
    synthesis:
      "Prefix Words and Suffix Words introduce word parts that attach to a base and change its meaning or use; Suffix Spelling Changes follows immediately after because it teaches what happens to that base — dropping a final e, doubling a consonant, or changing y to i — once a suffix is added. Possessive Words then isolates a separate apostrophe convention before the sequence turns to word length itself: Multisyllabic Words asks children to break down and rebuild longer words using that same base-and-part thinking. Homophones and Commonly Confused Words shifts to choosing the correct spelling by meaning rather than sound, and Root Word Families closes the sequence with recognizable roots — act, form, port, and sign — that anticipate the deeper Greek and Latin root study Grade 4 introduces.",
    guidance:
      'Begin with Prefix Words if adding word parts to a base is new. Suffix Words and Suffix Spelling Changes follow directly, since spelling a suffixed word correctly depends on the base-word habits those first two units build; the possessive, multisyllabic, homophone, and root-word-family units later in the sequence each teach a distinct skill, so continuing in order keeps that foundation in place.',
  }),
  'high-frequency-words': ({ memberCount, wordCount }) => ({
    orientation: `3rd Grade High-Frequency Words organizes ${wordCount} spellings into ${memberCount} sets of 12 words each.`,
    synthesis:
      'High-frequency describes how often a word is encountered or used, not that its spelling is irregular — most Grade 3 high-frequency words follow familiar sound-spelling patterns, and children can rely on that knowledge for much of each word. The sets build cumulatively: early sets emphasize recognizable smaller words and bases inside longer spellings, such as some+thing and with+out, while later sets add contractions, homophones such as weather and whether, and syllable-by-syllable organization for words such as remember and certain.',
    guidance: `Working through the ${memberCount} sets in order keeps the word count in each session manageable and matches the shift from base-and-part spelling in the early sets to contraction and homophone spelling in the later ones.`,
  }),
  'themed-spelling-practice': ({ memberCount }) => ({
    orientation: `These ${memberCount} optional 3rd Grade spelling-practice lists use familiar classroom and everyday themes and are not a sequence.`,
    synthesis:
      'Map-and-globe words, life-cycle words, and multiplication-and-division words connect to science and math work, while time words reflect a routine every classroom keeps. Each list develops spelling through the patterns its own words present — doubled consonants and soft g spellings in the map-and-globe set, a compound and contrasting c sounds in the life-cycle set, a silent letter and an apostrophe in the time set, and a shared base with contrasting endings in the multiplication-and-division set.',
    guidance:
      'Choose the theme that connects with what a child is currently reading, studying, or using in class. Each list stands on its own, so there is no required order.',
  }),
};

const grade4GatewayCopy: Record<GradeRouteClassification, GatewayCopyAuthor> = {
  'core-spelling': ({ memberCount }) => ({
    orientation: `4th Grade Core Spelling covers ${memberCount} ordered units: it opens with multisyllabic academic words drawn from across school subjects, moves into advanced prefixes and suffixes, adds Latin roots, and closes with commonly confused words and derived word families.`,
    synthesis:
      'Multisyllabic Academic Words establishes the syllable-and-part strategy the rest of the sequence relies on, using classroom vocabulary such as communicate, consequence, and organize. Advanced Prefix Words and Advanced Suffix Words then extend that strategy to specific word parts — anti-, inter-, sub-, super-, and trans- prefixes, and -able, -ible, -ous, -ive, -tion, and -sion suffixes — that recur across longer academic words. Latin Root Words follows with five roots (port, dict, spect, rupt, struct) that connect several of those same prefixes and suffixes to a stable root, continuing the root-family thread Grade 3 opened. The sequence then turns to two related but distinct skills: Commonly Confused Words asks children to choose a spelling by meaning, and Derived Words and Word Meaning shows how a family such as nation/national/nationality keeps its spelling stable even as pronunciation shifts.',
    guidance:
      'Begin with Multisyllabic Academic Words if spelling longer words syllable by syllable is still developing. The advanced prefix, suffix, and root-word units that follow build on that same strategy, so continuing in order keeps it in place before the commonly-confused and derived-word units, which teach different skills, later in the sequence.',
  }),
  'high-frequency-words': ({ memberCount, wordCount }) => ({
    orientation: `4th Grade High-Frequency Words organizes ${wordCount} spellings into ${memberCount} sets of 12 words each.`,
    synthesis:
      'High-frequency describes how often a word is encountered or used, not that its spelling is irregular. Set 1 connects words such as understand, happened, and known to a familiar base and ending, while giving focused attention to less-transparent vowels in important, possible, general, and several. Set 2 builds from familiar words and a related base in written, then distinguishes sound-alike spellings such as whether, though, and whole. The two sets build cumulatively, with Set 2 continuing the base-and-ending strategy Set 1 establishes.',
    guidance: `Working through both ${memberCount} sets in order keeps that base-and-ending strategy consistent across the full ${wordCount}-word inventory.`,
  }),
  'themed-spelling-practice': ({ memberCount }) => ({
    orientation: `These ${memberCount} optional 4th Grade spelling-practice lists use familiar school-subject themes and are not a sequence.`,
    synthesis:
      "Measurement and geometry words connect to math work, solar system words to science, and career and occupation words to biography and community writing. Each list develops spelling through its own words' patterns — shared vowel spellings and doubled consonants in the measurement set, multisyllabic organization and contrasting vowel sequences in the solar-system set, base-and-suffix relationships such as journal/journalist in the career set, and long words built from stable parts in the geometry set.",
    guidance:
      'Choose the theme that matches a subject a child is currently studying or curious about. Each list stands on its own, so there is no required order.',
  }),
};

const grade5GatewayCopy: Record<GradeRouteClassification, GatewayCopyAuthor> = {
  'core-spelling': ({ memberCount }) => ({
    orientation: `5th Grade Core Spelling covers ${memberCount} ordered units: it opens with multisyllabic academic words, combines prefixes and suffixes in a single unit, adds Greek and Latin word parts, and closes with commonly confused words and spelling changes across related word families.`,
    synthesis:
      'Multisyllabic Academic Words opens the sequence with twelve words that ask children to coordinate spoken syllables with meaningful written parts and endings. Prefix and Suffix Words then combines both word-part types in one unit — inter-, trans-, super-, and sub- prefixes alongside -ive, -ible, -ity, -ous, and -ment suffixes — including the spelling changes that happen at the join. Greek and Latin Word Parts extends that same word-part strategy to recurring roots such as photo, graph, tele, port, struct, spect, dict, script, and rupt, continuing directly from the Latin roots Grade 4 introduced. The sequence closes with two related skills: Commonly Confused Words asks children to use brief sentence context to choose the intended word among pairs such as desert/dessert and affect/effect, and Spelling Changes in Related Words shows how a family such as critic/critical/criticism keeps recognizable spelling even as pronunciation or the suffix join shifts.',
    guidance:
      'Begin with Multisyllabic Academic Words if coordinating syllables and word parts in longer words is still developing. Prefix and Suffix Words and Greek and Latin Word Parts follow directly, since they extend that same word-part strategy; the commonly-confused and related-word units later in the sequence teach different skills, so continuing in order keeps that foundation in place.',
  }),
  'high-frequency-words': ({ memberCount, wordCount }) => ({
    orientation: `5th Grade High-Frequency Words organizes ${wordCount} spellings into ${memberCount} sets of 12 words each.`,
    synthesis:
      'High-frequency still describes how often a word is encountered or used, not that its spelling is irregular. Set 1 uses genuine word parts and related forms to secure government, information, attention, and beautiful, along with written syllables that preserve weakly heard vowels in business, language, and interest. Set 2 keeps a base visible before its ending in action, suddenly, and natural, then gives focused attention to piece, effect, suppose, and experience. The two sets build cumulatively, carrying the same base-and-ending and syllable reasoning from Set 1 into Set 2.',
    guidance: `Working through both ${memberCount} sets in order keeps that reasoning consistent across the full ${wordCount}-word inventory.`,
  }),
  'themed-spelling-practice': ({ memberCount }) => ({
    orientation: `These ${memberCount} optional 5th Grade spelling-practice lists use increasingly academic subject-area themes and are not a sequence.`,
    synthesis:
      "Money-management and civics words connect to real-world and social-studies contexts, while ecosystem and fraction-and-decimal words connect to science and math work. Each list develops spelling through its own words' patterns — meaningful word parts and shared endings such as income/withdraw and expense/deposit in the money-management set, multisyllabic organization and an unusual ey spelling in prey in the ecosystem set, a related pair in numerator/denominator and a built-up ending in hundredths in the fraction-and-decimal set, and genuine bases and suffixes such as amend/amendment in the civics set.",
    guidance:
      'Choose the theme that matches a subject a child is currently studying or curious about. Each list stands on its own, so there is no required order.',
  }),
};

const gatewayCopyByGrade: Partial<Record<GradeCode, Record<GradeRouteClassification, GatewayCopyAuthor>>> = {
  K: kindergartenGatewayCopy,
  '1': grade1GatewayCopy,
  '2': grade2GatewayCopy,
  '3': grade3GatewayCopy,
  '4': grade4GatewayCopy,
  '5': grade5GatewayCopy,
};

/** Returns authored gateway copy for every K–5 grade; the renderer fallback now only applies to a grade+strand missing from this map (there is none as of the Grade 3–5 rollout). */
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
