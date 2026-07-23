# Public URL Architecture

**Status:** approved contract and first migration slice; route implementation awaits approval. This is the authoritative contract for public routes, canonical URLs, redirects, structured data, internal links, and sitemap inclusion. It preserves stable content IDs and does not change curriculum or repository organization.

## Contract

Public identity, not `src/content/spelling-lists/{category}/`, determines a canonical path. The resolver is keyed by stable `id`; `category`, folder, filename, and existing `urlSlug` are not a public-route contract. Canonical namespaces are `/spelling-lists/{grade}/{slug}/` for grade-owned pages, `/spelling-lists/skills/{slug}/` for reusable Skills, and `/spelling-lists/collections/{slug}/` for named collections. `/spelling-lists/sight-words/` remains a temporary browse hub only. `/spelling-lists/practice/` is reserved and unused.

Reserved first segments are `kindergarten`, `grade-1` through `grade-5`, `skills`, `collections`, `sight-words`, `challenge`, and `practice`. Validation must reject duplicate canonical paths, reserved-name conflicts, duplicate `{grade}/{slug}` pairs, and an old path that is also generated as canonical HTML. Grade hubs are:

| ID | Canonical URL | Old URL | Redirect |
| --- | --- | --- | --- |
| `grade-hub-k` | `/spelling-lists/kindergarten/` | same | No |
| `grade-hub-1` | `/spelling-lists/grade-1/` | `/spelling-lists/1st-grade/` | 301 |
| `grade-hub-2` | `/spelling-lists/grade-2/` | `/spelling-lists/2nd-grade/` | 301 |
| `grade-hub-3` | `/spelling-lists/grade-3/` | `/spelling-lists/3rd-grade/` | 301 |
| `grade-hub-4` | `/spelling-lists/grade-4/` | `/spelling-lists/4th-grade/` | 301 |
| `grade-hub-5` | `/spelling-lists/grade-5/` | `/spelling-lists/5th-grade/` | 301 |

## Final Kindergarten routes

These title-facing public slugs are intentional: `mixed-cvc-review` and `digraph-words` match visible card titles and avoid internal technical wording. The remaining slugs are already clear parent language.

| Stable ID | Current URL | Canonical URL | Role | Redirect |
| --- | --- | --- | --- | --- |
| `kindergarten-first-words` | `/spelling-lists/grade-level/kindergarten-first-words/` | `/spelling-lists/kindergarten/first-words/` | Grade Unit | 301 |
| `kindergarten-short-a-words` | `/spelling-lists/phonics/kindergarten-short-a-words/` | `/spelling-lists/kindergarten/short-a-words/` | Grade Unit | 301 |
| `kindergarten-short-i-words` | `/spelling-lists/phonics/kindergarten-short-i-words/` | `/spelling-lists/kindergarten/short-i-words/` | Grade Unit | 301 |
| `kindergarten-short-o-words` | `/spelling-lists/phonics/kindergarten-short-o-words/` | `/spelling-lists/kindergarten/short-o-words/` | Grade Unit | 301 |
| `kindergarten-short-u-words` | `/spelling-lists/phonics/kindergarten-short-u-words/` | `/spelling-lists/kindergarten/short-u-words/` | Grade Unit | 301 |
| `kindergarten-short-e-words` | `/spelling-lists/phonics/kindergarten-short-e-words/` | `/spelling-lists/kindergarten/short-e-words/` | Grade Unit | 301 |
| `kindergarten-mixed-vowel-review` | `/spelling-lists/phonics/kindergarten-mixed-vowel-review/` | `/spelling-lists/kindergarten/mixed-cvc-review/` | Grade Unit | 301 |
| `kindergarten-consonant-digraphs` | `/spelling-lists/phonics/kindergarten-consonant-digraphs/` | `/spelling-lists/kindergarten/digraph-words/` | Grade Unit | 301 |
| `kindergarten-common-words` | `/spelling-lists/collections/kindergarten-common-words/` | `/spelling-lists/collections/kindergarten-high-frequency-words/` | Collection | 301 |
| `kindergarten-common-words-1` | `/spelling-lists/sight-words/kindergarten-common-words-1/` | `/spelling-lists/kindergarten/high-frequency-words-1/` | High-Frequency set | 301 |
| `kindergarten-common-words-2` | `/spelling-lists/sight-words/kindergarten-common-words-2/` | `/spelling-lists/kindergarten/high-frequency-words-2/` | High-Frequency set | 301 |
| `kindergarten-common-words-3` | `/spelling-lists/sight-words/kindergarten-common-words-3/` | `/spelling-lists/kindergarten/high-frequency-words-3/` | High-Frequency set | 301 |
| `kindergarten-common-words-4` | `/spelling-lists/sight-words/kindergarten-common-words-4/` | `/spelling-lists/kindergarten/high-frequency-words-4/` | High-Frequency set | 301 |
| `kindergarten-number-words` | `/spelling-lists/grade-level/kindergarten-number-words/` | `/spelling-lists/kindergarten/number-words/` | Grade topic | 301 |
| `kindergarten-color-words` | `/spelling-lists/grade-level/kindergarten-color-words/` | `/spelling-lists/kindergarten/color-words/` | Grade topic | 301 |
| `kindergarten-animal-words` | `/spelling-lists/grade-level/kindergarten-animal-words/` | `/spelling-lists/kindergarten/animal-words/` | Grade topic | 301 |

