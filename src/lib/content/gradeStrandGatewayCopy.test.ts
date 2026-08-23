import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  canonicalGradeRoutes,
  getGradeStrandPath,
  gradeStrandGatewayPaths,
  GRADE_STRANDS,
  type GradeRouteClassification,
} from './canonicalGradeRoutes';
import { gradeConfig } from './gradeConfig';
import { getGradeStrandGatewayCopy, getGatewayCardDescription } from './gradeStrandGatewayCopy';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');
const gatewayRenderer = readFileSync(join(process.cwd(), 'src/pages/grades/[gradeSlug]/[strand].astro'), 'utf8');
const gatewayView = readFileSync(
  join(process.cwd(), 'src/components/direction-a/GradeStrandGatewayView.astro'),
  'utf8',
);
const gradeHubRenderer = readFileSync(join(process.cwd(), 'src/pages/grades/[gradeSlug].astro'), 'utf8');

function contentById(): Map<string, string> {
  const sources = new Map<string, string>();
  for (const relativePath of readdirSync(contentRoot, { recursive: true, encoding: 'utf8' })) {
    if (!relativePath.endsWith('.md')) continue;
    const source = readFileSync(join(contentRoot, relativePath), 'utf8');
    const id = source.match(/^id:\s*['"]?([^'"\n]+)['"]?$/m)?.[1];
    if (id) sources.set(id, source);
  }
  return sources;
}

function wordsIn(source: string): string[] {
  const block = source.match(/^words:\n([\s\S]*?)\n---/m)?.[1] ?? '';
  // Quoted entries may contain an apostrophe (contractions like "I'm", "it's", "don't";
  // possessive-styled themed words like "o'clock"), so quote-stripping must not use a character
  // class that also excludes the apostrophe inside the quotes — match the quoted span instead.
  return [
    ...block.matchAll(/^\s{2}-\s+(?:"([^"\n]*)"|'([^'\n]*)'|([^\s'"][^\n]*?))\s*$/gm),
  ].map((match) => match[1] ?? match[2] ?? match[3]);
}

const kindergartenRoutes = canonicalGradeRoutes.filter((route) => route.grade === 'K');
const routesFor = (strand: GradeRouteClassification) =>
  kindergartenRoutes.filter((route) => route.classification === strand);
const sources = contentById();
const factsFor = (strand: GradeRouteClassification) => {
  const routes = routesFor(strand);
  return {
    memberCount: routes.length,
    wordCount: routes.reduce((total, route) => total + wordsIn(sources.get(route.id) ?? '').length, 0),
  };
};

const grade1Routes = canonicalGradeRoutes.filter((route) => route.grade === '1');
const grade1RoutesFor = (strand: GradeRouteClassification) =>
  grade1Routes.filter((route) => route.classification === strand);
const grade1FactsFor = (strand: GradeRouteClassification) => {
  const routes = grade1RoutesFor(strand);
  return {
    memberCount: routes.length,
    wordCount: routes.reduce((total, route) => total + wordsIn(sources.get(route.id) ?? '').length, 0),
  };
};

const grade2Routes = canonicalGradeRoutes.filter((route) => route.grade === '2');
const grade2RoutesFor = (strand: GradeRouteClassification) =>
  grade2Routes.filter((route) => route.classification === strand);
const grade2FactsFor = (strand: GradeRouteClassification) => {
  const routes = grade2RoutesFor(strand);
  return {
    memberCount: routes.length,
    wordCount: routes.reduce((total, route) => total + wordsIn(sources.get(route.id) ?? '').length, 0),
  };
};

const grade3Routes = canonicalGradeRoutes.filter((route) => route.grade === '3');
const grade3RoutesFor = (strand: GradeRouteClassification) =>
  grade3Routes.filter((route) => route.classification === strand);
const grade3FactsFor = (strand: GradeRouteClassification) => {
  const routes = grade3RoutesFor(strand);
  return {
    memberCount: routes.length,
    wordCount: routes.reduce((total, route) => total + wordsIn(sources.get(route.id) ?? '').length, 0),
  };
};

const grade4Routes = canonicalGradeRoutes.filter((route) => route.grade === '4');
const grade4RoutesFor = (strand: GradeRouteClassification) =>
  grade4Routes.filter((route) => route.classification === strand);
const grade4FactsFor = (strand: GradeRouteClassification) => {
  const routes = grade4RoutesFor(strand);
  return {
    memberCount: routes.length,
    wordCount: routes.reduce((total, route) => total + wordsIn(sources.get(route.id) ?? '').length, 0),
  };
};

const grade5Routes = canonicalGradeRoutes.filter((route) => route.grade === '5');
const grade5RoutesFor = (strand: GradeRouteClassification) =>
  grade5Routes.filter((route) => route.classification === strand);
