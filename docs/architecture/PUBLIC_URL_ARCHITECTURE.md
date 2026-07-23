# Public URL Architecture

**Status:** Approved design; route migration is pending a separate implementation approval.  
**Authority:** This document is the authoritative public-route contract for spellingwords.app. It governs public paths, canonical URLs, redirects, structured-data URLs, sitemap inclusion, and contributor routing decisions. It does not change curriculum, stable content IDs, or the repository's content folders.

## 1. Public identity, not storage taxonomy

`src/content/spelling-lists/{category}/` is an internal editorial/storage organization. Values such as `phonics`, `grade-level`, and `sight-words` must not determine a list's canonical public URL.

A public path is chosen from a page's public role and audience-facing identity:

1. named Collection;
2. Grade Hub;
3. grade-owned Grade Unit, high-frequency-word set, or grade-specific topic;
4. reusable Skill;
5. approved grade-neutral standalone practice page; or
6. Challenge or another separately approved public identity.

The resolver is keyed by stable content `id`. `urlSlug`, folder name, `category`, and filename are inputs or legacy facts; none is independently the public-route contract. Public slugs may differ from stable IDs.

## 2. Reserved namespaces and collision rules

The following first-level segments under `/spelling-lists/` are permanently reserved:

| Namespace | Canonical pattern | Purpose |
| --- | --- | --- |
| Library | `/spelling-lists/` | Parent-facing library landing page. |
| Grades | `/spelling-lists/{grade}/` and `/spelling-lists/{grade}/{slug}/` | Grade hubs and grade-owned pages. |
| Skills | `/spelling-lists/skills/` and `/spelling-lists/skills/{slug}/` | Grade-neutral reusable Skills. |
| Collections | `/spelling-lists/collections/` and `/spelling-lists/collections/{slug}/` | Named multi-list editorial collections. |
| Sight Words | `/spelling-lists/sight-words/` | Temporary browse hub only; not the canonical home for the migrated high-frequency sets. |
| Challenge | `/spelling-lists/challenge/` and `/spelling-lists/challenge/{slug}/` | The approved Challenge product identity. |
| Practice | `/spelling-lists/practice/{slug}/` | Reserved, but not generally approved. It may contain only individually approved grade-neutral standalone practice pages. |

The only valid `{grade}` values are `kindergarten`, `grade-1`, `grade-2`, `grade-3`, `grade-4`, and `grade-5`. No content slug, Skill slug, collection slug, or future public role may claim one of the reserved namespace names.

Collision checks must reject: duplicate canonical paths; a public slug that equals a reserved first-level segment; a second page using the same `{grade}/{slug}` pair; and a page that would have both a canonical route and a generated legacy category route. A Grade Unit and a reusable Skill may share a final slug only because their namespaces differ: `/spelling-lists/kindergarten/short-a-words/` and `/spelling-lists/skills/short-a-words/` are intentionally distinct.

## 3. Approved canonical routes

### Grade hubs

| Stable grade | Canonical hub | Legacy hub to redirect |
| --- | --- | --- |
| K | `/spelling-lists/kindergarten/` | none |
| 1 | `/spelling-lists/grade-1/` | `/spelling-lists/1st-grade/` |
| 2 | `/spelling-lists/grade-2/` | `/spelling-lists/2nd-grade/` |
| 3 | `/spelling-lists/grade-3/` | `/spelling-lists/3rd-grade/` |
| 4 | `/spelling-lists/grade-4/` | `/spelling-lists/4th-grade/` |
| 5 | `/spelling-lists/grade-5/` | `/spelling-lists/5th-grade/` |

### Grade-owned content

Canonical form: `/spelling-lists/{grade}/{public-slug}/`. This is used for approved Grade Units, grade-specific topics, and grade-owned high-frequency-word sets. It is not a claim that every list currently tagged with that grade has been approved for migration; unresolved pages remain at their legacy URL until individually classified.

The approved Kindergarten high-frequency collection and sets use the current parent-facing terminology:

