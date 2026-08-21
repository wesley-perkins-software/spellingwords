import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { gradeConfig } from '@/lib/content/gradeConfig';

const header = readFileSync(new URL('./SiteHeader.astro', import.meta.url), 'utf8');
const footer = readFileSync(new URL('./SiteFooter.astro', import.meta.url), 'utf8');

describe('global site chrome', () => {
  it('derives every grade destination from the canonical grade configuration', () => {
    expect(header).toContain('import { gradeConfig }');
    expect(header).toContain('gradeConfig.map');
    expect(footer).toContain('import { gradeConfig }');
    expect(footer).toContain('gradeConfig.map');

    expect(gradeConfig.map((grade) => grade.hubHref)).toEqual([
      '/kindergarten',
      '/1st-grade',
      '/2nd-grade',
      '/3rd-grade',
      '/4th-grade',
      '/5th-grade',
    ]);
  });

  it('uses disclosure buttons and explicit expanded state for desktop and mobile navigation', () => {
    expect(header).toContain('aria-controls="desktop-grades-panel"');
    expect(header).toContain('data-grades-toggle');
    expect(header).toContain('aria-controls="mobile-navigation"');
    expect(header).toContain('data-mobile-menu-toggle');
    expect(header).toContain("event.key !== 'Escape'");
    expect(header).toContain('setGradesOpen(false, true)');
    expect(header).toContain('setMobileOpen(false, true)');
  });

  it('links only implemented editorial destinations and keeps legal placeholders out', () => {
    for (const path of ['/about', '/curriculum', '/accessibility', '/skills']) {
      expect(`${header}\n${footer}`).toContain(`href="${path}"`);
    }
    expect(footer).not.toContain('href="/privacy"');
    expect(footer).not.toContain('href="/terms"');
    expect(footer).not.toContain('href="/contact"');
  });
});
