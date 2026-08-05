import type { SpellingListEntry } from './spellingLists';

export const GRADE_1_CORE_IDS: readonly string[] = [
  'grade-1-cvc-short-vowels-c-k-rule',
  'grade-1-floss-rule',
  'grade-1-consonant-digraphs-final-ck',
  'grade-1-beginning-consonant-blends',
  'grade-1-ending-consonant-blends',
  'grade-1-long-vowels-silent-e',
  'grade-1-open-syllables-final-y',
  'grade-1-inflectional-endings-s-es',
  'grade-1-inflectional-endings-ed-ing',
  'grade-1-r-controlled-ar-or',
  'grade-1-long-a-long-o-vowel-teams',
  'grade-1-tch-dge-ending-rules',
];

export const GRADE_1_GATEWAY_IDS: readonly string[] = [];

export const GRADE_1_TARGETED_SKILL_IDS: readonly string[] = [
  'short-a-words',
  'short-e-words',
  'short-i-words',
  'short-o-words',
  'short-u-words',
  'digraph-sh-words',
  'digraph-ch-words',
  'digraph-th-words',
  'digraph-wh-words',
  'silent-e-long-a',
  'silent-e-long-i',
  'silent-e-long-o',
  'silent-e-long-u',
  'r-controlled-ar',
  'r-controlled-or',
  'r-controlled-er-ir-ur',
  'vowel-teams-ai-ay',
  'vowel-teams-oa-ow',
  'vowel-teams-ee-ea',
];

export const GRADE_1_VOCABULARY_IDS: readonly string[] = [];

export const grade1Badges: Record<string, string> = {
  'grade-1-cvc-short-vowels-c-k-rule': 'Core Unit',
  'grade-1-floss-rule': 'Core Unit',
  'grade-1-consonant-digraphs-final-ck': 'Core Unit',
  'grade-1-beginning-consonant-blends': 'Core Unit',
  'grade-1-ending-consonant-blends': 'Core Unit',
  'grade-1-long-vowels-silent-e': 'Core Unit',
  'grade-1-open-syllables-final-y': 'Core Unit',
  'grade-1-inflectional-endings-s-es': 'Core Unit',
  'grade-1-inflectional-endings-ed-ing': 'Core Unit',
  'grade-1-r-controlled-ar-or': 'Core Unit',
  'grade-1-long-a-long-o-vowel-teams': 'Core Unit',
  'grade-1-tch-dge-ending-rules': 'Core Unit',
  'short-a-words': 'Targeted Skill',
  'short-e-words': 'Targeted Skill',
  'short-i-words': 'Targeted Skill',
  'short-o-words': 'Targeted Skill',
  'short-u-words': 'Targeted Skill',
  'digraph-sh-words': 'Targeted Skill',
  'digraph-ch-words': 'Targeted Skill',
  'digraph-th-words': 'Targeted Skill',
  'digraph-wh-words': 'Targeted Skill',
  'silent-e-long-a': 'Targeted Skill',
  'silent-e-long-i': 'Targeted Skill',
  'silent-e-long-o': 'Targeted Skill',
  'silent-e-long-u': 'Targeted Skill',
  'r-controlled-ar': 'Targeted Skill',
  'r-controlled-or': 'Targeted Skill',
  'r-controlled-er-ir-ur': 'Targeted Skill',
  'vowel-teams-ai-ay': 'Targeted Skill',
  'vowel-teams-oa-ow': 'Targeted Skill',
  'vowel-teams-ee-ea': 'Targeted Skill',
};

export function buildGrade1Sections(allPublishedEntries: SpellingListEntry[]): {
  core: SpellingListEntry[];
  gateways: SpellingListEntry[];
  targeted: SpellingListEntry[];
  vocabulary: SpellingListEntry[];
} {
  const byId = new Map(allPublishedEntries.map((entry) => [entry.data.id, entry]));
  const resolve = (ids: readonly string[]) =>
    ids.map((id) => byId.get(id)).filter((entry): entry is SpellingListEntry => entry !== undefined);

  return {
    core: resolve(GRADE_1_CORE_IDS),
    gateways: resolve(GRADE_1_GATEWAY_IDS),
    targeted: resolve(GRADE_1_TARGETED_SKILL_IDS),
    vocabulary: resolve(GRADE_1_VOCABULARY_IDS),
  };
}