| Stable ID | Legacy URL | Canonical URL |
| --- | --- | --- |
| `kindergarten-common-words` collection | `/spelling-lists/collections/kindergarten-common-words/` | `/spelling-lists/collections/kindergarten-high-frequency-words/` |
| `kindergarten-common-words-1` | `/spelling-lists/sight-words/kindergarten-common-words-1/` | `/spelling-lists/kindergarten/high-frequency-words-1/` |
| `kindergarten-common-words-2` | `/spelling-lists/sight-words/kindergarten-common-words-2/` | `/spelling-lists/kindergarten/high-frequency-words-2/` |
| `kindergarten-common-words-3` | `/spelling-lists/sight-words/kindergarten-common-words-3/` | `/spelling-lists/kindergarten/high-frequency-words-3/` |
| `kindergarten-common-words-4` | `/spelling-lists/sight-words/kindergarten-common-words-4/` | `/spelling-lists/kindergarten/high-frequency-words-4/` |

### Reusable Skills

Canonical form: `/spelling-lists/skills/{skill-slug}/`. All currently published `contentRole: skill` pages are approved for this family. The full migration map is below.

| Stable ID | Legacy URL | Canonical URL |
| --- | --- | --- |
| `short-a-words` | `/spelling-lists/phonics/short-a-words/` | `/spelling-lists/skills/short-a-words/` |
| `short-e-words` | `/spelling-lists/phonics/short-e-words/` | `/spelling-lists/skills/short-e-words/` |
| `short-i-words` | `/spelling-lists/phonics/short-i-words/` | `/spelling-lists/skills/short-i-words/` |
| `short-o-words` | `/spelling-lists/phonics/short-o-words/` | `/spelling-lists/skills/short-o-words/` |
| `short-u-words` | `/spelling-lists/phonics/short-u-words/` | `/spelling-lists/skills/short-u-words/` |
| `digraph-ch-words` | `/spelling-lists/phonics/digraph-ch-words/` | `/spelling-lists/skills/digraph-ch-words/` |
| `digraph-sh-words` | `/spelling-lists/phonics/digraph-sh-words/` | `/spelling-lists/skills/digraph-sh-words/` |
| `digraph-th-words` | `/spelling-lists/phonics/digraph-th-words/` | `/spelling-lists/skills/digraph-th-words/` |
| `digraph-wh-words` | `/spelling-lists/phonics/digraph-wh-words/` | `/spelling-lists/skills/digraph-wh-words/` |
| `silent-e-long-a` | `/spelling-lists/phonics/silent-e-long-a/` | `/spelling-lists/skills/silent-e-long-a/` |
| `silent-e-long-e` | `/spelling-lists/phonics/silent-e-long-e/` | `/spelling-lists/skills/silent-e-long-e/` |
| `silent-e-long-i` | `/spelling-lists/phonics/silent-e-long-i/` | `/spelling-lists/skills/silent-e-long-i/` |
| `silent-e-long-o` | `/spelling-lists/phonics/silent-e-long-o/` | `/spelling-lists/skills/silent-e-long-o/` |
| `silent-e-long-u` | `/spelling-lists/phonics/silent-e-long-u/` | `/spelling-lists/skills/silent-e-long-u/` |
| `vowel-teams-ai-ay` | `/spelling-lists/phonics/vowel-teams-ai-ay/` | `/spelling-lists/skills/vowel-teams-ai-ay/` |
| `vowel-teams-ee-ea` | `/spelling-lists/phonics/vowel-teams-ee-ea/` | `/spelling-lists/skills/vowel-teams-ee-ea/` |
| `vowel-teams-oa-ow` | `/spelling-lists/phonics/vowel-teams-oa-ow/` | `/spelling-lists/skills/vowel-teams-oa-ow/` |

### Collections

Canonical form: `/spelling-lists/collections/{collection-slug}/`. The only approved collection slug rename is the Kindergarten collection shown above. The other currently published collections retain their existing public slugs:

`dolch-first-grade-sight-words`, `dolch-noun-words`, `dolch-pre-primer-sight-words`, `dolch-primer-sight-words`, `dolch-second-grade-sight-words`, `dolch-third-grade-sight-words`, and `grade-1-common-words`.

