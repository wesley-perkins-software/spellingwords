import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SKILLS_INDEX_PATH, getCanonicalSkillRoutes } from './canonicalSkillRoutes';
import { gradeConfig } from './gradeConfig';
import { HOMEPAGE_URL, homepageGradeHubs, homepageJsonLd } from './homepage';
import { gradeStrandGatewayPaths, getCanonicalGradeRoutes } from './canonicalGradeRoutes';

const homepageSource = readFileSync(join(process.cwd(), 'src/pages/index.astro'), 'utf8');

describe('canonical homepage', () => {
  it('has one immediate page heading and complete, accurate metadata', () => {
    expect(homepageSource.match(/<h1\b/g)).toHaveLength(1);
    expect(homepageSource).toContain('Practice <span class="text-brand-red">spelling</span>');
    expect(homepageSource).toContain(
      'title="Free Spelling Practice by Grade or Skill—No Account | SpellingWords.app"',
    );
    expect(homepageSource).toMatch(/description="[^"]*Free[^"]*no account required[^"]*grade or spelling skill[^"]*"/);
  });

  it('derives exactly the six visible Grade Hub destinations from canonical grade data', () => {
    expect(homepageGradeHubs).toEqual(
      gradeConfig.map(({ label, hubHref }) => ({ label, href: hubHref })),
    );
    expect(homepageGradeHubs).toHaveLength(6);
    expect(homepageSource).toContain('homepageGradeHubs.map');
  });

  it('presents grade and skill browsing as coequal semantic sections', () => {
    expect(homepageSource).toMatch(/<h2[^>]*id="grade-heading"[^>]*>\s*Browse by Grade\s*<\/h2>/);
    expect(homepageSource).toMatch(/<h2[^>]*id="skill-heading"[^>]*>Browse by Skill<\/h2>/);
    expect(homepageSource).toContain('href={SKILLS_INDEX_PATH}');
    expect(SKILLS_INDEX_PATH).toBe('/skills');
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
