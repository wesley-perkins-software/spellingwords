# Inventory: Retained `/spelling-lists/{category}/{urlSlug}` Pages

This is the explicit, reviewable accounting of every published `spelling-lists` entry that intentionally
keeps rendering through the legacy `src/pages/spelling-lists/[category]/[slug].astro` route after the
pre-launch canonical URL hardening PR. It exists so that "everything not a grade-curriculum or Skill id"
is a reviewed, named set — not an unexamined leftover.

**This PR does not reclassify, archive, delete, or redesign any page below.** It only proves, via
`src/lib/content/spellingLists.test.ts`, that the computed retained set (published ids minus the 104
grade-curriculum ids minus the 41 canonical Skill ids) equals exactly this list — any future addition,
removal, or reclassification that isn't reflected here fails that test.

**Totals:** 249 published `spelling-lists` entries − 104 grade-curriculum − 41 Skill = **104 retained**.
Breakdown: **69** deprecated/legacy, **33** unresolved, **2** documented `contentRole: skill` legacy-role
exceptions. **Zero** fall into a clean "other intentional retained public content" bucket — this doc states
that plainly rather than inventing one.

Classification legend:
- **Deprecated/legacy** — named in `docs/content/inventory/deprecated-and-legacy-pages.md` (orphaned
  phonics blend/practice pages, Dolch member sets, standalone Heart Word pages).
- **Unresolved** — named in `docs/content/inventory/untagged-and-data-quality.md` (not yet classified by
  a product-owner decision).
- **Focused-component legacy-role exception** — the two documented `contentRole: skill` pages that are
  explicitly *not* part of the 41-slot canonical Skill taxonomy (see `docs/content/inventory/skill-pages.md`).

