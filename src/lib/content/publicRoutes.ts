type ListLike = { data: { id: string; category: string; urlSlug: string } };

const paths: Record<string, string> = {
  'kindergarten-first-words': '/spelling-lists/kindergarten/first-words',
  'kindergarten-short-a-words': '/spelling-lists/kindergarten/short-a-words',
  'kindergarten-short-i-words': '/spelling-lists/kindergarten/short-i-words',
  'kindergarten-short-o-words': '/spelling-lists/kindergarten/short-o-words',
  'kindergarten-short-u-words': '/spelling-lists/kindergarten/short-u-words',
  'kindergarten-short-e-words': '/spelling-lists/kindergarten/short-e-words',
  'kindergarten-mixed-vowel-review': '/spelling-lists/kindergarten/mixed-cvc-review',
  'kindergarten-consonant-digraphs': '/spelling-lists/kindergarten/digraph-words',
  'kindergarten-common-words-1': '/spelling-lists/kindergarten/high-frequency-words-1',
  'kindergarten-common-words-2': '/spelling-lists/kindergarten/high-frequency-words-2',
  'kindergarten-common-words-3': '/spelling-lists/kindergarten/high-frequency-words-3',
  'kindergarten-common-words-4': '/spelling-lists/kindergarten/high-frequency-words-4',
  'kindergarten-number-words': '/spelling-lists/kindergarten/number-words',
  'kindergarten-color-words': '/spelling-lists/kindergarten/color-words',
  'kindergarten-animal-words': '/spelling-lists/kindergarten/animal-words',
  'grade-1-cvc-short-vowels-c-k-rule': '/spelling-lists/grade-1/short-vowel-review-c-k-spelling',
  'grade-1-floss-rule': '/spelling-lists/grade-1/floss-rule',
  'grade-1-consonant-digraphs-final-ck': '/spelling-lists/grade-1/digraphs-final-ck',
  'grade-1-beginning-consonant-blends': '/spelling-lists/grade-1/beginning-consonant-blends',
  'grade-1-ending-consonant-blends': '/spelling-lists/grade-1/ending-consonant-blends',
  'grade-1-long-vowels-silent-e': '/spelling-lists/grade-1/long-vowels-silent-e',
  'grade-1-open-syllables-final-y': '/spelling-lists/grade-1/open-syllables-final-y',
  'grade-1-long-a-long-o-vowel-teams': '/spelling-lists/grade-1/long-vowel-teams',
  'grade-1-inflectional-endings-s-es': '/spelling-lists/grade-1/plural-endings-s-es',
  'grade-1-inflectional-endings-ed-ing': '/spelling-lists/grade-1/verb-endings-ed-ing',
  'grade-1-r-controlled-ar-or': '/spelling-lists/grade-1/r-controlled-vowels',
  'grade-1-tch-dge-ending-rules': '/spelling-lists/grade-1/final-tch-dge',
  'grade-1-common-words-1': '/spelling-lists/grade-1/high-frequency-words-1',
  'grade-1-common-words-2': '/spelling-lists/grade-1/high-frequency-words-2',
  'grade-1-list-01': '/spelling-lists/grade-1/everyday-words',
  'grade-1-list-02': '/spelling-lists/grade-1/action-words',
  'grade-1-describing-words': '/spelling-lists/grade-1/describing-words',
};

for (const id of ['short-a-words','short-e-words','short-i-words','short-o-words','short-u-words','digraph-ch-words','digraph-sh-words','digraph-th-words','digraph-wh-words','silent-e-long-a','silent-e-long-e','silent-e-long-i','silent-e-long-o','silent-e-long-u','vowel-teams-ai-ay','vowel-teams-ee-ea','vowel-teams-oa-ow']) paths[id] = `/spelling-lists/skills/${id}`;

export function getPublicListPath(entry: ListLike) { return paths[entry.data.id] ?? `/spelling-lists/${entry.data.category}/${entry.data.urlSlug}`; }
export function isMigratedList(id: string) { return id in paths; }
export function getPublicCollectionPath(id: string, slug: string) { return id === 'kindergarten-common-words' ? '/spelling-lists/collections/kindergarten-high-frequency-words' : id === 'grade-1-common-words' ? '/spelling-lists/collections/grade-1-high-frequency-words' : `/spelling-lists/collections/${slug}`; }
