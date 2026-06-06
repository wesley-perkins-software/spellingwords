import type { SpellingWord } from '@/types/spelling';
import { normalizeWord, compareWords } from '@/lib/words';
import type { TestState, TestAction, TestErrorCode } from './types';
import { shuffleWords } from './order';
import { buildResult } from './scoring';

const MAX_ANSWER_LENGTH = 200;

export function createInitialState(): TestState {
  return {
    status: 'idle',
    words: [],
    currentIndex: -1,
    attempts: [],
    startedAt: null,
    completedAt: null,
    result: null,
    lastAnswerCorrect: null,
    error: null,
  };
}

function toSpellingWords(words: SpellingWord[] | string[]): SpellingWord[] {
  return words.map((w) => (typeof w === 'string' ? { word: w } : w));
}

function withError(state: TestState, error: TestErrorCode): TestState {
  return { ...state, error };
}

function clearError(state: TestState): TestState {
  return state.error === null ? state : { ...state, error: null };
}

function handleInitialize(
  state: TestState,
  payload: { words: SpellingWord[] | string[]; shuffle?: boolean; rng?: () => number },
): TestState {
  const converted = toSpellingWords(payload.words);
  if (converted.length === 0) {
    return withError({ ...createInitialState() }, 'empty_word_list');
  }
  const ordered = payload.shuffle ? shuffleWords(converted, payload.rng) : converted;
  return {
    ...createInitialState(),
    status: 'ready',
    words: ordered,
  };
}

function handleStart(state: TestState, payload: { timestamp: number }): TestState {
  if (state.status !== 'ready') {
    return withError(state, 'invalid_state_transition');
  }
  return clearError({
    ...state,
    status: 'awaitingAnswer',
    currentIndex: 0,
    startedAt: payload.timestamp,
  });
}

function handleSubmitAnswer(
  state: TestState,
  payload: { answer: string; timestamp: number },
): TestState {
  if (state.status !== 'awaitingAnswer') {
    return withError(state, 'invalid_state_transition');
  }
  if (payload.answer.length > MAX_ANSWER_LENGTH) {
    return withError(state, 'answer_too_long');
  }

  const target = state.words[state.currentIndex];
  const normalizedAnswer = normalizeWord(payload.answer, { lowercase: true });
  const normalizedTarget = normalizeWord(target.word, { lowercase: true });
  const correct = compareWords(normalizedAnswer, normalizedTarget);

  const attempt = {
    wordIndex: state.currentIndex,
    answer: payload.answer,
    correct,
  };

  return clearError({
    ...state,
    status: 'feedback',
    attempts: [...state.attempts, attempt],
    lastAnswerCorrect: correct,
  });
}

function handleNextWord(state: TestState, payload: { timestamp: number }): TestState {
  if (state.status !== 'feedback') {
    return withError(state, 'invalid_state_transition');
  }

  const nextIndex = state.currentIndex + 1;
  if (nextIndex < state.words.length) {
    return clearError({
      ...state,
      status: 'awaitingAnswer',
      currentIndex: nextIndex,
      lastAnswerCorrect: null,
    });
  }

  const completedState: TestState = {
    ...state,
    status: 'complete',
    currentIndex: -1,
    lastAnswerCorrect: null,
    completedAt: payload.timestamp,
    error: null,
  };
  return { ...completedState, result: buildResult(completedState) };
}

function handleReset(): TestState {
  return createInitialState();
}

function handleReviewMissed(
  state: TestState,
  payload: { shuffle?: boolean; rng?: () => number },
): TestState {
  if (state.status !== 'complete') {
    return withError(state, 'invalid_state_transition');
  }
  const missed = state.result?.missedWords ?? [];
  if (missed.length === 0) {
    return state;
  }
  const ordered = payload.shuffle ? shuffleWords(missed, payload.rng) : missed;
  return {
    ...createInitialState(),
    status: 'awaitingAnswer',
    words: ordered,
    currentIndex: 0,
    startedAt: state.startedAt,
  };
}

export function spellingTestReducer(state: TestState, action: TestAction): TestState {
  switch (action.type) {
    case 'INITIALIZE':
      return handleInitialize(state, action.payload);
    case 'START':
      return handleStart(state, action.payload);
    case 'SUBMIT_ANSWER':
      return handleSubmitAnswer(state, action.payload);
    case 'NEXT_WORD':
      return handleNextWord(state, action.payload);
    case 'RESET':
      return handleReset();
    case 'REVIEW_MISSED':
      return handleReviewMissed(state, action.payload);
  }
}

// Action creators
export const initializeTest = (
  words: SpellingWord[] | string[],
  options?: { shuffle?: boolean; rng?: () => number },
): TestAction => ({ type: 'INITIALIZE', payload: { words, ...options } });

export const startTest = (timestamp: number): TestAction => ({
  type: 'START',
  payload: { timestamp },
});

export const submitAnswer = (answer: string, timestamp: number): TestAction => ({
  type: 'SUBMIT_ANSWER',
  payload: { answer, timestamp },
});

export const nextWord = (timestamp: number): TestAction => ({
  type: 'NEXT_WORD',
  payload: { timestamp },
});

export const resetTest = (): TestAction => ({ type: 'RESET' });

export const reviewMissed = (options?: {
  shuffle?: boolean;
  rng?: () => number;
}): TestAction => ({ type: 'REVIEW_MISSED', payload: { ...options } });
