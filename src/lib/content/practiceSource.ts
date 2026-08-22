import { getSequenceNeighbors } from './navigationSequence';
import { getHighFrequencyNeighbors } from './hfWordsSequence';
import { getCanonicalListPathById } from './canonicalGradeRoutes';
import type { GradeRouteClassification } from './canonicalGradeRoutes';
import type { PracticeSource, PracticeSourceType } from '@/types/spelling';

const PRACTICE_SOURCE_TYPE_BY_CLASSIFICATION: Record<GradeRouteClassification, PracticeSourceType> = {
  'core-spelling': 'core',
  'high-frequency-words': 'hfw',
  'themed-spelling-practice': 'themed',
};

/**
 * Resolves the /play provenance for a Grade Unit / HFW set / Themed list
 * session. `href` must be the entry's own canonical page — never a grade or
 * strand gateway — so "Return to {title}" lands the student back exactly
 * where they started. Only 'core-spelling' and 'high-frequency-words' ever
 * carry a `nextHref`/`nextTitle`; Themed Spelling Practice has no next-in-
 * sequence semantics (see docs/planning/CANONICAL_NAVIGATION_RELATIONSHIPS.md).
 */
export function resolveGradeUnitPracticeSource(args: {
  id: string;
  classification: GradeRouteClassification;
  title: string;
  href: string;
  grade?: string;
  titleById: (id: string) => string | undefined;
}): PracticeSource {
  const { id, classification, title, href, grade, titleById } = args;
  const type = PRACTICE_SOURCE_TYPE_BY_CLASSIFICATION[classification];
  const source: PracticeSource = { type, title, href, grade };

  const nextId =
    classification === 'core-spelling'
      ? getSequenceNeighbors(id).nextId
      : classification === 'high-frequency-words'
        ? getHighFrequencyNeighbors(id).nextId
        : undefined;

  if (nextId) {
    const nextHref = getCanonicalListPathById(nextId);
    const nextTitle = titleById(nextId);
    if (nextHref && nextTitle) {
      source.nextHref = nextHref;
      source.nextTitle = nextTitle;
    }
  }

  return source;
}

/** Skill pages have no next-in-sequence — only a return link to the skill itself. */
export function resolveSkillPracticeSource(args: { title: string; href: string }): PracticeSource {
  return { type: 'skill', title: args.title, href: args.href };
}

/** Custom (pasted-word) sessions never carry a return destination or user text. */
export function resolveCustomPracticeSource(): PracticeSource {
  return { type: 'custom' };
}
