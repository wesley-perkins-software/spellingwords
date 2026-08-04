import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// The canonical Grade Unit Page Standard freezes the relationship
// navigation order as Review First -> Next Step -> Explore More.
// Both rendering paths call their card component three times
// with these exact heading labels; this test locks in the call order in
// source rather than rendered output, since the project has no
// DOM-capable Vitest environment or Astro component-testing harness to
// assert on rendered markup (environment: 'node', no jsdom/happy-dom, no
// @astrojs/container, no Playwright config).

const rendererPaths = [
  join(process.cwd(), 'src/pages/spelling-lists/[category]/[slug].astro'),
  join(process.cwd(), 'src/components/GradeUnitWorldPage.astro'),
];

function indexOfHeading(source: string, heading: string): number {
  const match = source.match(new RegExp(`heading=["']${heading}["']`));
  if (!match || match.index === undefined) {
    throw new Error(`Could not find heading="${heading}" in source`);
  }
  return match.index;
}

describe('Relationship navigation order (Review First -> Next Step -> Explore More)', () => {
  it.each(rendererPaths)('orders the three relationship buckets correctly in %s', (path) => {
    const source = readFileSync(path, 'utf8');

    const reviewFirst = indexOfHeading(source, 'Review First');
    const nextStep = indexOfHeading(source, 'Next Step');
    const exploreMore = indexOfHeading(source, 'Explore More');

    expect(reviewFirst).toBeLessThan(nextStep);
    expect(nextStep).toBeLessThan(exploreMore);
  });
});
