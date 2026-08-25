import type { SpellingListEntry } from './spellingLists';

export type RelationshipCardModel = {
  canonicalTitle: string;
  gradeLabel?: string;
  wordCount: number;
};

/**
 * Relationship cards always use the destination entry's canonical title.
 * Grade context is deliberately separate so callers never decorate or
 * abbreviate that title string.
 */
export function getRelationshipCardModel(entry: SpellingListEntry): RelationshipCardModel {
  const grade = entry.data.grade;
  return {
    canonicalTitle: entry.data.title,
    gradeLabel: grade === 'K' ? 'Kindergarten' : grade ? `Grade ${grade}` : undefined,
    wordCount: entry.data.words.length,
  };
}
