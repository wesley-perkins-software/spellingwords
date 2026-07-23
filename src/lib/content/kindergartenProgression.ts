import type { SpellingListEntry } from './spellingLists';

/**
 * Curated presentation order for the Kindergarten grade hub, hand-maintained
 * like `gradeConfig.ts`/`gradeHubCopy.ts` rather than derived from content
 * frontmatter. The Kindergarten hub renders exactly two sections — a core
 * spelling progression and optional additional practice — instead of the
 * category-grouped sections every other grade page uses.
 *
 * The core progression is the three canonical Kindergarten Grade Units
 * (Sounds/Letters/Early Encoding, Short Vowels and CVC Words, High-Frequency
 * Words) plus `kindergarten-consonant-digraphs` as one temporary supporting
 * step retained until the Phase 3 Grade 1 cutover. Most steps are a single
 * content id; the High-Frequency Words step composes four existing Sight
 * Word Set ids (Heart Words + the three Dolch Pre-Primer parts) under one
 * roadmap position, per the "a Grade Unit may be a roadmap milestone that
 * composes an existing... Sight Word Set" model — its own `id` is a
 * synthetic, config-only identifier with no corresponding content-collection
 * entry, route, or page. It exists purely for step-position bookkeeping and
 * must never be looked up against the content collection.
 */
export interface KindergartenRoadmapStep {
  /** Stable step id, used for position bookkeeping only. Usually a real
   *  content id (the common single-id case), but may be a synthetic
   *  milestone id — see `kindergarten-high-frequency-words` below — with no
   *  corresponding content-collection entry, route, or schema record. */
  readonly id: string;
  /** Content ids rendered as cards for this step. Defaults to `[id]` when
   *  omitted, which is every step except the composed High-Frequency Words
   *  milestone. */
  readonly memberIds?: readonly string[];
}

export const KINDERGARTEN_CORE_STEPS: readonly KindergartenRoadmapStep[] = [
  { id: 'kindergarten-first-words' },
  { id: 'kindergarten-mixed-vowel-review' },
  {
    // Synthetic milestone id — config-only. Never expected to resolve to a
    // published content entry, route, or page; see the doc comment above.
    id: 'kindergarten-high-frequency-words',
    memberIds: [
      'kindergarten-heart-words',
      'dolch-pre-primer-a',
      'dolch-pre-primer-b',
      'dolch-pre-primer-c',
    ],
  },
  { id: 'kindergarten-consonant-digraphs' },
];

/** The one step id in `KINDERGARTEN_CORE_STEPS` with no content-collection
 *  counterpart — exported so tests and any future caller can explicitly
 *  exempt it from "does this id resolve to published content?" checks. */
export const KINDERGARTEN_SYNTHETIC_STEP_ID = 'kindergarten-high-frequency-words';

/**
 * Flat, ordered list of every real content id across all core steps —
 * derived from `KINDERGARTEN_CORE_STEPS`, not hand-maintained separately.
 * Excludes the synthetic milestone id itself (it has no content entry) but
 * includes every one of its members. Kept for consumers that only need "every
 * core-progression content id in order" (`gradeUnitSequence.ts`'s
 * `CURATED_GRADE_ORDER`, and this module's own step resolution).
 */
export const KINDERGARTEN_CORE_IDS: readonly string[] = KINDERGARTEN_CORE_STEPS.flatMap(
  (step) => step.memberIds ?? [step.id],
);

export const KINDERGARTEN_ADDITIONAL_IDS: readonly string[] = [
  'kindergarten-short-a-words',
  'kindergarten-short-i-words',
  'kindergarten-short-o-words',
  'kindergarten-short-u-words',
  'kindergarten-short-e-words',
  'kindergarten-ck-ending-words',
  'kindergarten-double-consonants',
  'kindergarten-animal-words',
  'kindergarten-number-color-words',
];

/**
 * Card badge label, independent of `category` — the taxonomy a parent sees
 * ("Phonics", "Spelling Rules", "Sight Words", "Vocabulary") is presentation
 * only and must never determine which hub section a list appears in.
 */
export const kindergartenBadges: Record<string, string> = {
  'kindergarten-first-words': 'Phonics',
  'kindergarten-short-a-words': 'Phonics',
  'kindergarten-short-i-words': 'Phonics',
  'kindergarten-short-o-words': 'Phonics',
  'kindergarten-short-u-words': 'Phonics',
  'kindergarten-short-e-words': 'Phonics',
  'kindergarten-mixed-vowel-review': 'Phonics',
  'kindergarten-consonant-digraphs': 'Phonics',
  'kindergarten-ck-ending-words': 'Spelling Rules',
  'kindergarten-double-consonants': 'Spelling Rules',
  'kindergarten-heart-words': 'Sight Words',
  'dolch-pre-primer-a': 'Sight Words',
  'dolch-pre-primer-b': 'Sight Words',
  'dolch-pre-primer-c': 'Sight Words',
  'kindergarten-animal-words': 'Vocabulary',
  'kindergarten-number-color-words': 'Vocabulary',
};

/**
 * Returns a content id's 1-based position within the Kindergarten core
 * progression (by step, not by flat content id), for the "Kindergarten
 * spelling · Step N of M" indicator on Grade Unit pages. Resolves both a
 * step's own `id` and any of its `memberIds`, so every Sight Word Set
 * composed into the High-Frequency Words milestone reports the same step
 * position as its siblings. Returns undefined for anything outside the core
 * roadmap (additional-practice lists, Skills, other grades), which renders
 * no indicator.
 */
export function getKindergartenRoadmapPosition(
  id: string,
): { step: number; total: number } | undefined {
  const index = KINDERGARTEN_CORE_STEPS.findIndex(
    (step) => step.id === id || (step.memberIds?.includes(id) ?? false),
  );
  if (index === -1) return undefined;
  return { step: index + 1, total: KINDERGARTEN_CORE_STEPS.length };
}

export interface KindergartenCoreStepSection {
  step: number;
  total: number;
  /** Published entries to render for this step, in step order. May contain
   *  more than one entry (the composed High-Frequency Words milestone). */
  entries: SpellingListEntry[];
}

/**
 * Resolves the curated core-step/additional id lists against a grade's
 * published entries, in curated order. An id with no matching published
 * entry is silently dropped rather than throwing, matching `resolveListRefs()`'s
 * safety behavior for cross-references elsewhere in the content layer. The
 * one synthetic step id (`kindergarten-high-frequency-words`) never matches a
 * published entry itself — only its `memberIds` are resolved and rendered.
 */
export function buildKindergartenSections(gradeLists: SpellingListEntry[]): {
  core: KindergartenCoreStepSection[];
  additional: SpellingListEntry[];
} {
  const byId = new Map(gradeLists.map((entry) => [entry.data.id, entry]));
  const resolve = (ids: readonly string[]) =>
    ids.map((id) => byId.get(id)).filter((entry): entry is SpellingListEntry => entry !== undefined);

  const core = KINDERGARTEN_CORE_STEPS.map((step, index) => ({
    step: index + 1,
    total: KINDERGARTEN_CORE_STEPS.length,
    entries: resolve(step.memberIds ?? [step.id]),
  }));

  return {
    core,
    additional: resolve(KINDERGARTEN_ADDITIONAL_IDS),
  };
}
