import { describe, it, expect } from 'vitest';
import type { SpellingWord } from '@/types/spelling';
import type { WordList } from '@/types/spelling';
import {
  createInitialState,
  spellingTestReducer,
  initializeTest,
  startTest,
  submitAnswer,
  nextWord,
  resetTest,
  reviewMissed,
} from './stateMachine';

// Helpers for running through the test flow
const T = { start: 1000, answer: 2000, next: 3000, complete: 4000 };

function runTest(words: string[], answers: string[]) {
  let state = createInitialState();
  state = spellingTestReducer(state, initializeTest(words));
  state = spellingTestReducer(state, startTest(T.start));
  for (let i = 0; i < answers.length; i++) {
    state = spellingTestReducer(state, submitAnswer(answers[i], T.answer));
    state = spellingTestReducer(state, nextWord(i < answers.length - 1 ? T.next : T.complete));
  }
  return state;
}

describe('createInitialState', () => {
  it('returns idle state with empty words', () => {
    const state = createInitialState();
    expect(state.status).toBe('idle');
    expect(state.words).toEqual([]);
    expect(state.currentIndex).toBe(-1);
    expect(state.error).toBeNull();
  });
});

describe('INITIALIZE', () => {
  it('transitions to ready from idle with a string array', () => {
    const state = spellingTestReducer(createInitialState(), initializeTest(['cat', 'dog']));
    expect(state.status).toBe('ready');
    expect(state.words).toEqual([{ word: 'cat' }, { word: 'dog' }]);
  });

  it('transitions to ready from idle with a SpellingWord array', () => {
    const words: SpellingWord[] = [{ word: 'cat', hint: 'a pet' }];
    const state = spellingTestReducer(createInitialState(), initializeTest(words));
    expect(state.status).toBe('ready');
    expect(state.words[0].hint).toBe('a pet');
  });

  it('preserves optional fields (exampleSentence, hint) through the state machine', () => {
    const words: SpellingWord[] = [
      { word: 'live', exampleSentence: 'We heard live music at the school fair.' },
      { word: 'cat' },
    ];
    let state = spellingTestReducer(createInitialState(), initializeTest(words));
    state = spellingTestReducer(state, startTest(T.start));
    expect(state.words[0].exampleSentence).toBe('We heard live music at the school fair.');
    expect(state.words[1].exampleSentence).toBeUndefined();
  });

  it('initializes from a WordList by passing its words array', () => {
    const wordList: WordList = {
      id: '1',
      slug: 'test',
      title: 'Test List',
      description: '',
      category: 'test',
      tags: [],
      words: [{ word: 'apple' }, { word: 'pear' }],
      sourceType: 'custom',
      relatedLists: [],
    };
    const state = spellingTestReducer(createInitialState(), initializeTest(wordList.words));
    expect(state.status).toBe('ready');
    expect(state.words).toHaveLength(2);
  });

  it('sets error and stays idle for empty word list', () => {
    const state = spellingTestReducer(createInitialState(), initializeTest([]));
    expect(state.status).toBe('idle');
    expect(state.error).toBe('empty_word_list');
  });

  it('preserves word order by default', () => {
    const words = ['cherry', 'apple', 'banana'];
    const state = spellingTestReducer(createInitialState(), initializeTest(words));
    expect(state.words.map((w) => w.word)).toEqual(['cherry', 'apple', 'banana']);
  });

  it('produces shuffled order when shuffle is true (with seeded rng)', () => {
    const words = ['a', 'b', 'c', 'd', 'e'];
    const rng = () => 0.1;
    const state = spellingTestReducer(createInitialState(), initializeTest(words, { shuffle: true, rng }));
    const resultWords = state.words.map((w) => w.word);
    expect([...resultWords].sort()).toEqual([...words].sort());
    // With a fixed rng, the result should differ from the original order
    expect(resultWords).not.toEqual(words);
  });

  it('does not mutate the input array', () => {
    const words = Object.freeze(['cat', 'dog']) as string[];
    expect(() => spellingTestReducer(createInitialState(), initializeTest(words))).not.toThrow();
  });

  it('resets state when called from non-idle status', () => {
    let state = createInitialState();
    state = spellingTestReducer(state, initializeTest(['cat']));
    state = spellingTestReducer(state, startTest(T.start));
    expect(state.status).toBe('awaitingAnswer');
    state = spellingTestReducer(state, initializeTest(['dog']));
    expect(state.status).toBe('ready');
    expect(state.words).toEqual([{ word: 'dog' }]);
    expect(state.attempts).toEqual([]);
  });
});

