# Unresolved Pages and Data-Quality Notes

Linked from `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md`. This file has two jobs: (1) list every page that could not be confidently classified `canonical-active` or `deprecated-legacy` from the frozen architecture documents plus live-code verification, so nothing gets silently assumed either way; (2) record repository/documentation findings uncovered while building the inventory. Nothing here receives a checklist, DoD, or priority — that only happens once a page is confirmed canonical active and moved to the appropriate active inventory file.

## Classification method (for reference)

A page is canonical active if `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md` or `docs/architecture/SKILLS_ARCHITECTURE.md` explicitly defines it, verified against `src/lib/content/gradeHubCards.ts` / `src/lib/content/spellingSkills.ts`. A page is deprecated/legacy if `docs/architecture/PUBLIC_URL_ARCHITECTURE.md` names its class explicitly (Dolch, other legacy Sight Words, legacy phonics and focused children) and it is confirmed unreferenced in the same two code files. Everything else — a page that is neither named by the architecture docs nor matched by a documented legacy pattern — is **unresolved** and listed below.


## Unresolved pages (35)

| Title | id | Category | Grade | contentRole | Source file | Why unresolved |
|---|---|---|---|---|---|---|
| Challenge: Academic Vocabulary | academic-vocabulary | challenge | — | — | `src/content/spelling-lists/challenge/academic-vocabulary.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 1st Grade Describing Words | grade-1-describing-words | grade-level | 1 | — | `src/content/spelling-lists/grade-level/1st-grade-describing-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| Grade 1 Five Senses Words | grade-1-five-senses-words | grade-level | 1 | vocabulary-theme | `src/content/spelling-lists/grade-level/grade-1-five-senses-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 1st Grade Everyday Words | grade-1-list-01 | grade-level | 1 | — | `src/content/spelling-lists/grade-level/1st-grade-everyday-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 1st Grade Action Words | grade-1-list-02 | grade-level | 1 | — | `src/content/spelling-lists/grade-level/1st-grade-action-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| Regular Plural Words: Review | grade-2-regular-plurals | grade-level | 1 | — | `src/content/spelling-lists/grade-level/2nd-grade-regular-plurals.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 2nd Grade Describing Words | grade-2-describing-words | grade-level | 2 | — | `src/content/spelling-lists/grade-level/2nd-grade-describing-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 2nd Grade Everyday Words | grade-2-list-01 | grade-level | 2 | — | `src/content/spelling-lists/grade-level/2nd-grade-everyday-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 2nd Grade Action Words | grade-2-list-03 | grade-level | 2 | — | `src/content/spelling-lists/grade-level/2nd-grade-action-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| Comparative Words: ER and EST | grade-2-comparatives-er-est | grade-level | 3 | — | `src/content/spelling-lists/grade-level/2nd-grade-comparatives-er-est.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| Homophones: To, Too, and Two | grade-2-homophones | grade-level | 3 | — | `src/content/spelling-lists/grade-level/2nd-grade-homophones.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| Prefix Words: UN and RE | grade-2-prefixes-un-re | grade-level | 3 | — | `src/content/spelling-lists/grade-level/2nd-grade-prefixes-un-re.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| Suffix Words: FUL and LESS | grade-2-suffixes-ful-less | grade-level | 3 | — | `src/content/spelling-lists/grade-level/2nd-grade-suffixes-ful-less.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 3rd Grade Spelling Rule: Changing Y to I | grade-3-changing-y-to-i | grade-level | 3 | grade-unit | `src/content/spelling-lists/grade-level/3rd-grade-changing-y-to-i.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 3rd Grade Spelling Rule: Doubling Final Consonants | grade-3-doubling-final-consonants | grade-level | 3 | grade-unit | `src/content/spelling-lists/grade-level/3rd-grade-doubling-final-consonants.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 3rd Grade Everyday Words | grade-3-list-01 | grade-level | 3 | — | `src/content/spelling-lists/grade-level/3rd-grade-everyday-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 3rd Grade Describing Words | grade-3-list-02 | grade-level | 3 | — | `src/content/spelling-lists/grade-level/3rd-grade-describing-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 3rd Grade Reading & Writing Words | grade-3-reading-writing-words | grade-level | 3 | — | `src/content/spelling-lists/grade-level/3rd-grade-reading-writing-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 4th Grade Final Stable Syllables: -ture and -sure | grade-4-final-stable-syllables | grade-level | 4 | skill | `src/content/spelling-lists/grade-level/4th-grade-final-stable-syllables.md` | tagged contentRole:skill but not in the frozen 41-slot taxonomy; orphaned from Skills Hub and every Grade Hub card list — needs product-owner decision |
| 4th Grade Everyday Words | grade-4-list-01 | grade-level | 4 | — | `src/content/spelling-lists/grade-level/4th-grade-everyday-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 4th Grade Academic & Content Words | grade-4-list-02 | grade-level | 4 | — | `src/content/spelling-lists/grade-level/4th-grade-community-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 4th Grade Reading & Writing Words | grade-4-reading-writing-words | grade-level | 4 | — | `src/content/spelling-lists/grade-level/4th-grade-reading-writing-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 4th Grade Greek Root Words | tier-2-greek-latin-roots | grade-level | 4 | grade-unit | `src/content/spelling-lists/grade-level/tier-2-greek-latin-roots.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 5th Grade Academic Words | grade-5-academic-words | grade-level | 5 | — | `src/content/spelling-lists/grade-level/5th-grade-academic-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 5th Grade Everyday Words | grade-5-list-01 | grade-level | 5 | — | `src/content/spelling-lists/grade-level/5th-grade-everyday-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 5th Grade Math Vocabulary | grade-5-math-vocabulary | grade-level | 5 | — | `src/content/spelling-lists/grade-level/5th-grade-math-vocabulary.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 5th Grade Opinion & Argument Words | grade-5-opinion-argument-words | grade-level | 5 | — | `src/content/spelling-lists/grade-level/5th-grade-opinion-argument-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 5th Grade Reading & Writing Words | grade-5-reading-writing-words | grade-level | 5 | — | `src/content/spelling-lists/grade-level/5th-grade-reading-writing-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 5th Grade Science Words | grade-5-science-nature-words | grade-level | 5 | — | `src/content/spelling-lists/grade-level/5th-grade-science-nature-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| 5th Grade Spelling Rules | grade-5-spelling-rules | grade-level | 5 | skill | `src/content/spelling-lists/grade-level/5th-grade-spelling-rules.md` | tagged contentRole:skill but not in the frozen 41-slot taxonomy; orphaned from Skills Hub and every Grade Hub card list — needs product-owner decision |
| Kindergarten Number and Color Words | kindergarten-number-color-words | grade-level | K | — | `src/content/spelling-lists/grade-level/kindergarten-number-color-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| Long E Vowel Teams | grade-1-long-e-vowel-teams | phonics | 1 | grade-unit | `src/content/spelling-lists/phonics/grade-1-long-e-vowel-teams.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| R-Controlled Vowels: er / ir / ur | grade-1-r-controlled-er-ir-ur | phonics | 1 | — | `src/content/spelling-lists/phonics/grade-1-r-controlled-er-ir-ur.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| The -ck Ending Rule | kindergarten-ck-ending-words | phonics | K | — | `src/content/spelling-lists/phonics/kindergarten-ck-ending-words.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |
| Double Consonants | kindergarten-double-consonants | phonics | K | — | `src/content/spelling-lists/phonics/kindergarten-double-consonants.md` | not named in K5_FINAL_CONTENT_ARCHITECTURE.md or SKILLS_ARCHITECTURE.md, and not resolved by the legacy-pattern checks above — needs manual confirmation |