`kindergarten-number-color-words` is compatibility-only. Its existing URL `/spelling-lists/grade-level/kindergarten-number-color-words/` permanently redirects to `/spelling-lists/kindergarten/`; the Kindergarten hub is the closest complete replacement because it links to both Number Words and Color Words. There is no `/spelling-lists/kindergarten/number-color-words/` route.

## Final visible Grade 1 Grade Unit routes

All twelve direct destinations in `GRADE_1_HUB_SECTIONS` are approved for the first migration even where their current frontmatter has not yet been assigned `contentRole: grade-unit`. Related helper and focused child pages remain deferred.

| Stable ID | Current URL | Canonical URL |
| --- | --- | --- |
| `grade-1-cvc-short-vowels-c-k-rule` | `/spelling-lists/phonics/1st-grade-cvc-short-vowels-c-k-rule/` | `/spelling-lists/grade-1/short-vowel-review-c-k-spelling/` |
| `grade-1-floss-rule` | `/spelling-lists/phonics/1st-grade-floss-rule/` | `/spelling-lists/grade-1/floss-rule/` |
| `grade-1-consonant-digraphs-final-ck` | `/spelling-lists/phonics/1st-grade-consonant-digraphs-final-ck/` | `/spelling-lists/grade-1/digraphs-final-ck/` |
| `grade-1-beginning-consonant-blends` | `/spelling-lists/phonics/1st-grade-beginning-consonant-blends/` | `/spelling-lists/grade-1/beginning-consonant-blends/` |
| `grade-1-ending-consonant-blends` | `/spelling-lists/phonics/1st-grade-ending-consonant-blends/` | `/spelling-lists/grade-1/ending-consonant-blends/` |
| `grade-1-long-vowels-silent-e` | `/spelling-lists/phonics/1st-grade-long-vowels-silent-e/` | `/spelling-lists/grade-1/long-vowels-silent-e/` |
| `grade-1-open-syllables-final-y` | `/spelling-lists/phonics/1st-grade-open-syllables-final-y/` | `/spelling-lists/grade-1/open-syllables-final-y/` |
| `grade-1-long-a-long-o-vowel-teams` | `/spelling-lists/phonics/1st-grade-long-a-long-o-vowel-teams/` | `/spelling-lists/grade-1/long-vowel-teams/` |
| `grade-1-inflectional-endings-s-es` | `/spelling-lists/phonics/1st-grade-inflectional-endings-s-es/` | `/spelling-lists/grade-1/plural-endings-s-es/` |
| `grade-1-inflectional-endings-ed-ing` | `/spelling-lists/phonics/1st-grade-inflectional-endings-ed-ing/` | `/spelling-lists/grade-1/verb-endings-ed-ing/` |
| `grade-1-r-controlled-ar-or` | `/spelling-lists/phonics/1st-grade-r-controlled-ar-or/` | `/spelling-lists/grade-1/r-controlled-vowels/` |
| `grade-1-tch-dge-ending-rules` | `/spelling-lists/phonics/1st-grade-tch-dge-ending-rules/` | `/spelling-lists/grade-1/final-tch-dge/` |