const grade5FactsFor = (strand: GradeRouteClassification) => {
  const routes = grade5RoutesFor(strand);
  return {
    memberCount: routes.length,
    wordCount: routes.reduce((total, route) => total + wordsIn(sources.get(route.id) ?? '').length, 0),
  };
};

describe('Kindergarten grade-strand gateway pilot', () => {
  it('retains exactly 18 canonical gateways, three per grade, including all Kindergarten strands', () => {
    expect(gradeStrandGatewayPaths).toHaveLength(18);
    for (const grade of gradeConfig) {
      expect(gradeStrandGatewayPaths.filter((path) => path.startsWith(`${grade.hubHref}/`))).toHaveLength(3);
    }
    expect(gradeStrandGatewayPaths.filter((path) => path.startsWith('/grades/kindergarten/'))).toEqual([
      '/grades/kindergarten/core-spelling',
      '/grades/kindergarten/high-frequency-words',
      '/grades/kindergarten/themed-spelling-practice',
    ]);
  });

  it('authors all three Kindergarten gateways, now that Grades 3–5 are also authored', () => {
    for (const strand of ['core-spelling', 'high-frequency-words', 'themed-spelling-practice'] as const) {
      expect(getGradeStrandGatewayCopy('K', strand, factsFor(strand))).toBeDefined();
      expect(getGradeStrandGatewayCopy('3', strand, factsFor(strand))).toBeDefined();
    }
  });

  it('keeps Core sequential, Kindergarten-specific, and complete in canonical order', () => {
    const routes = routesFor('core-spelling');
    expect(routes.map((route) => route.id)).toEqual([
      'kindergarten-first-words',
      'kindergarten-short-a-words',
      'kindergarten-short-i-words',
      'kindergarten-short-o-words',
      'kindergarten-short-u-words',
      'kindergarten-short-e-words',
      'kindergarten-mixed-vowel-review',
      'kindergarten-consonant-digraphs',
    ]);
    const copy = getGradeStrandGatewayCopy('K', 'core-spelling', factsFor('core-spelling'))!;
    expect(routes).toHaveLength(8);
    expect(copy.orientation).toMatch(/systematic starting sequence/);
    expect(copy.guidance).toMatch(/Begin with First Words/);
  });

  it('derives the HFW aggregate and preserves approved terminology', () => {
    const facts = factsFor('high-frequency-words');
    const copy = getGradeStrandGatewayCopy('K', 'high-frequency-words', facts)!;
    expect(facts).toEqual({ memberCount: 4, wordCount: 40 });
    expect(`${copy.orientation} ${copy.synthesis}`).toMatch(/40 commonly used spellings in 4 manageable sets/);
    expect(copy.synthesis).toMatch(/sound.spelling information/i);
    expect(Object.values(copy).join(' ')).not.toMatch(/sight words|common words|heart words|visual.shape/i);
  });

  it('keeps all five themed peers complete and explicitly non-sequential', () => {
    const routes = routesFor('themed-spelling-practice');
    expect(routes.map((route) => route.id)).toEqual([
      'kindergarten-animal-words',
      'kindergarten-body-words',
      'kindergarten-number-words',
      'kindergarten-color-words',
      'kindergarten-family-words',
    ]);
    const copy = getGradeStrandGatewayCopy('K', 'themed-spelling-practice', factsFor('themed-spelling-practice'))!;
    expect(routes).toHaveLength(5);
    expect(`${copy.orientation} ${copy.guidance}`).toMatch(/not a sequence|no required order/i);
    expect(copy.synthesis).not.toMatch(/progress|curriculum|required lesson/i);
  });

  it('generates same-grade wayfinding and uses unordered semantics for themed peers', () => {
    expect(getGradeStrandPath('K', 'core-spelling')).toBe('/grades/kindergarten/core-spelling');
    expect(getGradeStrandPath('K', 'high-frequency-words')).toBe('/grades/kindergarten/high-frequency-words');
    expect(getGradeStrandPath('K', 'themed-spelling-practice')).toBe('/grades/kindergarten/themed-spelling-practice');
    // Core Spelling and High-Frequency Words render an ordered <ol> sequence
    // (numbered units/sets); Themed Spelling Practice renders an unordered
    // <ul> browse grid — the strand branch lives in the Direction A view now.
    expect(gatewayView).toContain("{strand === 'themed-spelling-practice' && (\n    <ul");
    expect(gatewayView).toContain("{strand === 'core-spelling' && (\n    <ol");
    expect(gatewayView).toContain("{strand === 'high-frequency-words' && (\n    <ol");
    expect(gatewayRenderer).toContain('getGradeStrandPath(gradeEntry.grade, relatedStrand)');
    expect(gatewayView).toContain("index === wayfindingLinks.length - 1 ? '.' : ''");
    expect(gatewayView).not.toMatch(/<\/a>\s*\.\s*\n/);
  });

  it('links every gateway to both same-grade sibling gateways, generated (not a hardcoded matrix)', () => {
    // Regression guard: the wayfinding standard now requires full same-grade symmetry
    // (Core<->HFW<->Themed<->Core), superseding the Kindergarten pilot's Core-hub asymmetry.
    // The computation must stay derived from GRADE_STRANDS, not per-strand hand authoring.
    expect(gatewayRenderer).toContain(
      "const wayfindingStrands = (Object.keys(GRADE_STRANDS) as GradeRouteClassification[]).filter(",
    );
    expect(gatewayRenderer).not.toMatch(/wayfindingStrands:.*strand === 'core-spelling'/s);
    expect(gatewayRenderer).not.toContain("? ['high-frequency-words', 'themed-spelling-practice']");

    const allStrands = Object.keys(GRADE_STRANDS) as GradeRouteClassification[];
    expect(allStrands).toHaveLength(3);
    for (const gradeEntry of gradeConfig) {
      for (const strand of allStrands) {
        const siblingStrands = allStrands.filter((candidate) => candidate !== strand);
        expect(siblingStrands).toHaveLength(2);
        for (const sibling of siblingStrands) {
          expect(getGradeStrandPath(gradeEntry.grade, sibling)).toBe(
            `${gradeEntry.hubHref}/${GRADE_STRANDS[sibling].routeSegment}`,
          );
        }
      }
    }
  });

  it('renders cross-strand wayfinding unconditionally, not gated on authored pilot copy', () => {
    // Regression guard: wayfinding is structural navigation computed from GRADE_STRANDS /
    // getGradeStrandPath, independent of whether a grade+strand has authored orientation copy
    // yet. Only the synthesis/guidance prose block may depend on `pilotCopy` — the <nav> itself
    // must render for all 18 gateways, including the 15 that still use the renderer fallback.
    // wayfindingLinks is computed unconditionally in the page (not gated on `copy`)
    // and passed as a plain prop; the view renders its <nav> whenever the array is
    // non-empty, independent of the synthesis/guidance prose block above it.
    expect(gatewayRenderer).not.toMatch(/wayfindingLinks\s*=\s*copy/);
    expect(gatewayView).not.toMatch(/\{copy && \(\s*<nav/);
    const navIndex = gatewayView.indexOf('<nav aria-label={`More');
    const resourceListsIndex = gatewayView.lastIndexOf("strand === 'themed-spelling-practice'");
    expect(navIndex).toBeGreaterThan(-1);
    expect(navIndex).toBeGreaterThan(resourceListsIndex);
    // The synthesis/guidance block, not the nav, is the part still allowed to depend on `copy`.
    expect(gatewayRenderer).toContain('synthesis={copy?.synthesis}');
    expect(gatewayRenderer).toContain('guidance={copy?.guidance}');
  });

  it('never exposes raw category classification badges on any of the three gateway strands', () => {
    // Regression guard: Core previously leaked "Grade-Level" (First Words) vs.
    // "Phonics" (its 7 siblings) — a real internal-taxonomy split with no
    // public comparison value — and HFW repeated "High-Frequency Words" on
    // every card of a page already titled and sub-titled with those words.
    // All three strands must suppress the category badge unconditionally, not
    // strand-conditionally, so a future strand can't reintroduce this by omission.
    // The Direction A gateway cards are built inline in GradeStrandGatewayView
    // (not via SpellingListCard) and never reference entry.data.category —
    // cards render only title/description/wordCount, so there is no raw
    // category value for any strand to leak.
    expect(gatewayView).not.toMatch(/data\.category|entry\.category|\bcategory\b/);
    expect(gatewayRenderer).not.toMatch(/showCategoryBadge/);
  });



  it("HFW gateway cards lead with differentiating content instead of repeating their own title", () => {
    const hfwRoutes = routesFor('high-frequency-words');
    expect(hfwRoutes).toHaveLength(4);
    for (const route of hfwRoutes) {
      const source = sources.get(route.id);
      expect(source, `missing content source for ${route.id}`).toBeDefined();
      const title = source!.match(/^title:\s*['"]?([^'"\n]+?)['"]?\s*$/m)![1];
      const description = source!.match(/^description:\s*['"]([\s\S]*?)['"]\s*$/m)![1];
      const shortAnswer = source!.match(/^shortAnswer:\s*['"]([\s\S]*?)['"]\s*$/m)![1];

      // The frozen member-page description is expected to open with its own
      // title (useful there); confirms the corpus assumption this fix relies on.
      expect(description.startsWith(title)).toBe(true);

      const cardDescription = getGatewayCardDescription(route.classification, description, shortAnswer);
      expect(cardDescription).toBe(shortAnswer);
      expect(cardDescription.startsWith(title)).toBe(false);
      // The differentiating substance (word-level detail) must still be present.
      expect(cardDescription.length).toBeGreaterThan(20);
    }
  });

  it('falls back to the member description when a strand has no shortAnswer to prefer', () => {
    expect(getGatewayCardDescription('core-spelling', 'A description.', undefined)).toBe('A description.');
    expect(getGatewayCardDescription('themed-spelling-practice', 'A description.', 'A short answer.')).toBe(
      'A description.',
    );
    expect(getGatewayCardDescription('high-frequency-words', 'A description.', undefined)).toBe('A description.');
  });

  it('keeps authored copy independent of positional presentation instructions', () => {
    const prose = (['core-spelling', 'high-frequency-words', 'themed-spelling-practice'] as const)
      .flatMap((strand) => Object.values(getGradeStrandGatewayCopy('K', strand, factsFor(strand))!))
      .join(' ');
    expect(prose).not.toMatch(/\b(?:above|below|card|box|column|scroll)\b/i);
  });
});

describe('Grade 1 grade-strand gateway rollout', () => {
  it('authors all three Grade 1 gateways, distinct from the Grade 3 copy for the same strand', () => {
    for (const strand of ['core-spelling', 'high-frequency-words', 'themed-spelling-practice'] as const) {
      expect(getGradeStrandGatewayCopy('1', strand, grade1FactsFor(strand))).toBeDefined();
      expect(getGradeStrandGatewayCopy('1', strand, grade1FactsFor(strand))).not.toEqual(
        getGradeStrandGatewayCopy('3', strand, grade1FactsFor(strand)),
      );
    }
  });

  it('keeps Core sequential, complete, and in the frozen canonical order', () => {
    const routes = grade1RoutesFor('core-spelling');
    expect(routes.map((route) => route.id)).toEqual([
      'grade-1-cvc-short-vowels-c-k-rule',
      'grade-1-floss-rule',
      'grade-1-consonant-digraphs-final-ck',
      'grade-1-beginning-consonant-blends',
      'grade-1-ending-consonant-blends',
      'grade-1-long-vowels-silent-e',
      'grade-1-open-syllables-final-y',
      'grade-1-long-a-long-o-vowel-teams',
      'grade-1-inflectional-endings-s-es',
      'grade-1-inflectional-endings-ed-ing',
      'grade-1-r-controlled-ar-or',
      'grade-1-tch-dge-ending-rules',
    ]);
    expect(routes).toHaveLength(12);
    const copy = getGradeStrandGatewayCopy('1', 'core-spelling', grade1FactsFor('core-spelling'))!;
    expect(copy.orientation).toMatch(/12 ordered units/);
    expect(copy.orientation).toMatch(/silent e/i);
    expect(copy.guidance).toMatch(/CVC Short Vowel Review and the C\/K Rule/);
    // Conservative "where to begin": strong short-vowel CVC spelling alone must not
    // imply skipping the FLOSS, digraph/final-ck, or blend units.
    expect(copy.guidance).toMatch(/FLOSS Rule|Consonant Digraphs and Final -ck/);
    expect(copy.guidance).not.toMatch(/skip ahead to|jump ahead to|can skip/i);
  });

  it('derives the HFW aggregate from the frozen 7-set/84-word inventory and preserves approved terminology', () => {
    const facts = grade1FactsFor('high-frequency-words');
    expect(facts).toEqual({ memberCount: 7, wordCount: 84 });
    const copy = getGradeStrandGatewayCopy('1', 'high-frequency-words', facts)!;
    expect(`${copy.orientation} ${copy.synthesis} ${copy.guidance}`).toMatch(/84 spellings into 7 sets/);
    expect(copy.synthesis).toMatch(/does not|not whether/i);
    expect(copy.synthesis).toMatch(/cumulative/i);
    expect(Object.values(copy).join(' ')).not.toMatch(/sight words|common words|heart words|visual.shape/i);
  });

  it('keeps all five themed peers complete and explicitly non-sequential', () => {
    const routes = grade1RoutesFor('themed-spelling-practice');
    expect(routes).toHaveLength(5);
    expect(new Set(routes.map((route) => route.id))).toEqual(
      new Set([
        'grade-1-weather-words',
        'grade-1-clothing-words',
        'grade-1-shape-words',
        'grade-1-number-words-11-20',
        'grade-1-days-of-the-week',
      ]),
    );
    const copy = getGradeStrandGatewayCopy('1', 'themed-spelling-practice', grade1FactsFor('themed-spelling-practice'))!;
    expect(`${copy.orientation} ${copy.guidance}`).toMatch(/not a sequence|no required order/i);
    expect(copy.synthesis).not.toMatch(/progress|curriculum|required lesson|retriev|retent|memory/i);
  });

  it('generates same-grade wayfinding for Grade 1 and uses unordered semantics for themed peers', () => {
    expect(getGradeStrandPath('1', 'core-spelling')).toBe('/grades/1st-grade/core-spelling');
    expect(getGradeStrandPath('1', 'high-frequency-words')).toBe('/grades/1st-grade/high-frequency-words');
    expect(getGradeStrandPath('1', 'themed-spelling-practice')).toBe('/grades/1st-grade/themed-spelling-practice');
  });

  it('keeps Grade 1 authored copy independent of positional presentation instructions', () => {
    const prose = (['core-spelling', 'high-frequency-words', 'themed-spelling-practice'] as const)
      .flatMap((strand) => Object.values(getGradeStrandGatewayCopy('1', strand, grade1FactsFor(strand))!))
      .join(' ');
    expect(prose).not.toMatch(/\b(?:above|below|card|box|column|scroll)\b/i);
  });
});

describe('2nd Grade strand gateways', () => {
  it('authors all three 2nd Grade gateways, distinct from the Grade 3 copy for the same strand', () => {
    for (const strand of ['core-spelling', 'high-frequency-words', 'themed-spelling-practice'] as const) {
      expect(getGradeStrandGatewayCopy('2', strand, grade2FactsFor(strand))).toBeDefined();
      expect(getGradeStrandGatewayCopy('2', strand, grade2FactsFor(strand))).not.toEqual(
        getGradeStrandGatewayCopy('3', strand, grade2FactsFor(strand)),
      );
    }
  });

  it('keeps Core sequential, 2nd-Grade-specific, and complete in canonical order', () => {
    const routes = grade2RoutesFor('core-spelling');
    expect(routes.map((route) => route.id)).toEqual([
      'grade-2-long-e-ee-ea',
      'grade-2-long-i-ie-igh',
      'vowel-teams-oi-oy',
      'vowel-teams-ou-ow',
      'grade-2-oo-two-sounds',
      'grade-2-au-aw-words',
      'grade-2-r-controlled-er-ir-ur',
      'grade-2-soft-c-soft-g',
      'grade-2-two-syllable-words',
      'grade-2-final-stable-le',
      'grade-2-silent-letter-words',
      'grade-2-list-02',
      'grade-2-contractions',
    ]);
    expect(routes).toHaveLength(13);
    const copy = getGradeStrandGatewayCopy('2', 'core-spelling', grade2FactsFor('core-spelling'))!;
    expect(copy.orientation).toMatch(/13 units/);
    expect(copy.guidance).toMatch(/Begin with Long E Vowel Teams/);
    // Conservative skipping guidance: an early unit must not license skipping unrelated later units.
    expect(copy.guidance).toMatch(/does not mean.*can be skipped/i);
  });

  it('derives the HFW aggregate and preserves approved terminology', () => {
    const facts = grade2FactsFor('high-frequency-words');
    const copy = getGradeStrandGatewayCopy('2', 'high-frequency-words', facts)!;
    expect(facts).toEqual({ memberCount: 7, wordCount: 84 });
    expect(`${copy.orientation} ${copy.synthesis}`).toMatch(/84 commonly used spellings in 7 sets/);
    expect(copy.synthesis).toMatch(/sound.spelling knowledge/i);
    expect(copy.synthesis).toMatch(/cumulatively/i);
    expect(Object.values(copy).join(' ')).not.toMatch(/sight words|common words|heart words|visual.shape/i);
  });

  it('keeps all five themed peers complete and explicitly non-sequential', () => {
    const routes = grade2RoutesFor('themed-spelling-practice');
    expect(routes.map((route) => route.id)).toEqual([
      'grade-2-transportation-words',
      'grade-2-money-words',
      'grade-2-number-words-20-100',
      'grade-2-community-helpers',
      'grade-2-months-of-the-year',
    ]);
    const copy = getGradeStrandGatewayCopy('2', 'themed-spelling-practice', grade2FactsFor('themed-spelling-practice'))!;
    expect(routes).toHaveLength(5);
    expect(`${copy.orientation} ${copy.guidance}`).toMatch(/not a sequence|no required order/i);
    expect(copy.synthesis).not.toMatch(/retention|retrieval|progress|curriculum|required lesson/i);
  });

  it('generates same-grade wayfinding for 2nd Grade from canonical route data', () => {
    expect(getGradeStrandPath('2', 'core-spelling')).toBe('/grades/2nd-grade/core-spelling');
    expect(getGradeStrandPath('2', 'high-frequency-words')).toBe('/grades/2nd-grade/high-frequency-words');
    expect(getGradeStrandPath('2', 'themed-spelling-practice')).toBe('/grades/2nd-grade/themed-spelling-practice');
    expect(gradeStrandGatewayPaths.filter((path) => path.startsWith('/grades/2nd-grade/'))).toEqual([
      '/grades/2nd-grade/core-spelling',
      '/grades/2nd-grade/high-frequency-words',
      '/grades/2nd-grade/themed-spelling-practice',
    ]);
  });

  it('keeps 2nd Grade authored copy independent of positional presentation instructions', () => {
    const prose = (['core-spelling', 'high-frequency-words', 'themed-spelling-practice'] as const)
      .flatMap((strand) => Object.values(getGradeStrandGatewayCopy('2', strand, grade2FactsFor(strand))!))
      .join(' ');
    expect(prose).not.toMatch(/\b(?:above|below|card|box|column|scroll)\b/i);
  });
});

describe('3rd Grade strand gateways', () => {
  it('authors all three 3rd Grade gateways', () => {
    for (const strand of ['core-spelling', 'high-frequency-words', 'themed-spelling-practice'] as const) {
      expect(getGradeStrandGatewayCopy('3', strand, grade3FactsFor(strand))).toBeDefined();
    }
  });

  it('keeps Core sequential, 3rd-Grade-specific, and complete in canonical order', () => {
    const routes = grade3RoutesFor('core-spelling');
    expect(routes.map((route) => route.id)).toEqual([
      'grade-3-prefix-words',
      'grade-3-suffix-words',
      'grade-3-suffix-spelling-changes',
      'grade-3-possessives',
      'grade-3-multisyllabic-words',
      'grade-3-homophones',
      'grade-3-root-word-families',
    ]);
    expect(routes).toHaveLength(7);
    const copy = getGradeStrandGatewayCopy('3', 'core-spelling', grade3FactsFor('core-spelling'))!;
    expect(copy.orientation).toMatch(/7 ordered units/);
    expect(copy.orientation).toMatch(/3rd Grade/);
    expect(copy.guidance).toMatch(/Begin with Prefix Words/);
    expect(copy.guidance).not.toMatch(/skip ahead to|jump ahead to|can skip/i);
  });

  it('derives the HFW aggregate from the frozen 5-set/60-word inventory and preserves approved terminology', () => {
    const facts = grade3FactsFor('high-frequency-words');
    expect(facts).toEqual({ memberCount: 5, wordCount: 60 });
    const copy = getGradeStrandGatewayCopy('3', 'high-frequency-words', facts)!;
    expect(`${copy.orientation} ${copy.synthesis} ${copy.guidance}`).toMatch(/60 spellings into 5 sets/);
    expect(copy.synthesis).toMatch(/not that its spelling is irregular/i);
    expect(copy.synthesis).toMatch(/cumulatively/i);
    expect(Object.values(copy).join(' ')).not.toMatch(/sight words|common words|heart words|visual.shape/i);
  });

  it('keeps all four themed peers complete and explicitly non-sequential', () => {
    const routes = grade3RoutesFor('themed-spelling-practice');
    expect(routes.map((route) => route.id)).toEqual([
      'grade-3-map-globe-words',
      'grade-3-life-cycle-words',
      'grade-3-time-words',
      'grade-3-multiplication-division-words',
    ]);
    const copy = getGradeStrandGatewayCopy('3', 'themed-spelling-practice', grade3FactsFor('themed-spelling-practice'))!;
    expect(routes).toHaveLength(4);
    expect(`${copy.orientation} ${copy.guidance}`).toMatch(/not a sequence|no required order/i);
    expect(copy.synthesis).not.toMatch(/retention|retrieval|progress|curriculum|required lesson/i);
  });

  it('generates same-grade wayfinding for 3rd Grade from canonical route data', () => {
    expect(getGradeStrandPath('3', 'core-spelling')).toBe('/grades/3rd-grade/core-spelling');
    expect(getGradeStrandPath('3', 'high-frequency-words')).toBe('/grades/3rd-grade/high-frequency-words');
    expect(getGradeStrandPath('3', 'themed-spelling-practice')).toBe('/grades/3rd-grade/themed-spelling-practice');
    expect(gradeStrandGatewayPaths.filter((path) => path.startsWith('/grades/3rd-grade/'))).toEqual([
      '/grades/3rd-grade/core-spelling',
      '/grades/3rd-grade/high-frequency-words',
      '/grades/3rd-grade/themed-spelling-practice',
    ]);
  });

  it('keeps 3rd Grade authored copy independent of positional presentation instructions', () => {
    const prose = (['core-spelling', 'high-frequency-words', 'themed-spelling-practice'] as const)
      .flatMap((strand) => Object.values(getGradeStrandGatewayCopy('3', strand, grade3FactsFor(strand))!))
      .join(' ');
    expect(prose).not.toMatch(/\b(?:above|below|card|box|column|scroll)\b/i);
  });
});

describe('4th Grade strand gateways', () => {
  it('authors all three 4th Grade gateways', () => {
    for (const strand of ['core-spelling', 'high-frequency-words', 'themed-spelling-practice'] as const) {
      expect(getGradeStrandGatewayCopy('4', strand, grade4FactsFor(strand))).toBeDefined();
    }
  });

  it('keeps Core sequential, 4th-Grade-specific, and complete in canonical order', () => {
    const routes = grade4RoutesFor('core-spelling');
    expect(routes.map((route) => route.id)).toEqual([
      'grade-4-multisyllabic-academic-words',
      'grade-4-advanced-prefixes',
      'grade-4-advanced-suffixes',
      'tier-1-roots-and-patterns',
      'grade-4-commonly-confused-words',
      'grade-4-derived-words',
    ]);
    expect(routes).toHaveLength(6);
    const copy = getGradeStrandGatewayCopy('4', 'core-spelling', grade4FactsFor('core-spelling'))!;
    expect(copy.orientation).toMatch(/6 ordered units/);
    expect(copy.orientation).toMatch(/4th Grade/);
    expect(copy.guidance).toMatch(/Begin with Multisyllabic Academic Words/);
    expect(copy.guidance).not.toMatch(/skip ahead to|jump ahead to|can skip/i);
  });

  it('derives the HFW aggregate from the frozen 2-set/24-word inventory without apologizing for its size', () => {
    const facts = grade4FactsFor('high-frequency-words');
    expect(facts).toEqual({ memberCount: 2, wordCount: 24 });
    const copy = getGradeStrandGatewayCopy('4', 'high-frequency-words', facts)!;
    expect(`${copy.orientation} ${copy.synthesis} ${copy.guidance}`).toMatch(/24 spellings into 2 sets/);
    expect(copy.synthesis).toMatch(/not that its spelling is irregular/i);
    expect(Object.values(copy).join(' ')).not.toMatch(/sight words|common words|heart words|visual.shape/i);
    expect(Object.values(copy).join(' ')).not.toMatch(/only|just|smaller|sorry|unfortunately/i);
  });

  it('keeps all four themed peers complete and explicitly non-sequential', () => {
    const routes = grade4RoutesFor('themed-spelling-practice');
    expect(routes.map((route) => route.id)).toEqual([
      'grade-4-measurement-words',
      'grade-4-solar-system-words',
      'grade-4-career-occupation-words',
      'grade-4-geometry-words',
    ]);
    const copy = getGradeStrandGatewayCopy('4', 'themed-spelling-practice', grade4FactsFor('themed-spelling-practice'))!;
    expect(routes).toHaveLength(4);
    expect(`${copy.orientation} ${copy.guidance}`).toMatch(/not a sequence|no required order/i);
    expect(copy.synthesis).not.toMatch(/retention|retrieval|progress|curriculum|required lesson/i);
  });

  it('generates same-grade wayfinding for 4th Grade from canonical route data', () => {
    expect(getGradeStrandPath('4', 'core-spelling')).toBe('/grades/4th-grade/core-spelling');
    expect(getGradeStrandPath('4', 'high-frequency-words')).toBe('/grades/4th-grade/high-frequency-words');
    expect(getGradeStrandPath('4', 'themed-spelling-practice')).toBe('/grades/4th-grade/themed-spelling-practice');
    expect(gradeStrandGatewayPaths.filter((path) => path.startsWith('/grades/4th-grade/'))).toEqual([
      '/grades/4th-grade/core-spelling',
      '/grades/4th-grade/high-frequency-words',
      '/grades/4th-grade/themed-spelling-practice',
    ]);
  });

  it('keeps 4th Grade authored copy independent of positional presentation instructions', () => {
    const prose = (['core-spelling', 'high-frequency-words', 'themed-spelling-practice'] as const)
      .flatMap((strand) => Object.values(getGradeStrandGatewayCopy('4', strand, grade4FactsFor(strand))!))
      .join(' ');
    expect(prose).not.toMatch(/\b(?:above|below|card|box|column|scroll)\b/i);
  });
});

describe('5th Grade strand gateways', () => {
  it('authors all three 5th Grade gateways', () => {
    for (const strand of ['core-spelling', 'high-frequency-words', 'themed-spelling-practice'] as const) {
      expect(getGradeStrandGatewayCopy('5', strand, grade5FactsFor(strand))).toBeDefined();
    }
  });

  it('keeps Core sequential, 5th-Grade-specific, and complete in canonical order', () => {
    const routes = grade5RoutesFor('core-spelling');
    expect(routes.map((route) => route.id)).toEqual([
      'grade-5-multisyllabic-academic-words',
      'grade-5-prefix-suffix-words',
      'grade-5-greek-latin-word-parts',
      'grade-5-commonly-confused-words',
      'grade-5-spelling-changes-related-words',
    ]);
    expect(routes).toHaveLength(5);
    const copy = getGradeStrandGatewayCopy('5', 'core-spelling', grade5FactsFor('core-spelling'))!;
    expect(copy.orientation).toMatch(/5 ordered units/);
    expect(copy.orientation).toMatch(/5th Grade/);
    expect(copy.guidance).toMatch(/Begin with Multisyllabic Academic Words/);
    expect(copy.guidance).not.toMatch(/skip ahead to|jump ahead to|can skip/i);
  });

  it('derives the HFW aggregate from the frozen 2-set/24-word inventory and preserves approved terminology', () => {
    const facts = grade5FactsFor('high-frequency-words');
    expect(facts).toEqual({ memberCount: 2, wordCount: 24 });
    const copy = getGradeStrandGatewayCopy('5', 'high-frequency-words', facts)!;
    expect(`${copy.orientation} ${copy.synthesis} ${copy.guidance}`).toMatch(/24 spellings into 2 sets/);
    expect(copy.synthesis).toMatch(/not that its spelling is irregular/i);
    expect(Object.values(copy).join(' ')).not.toMatch(/sight words|common words|heart words|visual.shape/i);
  });

  it('keeps all four themed peers complete and explicitly non-sequential', () => {
    const routes = grade5RoutesFor('themed-spelling-practice');
    expect(routes.map((route) => route.id)).toEqual([
      'grade-5-money-management-words',
      'grade-5-ecosystem-environment-words',
      'grade-5-fraction-decimal-words',
      'grade-5-community-civics-words',
    ]);
    const copy = getGradeStrandGatewayCopy('5', 'themed-spelling-practice', grade5FactsFor('themed-spelling-practice'))!;
    expect(routes).toHaveLength(4);
    expect(`${copy.orientation} ${copy.guidance}`).toMatch(/not a sequence|no required order/i);
    expect(copy.synthesis).not.toMatch(/retention|retrieval|progress|required lesson/i);
  });

  it('generates same-grade wayfinding for 5th Grade from canonical route data', () => {
    expect(getGradeStrandPath('5', 'core-spelling')).toBe('/grades/5th-grade/core-spelling');
    expect(getGradeStrandPath('5', 'high-frequency-words')).toBe('/grades/5th-grade/high-frequency-words');
    expect(getGradeStrandPath('5', 'themed-spelling-practice')).toBe('/grades/5th-grade/themed-spelling-practice');
    expect(gradeStrandGatewayPaths.filter((path) => path.startsWith('/grades/5th-grade/'))).toEqual([
      '/grades/5th-grade/core-spelling',
      '/grades/5th-grade/high-frequency-words',
      '/grades/5th-grade/themed-spelling-practice',
    ]);
  });

  it('keeps 5th Grade authored copy independent of positional presentation instructions', () => {
    const prose = (['core-spelling', 'high-frequency-words', 'themed-spelling-practice'] as const)
      .flatMap((strand) => Object.values(getGradeStrandGatewayCopy('5', strand, grade5FactsFor(strand))!))
      .join(' ');
    expect(prose).not.toMatch(/\b(?:above|below|card|box|column|scroll)\b/i);
  });
});

describe('Full K–5 grade-strand gateway corpus', () => {
  it('authors copy for all 18 canonical gateways now that Grades 3–5 are complete', () => {
    for (const grade of gradeConfig) {
      for (const strand of ['core-spelling', 'high-frequency-words', 'themed-spelling-practice'] as const) {
        const routes = canonicalGradeRoutes.filter(
          (route) => route.grade === grade.grade && route.classification === strand,
        );
        const facts = {
          memberCount: routes.length,
          wordCount: routes.reduce((total, route) => total + wordsIn(sources.get(route.id) ?? '').length, 0),
        };
        const copy = getGradeStrandGatewayCopy(grade.grade, strand, facts);
        expect(copy, `missing authored copy for ${grade.grade} ${strand}`).toBeDefined();
        expect(copy!.orientation.length).toBeGreaterThan(0);
        expect(copy!.synthesis.length).toBeGreaterThan(0);
      }
    }
  });

  it('matches the frozen deepest-member-page corpus totals (51 Core / 27 HFW / 27 Themed / 105 total)', () => {
    const byStrand = (strand: GradeRouteClassification) =>
      canonicalGradeRoutes.filter((route) => route.classification === strand).length;
    expect(byStrand('core-spelling')).toBe(51);
    expect(byStrand('high-frequency-words')).toBe(27);
    expect(byStrand('themed-spelling-practice')).toBe(27);
    expect(canonicalGradeRoutes.length).toBe(105);
  });

  it('matches the frozen HFW corpus totals (27 sets / 316 assignments)', () => {
    const hfwRoutes = canonicalGradeRoutes.filter((route) => route.classification === 'high-frequency-words');
    expect(hfwRoutes).toHaveLength(27);
    const totalWords = hfwRoutes.reduce((total, route) => total + wordsIn(sources.get(route.id) ?? '').length, 0);
    expect(totalWords).toBe(316);
  });

  it('matches the frozen Themed corpus totals (27 pages / 237 entries)', () => {
    const themedRoutes = canonicalGradeRoutes.filter(
      (route) => route.classification === 'themed-spelling-practice',
    );
    expect(themedRoutes).toHaveLength(27);
    const totalWords = themedRoutes.reduce((total, route) => total + wordsIn(sources.get(route.id) ?? '').length, 0);
    expect(totalWords).toBe(237);
  });
});
