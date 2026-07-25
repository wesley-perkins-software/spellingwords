import type { GradeCode } from './gradeConfig';
import { gradeConfig } from './gradeConfig';
import { GRADE_1_CORE_IDS, GRADE_1_GATEWAY_IDS, GRADE_1_TARGETED_SKILL_IDS, GRADE_1_VOCABULARY_IDS } from './grade1Progression';
import { GRADE_2_CORE_IDS } from './grade2Progression';
import { GRADE_3_CORE_IDS } from './grade3Progression';
import { KINDERGARTEN_ADDITIONAL_IDS, KINDERGARTEN_CORE_IDS } from './kindergartenProgression';
import { getListsByGrade, type SpellingListEntry } from './spellingLists';

/**
 * Curated within-grade id order for grades that have a hand-maintained
 * progression file today. Grades without one fall back to that grade's
 * published entries sorted by content `order` (see `curatedIdOrderForGrade`).
 */
const CURATED_GRADE_ORDER: Partial<Record<GradeCode, readonly string[]>> = {
  K: [...KINDERGARTEN_CORE_IDS, ...KINDERGARTEN_ADDITIONAL_IDS],
  '1': [...GRADE_1_CORE_IDS, ...GRADE_1_GATEWAY_IDS, ...GRADE_1_TARGETED_SKILL_IDS, ...GRADE_1_VOCABULARY_IDS],
  '2': [...GRADE_2_CORE_IDS],
  '3': [...GRADE_3_CORE_IDS],
};

/**
 * Returns a grade's curated id order, restricted to ids that are actually
 * Grade Units. Ids present in `gradeUnitIds` but absent from the curated
 * order (e.g. a new Grade Unit not yet added to the progression file) are
 * appended at the end, sorted by content `order`, so every published Grade
 * Unit is always reachable in the sequence.
 */
function curatedIdOrderForGrade(
  grade: GradeCode,
  gradeEntries: SpellingListEntry[],
  gradeUnitIds: Set<string>,
): string[] {
  const curated = CURATED_GRADE_ORDER[grade];
  const curatedGradeUnitIds = (curated ?? []).filter((id) => gradeUnitIds.has(id));

  const seen = new Set(curatedGradeUnitIds);
  const orphaned = gradeEntries
    .filter((entry) => gradeUnitIds.has(entry.data.id) && !seen.has(entry.data.id))
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => entry.data.id);

  return [...curatedGradeUnitIds, ...orphaned];
}

/**
 * Builds the full cross-grade curriculum sequence of Grade Unit ids, in
 * K→1→2→3→4→5 order (per `gradeConfig`) and curated within-grade order.
 * Grade boundaries do not reset the sequence — this is the ordering that
 * `assignWorldKitsInSequence()` (see `src/lib/theme/worldKits.ts`) computes
 * adjacent-kit-repeat avoidance over.
 */
export function buildGradeUnitSequence(allPublishedEntries: SpellingListEntry[]): string[] {
  const gradeUnitIds = new Set(
    allPublishedEntries.filter((entry) => entry.data.contentRole === 'grade-unit').map((entry) => entry.data.id),
  );

  const sequence: string[] = [];
  for (const { grade } of gradeConfig) {
    const gradeEntries = getListsByGrade(grade, allPublishedEntries);
    sequence.push(...curatedIdOrderForGrade(grade, gradeEntries, gradeUnitIds));
  }

  return sequence;
}
