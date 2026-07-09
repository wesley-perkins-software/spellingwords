import type { SpellingListEntry } from './spellingLists';

export const GRADE_1_CORE_IDS: readonly string[] = [
  'grade-1-cvc-short-vowels-c-k-rule',
  'grade-1-floss-rule',
  'grade-1-consonant-digraphs-final-ck',
  'grade-1-beginning-consonant-blends',
  'grade-1-ending-consonant-blends',
  'grade-1-long-vowels-silent-e',
  'grade-1-open-syllables-final-y',
  'grade-1-heart-words',
  'grade-1-inflectional-endings-s-es',
  'grade-1-inflectional-endings-ed-ing',
  'grade-1-r-controlled-ar-or',
  'grade-1-r-controlled-er-ir-ur',
  'grade-1-long-a-long-o-vowel-teams',
  'grade-1-long-e-vowel-teams',
  'grade-1-tch-dge-ending-rules',
];

export const GRADE_1_TARGETED_SKILL_IDS: readonly string[] = [
  'short-a-words',
  'short-e-words',
  'short-i-words',
  'short-o-words',
  'short-u-words',
  'c-k-ck-words',
  'digraph-sh-words',
  'digraph-ch-words',
  'digraph-th-words',
  'digraph-wh-words',
];

export const GRADE_1_VOCABULARY_IDS: readonly string[] = [
  'grade-1-list-01',
  'grade-1-list-02',
  'grade-1-describing-words',
];

export const grade1Badges: Record<string, string> = {
  'grade-1-cvc-short-vowels-c-k-rule': 'Core Unit',
  'grade-1-floss-rule': 'Core Unit',
  'grade-1-consonant-digraphs-final-ck': 'Core Unit',
  'short-a-words': 'Targeted Skill',
  'short-e-words': 'Targeted Skill',
  'short-i-words': 'Targeted Skill',
  'short-o-words': 'Targeted Skill',
  'short-u-words': 'Targeted Skill',
  'c-k-ck-words': 'Targeted Skill',
  'digraph-sh-words': 'Targeted Skill',
  'digraph-ch-words': 'Targeted Skill',
  'digraph-th-words': 'Targeted Skill',
  'digraph-wh-words': 'Targeted Skill',
  'grade-1-list-01': 'Vocabulary',
  'grade-1-list-02': 'Vocabulary',
  'grade-1-describing-words': 'Vocabulary',
};

export function buildGrade1Sections(allPublishedEntries: SpellingListEntry[]): {
  core: SpellingListEntry[];
  targeted: SpellingListEntry[];
  vocabulary: SpellingListEntry[];
} {
  const byId = new Map(allPublishedEntries.map((entry) => [entry.data.id, entry]));
  const resolve = (ids: readonly string[]) =>
    ids.map((id) => byId.get(id)).filter((entry): entry is SpellingListEntry => entry !== undefined);

  return {
    core: resolve(GRADE_1_CORE_IDS),
    targeted: resolve(GRADE_1_TARGETED_SKILL_IDS),
    vocabulary: resolve(GRADE_1_VOCABULARY_IDS),
  };
}
