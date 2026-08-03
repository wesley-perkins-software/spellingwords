# Inventory: Skill Pages (Canonical Active)

Linked from `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md`. Every page below is explicitly defined by `docs/architecture/SKILLS_ARCHITECTURE.md`'s frozen 41-slot taxonomy, verified against `src/lib/content/spellingSkills.ts`. All 41 slots are canonical active by construction — none of this layer is legacy.

**Instructional variant** and **Content brief status** (added per `docs/content/CANONICAL_SKILL_PAGE_STANDARD.md` §21) are distinct from **Editorial status**: Editorial status tracks the roadmap's page-level definition of done (§8 of the roadmap); Content brief status tracks only whether a Skill's content brief (`docs/content/templates/SKILL_PAGE_CONTENT_BRIEF.md`) has been written and approved, using `Not started`, `Drafting`, `Needs review`, `Approved`. A page can have an approved brief and still be `Not audited` editorially — the brief precedes drafting, it isn't drafting itself.


## Short Vowels and CVC Words

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status | Instructional variant | Content brief status |
|---|---|---|---|---|---|---|---|
| short-a-words | Short A Words | short-a-words | 1 | `src/content/spelling-lists/phonics/short-a-words.md` | Needs review — content revised for audience, structure, and scannability; desktop/mobile screenshots reviewed; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| short-e-words | Short E Words | short-e-words | 1 | `src/content/spelling-lists/phonics/short-e-words.md` | Needs review — content revised for audience, structure, and scannability; desktop/mobile screenshots reviewed; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| short-i-words | Short I Words | short-i-words | 1 | `src/content/spelling-lists/phonics/short-i-words.md` | Needs review — content revised for audience, structure, and scannability; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| short-o-words | Short O Words | short-o-words | 1 | `src/content/spelling-lists/phonics/short-o-words.md` | Needs review — content revised for audience, structure, and scannability; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| short-u-words | Short U Words | short-u-words | 1 | `src/content/spelling-lists/phonics/short-u-words.md` | Needs review — content revised for audience, structure, and scannability; pending independent human editorial sign-off before "Complete" | 1 | Needs review |

## Consonant Digraphs

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status | Instructional variant | Content brief status |
|---|---|---|---|---|---|---|---|
| digraph-ch-words | CH Digraph Words | digraph-ch-words | 1 | `src/content/spelling-lists/phonics/digraph-ch-words.md` | Needs review — content drafted to the Standard (Variant 1), demonstration set trimmed, readinessSignals removed; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| digraph-sh-words | SH Digraph Words | digraph-sh-words | 1 | `src/content/spelling-lists/phonics/digraph-sh-words.md` | Needs review — content drafted to the Standard (Variant 1), demonstration set trimmed, readinessSignals removed; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| digraph-th-words | TH Digraph Words | digraph-th-words | 1 | `src/content/spelling-lists/phonics/digraph-th-words.md` | Needs review — content drafted to the Standard (Variant 1), voiced/unvoiced TH treated as the Level 1 distinction, readinessSignals removed; TH claims flagged for particular human attention (see roadmap note); pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| digraph-wh-words | WH Digraph Words | digraph-wh-words | 1 | `src/content/spelling-lists/phonics/digraph-wh-words.md` | Needs review — content drafted to the Standard (Variant 1), who/whole exception and wine–whine dialect note included, readinessSignals removed; WH claims flagged for particular human attention (see roadmap note); pending independent human editorial sign-off before "Complete" | 1 | Needs review |

