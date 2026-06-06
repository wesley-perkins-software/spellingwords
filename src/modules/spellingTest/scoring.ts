import type { SpellingWord } from '@/types/spelling';
import type { WordAttempt, TestResult, TestState } from './types';

export function calculateScore(attempts: WordAttempt[]): {
  correct: number;
  total: number;
  percentage: number;
} {
  const total = attempts.length;
  const correct = attempts.filter((a) => a.correct).length;
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 1000) / 10;
  return { correct, total, percentage };
}

export function calculateElapsed(startedAt: number, completedAt: number): number {
  return completedAt - startedAt;
}

export function buildResult(state: TestState): TestResult {
  const { correct, total, percentage } = calculateScore(state.attempts);
  const startedAt = state.startedAt ?? 0;
  const completedAt = state.completedAt ?? 0;
  const missedWords: SpellingWord[] = state.attempts
    .filter((a) => !a.correct)
    .map((a) => state.words[a.wordIndex]);
  return {
    words: state.words,
    attempts: state.attempts,
    missedWords,
    correct,
    total,
    percentage,
    elapsedMs: calculateElapsed(startedAt, completedAt),
    startedAt,
    completedAt,
  };
}
