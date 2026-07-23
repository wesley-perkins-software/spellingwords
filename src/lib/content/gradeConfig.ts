export type GradeCode = 'K' | '1' | '2' | '3' | '4' | '5';

export interface GradeConfigEntry {
  grade: GradeCode;
  /** Used in breadcrumbs, headings, and nav text, e.g. "1st Grade" (combine with "Spelling Words"). */
  label: string;
  /** Compact form for the grade-grid tiles on the library index page, e.g. "Grade 1". */
  shortLabel: string;
  /** URL slug, e.g. "grade-1". */
  slug: string;
  /** Full path to the grade hub page. */
  hubHref: string;
}

export const gradeConfig: readonly GradeConfigEntry[] = [
  { grade: 'K', label: 'Kindergarten', shortLabel: 'Kindergarten', slug: 'kindergarten', hubHref: '/spelling-lists/kindergarten' },
  { grade: '1', label: '1st Grade', shortLabel: 'Grade 1', slug: 'grade-1', hubHref: '/spelling-lists/grade-1' },
  { grade: '2', label: '2nd Grade', shortLabel: 'Grade 2', slug: 'grade-2', hubHref: '/spelling-lists/grade-2' },
  { grade: '3', label: '3rd Grade', shortLabel: 'Grade 3', slug: 'grade-3', hubHref: '/spelling-lists/grade-3' },
  { grade: '4', label: '4th Grade', shortLabel: 'Grade 4', slug: 'grade-4', hubHref: '/spelling-lists/grade-4' },
  { grade: '5', label: '5th Grade', shortLabel: 'Grade 5', slug: 'grade-5', hubHref: '/spelling-lists/grade-5' },
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

/**
 * Given the (possibly undefined) `grade` values from a set of content
 * entries, returns the matching grade config entries — in canonical K-5
 * order — for whichever grades are actually present. Lets a topic hub page
 * (phonics, sight-words, challenge) render a "browse by grade" nav without
 * hardcoding which grades currently have content in that category.
 */
export function getGradesWithLists(grades: Iterable<string | undefined>): GradeConfigEntry[] {
  const present = new Set(grades);
  return gradeConfig.filter((g) => present.has(g.grade));
}
