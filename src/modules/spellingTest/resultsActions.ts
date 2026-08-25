import type { TestResult } from './types';
import type { PracticeSource } from '@/types/spelling';
import { gradeConfig } from '@/lib/content/gradeConfig';

export type ResultsActionKind = 'reviewMissed' | 'retryFull' | 'continueNext' | 'sourceReturn';

export interface ResultsAction {
  kind: ResultsActionKind;
  label: string;
  /** Present for continueNext/sourceReturn (navigation links); absent for
   *  reviewMissed/retryFull, which re-drive the state machine instead. */
  href?: string;
}

const NEXT_LABEL_BY_SOURCE_TYPE: Partial<Record<PracticeSource['type'], string>> = {
  core: 'Continue to next unit →',
  hfw: 'Continue to next set →',
};

/**
 * The Core Spelling "Continue" label, made destination-aware at a grade
 * boundary. Only the label changes here — `nextHref` (set in
 * `resolveGradeUnitPracticeSource`) is untouched, so this never affects
 * where "Continue" actually navigates, only what it says.
 */
function coreContinueLabel(source: PracticeSource): string {
  if (source.grade && source.nextGrade && source.grade !== source.nextGrade) {
    const nextGradeLabel = gradeConfig.find((g) => g.grade === source.nextGrade)?.label;
    if (nextGradeLabel) return `Continue to ${nextGradeLabel} Core Spelling →`;
  }
  return NEXT_LABEL_BY_SOURCE_TYPE.core!;
}

/**
 * Determines which results-screen actions to show, in priority order.
 * A perfect score with a valid next unit/set prioritizes progression;
 * a non-perfect score never offers next-unit/set progression, regardless
 * of whether the source has one. "Return to {source}" is only ever offered
 * when the session actually has a source page (never for 'custom').
 */
export function resolveResultsActions(result: TestResult, source: PracticeSource): ResultsAction[] {
  const isPerfect = result.missedWords.length === 0;
  const sourceReturn: ResultsAction | null =
    source.href && source.title
      ? { kind: 'sourceReturn', label: `← Return to ${source.title}`, href: source.href }
      : null;

  if (isPerfect) {
    if (source.nextHref && source.nextTitle) {
      const actions: ResultsAction[] = [
        {
          kind: 'continueNext',
          label:
            source.type === 'core'
              ? coreContinueLabel(source)
              : (NEXT_LABEL_BY_SOURCE_TYPE[source.type] ?? 'Continue →'),
          href: source.nextHref,
        },
        { kind: 'retryFull', label: 'Practice this list again' },
      ];
      if (sourceReturn) actions.push(sourceReturn);
      return actions;
    }

    const actions: ResultsAction[] = [{ kind: 'retryFull', label: 'Practice again' }];
    if (sourceReturn) actions.push(sourceReturn);
    return actions;
  }

  const actions: ResultsAction[] = [
    { kind: 'reviewMissed', label: 'Practice missed words' },
    { kind: 'retryFull', label: 'Practice full list again' },
  ];
  if (sourceReturn) actions.push(sourceReturn);
  return actions;
}
