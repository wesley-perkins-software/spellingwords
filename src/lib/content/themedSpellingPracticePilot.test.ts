import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getCanonicalGradeRouteById, getCanonicalGradeRoutes } from './canonicalGradeRoutes';
import { getThemedSpellingPracticeExploreMore } from './themedSpellingPracticeExploreMore';

const weatherId = 'grade-1-weather-words';
const weatherWords = [
  'sunny',
  'rainy',
  'cloudy',
  'windy',
  'snowy',
  'stormy',
  'foggy',
  'hot',
  'cold',
];
const weatherSource = readFileSync(
  new URL('../../content/spelling-lists/grade-level/grade-1-weather-words.md', import.meta.url),
  'utf8',
);
const renderer = readFileSync(
  new URL('../../pages/[gradeSlug]/[strand]/[slug].astro', import.meta.url),
  'utf8',
);
const schema = readFileSync(new URL('../../content/config.ts', import.meta.url), 'utf8');
const coreRenderer = readFileSync(
  new URL('../../components/GradeUnitWorldPage.astro', import.meta.url),
  'utf8',
);

function listItems(blockName: string, nextBlock?: string): string[] {
  const end = nextBlock ? `(?=^${nextBlock}:)` : '(?=^---$)';
  const block = weatherSource.match(new RegExp(`^${blockName}:\\n([\\s\\S]*?)${end}`, 'm'))?.[1] ?? '';
  return [...block.matchAll(/^  - (?:word: )?['"]?([^'"\n]+)['"]?$/gm)].map((match) => match[1]);
}

describe('Themed Spelling Practice shared foundation', () => {
  it('uses canonical route classification for the public strand badge', () => {
    expect(renderer).toContain("route.classification === 'themed-spelling-practice'");
    expect(renderer).toContain("? 'Themed Spelling Practice'");
    expect(
      getCanonicalGradeRoutes().filter(
        (route) => route.classification === 'themed-spelling-practice',
      ),
    ).toHaveLength(27);
  });

  it('suppresses Core-style readiness only for themed pages and retains Core readiness', () => {
    expect(renderer).toContain(
      '!isHighFrequencyWords && !isThemedSpellingPractice && data.readinessSignals.length > 0',
    );
    expect(coreRenderer).toContain('data.readinessSignals.length > 0');
    expect(coreRenderer).toContain('These spelling words are a good fit for students who...');
  });

  it('keeps HFW notes and review intact while adding optional generic notes', () => {
    expect(schema).toContain('hfwWordNotes: z.array(hfwWordNote).default([])');
    expect(schema).toContain('wordNotes: z.array(wordNote).default([])');
    expect(schema).toMatch(/contextExample: z\.string\(\)\.optional\(\)/);
    expect(schema).toMatch(/pronunciationNote: z\.string\(\)\.optional\(\)/);
    expect(renderer).toContain('isHighFrequencyWords && data.hfwWordNotes.length > 0');
    expect(renderer).toContain('isThemedSpellingPractice && data.wordNotes.length > 0');
  });

  it('renders the themed spelling heading, selective-note context label, and shared review', () => {
    expect(renderer).toContain("? 'What to notice when spelling these words'");
    expect(renderer).toContain("isThemedSpellingPractice && (");
    expect(renderer).toContain('Hear or say each word, notice a useful part of its spelling');
    expect(renderer).toContain("<strong class=\"font-semibold text-ink\">In a sentence:</strong>{' '}");
    expect(renderer).not.toContain('In context:');
  });

  it('presents peers without progression language and links the owning gateway', () => {
    expect(renderer).toContain("'More themed spelling practice'");
    expect(renderer).toContain('href={`/${route.gradeSlug}/themed-spelling-practice`}');
    expect(renderer).toContain('All {gradeHubForBreadcrumb.label} Themed Spelling Practice');
    expect(getThemedSpellingPracticeExploreMore(weatherId)).toHaveLength(3);
  });
});

describe('Grade 1 Weather Words pilot', () => {
  it('preserves canonical identity, route, classification, grade, inventory, and order', () => {
    expect(weatherSource).toContain(`id: ${weatherId}`);
    expect(weatherSource).toContain("title: '1st Grade Weather Spelling Words'");
    expect(weatherSource).toContain("grade: '1'");
    expect(weatherSource).toContain('contentRole: vocabulary-theme');
    expect(listItems('words')).toEqual(weatherWords);
    expect(getCanonicalGradeRouteById(weatherId)).toMatchObject({
      canonicalPath: '/1st-grade/themed-spelling-practice/weather-words',
      classification: 'themed-spelling-practice',
      grade: '1',
    });
  });

  it('uses one selective note with no context or pronunciation filler', () => {
    expect(listItems('wordNotes', 'words')).toEqual(['cloudy']);
    expect(listItems('wordNotes', 'words').length).toBeLessThan(weatherWords.length);
    const noteBlock = weatherSource.match(/^wordNotes:\n([\s\S]*?)^words:/m)?.[1] ?? '';
    expect(noteBlock).not.toContain('contextExample:');
    expect(noteBlock).not.toContain('pronunciationNote:');
  });

  it('does not duplicate renderer-owned copy or restore obsolete terminology', () => {
    expect(weatherSource).not.toMatch(/Sight Words|Common Words|Heart Words|heart-words/i);
    expect(weatherSource).not.toContain('What to notice when spelling these words');
    expect(weatherSource).not.toContain('Practice and review');
    expect(weatherSource).not.toContain('Hear or say each word, notice a useful part');
    expect(weatherSource).not.toMatch(/Additional Practice/i);
  });
});
