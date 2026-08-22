import { describe, expect, it } from 'vitest';
import { resolveResultsActions } from './resultsActions';
import type { TestResult } from './types';
import type { PracticeSource } from '@/types/spelling';

function makeResult(missedCount: number): TestResult {
  return {
    words: [],
    attempts: [],
    missedWords: Array.from({ length: missedCount }, (_, i) => ({ word: `missed-${i}` })),
    correct: 8 - missedCount,
    total: 8,
    percentage: ((8 - missedCount) / 8) * 100,
    elapsedMs: 1000,
    startedAt: 0,
    completedAt: 1000,
  };
}

const coreSourceWithNext: PracticeSource = {
  type: 'core',
  title: 'First Words',
  href: '/kindergarten/core-spelling/first-words',
  grade: 'K',
  nextHref: '/kindergarten/core-spelling/short-a-words',
  nextTitle: 'Short A Words',
  nextGrade: 'K',
};

const coreSourceAtGradeBoundary: PracticeSource = {
  type: 'core',
  title: 'Derived Words',
  href: '/4th-grade/core-spelling/derived-words',
  grade: '4',
  nextHref: '/5th-grade/core-spelling/multisyllabic-academic-words',
  nextTitle: 'Multisyllabic Academic Words',
  nextGrade: '5',
};

const coreSourceAtCurriculumEnd: PracticeSource = {
  type: 'core',
  title: 'Spelling Changes & Related Words',
  href: '/5th-grade/core-spelling/spelling-changes-related-words',
  grade: '5',
};

const skillSource: PracticeSource = {
  type: 'skill',
  title: 'Short A Words',
  href: '/skills/short-a-words',
};

const customSource: PracticeSource = { type: 'custom' };

// What resolveCustomPracticeSource() actually returns today — a custom
// session now carries a return destination, unlike the bare `customSource`
// above (kept to prove the generic href/title-less behavior still works).
const customSourceWithReturn: PracticeSource = {
  type: 'custom',
  title: 'Practice Your Own Words',
  href: '/practice-your-own-words',
};

const sharedSource: PracticeSource = {
  type: 'shared',
  title: 'Week 4 Spelling',
  href: '/practice-your-own-words',
};

describe('resolveResultsActions', () => {
  it('perfect + source with nextHref: continueNext, retryFull, sourceReturn in order', () => {
    const actions = resolveResultsActions(makeResult(0), coreSourceWithNext);
    expect(actions.map((a) => a.kind)).toEqual(['continueNext', 'retryFull', 'sourceReturn']);
    expect(actions[0].href).toBe('/kindergarten/core-spelling/short-a-words');
    expect(actions[0].label).toBe('Continue to next unit →');
    expect(actions[2].href).toBe('/kindergarten/core-spelling/first-words');
  });

  it('perfect + source without nextHref: retryFull, sourceReturn only', () => {
    const actions = resolveResultsActions(makeResult(0), skillSource);
    expect(actions.map((a) => a.kind)).toEqual(['retryFull', 'sourceReturn']);
    expect(actions[0].label).toBe('Practice again');
  });

  it('perfect + no source: retryFull only, no forced generic destination', () => {
    const actions = resolveResultsActions(makeResult(0), customSource);
    expect(actions.map((a) => a.kind)).toEqual(['retryFull']);
  });

  it('non-perfect + source with nextHref: never offers continueNext', () => {
    const actions = resolveResultsActions(makeResult(2), coreSourceWithNext);
    expect(actions.map((a) => a.kind)).toEqual(['reviewMissed', 'retryFull', 'sourceReturn']);
    expect(actions.some((a) => a.kind === 'continueNext')).toBe(false);
    expect(actions[1].label).toBe('Practice full list again');
  });

  it('non-perfect + custom source: reviewMissed, retryFull only, no forced link', () => {
    const actions = resolveResultsActions(makeResult(3), customSource);
    expect(actions.map((a) => a.kind)).toEqual(['reviewMissed', 'retryFull']);
  });

  it('same-grade Core continue keeps the generic "next unit" label', () => {
    const actions = resolveResultsActions(makeResult(0), coreSourceWithNext);
    const continueAction = actions.find((a) => a.kind === 'continueNext')!;
    expect(continueAction.label).toBe('Continue to next unit →');
    expect(continueAction.href).toBe(coreSourceWithNext.nextHref);
  });

  it('grade-boundary Core continue uses a destination-aware label without changing href', () => {
    const actions = resolveResultsActions(makeResult(0), coreSourceAtGradeBoundary);
    const continueAction = actions.find((a) => a.kind === 'continueNext')!;
    expect(continueAction.label).toBe('Continue to 5th Grade Core Spelling →');
    // The label changes; the destination it navigates to must not.
    expect(continueAction.href).toBe(coreSourceAtGradeBoundary.nextHref);
  });

  it('end of Grade 5 Core (no nextHref) never offers a continueNext action', () => {
    const actions = resolveResultsActions(makeResult(0), coreSourceAtCurriculumEnd);
    expect(actions.some((a) => a.kind === 'continueNext')).toBe(false);
    expect(actions.map((a) => a.kind)).toEqual(['retryFull', 'sourceReturn']);
  });

  it('custom practice with a return destination (as resolveCustomPracticeSource now returns) never dead-ends: perfect session still offers sourceReturn', () => {
    const actions = resolveResultsActions(makeResult(0), customSourceWithReturn);
    expect(actions.map((a) => a.kind)).toEqual(['retryFull', 'sourceReturn']);
    expect(actions[1].label).toBe('← Return to Practice Your Own Words');
    expect(actions[1].href).toBe('/practice-your-own-words');
  });

  it('custom practice with a return destination: non-perfect session offers sourceReturn too', () => {
    const actions = resolveResultsActions(makeResult(2), customSourceWithReturn);
    expect(actions.map((a) => a.kind)).toEqual(['reviewMissed', 'retryFull', 'sourceReturn']);
  });

  it('shared-list source never matches the core/hfw next-label branch and still offers sourceReturn', () => {
    const perfect = resolveResultsActions(makeResult(0), sharedSource);
    expect(perfect.map((a) => a.kind)).toEqual(['retryFull', 'sourceReturn']);
    expect(perfect.some((a) => a.kind === 'continueNext')).toBe(false);
    expect(perfect[1].label).toBe('← Return to Week 4 Spelling');

    const nonPerfect = resolveResultsActions(makeResult(3), sharedSource);
    expect(nonPerfect.map((a) => a.kind)).toEqual(['reviewMissed', 'retryFull', 'sourceReturn']);
  });
});
