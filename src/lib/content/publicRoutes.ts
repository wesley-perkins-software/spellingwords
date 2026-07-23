export type PublicRole = 'grade-hub' | 'grade-page' | 'high-frequency-set' | 'skill' | 'collection';
export type PublicRoute = { id: string; role: PublicRole; pathname: string; legacyPathnames: readonly string[]; indexable: boolean };
type ListLike = { data: { id: string; category: string; urlSlug: string } };

const records: PublicRoute[] = [];
const add = (id: string, role: PublicRole, pathname: string, ...legacyPathnames: string[]) => records.push({ id, role, pathname: `${pathname}/`, legacyPathnames: legacyPathnames.map((path) => `${path}/`), indexable: true });
const legacy = (category: string, slug: string) => `/spelling-lists/${category}/${slug}`;
for (const [id, slug, category] of [
  ['kindergarten-first-words','first-words','grade-level'],['kindergarten-short-a-words','short-a-words','phonics'],['kindergarten-short-i-words','short-i-words','phonics'],['kindergarten-short-o-words','short-o-words','phonics'],['kindergarten-short-u-words','short-u-words','phonics'],['kindergarten-short-e-words','short-e-words','phonics'],['kindergarten-mixed-vowel-review','mixed-cvc-review','phonics'],['kindergarten-consonant-digraphs','digraph-words','phonics'],['kindergarten-number-words','number-words','grade-level'],['kindergarten-color-words','color-words','grade-level'],['kindergarten-animal-words','animal-words','grade-level'],
] as const) add(id, 'grade-page', `/spelling-lists/kindergarten/${slug}`, legacy(category, id));
for (const number of ['1','2','3','4']) add(`kindergarten-common-words-${number}`, 'high-frequency-set', `/spelling-lists/kindergarten/high-frequency-words-${number}`, legacy('sight-words', `kindergarten-common-words-${number}`));
for (const [id, slug] of [['grade-1-cvc-short-vowels-c-k-rule','short-vowel-review-c-k-spelling'],['grade-1-floss-rule','floss-rule'],['grade-1-consonant-digraphs-final-ck','digraphs-final-ck'],['grade-1-beginning-consonant-blends','beginning-consonant-blends'],['grade-1-ending-consonant-blends','ending-consonant-blends'],['grade-1-long-vowels-silent-e','long-vowels-silent-e'],['grade-1-open-syllables-final-y','open-syllables-final-y'],['grade-1-long-a-long-o-vowel-teams','long-vowel-teams'],['grade-1-inflectional-endings-s-es','plural-endings-s-es'],['grade-1-inflectional-endings-ed-ing','verb-endings-ed-ing'],['grade-1-r-controlled-ar-or','r-controlled-vowels'],['grade-1-tch-dge-ending-rules','final-tch-dge']] as const) add(id, 'grade-page', `/spelling-lists/grade-1/${slug}`, legacy('phonics', id.replace(/^grade-1-/, '1st-grade-')));
for (const id of ['short-a-words','short-e-words','short-i-words','short-o-words','short-u-words','digraph-ch-words','digraph-sh-words','digraph-th-words','digraph-wh-words','silent-e-long-a','silent-e-long-e','silent-e-long-i','silent-e-long-o','silent-e-long-u','vowel-teams-ai-ay','vowel-teams-ee-ea','vowel-teams-oa-ow']) add(id, 'skill', `/spelling-lists/skills/${id}`, legacy('phonics', id));
add('kindergarten-common-words', 'collection', '/spelling-lists/collections/kindergarten-high-frequency-words', '/spelling-lists/collections/kindergarten-common-words');
add('grade-1-common-words', 'collection', '/spelling-lists/collections/grade-1-high-frequency-words', '/spelling-lists/collections/grade-1-common-words');
export const publicRoutes = new Map(records.map((record) => [record.id, record]));
export const hasExplicitPublicRoute = (id: string) => publicRoutes.has(id);
export const getCanonicalPath = (id: string) => publicRoutes.get(id)?.pathname;
export const getListPath = (entry: ListLike) => getCanonicalPath(entry.data.id) ?? `${legacy(entry.data.category, entry.data.urlSlug)}/`;
export const getCollectionPath = (id: string, slug: string) => getCanonicalPath(id) ?? `/spelling-lists/collections/${slug}/`;
export const getLegacyRedirectPaths = (id: string) => publicRoutes.get(id)?.legacyPathnames ?? [];
