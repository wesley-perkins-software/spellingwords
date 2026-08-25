import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Source-level check that the 404 page always offers real, canonical
 * destinations back into the site — not a static render test (Astro
 * components aren't renderable under the node Vitest environment), but a
 * regression guard against a broken/stale link creeping into this page.
 *
 * Deliberately lives outside src/pages/: Astro treats every .ts file there
 * as a route/endpoint and tries to import it during `astro build`, which
 * breaks for a file that imports vitest.
 */

const source = readFileSync(
  path.resolve(__dirname, '../../pages/404.astro'),
  'utf-8',
);

const CANONICAL_STATIC_ROUTES = new Set(['/practice-your-own-words', '/grades', '/skills']);

describe('404 page', () => {
  it('renders inside the shared main-content landmark used by the skip link', () => {
    expect(source).toContain('id="main-content"');
  });

  it('only links to canonical, currently-existing static routes', () => {
    const hrefs = [...source.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);

    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(CANONICAL_STATIC_ROUTES.has(href)).toBe(true);
    }
  });

  it('never links back to itself or another error path', () => {
    const hrefs = [...source.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
    expect(hrefs).not.toEqual(expect.arrayContaining(['/404', '404', '']));
  });
});
