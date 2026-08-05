import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  GRADE_1_HUB_SECTIONS,
  GRADE_2_HUB_SECTIONS,
  GRADE_3_HUB_SECTIONS,
  GRADE_5_HUB_SECTIONS,
  KINDERGARTEN_HUB_SECTIONS,
} from "./gradeHubCards";
import { getSequenceNeighbors } from "./navigationSequence";

const contentRoot = join(process.cwd(), "src/content");

function idsFor(sections: readonly { cards: readonly { id: string }[] }[]) {
  return sections.flatMap((section) => section.cards.map((card) => card.id));
}

function source(path: string) {
  return readFileSync(join(contentRoot, path), "utf8");
}

function contentFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? contentFiles(path) : entry.name.endsWith(".md") ? [path] : [];
  });
}

describe("frozen K–2 grade hub cards", () => {
  it("renders the Kindergarten cards in the authoritative 17-card order", () => {
    expect(KINDERGARTEN_HUB_SECTIONS.map((section) => section.title)).toEqual([
      "Core Spelling",
      "High-Frequency Words",
      "Additional Practice",
    ]);
    expect(idsFor(KINDERGARTEN_HUB_SECTIONS)).toEqual([
      "kindergarten-first-words",
      "kindergarten-short-a-words",
      "kindergarten-short-i-words",
      "kindergarten-short-o-words",
      "kindergarten-short-u-words",
      "kindergarten-short-e-words",
      "kindergarten-mixed-vowel-review",
      "kindergarten-consonant-digraphs",
      "kindergarten-common-words-1",
      "kindergarten-common-words-2",
      "kindergarten-common-words-3",
      "kindergarten-common-words-4",
      "kindergarten-animal-words",
      "kindergarten-body-words",
      "kindergarten-number-words",
      "kindergarten-color-words",
      "kindergarten-family-words",
    ]);
    expect(idsFor(KINDERGARTEN_HUB_SECTIONS)).toHaveLength(17);
    expect(KINDERGARTEN_HUB_SECTIONS[1].summary).toContain("4 sets · 40 words");
    expect(KINDERGARTEN_HUB_SECTIONS[1].summary).toContain("Heart Word guidance");
    expect(idsFor(KINDERGARTEN_HUB_SECTIONS)).not.toContain("kindergarten-number-color-words");
  });

  it("renders the complete Grade 1 cards in the authoritative order", () => {
    expect(GRADE_1_HUB_SECTIONS.map((section) => section.title)).toEqual([
      "Core Spelling",
      "High-Frequency Words",
      "Additional Practice",
    ]);
    expect(idsFor(GRADE_1_HUB_SECTIONS)).toEqual([
      "grade-1-cvc-short-vowels-c-k-rule",
      "grade-1-floss-rule",
      "grade-1-consonant-digraphs-final-ck",
      "grade-1-beginning-consonant-blends",
      "grade-1-ending-consonant-blends",
      "grade-1-long-vowels-silent-e",
      "grade-1-open-syllables-final-y",
      "grade-1-long-a-long-o-vowel-teams",
      "grade-1-inflectional-endings-s-es",
      "grade-1-inflectional-endings-ed-ing",
      "grade-1-r-controlled-ar-or",
      "grade-1-tch-dge-ending-rules",
      "grade-1-common-words-1",
      "grade-1-common-words-2",
      "grade-1-common-words-3",
      "grade-1-common-words-4",
      "grade-1-common-words-5",
      "grade-1-common-words-6",
      "grade-1-weather-words",
      "grade-1-clothing-words",
      "grade-1-shape-words",
      "grade-1-number-words-11-20",
      "grade-1-days-of-the-week",
    ]);
    expect(GRADE_1_HUB_SECTIONS[1].summary).toContain("6 sets · 72 words");
    expect(GRADE_1_HUB_SECTIONS[1].cards.every((card) => card.kind === "list")).toBe(true);
    expect(idsFor(GRADE_1_HUB_SECTIONS)).not.toContain("grade-1-common-words");
  });

  it("renders the complete Grade 2 cards in the authoritative 21-card order", () => {
    expect(GRADE_2_HUB_SECTIONS.map((section) => section.title)).toEqual([
      "Core Spelling",
      "High-Frequency Words",
      "Additional Practice",
    ]);
    expect(idsFor(GRADE_2_HUB_SECTIONS)).toEqual([
      "vowel-teams-oi-oy",
      "vowel-teams-ou-ow",
      "grade-2-oo-two-sounds",
      "grade-2-au-aw-words",
      "grade-2-soft-c-soft-g",
      "grade-2-two-syllable-words",
      "grade-2-final-stable-le",
      "grade-2-silent-letter-words",
      "grade-2-list-02",
      "grade-2-contractions",
      "grade-2-common-words-1",
      "grade-2-common-words-2",
      "grade-2-common-words-3",
      "grade-2-common-words-4",
      "grade-2-common-words-5",
      "grade-2-common-words-6",
      "grade-2-transportation-words",
      "grade-2-money-words",
      "grade-2-number-words-20-100",
      "grade-2-community-helpers",
      "grade-2-months-of-the-year",
    ]);
    expect(idsFor(GRADE_2_HUB_SECTIONS)).toHaveLength(21);
    expect(GRADE_2_HUB_SECTIONS[0].cards).toHaveLength(10);
    expect(GRADE_2_HUB_SECTIONS[1].cards).toHaveLength(6);
    expect(GRADE_2_HUB_SECTIONS[2].cards).toHaveLength(5);
    expect(GRADE_2_HUB_SECTIONS[1].summary).toContain("6 sets · 72 words");
    expect(GRADE_2_HUB_SECTIONS[1].summary).toContain("Heart Word guidance");
    expect(GRADE_2_HUB_SECTIONS[1].cards.every((card) => card.kind === "list")).toBe(true);
    expect(idsFor(GRADE_2_HUB_SECTIONS)).not.toContain("grade-2-common-words");
  });

  it("renders the complete Grade 3 cards across all three sections", () => {
    expect(GRADE_3_HUB_SECTIONS.map((section) => section.title)).toEqual([
      "Core Spelling",
      "High-Frequency Words",
      "Additional Practice",
    ]);
    expect(idsFor(GRADE_3_HUB_SECTIONS)).toEqual([
      "grade-3-prefix-words",
      "grade-3-suffix-words",
      "grade-3-dropping-silent-e",
      "grade-3-possessives",
      "grade-3-multisyllabic-words",
      "grade-3-homophones",
      "grade-3-root-word-families",
      "grade-3-common-words-1",
      "grade-3-common-words-2",
      "grade-3-common-words-3",
      "grade-3-common-words-4",
      "grade-3-common-words-5",
      "grade-3-map-globe-words",
      "grade-3-life-cycle-words",
      "grade-3-time-words",
      "grade-3-multiplication-division-words",
    ]);
    expect(idsFor(GRADE_3_HUB_SECTIONS)).toHaveLength(16);
    expect(GRADE_3_HUB_SECTIONS[0].cards).toHaveLength(7);
    expect(GRADE_3_HUB_SECTIONS[1].cards).toHaveLength(5);
    expect(GRADE_3_HUB_SECTIONS[2].cards).toHaveLength(4);
    expect(GRADE_3_HUB_SECTIONS[1].summary).toContain("5 sets · 60 words");
    expect(GRADE_3_HUB_SECTIONS[1].summary).toContain("Heart Word guidance");
    expect(idsFor(GRADE_3_HUB_SECTIONS)).not.toContain("grade-3-doubling-final-consonants");
    expect(idsFor(GRADE_3_HUB_SECTIONS)).not.toContain("grade-3-changing-y-to-i");
  });
});

