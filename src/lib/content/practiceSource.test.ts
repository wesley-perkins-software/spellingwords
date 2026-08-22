import { describe, expect, it } from 'vitest';
import {
  resolveGradeUnitPracticeSource,
  resolveSkillPracticeSource,
  resolveCustomPracticeSource,
} from './practiceSource';

const titleById = (id: string): string | undefined => {
  const titles: Record<string, string> = {
    'kindergarten-short-a-words': 'Short A Words',
    'grade-1-high-frequency-words-set-2': 'Grade 1 High-Frequency Words — Set 2',
  };
  return titles[id];
};

describe('resolveGradeUnitPracticeSource', () => {
  it('resolves a core-spelling unit mid-sequence with a next unit', () => {
    const source = resolveGradeUnitPracticeSource({
      id: 'kindergarten-first-words',
      classification: 'core-spelling',
      title: 'First Words',
      href: '/kindergarten/core-spelling/first-words',
      grade: 'K',
      titleById,
    });

    expect(source.type).toBe('core');
    expect(source.title).toBe('First Words');
    expect(source.href).toBe('/kindergarten/core-spelling/first-words');
    expect(source.grade).toBe('K');
    expect(source.nextHref).toBe('/kindergarten/core-spelling/short-a-words');
    expect(source.nextTitle).toBe('Short A Words');
  });

  it('omits nextHref/nextTitle at the end of the core-spelling sequence', () => {
    const source = resolveGradeUnitPracticeSource({
      id: 'grade-5-spelling-changes-related-words',
      classification: 'core-spelling',
      title: 'Spelling Changes in Related Words',
      href: '/grade-5/core-spelling/spelling-changes-in-related-words',
      grade: '5',
      titleById,
    });

    expect(source.type).toBe('core');
    expect(source.nextHref).toBeUndefined();
    expect(source.nextTitle).toBeUndefined();
  });

  it('resolves an hfw set with a next set in the same grade', () => {
    const source = resolveGradeUnitPracticeSource({
      id: 'grade-1-high-frequency-words-set-1',
      classification: 'high-frequency-words',
      title: 'Grade 1 High-Frequency Words — Set 1',
      href: '/grade-1/high-frequency-words/set-1',
      grade: '1',
      titleById,
    });

    expect(source.type).toBe('hfw');
    expect(source.nextHref).toBe('/1st-grade/high-frequency-words/set-2');
    expect(source.nextTitle).toBe('Grade 1 High-Frequency Words — Set 2');
  });

  it('never carries a next set across a grade boundary', () => {
    const source = resolveGradeUnitPracticeSource({
      id: 'grade-1-high-frequency-words-set-7',
      classification: 'high-frequency-words',
      title: 'Grade 1 High-Frequency Words — Set 7',
      href: '/grade-1/high-frequency-words/set-7',
      grade: '1',
      titleById,
    });

    expect(source.nextHref).toBeUndefined();
    expect(source.nextTitle).toBeUndefined();
  });

  it('never sets nextHref/nextTitle for themed lists', () => {
    const source = resolveGradeUnitPracticeSource({
      id: 'grade-1-weather-words',
      classification: 'themed-spelling-practice',
      title: 'Weather Words',
      href: '/grade-1/themed-spelling-practice/weather-words',
      grade: '1',
      titleById: () => 'Should never be called',
    });

    expect(source.type).toBe('themed');
    expect(source.nextHref).toBeUndefined();
    expect(source.nextTitle).toBeUndefined();
  });
});

describe('resolveSkillPracticeSource', () => {
  it('never sets nextHref/nextTitle', () => {
    const source = resolveSkillPracticeSource({ title: 'Short A Words', href: '/skills/short-a-words' });
    expect(source).toEqual({ type: 'skill', title: 'Short A Words', href: '/skills/short-a-words' });
  });
});

describe('resolveCustomPracticeSource', () => {
  it('returns exactly the minimal custom shape, never user text', () => {
    expect(resolveCustomPracticeSource()).toEqual({ type: 'custom' });
  });
});
