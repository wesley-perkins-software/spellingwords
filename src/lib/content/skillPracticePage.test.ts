import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SKILL_PRACTICE_BANKS, skillPracticeDescription } from './skillPracticeBanks';

// Source-level checks on the Skill page template, matching this repo's
// existing convention (see shortAReferenceSkill.test.ts) of asserting on
// file content rather than rendering Astro components in Vitest.
const skillPagePath = join(process.cwd(), 'src/pages/skills/[slug].astro');
const source = readFileSync(skillPagePath, 'utf8');

function sectionMarkup(labelledBy: string, until: string): string {
  const start = source.indexOf(`aria-labelledby="${labelledBy}"`);
  expect(start, `expected to find a section labelled "${labelledBy}"`).toBeGreaterThan(-1);
  const end = source.indexOf(until, start);
  expect(end, `expected to find "${until}" after "${labelledBy}"`).toBeGreaterThan(start);
  return source.slice(start, end);
}

describe('Skill page practice inventory', () => {
  it('imports the practice-bank lookup and gates every practice section on a bank existing', () => {
    expect(source).toContain("from '@/lib/content/skillPracticeBanks';");
    expect(source).toContain('getSkillPracticeBank');
    expect(source).toContain('skillPracticeDescription');
    expect(source).toContain('toPlayableSkillPracticeWords');
    expect(source).toContain('const practiceBank = getSkillPracticeBank(data.id);');
    expect(source).toContain('practiceBank && practiceBankWords && (');
  });

  it('has at least one piloted Skill so the practice branches are exercised at build time', () => {
    expect(Object.keys(SKILL_PRACTICE_BANKS).length).toBeGreaterThan(0);
  });

  it('renders the full canonical practice bank, not a duplicated or partial word list', () => {
    const inventoryMarkup = sectionMarkup('practice-words-heading', 'aria-labelledby="practice-heading"');
    // Pulls straight from the bank data computed at the top of the file —
    // there is no second, independently-authored word list in the template.
    expect(inventoryMarkup).toContain('words={practiceBankWords}');
    expect(inventoryMarkup).toContain('{practiceBankWords.length} words');
    expect(inventoryMarkup).toContain('{data.title} to Practice');
  });

  it('shows the demonstration preview only for Skills without a practice bank', () => {
    const guardStart = source.indexOf('!practiceBank && (');
    expect(guardStart, 'expected a "!practiceBank" guard').toBeGreaterThan(-1);
    const headingStart = source.indexOf('aria-labelledby="practice-words-heading"');
    const demoMarkup = source.slice(guardStart, headingStart);
    expect(demoMarkup).toContain('Hear the pattern in these words');
  });

  it('derives the practice heading and CTA copy from the Skill title and bank size, not hardcoded prose', () => {
    expect(source).toContain('Practice {data.title}');

    const practiceSectionMarkup = sectionMarkup('practice-heading', '<!-- Why these words');
    // The description text itself is computed (skillPracticeDescription), not
    // authored inline — see the dedicated tests on that function below for
    // the exact wording per bank-size band.
    expect(practiceSectionMarkup).toContain('{practiceDescription}');
    expect(source).toContain('skillPracticeDescription(practiceBankWords.length)');

    // No internal architecture terminology leaking into user-facing copy.
    expect(practiceSectionMarkup).not.toMatch(/practice bank/i);
    expect(practiceSectionMarkup).not.toContain('independent of any grade');
  });

  it('gives truthful practice-session copy for every bank-size band', () => {
    // A bank larger than the session size gets the random-mix framing.
    expect(skillPracticeDescription(18, 10)).toBe(
      'Practice 10 random words from the list above. Start another session anytime for a different mix.',
    );
    // A bank at the session size, or smaller, practices every word every time.
    expect(skillPracticeDescription(10, 10)).toBe('Practice all 10 words from the list above.');
    expect(skillPracticeDescription(8, 10)).toBe('Practice all 8 words from the list above.');
    expect(skillPracticeDescription(6, 10)).toBe('Practice all 6 words from the list above.');
    expect(skillPracticeDescription(1, 10)).toBe('Practice all 1 word from the list above.');
  });

  it('launches /play through the existing encode + sessionStorage transport, not a new one', () => {
    expect(source).toContain("import { encodeWordList } from '@/lib/words';");
    expect(source).toContain('selectSkillPracticeSession');
    expect(source).toContain('const SESSION_SIZE = 10;');
    expect(source).toContain("sessionStorage.setItem(`sw:words:");
    expect(source).toContain("window.location.href = `/play?list=");
  });

  it('uses unique heading ids across the practice sections', () => {
    const ids = ['word-list-heading', 'practice-words-heading', 'practice-heading'];
    for (const id of ids) {
      const matches = source.split(`id="${id}"`).length - 1;
      expect(matches, `expected exactly one "${id}" heading`).toBe(1);
    }
  });
});
