import { readFileSync } from "node:fs";
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

describe("frozen K–1 grade hub cards", () => {
  it("renders the Kindergarten cards in the authoritative three-section order", () => {
    expect(KINDERGARTEN_HUB_SECTIONS.map((section) => section.title)).toEqual([
      "Learn in Order",
      "Common Words to Spell",
      "Practice by Topic",
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
      "kindergarten-common-words",
      "kindergarten-number-color-words",
      "kindergarten-animal-words",
    ]);
  });

  it("renders the Grade 1 cards in the authoritative order without a topic section", () => {
    expect(GRADE_1_HUB_SECTIONS.map((section) => section.title)).toEqual([
      "Learn in Order",
      "Common Words to Spell",
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
  });
});

describe("Common Words validation slice content", () => {
  it("publishes the Kindergarten collection with its four ordered child sets", () => {
    const collection = source(
      "spelling-collections/kindergarten-common-words.md",
    );
    expect(collection).toContain("urlSlug: kindergarten-common-words");
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
});
