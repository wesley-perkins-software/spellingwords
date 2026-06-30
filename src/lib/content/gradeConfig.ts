export type GradeCode = 'K' | '1' | '2' | '3' | '4' | '5';

export interface GradeConfigEntry {
  grade: GradeCode;
  /** Used in breadcrumbs, headings, and nav text, e.g. "1st Grade" (combine with "Spelling Words"). */
  label: string;
  /** Compact form for the grade-grid tiles on the library index page, e.g. "Grade 1". */
  shortLabel: string;
  /** URL slug, e.g. "1st-grade". */
  slug: string;
  /** Full path to the grade hub page. */
  hubHref: string;
}

export const gradeConfig: readonly GradeConfigEntry[] = [
  { grade: 'K', label: 'Kindergarten', shortLabel: 'Kindergarten', slug: 'kindergarten', hubHref: '/spelling-lists/kindergarten' },
  { grade: '1', label: '1st Grade', shortLabel: 'Grade 1', slug: '1st-grade', hubHref: '/spelling-lists/1st-grade' },
  { grade: '2', label: '2nd Grade', shortLabel: 'Grade 2', slug: '2nd-grade', hubHref: '/spelling-lists/2nd-grade' },
  { grade: '3', label: '3rd Grade', shortLabel: 'Grade 3', slug: '3rd-grade', hubHref: '/spelling-lists/3rd-grade' },
  { grade: '4', label: '4th Grade', shortLabel: 'Grade 4', slug: '4th-grade', hubHref: '/spelling-lists/4th-grade' },
  { grade: '5', label: '5th Grade', shortLabel: 'Grade 5', slug: '5th-grade', hubHref: '/spelling-lists/5th-grade' },
];

/** Returns the previous/next grade in sequence, omitting either end where there is no neighbor. */
export function getAdjacentGrades(grade: GradeCode): {
  prev?: GradeConfigEntry;
  next?: GradeConfigEntry;
} {
  const index = gradeConfig.findIndex((g) => g.grade === grade);
  return {
    prev: index > 0 ? gradeConfig[index - 1] : undefined,
    next: index < gradeConfig.length - 1 ? gradeConfig[index + 1] : undefined,
  };
}
