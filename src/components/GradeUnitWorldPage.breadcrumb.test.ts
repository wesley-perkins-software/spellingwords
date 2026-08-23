import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getGradeHubPath, getGradeStrandPath } from '@/lib/content/canonicalGradeRoutes';

const gradeUnitWorldPage = readFileSync(
  join(process.cwd(), 'src/components/GradeUnitWorldPage.astro'),
  'utf8',
);
const nonCoreMemberRenderer = readFileSync(
  join(process.cwd(), 'src/pages/grades/[gradeSlug]/[strand]/[slug].astro'),
  'utf8',
);

describe('Core Spelling member breadcrumb includes the Strand Gateway level', () => {
  it('builds the Strand breadcrumb entry from the shared canonical route helpers, not a hardcoded string', () => {
    // Regression guard: Core member pages previously rendered Home > Grade > Member (3 levels),
    // omitting the Strand/gateway level and its link back to /{grade}/core-spelling — inconsistent
    // with the HFW/Themed member breadcrumb (Home > Grade > Strand > Member, 4 levels) and with
    // the frozen Grade Hub > Strand Gateway > Member hierarchy.
    expect(gradeUnitWorldPage).toContain("GRADE_STRANDS['core-spelling'].label");
    expect(gradeUnitWorldPage).toContain(
      "getGradeStrandPath(canonicalGradeRoute.grade, 'core-spelling')",
    );
  });

  it('keeps the Strand entry before the Member entry, and after the Grade entry, in one shared breadcrumbItems array', () => {
    const breadcrumbBlock = gradeUnitWorldPage.slice(
      gradeUnitWorldPage.indexOf('const breadcrumbItems = ['),
      gradeUnitWorldPage.indexOf('];', gradeUnitWorldPage.indexOf('const breadcrumbItems = [')),
    );
    const gradeIndex = breadcrumbBlock.indexOf('gradeHub.label');
    const strandIndex = breadcrumbBlock.indexOf("GRADE_STRANDS['core-spelling'].label");
    const memberIndex = breadcrumbBlock.indexOf('data.title');
    expect(gradeIndex).toBeGreaterThan(-1);
    expect(strandIndex).toBeGreaterThan(gradeIndex);
    expect(memberIndex).toBeGreaterThan(strandIndex);

    // The visible breadcrumb and the BreadcrumbList JSON-LD must both be derived from this one
    // array — no separate, duplicate breadcrumb construction for structured data.
    expect(gradeUnitWorldPage).toContain('<Breadcrumbs items={breadcrumbItems} />');
    expect(gradeUnitWorldPage).toContain('itemListElement: breadcrumbItems.map(');
  });

  it('matches the four-level breadcrumb shape already used by HFW/Themed member pages', () => {
    expect(nonCoreMemberRenderer).toContain("{ label: 'Home', href: '/' }");
    expect(nonCoreMemberRenderer).toMatch(/label: gradeHubForBreadcrumb\.label/);
    expect(nonCoreMemberRenderer).toMatch(/label: route\.section/);
    expect(nonCoreMemberRenderer).toContain(
      'href: getGradeStrandPath(route.grade, route.classification)',
    );
  });

  it('resolves every grade and strand ancestor through the canonical /grades hierarchy', () => {
    expect(getGradeHubPath('4')).toBe('/grades/4th-grade');
    expect(getGradeStrandPath('4', 'themed-spelling-practice')).toBe(
      '/grades/4th-grade/themed-spelling-practice',
    );
    expect(getGradeStrandPath('3', 'core-spelling')).toBe(
      '/grades/3rd-grade/core-spelling',
    );
    expect(getGradeStrandPath('2', 'high-frequency-words')).toBe(
      '/grades/2nd-grade/high-frequency-words',
    );
  });

  it('uses the same canonical ancestor array for visible and JSON-LD breadcrumbs', () => {
    expect(nonCoreMemberRenderer).toContain('<Breadcrumbs items={breadcrumbItems} />');
    expect(nonCoreMemberRenderer).toContain('itemListElement: breadcrumbItems.map(');
    expect(nonCoreMemberRenderer).not.toMatch(
      /href:\s*`\/(?:kindergarten|[1-5](?:st|nd|rd|th)-grade)\//,
    );
    expect(gradeUnitWorldPage).not.toMatch(
      /href:\s*`\/(?:kindergarten|[1-5](?:st|nd|rd|th)-grade)\//,
    );
  });
});
