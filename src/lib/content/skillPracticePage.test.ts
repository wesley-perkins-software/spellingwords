import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SKILL_PRACTICE_BANKS, skillPracticeDescription } from './skillPracticeBanks';

// Source-level checks on the Skill page + its shared Direction A view
// component, matching this repo's existing convention (see
// shortAReferenceSkill.test.ts) of asserting on file content rather than
// rendering Astro components in Vitest. The page (src/pages/skills/[slug].astro)
// computes the practice-bank data and owns the /play launch transport;
// SkillView.astro (src/components/direction-a/SkillView.astro) renders it.
const skillPagePath = join(process.cwd(), 'src/pages/skills/[slug].astro');
const source = readFileSync(skillPagePath, 'utf8');

const skillViewPath = join(process.cwd(), 'src/components/direction-a/SkillView.astro');
const viewSource = readFileSync(skillViewPath, 'utf8');

function sectionMarkup(labelledBy: string, until: string): string {
  const start = viewSource.indexOf(`aria-labelledby="${labelledBy}"`);
  expect(start, `expected to find a section labelled "${labelledBy}"`).toBeGreaterThan(-1);
  const end = viewSource.indexOf(until, start);
  expect(end, `expected to find "${until}" after "${labelledBy}"`).toBeGreaterThan(start);
  return viewSource.slice(start, end);
}

describe('Skill page practice inventory', () => {
  it('imports the practice-bank lookup and gates every practice section on a bank existing', () => {
    expect(source).toContain("from '@/lib/content/skillPracticeBanks';");
    expect(source).toContain('getSkillPracticeBank');
    expect(source).toContain('skillPracticeDescription');
    expect(source).toContain('toPlayableSkillPracticeWords');
    expect(source).toContain('const practiceBank = getSkillPracticeBank(data.id);');
    expect(source).toContain(
      'const practiceBankWords = practiceBank ? toPlayableSkillPracticeWords(practiceBank) : null;',
    );
    // SkillView renders the CTA + practice-only sections only when a bank
    // resolved to real practice words — every downstream section is gated
    // on the same computed value, not re-derived independently.
    expect(viewSource).toContain('{practiceBankWords && (');
  });

  it('has at least one piloted Skill so the practice branches are exercised at build time', () => {
    expect(Object.keys(SKILL_PRACTICE_BANKS).length).toBeGreaterThan(0);
  });

  it('renders the full canonical practice bank, not a duplicated or partial word list', () => {
    const inventoryMarkup = sectionMarkup('word-list-heading', '</section>');
    // Pulls straight from the bank data computed at the top of the page and
    // passed in as a prop — there is no second, independently-authored word
    // list in the view component.
    expect(inventoryMarkup).toContain('words={practiceBankWords ?? demoWords}');
    expect(inventoryMarkup).toContain('{(practiceBankWords ?? demoWords).length} words');
    expect(inventoryMarkup).toContain('${title} to Practice');
  });

  it('shows the demonstration preview only for Skills without a practice bank', () => {
    const wordListMarkup = sectionMarkup('word-list-heading', '</section>');
    // A single heading/word-grid section serves both cases: it shows the
    // full practice bank when one exists, and falls back to the demo
    // preview copy/words only when practiceBankWords is falsy.
    expect(wordListMarkup).toContain(
      "practiceBankWords ? `${title} to Practice` : 'Hear the pattern in these words'",
    );
    expect(wordListMarkup).toContain('Hear the pattern in these words');
  });

  it('derives the practice heading and CTA copy from the Skill title and bank size, not hardcoded prose', () => {
    expect(viewSource).toContain('Practice {title}');

    const practiceSectionMarkup = sectionMarkup('practice-heading', '</section>');
    // The description text itself is computed (skillPracticeDescription), not
    // authored inline — see the dedicated tests on that function below for
    // the exact wording per bank-size band.
    expect(practiceSectionMarkup).toContain('{practiceDescription}');
    expect(source).toContain(
      'const practiceDescription = practiceBankWords\n  ? skillPracticeDescription(practiceBankWords.length)\n  : null;',
    );

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
    // The launch transport lives in SkillView's own self-contained script
    // (it targets [data-skill-title], not a page-owned button handler).
    expect(viewSource).toContain("import { encodeWordList } from '@/lib/words';");
    expect(viewSource).toContain('selectSkillPracticeSession');
    expect(viewSource).toContain('const SESSION_SIZE = 10;');
    expect(viewSource).toContain('sessionStorage.setItem(`sw:words:');
    expect(viewSource).toContain('window.location.href = `/play?list=');
  });

  it('uses unique heading ids across the practice sections', () => {
    const ids = ['word-list-heading', 'practice-heading'];
    for (const id of ids) {
      const matches = viewSource.split(`id="${id}"`).length - 1;
      expect(matches, `expected exactly one "${id}" heading`).toBe(1);
    }
  });
});
