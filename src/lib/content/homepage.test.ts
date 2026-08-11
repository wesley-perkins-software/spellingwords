import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SKILLS_INDEX_PATH, getCanonicalSkillRoutes } from './canonicalSkillRoutes';
import { gradeConfig } from './gradeConfig';
import {
  HOMEPAGE_URL,
  HOMEPAGE_SKILL_COUNT,
  HOMEPAGE_REPRESENTATIVE_SKILLS,
  homepageGradeHubs,
  homepageJsonLd,
} from './homepage';
import { gradeStrandGatewayPaths, getCanonicalGradeRoutes } from './canonicalGradeRoutes';

const homepageSource = readFileSync(join(process.cwd(), 'src/pages/index.astro'), 'utf8');

describe('canonical homepage', () => {
  it('has one immediate page heading and complete, accurate metadata', () => {
    expect(homepageSource.match(/<h1\b/g)).toHaveLength(1);
    expect(homepageSource).toContain(
      'Practice <span class="text-brand-red">spelling</span> your way.',
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

  it('derives exactly the six visible Grade Hub destinations from canonical grade data, each with its approved teaser', () => {
    expect(homepageGradeHubs).toHaveLength(6);
    expect(homepageGradeHubs.map(({ label, href }) => ({ label, href }))).toEqual(
      gradeConfig.map(({ label, hubHref }) => ({ label, href: hubHref })),
    );
    expect(homepageGradeHubs).toEqual([
      expect.objectContaining({
        label: 'Kindergarten',
        teaser:
          'Builds the foundations with letters, sounds, first words, and short-vowel spelling.',
      }),
      expect.objectContaining({
        label: '1st Grade',
        teaser:
          'Strengthens early spelling with consonant blends and digraphs, silent e, vowel teams, and word endings.',
      }),
      expect.objectContaining({
        label: '2nd Grade',
        teaser:
          'Expands into r-controlled vowels, more vowel patterns, syllable structure, silent letters, and multisyllabic words.',
      }),
      expect.objectContaining({
        label: '3rd Grade',
        teaser:
          'Introduces prefixes, suffixes, spelling changes, homophones, possessives, and word families.',
      }),
      expect.objectContaining({
        label: '4th Grade',
        teaser:
          'Develops advanced word knowledge through roots, morphology, multisyllabic spelling, and commonly confused words.',
      }),
      expect.objectContaining({
        label: '5th Grade',
        teaser:
          'Brings it together with advanced roots and affixes, academic words, and spelling changes across related words.',
      }),
    ]);
    expect(homepageSource).toContain('homepageGradeHubs.map');
    expect(homepageSource).toContain('{teaser}');
  });

  it('names the three canonical curriculum strands exactly once, in Browse by Grade', () => {
    const strandNames = ['Core Spelling', 'High-Frequency Words', 'Themed Spelling Practice'];
    for (const strand of strandNames) {
      expect(homepageSource.split(strand)).toHaveLength(2);
    }
  });

  it('presents grade and skill browsing as coequal semantic sections', () => {
    expect(homepageSource).toMatch(/<h2[^>]*id="grade-heading"[^>]*>\s*Browse by Grade\s*<\/h2>/);
    expect(homepageSource).toMatch(/<h2[^>]*id="skill-heading"[^>]*>Browse by Skill<\/h2>/);
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

  it('replaces the old four-item equal-weight trust section with the approved closing content', () => {
    expect(homepageSource).not.toContain('Simple, focused spelling practice');
    expect(homepageSource).not.toContain('No competitive gamification');
    expect(homepageSource).not.toContain('Curated and structured');
    expect(homepageSource).toContain('More than a list of spelling words');
    expect(homepageSource).toContain(
      'SpellingWords.app brings a structured K–5 spelling curriculum',
    );
    expect(homepageSource.toLowerCase()).not.toMatch(/actually learned/);
    expect(homepageSource.toLowerCase()).not.toMatch(/real spelling knowledge/);
  });

  it('keeps the Practice Your Own Words interaction hosted directly on the page', () => {
    expect(homepageSource).toContain('id="word-input"');
    expect(homepageSource).toContain('id="btn-start"');
    expect(homepageSource).toContain("window.location.href = `/play?list=");
  });

  it('emits only the required homepage structured-data types', () => {
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
  });
});
