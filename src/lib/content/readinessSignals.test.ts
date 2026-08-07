import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { describe, expect, it } from 'vitest';
import { canonicalGradeRoutes } from './canonicalGradeRoutes';
import { CORE_SPELLING_SEQUENCE } from './coreSpellingSequence';

// Structural regression coverage for the ReadinessSignals editorial pass.
// This intentionally does NOT try to keyword-match "mastery-sounding"
// phrases — whether a bullet describes readiness vs. mastery is an
// editorial judgment applied during the pass itself, not something a
// regex can determine reliably. These tests only guard the structural
// invariants: the right pages have the field, and it isn't corrupted.

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');

function readFrontmatter(filePath: string): Record<string, unknown> {
  const source = readFileSync(filePath, 'utf8');
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`Missing frontmatter in ${filePath}`);
  return parseYaml(match[1]) as Record<string, unknown>;
}

function findContentFileById(id: string): string {
  const categoryDirs = readdirSync(contentRoot, { withFileTypes: true }).filter((e) => e.isDirectory());
  for (const dir of categoryDirs) {
    const files = readdirSync(join(contentRoot, dir.name), { withFileTypes: true }).filter(
      (e) => e.isFile() && e.name.endsWith('.md'),
    );
    for (const file of files) {
      const filePath = join(contentRoot, dir.name, file.name);
      if (readFrontmatter(filePath).id === id) return filePath;
    }
  }
  throw new Error(`No content file found for id "${id}"`);
}

const coreSpellingIds = canonicalGradeRoutes
  .filter((route) => route.classification === 'core-spelling')
  .map((route) => route.id);

describe('Core Spelling readinessSignals structural coverage', () => {
  it('has exactly 51 canonical core-spelling routes', () => {
    expect(coreSpellingIds).toHaveLength(51);
  });

  it('CORE_SPELLING_SEQUENCE matches the core-spelling route population exactly', () => {
    expect(new Set(CORE_SPELLING_SEQUENCE)).toEqual(new Set(coreSpellingIds));
    expect(CORE_SPELLING_SEQUENCE).toHaveLength(51);
  });

  describe.each(coreSpellingIds)('%s', (id) => {
    const filePath = findContentFileById(id);
    const frontmatter = readFrontmatter(filePath);

    it('has a readinessSignals array', () => {
      expect(Array.isArray(frontmatter.readinessSignals)).toBe(true);
    });

    it('has at least one non-empty, trimmed readinessSignals bullet', () => {
      const signals = frontmatter.readinessSignals as unknown[];
      expect(signals.length).toBeGreaterThan(0);
      for (const signal of signals) {
        expect(typeof signal).toBe('string');
        const text = signal as string;
        expect(text.trim().length).toBeGreaterThan(0);
        expect(text).toBe(text.trim());
      }
    });

    it('has no duplicate bullets within the page', () => {
      const signals = frontmatter.readinessSignals as string[];
      const unique = new Set(signals.map((s) => s.toLowerCase()));
      expect(unique.size).toBe(signals.length);
    });
  });
});