| id | urlSlug | category | classification | source file |
|---|---|---|---|---|
| academic-vocabulary | academic-vocabulary | challenge | Unresolved | `src/content/spelling-lists/challenge/academic-vocabulary.md` |
| bl-blend-words | bl-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/bl-blend-words.md` |
| br-blend-words | br-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/br-blend-words.md` |
| c-k-ck-words | c-k-ck-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/c-k-ck-words.md` |
| cl-blend-words | cl-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/cl-blend-words.md` |
| cr-blend-words | cr-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/cr-blend-words.md` |
| dolch-first-grade-a | dolch-first-grade-a-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-first-grade-a.md` |
| dolch-first-grade-b | dolch-first-grade-b-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-first-grade-b.md` |
| dolch-first-grade-c | dolch-first-grade-c-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-first-grade-c.md` |
| dolch-nouns-a | dolch-nouns-a-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-nouns-a.md` |
| dolch-nouns-b | dolch-nouns-b-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-nouns-b.md` |
| dolch-nouns-c | dolch-nouns-c-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-nouns-c.md` |
| dolch-nouns-d | dolch-nouns-d-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-nouns-d.md` |
| dolch-nouns-e | dolch-nouns-e-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-nouns-e.md` |
| dolch-nouns-f | dolch-nouns-f-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-nouns-f.md` |
| dolch-nouns-g | dolch-nouns-g-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-nouns-g.md` |
| dolch-pre-primer-a | dolch-pre-primer-a-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-pre-primer-a.md` |
| dolch-pre-primer-b | dolch-pre-primer-b-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-pre-primer-b.md` |
| dolch-pre-primer-c | dolch-pre-primer-c-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-pre-primer-c.md` |
| dolch-primer-a | dolch-primer-a-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-primer-a.md` |
| dolch-primer-b | dolch-primer-b-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-primer-b.md` |
| dolch-primer-c | dolch-primer-c-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-primer-c.md` |
| dolch-primer-d | dolch-primer-d-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-primer-d.md` |
| dolch-second-grade-a | dolch-second-grade-a-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-second-grade-a.md` |
| dolch-second-grade-b | dolch-second-grade-b-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-second-grade-b.md` |
| dolch-second-grade-c | dolch-second-grade-c-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-second-grade-c.md` |
| dolch-second-grade-d | dolch-second-grade-d-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-second-grade-d.md` |
| dolch-third-grade-a | dolch-third-grade-a-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-third-grade-a.md` |
| dolch-third-grade-b | dolch-third-grade-b-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-third-grade-b.md` |
| dolch-third-grade-c | dolch-third-grade-c-sight-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/dolch-third-grade-c.md` |
| dr-blend-words | dr-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/dr-blend-words.md` |
| fl-blend-words | fl-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/fl-blend-words.md` |
| fr-blend-words | fr-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/fr-blend-words.md` |
| ft-final-blend-words | ft-final-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/ft-final-blend-words.md` |
| gl-blend-words | gl-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/gl-blend-words.md` |
| gr-blend-words | gr-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/gr-blend-words.md` |
| grade-1-beginning-blend-practice | 1st-grade-beginning-blend-practice | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/grade-1-beginning-blend-practice.md` |
| grade-1-consonant-digraph-practice | 1st-grade-consonant-digraph-practice | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/grade-1-consonant-digraph-practice.md` |
| grade-1-describing-words | 1st-grade-describing-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/1st-grade-describing-words.md` |
| grade-1-ending-blend-practice | 1st-grade-ending-blend-practice | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/grade-1-ending-blend-practice.md` |
| grade-1-five-senses-words | grade-1-five-senses-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/grade-1-five-senses-words.md` |
| grade-1-heart-word-practice | 1st-grade-heart-word-practice | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/grade-1-heart-word-practice.md` |
| grade-1-heart-words | 1st-grade-heart-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/grade-1-heart-words.md` |
| grade-1-heart-words-part-1 | 1st-grade-heart-words-part-1 | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/grade-1-heart-words-part-1.md` |
| grade-1-heart-words-part-2 | 1st-grade-heart-words-part-2 | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/grade-1-heart-words-part-2.md` |
| grade-1-heart-words-part-3 | 1st-grade-heart-words-part-3 | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/grade-1-heart-words-part-3.md` |
| grade-1-list-01 | 1st-grade-everyday-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/1st-grade-everyday-words.md` |
| grade-1-list-02 | 1st-grade-action-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/1st-grade-action-words.md` |
| grade-1-long-e-vowel-teams | 1st-grade-long-e-vowel-teams | phonics | Unresolved | `src/content/spelling-lists/phonics/grade-1-long-e-vowel-teams.md` |
| grade-1-r-controlled-er-ir-ur | 1st-grade-r-controlled-er-ir-ur | phonics | Unresolved | `src/content/spelling-lists/phonics/grade-1-r-controlled-er-ir-ur.md` |
| grade-1-r-controlled-vowel-practice | 1st-grade-r-controlled-vowel-practice | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/grade-1-r-controlled-vowel-practice.md` |
| grade-1-short-vowel-practice | 1st-grade-short-vowel-practice | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/grade-1-short-vowel-practice.md` |
| grade-1-silent-e-practice | 1st-grade-silent-e-practice | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/grade-1-silent-e-practice.md` |
| grade-1-tch-dge-practice | 1st-grade-tch-dge-practice | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/grade-1-tch-dge-practice.md` |
| grade-1-vowel-team-practice | 1st-grade-vowel-team-practice | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/grade-1-vowel-team-practice.md` |
| grade-2-comparatives-er-est | 2nd-grade-comparatives-er-est | grade-level | Unresolved | `src/content/spelling-lists/grade-level/2nd-grade-comparatives-er-est.md` |
| grade-2-describing-words | 2nd-grade-describing-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/2nd-grade-describing-words.md` |
| grade-2-homophones | 2nd-grade-homophones | grade-level | Unresolved | `src/content/spelling-lists/grade-level/2nd-grade-homophones.md` |
| grade-2-list-01 | 2nd-grade-everyday-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/2nd-grade-everyday-words.md` |
| grade-2-list-03 | 2nd-grade-action-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/2nd-grade-action-words.md` |
| grade-2-prefixes-un-re | 2nd-grade-prefixes-un-re | grade-level | Unresolved | `src/content/spelling-lists/grade-level/2nd-grade-prefixes-un-re.md` |
| grade-2-regular-plurals | 2nd-grade-regular-plurals | grade-level | Unresolved | `src/content/spelling-lists/grade-level/2nd-grade-regular-plurals.md` |
| grade-2-suffixes-ful-less | 2nd-grade-suffixes-ful-less | grade-level | Unresolved | `src/content/spelling-lists/grade-level/2nd-grade-suffixes-ful-less.md` |
| grade-3-changing-y-to-i | 3rd-grade-changing-y-to-i | grade-level | Unresolved | `src/content/spelling-lists/grade-level/3rd-grade-changing-y-to-i.md` |
| grade-3-doubling-final-consonants | 3rd-grade-doubling-final-consonants | grade-level | Unresolved | `src/content/spelling-lists/grade-level/3rd-grade-doubling-final-consonants.md` |
| grade-3-list-01 | 3rd-grade-everyday-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/3rd-grade-everyday-words.md` |
| grade-3-list-02 | 3rd-grade-describing-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/3rd-grade-describing-words.md` |
| grade-3-reading-writing-words | 3rd-grade-reading-writing-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/3rd-grade-reading-writing-words.md` |
| grade-4-final-stable-syllables | 4th-grade-final-stable-syllables | grade-level | Focused-component legacy-role exception | `src/content/spelling-lists/grade-level/4th-grade-final-stable-syllables.md` |
| grade-4-list-01 | 4th-grade-everyday-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/4th-grade-everyday-words.md` |
| grade-4-list-02 | 4th-grade-academic-content-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/4th-grade-community-words.md` |
| grade-4-reading-writing-words | 4th-grade-reading-writing-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/4th-grade-reading-writing-words.md` |
| grade-5-academic-words | 5th-grade-academic-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/5th-grade-academic-words.md` |
| grade-5-list-01 | 5th-grade-everyday-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/5th-grade-everyday-words.md` |
| grade-5-math-vocabulary | 5th-grade-math-vocabulary | grade-level | Unresolved | `src/content/spelling-lists/grade-level/5th-grade-math-vocabulary.md` |
| grade-5-opinion-argument-words | 5th-grade-opinion-argument-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/5th-grade-opinion-argument-words.md` |
| grade-5-reading-writing-words | 5th-grade-reading-writing-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/5th-grade-reading-writing-words.md` |
| grade-5-science-nature-words | 5th-grade-science-nature-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/5th-grade-science-nature-words.md` |
| grade-5-spelling-rules | 5th-grade-spelling-rules | grade-level | Focused-component legacy-role exception | `src/content/spelling-lists/grade-level/5th-grade-spelling-rules.md` |
| kindergarten-ck-ending-words | kindergarten-ck-ending-words | phonics | Unresolved | `src/content/spelling-lists/phonics/kindergarten-ck-ending-words.md` |
| kindergarten-double-consonants | kindergarten-double-consonants | phonics | Unresolved | `src/content/spelling-lists/phonics/kindergarten-double-consonants.md` |
| kindergarten-heart-words | kindergarten-heart-words | sight-words | Deprecated/legacy | `src/content/spelling-lists/sight-words/kindergarten-heart-words.md` |
| kindergarten-number-color-words | kindergarten-number-color-words | grade-level | Unresolved | `src/content/spelling-lists/grade-level/kindergarten-number-color-words.md` |
| ld-final-blend-words | ld-final-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/ld-final-blend-words.md` |
| lk-final-blend-words | lk-final-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/lk-final-blend-words.md` |
| lt-final-blend-words | lt-final-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/lt-final-blend-words.md` |
| mp-final-blend-words | mp-final-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/mp-final-blend-words.md` |
| nd-final-blend-words | nd-final-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/nd-final-blend-words.md` |
| ng-final-blend-words | ng-final-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/ng-final-blend-words.md` |
| nk-final-blend-words | nk-final-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/nk-final-blend-words.md` |
| nt-final-blend-words | nt-final-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/nt-final-blend-words.md` |
| pl-blend-words | pl-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/pl-blend-words.md` |
| pr-blend-words | pr-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/pr-blend-words.md` |
| sk-final-blend-words | sk-final-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/sk-final-blend-words.md` |
| sl-blend-words | sl-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/sl-blend-words.md` |
| sm-blend-words | sm-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/sm-blend-words.md` |
| sn-blend-words | sn-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/sn-blend-words.md` |
| sp-blend-words | sp-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/sp-blend-words.md` |
| st-blend-words | st-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/st-blend-words.md` |
| st-final-blend-words | st-final-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/st-final-blend-words.md` |
| sw-blend-words | sw-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/sw-blend-words.md` |
| tch-dge-ending-words | tch-dge-ending-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/tch-dge-ending-words.md` |
| tier-2-greek-latin-roots | tier-2-greek-latin-roots | grade-level | Unresolved | `src/content/spelling-lists/grade-level/tier-2-greek-latin-roots.md` |
| tr-blend-words | tr-blend-words | phonics | Deprecated/legacy | `src/content/spelling-lists/phonics/tr-blend-words.md` |

Some ids classified above as "Unresolved" (e.g. `grade-1-long-e-vowel-teams`, `grade-1-r-controlled-er-ir-ur`,
`grade-2-homophones`, `grade-2-prefixes-un-re`, `tier-2-greek-latin-roots`) are not yet listed by name in
`docs/content/inventory/untagged-and-data-quality.md` at the time this inventory was produced; they are
included here because they are neither a grade-curriculum id nor a canonical Skill id and have no other
documented classification. Reconciling this doc against `untagged-and-data-quality.md` is a follow-up for
a future content-classification pass, not this PR.

## Related `spelling-collections` entries (not `spelling-lists`, tracked separately)

12 published `spelling-collections` entries exist. 6 are the "Common Words" gateway collections
(`kindergarten-common-words`, `grade-1-common-words` … `grade-5-common-words`), intentionally excluded
from static generation (see `GATEWAY_COLLECTION_IDS` in `src/lib/content/canonicalGradeRoutes.ts`) since
each grade's numbered High-Frequency Words sets now render directly on the Grade Hub. The other 6 are
Dolch collections (`dolch-first-grade`, `dolch-nouns`, `dolch-pre-primer`, `dolch-primer`,
`dolch-second-grade`, `dolch-third-grade`), unaffected by this PR, still rendering at
`/spelling-lists/collections/{urlSlug}`.