## 4. Complete approved Kindergarten and Grade 1 map

The following is the complete currently published K/Grade 1 inventory. `Approved canonical` means it is in the approved core migration. `Skill canonical` means it is one of the approved reusable Skills. `Pending classification` explicitly has no new public route in this migration.

| Stable ID(s) | Current route pattern | Disposition / canonical route |
| --- | --- | --- |
| `kindergarten-first-words` | `/spelling-lists/grade-level/kindergarten-first-words/` | Approved canonical: `/spelling-lists/kindergarten/first-words/`. |
| `kindergarten-short-a-words`, `kindergarten-short-e-words`, `kindergarten-short-i-words`, `kindergarten-short-o-words`, `kindergarten-short-u-words`, `kindergarten-mixed-vowel-review`, `kindergarten-consonant-digraphs` | `/spelling-lists/phonics/{current-urlSlug}/` | Approved Grade Units: `/spelling-lists/kindergarten/{short-a-words,short-e-words,short-i-words,short-o-words,short-u-words,mixed-vowel-review,consonant-digraphs}/`. |
| `kindergarten-ck-ending-words`, `kindergarten-double-consonants` | `/spelling-lists/phonics/{current-urlSlug}/` | Pending classification; no `/practice/` or grade route is approved yet. |
| `kindergarten-number-words`, `kindergarten-color-words`, `kindergarten-number-color-words` | `/spelling-lists/grade-level/{current-urlSlug}/` | Approved grade-specific topics: `/spelling-lists/kindergarten/{number-words,color-words,number-color-words}/`. |
| `kindergarten-animal-words` | `/spelling-lists/grade-level/kindergarten-animal-words/` | Approved grade-specific topic: `/spelling-lists/kindergarten/animal-words/`. |
| `kindergarten-describing-words`, `kindergarten-shape-words`, `kindergarten-family-words`, `kindergarten-school-words`, `kindergarten-body-words`, `kindergarten-feelings-words`, `kindergarten-food-words` | `/spelling-lists/grade-level/{current-urlSlug}/` | Existing 301s currently send these to the K hub. Preserve that decision; do not create new detail routes in this migration. |
| `kindergarten-common-words-1` through `kindergarten-common-words-4` | `/spelling-lists/sight-words/kindergarten-common-words-{1..4}/` | Approved canonical: `/spelling-lists/kindergarten/high-frequency-words-{1..4}/`. |
| `dolch-pre-primer-a` through `dolch-pre-primer-c` | `/spelling-lists/sight-words/dolch-pre-primer-{a..c}/` | Remain discoverable at current routes pending the separate Sight Words/Dolch review. |
| all 17 published reusable Skills listed in section 3 | `/spelling-lists/phonics/{skill-slug}/` | Skill canonical: `/spelling-lists/skills/{skill-slug}/`, regardless of their current Grade 1 metadata. |
| `1st-grade-action-words`, `1st-grade-describing-words`, `1st-grade-everyday-words` | `/spelling-lists/grade-level/{current-urlSlug}/` | Approved Grade 1 topics: `/spelling-lists/grade-1/{action-words,describing-words,everyday-words}/`. |
| `grade-1-beginning-consonant-blends`, `grade-1-ending-consonant-blends`, `grade-1-cvc-short-vowels-c-k-rule`, `grade-1-long-a-long-o-vowel-teams`, `grade-1-long-e-vowel-teams`, `grade-1-long-vowels-silent-e` | `/spelling-lists/phonics/{current-urlSlug}/` | Approved Grade Units: `/spelling-lists/grade-1/{beginning-consonant-blends,ending-consonant-blends,cvc-short-vowels-c-k-rule,long-a-long-o-vowel-teams,long-e-vowel-teams,long-vowels-silent-e}/`. |
| `grade-1-common-words-1`, `grade-1-common-words-2` | `/spelling-lists/sight-words/{current-urlSlug}/` | Approved grade-owned high-frequency sets: `/spelling-lists/grade-1/common-words-1/` and `/spelling-lists/grade-1/common-words-2/`. |
| `dolch-primer-a` through `dolch-primer-d`, `dolch-first-grade-a` through `dolch-first-grade-c`, `grade-1-heart-words-part-1` through `grade-1-heart-words-part-3` | `/spelling-lists/sight-words/{current-urlSlug}/` | Remain discoverable at current routes pending the separate Sight Words/Dolch review. |
| all remaining Grade 1 phonics legacy pages | `/spelling-lists/phonics/{current-urlSlug}/` | Pending the item-level classification in section 5; no new route is approved. |

