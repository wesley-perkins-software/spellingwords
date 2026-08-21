import { gradeConfig, type GradeCode } from './gradeConfig';
import { getCanonicalSkillRoutes } from './canonicalSkillRoutes';

export const HOMEPAGE_URL = 'https://spellingwords.app/';

/**
 * Editorial description per grade, verified against the canonical K–5 Grade
 * Unit curriculum (docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md) —
 * each teaser names that grade's actual Grade Units, not an invented phrase.
 * Not derived algorithmically. Expanded under the V3 reopening pass of
 * docs/content/CANONICAL_HOMEPAGE_STANDARD.md §5.2 (richer per-grade
 * teasers); see that document's Appendix for the earlier one-sentence copy
 * this supersedes.
 */
const HOMEPAGE_GRADE_TEASERS: Record<GradeCode, string> = {
  K: 'Builds the foundation of spelling: matching sounds to letters, spelling simple one-syllable words with short vowels, and learning the first high-frequency words that appear everywhere in early reading and writing.',
  '1': 'Strengthens one-syllable spelling with consonant blends and digraphs, then introduces the first long-vowel system (silent e), common vowel teams, word endings, and early two-syllable words.',
  '2': 'Expands vowel knowledge with r-controlled vowels and less-common vowel patterns, formalizes syllable types for spelling longer words, and adds silent letters and ending spelling patterns.',
  '3': 'Introduces prefixes and suffixes as meaningful word parts, the spelling-change rules that come with adding them, plural and possessive endings, and choosing correctly among words that sound alike.',
  '4': 'Introduces Greek and Latin roots, advanced multisyllabic spelling, and how related words share spelling and meaning — the first sustained use of word parts to spell longer academic words.',
  '5': 'Brings sound, syllable, pattern, and word-part knowledge together for advanced roots and affixes, spelling changes across related words, and meaning-based choices in increasingly academic vocabulary.',
};

/**
 * Optional scan-friendly "focus" line per grade — a short list of that
 * grade's most recognizable concepts, not a restatement of the teaser.
 * Added under the same V3 pass; kept to a handful of terms so it stays
 * legible as a single line on a 375px grade card.
 */
const HOMEPAGE_GRADE_FOCUS: Record<GradeCode, string> = {
  K: 'Sounds & letters · Short vowels · First high-frequency words',
  '1': 'Blends & digraphs · Silent e · Vowel teams',
  '2': 'R-controlled vowels · Syllable types · Silent letters',
  '3': 'Prefixes & suffixes · Spelling changes · Homophones',
  '4': 'Greek & Latin roots · Multisyllabic words · Word families',
  '5': 'Advanced roots & affixes · Related-word changes · Academic spelling',
};

export const homepageGradeHubs = gradeConfig.map(({ grade, label, hubHref }) => ({
  label,
  href: hubHref,
  teaser: HOMEPAGE_GRADE_TEASERS[grade],
  focus: HOMEPAGE_GRADE_FOCUS[grade],
}));

/** Real, programmatically sourced count of canonical Skill pages. */
export const HOMEPAGE_SKILL_COUNT = getCanonicalSkillRoutes().length;

/**
 * Representative Skill concepts named as plain text on the homepage,
 * spanning the K–5 difficulty range (early skills through late-elementary
 * skills) per docs/content/CANONICAL_HOMEPAGE_STANDARD.md §5.3.
 */
export const HOMEPAGE_REPRESENTATIVE_SKILLS = [
  'short vowels',
  'silent e',
  'prefixes',
  'suffixes',
  'Greek and Latin roots',
  'homophones',
] as const;

/**
 * "How the K-5 curriculum is organized" section content — added under the
 * V3 reopening pass of docs/content/CANONICAL_HOMEPAGE_STANDARD.md §3/§9,
 * which previously barred any strand explanation on the homepage. Each
 * strand gets one short, accurate definition; example concepts are real
 * (drawn from actual canonical Skill/content names, not invented) and are
 * rendered as plain, non-hyperlinked text per §7 (unchanged, not reopened).
 */
export const HOMEPAGE_STRANDS = [
  {
    name: 'Core Spelling',
    definition:
      "Core Spelling is the main sequence for each grade — units ordered around the spelling concepts students are ready to practice, moving from sound-letter patterns toward syllables, word parts, and increasingly complex words.",
    examples: ['Short vowels', 'Silent e', 'Vowel teams', 'Suffixes', 'Greek and Latin roots'],
  },
  {
    name: 'High-Frequency Words',
    definition:
      "High-Frequency Words are spellings students meet often in reading and writing. Grouped into grade-level sets and practiced alongside Core Spelling, they get attention to both predictable sound-spelling patterns and the specific details worth extra notice — so common words become accurate and automatic, not just memorized as exceptions.",
    examples: ['the', 'you', 'over', 'were'],
  },
  {
    name: 'Themed Spelling Practice',
    definition:
      'Themed Spelling Practice offers optional grade-level lists built around topics students already know from school and everyday life — useful additional practice, not part of the required Core sequence.',
    examples: ['Animals', 'Colors', 'Weather', 'Careers', 'Measurement'],
  },
] as const;

/**
 * "How spelling develops from Kindergarten through 5th Grade" — a 3-stage
 * model grouping the Constitution §6 nine-point U.S. consensus list
 * (docs/architecture/CONSTITUTION.md), plus the U.S.-positioning statement
 * folded into this section per the V3 reopening pass (rather than as a
 * separate section) to avoid repeating "this is a real, structured
 * curriculum" a third time on the page.
 */
