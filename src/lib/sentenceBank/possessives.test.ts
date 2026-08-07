import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getSentenceBankEntry } from './lookup';

// Regression coverage for the Grade 3 Possessive Words practice-fairness fix:
// the five regular singular/plural pairs (dog's/dogs', etc.) are pronounced
// identically, and the sixth pair (child's/children's) is an irregular plural
// that must not be taught as a simple apostrophe-position shortcut. The
// practice engine can only distinguish these fairly when each word resolves
// to its own contextual sentence. See PR "Fix Grade 3 possessive practice
// context".

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');
const POSSESSIVES_LIST_ID = 'grade-3-possessives';

function readFrontmatter(filePath: string): string {
  const source = readFileSync(filePath, 'utf8');
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`Missing frontmatter in ${filePath}`);
  return match[1];
}

// Strips a matched pair of wrapping YAML quotes (e.g. 'grade-3' -> grade-3),
// but leaves an unwrapped value alone even when it ends in an apostrophe that
// is part of the value itself (e.g. dogs' must stay dogs', not become dogs).
function stripWrappingQuotes(value: string): string {
  const match = value.match(/^(['"])([\s\S]*)\1$/);
  return match ? match[2] : value;
}

function readScalar(frontmatter: string, key: string): string | undefined {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return match ? stripWrappingQuotes(match[1].trim()) : undefined;
}

function readArray(frontmatter: string, key: string): string[] {
  const lines = frontmatter.split('\n');
  const keyIndex = lines.findIndex((line) => line.startsWith(`${key}:`));
  if (keyIndex === -1) return [];

  const keyLine = lines[keyIndex];
  const inline = keyLine.match(new RegExp(`^${key}:\\s*\\[(.*)\\]$`));
  if (inline) {
    return inline[1]
      .split(',')
      .map((item) => stripWrappingQuotes(item.trim()))
      .filter(Boolean);
  }

  const values: string[] = [];
  for (const line of lines.slice(keyIndex + 1)) {
    if (/^[a-zA-Z][\w]*:/.test(line)) break;
    const trimmed = line.trim();
    if (trimmed.startsWith('- ')) {
      values.push(stripWrappingQuotes(trimmed.slice(2).trim()));
    }
  }
  return values;
}

function findContentFileById(id: string): string {
  const categoryDirs = readdirSync(contentRoot, { withFileTypes: true }).filter((e) => e.isDirectory());
  for (const dir of categoryDirs) {
    const files = readdirSync(join(contentRoot, dir.name), { withFileTypes: true }).filter(
      (e) => e.isFile() && e.name.endsWith('.md'),
    );
    for (const file of files) {
      const filePath = join(contentRoot, dir.name, file.name);
      if (readScalar(readFrontmatter(filePath), 'id') === id) return filePath;
    }
  }
  throw new Error(`No content file found for id "${id}"`);
}

const filePath = findContentFileById(POSSESSIVES_LIST_ID);
const frontmatter = readFrontmatter(filePath);
const words = readArray(frontmatter, 'words');

// The five "regular" pairs: singular 's vs. a plural that already ends in s,
// so the plural possessive is just that final s plus an apostrophe.
const REGULAR_MATCHED_PAIRS: Array<[singular: string, plural: string]> = [
  ["dog's", "dogs'"],
  ["teacher's", "teachers'"],
  ["boy's", "boys'"],
  ["friend's", "friends'"],
  ["family's", "families'"],
];

// The sixth pair is deliberately irregular: "children" does not end in s, so
// its possessive takes 's just like the singular "child's" does. This pair
// protects the instructional distinction (singular vs. irregular plural),
// not an apostrophe-before-s vs. apostrophe-after-s contrast.
const IRREGULAR_PAIR: [singular: string, plural: string] = ["child's", "children's"];

const ALL_PAIRS = [...REGULAR_MATCHED_PAIRS, IRREGULAR_PAIR];

describe('Grade 3 Possessive Words practice context', () => {
  it('loads the frozen 12-word list from the canonical content source', () => {
    expect(words).toEqual([
      "dog's",
      "dogs'",
      "teacher's",
      "teachers'",
      "boy's",
      "boys'",
      "friend's",
      "friends'",
      "family's",
      "families'",
      "child's",
      "children's",
    ]);
  });

  it('no longer includes class\'s — replaced by the child\'s / children\'s irregular-plural pair', () => {
    expect(words).not.toContain("class's");
  });

  it('every one of the 12 frozen words resolves to a non-empty sentence-bank example sentence', () => {
    const missing = words.filter((word) => !getSentenceBankEntry(word)?.exampleSentence);
    expect(missing).toEqual([]);
  });

  it('has no skillIds set — Possessives has no canonical Skill relationship', () => {
    // Regression guard: example-sentence coverage must come from sentence-bank
    // data alone, not from adding skillIds as a workaround to surface sentences
    // on the static preview page. See the PR's product-owner decision.
    expect(readArray(frontmatter, 'skillIds')).toEqual([]);
  });

  it.each(ALL_PAIRS)(
    '"%s" and "%s" resolve independently and do not share a sentence',
    (singular, plural) => {
      const singularEntry = getSentenceBankEntry(singular);
      const pluralEntry = getSentenceBankEntry(plural);
      expect(singularEntry?.exampleSentence).toBeTruthy();
      expect(pluralEntry?.exampleSentence).toBeTruthy();
      expect(singularEntry?.exampleSentence).not.toBe(pluralEntry?.exampleSentence);
    },
  );

  it.each(ALL_PAIRS)(
    'sentence-bank lookup preserves the exact possessive spelling for "%s" vs "%s"',
    (singular, plural) => {
      // Proves apostrophe position is not collapsed by normalization: the
      // trailing-apostrophe plural must not resolve to the singular's entry.
      expect(getSentenceBankEntry(singular)?.word).toBe(singular);
      expect(getSentenceBankEntry(plural)?.word).toBe(plural);
      expect(getSentenceBankEntry(singular)).not.toBe(getSentenceBankEntry(plural));
    },
  );

  it('"children\'s" is an irregular plural, not just "child\'s" plus an apostrophe-after-s', () => {
    // Guards against the misleading "singular = 's, plural = '" shortcut:
    // "children" does not end in s, so its possessive is spelled the same
    // way as a singular ('s), not with a bare trailing apostrophe.
    expect(getSentenceBankEntry("children's")?.word.endsWith("'s")).toBe(true);
    expect(getSentenceBankEntry("children's")?.word.endsWith("s'")).toBe(false);
  });
});
