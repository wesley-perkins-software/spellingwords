import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { normalizeWord } from '@/lib/words';
import { canonicalGradeRoutes } from '@/lib/content/canonicalGradeRoutes';
import { getSentenceBankEntry } from './lookup';

/**
 * Every canonical Core Spelling / High-Frequency Words / Themed Spelling
 * Practice word occurrence must resolve to a sentence-bank entry (either a
 * real example sentence, or a deliberate `sentenceOmissionReason`). This
 * file re-derives the canonical word list straight from content frontmatter
 * (the same source `toPlayableWords()` reads at build time) rather than
 * trusting a hand-maintained list, so new lists or new words can't silently
 * regress coverage. Deprecated/archived/skills-library content is excluded
 * on purpose — this invariant only governs the three public strands.
 */

const CONTENT_ROOT = new URL('../../content/spelling-lists/', import.meta.url);

interface ContentEntry {
  id: string;
  status: string;
  words: string[];
  filePath: string;
}

function listMarkdownFiles(dirUrl: URL): string[] {
  const dirPath = path.normalize(dirUrl.pathname);
  const out: string[] = [];
  for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      out.push(...listMarkdownFiles(new URL(`${entry.name}/`, dirUrl)));
    } else if (entry.name.endsWith('.md')) {
      out.push(path.join(dirPath, entry.name));
    }
  }
  return out;
}

/**
 * Minimal parser for this repo's one frontmatter shape: a `words:` list
 * whose items are either a bare/quoted string, or a `word: "..."` object
 * (optionally followed by more-indented `hint:`/`phonicsPattern:` lines,
 * which this only needs to skip past). Not a general YAML parser.
 */
function parseContentEntry(filePath: string): ContentEntry {
  const raw = readFileSync(filePath, 'utf8');
  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) throw new Error(`No frontmatter found in ${filePath}`);
  const frontmatter = frontmatterMatch[1];
  const lines = frontmatter.split('\n');

  const idMatch = frontmatter.match(/^id:\s*(\S+)\s*$/m);
  const statusMatch = frontmatter.match(/^status:\s*(\S+)\s*$/m);
  if (!idMatch) throw new Error(`No id field in ${filePath}`);
  if (!statusMatch) throw new Error(`No status field in ${filePath}`);

  const wordsStart = lines.findIndex((line) => line === 'words:');
  if (wordsStart === -1) throw new Error(`No words: list in ${filePath}`);

  const words: string[] = [];
  for (let i = wordsStart + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^\S/.test(line)) break; // dedent back to a top-level key
    const bareMatch = line.match(/^ {2}- "?([^"\n]+?)"?\s*$/);
    const objectMatch = line.match(/^ {2}- word:\s*"([^"]+)"\s*$/);
    if (objectMatch) {
      words.push(objectMatch[1]);
    } else if (bareMatch) {
      words.push(bareMatch[1]);
    }
    // Any other line at this point (e.g. `    hint: "..."`) belongs to the
    // preceding object-form item and is intentionally skipped.
  }

  return { id: idMatch[1], status: statusMatch[1], words, filePath };
}

const allEntries = listMarkdownFiles(CONTENT_ROOT).map(parseContentEntry);
const entryById = new Map(allEntries.map((entry) => [entry.id, entry]));

const PLACEHOLDER_PATTERN = /\b(TODO|TBD|lorem ipsum|example sentence)\b/i;
const MIN_SENTENCE_LENGTH = 8;
const MAX_SENTENCE_LENGTH = 200;
const MAX_WORDS_SHARING_ONE_SENTENCE = 3;

