import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SKILL_PRACTICE_BANKS } from './skillPracticeBanks';

// Source-level checks on the Skill page template, matching this repo's
// existing convention (see shortAReferenceSkill.test.ts) of asserting on
// file content rather than rendering Astro components in Vitest.
const skillPagePath = join(process.cwd(), 'src/pages/skills/[slug].astro');
const source = readFileSync(skillPagePath, 'utf8');

describe('Skill page practice CTA', () => {
  it('imports the practice-bank lookup and gates the CTA on a bank existing', () => {
    expect(source).toContain(
      "import { getSkillPracticeBank, toPlayableSkillPracticeWords } from '@/lib/content/skillPracticeBanks';",
    );
    expect(source).toContain('const practiceBank = getSkillPracticeBank(data.id);');
    expect(source).toContain('practiceBank && practiceBankWords && (');
  });

  it('launches /play through the existing encode + sessionStorage transport, not a new one', () => {
    expect(source).toContain("import { encodeWordList } from '@/lib/words';");
    expect(source).toContain('selectSkillPracticeSession');
    expect(source).toContain("sessionStorage.setItem(`sw:words:");
    expect(source).toContain("window.location.href = `/play?list=");
  });

  it('has at least one piloted Skill so the CTA branch is exercised at build time', () => {
    expect(Object.keys(SKILL_PRACTICE_BANKS).length).toBeGreaterThan(0);
  });

  it('derives the heading and CTA copy from the Skill title and bank size, not hardcoded prose', () => {
    expect(source).toContain('Practice {data.title}');
    expect(source).toContain('{practiceBankWords.length} practice words');

    // The user-facing copy itself (not code comments) should stay free of
    // internal architecture terminology.
    const practiceSectionStart = source.indexOf('aria-labelledby="practice-heading"');
    const practiceSectionEnd = source.indexOf('<!-- Why these words', practiceSectionStart);
    const practiceSectionMarkup = source.slice(practiceSectionStart, practiceSectionEnd);
    expect(practiceSectionMarkup).not.toMatch(/practice bank/i);
    expect(practiceSectionMarkup).not.toContain('independent of any grade');
  });
});
