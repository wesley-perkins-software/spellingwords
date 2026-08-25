import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CORE_UNIT_SAMPLE_WORDS, HFW_SET_SAMPLE_WORDS } from './strandIndexSamples';
import { canonicalGradeRoutes, getCanonicalGradeRouteById } from './canonicalGradeRoutes';
import { FROZEN_HF_WORDS_CURRICULUM } from './hfWordsCurriculum';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');

function wordsById(): Map<string, Set<string>> {
  const result = new Map<string, Set<string>>();
  for (const relativePath of readdirSync(contentRoot, { recursive: true, encoding: 'utf8' })) {
    if (!relativePath.endsWith('.md')) continue;
    const source = readFileSync(join(contentRoot, relativePath), 'utf8');
    const id = source.match(/^id:\s*['"]?([^'"\n]+)['"]?$/m)?.[1];
    if (!id) continue;
    const block = source.match(/^words:\n([\s\S]*?)\n---/m)?.[1] ?? '';
    // Top-level "- <scalar>" entries only (skips "- word: ..." hint-object entries); strips one
    // matching pair of surrounding quotes without touching interior apostrophes (e.g. can't).
    const words = block
      .split('\n')
      .map((line) => line.match(/^ {2}- (.+)$/)?.[1])
      .filter((raw): raw is string => Boolean(raw) && !raw!.startsWith('word:'))
      .map((raw) => raw.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1').trim());
    result.set(id, new Set(words));
  }
  return result;
}

const coreIds = canonicalGradeRoutes.filter((r) => r.classification === 'core-spelling').map((r) => r.id);
const hfwIds = Object.values(FROZEN_HF_WORDS_CURRICULUM).flat().map((set) => set.id);

describe('Core unit sample-word editorial data', () => {
  it('has a sample entry for every canonical Core unit and no entry for a non-Core id', () => {
    expect(Object.keys(CORE_UNIT_SAMPLE_WORDS).sort()).toEqual([...coreIds].sort());
  });

  it('every sample has 2-3 words, no duplicates, all real members of that unit', () => {
    const byId = wordsById();
    for (const [id, samples] of Object.entries(CORE_UNIT_SAMPLE_WORDS)) {
      expect(samples.length).toBeGreaterThanOrEqual(2);
      expect(samples.length).toBeLessThanOrEqual(3);
      expect(new Set(samples).size).toBe(samples.length);
      const unitWords = byId.get(id);
      expect(unitWords, `${id} must resolve to a canonical spelling-lists entry`).toBeDefined();
      for (const word of samples) {
        expect(unitWords!.has(word), `"${word}" must be a real word in unit "${id}"`).toBe(true);
      }
    }
  });

  it('every configured Core sample id is classified core-spelling', () => {
    for (const id of Object.keys(CORE_UNIT_SAMPLE_WORDS)) {
      expect(getCanonicalGradeRouteById(id)?.classification).toBe('core-spelling');
    }
  });
});

describe('HFW set sample-word editorial data', () => {
  it('has a sample entry for every canonical HFW set and no entry for a non-HFW id', () => {
    expect(Object.keys(HFW_SET_SAMPLE_WORDS).sort()).toEqual([...hfwIds].sort());
  });

  it('every sample has 4-6 words, no duplicates, all real members of that exact set', () => {
    const setsById = new Map(
      Object.values(FROZEN_HF_WORDS_CURRICULUM)
        .flat()
        .map((set) => [set.id, new Set(set.words)]),
    );
    for (const [id, samples] of Object.entries(HFW_SET_SAMPLE_WORDS)) {
      expect(samples.length).toBeGreaterThanOrEqual(4);
      expect(samples.length).toBeLessThanOrEqual(6);
      expect(new Set(samples).size).toBe(samples.length);
      const setWords = setsById.get(id);
      expect(setWords, `${id} must resolve to a frozen HFW set`).toBeDefined();
      for (const word of samples) {
        expect(setWords!.has(word), `"${word}" must be a real word in HFW set "${id}"`).toBe(true);
      }
    }
  });
});