## 5. Required `/practice/` classification before any route decision

`/spelling-lists/practice/` is reserved, not a catch-all. Every currently published legacy phonics page has been classified below. **None is approved for `/practice/` in this migration.** “Focused child page” means it should be associated with a broader Skill if and when that parent Skill/product relationship is formally approved; it does not itself authorize a public route change.

| Pages | Classification | Route decision now |
| --- | --- | --- |
| `bl-blend-words`, `br-blend-words`, `cl-blend-words`, `cr-blend-words`, `dr-blend-words`, `fl-blend-words`, `fr-blend-words`, `gl-blend-words`, `gr-blend-words`, `pl-blend-words`, `pr-blend-words`, `sl-blend-words`, `sm-blend-words`, `sn-blend-words`, `sp-blend-words`, `st-blend-words`, `sw-blend-words`, `tr-blend-words` | Focused child pages associated with the future/parent **Consonant Blends** Skill family. | Pending; not `/practice/`. |
| `ld-final-blend-words`, `nd-final-blend-words`, `ng-final-blend-words`, `nk-final-blend-words`, `nt-final-blend-words`, `st-final-blend-words`, `ft-final-blend-words`, `lk-final-blend-words`, `lt-final-blend-words`, `mp-final-blend-words`, `sk-final-blend-words` | Focused child pages associated with the future/parent **Consonant Blends** Skill family. | Pending; not `/practice/`. |
| `grade-1-beginning-blend-practice`, `grade-1-ending-blend-practice` | Grade-specific pages. | Pending a Grade 1 roadmap/product decision; not `/practice/`. |
| `grade-1-consonant-digraph-practice`, `grade-1-consonant-digraphs-final-ck` | Grade-specific pages associated with the existing Consonant Digraphs Skills and/or a future spelling-pattern family. | Pending; not `/practice/`. |
| `grade-1-short-vowel-practice`, `grade-1-silent-e-practice`, `grade-1-vowel-team-practice` | Grade-specific child pages associated with approved reusable Skill families. | Pending; not `/practice/`. |
| `grade-1-cvc-short-vowels-c-k-rule`, `grade-1-floss-rule`, `grade-1-tch-dge-ending-rules`, `grade-1-tch-dge-practice` | Grade-specific pages associated with the future **One-Syllable Spelling Patterns** family. | Pending; not `/practice/`. |
| `grade-1-inflectional-endings-ed-ing`, `grade-1-inflectional-endings-s-es` | Grade-specific pages associated with the future **Word Endings and Suffixes** family. | Pending; not `/practice/`. |
| `grade-1-open-syllables-final-y` | Grade-specific page associated with the future **Syllables and Multisyllabic Words** family. | Pending; not `/practice/`. |
| `grade-1-r-controlled-ar-or`, `grade-1-r-controlled-er-ir-ur`, `grade-1-r-controlled-vowel-practice` | Grade-specific pages associated with the future **R-Controlled Vowels** family. | Pending; not `/practice/`. |
| `grade-1-heart-words`, `grade-1-heart-word-practice` | Grade-specific parallel high-frequency/irregular-word content. | Pending the separate Sight Words review; not `/practice/`. |
| `kindergarten-ck-ending-words`, `kindergarten-double-consonants` | Unresolved: live Kindergarten support pages, but curriculum documentation calls their core-roadmap placement non-canonical. | Pending; not `/practice/`. |
| `c-k-ck-words`, `tch-dge-ending-words` | Unresolved: may be focused Skill pages or children of One-Syllable Spelling Patterns; current documentation explicitly defers autonomy review. | Pending; not `/practice/`. |
| `r-controlled-ar`, `r-controlled-or`, `r-controlled-er-ir-ur` | Unresolved: strong candidates for focused reusable Skills, but not currently assigned `contentRole: skill`. | Pending; not `/practice/`. |
| `vowel-teams-oi-oy`, `vowel-teams-ou-ow` | Unresolved: possible focused Skills versus filters within Vowel Teams/Diphthongs. | Pending; not `/practice/`. |

