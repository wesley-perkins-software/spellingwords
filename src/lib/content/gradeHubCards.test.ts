import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  GRADE_1_HUB_SECTIONS,
  GRADE_2_HUB_SECTIONS,
  GRADE_3_HUB_SECTIONS,
  GRADE_4_HUB_SECTIONS,
  GRADE_5_HUB_SECTIONS,
  CORE_HUB_TITLE_OVERRIDES,
  buildGradeHubCards,
  KINDERGARTEN_HUB_SECTIONS,
} from "./gradeHubCards";
import { getSequenceNeighbors } from "./navigationSequence";
import { canonicalGradeRoutes } from "./canonicalGradeRoutes";
import type { SpellingListEntry } from "./spellingLists";

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
      "Themed Spelling Practice",
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
      "kindergarten-high-frequency-words-set-1",
      "kindergarten-high-frequency-words-set-2",
      "kindergarten-high-frequency-words-set-3",
      "kindergarten-high-frequency-words-set-4",
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
      "Themed Spelling Practice",
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
      "grade-1-high-frequency-words-set-1",
      "grade-1-high-frequency-words-set-2",
      "grade-1-high-frequency-words-set-3",
      "grade-1-high-frequency-words-set-4",
      "grade-1-high-frequency-words-set-5",
      "grade-1-high-frequency-words-set-6",
      "grade-1-high-frequency-words-set-7",
      "grade-1-weather-words",
      "grade-1-clothing-words",
      "grade-1-shape-words",
      "grade-1-number-words-11-20",
      "grade-1-days-of-the-week",
    ]);
    expect(GRADE_1_HUB_SECTIONS[1].summary).toContain("7 sets · 84 words");
    expect(GRADE_1_HUB_SECTIONS[1].cards.every((card) => card.kind === "list")).toBe(true);
    expect(idsFor(GRADE_1_HUB_SECTIONS)).not.toContain("grade-1-high-frequency-words");
  });

  it("renders the complete Grade 2 cards in the authoritative 24-card order", () => {
    expect(GRADE_2_HUB_SECTIONS.map((section) => section.title)).toEqual([
      "Core Spelling",
      "High-Frequency Words",
      "Themed Spelling Practice",
    ]);
    expect(idsFor(GRADE_2_HUB_SECTIONS)).toEqual([
      "grade-2-long-e-ee-ea",
      "grade-2-long-i-ie-igh",
      "vowel-teams-oi-oy",
      "vowel-teams-ou-ow",
      "grade-2-oo-two-sounds",
      "grade-2-au-aw-words",
      "grade-2-r-controlled-er-ir-ur",
      "grade-2-soft-c-soft-g",
      "grade-2-two-syllable-words",
      "grade-2-final-stable-le",
      "grade-2-silent-letter-words",
      "grade-2-list-02",
      "grade-2-contractions",
      "grade-2-high-frequency-words-set-1",
      "grade-2-high-frequency-words-set-2",
      "grade-2-high-frequency-words-set-3",
      "grade-2-high-frequency-words-set-4",
      "grade-2-high-frequency-words-set-5",
      "grade-2-high-frequency-words-set-6",
      "grade-2-high-frequency-words-set-7",
      "grade-2-transportation-words",
      "grade-2-money-words",
      "grade-2-number-words-20-100",
      "grade-2-community-helpers",
      "grade-2-months-of-the-year",
    ]);
    expect(idsFor(GRADE_2_HUB_SECTIONS)).toHaveLength(25);
    expect(GRADE_2_HUB_SECTIONS[0].cards).toHaveLength(13);
    expect(GRADE_2_HUB_SECTIONS[1].cards).toHaveLength(7);
    expect(GRADE_2_HUB_SECTIONS[2].cards).toHaveLength(5);
    expect(GRADE_2_HUB_SECTIONS[1].summary).toContain("7 sets · 84 words");
    expect(GRADE_2_HUB_SECTIONS[1].summary).toContain("Heart Word guidance");
    expect(GRADE_2_HUB_SECTIONS[1].cards.every((card) => card.kind === "list")).toBe(true);
    expect(idsFor(GRADE_2_HUB_SECTIONS)).not.toContain("grade-2-high-frequency-words");
  });

  it("renders the complete Grade 3 cards across all three sections", () => {
    expect(GRADE_3_HUB_SECTIONS.map((section) => section.title)).toEqual([
      "Core Spelling",
      "High-Frequency Words",
      "Themed Spelling Practice",
    ]);
    expect(idsFor(GRADE_3_HUB_SECTIONS)).toEqual([
      "grade-3-prefix-words",
      "grade-3-suffix-words",
      "grade-3-suffix-spelling-changes",
      "grade-3-possessives",
      "grade-3-multisyllabic-words",
      "grade-3-homophones",
      "grade-3-root-word-families",
      "grade-3-high-frequency-words-set-1",
      "grade-3-high-frequency-words-set-2",
      "grade-3-high-frequency-words-set-3",
      "grade-3-high-frequency-words-set-4",
      "grade-3-high-frequency-words-set-5",
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
      "Themed Spelling Practice",
    ]);
    expect(idsFor(GRADE_5_HUB_SECTIONS)).toEqual([
      "grade-5-multisyllabic-academic-words",
      "grade-5-prefix-suffix-words",
      "grade-5-greek-latin-word-parts",
      "grade-5-commonly-confused-words",
      "grade-5-spelling-changes-related-words",
      "grade-5-high-frequency-words-set-1",
      "grade-5-high-frequency-words-set-2",
      "grade-5-money-management-words",
      "grade-5-ecosystem-environment-words",
      "grade-5-fraction-decimal-words",
      "grade-5-community-civics-words",
    ]);
    expect(GRADE_5_HUB_SECTIONS[0].cards).toHaveLength(5);
    expect(GRADE_5_HUB_SECTIONS[1].cards).toHaveLength(2);
    expect(GRADE_5_HUB_SECTIONS[2].cards).toHaveLength(4);
    expect(GRADE_5_HUB_SECTIONS[1].summary).toContain("2 sets · 24 words");
  });

  it("does not reuse the rejected draft science/math vocabulary files on the hub", () => {
    expect(idsFor(GRADE_5_HUB_SECTIONS)).not.toContain("grade-5-science-nature-words");
    expect(idsFor(GRADE_5_HUB_SECTIONS)).not.toContain("grade-5-math-vocabulary");
  });


});

