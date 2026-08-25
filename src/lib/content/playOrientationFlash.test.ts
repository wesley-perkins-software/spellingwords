import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Source-level guard for the bare-/play orientation screen vs. a
// state-bearing (?session=/?list=) practice load — see the browser-level
// check in e2e/play-orientation-flash.mjs (npm run test:e2e:play) for the
// actual first-paint behavior this architecture depends on. This test
// can't observe browser timing, but it can stop a future edit from
// silently breaking the mechanism: this site is static (output: 'static'
// in astro.config.mjs), so play.html is identical for every query string,
// and the orientation screen must be visible by default in that static
// markup for bare /play to stay crawlable. The only way to avoid it
// flashing on a state-bearing load is a synchronous, pre-paint <head>
// script + a plain CSS rule — never a timer-based swap.
const playSource = readFileSync(join(process.cwd(), 'src/pages/play.astro'), 'utf8');
const layoutSource = readFileSync(join(process.cwd(), 'src/layouts/Layout.astro'), 'utf8');

describe('/play orientation screen — no flash on a state-bearing load', () => {
  it('Layout provides a head slot for early, pre-paint content', () => {
    expect(layoutSource).toMatch(/<slot name="head" \/>/);
    // The head slot must be inside <head>, before </head>.
    const headSection = layoutSource.slice(0, layoutSource.indexOf('</head>'));
    expect(headSection).toContain('<slot name="head" />');
  });

  it('the orientation screen is visible by default in static markup (bare /play stays crawlable)', () => {
    const orientationSection = playSource.match(
      /<section\s+id="screen-orientation"[\s\S]*?aria-labelledby="orientation-heading"[\s>]/,
    );
    expect(orientationSection).not.toBeNull();
    expect(orientationSection![0]).not.toMatch(/class="[^"]*\bhidden\b/);
  });

  it('detects a state-bearing URL synchronously, in <head>, before <body> is parsed', () => {
    // The early-detection script must be placed in the head slot, not the
    // deferred module script at the bottom of the page (which runs too
    // late to prevent a first-paint flash).
    const headFragmentMatch = playSource.match(
      /<Fragment slot="head">([\s\S]*?)<\/Fragment>/,
    );
    expect(headFragmentMatch).not.toBeNull();
    const headFragment = headFragmentMatch![1];

    // Must be a synchronous inline script (is:inline — never a module,
    // which Astro defers by default and which would arrive after paint).
    expect(headFragment).toMatch(/<script\s+is:inline>/);
    expect(headFragment).not.toContain('type="module"');

    // Must check both transports used to reach /play (session/list) via
    // URLSearchParams against the real query string, not a substring hack.
    expect(headFragment).toContain('new URLSearchParams(window.location.search)');
    expect(headFragment).toMatch(/params\.has\(['"]session['"]\)/);
    expect(headFragment).toMatch(/params\.has\(['"]list['"]\)/);

    // Must not use any timer-based approach to hide/swap content.
    expect(headFragment).not.toMatch(/setTimeout|setInterval|requestAnimationFrame/);
  });

  it('hides the orientation screen via a plain, synchronous CSS rule keyed off the same state class', () => {
    const styleMatch = playSource.match(/<style>([\s\S]*?)<\/style>/);
    expect(styleMatch).not.toBeNull();
    const style = styleMatch![1];

    expect(style).toMatch(/html\.sw-play-has-state\)?\s*#screen-orientation\s*\{/);
    expect(style).toMatch(/display:\s*none/);

    // The class name used by the script and the CSS rule must match.
    const headFragment = playSource.match(/<Fragment slot="head">([\s\S]*?)<\/Fragment>/)![1];
    expect(headFragment).toContain('sw-play-has-state');
    expect(style).toContain('sw-play-has-state');
  });

  it('never falls back to a timer, opacity transition, or other non-deterministic hide/swap anywhere in play.astro', () => {
    expect(playSource).not.toMatch(/setTimeout\(\s*\(\)\s*=>\s*(showScreen|screenOrientation)/);
    expect(playSource).not.toMatch(/opacity:\s*0/);
    expect(playSource).not.toMatch(/transition:\s*opacity/);
  });

  it('routes the truly-bare case (no session, no list) to the orientation screen, and only that case', () => {
    expect(playSource).toContain('showScreen(screenOrientation)');
    // showScreen(screenOrientation) must appear exactly once — in the
    // `else` branch reached only when neither transport is present — not
    // as a fallback for an invalid/expired session or malformed list,
    // which must keep using the existing error screen.
    expect(playSource.match(/showScreen\(screenOrientation\)/g)).toHaveLength(1);
  });
});
