import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  canonicalGradeRoutes,
  getGradeHubGatewayLinks,
  GRADE_STRANDS,
  gradeStrandGatewayPaths,
} from './canonicalGradeRoutes';
import { gradeConfig } from './gradeConfig';

const gradeHubRenderer = readFileSync(join(process.cwd(), 'src/pages/[gradeSlug].astro'), 'utf8');

describe('Grade Hub gateway links', () => {
  it('exposes the three canonical same-grade gateways for every Grade Hub', () => {
    for (const grade of gradeConfig) {
      const links = getGradeHubGatewayLinks(grade.grade);

      expect(links).toEqual(
        Object.entries(GRADE_STRANDS).map(([strand, config]) => ({
          strand,
          label: config.label,
          href: `${grade.hubHref}/${config.routeSegment}`,
        })),
      );
      expect(links).toHaveLength(3);
      expect(links.every(({ href }) => gradeStrandGatewayPaths.includes(href))).toBe(true);
    }
  });

  it('renders section-heading anchors from the canonical gateway-link helper', () => {
    expect(gradeHubRenderer).toContain('buildGradeHubModel(grade, entries)');
    expect(gradeHubRenderer).toContain('href={strand.href}');
    expect(gradeHubRenderer).toContain('{strand.linkLabel}');
    expect(gradeHubRenderer).not.toMatch(
      /href=["']\/(?:kindergarten|[1-5](?:st|nd|rd|th)-grade)\/(?:core-spelling|high-frequency-words|themed-spelling-practice)/,
    );
  });

  it('preserves the frozen grade, gateway, and member-route counts', () => {
    expect(gradeConfig).toHaveLength(6);
    expect(gradeStrandGatewayPaths).toHaveLength(18);
    expect(new Set(gradeStrandGatewayPaths)).toHaveLength(18);
    expect(canonicalGradeRoutes).toHaveLength(105);
    expect(
      canonicalGradeRoutes.filter(({ classification }) => classification === 'core-spelling'),
    ).toHaveLength(51);
    expect(
      canonicalGradeRoutes.filter(
        ({ classification }) => classification === 'high-frequency-words',
      ),
    ).toHaveLength(27);
    expect(
      canonicalGradeRoutes.filter(
        ({ classification }) => classification === 'themed-spelling-practice',
      ),
    ).toHaveLength(27);
  });
});
