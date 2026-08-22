import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const pageSource = readFileSync(
  join(process.cwd(), 'src/pages/practice-your-own-words.astro'),
  'utf8',
);

describe('practice-your-own-words page', () => {
  it('has exactly one H1 with the expected heading', () => {
    expect(pageSource.match(/<h1\b/g)).toHaveLength(1);
    expect(pageSource).toContain('Practice Your Own Spelling Words');
  });

  it('carries accurate metadata with no fabricated claims', () => {
    expect(pageSource).toContain('title="Practice Your Own Spelling Words | SpellingWords"');
    // Never claims: a sentence for every custom word, private/encrypted sharing,
    // accounts, cloud storage, or student tracking.
    expect(pageSource.toLowerCase()).not.toMatch(/private link|encrypted/);
    expect(pageSource.toLowerCase()).not.toMatch(/create an account|sign up|log in/);
    expect(pageSource.toLowerCase()).not.toMatch(/cloud|dashboard|track(ed|ing)? (student|progress)/);
  });

  it('renders the shared entry tool directly, not merely a link to it', () => {
    expect(pageSource).toContain('<CustomWordEntry variant="full"');
  });

  it('does not emit BreadcrumbList structured data, matching the about.astro precedent', () => {
    expect(pageSource).not.toContain('BreadcrumbList');
    expect(pageSource).not.toContain('jsonLd=');
  });

  it('lets the tool dominate the page rather than routing it through the narrow supporting-page prose template used by pages like /about', () => {
    expect(pageSource).not.toContain('SupportingPage');
  });
});
