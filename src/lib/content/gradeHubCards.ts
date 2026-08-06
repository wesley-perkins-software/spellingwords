import type { SpellingListEntry } from "./spellingLists";
import { getCanonicalListPath, isCanonicalGradeCurriculumId } from './canonicalGradeRoutes';

export type GradeHubCard = {
  id: string;
  href: string;
  title: string;
  description: string;
  category: string;
  badge?: string;
  difficulty?: string;
  durationMinutes?: number;
  wordCount?: number;
};

type CardDefinition = {
  id: string;
  /** Hub-only display override. Core cards normally omit this and use content frontmatter. */
  title?: string;
  description: string;
  badge?: string;
  kind: "list";
};

export type GradeHubSection = {
  title: string;
  summary?: string;
  cards: GradeHubCard[];
};

export type CoreHubTitleOverride = {
  title: string;
  rationale: string;
};

/**
 * Reviewed exceptions to the canonical-title default. Keep this small: every
 * entry must explain why exact canonical wording would be worse on a Hub card.
 */
export const CORE_HUB_TITLE_OVERRIDES: Readonly<Record<string, CoreHubTitleOverride>> = {};

export const KINDERGARTEN_HUB_SECTIONS: readonly {
  title: string;
  summary?: string;
  cards: readonly CardDefinition[];
}[] = [
  {
    title: "Core Spelling",
    cards: [
      {
        id: "kindergarten-first-words",
        description:
          "Start with eight familiar, sound-out words that help a child connect spoken sounds to letters before concentrating on one vowel pattern.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "kindergarten-short-a-words",
        description:
          "Practice short-a CVC words as the first focused vowel step.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "kindergarten-short-i-words",
        description: "Continue the sequence with short-i CVC words.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "kindergarten-short-o-words",
        description: "Practice the short-o vowel sound in simple words.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "kindergarten-short-u-words",
        description: "Practice the short-u vowel sound in simple words.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "kindergarten-short-e-words",
        description:
          "Finish the focused short-vowel sequence with short-e words.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "kindergarten-mixed-vowel-review",
        description:
          "Check whether a child can choose among short vowels instead of relying on one list pattern.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "kindergarten-consonant-digraphs",
        description:
          "Try common two-letter consonant sounds after CVC work; this is a preview, not a required kindergarten milestone.",
        badge: "Grade Unit",
        kind: "list",
      },
    ],
  },
  {
    title: "High-Frequency Words",
    summary:
      "4 sets · 40 words · Common kindergarten sight words taught with phonics and Heart Word guidance for unexpected spelling parts.",
    cards: [
      {
        id: "kindergarten-common-words-1",
        title: "Kindergarten High-Frequency Words 1",
        description:
          "Start with common kindergarten sight words and use the sounds that work before learning small unexpected parts by heart.",
        badge: "High-Frequency Words",
        kind: "list",
      },
      {
        id: "kindergarten-common-words-2",
        title: "Kindergarten High-Frequency Words 2",
        description:
          "Continue with useful writing words, using phonics first and Heart Word guidance for the tricky parts.",
        badge: "High-Frequency Words",
        kind: "list",
      },
      {
        id: "kindergarten-common-words-3",
        title: "Kindergarten High-Frequency Words 3",
        description:
          "Practice high-use words for early sentences, stories, and classroom writing.",
        badge: "High-Frequency Words",
        kind: "list",
      },
      {
        id: "kindergarten-common-words-4",
        title: "Kindergarten High-Frequency Words 4",
        description:
          "Finish the sequence with common words for questions, counting, and simple stories.",
        badge: "High-Frequency Words",
        kind: "list",
      },
    ],
  },
  {
    title: "Additional Practice",
    cards: [
      {
        id: "kindergarten-animal-words",
        title: "Animal Words",
        description:
          "Practice concrete animal names while applying early sound-to-letter knowledge.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "kindergarten-body-words",
        title: "Body Words",
        description:
          "Practice everyday body-part words like eyes, hand, and foot.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "kindergarten-number-words",
        title: "Number Words",
        description:
          "Practice the number words one through ten for kindergarten counting and classroom routines.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "kindergarten-color-words",
        title: "Color Words",
        description:
          "Practice familiar color spellings for art, sorting, books, and everyday classroom talk.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "kindergarten-family-words",
        title: "Family Words",
        description:
          "Practice warm, familiar words for the people closest to a kindergartener.",
        badge: "Vocabulary",
        kind: "list",
      },
    ],
  },
];