describe('canonical strand sentence coverage', () => {
  it('resolves every canonical route to a published content entry with a words list', () => {
    expect(canonicalGradeRoutes.length).toBeGreaterThan(0);
    for (const route of canonicalGradeRoutes) {
      const entry = entryById.get(route.id);
      expect(entry, `canonical route "${route.id}" has no matching content file`).toBeDefined();
      expect(entry?.status, `canonical route "${route.id}" is not published`).toBe('published');
      expect(entry?.words.length ?? 0, `canonical route "${route.id}" has no words`).toBeGreaterThan(0);
    }
  });

  it('gives every canonical word occurrence a sentence-bank entry', () => {
    const missing: string[] = [];
    for (const route of canonicalGradeRoutes) {
      const entry = entryById.get(route.id);
      if (!entry) continue; // reported by the previous test
      for (const word of entry.words) {
        const bankEntry = getSentenceBankEntry(word);
        if (!bankEntry) missing.push(`${route.id}: "${word}"`);
      }
    }
    expect(missing, `canonical words missing a sentence-bank entry:\n${missing.join('\n')}`).toEqual(
      [],
    );
  });

  it('gives every canonical word a non-empty exact-match sentence, or a deliberate omission', () => {
    const problems: string[] = [];
    for (const route of canonicalGradeRoutes) {
      const entry = entryById.get(route.id);
      if (!entry) continue;
      for (const word of entry.words) {
        const bankEntry = getSentenceBankEntry(word);
        if (!bankEntry) continue; // reported by the previous test

        if (bankEntry.sentenceOmissionReason) continue; // deliberate, e.g. heteronyms

        const sentence = bankEntry.exampleSentence;
        if (!sentence || sentence.trim().length === 0) {
          problems.push(`${route.id}: "${word}" has an empty sentence`);
          continue;
        }
        if (PLACEHOLDER_PATTERN.test(sentence)) {
          problems.push(`${route.id}: "${word}" sentence looks like a placeholder: "${sentence}"`);
        }

        const normalizedWord = normalizeWord(word, { lowercase: true });
        const normalizedSentence = normalizeWord(sentence, { lowercase: true });
        // A plain \b fails on words ending in an apostrophe (e.g. "dogs'"):
        // the apostrophe is itself a non-word character, so \b never matches
        // between it and the following space. Treat letters/digits/apostrophe
        // as "word" characters for boundary purposes instead.
        const escapedWord = normalizedWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const containsTarget = new RegExp(
          `(?<![\\p{L}\\p{N}'])${escapedWord}(?![\\p{L}\\p{N}'])`,
          'u',
        ).test(normalizedSentence);
        if (!containsTarget) {
          problems.push(`${route.id}: "${word}" sentence does not contain the word: "${sentence}"`);
        }
      }
    }
    expect(problems, problems.join('\n')).toEqual([]);
  });

  it('keeps sentence-bank prose within sane length bounds (quality lint)', () => {
    const problems: string[] = [];
    for (const route of canonicalGradeRoutes) {
      const entry = entryById.get(route.id);
      if (!entry) continue;
      for (const word of entry.words) {
        const bankEntry = getSentenceBankEntry(word);
        const sentence = bankEntry?.exampleSentence;
        if (!sentence) continue;
        if (sentence.length < MIN_SENTENCE_LENGTH) {
          problems.push(`"${word}" sentence is too short (${sentence.length} chars): "${sentence}"`);
        }
        if (sentence.length > MAX_SENTENCE_LENGTH) {
          problems.push(`"${word}" sentence is too long (${sentence.length} chars): "${sentence}"`);
        }
      }
    }
    expect(problems, problems.join('\n')).toEqual([]);
  });

  it('does not let one sentence get mechanically reused across unrelated words (quality lint)', () => {
    const wordsBySentence = new Map<string, Set<string>>();
    for (const route of canonicalGradeRoutes) {
      const entry = entryById.get(route.id);
      if (!entry) continue;
      for (const word of entry.words) {
        const sentence = getSentenceBankEntry(word)?.exampleSentence;
        if (!sentence) continue;
        const normalizedWord = normalizeWord(word, { lowercase: true });
        if (!wordsBySentence.has(sentence)) wordsBySentence.set(sentence, new Set());
        wordsBySentence.get(sentence)!.add(normalizedWord);
      }
    }
    const overused = [...wordsBySentence.entries()].filter(
      ([, words]) => words.size > MAX_WORDS_SHARING_ONE_SENTENCE,
    );
    expect(
      overused,
      overused.map(([sentence, words]) => `"${sentence}" used for ${[...words].join(', ')}`).join('\n'),
    ).toEqual([]);
  });
});