describe('START', () => {
  it('transitions ready → awaitingAnswer', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['cat']));
    state = spellingTestReducer(state, startTest(T.start));
    expect(state.status).toBe('awaitingAnswer');
    expect(state.currentIndex).toBe(0);
    expect(state.startedAt).toBe(T.start);
  });

  it('sets error when called from wrong state', () => {
    const state = spellingTestReducer(createInitialState(), startTest(T.start));
    expect(state.error).toBe('invalid_state_transition');
    expect(state.status).toBe('idle');
  });
});

describe('SUBMIT_ANSWER', () => {
  it('transitions awaitingAnswer → feedback on correct answer', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['cat']));
    state = spellingTestReducer(state, startTest(T.start));
    state = spellingTestReducer(state, submitAnswer('cat', T.answer));
    expect(state.status).toBe('feedback');
    expect(state.lastAnswerCorrect).toBe(true);
    expect(state.attempts[0]).toEqual({
      wordIndex: 0,
      answer: 'cat',
      correct: true,
      outcome: 'correct',
    });
  });

  it('records incorrect answer', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['cat']));
    state = spellingTestReducer(state, startTest(T.start));
    state = spellingTestReducer(state, submitAnswer('kat', T.answer));
    expect(state.lastAnswerCorrect).toBe(false);
    expect(state.attempts[0].correct).toBe(false);
  });

  it('accepts case-insensitive match', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['Cat']));
    state = spellingTestReducer(state, startTest(T.start));
    state = spellingTestReducer(state, submitAnswer('cat', T.answer));
    expect(state.lastAnswerCorrect).toBe(true);
  });

  it('accepts answer with different capitalization of target', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['HELLO']));
    state = spellingTestReducer(state, startTest(T.start));
    state = spellingTestReducer(state, submitAnswer('hello', T.answer));
    expect(state.lastAnswerCorrect).toBe(true);
  });

  it('flags a caseMismatch outcome for a lowercase answer to a meaningfully-capitalized canonical word, while still counting it correct', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['January']));
    state = spellingTestReducer(state, startTest(T.start));
    state = spellingTestReducer(state, submitAnswer('january', T.answer));
    expect(state.lastAnswerCorrect).toBe(true);
    expect(state.lastAnswerOutcome).toBe('caseMismatch');
    expect(state.attempts[0].outcome).toBe('caseMismatch');
  });

  it('does not flag a caseMismatch for a case-only difference against an all-lowercase canonical word', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['cat']));
    state = spellingTestReducer(state, startTest(T.start));
    state = spellingTestReducer(state, submitAnswer('Cat', T.answer));
    expect(state.lastAnswerOutcome).toBe('correct');
  });

  describe('custom sessions (meaningfulCapitalization: false)', () => {
    // A custom-entered "Cat" (e.g. mobile-keyboard autocapitalized) must not
    // teach a false capitalization rule — case-only differences grade
    // correct with no reminder, in either direction.
    it('never produces a caseMismatch, even against a capitalized custom target', () => {
      let state = spellingTestReducer(
        createInitialState(),
        initializeTest(['Cat'], { meaningfulCapitalization: false }),
      );
      state = spellingTestReducer(state, startTest(T.start));
      state = spellingTestReducer(state, submitAnswer('cat', T.answer));
      expect(state.lastAnswerOutcome).toBe('correct');
      expect(state.lastAnswerCorrect).toBe(true);
    });

    it('accepts an all-caps answer to a capitalized custom target with no reminder', () => {
      let state = spellingTestReducer(
        createInitialState(),
        initializeTest(['Cat'], { meaningfulCapitalization: false }),
      );
      state = spellingTestReducer(state, startTest(T.start));
      state = spellingTestReducer(state, submitAnswer('CAT', T.answer));
      expect(state.lastAnswerOutcome).toBe('correct');
    });

    it('accepts a lowercase answer to a custom "January" with no reminder, unlike canonical', () => {
      let state = spellingTestReducer(
        createInitialState(),
        initializeTest(['January'], { meaningfulCapitalization: false }),
      );
      state = spellingTestReducer(state, startTest(T.start));
      state = spellingTestReducer(state, submitAnswer('january', T.answer));
      expect(state.lastAnswerOutcome).toBe('correct');
    });

    it('still catches a genuine misspelling', () => {
      let state = spellingTestReducer(
        createInitialState(),
        initializeTest(['Cat'], { meaningfulCapitalization: false }),
      );
      state = spellingTestReducer(state, startTest(T.start));
      state = spellingTestReducer(state, submitAnswer('kat', T.answer));
      expect(state.lastAnswerOutcome).toBe('incorrect');
    });

    it('still treats a missing apostrophe as incorrect', () => {
      let state = spellingTestReducer(
        createInitialState(),
        initializeTest(["don't"], { meaningfulCapitalization: false }),
      );
      state = spellingTestReducer(state, startTest(T.start));
      state = spellingTestReducer(state, submitAnswer('dont', T.answer));
      expect(state.lastAnswerOutcome).toBe('incorrect');
    });

    it('carries meaningfulCapitalization through REVIEW_MISSED, not the createInitialState default', () => {
      let state = spellingTestReducer(
        createInitialState(),
        initializeTest(['Cat', 'Dog'], { meaningfulCapitalization: false }),
      );
      state = spellingTestReducer(state, startTest(T.start));
      state = spellingTestReducer(state, submitAnswer('wrong', T.answer)); // miss "Cat"
      state = spellingTestReducer(state, nextWord(T.next));
      state = spellingTestReducer(state, submitAnswer('wrong', T.answer)); // miss "Dog"
      state = spellingTestReducer(state, nextWord(T.complete));
      expect(state.status).toBe('complete');

      state = spellingTestReducer(state, reviewMissed());
      expect(state.meaningfulCapitalization).toBe(false);
      state = spellingTestReducer(state, submitAnswer('cat', T.answer));
      expect(state.lastAnswerOutcome).toBe('correct');
    });
  });

  it('normalizes smart quotes in answer', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(["it's"]));
    state = spellingTestReducer(state, startTest(T.start));
    // Smart/curly apostrophe in the answer
    state = spellingTestReducer(state, submitAnswer('it’s', T.answer));
    expect(state.lastAnswerCorrect).toBe(true);
  });

  it('normalizes smart quotes in target word', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['it’s']));
    state = spellingTestReducer(state, startTest(T.start));
    state = spellingTestReducer(state, submitAnswer("it's", T.answer));
    expect(state.lastAnswerCorrect).toBe(true);
  });

  it('sets error for answer exceeding max length', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['cat']));
    state = spellingTestReducer(state, startTest(T.start));
    state = spellingTestReducer(state, submitAnswer('a'.repeat(201), T.answer));
    expect(state.error).toBe('answer_too_long');
    expect(state.status).toBe('awaitingAnswer');
  });

  it('sets error when called from wrong state', () => {
    const state = spellingTestReducer(createInitialState(), submitAnswer('cat', T.answer));
    expect(state.error).toBe('invalid_state_transition');
  });

  it('sanitizes malformed adjacent punctuation out of the submitted answer before grading (regression)', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(["don't"]));
    state = spellingTestReducer(state, startTest(T.start));
    state = spellingTestReducer(state, submitAnswer("don''t", T.answer));
    expect(state.attempts[0].answer).toBe("don't");
    expect(state.lastAnswerOutcome).toBe('correct');
  });

  it('sanitizes disallowed characters out of the submitted answer before grading', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['cat']));
    state = spellingTestReducer(state, startTest(T.start));
    state = spellingTestReducer(state, submitAnswer('c@t2', T.answer));
    expect(state.attempts[0].answer).toBe('ct');
    expect(state.lastAnswerOutcome).toBe('incorrect');
  });

  it('treats an answer that sanitizes to nothing as no answer at all (does not advance to feedback)', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['cat']));
    state = spellingTestReducer(state, startTest(T.start));
    state = spellingTestReducer(state, submitAnswer('!/3428922', T.answer));
    expect(state.error).toBe('empty_answer');
    expect(state.status).toBe('awaitingAnswer');
    expect(state.attempts).toEqual([]);
  });

  it('clears previous error on valid submission', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['cat']));
    state = spellingTestReducer(state, startTest(T.start));
    // Trigger an error
    state = spellingTestReducer(state, submitAnswer('a'.repeat(201), T.answer));
    expect(state.error).toBe('answer_too_long');
    // Now submit valid
    state = spellingTestReducer(state, submitAnswer('cat', T.answer));
    expect(state.error).toBeNull();
  });
});

