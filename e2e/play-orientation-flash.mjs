#!/usr/bin/env node
// Regression check for the /play bare-URL orientation screen vs. a
// state-bearing (?session=/?list=) practice load.
//
// The orientation screen exists so a crawler visiting bare /play (no
// query string) sees real, meaningful content instead of an empty/error
// page — see src/pages/play.astro. Because this site builds fully static
// HTML (astro.config.mjs output: 'static'), the same play.html is served
// for every query string: there is no render-time request to branch on
// server-side. That content must therefore be visible by default in the
// static markup, which creates a real risk: without the synchronous
// pre-paint script + CSS rule in src/pages/play.astro, the orientation
// screen would flash on screen before the deferred module script swaps in
// the real practice UI, on every /play load — including valid sessions.
//
// This script drives a real browser (via the `playwright` package,
// already a devDependency) against the production build and checks the
// *computed* state of #screen-orientation at the earliest reliably
// instrumentable point (DOMContentLoaded, before the module script's own
// async work necessarily completes), not just the final DOM — a plain
// Vitest source check can't observe this, since the whole point is
// browser-timing behavior around first paint.
//
// Run with: npm run build && node e2e/play-orientation-flash.mjs
// (or: npm run test:e2e:play, which does both)

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const PORT = 4331;
const BASE = `http://localhost:${PORT}`;

function encodeWordListPayload(words) {
  // Mirrors src/lib/words/serialization.ts's encodeWordList format
  // ("<version>.<base64url>") closely enough to exercise the real
  // ?list= transport used by curated Core/HFW/Themed/Skill pages,
  // without importing the TS module from this plain Node script.
  const bytes = Buffer.from(words.join('\n'), 'utf8');
  const base64url = bytes
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return `1.${base64url}`;
}

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`${BASE}/play`);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await delay(250);
  }
  throw new Error(`Preview server did not become ready on ${BASE}`);
}

async function main() {
  const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], {
    cwd: new URL('..', import.meta.url).pathname,
    stdio: 'ignore',
  });

  let failures = 0;
  function check(label, condition) {
    console.log(`${condition ? 'PASS' : 'FAIL'} — ${label}`);
    if (!condition) failures++;
  }

  try {
    await waitForServer();

    // Most environments resolve Chromium via Playwright's normal browser
    // install (`npx playwright install chromium`). Some sandboxed dev
    // environments instead pin a pre-installed browser at a fixed path and
    // disable that install step — set PLAYWRIGHT_CHROMIUM_PATH there.
    const browser = await chromium.launch(
      process.env.PLAYWRIGHT_CHROMIUM_PATH
        ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
        : {},
    );

    // 1. Bare /play, JS enabled — the orientation screen is the crawlable
    //    canonical content and must be visible with no query string.
    {
      const page = await browser.newPage();
      await page.goto(`${BASE}/play`);
      const htmlClass = await page.evaluate(() => document.documentElement.className);
      const orientationDisplay = await page.evaluate(
        () => getComputedStyle(document.getElementById('screen-orientation')).display,
      );
      check('bare /play: no sw-play-has-state class', !htmlClass.includes('sw-play-has-state'));
      check('bare /play: orientation visible', orientationDisplay !== 'none');
      await page.close();
    }

    // 2. Bare /play with JS disabled — simulates a crawler/no-JS visitor;
    //    orientation content must not depend on JS running at all.
    {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();
      await page.goto(`${BASE}/play`);
      const orientationDisplay = await page.evaluate(
        () => getComputedStyle(document.getElementById('screen-orientation')).display,
      );
      check('bare /play, JS disabled: orientation visible', orientationDisplay !== 'none');
      await context.close();
    }

    // 3. /play?session=<valid> — the orientation screen must already be
    //    hidden by DOMContentLoaded, i.e. before the module script's own
    //    init() has necessarily finished, not merely by the time the test
    //    happens to check afterwards.
    {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.addInitScript(() => {
        sessionStorage.setItem('sw:session-words:e2e-valid', JSON.stringify(['cat', 'dog']));
      });
      let atDomContentLoaded = null;
      await page.exposeFunction('__reportOrientationDisplay', (value) => {
        atDomContentLoaded = value;
      });
      await page.addInitScript(() => {
        document.addEventListener('DOMContentLoaded', () => {
          const el = document.getElementById('screen-orientation');
          window.__reportOrientationDisplay(el ? getComputedStyle(el).display : 'missing');
        });
      });
      await page.goto(`${BASE}/play?session=e2e-valid`);
      await delay(100);

      const htmlClass = await page.evaluate(() => document.documentElement.className);
      const beginDisplay = await page.evaluate(
        () => getComputedStyle(document.getElementById('screen-begin')).display,
      );
      check('valid session: sw-play-has-state class added', htmlClass.includes('sw-play-has-state'));
      check(
        'valid session: orientation already hidden at DOMContentLoaded (no flash)',
        atDomContentLoaded === 'none',
      );
      check('valid session: real practice screen shown after init', beginDisplay !== 'none');
      await context.close();
    }

    // 4. /play?list=<valid payload> — the curated-list transport (Core
    //    Grade Unit / HFW / Themed / Skill practice pages).
    {
      const context = await browser.newContext();
      const page = await context.newPage();
      const payload = encodeWordListPayload(['cat', 'dog', 'bird']);
      await page.goto(`${BASE}/play?list=${payload}`);
      await delay(100);
      const orientationDisplay = await page.evaluate(
        () => getComputedStyle(document.getElementById('screen-orientation')).display,
      );
      const beginDisplay = await page.evaluate(
        () => getComputedStyle(document.getElementById('screen-begin')).display,
      );
      check('valid list payload: orientation stays hidden', orientationDisplay === 'none');
      check('valid list payload: real practice screen shown', beginDisplay !== 'none');
      await context.close();
    }

    // 5. Invalid/expired ?session= and malformed ?list= — existing error
    //    behavior must be preserved, and the orientation screen must still
    //    never flash (the query key alone is enough to suppress it).
    {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(`${BASE}/play?session=does-not-exist`);
      await delay(100);
      const orientationDisplay = await page.evaluate(
        () => getComputedStyle(document.getElementById('screen-orientation')).display,
      );
      const errorDisplay = await page.evaluate(
        () => getComputedStyle(document.getElementById('screen-error')).display,
      );
      check('expired session: orientation stays hidden', orientationDisplay === 'none');
      check('expired session: error screen shown', errorDisplay !== 'none');
      await context.close();
    }
    {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(`${BASE}/play?list=not-a-valid-payload`);
      await delay(100);
      const orientationDisplay = await page.evaluate(
        () => getComputedStyle(document.getElementById('screen-orientation')).display,
      );
      const errorDisplay = await page.evaluate(
        () => getComputedStyle(document.getElementById('screen-error')).display,
      );
      check('malformed list: orientation stays hidden', orientationDisplay === 'none');
      check('malformed list: error screen shown', errorDisplay !== 'none');
      await context.close();
    }

    await browser.close();
  } finally {
    server.kill();
  }

  if (failures > 0) {
    console.error(`\n${failures} check(s) failed.`);
    process.exit(1);
  }
  console.log('\nAll play-orientation-flash checks passed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
