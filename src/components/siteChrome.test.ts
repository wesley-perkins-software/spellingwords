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
      '/grades/kindergarten',
      '/grades/1st-grade',
      '/grades/2nd-grade',
      '/grades/3rd-grade',
      '/grades/4th-grade',
      '/grades/5th-grade',
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

  it('exposes all three top-level strand gateways in the footer Explore column, with no partial set', () => {
    for (const path of ['/core-spelling', '/high-frequency-words', '/themed-spelling-practice']) {
      expect(footer).toContain(`href="${path}"`);
    }
    // Superseded once all three strand gateways exist (2026-08-21 amendment) — redundant with
    // the Grades footer column, which already links all six Grade Hubs.
    expect(footer).toContain('href="/grades"');
  });

  it('gives the global practice CTA an explicit desktop label and a compact mobile fallback, both pointing at the dedicated own-word page', () => {
    expect(header).toContain('href="/practice-your-own-words"');
    expect(header).toContain('<span class="lg:hidden">Practice</span>');
    expect(header).toContain('<span class="hidden lg:inline">Practice Your Own Words</span>');
    // The CTA must never mean "start practicing this page" — it always
    // targets the dedicated own-word journey, never /play directly.
    expect(header).not.toContain('href="/play"');
    expect(header).not.toContain('href="/#practice"');
  });

  it('points the footer\'s Practice Your Own Words link at the dedicated page, not the homepage anchor', () => {
    expect(footer).toContain('href="/practice-your-own-words"');
    expect(footer).toContain('Practice Your Own Words</a>');
    expect(footer).not.toContain('href="/#practice"');
  });
});
