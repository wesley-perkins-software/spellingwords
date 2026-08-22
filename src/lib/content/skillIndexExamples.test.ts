import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CURATED_SPELLING_SKILL_IDS } from './spellingSkills';
import { SKILL_INDEX_CLARIFIERS, SKILL_INDEX_EXAMPLE_WORDS } from './skillIndexExamples';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');

function readFrontmatter(filePath: string): string {
  const source = readFileSync(filePath, 'utf8');
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`Missing frontmatter in ${filePath}`);
  return match[1];
}

function readWords(frontmatter: string): string[] {
  const lines = frontmatter.split('\n');
  const keyIndex = lines.findIndex((line) => line.startsWith('words:'));
  if (keyIndex === -1) return [];

  const values: string[] = [];
  for (const line of lines.slice(keyIndex + 1)) {
    if (/^[a-zA-Z][\w]*:/.test(line)) break;
    const trimmed = line.trim();
    if (trimmed.startsWith('- ')) {
      values.push(trimmed.slice(2).trim().replace(/^['"]|['"]$/g, ''));
    }
  }

  return values;
}

function findCanonicalWords(id: string): string[] {
  for (const dir of readdirSync(contentRoot, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    for (const entry of readdirSync(join(contentRoot, dir.name), { withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
      const filePath = join(contentRoot, dir.name, entry.name);
      const frontmatter = readFrontmatter(filePath);
      const idMatch = frontmatter.match(/^id:\s*(.+)$/m);
      const fileId = idMatch?.[1].trim().replace(/^['"]|['"]$/g, '');
      if (fileId === id) return readWords(frontmatter);
    }
  }
  throw new Error(`No content file found for Skill id "${id}"`);
}

describe('Skills Hub curated example words', () => {
  it('gives every one of the 41 curated Skills an example-word entry', () => {
    for (const id of CURATED_SPELLING_SKILL_IDS) {
      expect(SKILL_INDEX_EXAMPLE_WORDS[id], id).toBeDefined();
    }
    expect(Object.keys(SKILL_INDEX_EXAMPLE_WORDS)).toHaveLength(41);
  });

  it('keeps each Skill entry to 3 words, or 4 only where the extra word carries real signal', () => {
    for (const id of CURATED_SPELLING_SKILL_IDS) {
      const words = SKILL_INDEX_EXAMPLE_WORDS[id];
      expect(words.length, id).toBeGreaterThanOrEqual(3);
      expect(words.length, id).toBeLessThanOrEqual(4);
      expect(new Set(words).size, id).toBe(words.length);
    }
  });

  it('sources every example word from that Skill\'s own canonical word list', () => {
    for (const id of CURATED_SPELLING_SKILL_IDS) {
      const canonicalWords = findCanonicalWords(id);
      for (const word of SKILL_INDEX_EXAMPLE_WORDS[id]) {
        expect(canonicalWords, `${id}: "${word}"`).toContain(word);
      }
    }
  });

  it('only clarifies Skills where a curated entry is present, all keyed to real Skill ids', () => {
    for (const id of Object.keys(SKILL_INDEX_CLARIFIERS)) {
      expect(CURATED_SPELLING_SKILL_IDS, id).toContain(id);
      expect(SKILL_INDEX_CLARIFIERS[id as keyof typeof SKILL_INDEX_CLARIFIERS]!.length).toBeLessThan(90);
    }
  });
});
