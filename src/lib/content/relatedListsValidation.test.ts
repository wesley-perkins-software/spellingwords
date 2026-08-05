import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// §3c of the Canonical Navigation Relationships review: relatedLists (Explore
// More) reference resolution and the deprecated/legacy-id exclusion rule.
// Review First / Next Step reference resolution is guaranteed by construction
// (navigationSequence.test.ts) since they're derived from the two sequence
// arrays rather than authored per-page.

function readFrontmatter(filePath: string): string {
  const source = readFileSync(filePath, 'utf8');
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`Missing frontmatter in ${filePath}`);
  return match[1];
}

function readScalar(frontmatter: string, key: string): string | undefined {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return match?.[1].trim().replace(/^['"]|['"]$/g, '');
}

/** Reads a YAML array value in either inline (`key: [...]`) or block (`key:\n  - item`) form. */
function readArray(frontmatter: string, key: string): string[] {
  const match = frontmatter.match(new RegExp(`^${key}:([^\\n]*)(\\n((?:[ \\t]+-.*\\n?)*))?`, 'm'));
  if (!match) return [];

  const inline = match[1].trim();
  if (inline.startsWith('[')) {
    const inner = inline.slice(1, inline.lastIndexOf(']'));
    return inner
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }

  const block = match[3] ?? '';
  return block
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim().replace(/^['"]|['"]$/g, ''));
}

type FrontmatterSummary = { id: string; status: string; relatedLists: string[]; filePath: string };

function allContent(): FrontmatterSummary[] {
  const root = join(process.cwd(), 'src/content/spelling-lists');
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((dir) =>
      readdirSync(join(root, dir.name), { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
        .map((entry) => join(root, dir.name, entry.name)),
    )
    .map((filePath) => {
      const frontmatter = readFrontmatter(filePath);
      return {
        id: readScalar(frontmatter, 'id') ?? '',
        status: readScalar(frontmatter, 'status') ?? '',
        relatedLists: readArray(frontmatter, 'relatedLists'),
        filePath,
      };
    });
}

describe('relatedLists reference resolution', () => {
  const entries = allContent();
  const published = entries.filter((entry) => entry.status === 'published');
  const publishedIds = new Set(published.map((entry) => entry.id));

  it('resolves every relatedLists id, on every published entry, to a real published entry', () => {
    const unresolved: string[] = [];
    for (const entry of published) {
      for (const relatedId of entry.relatedLists) {
        if (!publishedIds.has(relatedId)) {
          unresolved.push(`${entry.id} -> ${relatedId}`);
        }
      }
    }
    expect(unresolved).toEqual([]);
  });
});

describe('relatedLists never references a deprecated/legacy page', () => {
  it('never references the named archived example, silent-e-long-e', () => {
    const entries = allContent().filter((entry) => entry.status === 'published');
    for (const entry of entries) {
      expect(entry.relatedLists, entry.id).not.toContain('silent-e-long-e');
    }
  });
});
