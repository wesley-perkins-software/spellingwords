import { afterEach, describe, expect, it, vi } from 'vitest';
import * as events from './events';
import {
  toPracticeSourceDim,
  toGradeDim,
  extractSkillIdFromHref,
  trackPracticeLaunch,
  trackCustomListReady,
  trackPracticeStart,
  trackPracticeRestart,
  trackPracticeReviewStart,
  trackAnswerSubmit,
  trackPracticeComplete,
  trackPracticeContinueNext,
  trackAudioRequest,
  trackSharedLinkCreate,
  trackShare,
  trackSharedListOpen,
  trackSharedListInvalid,
  trackPracticeInitFailure,
} from './events';

type GtagCall = [event: 'event', name: string, params: Record<string, unknown>];

function stubProductionWindow(): { calls: GtagCall[] } {
  const calls: GtagCall[] = [];
  const gtag = (...args: unknown[]) => {
    calls.push(args as GtagCall);
  };
  vi.stubGlobal('window', { location: { hostname: 'spellingwords.app' }, gtag });
  return { calls };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

// Reserved GA4 prefixes an event/parameter name must never start with.
const RESERVED_PREFIXES = ['google_', 'ga_', 'firebase_'];
const NAME_PATTERN = /^[a-z][a-z0-9_]{0,39}$/;

function expectValidEventName(name: string): void {
  expect(name.length).toBeLessThanOrEqual(40);
  expect(name).toMatch(NAME_PATTERN);
  for (const prefix of RESERVED_PREFIXES) {
    expect(name.startsWith(prefix)).toBe(false);
  }
}

describe('event naming', () => {
  it('every fired event name is a valid, non-reserved snake_case name <= 40 chars', () => {
    const { calls } = stubProductionWindow();

    trackPracticeLaunch({ practiceSource: 'core', grade: '3', listSize: 10 });
    trackCustomListReady({ listSize: 5 });
    trackPracticeStart({ practiceSource: 'core', grade: '3', runType: 'initial', listSize: 10 });
    trackPracticeRestart({ practiceSource: 'core', grade: '3' });
    trackPracticeReviewStart({ practiceSource: 'core', grade: '3' });
    trackAnswerSubmit({ practiceSource: 'core', grade: '3', runType: 'initial' });
    trackPracticeComplete({
      practiceSource: 'core',
      grade: '3',
      runType: 'initial',
      correctCount: 8,
      totalCount: 10,
    });
    trackPracticeContinueNext({ practiceSource: 'core', grade: '3', runType: 'initial' });
    trackAudioRequest({ audioType: 'word', practiceSource: 'core', grade: '3', runType: 'initial' });
    trackSharedLinkCreate();
    trackShare({ method: 'copy_link' });
    trackSharedListOpen({ listSize: 4 });
    trackSharedListInvalid({ reason: 'malformed' });
    trackPracticeInitFailure({ reason: 'session_not_found' });

    expect(calls.length).toBe(14);
    for (const [, name] of calls) {
      expectValidEventName(name);
    }
  });

  it('exposes no generic trackEvent(name, params) escape hatch', () => {
    expect('trackEvent' in events).toBe(false);
  });
});

describe('trackPracticeLaunch', () => {
  it('sends practice_launch with source/grade/list_size, omitting skill fields when not a skill session', () => {
    const { calls } = stubProductionWindow();
    trackPracticeLaunch({ practiceSource: 'core', grade: '3', listSize: 10 });

    expect(calls).toEqual([
      ['event', 'practice_launch', { practice_source: 'core', grade: '3', list_size: 10 }],
    ]);
  });

  it('resolves skill_id and skill_family together for a skill session', () => {
    const { calls } = stubProductionWindow();
    trackPracticeLaunch({ practiceSource: 'skill', skillId: 'silent-e-long-a', listSize: 8 });

    expect(calls).toEqual([
      [
        'event',
        'practice_launch',
        { practice_source: 'skill', skill_id: 'silent-e-long-a', skill_family: 'silent_e', list_size: 8 },
      ],
    ]);
  });

  it('omits grade entirely (no not_applicable sentinel) for a custom session', () => {
    const { calls } = stubProductionWindow();
    trackPracticeLaunch({ practiceSource: 'custom', listSize: 3 });

    const params = calls[0][2];
    expect(params).not.toHaveProperty('grade');
    expect(params).not.toHaveProperty('skill_id');
    expect(params).not.toHaveProperty('skill_family');
    expect(params).toEqual({ practice_source: 'custom', list_size: 3 });
  });

  it('ignores an unrecognized skillId rather than sending an unknown skill_family', () => {
    const { calls } = stubProductionWindow();
    trackPracticeLaunch({ practiceSource: 'skill', skillId: 'not-a-real-skill', listSize: 8 });

    expect(calls[0][2]).toEqual({ practice_source: 'skill', list_size: 8 });
  });
});

describe('trackPracticeStart / run_type', () => {
  it.each(['initial', 'review', 'retry'] as const)('carries run_type=%s through to the event', (runType) => {
    const { calls } = stubProductionWindow();
    trackPracticeStart({ practiceSource: 'core', grade: '3', runType, listSize: 10 });

    expect(calls[0]).toEqual([
      'event',
      'practice_start',
      { practice_source: 'core', grade: '3', run_type: runType, list_size: 10 },
    ]);
  });
});

describe('trackPracticeRestart / trackPracticeReviewStart', () => {
  it('practice_restart carries no run_type (it is the action, not the resulting run)', () => {
    const { calls } = stubProductionWindow();
    trackPracticeRestart({ practiceSource: 'core', grade: '3' });

    expect(calls).toEqual([['event', 'practice_restart', { practice_source: 'core', grade: '3' }]]);
  });

  it('practice_review_start carries no run_type either', () => {
    const { calls } = stubProductionWindow();
    trackPracticeReviewStart({ practiceSource: 'high_frequency', grade: '1' });

    expect(calls).toEqual([
      ['event', 'practice_review_start', { practice_source: 'high_frequency', grade: '1' }],
    ]);
  });
});

describe('trackAnswerSubmit', () => {
  it('carries run_type and no correctness data whatsoever', () => {
    const { calls } = stubProductionWindow();
    trackAnswerSubmit({ practiceSource: 'skill', skillId: 'homophones', runType: 'review' });

    expect(calls).toEqual([
      [
        'event',
        'answer_submit',
        {
          practice_source: 'skill',
          skill_id: 'homophones',
          skill_family: 'homophones_confused_words',
          run_type: 'review',
        },
      ],
    ]);
  });
});

describe('trackPracticeComplete', () => {
  it('sends only aggregate bounded counts, never per-answer data', () => {
    const { calls } = stubProductionWindow();
    trackPracticeComplete({
      practiceSource: 'custom',
      runType: 'retry',
      correctCount: 7,
      totalCount: 10,
    });

    expect(calls).toEqual([
      [
        'event',
        'practice_complete',
        { practice_source: 'custom', run_type: 'retry', correct_count: 7, total_count: 10 },
      ],
    ]);
  });
});

describe('trackAudioRequest', () => {
  it('distinguishes word vs. sentence and carries run_type', () => {
    const { calls } = stubProductionWindow();
    trackAudioRequest({ audioType: 'sentence', practiceSource: 'themed', grade: 'K', runType: 'initial' });

    expect(calls).toEqual([
      [
        'event',
        'audio_request',
        { audio_type: 'sentence', practice_source: 'themed', grade: 'K', run_type: 'initial' },
      ],
    ]);
  });
});

describe('sharing events', () => {
  it('shared_link_create carries zero parameters', () => {
    const { calls } = stubProductionWindow();
    trackSharedLinkCreate();
    expect(calls).toEqual([['event', 'shared_link_create', {}]]);
  });

  it('share is the recommended event, fixed content_type, closed method enum', () => {
    const { calls } = stubProductionWindow();
    trackShare({ method: 'web_share' });
    expect(calls).toEqual([
      ['event', 'share', { method: 'web_share', content_type: 'custom_word_list' }],
    ]);
  });

  it('shared_list_open/invalid carry only bounded/enum data', () => {
    const { calls } = stubProductionWindow();
    trackSharedListOpen({ listSize: 12 });
    trackSharedListInvalid({ reason: 'incompatible_version' });
    expect(calls).toEqual([
      ['event', 'shared_list_open', { list_size: 12 }],
      ['event', 'shared_list_invalid', { reason: 'incompatible_version' }],
    ]);
  });
});

describe('trackPracticeInitFailure', () => {
  it('carries only the closed reason enum', () => {
    const { calls } = stubProductionWindow();
    trackPracticeInitFailure({ reason: 'list_invalid' });
    expect(calls).toEqual([['event', 'practice_init_failure', { reason: 'list_invalid' }]]);
  });
});

describe('production-host gating', () => {
  it('no-ops on a non-production hostname', () => {
    const calls: GtagCall[] = [];
    vi.stubGlobal('window', {
      location: { hostname: 'localhost' },
      gtag: (...args: unknown[]) => calls.push(args as GtagCall),
    });

    trackPracticeStart({ practiceSource: 'core', runType: 'initial', listSize: 5 });
    expect(calls).toEqual([]);
  });

  it('no-ops on a Netlify preview hostname', () => {
    const calls: GtagCall[] = [];
    vi.stubGlobal('window', {
      location: { hostname: 'deploy-preview-123--spellingwords.netlify.app' },
      gtag: (...args: unknown[]) => calls.push(args as GtagCall),
    });

    trackShare({ method: 'copy_link' });
    expect(calls).toEqual([]);
  });

  it('does not throw when gtag is not yet defined on the production host', () => {
    vi.stubGlobal('window', { location: { hostname: 'spellingwords.app' } });
    expect(() => trackPracticeInitFailure({ reason: 'session_not_found' })).not.toThrow();
  });

  it('does nothing when window is undefined (SSR/build context)', () => {
    vi.stubGlobal('window', undefined);
    expect(() => trackCustomListReady({ listSize: 1 })).not.toThrow();
  });
});

describe('toPracticeSourceDim', () => {
  it('maps every PracticeSourceType, translating hfw to high_frequency', () => {
    expect(toPracticeSourceDim('core')).toBe('core');
    expect(toPracticeSourceDim('hfw')).toBe('high_frequency');
    expect(toPracticeSourceDim('themed')).toBe('themed');
    expect(toPracticeSourceDim('skill')).toBe('skill');
    expect(toPracticeSourceDim('custom')).toBe('custom');
    expect(toPracticeSourceDim('shared')).toBe('shared');
  });
});

describe('toGradeDim', () => {
  it('passes through valid grade codes', () => {
    for (const grade of ['K', '1', '2', '3', '4', '5']) {
      expect(toGradeDim(grade)).toBe(grade);
    }
  });

  it('rejects anything outside the 6-value allowlist', () => {
    expect(toGradeDim('6')).toBeUndefined();
    expect(toGradeDim('kindergarten')).toBeUndefined();
    expect(toGradeDim('')).toBeUndefined();
    expect(toGradeDim(undefined)).toBeUndefined();
    expect(toGradeDim(null)).toBeUndefined();
  });
});

describe('extractSkillIdFromHref', () => {
  it('extracts a valid canonical skill slug', () => {
    expect(extractSkillIdFromHref('/skills/silent-e-long-a')).toBe('silent-e-long-a');
  });

  it('rejects a non-canonical slug even if the path shape matches', () => {
    expect(extractSkillIdFromHref('/skills/not-a-real-skill')).toBeUndefined();
  });

  it('rejects anything that is not a bare /skills/{slug} path', () => {
    expect(extractSkillIdFromHref('/skills')).toBeUndefined();
    expect(extractSkillIdFromHref('/grades/1st-grade/core-spelling/floss-rule')).toBeUndefined();
    expect(extractSkillIdFromHref(undefined)).toBeUndefined();
  });
});

describe('prohibited-data API surface (compile-time)', () => {
  it('rejects a word/title/session-shaped payload at the type level', () => {
    stubProductionWindow();

    // practice_complete's type has no field for missed words, typed
    // answers, or a title — excess-property errors land on the offending
    // property's own line, so each @ts-expect-error sits directly above it.
    trackPracticeComplete({
      practiceSource: 'custom',
      runType: 'initial',
      correctCount: 1,
      totalCount: 1,
      // @ts-expect-error — no field for missed-word content exists here.
      missedWords: ['banana'],
    });

    trackAnswerSubmit({
      practiceSource: 'custom',
      runType: 'initial',
      // @ts-expect-error — trackAnswerSubmit has no `answer`/`word` field.
      answer: 'banana',
    });

    trackPracticeLaunch({
      practiceSource: 'custom',
      listSize: 1,
      // @ts-expect-error — trackPracticeLaunch has no `sessionId`/`title` field
      // (TypeScript's excess-property check reports both together, here).
      sessionId: 'abc123',
      title: 'My List',
    });
  });
});