function wordsIn(fileContent: string): string[] {
  const block = fileContent.match(/^words:\n([\s\S]*?)\n---/m)?.[1] ?? "";
  return [...block.matchAll(/^\s{2}-\s+(?:word:\s+)?["']?([^"'\n]+?)["']?\s*$/gm)].map((match) =>
    match[1].trim().toLowerCase(),
  );
}

describe("Grade 5 grade hub cards", () => {
  it("renders the complete Grade 5 cards across all three sections", () => {
    expect(GRADE_5_HUB_SECTIONS.map((section) => section.title)).toEqual([
      "Core Spelling",
      "High-Frequency Words",
      "Additional Practice",
    ]);
    expect(idsFor(GRADE_5_HUB_SECTIONS)).toEqual([
      "grade-5-multisyllabic-academic-words",
      "grade-5-prefix-suffix-words",
      "grade-5-greek-latin-word-parts",
      "grade-5-commonly-confused-words",
      "grade-5-spelling-changes-related-words",
      "grade-5-common-words-1",
      "grade-5-common-words-2",
      "grade-5-common-words-3",
      "grade-5-common-words-4",
      "grade-5-money-management-words",
      "grade-5-ecosystem-environment-words",
      "grade-5-fraction-decimal-words",
      "grade-5-community-civics-words",
    ]);
    expect(GRADE_5_HUB_SECTIONS[0].cards).toHaveLength(5);
    expect(GRADE_5_HUB_SECTIONS[1].cards).toHaveLength(4);
    expect(GRADE_5_HUB_SECTIONS[2].cards).toHaveLength(4);
    expect(GRADE_5_HUB_SECTIONS[1].summary).toContain("4 sets · 48 words");
  });

  it("does not reuse the rejected draft science/math vocabulary files on the hub", () => {
    expect(idsFor(GRADE_5_HUB_SECTIONS)).not.toContain("grade-5-science-nature-words");
    expect(idsFor(GRADE_5_HUB_SECTIONS)).not.toContain("grade-5-math-vocabulary");
  });

  it("publishes Grade 5 Additional Practice with contentRole: vocabulary-theme and zero overlap against any K–5 Common Words or Core Spelling word", () => {
    const additionalPracticeIds = [
      "grade-5-community-civics-words",
      "grade-5-money-management-words",
      "grade-5-ecosystem-environment-words",
      "grade-5-fraction-decimal-words",
    ];
    const fileNames: Record<string, string> = {
      "grade-5-community-civics-words": "5th-grade-community-civics-words",
      "grade-5-money-management-words": "5th-grade-money-management-words",
      "grade-5-ecosystem-environment-words": "5th-grade-ecosystem-environment-words",
      "grade-5-fraction-decimal-words": "5th-grade-fraction-decimal-words",
    };
    const additionalPracticeWords = new Set<string>();
    for (const id of additionalPracticeIds) {
      const content = source(`spelling-lists/grade-level/${fileNames[id]}.md`);
      expect(content).toContain("contentRole: vocabulary-theme");
      for (const word of wordsIn(content)) {
        additionalPracticeWords.add(word);
      }
    }
    expect(additionalPracticeWords.size).toBe(40);

    const bannedWords = new Set<string>();
    for (const relativeDir of ["spelling-lists/sight-words", "spelling-lists/grade-level"]) {
      for (const path of contentFiles(join(contentRoot, relativeDir))) {
        const content = readFileSync(path, "utf8");
        const isCommonWordsSet = /contentRole:\s*sight-word-set/.test(content);
        const isCoreSpelling = /contentRole:\s*(grade-unit|skill)/.test(content);
        if (!isCommonWordsSet && !isCoreSpelling) continue;
        for (const word of wordsIn(content)) {
          bannedWords.add(word);
        }
      }
    }

    for (const word of additionalPracticeWords) {
      expect(bannedWords.has(word)).toBe(false);
    }
  });
});