describe('NEXT_WORD', () => {
  it('advances to the next word', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['cat', 'dog']));
    state = spellingTestReducer(state, startTest(T.start));
    state = spellingTestReducer(state, submitAnswer('cat', T.answer));
    state = spellingTestReducer(state, nextWord(T.next));
    expect(state.status).toBe('awaitingAnswer');
    expect(state.currentIndex).toBe(1);
    expect(state.lastAnswerCorrect).toBeNull();
  });

  it('transitions to complete after the last word', () => {
    const finalState = runTest(['cat', 'dog'], ['cat', 'dog']);
    expect(finalState.status).toBe('complete');
    expect(finalState.currentIndex).toBe(-1);
    expect(finalState.completedAt).toBe(T.complete);
    expect(finalState.result).not.toBeNull();
  });

  it('sets error when called from wrong state', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['cat']));
    state = spellingTestReducer(state, startTest(T.start));
    state = spellingTestReducer(state, nextWord(T.next));
    expect(state.error).toBe('invalid_state_transition');
  });
});

describe('RESET', () => {
  it('resets from idle to idle', () => {
    const state = spellingTestReducer(createInitialState(), resetTest());
    expect(state.status).toBe('idle');
  });

  it('resets from ready to idle', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['cat']));
    state = spellingTestReducer(state, resetTest());
    expect(state.status).toBe('idle');
    expect(state.words).toEqual([]);
  });

  it('resets mid-test to idle', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['cat', 'dog']));
    state = spellingTestReducer(state, startTest(T.start));
    state = spellingTestReducer(state, submitAnswer('cat', T.answer));
    state = spellingTestReducer(state, resetTest());
    expect(state.status).toBe('idle');
    expect(state.attempts).toEqual([]);
    expect(state.startedAt).toBeNull();
  });

  it('resets from complete to idle', () => {
    const completed = runTest(['cat'], ['cat']);
    const reset = spellingTestReducer(completed, resetTest());
    expect(reset.status).toBe('idle');
    expect(reset.result).toBeNull();
  });
});

