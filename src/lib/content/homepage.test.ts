import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SKILLS_INDEX_PATH, getCanonicalSkillRoutes } from './canonicalSkillRoutes';
import { gradeConfig } from './gradeConfig';
import {
  HOMEPAGE_URL,
  HOMEPAGE_SKILL_COUNT,
  HOMEPAGE_REPRESENTATIVE_SKILLS,
  HOMEPAGE_STRANDS,
  HOMEPAGE_PROGRESSION_STAGES,
  HOMEPAGE_PROGRESSION_NOTE,
  HOMEPAGE_US_POSITIONING,
  HOMEPAGE_AUDIENCES,
  HOMEPAGE_CLOSING_STATEMENT,
  HOMEPAGE_FAQ,
  homepageGradeHubs,
  homepageJsonLd,
  homepageFaqJsonLd,
} from './homepage';
import { gradeStrandGatewayPaths, getCanonicalGradeRoutes } from './canonicalGradeRoutes';

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

  it('names the three canonical curriculum strands bare, once, in Browse by Grade, and explains them exactly once, in the Curriculum-Organization section', () => {
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

    // Explained naming: the Curriculum-Organization section is the sole
    // section that renders each strand's full definition (definitions are
    // data-driven from HOMEPAGE_STRANDS, not literal template text, so we
    // assert the section renders from that array rather than matching
    // rendered prose directly — the same pattern the grade-teaser test
    // above uses for `{teaser}`).
    expect(HOMEPAGE_STRANDS.map((s) => s.name)).toEqual(strandNames);
    for (const strand of HOMEPAGE_STRANDS) expect(strand.definition.length).toBeGreaterThan(0);
    expect(homepageSource).toContain('strandCards.map');
    expect(homepageSource).toContain('{definition}');
    expect(homepageSource.match(/\{definition\}/g)).toHaveLength(1);

    // Each strand card heading links to its cross-grade top-level strand gateway (2026-08-21
    // CANONICAL_HOMEPAGE_STANDARD.md amendment) — example concepts stay non-hyperlinked.
    expect(HOMEPAGE_STRANDS.map((s) => s.href)).toEqual([
      '/core-spelling',
      '/high-frequency-words',
      '/themed-spelling-practice',
    ]);
    expect(homepageSource).toContain('<a href={href}');
  });

  it('presents grade and skill browsing as coequal semantic sections', () => {
    expect(homepageSource).toMatch(/<h2[^>]*id="grade-heading"[^>]*>\s*Browse by Grade\s*<\/h2>/);
    expect(homepageSource).toMatch(/<h2[^>]*id="skill-heading"[^>]*>\s*Browse by Skill\s*<\/h2>/);
    expect(homepageSource).toContain('href={SKILLS_INDEX_PATH}');
    expect(SKILLS_INDEX_PATH).toBe('/skills');
  });

  it('states the real Skill count exactly once, in Browse by Skill, with plain-text representative examples', () => {
    expect(HOMEPAGE_SKILL_COUNT).toBe(getCanonicalSkillRoutes().length);
    expect(HOMEPAGE_SKILL_COUNT).toBe(41);
    // "HOMEPAGE_SKILL_COUNT" appears twice in source: once in the import, once
    // where it is rendered — the count itself is stated exactly once on the page.
    expect(homepageSource.match(/HOMEPAGE_SKILL_COUNT/g)).toHaveLength(2);
    expect(homepageSource).toContain('{HOMEPAGE_SKILL_COUNT}');

    expect(HOMEPAGE_REPRESENTATIVE_SKILLS).toEqual([
      'short vowels',
      'silent e',
      'prefixes',
      'suffixes',
      'Greek and Latin roots',
      'homophones',
    ]);

    // Each representative example is rendered from the shared array by index,
    // as plain text, and never as an individual Skill-page hyperlink.
    for (let i = 0; i < HOMEPAGE_REPRESENTATIVE_SKILLS.length; i++) {
      expect(homepageSource).toContain(`HOMEPAGE_REPRESENTATIVE_SKILLS[${i}]`);
    }
    for (const skillLink of getCanonicalSkillRoutes()) {
      expect(homepageSource).not.toContain(`href="${skillLink.canonicalPath}"`);
    }
  });

  it('explains the three curriculum strands with real, non-hyperlinked example concepts', () => {
    expect(homepageSource).toMatch(
      /<h2[^>]*id="curriculum-org-heading"[^>]*>\s*How the K–5 curriculum is organized\s*<\/h2>/,
    );
    for (const strand of HOMEPAGE_STRANDS) {
      expect(strand.definition.length).toBeGreaterThan(0);
      expect(strand.examples.length).toBeGreaterThan(0);
    }
    // Example concepts render as plain chips, never as links into deeper
    // Grade Unit, Themed-list, or Skill routes.
    expect(homepageSource).toContain('{examples.map');
    expect(homepageSource).not.toMatch(/examples\.map\([^)]*<a\s/);
  });

  it('presents a compact three-stage K-5 progression with the defensible U.S.-curriculum-positioning statement', () => {
    expect(homepageSource).toMatch(
      /<h2[^>]*id="progression-heading"[^>]*>\s*How spelling develops from Kindergarten through 5th Grade\s*<\/h2>/,
    );
    expect(HOMEPAGE_PROGRESSION_STAGES).toHaveLength(3);
    expect(homepageSource).toContain('HOMEPAGE_PROGRESSION_STAGES.map');
    expect(HOMEPAGE_PROGRESSION_NOTE.length).toBeGreaterThan(0);
    expect(homepageSource).toContain('HOMEPAGE_PROGRESSION_NOTE');
    expect(homepageSource).toContain('HOMEPAGE_US_POSITIONING');

    // Defensible wording only — never an absolute/unsourced standards claim.
    expect(HOMEPAGE_US_POSITIONING.toLowerCase()).not.toMatch(/aligned with all u\.s\. standards/);
    expect(HOMEPAGE_US_POSITIONING.toLowerCase()).not.toMatch(/aligned with (?:every|all) state/);
    expect(HOMEPAGE_US_POSITIONING).toMatch(/commonly expected across U\.S\. elementary education/);
    expect(HOMEPAGE_US_POSITIONING.toLowerCase()).toMatch(/no single national scope and sequence exists/);
  });

  it('presents a compact audience section, closing with the structured-organization and free/no-account/no-gamification facts', () => {
    expect(homepageSource).toMatch(
      /<h2[^>]*id="audience-heading"[^>]*>\s*Built for students, parents, and teachers\s*<\/h2>/,
    );
    expect(HOMEPAGE_AUDIENCES.map((a) => a.label)).toEqual(['Students', 'Parents', 'Teachers']);
    expect(homepageSource).toContain('HOMEPAGE_AUDIENCES.map');

    expect(homepageSource).toContain('HOMEPAGE_CLOSING_STATEMENT');
    expect(HOMEPAGE_CLOSING_STATEMENT).toMatch(/real, distinct categories of spelling knowledge/);
    expect(HOMEPAGE_CLOSING_STATEMENT.toLowerCase()).toMatch(/free/);
    expect(HOMEPAGE_CLOSING_STATEMENT.toLowerCase()).toMatch(/no account/);
    expect(HOMEPAGE_CLOSING_STATEMENT.toLowerCase()).toMatch(/no timers, points, streaks/);
    expect(homepageSource.toLowerCase()).not.toMatch(/actually learned/);
    expect(homepageSource.toLowerCase()).not.toMatch(/the single correct/);

    // The former standalone closing anchor now lives on the Audience section,
    // so /#how-it-works links in the header/footer keep working.
    expect(homepageSource).toContain('id="how-it-works"');
  });

  it('has a visible, accurate FAQ of 4-6 questions with matching FAQPage structured data', () => {
    expect(homepageSource).toMatch(
      /<h2[^>]*id="faq-heading"[^>]*>\s*Frequently asked questions\s*<\/h2>/,
    );
    expect(HOMEPAGE_FAQ.length).toBeGreaterThanOrEqual(4);
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
    // The homepage's compact variant keeps the legacy `/play?list=` transport
    // (documented as intentional technical debt, not migrated by this
    // change — see docs/planning/LAUNCH_SUPPORTING_PAGES_AND_GLOBAL_NAVIGATION_PLAN.md).
    expect(customWordEntrySource).toContain("window.location.href = `/play?list=");
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
