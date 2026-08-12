import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Source-level checks on /play's question rendering, matching this repo's
// existing convention (see skillPracticePage.test.ts) of asserting on file
// content rather than rendering Astro components in Vitest.
const playPagePath = join(process.cwd(), 'src/pages/play.astro');
const source = readFileSync(playPagePath, 'utf8');

describe('/play context-aware practice', () => {
  it('renders a blanked context sentence element, hidden by default', () => {
    expect(source).toContain('id="question-context"');
    const start = source.indexOf('id="question-context"');
    const tagStart = source.lastIndexOf('<p', start);
    const tagEnd = source.indexOf('>', start);
    const openTag = source.slice(tagStart, tagEnd);
    expect(openTag).toContain('class="hidden');
  });

  it('branches question rendering on contextRequired, only when a word carries it', () => {
    expect(source).toContain('current.contextRequired && current.contextSentence');
    expect(source).toContain('current.contextRequired && hasSentence');
  });

  it('speaks the sentence before the isolated word for context-required items', () => {
    const branchStart = source.indexOf('if (current.contextRequired && hasSentence)');
    expect(branchStart).toBeGreaterThan(-1);
    const branchEnd = source.indexOf('\n    }\n', branchStart);
    const branch = source.slice(branchStart, branchEnd);

    const sentenceCallIndex = branch.indexOf('speech.speakWord(current.exampleSentence');
    const wordCallIndex = branch.indexOf('speech.speakWord(current.word');
    expect(sentenceCallIndex).toBeGreaterThan(-1);
    expect(wordCallIndex).toBeGreaterThan(-1);
    expect(sentenceCallIndex).toBeLessThan(wordCallIndex);
  });

  it('leaves the ordinary (non-context) path speaking the isolated word first, unchanged', () => {
    // The ordinary fallback below the context-required branch still speaks
    // the word immediately and only defers the sentence.
    const ordinaryStart = source.indexOf(
      'const result = speech.speakWord(current.word, speechOptions());',
    );
    expect(ordinaryStart).toBeGreaterThan(-1);
    const nearby = source.slice(ordinaryStart, ordinaryStart + 400);
    expect(nearby).toContain('sentenceTimeout = setTimeout(() => {');
    expect(nearby).toContain('speech.speakWord(current.exampleSentence!, speechOptions());');
  });

  it('gives context-required items their own instruction copy', () => {
    expect(source).toContain('function contextInstructionForIndex(): string {');
    expect(source).toContain('Listen to the sentence, then type the missing word.');
  });

  it('answer submission still evaluates the target word field regardless of context metadata', () => {
    // submitAnswer compares against state.words[currentIndex].word inside the
    // reducer — the question screen never substitutes a different value.
    expect(source).toContain('spellingTestReducer(state, submitAnswer(answer, Date.now()));');
    expect(source).not.toMatch(/submitAnswer\([^)]*contextSentence/);
  });
});
