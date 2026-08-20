import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Core Grade Units now have a deliberately narrower relationship model than
// non-Core pages: Review first -> Next step, with no Explore more. This test
// locks both that rule and the existing three-bucket non-Core order in
// source rather than rendered output, since the project has no
// DOM-capable Vitest environment or Astro component-testing harness to
// assert on rendered markup (environment: 'node', no jsdom/happy-dom, no
// @astrojs/container, no Playwright config).

describe('Relationship navigation rendering', () => {
  it('renders Explore more only for canonical non-Core Grade pages', () => {
    // The real file is src/pages/[gradeSlug]/[strand]/[slug].astro (the
    // bare src/pages/[gradeSlug]/[slug].astro path never existed). Non-Core
    // routes build a single `relatedGroups` view-model entry headed "Explore
    // more" (or the Themed-specific variant), passed into the shared
    // GradeUnitView — there's no separate Review-first/Next-step bucket on
    // this branch, that pairing is Core-only (see GradeUnitWorldPage.astro).
    const source = readFileSync(
      join(process.cwd(), 'src/pages/[gradeSlug]/[strand]/[slug].astro'),
      'utf8',
    );
    expect(source).toContain(
      "heading: isThemedSpellingPractice ? 'More themed spelling practice' : 'Explore more'",
    );
    expect(source).not.toContain("heading: 'Review first'");
    expect(source).not.toContain("heading: 'Next step'");
  });

  it('preserves the existing three-bucket model on Skill pages', () => {
    // The three-bucket "Where to go from here" model is built as a
    // `heading: '...'` view-model array inside SkillView.astro (the shared
    // Direction A component the Skill page renders), not as JSX heading
    // attributes on the page itself.
    const source = readFileSync(
      join(process.cwd(), 'src/components/direction-a/SkillView.astro'),
      'utf8',
    );
    const review = source.indexOf("heading: 'Review First'");
    const next = source.indexOf("heading: 'Next Step'");
    const explore = source.indexOf("heading: 'Explore More'");

    expect(review).toBeGreaterThan(-1);
    expect(next).toBeGreaterThan(-1);
    expect(explore).toBeGreaterThan(-1);
    expect(review).toBeLessThan(next);
    expect(next).toBeLessThan(explore);
  });

  it('renders Core copy in order without Explore More in the Grade Unit world renderer', () => {
    // GradeUnitWorldPage no longer has its own "Where to go from here"
    // wrapper copy or JSX-attribute headings — it builds a `relatedGroups`
    // view-model array (Review first, then Next step, in that order) for
    // the shared GradeUnitView to render, with no Explore More bucket.
    const path = join(process.cwd(), 'src/components/GradeUnitWorldPage.astro');
    const source = readFileSync(path, 'utf8');
    const review = source.indexOf("heading: 'Review first'");
    const next = source.indexOf("heading: 'Next step'");

    expect(review).toBeGreaterThan(-1);
    expect(review).toBeLessThan(next);
    expect(source).not.toMatch(/heading:\s*['"]Explore [Mm]ore['"]/);
    expect(source).not.toContain('data.relatedLists');
  });

  it('routes every Grade Unit away from the non-Core rendering branch', () => {
    // See note above: the real file lives one directory deeper, at
    // src/pages/[gradeSlug]/[strand]/[slug].astro.
    const source = readFileSync(
      join(process.cwd(), 'src/pages/[gradeSlug]/[strand]/[slug].astro'),
      'utf8',
    );
    expect(source).toContain("const isCoreSpelling = route.classification === 'core-spelling';");
    expect(source).toContain('{isCoreSpelling && <GradeUnitWorldPage listId={data.id} />}');
    expect(source).toContain('{!isCoreSpelling && (');
  });
});
