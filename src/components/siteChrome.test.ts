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

    expect(gradeConfig.map((grade) => grade.label)).toEqual([
      'Kindergarten',
      '1st Grade',
      '2nd Grade',
      '3rd Grade',
      '4th Grade',
      '5th Grade',
    ]);
  });

  it('never links a legacy or non-canonical grade route shape', () => {
    for (const chrome of [header, footer]) {
      expect(chrome).not.toMatch(/href="\/grade-/);
      expect(chrome).not.toMatch(/href="\/grades\/grade-/);
      expect(chrome).not.toMatch(/href="\/grades\/[0-9]"/);
    }
  });

  it('uses disclosure buttons and explicit expanded state for desktop and mobile navigation', () => {
    expect(header).toContain('aria-controls="desktop-grades-panel"');
    expect(header).toContain('data-grades-toggle');
    expect(header).toContain('aria-controls="desktop-explore-panel"');
    expect(header).toContain('data-explore-toggle');
    expect(header).toContain('aria-controls="mobile-navigation"');
    expect(header).toContain('data-mobile-menu-toggle');
    expect(header).toContain("event.key !== 'Escape'");
    expect(header).toContain('setDisclosureOpen(openEntry, false, true)');
    expect(header).toContain('setMobileOpen(false, true)');
  });

  it('closes any other open desktop disclosure when one is opened, so Grades and Explore never overlap', () => {
    expect(header).toContain('function closeAllDisclosures');
    expect(header).toContain('closeAllDisclosures(entry)');
  });

  describe('desktop Explore disclosure', () => {
    const desktopSection = header.split('aria-label="Mobile navigation"')[0];
    const panelStart = desktopSection.indexOf('id="desktop-explore-panel"');
    const panelEnd = desktopSection.indexOf('</ul>', panelStart);
    const explorePanel = desktopSection.slice(panelStart, panelEnd);

    it('exists as a real disclosure, not a link, distinct from the Grades disclosure', () => {
      expect(panelStart).toBeGreaterThan(-1);
      expect(desktopSection).toContain('data-explore-toggle');
      expect(desktopSection).toMatch(/data-explore-toggle[\s\S]{0,200}Explore/);
    });

    it('contains exactly the four approved strand/skill destinations, and nothing else', () => {
      for (const path of [
        '/skills',
        '/core-spelling',
        '/high-frequency-words',
        '/themed-spelling-practice',
      ]) {
        expect(explorePanel).toContain(`href="${path}"`);
      }

      // No individual skills, skill families, grade units, grade-specific
      // strand gateways, or supporting pages — the panel is not a sitemap.
      expect(explorePanel).not.toMatch(/href="\/skills\/[^"]/);
      expect(explorePanel).not.toMatch(/href="\/grades/);
      expect(explorePanel).not.toContain('href="/curriculum"');
      expect(explorePanel).not.toContain('href="/about"');
      expect(explorePanel).not.toContain('href="/accessibility"');
      expect(explorePanel).not.toContain('href="/privacy"');
      expect(explorePanel).not.toContain('href="/terms"');
    });

    it('keeps Curriculum as its own top-level desktop destination, outside Explore', () => {
      const curriculumOutsideExplore = desktopSection
        .slice(panelEnd)
        .includes('href="/curriculum"');
      expect(curriculumOutsideExplore).toBe(true);
    });

    it('never repeats a Skills/strand destination elsewhere in the desktop nav', () => {
      for (const path of [
        '/skills',
        '/core-spelling',
        '/high-frequency-words',
        '/themed-spelling-practice',
      ]) {
        const occurrences = desktopSection.split(`href="${path}"`).length - 1;
        expect(occurrences).toBe(1);
      }
    });

    it('drives the Explore trigger active state from all four strand/skill routes', () => {
      expect(header).toContain(
        'isExploreActive =\n  isSkillsActive || isCoreSpellingActive || isHighFrequencyActive || isThemedActive',
      );
    });
  });

  it('links every implemented editorial and legal destination without inventing Contact', () => {
    for (const path of [
      '/about',
      '/curriculum',
      '/accessibility',
      '/skills',
      '/privacy',
      '/terms',
    ]) {
      expect(`${header}\n${footer}`).toContain(`href="${path}"`);
    }
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

  it("points the footer's Practice Your Own Words link at the dedicated page, not the homepage anchor", () => {
    expect(footer).toContain('href="/practice-your-own-words"');
    expect(footer).toContain('Practice Your Own Words');
    expect(footer).not.toContain('href="/#practice"');
  });

  it('heads the footer trust/support column with "About & Support", not the bare brand name', () => {
    expect(footer).toContain('About &amp; Support');
    expect(footer).not.toMatch(/id="footer-spellingwords-heading"[^>]*>\s*SpellingWords\s*</);
  });

  it('gives Curriculum the same top-level (not-in-Explore) placement on mobile as on desktop', () => {
    const mobileSection = header.split('aria-label="Mobile navigation"')[1] ?? '';
    const exploreLabelIndex = mobileSection.indexOf('Explore');
    const exploreGroupEnd = mobileSection.indexOf('</div>', exploreLabelIndex);
    const supportingDividerIndex = mobileSection.indexOf('href="/about"');
    expect(exploreLabelIndex).toBeGreaterThan(-1);
    expect(exploreGroupEnd).toBeGreaterThan(exploreLabelIndex);
    expect(supportingDividerIndex).toBeGreaterThan(exploreGroupEnd);

    const mobileExploreGroup = mobileSection.slice(exploreLabelIndex, exploreGroupEnd);
    for (const path of ['/skills', '/core-spelling', '/high-frequency-words', '/themed-spelling-practice']) {
      expect(mobileExploreGroup).toContain(`href="${path}"`);
    }
    // Curriculum must not be grouped under the Explore label — it sits as
    // its own top-level item between Explore and the supporting links,
    // mirroring its top-level placement in the desktop nav.
    expect(mobileExploreGroup).not.toContain('href="/curriculum"');

    const curriculumSection = mobileSection.slice(exploreGroupEnd, supportingDividerIndex);
    expect(curriculumSection).toContain('href="/curriculum"');
  });

  it('gives the mobile menu the same active-state signal as desktop, without misusing aria-current on the Grades disclosure', () => {
    // Mobile Skills/Curriculum links and the current grade link reflect
    // currentPath via aria-current, mirroring the desktop nav.
    expect(header).toContain("isSkillsActive ? 'page' : undefined");
    expect(header).toContain("isCurriculumActive ? 'page' : undefined");
    expect(header).toContain("currentGrade?.grade === grade.grade ? 'page' : undefined");

    // The Grades disclosure trigger (button on desktop, summary on mobile)
    // represents a section, not a single destination — it must never carry
    // aria-current="page" itself, only the real current-grade link should.
    expect(header).not.toMatch(/data-grades-toggle[\s\S]{0,400}aria-current/);
    expect(header).not.toMatch(/<summary[\s\S]{0,200}aria-current/);
  });
});
