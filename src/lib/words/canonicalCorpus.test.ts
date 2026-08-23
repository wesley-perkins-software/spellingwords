import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { validateWordInput } from './validateWordInput';

/**
 * Invariant: every canonical spelling target in the curriculum corpus is
 * valid under the site's spelling character policy (`validateWordInput`).
 * This is a direct, dependency-free check against the source Markdown
 * (no YAML parser — none is a direct project dependency), so it stays
 * accurate as new lists are added without relying on Astro's
 * content-collection loader (unavailable in the Vitest `node` environment).
 */

const CONTENT_ROOT = join(__dirname, '..', '..', 'content', 'spelling-lists');
const LIST_FIELDS = ['words', 'hfwWordNotes', 'wordNotes'] as const;

function collectMarkdownFiles(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectMarkdownFiles(full));
    } else if (entry.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

/** Strip a single layer of matching quotes (`'...'` or `"..."`), if present. */
function unquote(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length >= 2) {
    const first = trimmed[0];
    const last = trimmed[trimmed.length - 1];
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return trimmed.slice(1, -1);
    }
  }
  return trimmed;
}

/**
 * Pull the words out of one `words:`/`hfwWordNotes:`/`wordNotes:` frontmatter
 * list. Handles plain string items (`  - cat`) and the `{word, hint, ...}` /
 * `{word, note, ...}` object form, in either its block-mapping shape
 * (`  - word: "won't"` with an indented `hint:` continuation line) or a
 * single-line flow-mapping shape (`  - {word: "cat", hint: "..."}`).
 */
function extractWordsFromListBlock(block: string): string[] {
  const words: string[] = [];
  const itemStart = /^ {2}- /;
  const lines = block.split('\n');

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!itemStart.test(line)) continue;
    const rest = line.replace(itemStart, '');

    const wordKeyMatch = /^word:\s*(.+)$/.exec(rest) ?? /\{\s*['"]?word['"]?:\s*([^,}]+)/.exec(rest);
    if (wordKeyMatch) {
      words.push(unquote(wordKeyMatch[1]));
    } else {
      words.push(unquote(rest));
    }
  }

  return words;
}

interface WordSource {
  file: string;
  word: string;
}

function collectCanonicalWords(): WordSource[] {
  const files = collectMarkdownFiles(CONTENT_ROOT);
  const words: WordSource[] = [];

  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    const frontmatterMatch = /^---\n([\s\S]*?)\n---\n/.exec(text);
    if (!frontmatterMatch) continue;
    const frontmatter = frontmatterMatch[1];

    for (const field of LIST_FIELDS) {
      const blockMatch = new RegExp(`^${field}:\\n((?:  .*\\n?)+)`, 'm').exec(frontmatter);
      if (!blockMatch) continue;
      for (const word of extractWordsFromListBlock(blockMatch[1])) {
        words.push({ file, word });
      }
    }
  }

  return words;
}

describe('canonical corpus vs. the spelling character policy', () => {
  it('finds canonical spelling lists to check (sanity check for the audit itself)', () => {
    // The corpus audit backing this policy counted 1,083 unique canonical
    // words; this checks the extractor is actually finding real content
    // (not silently matching zero entries), not the exact total, which
    // grows as new lists are added.
    expect(collectCanonicalWords().length).toBeGreaterThan(1000);
  });

  it('validates every canonical word/word-note target under validateWordInput', () => {
    const failures = collectCanonicalWords()
      .map(({ file, word }) => ({ file, word, result: validateWordInput(word) }))
      .filter(({ result }) => !result.valid);

    if (failures.length > 0) {
      const report = failures
        .map(
          ({ file, word, result }) =>
            `${word} (${file}): ${result.errors.map((e) => e.code).join(', ')}`,
        )
        .join('\n');
      throw new Error(`Canonical words failing the spelling character policy:\n${report}`);
    }

    expect(failures).toEqual([]);
  });
});