export const GRADE_1_HUB_SECTIONS: readonly {
  title: string;
  summary?: string;
  cards: readonly CardDefinition[];
}[] = [
  {
    title: "Core Spelling",
    cards: [
      {
        id: "grade-1-cvc-short-vowels-c-k-rule",
        description:
          "Refresh short vowels and learn when the /k/ sound is usually spelled c or k.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-floss-rule",
        description:
          "Learn a useful short-vowel ending pattern with doubled f, l, s, or z.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-consonant-digraphs-final-ck",
        description:
          "Practice common two-letter consonant spellings and the -ck ending after a short vowel.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-beginning-consonant-blends",
        description:
          "Spell words that begin with two consonant sounds, such as bl- and st-.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-ending-consonant-blends",
        description:
          "Spell words that end with two consonant sounds, such as -nd and -mp.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-long-vowels-silent-e",
        description:
          "Learn how a final silent e can change a vowel sound in a one-syllable word.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-open-syllables-final-y",
        description:
          "Notice short words where an open syllable or final y makes the vowel sound long.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-long-a-long-o-vowel-teams",
        description:
          "Learn common vowel teams that spell long-vowel sounds, then choose a focused pattern when needed.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-inflectional-endings-s-es",
        description:
          "Spell common plural endings in words children use in everyday writing.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-inflectional-endings-ed-ing",
        description:
          "Add common verb endings while keeping the base word readable and spellable.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-r-controlled-ar-or",
        description:
          "Practice vowel sounds changed by r, then use a focused pattern page for extra help.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-tch-dge-ending-rules",
        description:
          "Learn useful endings for final /ch/ and /j/ after a short vowel.",
        badge: "Grade Unit",
        kind: "list",
      },
    ],
  },
  {
    title: "High-Frequency Words",
    summary:
      "6 sets · 72 words · Common Grade 1 writing words taught with phonics and Heart Word guidance for unexpected spelling parts.",
    cards: [
      {
        id: "grade-1-common-words-1",
        title: "Grade 1 Common Words 1",
        description:
          "Begin with useful words for sentences, directions, and everyday writing.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-1-common-words-2",
        title: "Grade 1 Common Words 2",
        description:
          "Continue with words for stories, questions, and classroom writing.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-1-common-words-3",
        title: "Grade 1 Common Words 3",
        description:
          "Build longer sentences with joining words, pronouns, and helping words.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-1-common-words-4",
        title: "Grade 1 Common Words 4",
        description:
          "Practice words for questions, comparisons, explanations, and reasons.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-1-common-words-5",
        title: "Grade 1 Common Words 5",
        description:
          "Use common place, movement, time, and sequence words in writing.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-1-common-words-6",
        title: "Grade 1 Common Words 6",
        description:
          "Finish with flexible words for choices, explanations, opinions, and stories.",
        badge: "Common Words",
        kind: "list",
      },
    ],
  },
  {
    title: "Additional Practice",
    cards: [
      { id: "grade-1-weather-words", title: "Weather Words", description: "Practice spelling everyday weather words like sunny, rainy, and cloudy.", badge: "Vocabulary", kind: "list" },
      { id: "grade-1-clothing-words", title: "Clothing Words", description: "Practice spelling everyday clothing words like shirt, pants, and jacket.", badge: "Vocabulary", kind: "list" },
      { id: "grade-1-shape-words", title: "Shape Words", description: "Practice spelling common shape names like circle, square, and triangle.", badge: "Vocabulary", kind: "list" },
      { id: "grade-1-number-words-11-20", title: "Number Words 11–20", description: "Practice spelling the number words eleven through twenty.", badge: "Vocabulary", kind: "list" },
      { id: "grade-1-days-of-the-week", title: "Days of the Week", description: "Practice spelling and capitalizing all seven days of the week.", badge: "Vocabulary", kind: "list" },
    ],
  },
];