describe('complete state and result', () => {
  it('populates result on completion', () => {
    const state = runTest(['cat', 'dog', 'bird'], ['cat', 'dgo', 'bird']);
    expect(state.result).not.toBeNull();
    expect(state.result!.correct).toBe(2);
    expect(state.result!.total).toBe(3);
    expect(state.result!.percentage).toBe(66.7);
    expect(state.result!.missedWords).toEqual([{ word: 'dog' }]);
    expect(state.result!.elapsedMs).toBe(T.complete - T.start);
  });

  it('produces 100% score when all correct', () => {
    const state = runTest(['cat', 'dog'], ['cat', 'dog']);
    expect(state.result!.percentage).toBe(100);
    expect(state.result!.missedWords).toEqual([]);
  });

  it('produces 0% score when all wrong', () => {
    const state = runTest(['cat', 'dog'], ['kat', 'dgo']);
    expect(state.result!.percentage).toBe(0);
    expect(state.result!.missedWords).toHaveLength(2);
  });
});

describe('REVIEW_MISSED', () => {
  it('re-initializes with missed words only', () => {
    const completed = runTest(['cat', 'dog', 'bird'], ['cat', 'dgo', 'bird']);
    const state = spellingTestReducer(completed, reviewMissed());
    expect(state.status).toBe('awaitingAnswer');
    expect(state.words).toEqual([{ word: 'dog' }]);
    expect(state.currentIndex).toBe(0);
  });

  it('does nothing when no missed words', () => {
    const completed = runTest(['cat', 'dog'], ['cat', 'dog']);
    const state = spellingTestReducer(completed, reviewMissed());
    expect(state.status).toBe('complete');
  });

  it('sets error when called from non-complete state', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['cat']));
    state = spellingTestReducer(state, reviewMissed());
    expect(state.error).toBe('invalid_state_transition');
  });

  it('shuffles missed words when shuffle is true', () => {
    const words = ['a', 'b', 'c', 'd', 'e'];
    const completed = runTest(words, ['x', 'x', 'x', 'x', 'x']); // all wrong
    const rng = () => 0.1;
    const state = spellingTestReducer(completed, reviewMissed({ shuffle: true, rng }));
    expect(state.words.map((w) => w.word).sort()).toEqual(words);
  });
});

describe('elapsed time with injected timestamps', () => {
  it('uses injected timestamps, not Date.now', () => {
    let state = spellingTestReducer(createInitialState(), initializeTest(['cat']));
    state = spellingTestReducer(state, startTest(5000));
    state = spellingTestReducer(state, submitAnswer('cat', 6000));
    state = spellingTestReducer(state, nextWord(9000));
    expect(state.result!.startedAt).toBe(5000);
    expect(state.result!.completedAt).toBe(9000);
    expect(state.result!.elapsedMs).toBe(4000);
  });
});
