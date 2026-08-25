import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Every Grade Unit / HFW / Themed page renders its instructional Markdown
// body inside a section that already carries its own <h2> (see
// GradeUnitView.astro's "why-heading"). Subsections authored in the body
// must therefore start at h3 — an authored `##` would emit a second,
// competing <h2> and a broken document outline. See
// docs/content/CANONICAL_GRADE_UNIT_PAGE_STANDARD.md §11-12.

function bodyOf(filePath: string): string {
  const source = readFileSync(filePath, 'utf8');
  const match = source.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`Missing frontmatter in ${filePath}`);
  return match[1];
}

function allContentFiles(): string[] {
  const root = join(process.cwd(), 'src/content/spelling-lists');
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((dir) =>
      readdirSync(join(root, dir.name), { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
        .map((entry) => join(root, dir.name, entry.name)),
    );
}

describe('instructional Markdown bodies never start a subsection at h2', () => {
  const files = allContentFiles();

  it('contains no ## heading in any content body (subsections must be ### or deeper)', () => {
    const offenders: string[] = [];
    for (const filePath of files) {
      const body = bodyOf(filePath);
      if (/^## /m.test(body)) {
        offenders.push(filePath);
      }
    }
    expect(offenders).toEqual([]);
  });
});