export const GRADE_2_HUB_SECTIONS: readonly {
  title: string;
  summary?: string;
  cards: readonly CardDefinition[];
}[] = [
  {
    title: "Core Spelling",
    cards: [
      {
        id: "grade-2-long-e-ee-ea",
        description:
          "Practice two common ways to spell long e in words such as feet, team, and beach.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-2-long-i-ie-igh",
        description:
          "Extend long-i spelling with final ie in pie and the igh pattern in night and light.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "vowel-teams-oi-oy",
        description:
          "Learn the two ways to spell the vowel sound in boy and coin, and when each spelling is used.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "vowel-teams-ou-ow",
        description:
          "Practice the sound in out and cow, where two spellings share one sound with no position rule.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-2-oo-two-sounds",
        description:
          "Learn the same two letters that spell two different sounds, in moon and in book.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-2-au-aw-words",
        description:
          "Practice the vowel sound in saw and because, and where each spelling belongs in a word.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-2-r-controlled-er-ir-ur",
        description:
          "Complete the basic r-controlled vowel set with the spellings in her, bird, and turn.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-2-soft-c-soft-g",
        description:
          "Learn why c sounds like /s/ in city and g sounds like /j/ in page.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-2-two-syllable-words",
        description:
          "Break longer words into two beats so a child can spell them one syllable at a time.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-2-final-stable-le",
        description:
          "Practice the quiet ending in little and table, where the last beat has no vowel sound you can hear.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-2-silent-letter-words",
        description:
          "Spell words with letters you write but never say, like knee, write, and thumb.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-2-list-02",
        description:
          "Spell big words by finding the two small words inside them, like sun and shine.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-2-contractions",
        description:
          "Join two words into one with an apostrophe, and know which letters it replaces.",
        badge: "Grade Unit",
        kind: "list",
      },
    ],
  },
  {
    title: "High-Frequency Words",
    summary:
      "6 sets · 72 words · Common Grade 2 writing words taught with phonics and Heart Word guidance for unexpected spelling parts.",
    cards: [
      {
        id: "grade-2-common-words-1",
        title: "Grade 2 Common Words 1",
        description:
          "Begin with the words that hold second-grade sentences together.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-2-common-words-2",
        title: "Grade 2 Common Words 2",
        description:
          "Practice the verbs children need to write about what already happened.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-2-common-words-3",
        title: "Grade 2 Common Words 3",
        description:
          "Spell the school and reading words used in everyday classroom writing.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-2-common-words-4",
        title: "Grade 2 Common Words 4",
        description:
          "Practice words for family, friends, and the people in a child's stories.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-2-common-words-5",
        title: "Grade 2 Common Words 5",
        description:
          "Use describing and comparing words that go beyond big and good.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-2-common-words-6",
        title: "Grade 2 Common Words 6",
        description:
          "Finish with the words children use to choose, compare, and explain.",
        badge: "Common Words",
        kind: "list",
      },
    ],
  },
  {
    title: "Additional Practice",
    cards: [
      {
        id: "grade-2-transportation-words",
        title: "Transportation Words",
        description:
          "Practice spelling everyday transportation words like car, bus, and bicycle.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "grade-2-money-words",
        title: "Money Words",
        description:
          "Practice the coin and dollar words second graders meet in math word problems.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "grade-2-number-words-20-100",
        title: "Number Words 20–100",
        description:
          "Spell the eight number words that build every number from twenty to one hundred.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "grade-2-community-helpers",
        title: "Community Helpers",
        description:
          "Practice spelling community helper words like doctor, firefighter, and librarian.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "grade-2-months-of-the-year",
        title: "Months of the Year",
        description: "Spell and capitalize all twelve months.",
        badge: "Vocabulary",
        kind: "list",
      },
    ],
  },
];

