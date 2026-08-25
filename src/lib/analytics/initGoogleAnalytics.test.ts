import { describe, expect, it } from 'vitest';
import { initGoogleAnalytics } from './initGoogleAnalytics';

interface FakeScript {
  async: boolean;
  src: string;
}

function createFakeWindow(hostname: string, href: string): Window {
  const appended: FakeScript[] = [];
  const location = new URL(href);

  const fakeDocument = {
    head: {
      appendChild(script: FakeScript) {
        appended.push(script);
        return script;
      },
    },
    createElement(tag: string): FakeScript {
      if (tag !== 'script') throw new Error(`unexpected element: ${tag}`);
      return { async: false, src: '' };
    },
  };

  const fakeWindow = {
    location: { hostname, origin: location.origin, pathname: location.pathname },
    document: fakeDocument,
    // exposed for assertions
    __appendedScripts: appended,
  };

  return fakeWindow as unknown as Window;
}

function appendedScripts(win: Window): FakeScript[] {
  return (win as unknown as { __appendedScripts: FakeScript[] }).__appendedScripts;
}

function dataLayer(win: Window): unknown[] {
  return (win as unknown as { dataLayer: unknown[] }).dataLayer;
}

describe('initGoogleAnalytics', () => {
  it('does nothing on a non-production host', () => {
    const win = createFakeWindow('localhost', 'http://localhost:4321/play?session=canary');

    initGoogleAnalytics('G-FZ9BG2KKBR', win);

    expect(appendedScripts(win)).toEqual([]);
    expect((win as unknown as { gtag?: unknown }).gtag).toBeUndefined();
  });

  it('loads the gtag.js script exactly once and configs with a sanitized page_location', () => {
    const win = createFakeWindow(
      'spellingwords.app',
      'https://spellingwords.app/play?session=CanarySession123&list=CanaryPayload456',
    );

    initGoogleAnalytics('G-FZ9BG2KKBR', win);

    const scripts = appendedScripts(win);
    expect(scripts).toHaveLength(1);
    expect(scripts[0].src).toBe('https://www.googletagmanager.com/gtag/js?id=G-FZ9BG2KKBR');
    expect(scripts[0].async).toBe(true);

    const calls = dataLayer(win);
    expect(calls).toEqual([
      ['js', expect.any(Date)],
      ['config', 'G-FZ9BG2KKBR', { page_location: 'https://spellingwords.app/play' }],
    ]);

    const serialized = JSON.stringify(calls);
    expect(serialized).not.toContain('CanarySession123');
    expect(serialized).not.toContain('CanaryPayload456');
    expect(serialized).not.toContain('session');
  });

  it('is idempotent: calling it a second time appends no extra script and issues no extra calls', () => {
    const win = createFakeWindow('spellingwords.app', 'https://spellingwords.app/play');

    initGoogleAnalytics('G-FZ9BG2KKBR', win);
    initGoogleAnalytics('G-FZ9BG2KKBR', win);
    initGoogleAnalytics('G-FZ9BG2KKBR', win);

    expect(appendedScripts(win)).toHaveLength(1);
    expect(dataLayer(win)).toHaveLength(2);
  });
});