export const HOMEPAGE_PROGRESSION_STAGES = [
  {
    grades: 'Kindergarten–Grade 1',
    label: 'Foundation',
    description:
      'Matching sounds to letters, spelling simple one-syllable words, short vowels, consonant patterns, and the first long-vowel spellings.',
  },
  {
    grades: 'Grades 2–3',
    label: 'Expansion',
    description:
      'Broader vowel patterns, syllable structure, word endings, prefixes and suffixes, and early multisyllabic spelling.',
  },
  {
    grades: 'Grades 4–5',
    label: 'Integration',
    description:
      'Morphology, roots and affixes, spelling changes across related words, and meaning-based choices in academic vocabulary.',
  },
] as const;

export const HOMEPAGE_PROGRESSION_NOTE =
  "Spelling development isn't simply a march from easy words to harder words — students gradually learn to use several kinds of information together: sounds, letter patterns, syllables, meaningful word parts, and relationships among words.";

/**
 * Defensible U.S.-curriculum positioning, grounded in
 * docs/architecture/CONSTITUTION.md §6 ("broad U.S. consensus... without
 * copying one commercial curriculum... no single national scope and
 * sequence exists"). Deliberately avoids any "aligned with all U.S.
 * standards" or equivalent absolute claim.
 */
export const HOMEPAGE_US_POSITIONING =
  "This progression is designed around the spelling knowledge and grade-level progression commonly expected across U.S. elementary education — drawing on broad agreement among state standards and respected curricula about how spelling develops. No single national scope and sequence exists, and SpellingWords.app doesn't copy any one commercial curriculum; the goal is a coherent, defensible K–5 sequence, not a claim of alignment with a particular standard.";

/**
 * "Built for students, parents, and teachers" — compact per-audience copy.
 * Added under the V3 reopening pass of §9 (previously barred outright as
 * "audience-segmented" content). The closing structured-organization and
 * free/no-account/no-gamification facts, formerly their own standalone
 * section, are folded into HOMEPAGE_CLOSING_STATEMENT below per §6's
 * revised structural requirement.
 */
export const HOMEPAGE_AUDIENCES = [
  {
    label: 'Students',
    description: 'Focused word lists, calm practice, and clear explanations of what each spelling pattern is and why it matters.',
  },
  {
    label: 'Parents',
    description: "An organized grade-level path, plus guidance on what your child is practicing and why — so you can support spelling at home without guesswork.",
  },
  {
    label: 'Teachers',
    description: 'Grade-level word lists and focused Skill references that can complement classroom spelling instruction and give students extra practice.',
  },
] as const;

/**
 * The structured-organization claim (leads, per §6) plus the
 * free/no-account/no-gamification facts, relocated here from the old
 * standalone "More than a list of spelling words" closing panel.
 */
export const HOMEPAGE_CLOSING_STATEMENT =
  "SpellingWords.app is built from real, distinct categories of spelling knowledge — Core Spelling's grade-by-grade progression, High-Frequency Words, Themed practice, and grade-independent Skill references — not an arbitrary or unstructured word list. It's free to use, with no account, login, or personal information required, and no timers, points, streaks, or competitive mechanics — just calm, focused practice.";

/**
 * Homepage FAQ — added under the V3 reopening pass of §8/§9 (previously
 * barred outright). 6 genuinely useful questions, not schema filler; kept
 * in sync with homepageFaqJsonLd below.
 */
export const HOMEPAGE_FAQ = [
  {
    question: 'What spelling words should my child practice?',
    answer:
      "Start with your child's Grade Hub, which lays out Core Spelling in order alongside High-Frequency Words and Themed practice — or, if you already know the specific pattern they need, like silent e or prefixes, go straight to that Skill page.",
  },
  {
    question: 'How is SpellingWords.app organized?',
    answer:
      'Each grade, Kindergarten through 5th, is organized into three strands: Core Spelling, the main sequence; High-Frequency Words, practiced alongside it; and Themed Spelling Practice, optional extra practice. Alongside the grade path, 41 canonical Skill pages explain individual spelling concepts independent of grade, and you can always practice a custom list of your own words.',
  },
  {
    question: 'What is the difference between browsing by Grade and browsing by Skill?',
    answer:
      'Browse by Grade to follow the structured K–5 spelling curriculum and practice the word lists taught at each grade. Browse by Skill when you want to focus on a specific spelling concept — such as short vowels, silent e, vowel teams, prefixes, or homophones — regardless of grade.',
  },
  {
    question: 'What are High-Frequency Words?',
    answer:
      "Spellings students meet often in reading and writing. They're not the same as \"irregular\" words — some are entirely predictable from common spelling patterns, others need extra attention — and they're practiced alongside Core Spelling, not instead of it.",
  },
  {
    question: 'Is SpellingWords.app designed for U.S. elementary students?',
    answer:
      'Yes. The K–5 curriculum is designed around the spelling knowledge and grade-level progression commonly expected across U.S. elementary education, though no single national standard exists and the site does not claim alignment with one particular set of standards.',
  },
  {
    question: 'Can I practice my own spelling words?',
    answer: 'Yes — enter or paste any list of words on the homepage and start practicing immediately, no account required.',
  },
] as const;

export const homepageFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOMEPAGE_FAQ.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
} satisfies Record<string, unknown>;

export const homepageJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SpellingWords.app',
    url: HOMEPAGE_URL,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Spelling practice by grade',
    itemListElement: homepageGradeHubs.map((grade, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: grade.label,
      url: new URL(grade.href, HOMEPAGE_URL).href,
    })),
  },
] satisfies Record<string, unknown>[];
