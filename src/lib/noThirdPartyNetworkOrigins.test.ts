import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Regression guard for the font self-hosting and analytics-off decisions:
 * scans page/component/style source for the network origins and script
 * signatures we deliberately removed or have never added, so a future
 * change can't silently reintroduce a Google Fonts network dependency or
 * wire up analytics without anyone noticing.
 */

const SCAN_DIRS = ['src', 'public'];
const SCAN_EXTENSIONS = new Set(['.astro', '.css', '.ts', '.tsx', '.html']);
const EXCLUDED_DIRS = new Set(['node_modules', 'dist', '.git']);

const FORBIDDEN_PATTERNS: { label: string; pattern: RegExp }[] = [
  { label: 'Google Fonts stylesheet origin', pattern: /fonts\.googleapis\.com/ },
  { label: 'Google Fonts file origin', pattern: /fonts\.gstatic\.com/ },
  { label: 'gtag.js loader', pattern: /googletagmanager\.com/ },
  { label: 'Google Analytics collect endpoint', pattern: /google-analytics\.com/ },
  { label: 'gtag() call', pattern: /\bgtag\s*\(/ },
];

function collectFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    if (EXCLUDED_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath));
    } else if (SCAN_EXTENSIONS.has(path.extname(entry.name)) && !entry.name.endsWith('.test.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

const repoRoot = path.resolve(__dirname, '../..');
const filesToScan = SCAN_DIRS.flatMap((dir) => collectFiles(path.join(repoRoot, dir)));

describe('no third-party network origins in source', () => {
  it('found at least the expected source files to scan', () => {
    // Guards against the scan silently checking zero files if paths ever move.
    expect(filesToScan.length).toBeGreaterThan(50);
  });

  for (const { label, pattern } of FORBIDDEN_PATTERNS) {
    it(`contains no ${label}`, () => {
      const offenders = filesToScan
        .filter((file) => pattern.test(readFileSync(file, 'utf-8')))
        .map((file) => path.relative(repoRoot, file));

      expect(offenders).toEqual([]);
    });
  }
});