describe("Grade 3 Common Words", () => {
  it("publishes the gateway collection with its five ordered child sets", () => {
    const collection = source("spelling-collections/grade-3-common-words.md");
    expect(collection).toContain("status: published");
    expect(collection).toMatch(
      /listIds:\n {2}- grade-3-common-words-1\n {2}- grade-3-common-words-2\n {2}- grade-3-common-words-3\n {2}- grade-3-common-words-4\n {2}- grade-3-common-words-5/,
    );
  });

  it("wires grade-2-common-words-6 forward into the Grade 3 gateway's first set", () => {
    // Adjacency is derived from HF_WORDS_SEQUENCE, not frontmatter — see
    // navigationSequence.test.ts for the full chain assertion. This test keeps
    // a direct check on this specific, previously-hand-wired boundary.
    expect(getSequenceNeighbors("grade-2-common-words-6").nextId).toBe("grade-3-common-words-1");
    expect(getSequenceNeighbors("grade-3-common-words-1").prerequisiteId).toBe("grade-2-common-words-6");
  });

  it("publishes five sets of 12 words each with zero overlap against the 184 words already owned by K–2", () => {
    const k2Words = new Set(
      [
        "a", "I", "am", "at", "can", "in", "it", "is", "and", "the",
        "he", "she", "we", "me", "my", "go", "to", "do", "you", "like",
        "for", "of", "was", "said", "have", "are", "here", "come", "look", "see",
        "this", "that", "with", "they", "one", "two", "three", "where", "little", "play",
        "all", "but", "did", "no", "get", "good", "new", "now", "our", "out", "please", "want",
        "after", "again", "any", "ask", "by", "could", "every", "fly", "from", "give", "going", "had",
        "on", "not", "an", "as", "if", "has", "his", "her", "him", "them", "be", "will",
        "what", "when", "who", "why", "how", "there", "your", "their", "were", "some", "more", "because",
        "up", "down", "back", "over", "into", "about", "home", "way", "time", "first", "next", "then",
        "or", "so", "just", "us", "may", "make", "many", "very", "people", "know", "would", "should",
        "always", "around", "before", "another", "between", "under", "until", "almost", "together", "enough", "without", "through",
        "been", "does", "goes", "gave", "made", "found", "told", "began", "took", "came", "went", "done",
        "school", "book", "page", "word", "letter", "sentence", "story", "question", "answer", "learn", "study", "never",
        "friend", "family", "father", "mother", "sister", "brother", "children", "everyone", "someone", "something", "young", "kind",
        "best", "both", "different", "important", "great", "large", "small", "high", "light", "cold", "fast", "right",
        "which", "these", "those", "its", "own", "off", "only", "other", "use", "work", "thought", "read",
      ],
    );
    expect(k2Words.size).toBe(184);

    let totalWords = 0;
    for (let i = 1; i <= 5; i++) {
      const set = source(`spelling-lists/sight-words/grade-3-common-words-${i}.md`);
      expect(set).toContain(`id: grade-3-common-words-${i}`);
      expect(set).toContain("contentRole: sight-word-set");
      expect(set).toContain("status: published");
      const words = [
        ...set.matchAll(/^\s*-\s+(?:word:\s+)?["']([^"']+)["']/gm),
      ].map((match) => match[1]);
      expect(words).toHaveLength(12);
      for (const word of words) {
        expect(k2Words.has(word.toLowerCase())).toBe(false);
      }
      totalWords += words.length;
    }
    expect(totalWords).toBe(60);
  });
});

