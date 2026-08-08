import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { CANONICAL_GRADE_ROUTE_DEFS } from './canonicalGradeRoutes';
import { CURATED_SPELLING_SKILL_IDS } from './spellingSkills';

// Guardrail for the legacy-architecture removal: every published spelling-lists
// entry must now be a canonical Grade Unit or Skill id. No non-canonical
// ("retained") entries are allowed to exist in the collection at all — if one
// does, this test fails loudly instead of letting it quietly resurface a
// route through the (now-removed) legacy fallback.

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

describe('spelling-lists collection matches the canonical manifests exactly', () => {
  const publishedIds = allPublishedSpellingListIds();
  const gradeIds: Set<string> = new Set(CANONICAL_GRADE_ROUTE_DEFS.map(([id]) => id));
  const skillIds: Set<string> = new Set(CURATED_SPELLING_SKILL_IDS);

  it('has no overlap between the grade-curriculum and Skill manifests', () => {
    for (const id of gradeIds) {
      expect(skillIds.has(id), id).toBe(false);
    }
  });

  it('publishes every canonical grade-curriculum and Skill id', () => {
    for (const id of gradeIds) {
      expect(publishedIds.has(id), id).toBe(true);
    }
    for (const id of skillIds) {
      expect(publishedIds.has(id), id).toBe(true);
    }
  });

  it('publishes no id outside the canonical grade-curriculum and Skill manifests', () => {
    const nonCanonical = [...publishedIds].filter((id) => !gradeIds.has(id) && !skillIds.has(id));
    expect(nonCanonical.sort()).toEqual([]);
  });

  it('publishes exactly 146 spelling-lists entries (105 grade-curriculum + 41 Skill)', () => {
    expect(publishedIds.size).toBe(146);
  });
});
