import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('./CustomWordEntry.astro', import.meta.url), 'utf8');

describe('CustomWordEntry', () => {
  it('surfaces the ordinary practice word limit only contextually, once a list actually exceeds it', () => {
    expect(source).toContain('This list is too long to practice at once. Shorten it to');
    // Never a blunt, always-visible "Maximum N words" style message.
    expect(source).not.toContain('Maximum ${MAX_WORD_COUNT} words');
  });

  it('surfaces the shared-link limit only contextually, with plain-language copy explaining local practice still works', () => {
    expect(source).toContain('Shared practice links support up to');
    expect(source).toContain('You can still practice the full list yourself above');
    // Never the raw technical encoder error message shown directly to the user.
    expect(source).not.toContain('shareLimitNote.textContent = result.message');
  });

  it('never implies a shared link is private or encrypted', () => {
    expect(source.toLowerCase()).not.toMatch(/\bencrypted\b/);
    expect(source.toLowerCase()).not.toMatch(/\bprivate\b/);
  });

  it('uses a privacy-neutral placeholder for the optional share title, never a personal name', () => {
    expect(source).toContain('placeholder="Week 4 Spelling"');
    expect(source.toLowerCase()).not.toMatch(/mrs\.|mr\.|ms\./);
  });

  it('renders the shared word list as a scannable grid, not one rounded pill per word', () => {
    expect(source).toContain('grid grid-cols-2');
    expect(source).not.toContain('flex flex-wrap gap-1.5');
    expect(source).not.toContain('buildSharedSpecimen');
  });

  it('keeps the shared-list secondary action label short', () => {
    expect(source).toContain('Edit this list');
    expect(source).not.toContain('Edit this list before practicing');
  });

  it('uses a readable, dark baseline for ordinary explanatory and validation text, not tiny gray helper copy', () => {
    expect(source).not.toContain('text-[0.88rem] text-da-ink-faint');
    expect(source).not.toContain('text-sm text-da-ink-faint');
  });
});