describe("High-Frequency Words validation slice content", () => {
  it("keeps direct Kindergarten high-frequency cards on their canonical set destinations", () => {
    const highFrequencyCards = KINDERGARTEN_HUB_SECTIONS[1].cards;
    expect(highFrequencyCards.map((card) => card.id)).toEqual([
      "kindergarten-high-frequency-words-set-1",
      "kindergarten-high-frequency-words-set-2",
      "kindergarten-high-frequency-words-set-3",
      "kindergarten-high-frequency-words-set-4",
    ]);
    expect(highFrequencyCards.every((card) => card.kind === "list")).toBe(true);
  });

  it("publishes focused Number Words and Color Words", () => {
    const numberWords = source("spelling-lists/grade-level/kindergarten-number-words.md");
    const colorWords = source("spelling-lists/grade-level/kindergarten-color-words.md");

    expect(numberWords).toContain("urlSlug: kindergarten-number-words");
    expect(numberWords).toMatch(/words:\n {2}- one\n {2}- two\n {2}- three\n {2}- four\n {2}- five\n {2}- six\n {2}- seven\n {2}- eight\n {2}- nine\n {2}- ten/);
    expect(colorWords).toContain("urlSlug: kindergarten-color-words");
    expect(colorWords).toMatch(/words:\n {2}- red\n {2}- blue\n {2}- green\n {2}- yellow\n {2}- black\n {2}- white\n {2}- brown\n {2}- pink/);
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

const ALL_HUB_SECTIONS = [
  KINDERGARTEN_HUB_SECTIONS,
  GRADE_1_HUB_SECTIONS,
  GRADE_2_HUB_SECTIONS,
  GRADE_3_HUB_SECTIONS,
  GRADE_4_HUB_SECTIONS,
  GRADE_5_HUB_SECTIONS,
] as const;

function frontmatterValue(id: string, field: string): string {
  for (const path of contentFiles(join(contentRoot, "spelling-lists"))) {
    const value = readFileSync(path, "utf8");
    if (!new RegExp(`^id:\\s*["']?${id}["']?\\s*$`, "m").test(value)) continue;
    const match = value.match(new RegExp(`^${field}:\\s*["']?([^"'\\n]+)["']?\\s*$`, "m"));
    if (!match) throw new Error(`Missing ${field} for ${id}`);
    return match[1];
  }
  throw new Error(`Missing content entry ${id}`);
}

describe("Core Grade Hub canonical-title contract", () => {
  const coreRoutes = canonicalGradeRoutes.filter((route) => route.classification === "core-spelling");
  const coreDefinitions = ALL_HUB_SECTIONS.flatMap((sections) =>
    sections.find((section) => section.title === "Core Spelling")?.cards ?? [],
  );

  it("contains exactly 51 Core cards and every canonical Core destination exactly once", () => {
    expect(coreDefinitions).toHaveLength(51);
    expect(new Set(coreDefinitions.map((card) => card.id)).size).toBe(51);
    expect(coreDefinitions.map((card) => card.id)).toEqual(coreRoutes.map((route) => route.id));
  });

  it("omits authored Core titles so content frontmatter is the default source of truth", () => {
    expect(coreDefinitions.every((card) => card.title === undefined)).toBe(true);

    const entries = coreRoutes.map((route) => ({
      data: {
        id: route.id,
        title: frontmatterValue(route.id, "title"),
        category: "grade-level",
        urlSlug: route.finalSlug,
        words: ["example"],
      },
    })) as unknown as SpellingListEntry[];
    const rendered = ALL_HUB_SECTIONS.flatMap((sections) => buildGradeHubCards(sections, entries))
      .flatMap((section) => section.cards);

    for (const route of coreRoutes) {
      const card = rendered.find((candidate) => candidate.id === route.id);
      expect(card?.href, route.id).toBe(route.canonicalPath);
      expect(card?.title, route.id).toBe(frontmatterValue(route.id, "title"));
    }
  });

  it("keeps every exceptional override reviewed, documented, and Core-only", () => {
    for (const [id, override] of Object.entries(CORE_HUB_TITLE_OVERRIDES)) {
      expect(coreRoutes.some((route) => route.id === id), id).toBe(true);
      expect(override.title.trim().length, `${id} title`).toBeGreaterThan(0);
      expect(override.rationale.trim().length, `${id} rationale`).toBeGreaterThan(20);
      expect(override.title, `${id} mismatch`).not.toBe(frontmatterValue(id, "title"));
    }
    expect(Object.keys(CORE_HUB_TITLE_OVERRIDES)).toEqual([]);
  });
});