## Consonant Blends

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status | Instructional variant | Content brief status |
|---|---|---|---|---|---|---|---|
| beginning-blends | Beginning Blends | beginning-blends | 1 | `src/content/spelling-lists/phonics/beginning-blends.md` | Needs review — content drafted to the Standard (Variant 1), demonstration set re-curated to remove a competing untaught pattern ("black"'s ck ending), full blend-vs-digraph contrast added, missing `skillIds` back-reference from the Grade 1 Grade Unit added; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| ending-blends | Ending Blends | ending-blends | 1 | `src/content/spelling-lists/phonics/ending-blends.md` | Needs review — content drafted to the Standard (Variant 1), demonstration set re-curated for broader blend-family coverage, "why ending blends are harder to hear" treated as the family's central instructional point, missing `skillIds` back-reference from the Grade 1 Grade Unit added; pending independent human editorial sign-off before "Complete" | 1 | Needs review |

## Common Spelling Patterns

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status | Instructional variant | Content brief status |
|---|---|---|---|---|---|---|---|
| ck-tch-dge-word-endings | CK, Double Letters, and TCH/DGE Word Endings | ck-tch-dge-word-endings | 1 | `src/content/spelling-lists/phonics/ck-tch-dge-word-endings.md` | Needs review — content drafted to the Standard (Variant 2), the three merged conventions (final ck, FLOSS doubling, tch/dge) kept as separately conditioned sections with decision tables and differentiated exception groups, missing `skillIds` back-references added to the three canonical-active Grade 1 units that teach this content (`grade-1-floss-rule`, `grade-1-tch-dge-ending-rules`, `grade-1-consonant-digraphs-final-ck`); pending independent human editorial sign-off before "Complete" | 2 | Needs review |
| silent-letters | Silent Letters | silent-letters | 2 | `src/content/spelling-lists/grade-level/silent-letters.md` | Needs review — content drafted to the Standard (Variant 2), the wr/kn/mb patterns kept as separately conditioned sections, near-homophone risk (wrap/rap, write/rite, know/no, knot/not) treated as the central instructional point, explicit contrast added against the unrelated Silent E family, missing `skillIds` back-reference from the Grade 2 Grade Unit added; pending independent human editorial sign-off before "Complete" | 2 | Needs review |
| soft-c-soft-g | Soft C and Soft G | soft-c-soft-g | 2 | `src/content/spelling-lists/phonics/soft-c-soft-g.md` | Needs review — content drafted to the Standard (Variant 2), c and g kept as separately conditioned sections despite sharing one trigger condition since their reliability differs sharply (soft c reliable, soft g has common exceptions: get, give, girl, gift, treated as the page's central caution), demonstration set corrected to actually exemplify all three trigger letters (e, i, y) and to drop a word with an unrelated r-controlled confound, an explicit cross-reference added explaining why bridge/badge/edge use dge instead of plain g, a prior FAQ referencing a non-canonical "C, K, and CK" Skill corrected, missing `skillIds` back-reference added to the one canonical-active Grade 2 unit that teaches this content (`grade-2-soft-c-soft-g`); pending independent human editorial sign-off before "Complete" | 2 | Needs review |

## Silent E

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status | Instructional variant | Content brief status |
|---|---|---|---|---|---|---|---|
| silent-e-long-a | Long A Silent E Words | silent-e-long-a | 1 | `src/content/spelling-lists/phonics/silent-e-long-a.md` | Needs review — content drafted to the Standard (Variant 1) as the family's reference implementation, demonstration set trimmed to 5 unpadded words, readinessSignals removed, the `have` exception added, missing `skillIds` back-reference from the Grade 1 Grade Unit added; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| silent-e-long-i | Long I Silent E Words | silent-e-long-i | 1 | `src/content/spelling-lists/phonics/silent-e-long-i.md` | Needs review — content drafted to the Standard (Variant 1), the learner over-application risk treated as the page's central instructional point, `give`/`live` exception added, `fire` dropped from the demonstration set (r-controlled-vowel confound), readinessSignals removed, missing `skillIds` back-reference from the Grade 1 Grade Unit added; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| silent-e-long-o | Long O Silent E Words | silent-e-long-o | 1 | `src/content/spelling-lists/phonics/silent-e-long-o.md` | Needs review — content drafted to the Standard (Variant 1), the `gone`/`done`/`some`/`come`/`one` exception cluster treated as the page's central instructional point, `relatedLists` corrected from an unrelated long-a vowel team to `vowel-teams-oa-ow`, readinessSignals removed, missing `skillIds` back-reference from the Grade 1 Grade Unit added; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| silent-e-long-u | Long U Silent E Words | silent-e-long-u | 1 | `src/content/spelling-lists/phonics/silent-e-long-u.md` | Needs review — content drafted to the Standard (Variant 1), organized around the page's two genuine pronunciations (/yoo/, /oo/) rather than rime families, a dialect note on `tune`/`tube` added, `prerequisiteLists`/`relatedLists` repointed away from the archived `silent-e-long-e` page, readinessSignals removed, missing `skillIds` back-reference from the Grade 1 Grade Unit added; pending independent human editorial sign-off before "Complete" | 1 | Needs review |

## Vowel Teams

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status | Instructional variant | Content brief status |
|---|---|---|---|---|---|---|---|
| vowel-teams-ai-ay | AI and AY Words | vowel-teams-ai-ay | 1 | `src/content/spelling-lists/phonics/vowel-teams-ai-ay.md` | Needs review — content drafted to the Standard (Variant 1), the AI/AY position tendency framed as a base-word pattern (distinguished from surface forms like `playing`/`stayed`), a genuine `chai`-type exception named, readinessSignals removed, missing `skillIds` back-reference from the Grade 1 Grade Unit added; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| vowel-teams-ee-ea | EE and EA Words | vowel-teams-ee-ea | 1 | `src/content/spelling-lists/phonics/vowel-teams-ee-ea.md` | Needs review — content drafted to the Standard (Variant 1), states plainly that no position or spelling rule distinguishes EE from EA and teaches recognition/word-family strategy instead of inventing one, a scope boundary against non-long-e EA words (bread, break) added, readinessSignals removed, missing `skillIds` back-reference from the Grade 1 Grade Unit added; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| vowel-teams-oa-ow | OA and OW Words | vowel-teams-oa-ow | 1 | `src/content/spelling-lists/phonics/vowel-teams-oa-ow.md` | Needs review — content drafted to the Standard (Variant 1), states the scope boundary against the unrelated `/aʊ/` `ow` in `cow` (belongs to OU and OW Words) in both directions, `know` kept with an explicit silent-`k` justification, readinessSignals removed; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| oi-and-oy-words | OI and OY Words | oi-and-oy-words | 2 | `src/content/spelling-lists/phonics/oi-and-oy-words.md` | Needs review — content drafted to the Standard (Variant 1), OY reframed as ending a syllable (not just a word) so mid-word cases like `royal`/`loyal` follow the same reasoning rather than reading as exceptions, a genuine `koi`-type exception named, `relatedLists`/`prerequisiteLists` added pointing at `vowel-teams-oa-ow`, missing `skillIds` back-reference from the Grade 2 Grade Unit added; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| ou-and-ow-words | OU and OW Words | ou-and-ow-words | 2 | `src/content/spelling-lists/phonics/ou-and-ow-words.md` | Needs review — content drafted to the Standard (Variant 1), states plainly that no position rule distinguishes OU from OW and teaches recognition/word-family strategy instead of inventing one, scope boundary against the unrelated long-o OW (`vowel-teams-oa-ow`) kept reciprocal with that page's existing boundary, `relatedLists`/`prerequisiteLists` added pointing at `vowel-teams-oa-ow` and `oi-and-oy-words`, missing `skillIds` back-reference from the Grade 2 Grade Unit added; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| oo-words | OO Words | oo-words | 2 | `src/content/spelling-lists/phonics/oo-words.md` | Needs review — content drafted to the Standard (Variant 1), both oo pronunciations taught with neither presented as default, the oo-before-k tendency named explicitly as loose rather than a rule, a genuine dialect note added (`roof`/`root`), `relatedLists`/`prerequisiteLists` added pointing at `ou-and-ow-words`, missing `skillIds` back-reference from the Grade 2 Grade Unit added; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| au-and-aw-words | AU and AW Words | au-and-aw-words | 2 | `src/content/spelling-lists/phonics/au-and-aw-words.md` | Needs review — content drafted to the Standard (Variant 1), keeps the existing position tendency but names a genuine, common counterexample (`haul`, `fault`, `vault`) rather than presenting the tendency as absolute, `augh` exclusion kept, `relatedLists`/`prerequisiteLists` added pointing at `oo-words`, missing `skillIds` back-reference from the Grade 2 Grade Unit added; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| ie-and-igh-words | IE and IGH Words | — | — | **No content file exists** | **Blocked — content-pending.** Taxonomy slot is frozen; a word bank must be authored before any editorial checklist applies. | 1 | Not started |

## R-Controlled Vowels

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status | Instructional variant | Content brief status |
|---|---|---|---|---|---|---|---|
| r-controlled-ar | R-Controlled AR Words | r-controlled-ar | 1 | `src/content/spelling-lists/phonics/r-controlled-ar.md` | Needs review — content drafted to the Standard (Variant 1), AR framed as one of the most reliable r-controlled spellings with an explicit short-a contrast, the erroneous `relatedLists`/`prerequisiteLists` link to `vowel-teams-ou-ow` removed and replaced with a genuinely justified `short-a-words` prerequisite and `r-controlled-or` related link (kept one-directional — a reciprocal card tried on `short-a-words` was reverted since that page's body never explained it), the `war`/`warm`/`quart` w-shift exception named as a bounded Level 2 case, a scope boundary added against `-are` words (`care`, `share`), `large` dropped from the demonstration set (untaught soft-g confound), missing `skillIds` back-reference from the Grade 1 Grade Unit added; pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| r-controlled-or | R-Controlled OR Words | r-controlled-or | 1 | `src/content/spelling-lists/phonics/r-controlled-or.md` | Needs review — content drafted to the Standard (Variant 1), OR taught with an explicit short-o contrast and a dialect note (the horse–hoarse merger) externally verified against Wikipedia and corroborating sources and reworded to describe it as a live, present-day distinction (Southern American English, Boston, some Scottish/Irish varieties) rather than an "older" one, the `wor-` group (`word`, `work`, `world`, `worm`, `worth`) named as the central exception and cross-linked to R-Controlled ER, IR, and UR Words, `worn` named as a counter-example so the exception isn't overgeneralized to every `wor-` word, `order` dropped from the demonstration set (introduced an untaught unstressed ER ending), missing `skillIds` back-reference from the Grade 1 Grade Unit added, `short-o-words` prerequisite kept one-directional (a reciprocal card was reverted for the same reason as AR); pending independent human editorial sign-off before "Complete" | 1 | Needs review |
| r-controlled-er-ir-ur | R-Controlled ER, IR, and UR Words | r-controlled-er-ir-ur | 1 | `src/content/spelling-lists/phonics/r-controlled-er-ir-ur.md` | Needs review — content drafted to the Standard (Variant 1), states plainly that no dependable rule predicts ER vs. IR vs. UR and teaches recognition/repeated-exposure strategy instead of inventing one, explicitly distinguishes the clear stressed sound in `her`/`bird`/`turn` from the softer, unstressed ending in `sister`/`winter`/`under`, scoped to mainstream rhotic American English with a brief non-rhotic dialect note, cross-references the `wor-` exception on R-Controlled OR Words reciprocally, `prerequisiteLists` reconsidered and left empty (`r-controlled-ar` moved to `relatedLists` instead, since no documented conceptual dependency exists — only Grade 1's own teaching order, which isn't a Skill-level prerequisite); pending independent human editorial sign-off before "Complete" | 1 | Needs review |

## Multisyllabic Words

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status | Instructional variant | Content brief status |
|---|---|---|---|---|---|---|---|
| multisyllabic-words | Multisyllabic Words | multisyllabic-words | 2 | `src/content/spelling-lists/phonics/multisyllabic-words.md` | Needs review — content drafted to the Standard's documented hybrid, the inaccurate “longer words are spelled the same way they're read” premise replaced with a flexible speech-pattern-morphology-check routine, open/closed syllables bounded as useful tendencies rather than guarantees, the required Open Syllables and Words Ending in Consonant-LE sections expanded, syllabic consonants and unstressed-vowel ambiguity treated explicitly in parent-friendly language, demonstration set re-audited and expanded only to cover genuinely distinct analyses, both proposed related Skills removed after a final utility review found neither materially advanced the page's central strategy, and missing `skillIds` back-references added to all six contributing Grade Units; pending independent human editorial sign-off before "Complete" | Hybrid | Needs review |

## Word Building and Endings

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status | Instructional variant | Content brief status |
|---|---|---|---|---|---|---|---|
| plurals | Plural Words with -s and -es | plurals | 1 | `src/content/spelling-lists/grade-level/plurals.md` | Not audited | 2 | Not started |
| ed-and-ing | Words Ending in -ed and -ing | ed-and-ing | 1 | `src/content/spelling-lists/phonics/ed-and-ing.md` | Not audited | 2 | Not started |
| common-suffixes | Common Suffixes | common-suffixes | 3 | `src/content/spelling-lists/grade-level/common-suffixes.md` | Not audited | 3 | Not started |
| suffix-spelling-changes | Spelling Rules for Adding Suffixes | suffix-spelling-changes | 3 | `src/content/spelling-lists/grade-level/suffix-spelling-changes.md` | Not audited | 2 | Not started |
| compound-words | Compound Words | compound-words | 2 | `src/content/spelling-lists/grade-level/compound-words.md` | Not audited | 3 | Not started |
| contractions | Contractions | contractions | 2 | `src/content/spelling-lists/grade-level/contractions.md` | Not audited | 3 | Not started |

## Prefixes

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status | Instructional variant | Content brief status |
|---|---|---|---|---|---|---|---|
| un-and-re-prefixes | Un- and Re- Prefixes | un-and-re-prefixes | 2 | `src/content/spelling-lists/grade-level/un-and-re-prefixes.md` | Not audited | 3 | Not started |
| common-prefixes | Common Prefixes | common-prefixes | 3 | `src/content/spelling-lists/grade-level/common-prefixes.md` | Not audited | 3 | Not started |

## Greek and Latin Roots

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status | Instructional variant | Content brief status |
|---|---|---|---|---|---|---|---|
| greek-and-latin-roots | Greek and Latin Roots | greek-and-latin-roots | 4 | `src/content/spelling-lists/grade-level/greek-and-latin-roots.md` | Not audited | 3 | Not started |

## Homophones and Commonly Confused Words

| Skill id | Title | urlSlug | Grade (frontmatter) | Source file | Editorial status | Instructional variant | Content brief status |
|---|---|---|---|---|---|---|---|
| homophones | Homophones | homophones | 2 | `src/content/spelling-lists/grade-level/homophones.md` | Not audited | 4 | Not started |
| commonly-confused-words | Commonly Confused Words | commonly-confused-words | 4 | `src/content/spelling-lists/grade-level/commonly-confused-words.md` | Not audited | 4 | Not started |

## Unresolved: pages tagged `contentRole: skill` outside the frozen taxonomy

These are **not** part of the canonical Skill-page checklist and are not counted in the 41 slots above. Full detail and classification reasoning in `untagged-and-data-quality.md`. Do not add editorial checklists to these until a product-owner decision resolves their status.

| id | Title | Category | Grade | Source file |
|---|---|---|---|---|
| grade-4-final-stable-syllables | 4th Grade Final Stable Syllables: -ture and -sure | grade-level | 4 | `src/content/spelling-lists/grade-level/4th-grade-final-stable-syllables.md` |
| grade-5-spelling-rules | 5th Grade Spelling Rules | grade-level | 5 | `src/content/spelling-lists/grade-level/5th-grade-spelling-rules.md` |

**Resolved:** `silent-e-long-e` (Long E Silent E Words) was the third row in this table; it is now resolved per `docs/architecture/SKILLS_ARCHITECTURE.md` §5 — folded into the Silent E family's normal introductory guidance sentence on the Skills Hub (one clause, e.g. "eve, these, theme"), not rendered as a separate block or peer Skill page, so the hub stays visually and editorially consistent with every other family. Content entry set to `status: archived` so no standalone page is emitted, and its former URL (`/spelling-lists/phonics/silent-e-long-e`) permanently redirects (301) to `/spelling-lists/skills/#silent-e-family`. Moved to the "Archived-status pages" table in `deprecated-and-legacy-pages.md`.

**Totals:** 12 families · 41 taxonomy slots (40 live + 1 provisional) · 40 canonical-active Skill pages · 2 unresolved skill-tagged pages outside the taxonomy.