describe("Common Words validation slice content", () => {
  it("publishes the Kindergarten collection with its four ordered child sets", () => {
    const collection = source(
      "spelling-collections/kindergarten-common-words.md",
    );
    expect(collection).toContain("urlSlug: kindergarten-common-words");
    expect(collection).toContain('title: "Kindergarten High-Frequency Words"');
    expect(collection).toMatch(
      /listIds:\n {2}- kindergarten-common-words-1\n {2}- kindergarten-common-words-2\n {2}- kindergarten-common-words-3\n {2}- kindergarten-common-words-4/,
    );
  });

  it("publishes all six Grade 1 child sets in sequence", () => {
    const collection = source("spelling-collections/grade-1-common-words.md");
    expect(collection).toMatch(
      /listIds:\n {2}- grade-1-common-words-1\n {2}- grade-1-common-words-2\n {2}- grade-1-common-words-3\n {2}- grade-1-common-words-4\n {2}- grade-1-common-words-5\n {2}- grade-1-common-words-6/,
    );
    expect(collection).toContain("72 words");
  });

  it("keeps exact set ids, roles, and words", () => {
    // Adjacency (Review First / Next Step) is no longer authored in frontmatter —
    // it's derived from HF_WORDS_SEQUENCE, verified in navigationSequence.test.ts.
    const expectations = [
      ["kindergarten-common-words-1", "a, I, am, at, can, in, it, is, and, the"],
      ["kindergarten-common-words-2", "he, she, we, me, my, go, to, do, you, like"],
      ["kindergarten-common-words-3", "for, of, was, said, have, are, here, come, look, see"],
      ["kindergarten-common-words-4", "this, that, with, they, one, two, three, where, little, play"],
      ["grade-1-common-words-1", "all, but, did, no, get, good, new, now, our, out, please, want"],
      ["grade-1-common-words-2", "after, again, any, ask, by, could, every, fly, from, give, going, had"],
      ["grade-1-common-words-3", "on, not, an, as, if, has, his, her, him, them, be, will"],
      ["grade-1-common-words-4", "what, when, who, why, how, there, your, their, were, some, more, because"],
      ["grade-1-common-words-5", "up, down, back, over, into, about, home, way, time, first, next, then"],
      ["grade-1-common-words-6", "or, so, just, us, may, make, many, very, people, know, would, should"],
    ] as const;

    for (const [id, words] of expectations) {
      const set = source(`spelling-lists/sight-words/${id}.md`);
      expect(set).toContain(`id: ${id}`);
      expect(set).toContain(`urlSlug: ${id}`);
      expect(set).toContain("contentRole: sight-word-set");
      const actualWords = [
        ...set.matchAll(/^\s*-\s+(?:word:\s+)?["']([^"']+)["']/gm),
      ].map((match) => match[1]);
      expect(actualWords).toEqual(words.split(", "));
    }
  });

  it("keeps direct Kindergarten high-frequency cards on their canonical set destinations", () => {
    const highFrequencyCards = KINDERGARTEN_HUB_SECTIONS[1].cards;
    expect(highFrequencyCards.map((card) => card.id)).toEqual([
      "kindergarten-common-words-1",
      "kindergarten-common-words-2",
      "kindergarten-common-words-3",
      "kindergarten-common-words-4",
    ]);
    expect(highFrequencyCards.every((card) => card.kind === "list")).toBe(true);
  });

  it("publishes focused Number Words and Color Words while retaining the combined route", () => {
    const numberWords = source("spelling-lists/grade-level/kindergarten-number-words.md");
    const colorWords = source("spelling-lists/grade-level/kindergarten-color-words.md");
    const combined = source("spelling-lists/grade-level/kindergarten-number-color-words.md");

    expect(numberWords).toContain("urlSlug: kindergarten-number-words");
    expect(numberWords).toMatch(/words:\n {2}- one\n {2}- two\n {2}- three\n {2}- four\n {2}- five\n {2}- six\n {2}- seven\n {2}- eight\n {2}- nine\n {2}- ten/);
    expect(colorWords).toContain("urlSlug: kindergarten-color-words");
    expect(colorWords).toMatch(/words:\n {2}- red\n {2}- blue\n {2}- green\n {2}- yellow\n {2}- black\n {2}- white\n {2}- brown\n {2}- pink/);
    expect(combined).toContain("status: published");
    expect(combined).toContain("kindergarten-number-words");
    expect(combined).toContain("kindergarten-color-words");
  });

  it("builds grade-hub ItemList JSON-LD from the visible curated cards", () => {
    const gradeHubPage = readFileSync(
      join(process.cwd(), "src/pages/[gradeSlug].astro"),
      "utf8",
    );
    expect(gradeHubPage).toContain("numberOfItems: displayedItemCount");
    expect(gradeHubPage).toContain("curatedSections.flatMap(({ cards }) => cards.map((card) => ({");
    expect(gradeHubPage).toContain("url: new URL(card.href, canonicalURL.origin).toString()");
  });

  it("does not create duplicate canonical list routes", () => {
    const routes = contentFiles(join(contentRoot, "spelling-lists")).map((path) => {
      const content = readFileSync(path, "utf8");
      const category = content.match(/^category:\s*(.+)$/m)?.[1];
      const urlSlug = content.match(/^urlSlug:\s*(.+)$/m)?.[1];
      return `${category}/${urlSlug}`;
    });
    expect(new Set(routes).size).toBe(routes.length);
  });
});
