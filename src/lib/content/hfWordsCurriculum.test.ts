import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { normalizeWord } from '@/lib/words';
import { getSentenceBankEntry } from '@/lib/sentenceBank/lookup';
import {
  FROZEN_HF_WORDS_CURRICULUM,
  HF_WORDS_SET_IDS_BY_GRADE,
  HF_WORDS_TOTAL_SET_COUNT,
  HF_WORDS_TOTAL_WORD_COUNT,
} from './hfWordsCurriculum';
import { canonicalGradeRoutes } from './canonicalGradeRoutes';
import {
  GRADE_1_HUB_SECTIONS,
  GRADE_2_HUB_SECTIONS,
  GRADE_3_HUB_SECTIONS,
  GRADE_4_HUB_SECTIONS,
  GRADE_5_HUB_SECTIONS,
  KINDERGARTEN_HUB_SECTIONS,
} from './gradeHubCards';
import { HF_WORDS_SEQUENCES } from './hfWordsSequence';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');

function contentFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? contentFiles(path) : entry.name.endsWith('.md') ? [path] : [];
  });
}

function frontmatter(path: string): string {
  return readFileSync(path, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
}

function field(source: string, name: string): string | undefined {
  return source.match(new RegExp(`^${name}:\\s*["']?([^\\n"']+)`, 'm'))?.[1]?.trim();
}

function wordsIn(source: string): string[] {
  const block = source.match(/^words:\n([\s\S]*)$/m)?.[1] ?? '';
  return [...block.matchAll(/^\s{2}-\s+(?:word:\s+)?(?:"([^"]+)"|'([^']+)'|([^\n]+))\s*$/gm)].map(
    (match) => (match[1] ?? match[2] ?? match[3]).trim(),
  );
}

const hubsByGrade = {
  K: KINDERGARTEN_HUB_SECTIONS,
  '1': GRADE_1_HUB_SECTIONS,
  '2': GRADE_2_HUB_SECTIONS,
  '3': GRADE_3_HUB_SECTIONS,
  '4': GRADE_4_HUB_SECTIONS,
  '5': GRADE_5_HUB_SECTIONS,
} as const;

const expectedSetCounts = { K: 4, '1': 7, '2': 7, '3': 5, '4': 2, '5': 2 };
const expectedWordCounts = { K: 40, '1': 84, '2': 84, '3': 60, '4': 24, '5': 24 };

const allFrozenSets = Object.values(FROZEN_HF_WORDS_CURRICULUM).flat();
const allFrozenWords = allFrozenSets.flatMap((set) => set.words);

describe('frozen High-Frequency Words curriculum', () => {
  it('contains exactly 27 sets and 316 unique normalized spellings in the approved grade distribution', () => {
    expect(HF_WORDS_TOTAL_SET_COUNT).toBe(27);
    expect(HF_WORDS_TOTAL_WORD_COUNT).toBe(316);
    expect(Object.fromEntries(Object.entries(FROZEN_HF_WORDS_CURRICULUM).map(([grade, sets]) => [grade, sets.length]))).toEqual(
      expectedSetCounts,
    );
    expect(
      Object.fromEntries(
        Object.entries(FROZEN_HF_WORDS_CURRICULUM).map(([grade, sets]) => [
          grade,
          sets.reduce((total, set) => total + set.words.length, 0),
        ]),
      ),
    ).toEqual(expectedWordCounts);
    expect(new Set(allFrozenWords.map((word) => normalizeWord(word, { lowercase: true }))).size).toBe(316);
  });

  it('keeps ten words in each Kindergarten set and twelve in every other set', () => {
    for (const [grade, sets] of Object.entries(FROZEN_HF_WORDS_CURRICULUM)) {
      for (const set of sets) expect(set.words, set.id).toHaveLength(grade === 'K' ? 10 : 12);
    }
  });

  it("preserves the exact contraction punctuation and capitalization in Grade 3 Set 5", () => {
    expect(FROZEN_HF_WORDS_CURRICULUM['3'][4].words).toEqual([
      'remember', 'instead', 'while', 'weather', 'study', 'certain', 'during', 'such', 'money', "I'm", "it's", "don't",
    ]);
  });

  it('matches every published HFW Markdown file exactly and has no extra files', () => {
    const paths = contentFiles(join(contentRoot, 'high-frequency-words'));
    const byId = new Map(paths.map((path) => [field(frontmatter(path), 'id'), { path, source: frontmatter(path) }]));
    expect([...byId.keys()].sort()).toEqual(allFrozenSets.map((set) => set.id).sort());

    for (const [grade, sets] of Object.entries(FROZEN_HF_WORDS_CURRICULUM)) {
      for (const set of sets) {
        const content = byId.get(set.id);
        expect(content, set.id).toBeDefined();
        expect(field(content!.source, 'grade')).toBe(grade);
        expect(field(content!.source, 'contentRole')).toBe('high-frequency-word-set');
        expect(field(content!.source, 'category')).toBe('high-frequency-words');
        expect(field(content!.source, 'status')).toBe('published');
        expect(wordsIn(content!.source), set.id).toEqual([...set.words]);
      }
    }
  });

  it('has sentence-bank coverage for every frozen HFW spelling', () => {
    const missing = allFrozenWords.filter((word) => !getSentenceBankEntry(word)).sort((a, b) => a.localeCompare(b));
    expect(missing).toEqual([]);
  });

  it('has exact content, route, Hub, and sequence parity', () => {
    const routeIds = canonicalGradeRoutes
      .filter((route) => route.classification === 'high-frequency-words')
      .map((route) => route.id);
    expect(routeIds.sort()).toEqual(allFrozenSets.map((set) => set.id).sort());
    expect(HF_WORDS_SEQUENCES).toEqual(HF_WORDS_SET_IDS_BY_GRADE);

    for (const [grade, expectedIds] of Object.entries(HF_WORDS_SET_IDS_BY_GRADE)) {
      const section = hubsByGrade[grade as keyof typeof hubsByGrade].find(({ title }) => title === 'High-Frequency Words');
      expect(section?.cards.map((card) => card.id)).toEqual(expectedIds);
      expect(section?.summary).toContain(`${expectedSetCounts[grade as keyof typeof expectedSetCounts]} sets`);
      expect(section?.summary).toContain(`${expectedWordCounts[grade as keyof typeof expectedWordCounts]} words`);
    }
  });

  it('publishes the new Set 7 routes and retires the four obsolete upper-grade routes', () => {
    const paths = new Set(canonicalGradeRoutes.map((route) => route.canonicalPath));
    expect(paths).toContain('/1st-grade/high-frequency-words/set-7');
    expect(paths).toContain('/2nd-grade/high-frequency-words/set-7');
    for (const path of [
      '/4th-grade/high-frequency-words-3', '/4th-grade/high-frequency-words-4',
      '/5th-grade/high-frequency-words-3', '/5th-grade/high-frequency-words-4',
    ]) expect(paths).not.toContain(path);
  });

  it('permits the reviewed Core and Themed Spelling Practice overlaps', () => {
    const hfw = new Set(allFrozenWords.map((word) => normalizeWord(word, { lowercase: true })));
    const overlaps = { core: new Set<string>(), themed: new Set<string>() };
    const classificationById = new Map(canonicalGradeRoutes.map((route) => [route.id, route.classification]));
    for (const path of contentFiles(contentRoot)) {
      const source = frontmatter(path);
      const classification = classificationById.get(field(source, 'id') ?? '');
      if (classification !== 'core-spelling' && classification !== 'themed-spelling-practice') continue;
      for (const word of wordsIn(source)) {
        const normalized = normalizeWord(word, { lowercase: true });
        if (hfw.has(normalized)) overlaps[classification === 'core-spelling' ? 'core' : 'themed'].add(normalized);
      }
    }
    expect(overlaps.core.size).toBe(75);
    expect([...overlaps.themed].sort()).toEqual(['family', 'interest', 'one', 'three', 'two', 'white']);
    for (const word of ['big', "don't", "i'm", "it's", 'information']) expect(overlaps.core).toContain(word);
  });
});