**Resolved and moved:** `silent-e-long-e` (Long E Silent E Words) was previously listed here as one of the three non-taxonomy `skill`-tagged pages. It is now resolved per `docs/architecture/SKILLS_ARCHITECTURE.md` §5 — folded into the Silent E family's normal guidance sentence on the Skills Hub (no separate block, matching every other family's presentation), set to `status: archived` so no standalone page is emitted, and its former URL permanently redirects (301) to `/spelling-lists/skills/#silent-e-family`. Moved to `deprecated-and-legacy-pages.md`'s "Archived-status pages" table; no longer counted in the 35 unresolved pages above.

**What to do with this list:** confirm each row against the product owner's intent before touching it. Likely outcomes per row: (a) it's an older, finer-grained page superseded by a combined page that *is* in the active architecture (e.g. `3rd-grade-changing-y-to-i` and `3rd-grade-doubling-final-consonants` look like predecessors to the live `grade-3-dropping-silent-e` "Suffix Spelling Changes" card) — likely deprecated-legacy once confirmed, not currently asserted here without that confirmation; (b) it's real content the architecture doc simply doesn't enumerate at this level of detail — likely canonical-active as supporting content once confirmed; (c) it's one of the two remaining non-taxonomy "skill"-tagged pages already flagged in `skill-pages.md`, which need a product-owner taxonomy decision, not a content read.