There are currently **no confirmed genuinely grade-neutral standalone practice pages**. A page may enter `/practice/` only after an item-level decision records why it is neither a Grade Unit, grade-specific page, reusable Skill, focused child page, nor deprecated/duplicative content.

## 6. Resolver and rendering design

The implementation should introduce a single route module, for example `src/lib/content/publicRoutes.ts`, with a typed public route record keyed by stable ID:

```ts
type PublicRole = 'grade-hub' | 'grade-page' | 'skill' | 'collection' | 'challenge' | 'practice';
type PublicRoute = {
  id: string;
  role: PublicRole;
  pathname: string;
  legacyPathnames: readonly string[];
  indexable: boolean;
};
```

The resolver must return a canonical pathname only for approved public-route records. It must fail the build for a published item that is expected to migrate but lacks a record, and it must expose a separate legacy-path map for redirects. Stable IDs remain unchanged. The explicit resolver record is where approved public-slug exceptions such as `kindergarten-common-words` → `kindergarten-high-frequency-words` live.

Do not infer a public route from `category`. The current `urlSlug` can be used as a default only when the approved route record says so. Future contributors must add or approve the public role and route record before publishing a new canonical page.

## 7. Disable legacy route generation; do not overlay it

The current `[category]/[slug].astro` static-path generator emits every published list at the legacy category path. The migration must replace that behavior rather than keeping it and relying solely on Netlify redirects.

Implementation requirements:

1. Generate detail pages only for canonical resolver paths. A catch-all canonical route or role-specific canonical route templates may be used, provided their `getStaticPaths()` values come exclusively from the resolver.
2. Do not include legacy category paths in canonical page `getStaticPaths()`. The static build must not emit an HTML document for a route that is meant to 301.
3. Generate explicit Netlify 301 rules from the resolver's `legacyPathnames`; retain redirects for old external URLs without making them indexable static pages.
4. Add a build-level route manifest assertion: canonical paths are unique, legacy paths do not overlap canonical paths, and no migrated `/spelling-lists/{category}/{slug}/` output exists.
5. Retain `/spelling-lists/sight-words/` as a temporary static browse hub, but do not use it to generate the migrated Kindergarten or Grade 1 high-frequency-set detail pages.

## 8. Metadata and navigation migration

Every consumer must use the resolver rather than concatenating category and `urlSlug`:

| Surface | Required behavior |
| --- | --- |
| Canonical link and Open Graph URL | Use the canonical resolver path, never `Astro.url.pathname` for a legacy request. |
| Breadcrumb UI and `BreadcrumbList` JSON-LD | Use public parents: Library → Grade → page; Library → Skills → Skill; Library → Collections → collection. |
| `ItemList` JSON-LD | Use canonical resolver URLs for all listed items. |
| Internal cards, related lists, prerequisites, next lists, Grade Hub cards, collections, and Learning Paths | Resolve each linked content ID through the one public resolver. |
| Sitemap | Generate only indexable canonical resolver paths plus approved static public routes. Exclude redirects, previews, and legacy category URLs. |
| Redirects | Emit permanent 301s for every changed old path, including the old Kindergarten collection and each old numbered high-frequency-set route. |

## 9. Implementation approval gate

Before route code, redirects, or content frontmatter are changed, approve: (a) the remaining Grade 1 legacy phonics classifications; (b) any future `/practice/` entries; (c) the exact treatment of Dolch and legacy Sight Words URLs; and (d) the resolver manifest format and route-template strategy.