/**
 * Grade 3 hub — Core Spelling, High-Frequency Words, and Additional Practice.
 * An earlier pass rejected Calendar Words, Clothing Words, and Transportation
 * Words for Grade 3 specifically (see `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md`
 * Section 7) and shipped with no Additional Practice section. A later editorial
 * pass revisited the bar — a topic no longer needs to trace to a named academic
 * standard, only to be a recognizable, bounded, non-duplicative theme — and
 * approved four new Grade 3 topics under that revised philosophy: Map & Globe
 * Words, Life Cycle Words, Time Words, and Multiplication & Division Words.
 */
export const GRADE_3_HUB_SECTIONS: readonly {
  title: string;
  summary?: string;
  cards: readonly CardDefinition[];
}[] = [
  {
    title: "Core Spelling",
    cards: [
      {
        id: "grade-3-prefix-words",
        description:
          "Learn common prefixes such as un-, re-, pre-, dis-, and mis- that come before a base word and change its meaning.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-3-suffix-words",
        description:
          "Practice common suffixes such as -er, -est, -ly, -ful, -less, -ness, and -ment that come after a base word.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-3-suffix-spelling-changes",
        description:
          "Learn the three spelling changes a base word can make before a suffix: dropping silent e, doubling the final consonant, and changing y to i.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-3-possessives",
        description:
          "Use 's and s' to show ownership, and tell possessives apart from plurals and contractions.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-3-multisyllabic-words",
        description:
          "Break two- and three-syllable words into parts so they are easier to spell.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-3-homophones",
        description:
          "Choose the correct spelling for words that sound alike but have different meanings, such as there, their, and they're.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-3-root-word-families",
        description:
          "Review how related words share a meaningful base, and preview the Greek and Latin root study that begins in Grade 4.",
        badge: "Grade Unit",
        kind: "list",
      },
    ],
  },
  {
    title: "High-Frequency Words",
    summary:
      "5 sets · 60 words · Common Grade 3 writing words taught with phonics and Heart Word guidance for unexpected spelling parts.",
    cards: [
      {
        id: "grade-3-common-words-1",
        title: "Grade 3 Common Words 1",
        description:
          "Begin with words that show where something is or connect one idea to another.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-3-common-words-2",
        title: "Grade 3 Common Words 2",
        description:
          "Practice irregular past-tense verbs, including the shared brought/bought/caught/taught/fought/sought family.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-3-common-words-3",
        title: "Grade 3 Common Words 3",
        description:
          "Spell the reading and writing words third graders use to talk about books and their own writing.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-3-common-words-4",
        title: "Grade 3 Common Words 4",
        description:
          "Describe feelings and characters with more precision than happy or sad.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-3-common-words-5",
        title: "Grade 3 Common Words 5",
        description:
          "Finish with time and transition words that sequence ideas and connect sentences in writing.",
        badge: "Common Words",
        kind: "list",
      },
    ],
  },
  {
    title: "Additional Practice",
    cards: [
      {
        id: "grade-3-map-globe-words",
        title: "Map & Globe Words",
        description:
          "Practice spelling map-skills words like compass, continent, and legend.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "grade-3-life-cycle-words",
        title: "Life Cycle Words",
        description:
          "Practice spelling life-cycle words like caterpillar, cocoon, and tadpole.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "grade-3-time-words",
        title: "Time Words",
        description:
          "Practice spelling time words like hour, minute, schedule, and o'clock.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "grade-3-multiplication-division-words",
        title: "Multiplication & Division Words",
        description:
          "Practice spelling math words like multiply, divide, factor, and quotient.",
        badge: "Vocabulary",
        kind: "list",
      },
    ],
  },
];

/**
 * Grade 4 hub — Core Spelling, High-Frequency Words, and Additional Practice
 * (see `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md` Section 8).
 */
