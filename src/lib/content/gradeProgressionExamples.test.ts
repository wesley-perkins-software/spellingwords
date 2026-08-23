import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { gradeConfig } from './gradeConfig';
import { getCanonicalGradeRouteById } from './canonicalGradeRoutes';
import { gradeProgressionExamples } from './gradeProgressionExamples';

const CONTENT_ROOT = join(process.cwd(), 'src/content/spelling-lists');

/** Parses the minimal bits of frontmatter this test needs from a spelling-list markdown file. */
function readListFrontmatter(filePath: string): { id: string; grade: string; words: string[] } {
  const raw = readFileSync(filePath, 'utf8');
  const frontmatter = raw.split('---')[1] ?? '';
  const id = /^id:\s*['"]?([^'"\n]+)['"]?\s*$/m.exec(frontmatter)?.[1];
  const grade = /^grade:\s*['"]?([^'"\n]+)['"]?\s*$/m.exec(frontmatter)?.[1];
  const wordsBlockMatch = /^words:\n((?:\s*-\s*.+\n?)+)/m.exec(frontmatter);
  const words = (wordsBlockMatch?.[1] ?? '')
    .split('\n')
    .map((line) => /^\s*-\s*(.+)\s*$/.exec(line)?.[1])
    .filter((word): word is string => Boolean(word))
    .map((word) => word.replace(/^['"]|['"]$/g, ''));
  if (!id || !grade) {
    throw new Error(`Could not parse id/grade frontmatter from ${filePath}`);
  }
  return { id, grade, words };
}

function findListFileById(id: string): string {
  const categoryDirs = readdirSync(CONTENT_ROOT, { withFileTypes: true }).filter((e) => e.isDirectory());
  for (const dir of categoryDirs) {
    const dirPath = join(CONTENT_ROOT, dir.name);
    for (const file of readdirSync(dirPath)) {
      if (!file.endsWith('.md')) continue;
      const filePath = join(dirPath, file);
      const raw = readFileSync(filePath, 'utf8');
      if (new RegExp(`^id:\\s*['"]?${id}['"]?\\s*$`, 'm').test(raw.split('---')[1] ?? '')) {
        return filePath;
      }
    }
  }
  throw new Error(`No spelling-list content file found with id "${id}"`);
}

describe('/grades progression page representative-word examples', () => {
  for (const { grade, label } of gradeConfig) {
    const example = gradeProgressionExamples[grade];

    it(`${label}: has exactly 3 representative words`, () => {
      expect(example.words).toHaveLength(3);
    });

    it(`${label}: source list belongs to this grade's Core Spelling strand`, () => {
      const route = getCanonicalGradeRouteById(example.sourceListId);
      expect(route, `"${example.sourceListId}" must resolve to a canonical route`).toBeDefined();
      expect(route?.grade).toBe(grade);
      expect(route?.classification).toBe('core-spelling');
    });

    it(`${label}: every representative word is a real word in that source list's frontmatter`, () => {
      const filePath = findListFileById(example.sourceListId);
      const { id, grade: fileGrade, words } = readListFrontmatter(filePath);
      expect(id).toBe(example.sourceListId);
      expect(fileGrade).toBe(grade);
      for (const word of example.words) {
        expect(words, `"${word}" must appear in ${example.sourceListId}'s words list`).toContain(word);
      }
    });
  }

  it('no representative word set is accidentally duplicated across two different grades', () => {
    const wordSets = gradeConfig.map(({ grade }) => gradeProgressionExamples[grade].words.join('|'));
    expect(new Set(wordSets).size).toBe(wordSets.length);
  });
});
