import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  COMMON_WORDS_GATEWAY_REDIRECTS,
  TRAILING_SLASH,
  canonicalGradeRoutes,
  getCanonicalListPathById,
  getGradeHubPath,
} from './canonicalGradeRoutes';
import { gradeConfig } from './gradeConfig';
import {
  GRADE_1_HUB_SECTIONS,
  GRADE_2_HUB_SECTIONS,
  GRADE_3_HUB_SECTIONS,
  GRADE_4_HUB_SECTIONS,
  GRADE_5_HUB_SECTIONS,
  KINDERGARTEN_HUB_SECTIONS,
} from './gradeHubCards';

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
  const byId = new Map<string, Frontmatter & { filePath: string }>();
  for (const filePath of files) {
    const data = parseFrontmatter(filePath);
    if (data.id) byId.set(data.id, { ...data, filePath });
  }
  return byId;
}

const curatedSectionsByGrade = {
  K: KINDERGARTEN_HUB_SECTIONS,
  '1': GRADE_1_HUB_SECTIONS,
  '2': GRADE_2_HUB_SECTIONS,
  '3': GRADE_3_HUB_SECTIONS,
  '4': GRADE_4_HUB_SECTIONS,
  '5': GRADE_5_HUB_SECTIONS,
} as const;

describe('canonical grade routes', () => {
  it('freezes the no-trailing-slash convention for every manifest path', () => {
    expect(TRAILING_SLASH).toBe('never');
    for (const route of canonicalGradeRoutes) {
      expect(route.canonicalPath).not.toMatch(/\/$/);
      expect(route.canonicalPath).toBe(`/${route.gradeSlug}/${route.finalSlug}`);
    }
    for (const grade of gradeConfig) {
      expect(getGradeHubPath(grade.grade)).toBe(grade.hubHref);
      expect(grade.hubHref).not.toMatch(/\/$/);
    }
  });

  it('contains every canonical K-5 grade hub card and no duplicate canonical URL', () => {
    const manifestIds = new Set(canonicalGradeRoutes.map((route) => route.id));
    const cardIds = Object.values(curatedSectionsByGrade).flatMap((sections) =>
      sections.flatMap((section) => section.cards.filter((card) => card.kind === 'list').map((card) => card.id)),
    );
    expect([...manifestIds].sort()).toEqual([...cardIds].sort());
    expect(new Set(canonicalGradeRoutes.map((route) => route.canonicalPath)).size).toBe(canonicalGradeRoutes.length);
  });

  it('has no duplicate final slug within a grade', () => {
    for (const grade of gradeConfig) {
      const slugs = canonicalGradeRoutes.filter((route) => route.grade === grade.grade).map((route) => route.finalSlug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it('uses high-frequency-words-n for every canonical high-frequency set', () => {
    for (const route of canonicalGradeRoutes.filter((route) => route.classification === 'high-frequency-words')) {
      expect(route.finalSlug).toMatch(/^high-frequency-words-\d+$/);
      expect(route.canonicalPath).toContain(`/${route.gradeSlug}/high-frequency-words-`);
    }
  });

  it('resolves approved representative paths by stable content id', () => {
    expect(getCanonicalListPathById('kindergarten-first-words')).toBe('/kindergarten/first-words');
    expect(getCanonicalListPathById('kindergarten-short-a-words')).toBe('/kindergarten/short-a-words');
    expect(getCanonicalListPathById('grade-1-floss-rule')).toBe('/1st-grade/floss-rule');
    expect(getCanonicalListPathById('grade-1-common-words-1')).toBe('/1st-grade/high-frequency-words-1');
    expect(getCanonicalListPathById('grade-1-weather-words')).toBe('/1st-grade/weather-words');
  });

  it('maps only published spelling-list entries and records their historical URLs in netlify redirects', () => {
    const frontmatter = spellingListFrontmatterById();
    const netlify = fs.readFileSync(path.join(repoRoot, 'netlify.toml'), 'utf8');
    for (const route of canonicalGradeRoutes) {
      const data = frontmatter.get(route.id);
      expect(data, route.id).toBeDefined();
      expect(data?.status, route.id).toBe('published');
      const oldPath = `/spelling-lists/${data?.category}/${data?.urlSlug}`;
      expect(netlify).toContain(`from = "${oldPath}"\n  to = "${route.canonicalPath}"\n  status = 301`);
    }
  });

  it('redirects old grade hubs and removed Common Words gateways directly to grade hubs', () => {
    const netlify = fs.readFileSync(path.join(repoRoot, 'netlify.toml'), 'utf8');
    for (const grade of gradeConfig) {
      expect(netlify).toContain(`from = "/spelling-lists/${grade.slug}"\n  to = "${grade.hubHref}"\n  status = 301`);
    }
    for (const redirect of COMMON_WORDS_GATEWAY_REDIRECTS) {
      expect(netlify).toContain(`from = "${redirect.oldPath}"\n  to = "${redirect.newPath}"\n  status = 301`);
    }
  });

  it('keeps the human-readable migration map synchronized with the manifest', () => {
    const markdown = fs.readFileSync(path.join(repoRoot, 'docs/content/inventory/grade-url-migration-map.md'), 'utf8');
    for (const route of canonicalGradeRoutes) {
      expect(markdown).toContain(`| \`${route.id}\``);
      expect(markdown).toContain(`\`${route.canonicalPath}\``);
    }
    for (const redirect of COMMON_WORDS_GATEWAY_REDIRECTS) {
      expect(markdown).toContain(`| \`${redirect.id}\` | \`${redirect.oldPath}\` | \`${redirect.newPath}\``);
    }
  });
});