export const GRADE_4_HUB_SECTIONS: readonly {
  title: string;
  summary?: string;
  cards: readonly CardDefinition[];
}[] = [
  {
    title: "Core Spelling",
    cards: [
      {
        id: "grade-4-multisyllabic-academic-words",
        description:
          "Break longer academic words such as communicate and organize into syllables before moving into affixes and roots.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-4-advanced-prefixes",
        description:
          "Learn prefixes such as inter-, sub-, super-, trans-, and anti- that appear in longer academic words.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-4-advanced-suffixes",
        description:
          "Learn advanced suffixes such as -able, -ible, -ous, -ive, -tion, and -sion, then extend into the -ture and -sure endings that complete the Grade 4 final-stable-syllable set.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "tier-1-roots-and-patterns",
        description:
          "Learn Latin roots such as port, dict, spect, rupt, and struct, then Greek roots such as tele, photo, graph, bio, demo, and scope.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-4-commonly-confused-words",
        description:
          "Choose the right spelling for words that sound alike or look similar, such as its/it's, than/then, and affect/effect.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-4-derived-words",
        description:
          "See how one base word's family — such as nation, national, and nationality — keeps its spelling stable even as pronunciation and meaning shift.",
        badge: "Grade Unit",
        kind: "list",
      },
    ],
  },
  {
    title: "High-Frequency Words",
    summary:
      "4 sets · 48 words · Narrow, corrective Grade 4 writing words taught with Heart Word guidance for silent letters, doubled consonants, unstressed vowels, and confusable connecting words.",
    cards: [
      {
        id: "grade-4-common-words-1",
        title: "Grade 4 Common Words 1",
        description:
          "Practice words with a silent or unexpected letter, such as environment and receipt.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-4-common-words-2",
        title: "Grade 4 Common Words 2",
        description:
          "Practice words with a doubled consonant that has to be remembered, such as necessary and embarrass.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-4-common-words-3",
        title: "Grade 4 Common Words 3",
        description:
          "Practice words with an unstressed vowel, such as separate and particular.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-4-common-words-4",
        title: "Grade 4 Common Words 4",
        description:
          "Finish with connecting and confusable words for longer writing, such as however, weather, and whether.",
        badge: "Common Words",
        kind: "list",
      },
    ],
  },
  {
    title: "Additional Practice",
    cards: [
      {
        id: "grade-4-measurement-words",
        title: "Measurement Words",
        description:
          "Practice the customary units of length, weight, and liquid volume fourth graders meet in math.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "grade-4-solar-system-words",
        title: "Solar System Words",
        description:
          "Practice spelling solar system words like astronaut, telescope, and galaxy.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "grade-4-career-occupation-words",
        title: "Career & Occupation Words",
        description:
          "Practice spelling career words like engineer, journalist, and photographer.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "grade-4-geometry-words",
        title: "Geometry Words",
        description:
          "Practice spelling geometry words like perimeter, quadrilateral, and angle.",
        badge: "Vocabulary",
        kind: "list",
      },
    ],
  },
];

/**
 * Grade 5 hub — Core Spelling, High-Frequency Words, and Additional Practice
 * (see `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md` Section 16). Civics
 * and Government Words and Money Management Words shipped first, after an
 * audit of five candidates; `grade-5-science-nature-words` and
 * `grade-5-math-vocabulary` were rejected at that stage as open, subject-wide
 * "one word per strand" vocabulary rather than a genuinely closed set. A
 * later editorial pass revisited the bar under a broader philosophy (a topic
 * no longer needs a named academic standard, only to be a recognizable,
 * bounded, non-duplicative theme) and trimmed those two draft files down to
 * two new bounded cards: Ecosystem & Environment Words (dropping the
 * `environment` word itself, since it collides with the live
 * `grade-5-multisyllabic-academic-words` Core Spelling list) and Fraction &
 * Decimal Words.
 */
