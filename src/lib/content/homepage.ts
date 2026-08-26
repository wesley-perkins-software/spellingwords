import { gradeConfig, type GradeCode } from './gradeConfig';
import { getCanonicalSkillRoutes } from './canonicalSkillRoutes';
import { SPELLING_SKILL_FAMILIES } from './spellingSkills';

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

/** Real, programmatically sourced count of canonical Skill families. */
export const HOMEPAGE_SKILL_FAMILY_COUNT = SPELLING_SKILL_FAMILIES.length;

/**
 * Representative Skill concepts named as plain text on the homepage,
 * spanning the K–5 difficulty range (early skills through late-elementary
 * skills) per docs/content/CANONICAL_HOMEPAGE_STANDARD.md §5.3.
 */
export const HOMEPAGE_REPRESENTATIVE_SKILLS = [
  'Short Vowels',
  'Consonant Digraphs',
  'Silent E',
  'Vowel Teams',
  'R-Controlled Vowels',
  'Word Building and Endings',
  'Prefixes',
  'Greek and Latin Roots',
  'Homophones and Commonly Confused Words',
] as const;

/**
 * "How the K-5 curriculum is organized" section content. Compressed under
 * the V4 reopening pass of docs/content/CANONICAL_HOMEPAGE_STANDARD.md
 * §5.2a/§9: /curriculum now owns the full per-strand explanation, so the
 * homepage states each strand's name and one-clause role rather than a full
 * definition and example list — enough to orient a first-time visitor
 * without duplicating a page that already does this better. Each strand's
 * name links to its cross-grade top-level gateway (2026-08-21 amendment,
 * unaffected by V4).
 */
export const HOMEPAGE_STRANDS = [
  {
    name: 'Core Spelling',
    href: '/core-spelling',
    role: 'is the main grade-by-grade sequence',
  },
  {
    name: 'High-Frequency Words',
    href: '/high-frequency-words',
    role: 'are common words practiced alongside it',
  },
  {
    name: 'Themed Spelling Practice',
    href: '/themed-spelling-practice',
    role: 'is optional extra practice built around familiar topics',
  },
] as const;

/**
 * The structured-organization claim (leads, per §6) plus the
 * free/no-account/no-gamification facts, a compact audience mention, and a
 * brief U.S.-curriculum-positioning clause — merged under the V4 reopening
 * pass into one closing trust paragraph. The former standalone Progression
 * section (three stage cards) and the longer per-audience copy are removed:
 * /grades already owns the full K–5 developmental progression and /about
 * already owns the fuller per-audience orientation, both more thoroughly
 * than the homepage's compressed restatement did — see
 * CANONICAL_HOMEPAGE_STANDARD.md's V4 pass for the full rationale.
 */
export const HOMEPAGE_CLOSING_STATEMENT =
  "SpellingWords.app is built from real, distinct categories of spelling knowledge — Core Spelling's grade-by-grade progression, High-Frequency Words, Themed practice, and grade-independent Skills — not an arbitrary or unstructured word list, and it's grounded in the spelling knowledge commonly expected across U.S. elementary education. It's free to use, with no account, login, or personal information required, and no timers, points, streaks, or competitive mechanics — just calm, focused practice for students, with an organized path for parents and teachers to follow alongside them.";

/**
 * Homepage FAQ. Trimmed under the V4 reopening pass of §5.5/§9 from 6 to 2
 * questions: the four removed questions each restated explanation a deeper
 * canonical page already owns more fully (the site-organization question
 * duplicated the Curriculum-Organization section and /curriculum; the
 * High-Frequency Words question duplicated the strand mention immediately
 * above it and /high-frequency-words; the U.S.-positioning question
 * duplicated /curriculum's own boundaries section; the "can I practice my
 * own words" question restated what the hero interaction already shows).
 * The two kept questions are genuine routing/orientation questions, not
 * curriculum explanation. Kept in sync with homepageFaqJsonLd below.
 */
export const HOMEPAGE_FAQ = [
  {
    question: 'What spelling words should my child practice?',
    answer:
      "Start with your child's Grade Hub, which lays out Core Spelling in order alongside High-Frequency Words and Themed practice — or, if you already know the specific pattern they need, like silent e or prefixes, go straight to that Skill page.",
  },
  {
    question: 'What is the difference between browsing by Grade and browsing by Skill?',
    answer:
      'Browse by Grade to follow the structured K–5 spelling curriculum and practice the word lists taught at each grade. Browse by Skill when you want to focus on a specific spelling concept — such as short vowels, silent e, vowel teams, prefixes, or homophones — regardless of grade.',
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