Grade 1 High-Frequency Words use `/spelling-lists/collections/grade-1-high-frequency-words/`, `/spelling-lists/grade-1/high-frequency-words-1/`, and `/spelling-lists/grade-1/high-frequency-words-2/`. Stable IDs remain `grade-1-common-words`, `grade-1-common-words-1`, and `grade-1-common-words-2`; their existing collection and sight-word URLs permanently redirect.

## First migration inventory

The first executable slice contains **57 records**: 6 Grade Hubs, 16 Kindergarten records above, 12 Grade 1 Core Grade Units, 3 Grade 1 High-Frequency records, 3 Grade 1 topics, and 17 Skills. Every record is keyed by stable ID. Internal-link consumers are Grade Hub cards, hub `ItemList` JSON-LD, related/prerequisite/next lists, collections, the Skills index and placements, and Learning Paths.

| Stable IDs | Current URL(s) | Approved canonical URL(s) | Role | Redirect | Included |
| --- | --- | --- | --- | --- | --- |
| `grade-hub-k`, `grade-hub-1`, `grade-hub-2`, `grade-hub-3`, `grade-hub-4`, `grade-hub-5` | table above | table above | Grade Hubs | as shown | Yes |
| all 16 Kindergarten IDs in the preceding table | table above | table above | as shown | 301 | Yes |
| all 12 Grade 1 IDs in the preceding table | table above | table above | Grade Units | 301 | Yes |
| `grade-1-common-words` | `/spelling-lists/collections/grade-1-common-words/` | `/spelling-lists/collections/grade-1-high-frequency-words/` | Collection | 301 | Yes |
| `grade-1-common-words-1` | `/spelling-lists/sight-words/grade-1-common-words-1/` | `/spelling-lists/grade-1/high-frequency-words-1/` | High-Frequency set | 301 | Yes |
| `grade-1-common-words-2` | `/spelling-lists/sight-words/grade-1-common-words-2/` | `/spelling-lists/grade-1/high-frequency-words-2/` | High-Frequency set | 301 | Yes |
| `grade-1-list-01` | `/spelling-lists/grade-level/1st-grade-everyday-words/` | `/spelling-lists/grade-1/everyday-words/` | Grade topic | 301 | Yes |
| `grade-1-list-02` | `/spelling-lists/grade-level/1st-grade-action-words/` | `/spelling-lists/grade-1/action-words/` | Grade topic | 301 | Yes |
| `grade-1-describing-words` | `/spelling-lists/grade-level/1st-grade-describing-words/` | `/spelling-lists/grade-1/describing-words/` | Grade topic | 301 | Yes |
| `short-a-words` | `/spelling-lists/phonics/short-a-words/` | `/spelling-lists/skills/short-a-words/` | Skill | 301 | Yes |
| `short-e-words` | `/spelling-lists/phonics/short-e-words/` | `/spelling-lists/skills/short-e-words/` | Skill | 301 | Yes |
| `short-i-words` | `/spelling-lists/phonics/short-i-words/` | `/spelling-lists/skills/short-i-words/` | Skill | 301 | Yes |
| `short-o-words` | `/spelling-lists/phonics/short-o-words/` | `/spelling-lists/skills/short-o-words/` | Skill | 301 | Yes |
| `short-u-words` | `/spelling-lists/phonics/short-u-words/` | `/spelling-lists/skills/short-u-words/` | Skill | 301 | Yes |
| `digraph-ch-words` | `/spelling-lists/phonics/digraph-ch-words/` | `/spelling-lists/skills/digraph-ch-words/` | Skill | 301 | Yes |
| `digraph-sh-words` | `/spelling-lists/phonics/digraph-sh-words/` | `/spelling-lists/skills/digraph-sh-words/` | Skill | 301 | Yes |
| `digraph-th-words` | `/spelling-lists/phonics/digraph-th-words/` | `/spelling-lists/skills/digraph-th-words/` | Skill | 301 | Yes |
| `digraph-wh-words` | `/spelling-lists/phonics/digraph-wh-words/` | `/spelling-lists/skills/digraph-wh-words/` | Skill | 301 | Yes |
| `silent-e-long-a` | `/spelling-lists/phonics/silent-e-long-a/` | `/spelling-lists/skills/silent-e-long-a/` | Skill | 301 | Yes |
| `silent-e-long-e` | `/spelling-lists/phonics/silent-e-long-e/` | `/spelling-lists/skills/silent-e-long-e/` | Skill | 301 | Yes |
| `silent-e-long-i` | `/spelling-lists/phonics/silent-e-long-i/` | `/spelling-lists/skills/silent-e-long-i/` | Skill | 301 | Yes |
| `silent-e-long-o` | `/spelling-lists/phonics/silent-e-long-o/` | `/spelling-lists/skills/silent-e-long-o/` | Skill | 301 | Yes |
| `silent-e-long-u` | `/spelling-lists/phonics/silent-e-long-u/` | `/spelling-lists/skills/silent-e-long-u/` | Skill | 301 | Yes |
| `vowel-teams-ai-ay` | `/spelling-lists/phonics/vowel-teams-ai-ay/` | `/spelling-lists/skills/vowel-teams-ai-ay/` | Skill | 301 | Yes |
| `vowel-teams-ee-ea` | `/spelling-lists/phonics/vowel-teams-ee-ea/` | `/spelling-lists/skills/vowel-teams-ee-ea/` | Skill | 301 | Yes |
| `vowel-teams-oa-ow` | `/spelling-lists/phonics/vowel-teams-oa-ow/` | `/spelling-lists/skills/vowel-teams-oa-ow/` | Skill | 301 | Yes |

