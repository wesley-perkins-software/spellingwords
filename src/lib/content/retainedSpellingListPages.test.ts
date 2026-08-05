import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { CANONICAL_GRADE_ROUTE_DEFS } from './canonicalGradeRoutes';
import { CURATED_SPELLING_SKILL_IDS } from './spellingSkills';

// Proves that "everything not a grade-curriculum or Skill id" is a reviewed,
// named set (docs/content/inventory/retained-spelling-lists-pages.md), not an
// unexamined leftover. Computed entirely from live sources — no hardcoded
// literal id array duplicated here — so it can't silently drift: any new
// grade/Skill entry is picked up automatically via the real manifests, and
// any newly-added or removed spelling-lists entry changes the computed set,
// which must then be reflected in the inventory doc or this test fails.

const repoRoot = process.cwd();

function allPublishedSpellingListIds(): Set<string> {
  const base = path.join(repoRoot, 'src/content/spelling-lists');
  const ids = new Set<string>();
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }
      if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
      const text = fs.readFileSync(fullPath, 'utf8');
      const match = /^---\n([\s\S]*?)\n---/.exec(text);
      if (!match) continue;
      const idMatch = /^id:\s*(.+)$/m.exec(match[1]);
      const statusMatch = /^status:\s*(.+)$/m.exec(match[1]);
      const status = statusMatch?.[1]?.trim().replace(/^['"]|['"]$/g, '');
      const id = idMatch?.[1]?.trim().replace(/^['"]|['"]$/g, '');
      if (id && status === 'published') ids.add(id);
    }
  };
  walk(base);
  return ids;
}

function idsFromRetainedInventoryDoc(): Set<string> {
  const docPath = path.join(repoRoot, 'docs/content/inventory/retained-spelling-lists-pages.md');
  const text = fs.readFileSync(docPath, 'utf8');
  const ids = new Set<string>();
  for (const line of text.split('\n')) {
    if (line.startsWith('| id |') || /^\|---/.test(line)) continue;
    const match = /^\| ([a-z0-9-]+) \|/.exec(line);
    if (match) ids.add(match[1]);
  }
  return ids;
}

describe('retained /spelling-lists/{category}/{urlSlug} pages', () => {
  const publishedIds = allPublishedSpellingListIds();
  const gradeIds: Set<string> = new Set(CANONICAL_GRADE_ROUTE_DEFS.map(([id]) => id));
  const skillIds: Set<string> = new Set(CURATED_SPELLING_SKILL_IDS);
  const retainedIds = new Set(
    [...publishedIds].filter((id) => !gradeIds.has(id) && !skillIds.has(id)),
  );

  it('has no overlap between the grade-curriculum and Skill manifests', () => {
    for (const id of gradeIds) {
      expect(skillIds.has(id), id).toBe(false);
    }
  });

  it('accounts for exactly 104 grade-curriculum ids and 41 Skill ids against real content', () => {
    expect(gradeIds.size).toBe(104);
    expect(skillIds.size).toBe(41);
    for (const id of gradeIds) {
      expect(publishedIds.has(id), id).toBe(true);
    }
    for (const id of skillIds) {
      expect(publishedIds.has(id), id).toBe(true);
    }
  });

  it('computes the retained set (published − grade − Skill) as exactly the explicit reviewable inventory', () => {
    const inventoryIds = idsFromRetainedInventoryDoc();
    expect([...retainedIds].sort()).toEqual([...inventoryIds].sort());
  });

  it('keeps the retained set disjoint from both manifests', () => {
    for (const id of retainedIds) {
      expect(gradeIds.has(id), id).toBe(false);
      expect(skillIds.has(id), id).toBe(false);
    }
  });

  it('keeps the two documented contentRole:skill legacy-role exceptions retained, not promoted into the Skill manifest', () => {
    for (const id of ['grade-4-final-stable-syllables', 'grade-5-spelling-rules']) {
      expect(retainedIds.has(id), id).toBe(true);
      expect(skillIds.has(id), id).toBe(false);
    }
  });
});
