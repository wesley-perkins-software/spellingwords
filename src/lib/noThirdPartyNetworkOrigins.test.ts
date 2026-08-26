import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Regression guard for the font self-hosting decision and the reviewed GA4
 * installation: scans page/component/style source for network origins and
 * script signatures that must never appear outside the one approved
 * analytics component, so a future change can't silently reintroduce a
 * Google Fonts network dependency or add a second/unreviewed analytics or
 * tag manager integration without anyone noticing.
 */

const SCAN_DIRS = ['src', 'public'];
const SCAN_EXTENSIONS = new Set(['.astro', '.css', '.ts', '.tsx', '.html']);
const EXCLUDED_DIRS = new Set(['node_modules', 'dist', '.git']);

// The reviewed locations allowed to call gtag() directly: the canonical
// inline page-view snippet, and the typed custom-event module that wraps it
// (see src/lib/analytics/events.ts's module doc — no other file may call
// gtag() or accept an arbitrary event/parameter dictionary). Only the inline
// snippet may reference the GA4 loader origin itself.
const APPROVED_ANALYTICS_FILES = new Set([
  path.join('src', 'components', 'GoogleAnalytics.astro'),
  path.join('src', 'lib', 'analytics', 'events.ts'),
]);
const APPROVED_GA_LOADER_FILES = new Set([path.join('src', 'components', 'GoogleAnalytics.astro')]);

// This guard file itself necessarily contains the forbidden strings as
// pattern/regex literals used to scan for them — exclude it from its own scan.
const SELF_PATH = path.join('src', 'lib', 'noThirdPartyNetworkOrigins.test.ts');

const FORBIDDEN_PATTERNS: { label: string; pattern: RegExp; exemptFiles?: Set<string> }[] = [
  { label: 'Google Fonts stylesheet origin', pattern: /fonts\.googleapis\.com/ },
  { label: 'Google Fonts file origin', pattern: /fonts\.gstatic\.com/ },
  { label: 'gtag.js loader', pattern: /googletagmanager\.com/, exemptFiles: APPROVED_GA_LOADER_FILES },
  { label: 'Google Analytics collect endpoint', pattern: /google-analytics\.com/ },
  { label: 'gtag() call', pattern: /\bgtag\s*\(/, exemptFiles: APPROVED_ANALYTICS_FILES },
  { label: 'Google Tag Manager container id', pattern: /GTM-[A-Z0-9]+/ },
];

// Includes *.test.ts (unlike the previous version of this guard) so the
// approved-file exemption and the "no duplicate GA install" check can also
// see the analytics test file and every .astro page/component.
function collectAllScannableFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    if (EXCLUDED_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectAllScannableFiles(fullPath));
    } else if (SCAN_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

const repoRoot = path.resolve(__dirname, '../..');
const filesToScan = SCAN_DIRS.flatMap((dir) =>
  collectAllScannableFiles(path.join(repoRoot, dir)),
).filter((file) => path.relative(repoRoot, file) !== SELF_PATH);

describe('no third-party network origins in source', () => {
  it('found at least the expected source files to scan', () => {
    // Guards against the scan silently checking zero files if paths ever move.
    expect(filesToScan.length).toBeGreaterThan(50);
  });

  for (const { label, pattern, exemptFiles } of FORBIDDEN_PATTERNS) {
    it(`contains no ${label} outside the approved analytics module`, () => {
      const offenders = filesToScan
        .filter((file) => pattern.test(readFileSync(file, 'utf-8')))
        .map((file) => path.relative(repoRoot, file))
        .filter((relativeFile) => !exemptFiles?.has(relativeFile));

      expect(offenders).toEqual([]);
    });
  }

  it('references the GA4 measurement id only in the approved analytics files', () => {
    const measurementIdPattern = /G-FZ9BG2KKBR/;
    const allowedFiles = new Set([
      path.join('src', 'lib', 'analytics', 'measurementId.ts'),
      ...APPROVED_ANALYTICS_FILES,
    ]);

    const offenders = filesToScan
      .filter((file) => measurementIdPattern.test(readFileSync(file, 'utf-8')))
      .map((file) => path.relative(repoRoot, file))
      .filter((relativeFile) => !allowedFiles.has(relativeFile));

    expect(offenders).toEqual([]);
  });

  it('installs the Google tag exactly once, via a single <GoogleAnalytics /> usage in Layout.astro', () => {
    const layoutPath = path.join(repoRoot, 'src', 'layouts', 'Layout.astro');
    const layoutSource = readFileSync(layoutPath, 'utf-8');

    const usages = layoutSource.match(/<GoogleAnalytics\s*\/?>/g) ?? [];
    expect(usages).toHaveLength(1);

    // No other page or component should render a second copy of the tag.
    // (The GoogleAnalytics.astro component's own definition, and the
    // analytics module's implementation/test files, legitimately reference
    // the name without it being a JSX-style usage.)
    const exemptFromUsageCheck = new Set([
      path.join('src', 'components', 'GoogleAnalytics.astro'),
      ...APPROVED_ANALYTICS_FILES,
    ]);
    const otherUsages = filesToScan
      .filter((file) => file !== layoutPath)
      .map((file) => path.relative(repoRoot, file))
      .filter((relativeFile) => !exemptFromUsageCheck.has(relativeFile))
      .filter((relativeFile) =>
        /<GoogleAnalytics\b/.test(readFileSync(path.join(repoRoot, relativeFile), 'utf-8')),
      );

    expect(otherUsages).toEqual([]);
  });
});
