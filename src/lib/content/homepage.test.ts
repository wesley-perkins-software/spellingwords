import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SKILLS_INDEX_PATH, getCanonicalSkillRoutes } from './canonicalSkillRoutes';
import { gradeConfig } from './gradeConfig';
import {
  HOMEPAGE_URL,
  HOMEPAGE_SKILL_COUNT,
  HOMEPAGE_SKILL_FAMILY_COUNT,
  HOMEPAGE_SKILL_FAMILIES,
  HOMEPAGE_STRANDS,
  HOMEPAGE_CLOSING_STATEMENT,
  HOMEPAGE_FAQ,
  homepageGradeHubs,
  homepageJsonLd,
  homepageFaqJsonLd,
} from './homepage';
import { gradeStrandGatewayPaths, getCanonicalGradeRoutes } from './canonicalGradeRoutes';
import { SPELLING_SKILL_FAMILIES } from './spellingSkills';

const homepageSource = readFileSync(join(process.cwd(), 'src/pages/index.astro'), 'utf8');
const customWordEntrySource = readFileSync(
  join(process.cwd(), 'src/components/CustomWordEntry.astro'),
  'utf8',
);

describe('canonical homepage', () => {
  it('has one immediate page heading and complete, accurate metadata', () => {
    expect(homepageSource.match(/<h1\b/g)).toHaveLength(1);
    expect(homepageSource).toContain(
      'Practice <span class="text-da-coral-strong">spelling</span> your way.',
    );
    expect(homepageSource).toContain(
      'title="Free K–5 Spelling Practice by Grade or Skill, No Account | SpellingWords.app"',
    );
    expect(homepageSource).toMatch(
      /description="[^"]*Free[^"]*K–5 students[^"]*no account required[^"]*grade or spelling skill[^"]*"/,
    );
  });

  it('refers to the audience as students, not children', () => {
    expect(homepageSource.toLowerCase()).not.toMatch(/\bchildren\b/);
  });

  it('derives exactly the six visible Grade Hub destinations from canonical grade data, each with its approved teaser and focus line', () => {
    expect(homepageGradeHubs).toHaveLength(6);
    expect(homepageGradeHubs.map(({ label, href }) => ({ label, href }))).toEqual(
      gradeConfig.map(({ label, hubHref }) => ({ label, href: hubHref })),
    );
    for (const hub of homepageGradeHubs) {
      expect(typeof hub.teaser).toBe('string');
      expect(hub.teaser.length).toBeGreaterThan(0);
      expect(typeof hub.focus).toBe('string');
      expect(hub.focus.length).toBeGreaterThan(0);
    }
    expect(homepageSource).toContain('gradeCards.map');
    expect(homepageSource).toContain('{teaser}');
    expect(homepageSource).toContain('{focus}');
  });

  it('names the three canonical curriculum strands bare, once, in Browse by Grade, and again, briefly, in the Curriculum-Organization section', () => {
    const strandNames = ['Core Spelling', 'High-Frequency Words', 'Themed Spelling Practice'];

    // Bare naming: the Browse by Grade orienting paragraph names all three,
    // with no per-strand explanation attached to that mention.
    const gradeSectionMatch = homepageSource.match(
      /BROWSE BY GRADE[\s\S]*?(?=BROWSE BY SKILL|HOW THE K-5 CURRICULUM)/,
    );
    expect(gradeSectionMatch).not.toBeNull();
    const gradeSection = gradeSectionMatch![0];
    for (const strand of strandNames) {
      expect(gradeSection).toContain(strand);
    }

    // Compressed explanation (V4 reopening pass): the Curriculum-Organization
    // section names each strand once more with a short one-clause role,
    // rather than a full definition and example list, and each strand name
    // links to its cross-grade gateway.
    expect(HOMEPAGE_STRANDS.map((s) => s.name)).toEqual(strandNames);
    expect(HOMEPAGE_STRANDS.map((s) => s.href)).toEqual([
      '/core-spelling',
      '/high-frequency-words',
      '/themed-spelling-practice',
    ]);
    for (const strand of HOMEPAGE_STRANDS) expect(strand.role.length).toBeGreaterThan(0);
    expect(homepageSource).toContain('coreStrand.name');
    expect(homepageSource).toContain('strand.name');
    expect(homepageSource).toContain('href={coreStrand.href}');
    expect(homepageSource).toContain('href={strand.href}');
  });

  it('presents grade and skill browsing as coequal semantic sections', () => {
    expect(homepageSource).toMatch(/<h2[^>]*id="grade-heading"[^>]*>\s*Browse by Grade\s*<\/h2>/);
    expect(homepageSource).toMatch(/<h2[^>]*id="skill-heading"[^>]*>\s*Browse by Skill\s*<\/h2>/);
    expect(homepageSource).toContain('href={SKILLS_INDEX_PATH}');
    expect(SKILLS_INDEX_PATH).toBe('/skills');
  });

  it('states the real Skill and Skill Family counts exactly once, in Browse by Skill, and names all twelve canonical Skill Families as unlinked plain text', () => {
    expect(HOMEPAGE_SKILL_COUNT).toBe(getCanonicalSkillRoutes().length);
    expect(HOMEPAGE_SKILL_COUNT).toBe(41);
    // "HOMEPAGE_SKILL_COUNT" appears twice in source: once in the import, once
    // where it is rendered — the count itself is stated exactly once on the page.
    expect(homepageSource.match(/HOMEPAGE_SKILL_COUNT/g)).toHaveLength(2);
    expect(homepageSource).toContain('{HOMEPAGE_SKILL_COUNT}');
    expect(homepageSource.match(/HOMEPAGE_SKILL_FAMILY_COUNT/g)).toHaveLength(2);
    expect(homepageSource).toContain('{HOMEPAGE_SKILL_FAMILY_COUNT}');

    // All twelve family names are sourced programmatically from
    // SPELLING_SKILL_FAMILIES (the same taxonomy /skills renders from), not
    // duplicated as a separate hardcoded list that could drift.
    expect(HOMEPAGE_SKILL_FAMILY_COUNT).toBe(12);
    expect(HOMEPAGE_SKILL_FAMILIES).toEqual(SPELLING_SKILL_FAMILIES.map((f) => f.title));

    // Family names render as plain text, from the shared data source (never
    // hyperlinked, never described, never given a per-family count) —
    // /skills remains the sole destination for selecting a family or Skill.
    expect(homepageSource).toContain('HOMEPAGE_SKILL_FAMILIES');
    expect(homepageSource).toContain('skillFamilyRows.map');
    for (const skillLink of getCanonicalSkillRoutes()) {
      expect(homepageSource).not.toContain(`href="${skillLink.canonicalPath}"`);
    }
  });

  it('names the three curriculum strands with a full description and example concepts, linking each to its cross-grade gateway', () => {
    expect(homepageSource).toMatch(
      /<h2[^>]*id="curriculum-org-heading"[^>]*>\s*How the K–5 curriculum is organized\s*<\/h2>/,
    );
    for (const strand of HOMEPAGE_STRANDS) {
      expect(strand.role.length).toBeGreaterThan(0);
      expect(strand.description.length).toBeGreaterThan(0);
      expect(strand.examples.length).toBeGreaterThanOrEqual(3);
    }
    // Each strand's description and example list are rendered from the
    // shared data source, not restated as separate hardcoded copy.
    expect(homepageSource).toContain('coreStrand.description');
    expect(homepageSource).toContain('coreStrand.examples.map');
    expect(homepageSource).toContain('strand.description');
    expect(homepageSource).toContain('strand.examples.map');
    // Example concepts stay plain text — never a hyperlink to an individual
    // Skill or Grade Unit page.
    for (const skillLink of getCanonicalSkillRoutes()) {
      expect(homepageSource).not.toContain(`href="${skillLink.canonicalPath}"`);
    }
  });

  it('no longer carries a standalone Progression section — /grades owns the full K–5 developmental progression, linked once from Browse by Grade', () => {
    expect(homepageSource).not.toMatch(/id="progression-heading"/);
    expect(homepageSource).not.toContain('HOMEPAGE_PROGRESSION_STAGES');
    expect(homepageSource).not.toContain('HOMEPAGE_US_POSITIONING');
    // The one teaser link to /grades still exists, under Browse by Grade.
    expect(homepageSource).toContain('See how spelling develops across K–5');
    expect(homepageSource.match(/href="\/grades"/g)).toHaveLength(1);
  });

  it('presents a compact audience heading closing with the structured-organization and free/no-account/no-gamification facts, and links to /about for the fuller per-audience orientation', () => {
    expect(homepageSource).toMatch(
      /<h2[^>]*id="audience-heading"[^>]*>\s*Built for students, parents, and teachers\s*<\/h2>/,
    );
    // The former three-card per-audience grid is gone — /about now owns
    // the fuller per-audience orientation, linked from this section.
    expect(homepageSource).not.toContain('HOMEPAGE_AUDIENCES');
    expect(homepageSource).toContain('href="/about"');

    expect(homepageSource).toContain('HOMEPAGE_CLOSING_STATEMENT');
    expect(HOMEPAGE_CLOSING_STATEMENT).toMatch(/real, distinct categories of spelling knowledge/);
    expect(HOMEPAGE_CLOSING_STATEMENT.toLowerCase()).toMatch(/free/);
    expect(HOMEPAGE_CLOSING_STATEMENT.toLowerCase()).toMatch(/no account/);
    expect(HOMEPAGE_CLOSING_STATEMENT.toLowerCase()).toMatch(/no timers, points, streaks/);
    expect(homepageSource.toLowerCase()).not.toMatch(/actually learned/);
    expect(homepageSource.toLowerCase()).not.toMatch(/the single correct/);

    // The former standalone closing anchor still lives on this section, so
    // /#how-it-works links in the header/footer keep working.
    expect(homepageSource).toContain('id="how-it-works"');
  });

  it('has a visible, accurate FAQ of 2-6 questions with matching FAQPage structured data', () => {
    expect(homepageSource).toMatch(
      /<h2[^>]*id="faq-heading"[^>]*>\s*Frequently asked questions\s*<\/h2>/,
    );
    expect(HOMEPAGE_FAQ.length).toBeGreaterThanOrEqual(2);
    expect(HOMEPAGE_FAQ.length).toBeLessThanOrEqual(6);
    expect(homepageSource).toContain('HOMEPAGE_FAQ.map');

    expect(homepageFaqJsonLd['@type']).toBe('FAQPage');
    expect(homepageFaqJsonLd.mainEntity).toEqual(
      HOMEPAGE_FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    );
    expect(homepageSource).toContain('homepageFaqJsonLd');
  });

  it('does not flatten primary navigation into deeper canonical routes', () => {
    const forbiddenRoutes = [
      ...gradeStrandGatewayPaths,
      ...getCanonicalGradeRoutes().map(({ canonicalPath }) => canonicalPath),
      ...getCanonicalSkillRoutes().map(({ canonicalPath }) => canonicalPath),
    ];
    for (const route of forbiddenRoutes) expect(homepageSource).not.toContain(`href="${route}"`);
    expect(homepageSource).not.toMatch(/href=["']\/play/);
  });

  it('does not prescribe a sequential starting Skill', () => {
    expect(homepageSource.toLowerCase()).not.toMatch(/start (?:with|at) short vowels/);
  });

  it('keeps the Practice Your Own Words interaction hosted directly on the page', () => {
    // The tool's markup/wiring now lives in the shared CustomWordEntry
    // component (reused by /practice-your-own-words), but the homepage must
    // still render it inline — not merely link out to it — per
    // docs/content/CANONICAL_HOMEPAGE_STANDARD.md §5.1.
    expect(homepageSource).toContain('<CustomWordEntry variant="compact"');
    expect(customWordEntrySource).toContain('id="word-input"');
    expect(customWordEntrySource).toContain('id="btn-start"');
    // Both custom-word entry points use an opaque session id so words never appear in the play URL.
    expect(customWordEntrySource).toContain('window.location.href = `/play?session=${id}`');
  });

  it('emits the required homepage structured-data types, including FAQPage matching visible content', () => {
    expect(homepageJsonLd.map((block) => block['@type'])).toEqual(['WebSite', 'ItemList']);
    expect(homepageJsonLd[0]).toMatchObject({ name: 'SpellingWords.app', url: HOMEPAGE_URL });
    expect(homepageJsonLd[1].itemListElement).toEqual(
      homepageGradeHubs.map((grade, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: grade.label,
        url: new URL(grade.href, HOMEPAGE_URL).href,
      })),
    );
    expect(JSON.stringify(homepageJsonLd)).not.toMatch(
      /BreadcrumbList|FAQPage|SearchAction|Organization/,
    );
    expect(homepageFaqJsonLd['@type']).toBe('FAQPage');
    expect(homepageSource).toContain('jsonLd={[...homepageJsonLd, homepageFaqJsonLd]}');
  });
});
