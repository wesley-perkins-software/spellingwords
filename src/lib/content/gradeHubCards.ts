import type {
  SpellingCollectionEntry,
  SpellingListEntry,
} from "./spellingLists";

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
  title: string;
  description: string;
  badge?: string;
  kind: "list" | "collection";
};

export type GradeHubSection = {
  title: string;
  summary?: string;
  cards: GradeHubCard[];
};

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
        title: "First Words",
        description:
          "Start with eight familiar, sound-out words that help a child connect spoken sounds to letters before concentrating on one vowel pattern.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "kindergarten-short-a-words",
        title: "Short A Words",
        description:
          "Practice short-a CVC words as the first focused vowel step.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "kindergarten-short-i-words",
        title: "Short I Words",
        description: "Continue the sequence with short-i CVC words.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "kindergarten-short-o-words",
        title: "Short O Words",
        description: "Practice the short-o vowel sound in simple words.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "kindergarten-short-u-words",
        title: "Short U Words",
        description: "Practice the short-u vowel sound in simple words.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "kindergarten-short-e-words",
        title: "Short E Words",
        description:
          "Finish the focused short-vowel sequence with short-e words.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "kindergarten-mixed-vowel-review",
        title: "Mixed CVC Review",
        description:
          "Check whether a child can choose among short vowels instead of relying on one list pattern.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "kindergarten-consonant-digraphs",
        title: "Digraph Words",
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
        id: "kindergarten-animal-words",
        title: "Animal Words",
        description:
          "Practice concrete animal names while applying early sound-to-letter knowledge.",
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
        title: "Short Vowel Review and C/K Spelling",
        description:
          "Refresh short vowels and learn when the /k/ sound is usually spelled c or k.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-floss-rule",
        title: "The FLOSS Rule",
        description:
          "Learn a useful short-vowel ending pattern with doubled f, l, s, or z.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-consonant-digraphs-final-ck",
        title: "Digraphs and Final -ck",
        description:
          "Practice common two-letter consonant spellings and the -ck ending after a short vowel.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-beginning-consonant-blends",
        title: "Beginning Consonant Blends",
        description:
          "Spell words that begin with two consonant sounds, such as bl- and st-.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-ending-consonant-blends",
        title: "Ending Consonant Blends",
        description:
          "Spell words that end with two consonant sounds, such as -nd and -mp.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-long-vowels-silent-e",
        title: "Long Vowels with Silent E",
        description:
          "Learn how a final silent e can change a vowel sound in a one-syllable word.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-open-syllables-final-y",
        title: "Open Syllables and Final Y",
        description:
          "Notice short words where an open syllable or final y makes the vowel sound long.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-long-a-long-o-vowel-teams",
        title: "Long Vowel Teams",
        description:
          "Learn common vowel teams that spell long-vowel sounds, then choose a focused pattern when needed.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-inflectional-endings-s-es",
        title: "Plural Endings: -s and -es",
        description:
          "Spell common plural endings in words children use in everyday writing.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-inflectional-endings-ed-ing",
        title: "Verb Endings: -ed and -ing",
        description:
          "Add common verb endings while keeping the base word readable and spellable.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-r-controlled-ar-or",
        title: "R-Controlled Vowels",
        description:
          "Practice vowel sounds changed by r, then use a focused pattern page for extra help.",
        badge: "Grade Unit",
        kind: "list",
      },
      {
        id: "grade-1-tch-dge-ending-rules",
        title: "Final -tch and -dge",
        description:
          "Learn useful endings for final /ch/ and /j/ after a short vowel.",
        badge: "Grade Unit",
        kind: "list",
      },
    ],
  },
  {
    title: "High-Frequency Words",
    cards: [
      {
        id: "grade-1-common-words",
        title: "Grade 1 Common Words",
        description:
          "Practice small cumulative sets of useful Grade 1 writing words, including words with parts learned by heart.",
        badge: "Common Words",
        kind: "collection",
      },
    ],
  },
];

export function buildGradeHubCards(
  definitions: readonly { title: string; cards: readonly CardDefinition[] }[],
  entries: SpellingListEntry[],
  collections: SpellingCollectionEntry[],
): GradeHubSection[] {
  const listsById = new Map(entries.map((entry) => [entry.data.id, entry]));
  const collectionsById = new Map(
    collections.map((entry) => [entry.data.id, entry]),
  );

  return definitions.map((section) => ({
    title: section.title,
    summary: section.summary,
    cards: section.cards.flatMap((definition): GradeHubCard[] => {
      if (definition.kind === "list") {
        const entry = listsById.get(definition.id);
        if (!entry) return [];
        return [
          {
            id: definition.id,
            href: `/spelling-lists/${entry.data.category}/${entry.data.urlSlug}`,
            title: definition.title,
            description: definition.description,
            category: entry.data.category,
            badge: definition.badge,
            difficulty: entry.data.difficulty,
            durationMinutes: entry.data.estimatedDurationMinutes,
            wordCount: entry.data.words.length,
          },
        ];
      }
      const collection = collectionsById.get(definition.id);
      if (!collection) return [];
      return [
        {
          id: definition.id,
          href: `/spelling-lists/collections/${collection.data.urlSlug}`,
          title: definition.title,
          description: definition.description,
          category: collection.data.category,
          badge: definition.badge,
        },
      ];
    }),
  }));
}