## Data-quality notes


### `contentRole` is empty on many canonical-active pages

`contentRole` (the schema field meant to declare page layer) is empty on a number of pages that this roadmap has nonetheless confirmed canonical-active via their Grade Hub card reference — the frontmatter field is unreliable as a stand-alone signal and was **not** used as the classification test in this revision (architecture-doc definition + Grade Hub/Skills Hub reachability was used instead, per the roadmap's ground rules). Recommended Phase 0 action: backfill `contentRole` **only** on pages already confirmed canonical-active in `skill-pages.md`, `grade-curriculum-pages.md`, or `sight-words-and-common-words.md` — do not backfill it on unresolved or deprecated/legacy pages as a way of implicitly deciding their status.


### `spelling-collections` entries have no `contentRole` field at all

This is a schema difference, not missing data — the `spellingCollections` schema in `src/content/config.ts` never defines a `contentRole` field. Don't read an empty `contentRole` on a collection as a data-quality issue.


### Pages tagged `contentRole: skill` outside the frozen 41-slot taxonomy

`grade-4-final-stable-syllables`, `grade-5-spelling-rules` — two published pages tagged as Skill pages that are not part of `SKILLS_ARCHITECTURE.md`'s taxonomy and are not linked from the Skills Hub or any Grade Hub. Listed in the unresolved table above; full detail in `skill-pages.md`.

A third page in this category, `silent-e-long-e`, is now resolved (see the "Resolved and moved" note above) — it carries `status: archived`, not `published`, and has moved to `deprecated-and-legacy-pages.md`.


### `skillIds` linking from Grade Unit pages to canonical Skill pages is almost entirely unpopulated

Only 3 of the canonical-active Grade Unit pages set `skillIds` (the field meant to connect a grade-specific treatment back to its grade-independent canonical Skill page). Populating this field, once the target Skill page is in good shape, is core Phase 2 work and the mechanism for the internal linking the content-layer model calls for.


### `grade` field does not distinguish phonics content used across multiple grades

Many Skill pages carry a single `grade` value even though the concept is taught in more than one grade (e.g. Short Vowels and CVC Words is a Kindergarten Grade Unit but its Skill pages often carry `grade: "1"`). Expected for a single-value schema field, not a defect — Skill pages are grade-independent by definition (§2 of the roadmap).


### `id` vs `urlSlug` divergence is expected, not a defect

Many files have `id !== urlSlug` by design (`id` is a stable internal identifier; `urlSlug` is the human/SEO-facing path segment). Not re-flagged as an issue anywhere else in the inventory.

