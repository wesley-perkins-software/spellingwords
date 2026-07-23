import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  GRADE_1_HUB_SECTIONS,
  KINDERGARTEN_HUB_SECTIONS,
} from "./gradeHubCards";

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

describe("frozen K–1 grade hub cards", () => {
  it("renders the Kindergarten cards in the authoritative 15-card order", () => {
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
      "kindergarten-number-words",
      "kindergarten-color-words",
      "kindergarten-animal-words",
    ]);
    expect(idsFor(KINDERGARTEN_HUB_SECTIONS)).toHaveLength(15);
    expect(KINDERGARTEN_HUB_SECTIONS[1].summary).toContain("4 sets · 40 words");
    expect(KINDERGARTEN_HUB_SECTIONS[1].summary).toContain("Heart Word guidance");
    expect(idsFor(KINDERGARTEN_HUB_SECTIONS)).not.toContain("kindergarten-number-color-words");
  });

  it("renders the Grade 1 cards in the authoritative order without an empty additional-practice section", () => {
    expect(GRADE_1_HUB_SECTIONS.map((section) => section.title)).toEqual([
      "Core Spelling",
      "High-Frequency Words",
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
      "grade-1-common-words",
    ]);
    expect(GRADE_1_HUB_SECTIONS).not.toContainEqual(expect.objectContaining({ title: "Additional Practice" }));
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
      /listIds:\n  - kindergarten-common-words-1\n  - kindergarten-common-words-2\n  - kindergarten-common-words-3\n  - kindergarten-common-words-4/,
    );
  });

  it("publishes the two live Grade 1 child sets without future references", () => {
    const collection = source("spelling-collections/grade-1-common-words.md");
    expect(collection).toMatch(
      /listIds:\n  - grade-1-common-words-1\n  - grade-1-common-words-2/,
    );
    expect(collection).not.toContain("grade-1-common-words-3");
  });

  it("keeps exact set ids, roles, words, and live adjacent relationships", () => {
    const expectations = [
      [
        "kindergarten-common-words-1",
        "a, I, am, at, can, in, it, is, and, the",
        "nextLists: [kindergarten-common-words-2]",
      ],
      [
        "kindergarten-common-words-2",
        "he, she, we, me, my, go, to, do, you, like",
        "nextLists: [kindergarten-common-words-3]",
      ],
      [
        "kindergarten-common-words-3",
        "for, of, was, said, have, are, here, come, look, see",
        "nextLists: [kindergarten-common-words-4]",
      ],
      [
        "kindergarten-common-words-4",
        "this, that, with, they, one, two, three, where, little, play",
        "nextLists: []",
      ],
      [
        "grade-1-common-words-1",
        "all, but, did, no, get, good, new, now, our, out, please, want",
        "nextLists: [grade-1-common-words-2]",
      ],
      [
        "grade-1-common-words-2",
        "after, again, any, ask, by, could, every, fly, from, give, going, had",
        "nextLists: []",
      ],
    ] as const;

    for (const [id, words, next] of expectations) {
      const set = source(`spelling-lists/sight-words/${id}.md`);
      expect(set).toContain(`id: ${id}`);
      expect(set).toContain(`urlSlug: ${id}`);
      expect(set).toContain("contentRole: sight-word-set");
      expect(set).toContain(next);
      const actualWords = [
        ...set.matchAll(/^\s*-\s+(?:word:\s+)?[\"']([^\"']+)[\"']/gm),
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
    expect(numberWords).toMatch(/words:\n  - one\n  - two\n  - three\n  - four\n  - five\n  - six\n  - seven\n  - eight\n  - nine\n  - ten/);
    expect(colorWords).toContain("urlSlug: kindergarten-color-words");
    expect(colorWords).toMatch(/words:\n  - red\n  - blue\n  - green\n  - yellow\n  - black\n  - white\n  - brown\n  - pink/);
    expect(combined).toContain("status: published");
    expect(combined).toContain("kindergarten-number-words");
    expect(combined).toContain("kindergarten-color-words");
  });

  it("builds grade-hub ItemList JSON-LD from the visible curated cards", () => {
    const gradeHubPage = readFileSync(
      join(process.cwd(), "src/pages/spelling-lists/[gradeSlug].astro"),
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
