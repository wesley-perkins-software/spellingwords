import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  TRAILING_SLASH,
  canonicalSkillRoutes,
  getCanonicalSkillPathById,
  isCanonicalSkillId,
  SKILLS_INDEX_PATH,
} from './canonicalSkillRoutes';
import { CURATED_SPELLING_SKILL_IDS } from './spellingSkills';

const repoRoot = process.cwd();

type Frontmatter = Record<string, string>;

function parseFrontmatter(filePath: string): Frontmatter {
  const text = fs.readFileSync(filePath, 'utf8');
  const match = /^---\n([\s\S]*?)\n---/.exec(text);
  if (!match) return {};
  const data: Frontmatter = {};
  for (const line of match[1].split('\n')) {
    if (!line.includes(':') || line.startsWith(' ')) continue;
    const [key, ...rest] = line.split(':');
    data[key.trim()] = rest.join(':').trim().replace(/^['"]|['"]$/g, '');
  }
  return data;
}

function spellingListFrontmatterById() {
  const base = path.join(repoRoot, 'src/content/spelling-lists');
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath);
    }
  };
  walk(base);
  const byId = new Map<string, Frontmatter>();
  for (const filePath of files) {
    const data = parseFrontmatter(filePath);
    if (data.id) byId.set(data.id, data);
  }
  return byId;
}

describe('canonical skill routes', () => {
  it('freezes the no-trailing-slash convention for every manifest path', () => {
    expect(TRAILING_SLASH).toBe('never');
    expect(SKILLS_INDEX_PATH).toBe('/skills');
    expect(SKILLS_INDEX_PATH).not.toMatch(/\/$/);
    for (const route of canonicalSkillRoutes) {
      expect(route.canonicalPath).not.toMatch(/\/$/);
      expect(route.canonicalPath).toBe(`/skills/${route.finalSlug}`);
    }
  });

  it('contains exactly the 41 curated Skill ids and no duplicates', () => {
    const manifestIds = new Set(canonicalSkillRoutes.map((route) => route.id));
    expect(manifestIds.size).toBe(41);
    expect([...manifestIds].sort()).toEqual([...CURATED_SPELLING_SKILL_IDS].sort());
  });

  it('has no duplicate final slug or canonical path', () => {
    const slugs = canonicalSkillRoutes.map((route) => route.finalSlug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const paths = canonicalSkillRoutes.map((route) => route.canonicalPath);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('maps only published spelling-list entries with contentRole skill', () => {
    const frontmatter = spellingListFrontmatterById();
    for (const route of canonicalSkillRoutes) {
      const data = frontmatter.get(route.id);
      expect(data, route.id).toBeDefined();
      expect(data?.status, route.id).toBe('published');
      expect(data?.contentRole, route.id).toBe('skill');
    }
  });

  it('does not include the two documented contentRole:skill legacy-role exceptions', () => {
    for (const id of ['grade-4-final-stable-syllables', 'grade-5-spelling-rules']) {
      expect(isCanonicalSkillId(id), id).toBe(false);
    }
  });

  it('leaves frontmatter urlSlug untouched for the 14 renamed ids (route-manifest-only change)', () => {
    const frontmatter = spellingListFrontmatterById();
    const renamed = [
      'digraph-ch-words',
      'digraph-sh-words',
      'digraph-th-words',
      'digraph-wh-words',
      'silent-e-long-a',
      'silent-e-long-i',
      'silent-e-long-o',
      'silent-e-long-u',
      'vowel-teams-ai-ay',
      'vowel-teams-ee-ea',
      'vowel-teams-oa-ow',
      'r-controlled-ar',
      'r-controlled-or',
      'r-controlled-er-ir-ur',
    ];
    for (const id of renamed) {
      expect(frontmatter.get(id)?.urlSlug, id).toBe(id);
    }
  });

  it('resolves the 14 approved renames to their new canonical path', () => {
    expect(getCanonicalSkillPathById('digraph-ch-words')).toBe('/skills/ch-digraph-words');
    expect(getCanonicalSkillPathById('digraph-sh-words')).toBe('/skills/sh-digraph-words');
    expect(getCanonicalSkillPathById('digraph-th-words')).toBe('/skills/th-digraph-words');
    expect(getCanonicalSkillPathById('digraph-wh-words')).toBe('/skills/wh-digraph-words');
    expect(getCanonicalSkillPathById('silent-e-long-a')).toBe('/skills/long-a-silent-e');
    expect(getCanonicalSkillPathById('silent-e-long-i')).toBe('/skills/long-i-silent-e');
    expect(getCanonicalSkillPathById('silent-e-long-o')).toBe('/skills/long-o-silent-e');
    expect(getCanonicalSkillPathById('silent-e-long-u')).toBe('/skills/long-u-silent-e');
    expect(getCanonicalSkillPathById('vowel-teams-ai-ay')).toBe('/skills/ai-ay-vowel-teams');
    expect(getCanonicalSkillPathById('vowel-teams-ee-ea')).toBe('/skills/ee-ea-vowel-teams');
    expect(getCanonicalSkillPathById('vowel-teams-oa-ow')).toBe('/skills/oa-ow-vowel-teams');
    // Explicit r-controlled- prefix retained (rejected the shorter ar-words/
    // or-words/er-ir-ur-words alternative — see PUBLIC_URL_ARCHITECTURE.md).
    expect(getCanonicalSkillPathById('r-controlled-ar')).toBe('/skills/r-controlled-ar-words');
    expect(getCanonicalSkillPathById('r-controlled-or')).toBe('/skills/r-controlled-or-words');
    expect(getCanonicalSkillPathById('r-controlled-er-ir-ur')).toBe(
      '/skills/r-controlled-er-ir-ur-words',
    );
  });

  it('leaves the other 27 Skill slugs unchanged from their id', () => {
    const renamed = new Set([
      'digraph-ch-words',
      'digraph-sh-words',
      'digraph-th-words',
      'digraph-wh-words',
      'silent-e-long-a',
      'silent-e-long-i',
      'silent-e-long-o',
      'silent-e-long-u',
      'vowel-teams-ai-ay',
      'vowel-teams-ee-ea',
      'vowel-teams-oa-ow',
      'r-controlled-ar',
      'r-controlled-or',
      'r-controlled-er-ir-ur',
    ]);
    for (const route of canonicalSkillRoutes) {
      if (renamed.has(route.id)) continue;
      expect(route.finalSlug, route.id).toBe(route.id);
    }
  });
});
