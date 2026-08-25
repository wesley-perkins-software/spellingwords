import { describe, expect, it } from 'vitest';
import { getPracticeIntroCopy } from './practiceIntro';

describe('getPracticeIntroCopy', () => {
  it('promises sentence audio when every word has a sentence', () => {
    const copy = getPracticeIntroCopy([
      { word: 'bed', exampleSentence: 'I sleep in my bed.' },
      { word: 'bug', exampleSentence: 'The bug crawled away.' },
    ]);
    expect(copy).toBe(
      'Listen to each word, then type its spelling. You can also hear the word used in a sentence.',
    );
  });

  it('does not promise sentence audio when coverage is mixed', () => {
    const copy = getPracticeIntroCopy([
      { word: 'bed', exampleSentence: 'I sleep in my bed.' },
      { word: 'zqx' },
    ]);
    expect(copy).toBe('Listen to each word, then type its spelling.');
  });

  it('does not promise sentence audio when no words have one', () => {
    const copy = getPracticeIntroCopy([{ word: 'zqx' }, { word: 'plarn' }]);
    expect(copy).toBe('Listen to each word, then type its spelling.');
  });

  it('treats a blank/whitespace-only sentence as no sentence', () => {
    const copy = getPracticeIntroCopy([{ word: 'bed', exampleSentence: '   ' }]);
    expect(copy).toBe('Listen to each word, then type its spelling.');
  });

  it('does not promise sentence audio for an empty word list', () => {
    expect(getPracticeIntroCopy([])).toBe('Listen to each word, then type its spelling.');
  });
});