export const GRADE_5_HUB_SECTIONS: readonly {
  title: string;
  summary?: string;
  cards: readonly CardDefinition[];
}[] = [
  {
    title: "Core Spelling",
    cards: [
      {
        id: "grade-5-multisyllabic-academic-words",
        description:
          "Break longer academic words such as investigation and responsibility into syllables and word parts before moving into affixes and roots.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-5-prefix-suffix-words",
        description:
          "Combine prefixes such as inter-, trans-, and super- with suffixes such as -ive, -ible, and -ity, then extend into the -tion, -sion, -able, -ible, -ance, and -ence spelling rules that complete the set.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-5-greek-latin-word-parts",
        description:
          "Use familiar Greek and Latin word parts such as photo, bio, geo, port, and struct inside longer Grade 5 academic vocabulary.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-5-commonly-confused-words",
        description:
          "Choose the right spelling for words that sound alike or look similar, such as affect/effect, principal/principle, and advice/advise.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-5-spelling-changes-related-words",
        description:
          "See how one base word's family — such as critic, critical, and criticism — keeps its spelling stable even as pronunciation shifts.",
        badge: "Grade Unit",
        kind: "list",
      },
    ],
  },
  {
    title: "High-Frequency Words",
    summary:
      "4 sets · 48 words · Narrow, corrective Grade 5 writing words taught with Heart Word guidance for silent letters, doubled letters, unstressed vowels, and editing and connecting words.",
    cards: [
      {
        id: "grade-5-common-words-1",
        title: "Grade 5 Common Words 1",
        description:
          "Practice words with a silent or hidden letter, such as foreign and conscience.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-5-common-words-2",
        title: "Grade 5 Common Words 2",
        description:
          "Practice words with doubled letters in longer academic words, such as accommodate and committee.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-5-common-words-3",
        title: "Grade 5 Common Words 3",
        description:
          "Practice words with an unstressed vowel, such as temperature and experience.",
        badge: "Common Words",
        kind: "list",
      },
      {
        id: "grade-5-common-words-4",
        title: "Grade 5 Common Words 4",
        description:
          "Finish with connecting and editing words for longer writing, such as consequently, punctuation, and vocabulary.",
        badge: "Common Words",
        kind: "list",
      },
    ],
  },
  {
    title: "Additional Practice",
    cards: [
      {
        id: "grade-5-money-management-words",
        title: "Money Management Words",
        description:
          "Practice words for budgeting, saving, and understanding how a bank account works, such as budget, interest, and deposit.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "grade-5-ecosystem-environment-words",
        title: "Ecosystem & Environment Words",
        description:
          "Practice spelling ecosystem words like habitat, adaptation, and predator.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "grade-5-fraction-decimal-words",
        title: "Fraction & Decimal Words",
        description:
          "Practice spelling fraction and decimal words like numerator, denominator, and equivalent.",
        badge: "Vocabulary",
        kind: "list",
      },
      {
        id: "grade-5-community-civics-words",
        title: "Civics and Government Words",
        description:
          "Practice words for reading and writing about the Constitution, government, and citizenship, such as democracy and amendment.",
        badge: "Vocabulary",
        kind: "list",
      },
    ],
  },
];

export function buildGradeHubCards(
  definitions: readonly { title: string; cards: readonly CardDefinition[] }[],
  entries: SpellingListEntry[],
): GradeHubSection[] {
  const listsById = new Map(entries.map((entry) => [entry.data.id, entry]));

  return definitions.map((section) => ({
    title: section.title,
    summary: section.summary,
    cards: section.cards.flatMap((definition): GradeHubCard[] => {
      const entry = listsById.get(definition.id);
      if (!entry) return [];
      return [
        {
          id: definition.id,
          href: getCanonicalListPath(entry.data),
          title: isCanonicalGradeCurriculumId(definition.id)
            ? (CORE_HUB_TITLE_OVERRIDES[definition.id]?.title ?? entry.data.title)
            : (definition.title ?? entry.data.title),
          description: definition.description,
          category: entry.data.category,
          badge: definition.badge,
          difficulty: entry.data.difficulty,
          durationMinutes: entry.data.estimatedDurationMinutes,
          wordCount: entry.data.words.length,
        },
      ];
    }),
  }));
}
