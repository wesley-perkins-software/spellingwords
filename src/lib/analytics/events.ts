import type { GradeCode } from '@/lib/content/gradeConfig';
import type { PracticeSourceType } from '@/types/spelling';
import { PRODUCTION_HOSTNAME } from './measurementId';
import { getSkillFamilyId, isCuratedSpellingSkillId, type SkillFamilyId } from './skillFamilyIds';

/**
 * Typed, allowlisted GA4 custom-event API for spellingwords.app.
 *
 * There is deliberately no `trackEvent(name, params)` escape hatch — every
 * event this app can send has its own function here with a closed parameter
 * type, so a call site cannot pass an arbitrary string (a spelling word, a
 * list title, a session id, a raw URL) through to GA even by accident. See
 * docs on the prohibited-data contract: no spelling words, typed answers,
 * custom/shared titles, session ids, `?list=`/`#list=` payloads, or raw
 * storage/state objects may ever reach any function below.
 */

// ---- Shared enums -----------------------------------------------------

export type PracticeSourceDim = 'core' | 'high_frequency' | 'themed' | 'skill' | 'custom' | 'shared';
export type RunType = 'initial' | 'review' | 'retry';
export type AudioType = 'word' | 'sentence';
export type ShareMethod = 'copy_link' | 'web_share';
export type PracticeInitFailureReason = 'session_not_found' | 'list_invalid';
export type SharedListInvalidReason = 'malformed' | 'incompatible_version';

const PRACTICE_SOURCE_DIM_BY_TYPE: Record<PracticeSourceType, PracticeSourceDim> = {
  core: 'core',
  hfw: 'high_frequency',
  themed: 'themed',
  skill: 'skill',
  custom: 'custom',
  shared: 'shared',
};

/** Translates the app's internal `PracticeSource.type` into the analytics enum. */
export function toPracticeSourceDim(type: PracticeSourceType): PracticeSourceDim {
  return PRACTICE_SOURCE_DIM_BY_TYPE[type];
}

const GRADE_CODES: readonly GradeCode[] = ['K', '1', '2', '3', '4', '5'];

/** Narrows an arbitrary string to a `GradeCode`, or `undefined` if it isn't one. */
export function toGradeDim(grade: string | null | undefined): GradeCode | undefined {
  return grade != null && (GRADE_CODES as readonly string[]).includes(grade)
    ? (grade as GradeCode)
    : undefined;
}

/**
 * `PracticeSource` for a Skill session doesn't carry the Skill's own id —
 * only `href` (the canonical `/skills/{slug}` page). This recovers the slug
 * from that known-safe, non-user-generated href, validated against the
 * closed 41-id allowlist before use.
 */
export function extractSkillIdFromHref(href: string | undefined): string | undefined {
  if (!href) return undefined;
  const match = /^\/skills\/([a-z0-9-]+)\/?$/.exec(href);
  const slug = match?.[1];
  return slug && isCuratedSpellingSkillId(slug) ? slug : undefined;
}

// ---- Internal transport -------------------------------------------------

type GtagParamValue = string | number | boolean;
type GtagParams = Record<string, GtagParamValue>;

function compact(params: Record<string, GtagParamValue | undefined>): GtagParams {
  const result: GtagParams = {};
  for (const key of Object.keys(params)) {
    const value = params[key];
    if (value !== undefined) result[key] = value;
  }
  return result;
}

function skillParams(skillId?: string): { skill_id?: string; skill_family?: SkillFamilyId } {
  if (!skillId || !isCuratedSpellingSkillId(skillId)) return {};
  const family = getSkillFamilyId(skillId);
  return family ? { skill_id: skillId, skill_family: family } : { skill_id: skillId };
}

interface RunContextInput {
  practiceSource: PracticeSourceDim;
  grade?: GradeCode;
  skillId?: string;
}

function runContextParams(input: RunContextInput): GtagParams {
  return compact({
    practice_source: input.practiceSource,
    grade: input.grade,
    ...skillParams(input.skillId),
  });
}

