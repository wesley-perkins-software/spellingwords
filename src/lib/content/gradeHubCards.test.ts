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
      "grade-1-number-words-11-20",
      "grade-1-days-of-the-week",
      "grade-1-five-senses-words",
    ]);
    expect(GRADE_1_HUB_SECTIONS[1].summary).toContain("6 sets · 72 words");
    expect(GRADE_1_HUB_SECTIONS[1].cards.every((card) => card.kind === "list")).toBe(true);
    expect(idsFor(GRADE_1_HUB_SECTIONS)).not.toContain("grade-1-common-words");
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

  it("keeps exact set ids, roles, words, and live adjacent relationships", () => {
    const expectations = [
      [
        "kindergarten-common-words-1",
        "a, I, am, at, can, in, it, is, and, the",
        'nextLists: ["kindergarten-common-words-2"]',
      ],
      [
        "kindergarten-common-words-2",
        "he, she, we, me, my, go, to, do, you, like",
        'nextLists: ["kindergarten-common-words-3"]',
      ],
      [
        "kindergarten-common-words-3",
        "for, of, was, said, have, are, here, come, look, see",
        'nextLists: ["kindergarten-common-words-4"]',
      ],
      [
        "kindergarten-common-words-4",
        "this, that, with, they, one, two, three, where, little, play",
        "nextLists: []",
      ],
      [
        "grade-1-common-words-1",
        "all, but, did, no, get, good, new, now, our, out, please, want",
        'nextLists: ["grade-1-common-words-2"]',
      ],
      [
        "grade-1-common-words-2",
        "after, again, any, ask, by, could, every, fly, from, give, going, had",
        'nextLists: ["grade-1-common-words-3"]',
      ],
      ["grade-1-common-words-3", "on, not, an, as, if, has, his, her, him, them, be, will", 'nextLists: ["grade-1-common-words-4"]'],
      ["grade-1-common-words-4", "what, when, who, why, how, there, your, their, were, some, more, because", 'nextLists: ["grade-1-common-words-5"]'],
      ["grade-1-common-words-5", "up, down, back, over, into, about, home, way, time, first, next, then", 'nextLists: ["grade-1-common-words-6"]'],
      ["grade-1-common-words-6", "or, so, just, us, may, make, many, very, people, know, would, should", "nextLists: []"],
    ] as const;

    for (const [id, words, next] of expectations) {
      const set = source(`spelling-lists/sight-words/${id}.md`);
      expect(set).toContain(`id: ${id}`);
      expect(set).toContain(`urlSlug: ${id}`);
      expect(set).toContain("contentRole: sight-word-set");
      expect(set.replaceAll("'", '"')).toContain(next);
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
