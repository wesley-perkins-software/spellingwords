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

const nonCoreRendererPaths = [
  join(process.cwd(), 'src/pages/[gradeSlug]/[slug].astro'),
  join(process.cwd(), 'src/pages/skills/[slug].astro'),
];

function indexOfHeading(source: string, heading: string): number {
  const match = source.match(new RegExp(`heading=["']${heading}["']`));
  if (!match || match.index === undefined) {
    throw new Error(`Could not find heading="${heading}" in source`);
  }
  return match.index;
}

describe('Relationship navigation rendering', () => {
  it.each(nonCoreRendererPaths)('preserves non-Core Review First -> Next Step -> Explore More order in %s', (path) => {
    const source = readFileSync(path, 'utf8');

    const reviewFirst = indexOfHeading(source, 'Review First');
    const nextStep = indexOfHeading(source, 'Next Step');
    const exploreMore = indexOfHeading(source, 'Explore More');

    expect(reviewFirst).toBeLessThan(nextStep);
    expect(nextStep).toBeLessThan(exploreMore);
  });

  it('renders Core copy in order without Explore More in the Grade Unit world renderer', () => {
    const path = join(process.cwd(), 'src/components/GradeUnitWorldPage.astro');
    const source = readFileSync(path, 'utf8');
    const outer = source.indexOf('Where to go from here');
    const review = indexOfHeading(source, 'Review first');
    const next = indexOfHeading(source, 'Next step');

    expect(outer).toBeGreaterThan(-1);
    expect(outer).toBeLessThan(review);
    expect(review).toBeLessThan(next);
    expect(source).not.toMatch(/heading=["']Explore [Mm]ore["']/);
    expect(source).not.toContain('data.relatedLists');
  });

  it('routes every Grade Unit away from the non-Core rendering branch', () => {
    const source = readFileSync(join(process.cwd(), 'src/pages/[gradeSlug]/[slug].astro'), 'utf8');
    expect(source).toContain("const isCoreSpelling = route.classification === 'core-spelling';");
    expect(source).toContain('{isCoreSpelling && <GradeUnitWorldPage listId={data.id} />}');
    expect(source).toContain('{!isCoreSpelling && (');
  });
});
