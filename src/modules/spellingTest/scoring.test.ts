import { describe, it, expect } from 'vitest';
import { calculateScore, calculateElapsed, buildResult } from './scoring';
import type { WordAttempt, TestState } from './types';
import { createInitialState } from './stateMachine';

function makeAttempt(wordIndex: number, answer: string, correct: boolean): WordAttempt {
  return { wordIndex, answer, correct };
}

describe('calculateScore', () => {
  it('returns zeros for empty attempts', () => {
    expect(calculateScore([])).toEqual({ correct: 0, total: 0, percentage: 0 });
  });

  it('returns 100% when all correct', () => {
    const attempts = [makeAttempt(0, 'cat', true), makeAttempt(1, 'dog', true)];
    expect(calculateScore(attempts)).toEqual({ correct: 2, total: 2, percentage: 100 });
  });

  it('returns 0% when all wrong', () => {
    const attempts = [makeAttempt(0, 'kat', false), makeAttempt(1, 'dgo', false)];
    expect(calculateScore(attempts)).toEqual({ correct: 0, total: 2, percentage: 0 });
  });

  it('calculates mixed score to one decimal', () => {
    const attempts = [
      makeAttempt(0, 'cat', true),
      makeAttempt(1, 'dog', true),
      makeAttempt(2, 'bird', false),
    ];
    const result = calculateScore(attempts);
    expect(result.correct).toBe(2);
    expect(result.total).toBe(3);
    expect(result.percentage).toBe(66.7);
  });
});

describe('calculateElapsed', () => {
  it('returns difference between timestamps', () => {
    expect(calculateElapsed(1000, 5000)).toBe(4000);
  });

  it('returns 0 for same timestamp', () => {
    expect(calculateElapsed(1000, 1000)).toBe(0);
  });
});

describe('buildResult', () => {
  it('populates missedWords from failed attempts', () => {
    const words = [{ word: 'cat' }, { word: 'dog' }, { word: 'bird' }];
    const attempts: WordAttempt[] = [
      makeAttempt(0, 'cat', true),
      makeAttempt(1, 'dgo', false),
      makeAttempt(2, 'bird', true),
    ];
    const state: TestState = {
      ...createInitialState(),
      status: 'complete',
      words,
      attempts,
      startedAt: 0,
      completedAt: 3000,
    };
    const result = buildResult(state);
    expect(result.missedWords).toEqual([{ word: 'dog' }]);
    expect(result.correct).toBe(2);
    expect(result.total).toBe(3);
    expect(result.elapsedMs).toBe(3000);
  });

  it('produces empty missedWords when all correct', () => {
    const words = [{ word: 'cat' }];
    const attempts: WordAttempt[] = [makeAttempt(0, 'cat', true)];
    const state: TestState = {
      ...createInitialState(),
      status: 'complete',
      words,
      attempts,
      startedAt: 0,
      completedAt: 1000,
    };
    expect(buildResult(state).missedWords).toEqual([]);
  });
});