function getGtag(): ((...args: unknown[]) => void) | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
}

// GoogleAnalytics.astro defines `window.gtag` synchronously (queueing into
// `window.dataLayer`) before the gtag.js network script finishes loading, so
// there is no readiness race to guard against here beyond the hostname gate
// itself — on a non-production host that component never defines `gtag` at
// all, which the `typeof gtag !== 'function'` check below also covers.
function sendEvent(name: string, params: GtagParams = {}): void {
  if (typeof window === 'undefined') return;
  if (window.location.hostname !== PRODUCTION_HOSTNAME) return;
  const gtag = getGtag();
  if (typeof gtag !== 'function') return;
  gtag('event', name, params);
}

// ---- Public typed event API ---------------------------------------------

export function trackPracticeLaunch(input: {
  practiceSource: PracticeSourceDim;
  grade?: GradeCode;
  skillId?: string;
  listSize: number;
}): void {
  sendEvent('practice_launch', {
    ...runContextParams(input),
    list_size: input.listSize,
  });
}

export function trackCustomListReady(input: { listSize: number }): void {
  sendEvent('custom_list_ready', { list_size: input.listSize });
}

export function trackPracticeStart(input: {
  practiceSource: PracticeSourceDim;
  grade?: GradeCode;
  skillId?: string;
  runType: RunType;
  listSize: number;
}): void {
  sendEvent('practice_start', {
    ...runContextParams(input),
    run_type: input.runType,
    list_size: input.listSize,
  });
}

export function trackPracticeRestart(input: {
  practiceSource: PracticeSourceDim;
  grade?: GradeCode;
  skillId?: string;
}): void {
  sendEvent('practice_restart', runContextParams(input));
}

export function trackPracticeReviewStart(input: {
  practiceSource: PracticeSourceDim;
  grade?: GradeCode;
  skillId?: string;
}): void {
  sendEvent('practice_review_start', runContextParams(input));
}

export function trackAnswerSubmit(input: {
  practiceSource: PracticeSourceDim;
  grade?: GradeCode;
  skillId?: string;
  runType: RunType;
}): void {
  sendEvent('answer_submit', {
    ...runContextParams(input),
    run_type: input.runType,
  });
}

export function trackPracticeComplete(input: {
  practiceSource: PracticeSourceDim;
  grade?: GradeCode;
  skillId?: string;
  runType: RunType;
  correctCount: number;
  totalCount: number;
}): void {
  sendEvent('practice_complete', {
    ...runContextParams(input),
    run_type: input.runType,
    correct_count: input.correctCount,
    total_count: input.totalCount,
  });
}

export function trackPracticeContinueNext(input: {
  practiceSource: PracticeSourceDim;
  grade?: GradeCode;
  runType: RunType;
}): void {
  sendEvent(
    'practice_continue_next',
    compact({
      practice_source: input.practiceSource,
      grade: input.grade,
      run_type: input.runType,
    }),
  );
}

export function trackAudioRequest(input: {
  audioType: AudioType;
  practiceSource: PracticeSourceDim;
  grade?: GradeCode;
  skillId?: string;
  runType: RunType;
}): void {
  sendEvent('audio_request', {
    audio_type: input.audioType,
    ...runContextParams(input),
    run_type: input.runType,
  });
}

export function trackSharedLinkCreate(): void {
  sendEvent('shared_link_create');
}

export function trackShare(input: { method: ShareMethod }): void {
  sendEvent('share', { method: input.method, content_type: 'custom_word_list' });
}

export function trackSharedListOpen(input: { listSize: number }): void {
  sendEvent('shared_list_open', { list_size: input.listSize });
}

export function trackSharedListInvalid(input: { reason: SharedListInvalidReason }): void {
  sendEvent('shared_list_invalid', { reason: input.reason });
}

export function trackPracticeInitFailure(input: { reason: PracticeInitFailureReason }): void {
  sendEvent('practice_init_failure', { reason: input.reason });
}