## Deferred inventory and transition

The **115 published records not in the first slice** stay at their existing URLs, retain their current canonical URLs, and remain discoverable. This includes unresolved legacy phonics and focused children, Dolch and other legacy Sight Words, and all later-grade details. No deferred item receives a speculative `/practice/` URL. The resolver has `canonical` records for the 57 migrated IDs and an explicit `legacy` fallback for every other published ID; only the fallback may use the current category path.

## Exact implementation design (future task)

1. Create `src/lib/content/publicRoutes.ts`: typed `PublicRole`, `PublicRoute`, ID-keyed first-slice manifest, `getCanonicalPath(id)`, `getLegacyPaths(id)`, `getBreadcrumbItems(id)`, collision validation, and the legacy fallback.
2. Modify `src/lib/content/gradeConfig.ts`, `src/lib/content/spellingSkills.ts`, and `src/lib/content/gradeHubCards.ts` to consume resolver paths, not hand-built category URLs.
3. Replace the canonical generation in `src/pages/spelling-lists/[category]/[slug].astro` with canonical-only routing (new `src/pages/spelling-lists/[...route].astro` or equivalent role templates). Its `getStaticPaths()` must emit migrated canonical routes only; migrated legacy paths must produce no HTML.
4. Keep a legacy fallback detail route only for deferred IDs. Modify `src/pages/spelling-lists/[gradeSlug].astro`, `src/pages/spelling-lists/collections/[slug].astro`, category hubs, `src/components/GradeUnitWorldPage.astro`, and `src/lib/content/learningPaths.ts` to use resolver links.
5. Generate `netlify.toml` 301 entries from the manifest (or a checked-in generated redirects file), including every old first-slice URL and the retired Number and Color page.
6. Modify `src/layouts/Layout.astro` and all page JSON-LD producers so canonical, Open Graph URL, breadcrumbs, and `ItemList` URLs come from the resolver. Add sitemap configuration/generation in `astro.config.mjs` and its package dependency, sourcing canonical indexable routes only.
7. Add `src/lib/content/publicRoutes.test.ts` plus route-output/build tests. Verify: one canonical URL per migrated ID; each old URL 301s; no redirected legacy HTML exists; deferred legacy pages still render; internal links contain no migrated legacy URL; breadcrumbs/JSON-LD are canonical; sitemap is canonical-only; and every collision fails validation.

The sole remaining implementation blocker is approval of the exact canonical-route template strategy in step 3 (catch-all versus role-specific templates). It does not require reclassifying deferred pages and does not block the route contract or first-slice manifest.
