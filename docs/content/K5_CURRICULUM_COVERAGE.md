# K-5 Curriculum Coverage Map and Implementation Backlog

> **Superseded.** Superseded for K–5 public architecture and implementation priority: use [K5_FINAL_CONTENT_ARCHITECTURE.md](../planning/K5_FINAL_CONTENT_ARCHITECTURE.md). Retain this coverage inventory as supporting repository evidence.

## Purpose and governing documents

This inventory maps current repository content to the remaining pre-launch K-5 curriculum work. It is an inspection artifact, not an architecture redesign and not a request to expose every internal resource publicly.

Governing documents applied:

- `docs/architecture/CONSTITUTION.md` — keep the product centered on three calm journeys: Practice Your Own Words, Browse by Grade, and Practice by Skill.
- `docs/architecture/CONTENT_MODEL.md` — classify by content job, not by folder, grade metadata, or category.
- `docs/architecture/SKILLS_MODEL.md` — distinguish public Skill Families from reusable Skills and narrower practice sets.
- `docs/content/curriculum-bible.md`, `docs/content/curriculum-audit-phase-2.md`, and `docs/content/content-production-roadmap.md` — current curriculum and production history.
- `src/lib/content/kindergartenProgression.ts`, `src/lib/content/grade1Progression.ts`, `src/lib/content/spellingSkills.ts`, `src/content/config.ts`, and content markdown under `src/content/spelling-lists/`.
- Sentence-bank data/tests under `src/lib/sentenceBank/` and curriculum tests under `src/lib/content/*.test.ts`.

## Status legend

| Status | Meaning |
|---|---|
| Complete | Grade units, reusable Skills or support pages, relationships, sentence support, and tests are adequate for launch. |
| Structurally complete, editorial review needed | The structure exists, but word selection, explanations, FAQ copy, or boundaries need a final editorial pass. |
| Content exists, classification/integration needed | Pages exist, but contentRole, roadmap placement, Skill relationships, or public-family decisions remain unresolved. |
| Partially covered | Some necessary content exists, but important Grade Units, reusable Skills, or integrations are missing. |
| Missing | The concept lacks necessary repository content. |
| Deferred public promotion | Existing or planned content should remain reusable/non-promoted until grouping is product-approved. |

## Executive summary

- The repository now contains 172 spelling-list markdown files; 164 are published. Explicit `contentRole` is still sparse: 17 `skill`, 11 `grade-unit`, and 144 missing roles by static frontmatter inspection.
- Public Practice by Skill currently has four registered families in `SPELLING_SKILL_FAMILIES`: Short Vowels, Consonant Digraphs, Silent E, and Vowel Teams.
- Kindergarten and Grade 1 have curated roadmap registries and tests. Grades 2-5 still render mostly as category-grouped grade hubs rather than hand-maintained roadmaps.
- The older production roadmap is partly stale: many previously missing Grade 2-5 lists now exist, but the roadmap document still describes some of them as gaps. This coverage map supersedes it for next-step planning.
- The highest-value next PR is not another public Skill Family. It is Grade 2 roadmap/role normalization, because Grade 2 has the content needed to become a curated bridge from phonics to early word study, but it is not yet represented as a true roadmap.

## Public Skill Family status

| Family/candidate | Possible member Skill IDs | Choices | Parent clarity | Coherence | Readiness | Recommendation |
|---|---:|---:|---|---|---|---|
| Short Vowels | `short-a-words`, `short-e-words`, `short-i-words`, `short-o-words`, `short-u-words` | 5 | High | High | Implemented and tested | Complete. |
| Consonant Digraphs | `digraph-ch-words`, `digraph-sh-words`, `digraph-th-words`, `digraph-wh-words` | 4 | High | High | Implemented and tested | Complete. |
| Silent E | `silent-e-long-a`, `silent-e-long-i`, `silent-e-long-o`, `silent-e-long-u` | 4 | High | High | Implemented and tested; archived Long E redirects to family guidance | Complete canonical family; Long E is treated concisely in the overview rather than as a peer Skill. |
| Vowel Teams | `vowel-teams-ai-ay`, `vowel-teams-ee-ea`, `vowel-teams-oa-ow` | 3 | High | High | Implemented and tested | Complete for long-vowel teams. |
| Consonant Blends | broad pages: `grade-1-beginning-blend-practice`, `grade-1-ending-blend-practice`; narrow pages include `bl-blend-words` through `tr-blend-words` and final-blend pages | 2 broad choices or 29 narrow choices | High if broad; low if all narrow pages | High | Content exists, grouping unresolved | Reconsider after grouping work; do not expose all narrow blend pages as family members. |
| R-Controlled Vowels | `r-controlled-ar`, `r-controlled-or`, `r-controlled-er-ir-ur` plus Grade 1 units/gateways | 3 | High | High | Reusable pages exist but lack explicit roles/public family registration | P1 before launch if time permits; compact and parent-recognizable. |
| One-Syllable Spelling Patterns | `c-k-ck-words`, `tch-dge-ending-words`, `grade-1-floss-rule`, `kindergarten-double-consonants`, possible silent-letter pages | 4-5 | Medium | Medium | Mixed grade-unit/reusable identities | Reconsider after reusable Skill normalization; likely not a first launch blocker. |
| Diphthongs | `vowel-teams-oi-oy`, `vowel-teams-ou-ow` | 2 | Medium | High | Pages exist but intentionally excluded from current Vowel Teams family | Defer public promotion; decide whether to fold into Vowel Teams or a small Diphthongs family. |
| Broad Long Vowels | Silent E plus vowel teams plus open syllables/final y | many | Medium | Broad and potentially confusing | Existing pages span several concepts | Defer; preserve as grouping question rather than a launch blocker. |
| Word Endings and Suffixes | Grade 1 inflectional endings, Grade 2 plurals/comparatives/suffixes, Grade 3 suffix/spelling-change lists, Grade 4-5 suffix/rules pages | many | High | High | Pages exist but are grade-unit-like and role-missing | Do not implement first as public family; normalize reusable Skills and roadmap links first. |
| Prefixes | `grade-2-prefixes-un-re`, `grade-3-prefix-words`, `grade-4-advanced-prefixes`, `grade-5-prefix-suffix-words` | 3-4 | High | High | Content exists but grade-specific | P2 public family after Grade 2-4 roadmap work. |
| Greek and Latin Word Parts | `tier-1-roots-and-patterns`, `tier-2-greek-latin-roots`, `grade-5-greek-latin-word-parts` | 3 | Medium | High | Content exists | Keep mostly grade-roadmap driven before launch; public family can follow once morphology grouping is settled. |
| Homophones and Commonly Confused Words | `grade-2-homophones`, `grade-3-homophones`, `grade-4-commonly-confused-words`, `grade-5-commonly-confused-words` | 4 | High | High | Content exists but grade-specific | P2 public family; useful but not required before Grade Roadmaps are complete. |
| High-Frequency/Heart Words | `kindergarten-heart-words`, Grade 1 heart-word pages, Dolch lists/collections | many | High | Parallel system, not ordinary Skill | Existing content and collections | Keep as parallel discovery/supporting content; do not fold into public Skill Families by default. |

## Coverage by concept

| Concept | Grades | Roadmap? | Existing Grade Unit IDs | Reusable Skill IDs / support IDs | Public family | Status | Remaining work | Public treatment |
|---|---|---|---|---|---|---|---|---|
| Alphabet/first spelling words | K | Yes | `kindergarten-first-words` | none | none | Content exists, classification/integration needed | Add/confirm `contentRole: grade-unit`; keep in K roadmap. | Grade Unit only. |
| K short-vowel CVC sequence | K | Yes | `kindergarten-short-a-words`, `kindergarten-short-i-words`, `kindergarten-short-o-words`, `kindergarten-short-u-words`, `kindergarten-short-e-words`, `kindergarten-mixed-vowel-review` | reusable `short-a/e/i/o/u-words` | Short Vowels | Complete | Maintain relationship/test coverage. | Public family already covered by reusable Skills. |
| K consonant digraphs | K | Yes | `kindergarten-consonant-digraphs` | `digraph-ch/sh/th/wh-words` | Consonant Digraphs | Complete | None for launch. | Public family already covered. |
| Final CK / C-K-CK | K-1/2 | Yes | `kindergarten-ck-ending-words`, `grade-1-consonant-digraphs-final-ck` | `c-k-ck-words` | none | Content exists, classification/integration needed | Clarify reusable Skill role for `c-k-ck-words`; decide whether CK belongs in One-Syllable Patterns later. | Non-promoted Skill for launch. |
| FLOSS/double final consonants | K-1 | Yes | `kindergarten-double-consonants`, `grade-1-floss-rule` | none distinct | none | Content exists, classification/integration needed | `grade-1-floss-rule` is a Grade Unit; decide whether a grade-neutral FLOSS Skill is needed. | Non-promoted until one-syllable grouping is settled. |
| Heart/high-frequency words | K-1 plus Dolch K-3 | Yes/support | `kindergarten-heart-words`, `grade-1-heart-words`; Dolch lists | Grade 1 heart-word practice and parts | none | Structurally complete, editorial review needed | Add explicit high-frequency-word-set roles over time; preserve as parallel identity. | Not ordinary Skill Family. |
| Beginning blends | Grade 1 | Yes | `grade-1-beginning-consonant-blends` | `grade-1-beginning-blend-practice`, 18 narrow blend pages | none | Deferred public promotion | Decide broad-vs-narrow public grouping; roles missing for many pages. | Broad public family later; narrow pages should remain non-promoted. |
| Ending blends | Grade 1-2 | Yes | `grade-1-ending-consonant-blends` | `grade-1-ending-blend-practice`, 11 final-blend pages | none | Deferred public promotion | Preserve documented grade split; decide broad public grouping. | Broad family later; narrow pages non-promoted. |
| Silent E long vowels | Grade 1 | Yes | `grade-1-long-vowels-silent-e` | `silent-e-long-a/e/i/o/u` | Silent E | Complete | None for public family; check Grade 1 unit relationship completeness during role normalization. | Public family already covered. |
| Open syllables/final Y | Grade 1 | Yes | `grade-1-open-syllables-final-y` | none | none | Partially covered | Decide if reusable Skill is needed; currently only Grade Unit exists. | Likely non-promoted Skill/supporting explanation. |
| Inflectional endings | Grade 1-3 | Yes | `grade-1-inflectional-endings-s-es`, `grade-1-inflectional-endings-ed-ing`, `grade-2-comparatives-er-est`, Grade 3 spelling-change pages | none broad | none | Content exists, classification/integration needed | Normalize grade-specific units; define reusable Word Endings/Suffixes support later. | Public family after roadmaps. |
| R-controlled vowels | Grade 1-2 | Yes | `grade-1-r-controlled-ar-or`, `grade-1-r-controlled-er-ir-ur` | `r-controlled-ar`, `r-controlled-or`, `r-controlled-er-ir-ur`, `grade-1-r-controlled-vowel-practice` | none | Partially covered | Add explicit Skill roles and decide compact public family. | Candidate pre-launch family if capacity allows. |
| Vowel teams | Grade 1-2 | Yes | `grade-1-long-a-long-o-vowel-teams`, `grade-1-long-e-vowel-teams` | `vowel-teams-ai-ay`, `vowel-teams-ee-ea`, `vowel-teams-oa-ow`, `grade-1-vowel-team-practice` | Vowel Teams | Complete | None for core long-vowel teams. | Public family implemented. |
| TCH and DGE | Grade 1/3 | Yes/support | `grade-1-tch-dge-ending-rules` | `tch-dge-ending-words`, `grade-1-tch-dge-practice` | none | Content exists, classification/integration needed | `tch-dge-ending-words` has grade 3 metadata but appears as Grade 1 targeted Skill; normalize identity/grade intent. | Non-promoted until One-Syllable Patterns decision. |
| Diphthongs OI/OY and OU/OW | Grade 2 | Yes | none as curated Grade 2 roadmap units yet | `vowel-teams-oi-oy`, `vowel-teams-ou-ow` | none | Deferred public promotion | Integrate in Grade 2 roadmap; decide family treatment later. | Defer public promotion. |
| Silent letters | Grade 2 | Yes | `grade-2-silent-letter-words` | none | none | Content exists, classification/integration needed | Roadmap/role normalization; likely supporting Skill or one-syllable pattern. | Non-promoted for launch. |
| Compound words | Grade 2 | Yes | `grade-2-list-02` | none | none | Content exists, classification/integration needed | Normalize as Grade Unit or supporting word-study page in Grade 2 roadmap. | Not public Skill Family. |
| Contractions | Grade 2 | Yes | `grade-2-contractions` | none | none | Content exists, classification/integration needed | Normalize role and Grade 2 placement. | Supporting/word-study page, not public family. |
| Plurals | Grade 2 | Yes | `grade-2-regular-plurals` | none | none | Content exists, classification/integration needed | Normalize role; relate to suffix/word-ending thread. | Reusable Skill candidate, non-promoted until suffix grouping. |
| Basic prefixes UN/RE | Grade 2-3 | Yes | `grade-2-prefixes-un-re`, `grade-3-prefix-words` | none | none | Content exists, classification/integration needed | Normalize Grade Units; later reusable Prefixes Skill. | Public family later. |
| Basic suffixes FUL/LESS and comparatives | Grade 2-3 | Yes | `grade-2-suffixes-ful-less`, `grade-2-comparatives-er-est`, `grade-3-suffix-words` | none | none | Content exists, classification/integration needed | Normalize Grade Units; later reusable suffix support. | Public family later. |
| Homophones / commonly confused words | Grades 2-5 | Yes | `grade-2-homophones`, `grade-3-homophones`, `grade-4-commonly-confused-words`, `grade-5-commonly-confused-words` | none broad | none | Content exists, classification/integration needed | Normalize roles/roadmaps; decide public family after Grade 2-5 are curated. | Candidate after core roadmap work. |
| Multisyllabic words | Grades 3-5 | Yes | `grade-3-multisyllabic-words`, `grade-4-multisyllabic-academic-words`, `grade-5-multisyllabic-academic-words` | none | none | Content exists, classification/integration needed | Roadmap integration and possible reusable Skill framing. | Likely non-promoted initially. |
| Suffix spelling changes | Grades 3/5 | Yes | `grade-3-suffix-spelling-changes`, `grade-5-spelling-rules` | `suffix-spelling-changes` | none | Grade 3 teaches all three base-word changes in one coherent unit. | Preserve the focused Grade 3 unit and reusable Skill relationship. | Implemented. |
| Root-word families / Greek-Latin roots | Grades 3-5 | Yes | `grade-3-root-word-families`, `tier-1-roots-and-patterns`, `tier-2-greek-latin-roots`, `grade-5-greek-latin-word-parts` | none broad | none | Content exists, classification/integration needed | Roadmap normalization; public root family can wait. | Grade-roadmap driven before launch. |
| Advanced prefixes/suffixes | Grades 4-5 | Yes | `grade-4-advanced-prefixes`, `grade-4-advanced-suffixes`, `grade-5-prefix-suffix-words` | none broad | none | Content exists, classification/integration needed | Normalize Grade 4/5 roadmaps and role metadata. | Public family later. |
| Grade-level vocabulary/domain words | K-5 | Supporting | many grade-level theme/content vocabulary pages | none | none | Structurally complete, editorial review needed | Keep supplemental; do not let vocabulary define roadmaps. | Not public Skill Families. |

## Grade-by-grade review

### Kindergarten coverage

- Current structure: curated registry with 10 core IDs and 3 additional IDs in `src/lib/content/kindergartenProgression.ts`, protected by `kindergartenProgression.test.ts`.
- Core Grade Units: `kindergarten-first-words`, five K short-vowel pages, `kindergarten-mixed-vowel-review`, `kindergarten-consonant-digraphs`, `kindergarten-ck-ending-words`, `kindergarten-double-consonants`.
- Additional/support: `kindergarten-heart-words`, `kindergarten-animal-words`, `kindergarten-number-color-words`; several K theme pages are archived and intentionally excluded.
- Missing milestones: no launch-blocking K milestone identified; alphabet/phonemic-awareness formats remain a future product-format question.
- Role normalization: only the K short-vowel/digraph unit pages have explicit `contentRole`; `kindergarten-first-words`, `kindergarten-ck-ending-words`, `kindergarten-double-consonants`, and additional pages need explicit roles.
- Readiness: close to launch-ready.

### Grade 1 coverage

- Current structure: curated registry with 15 core units, 9 gateways, 52 targeted Skills, and 3 vocabulary pages in `src/lib/content/grade1Progression.ts`.
- Core Grade Units cover CVC/C-K, FLOSS, digraphs/final CK, beginning and ending blends, silent e, open syllables/final y, heart words, inflectional endings, r-controlled vowels, vowel teams, and TCH/DGE.
- Additional/gateways exist for major Grade 1 phonics groups.
- Missing milestones: no major Grade 1 content gap remains; earlier long-u and inflectional-ending gaps now have pages.
- Role normalization: many Grade 1 core, gateway, targeted, heart-word, and narrow blend pages still lack explicit `contentRole`.
- Readiness: closest to launch-ready after Kindergarten, but public blending and r-controlled family decisions remain.

### Grade 2 coverage

- Current structure: no hand-maintained Grade 2 roadmap registry; the grade hub falls back to category grouping.
- Existing Grade 2 content includes vowel teams/diphthongs, r-controlled vowels, C/K/CK support, final blends, compound words, contractions, homophones, plurals, comparatives, prefixes, suffixes, silent letters, Dolch second-grade lists, and vocabulary pages.
- Missing milestones: no obvious content-authoring blocker from the old Grade 2 gap list remains, but inflectional endings with spelling changes may need relationship/review coverage rather than a separate Grade 2 page.
- Role normalization: all Grade 2 grade-level word-study pages lack `contentRole`; reusable phonics pages also mostly lack explicit Skill roles.
- Readiness: materially incomplete as a roadmap, but content is close enough that Grade 2 is the highest-leverage next implementation target.

### Grade 3 coverage

- Current structure: no hand-maintained Grade 3 roadmap registry; the grade hub falls back to category grouping.
- Existing core-like content now includes prefixes, suffixes, multisyllabic words, homophones, doubling final consonants, dropping silent e, changing y to i, and root-word families, plus reading/writing and everyday vocabulary.
- Missing milestones: old “zero morphology” finding is stale; content exists, but it is not integrated into a curated roadmap.
- Role normalization: all Grade 3 morphology pages lack explicit `contentRole` and reusable Skill relationships.
- Readiness: materially incomplete until a curated roadmap and relationship checks are added.

### Grade 4 coverage

- Current structure: no hand-maintained Grade 4 roadmap registry; the grade hub falls back to category grouping.
- Existing content includes advanced prefixes, advanced suffixes, commonly confused words, multisyllabic academic words, reading/writing words, community words, and two Grade 4 root lists.
- Missing milestones: no obvious high-priority authoring gap remains from the old roadmap; science/social-studies may be partly represented by community/content vocabulary but needs editorial confirmation.
- Role normalization: all Grade 4 pages lack explicit `contentRole`; roots need clear Grade Unit vs reusable Skill treatment.
- Readiness: close in content volume, incomplete structurally.

### Grade 5 coverage

- Current structure: no hand-maintained Grade 5 roadmap registry; the grade hub falls back to category grouping.
- Existing content matches the Bible's 12-list Grade 5 capstone architecture: academic, reading/writing, opinion/argument, multisyllabic academic, prefix/suffix, Greek/Latin word parts, spelling rules, commonly confused, science, civics, math, and everyday words.
- Missing milestones: optional word origins only; not launch-blocking.
- Role normalization: all Grade 5 pages lack explicit `contentRole`; relationships to Grade 4 roots and Grade 3/4 morphology should be reviewed.
- Readiness: content-complete but structurally incomplete as a roadmap.

## Cross-grade reusable Skill inventory

- Public and explicit Skills: 17 pages are explicit `contentRole: skill`, all in the four current public families.
- Strong reusable Skill candidates not yet explicit/promoted: `c-k-ck-words`, `r-controlled-ar`, `r-controlled-or`, `r-controlled-er-ir-ur`, `vowel-teams-oi-oy`, `vowel-teams-ou-ow`, `tch-dge-ending-words`, broad blend gateways, suffix/word-ending pages, prefixes, homophones, multisyllabic words, and Greek/Latin word-parts pages.
- Narrow reusable practice sets that should remain non-promoted unless grouped: individual beginning blends and final blends.
- Grade-specific pages that may link to reusable Skills but should not be replaced by Skills: Grade 2-5 morphology and vocabulary units.

## Deferred public-family decisions

- Beginning Consonant Blends: use broad `Beginning Blends` public choice, not 18 separate public choices, unless a future UI supports subchoices without clutter.
- Ending Consonant Blends: use broad `Ending Blends` public choice; preserve documented Grade 1/2 final-blend split.
- OI/OY and OU/OW: decide whether these live inside Vowel Teams as “diphthong teams” or a separate Diphthongs family.
- Broad Long Vowels: do not create a public family until its boundary with Silent E, Vowel Teams, open syllables, and final y is parent-clear.
- Morphology families: Prefixes, Word Endings/Suffixes, Greek and Latin Word Parts, and Homophones are valuable but should follow Grade 2-5 roadmap normalization.

## Prioritized implementation backlog

### Phase A — Structural corrections

| Item | Priority | Scope | Dependencies | IDs/files | Acceptance criteria |
|---|---|---|---|---|---|
| Add a Grade 2 curated roadmap registry and tests | P0 | Medium | none | new `src/lib/content/grade2Progression.ts`, Grade 2 content IDs | Grade 2 hub renders a calm core/additional/targeted structure; every configured ID resolves to published content; tests protect order and no duplicates. |
| Normalize explicit `contentRole` for K and Grade 1 remaining pages | P1 | Medium | current schema supports optional role | K/G1 markdown under `src/content/spelling-lists/` | Core roadmap pages are `grade-unit`; gateways/supporting pages are not mislabeled as Skills; high-frequency-word/vocabulary roles match the Content Model. |
| Normalize `contentRole` for Grade 2 word-study pages | P1 | Medium | Grade 2 registry decisions | `grade-2-*`, Grade 2 phonics support pages | Grade 2 core units/supporting pages have explicit roles and relationships matching roadmap placement. |
| Update stale production planning docs or point them to this coverage map | P1 | Small | this document | `docs/content/content-production-roadmap.md`, `docs/content/curriculum-bible.md` | Old “missing” rows that now have pages no longer mislead future work, or the docs clearly defer to this map. |
| Add relationship completeness tests for curated roadmaps beyond K | P1 | Medium | Grade 2+ registries | `src/lib/content/*.test.ts` | Roadmap previous/next/prerequisite IDs resolve and match curated order where sequence links are expected. |

### Phase B — Missing reusable instructional Skills

| Item | Priority | Scope | Dependencies | IDs/files | Acceptance criteria |
|---|---|---|---|---|---|
| Normalize R-controlled reusable Skills | P1 | Small | role conventions | `r-controlled-ar`, `r-controlled-or`, `r-controlled-er-ir-ur` | Each page is an explicit reusable Skill with clear related Grade Unit links; ready for possible public family. |
| Define reusable treatment for CK/FLOSS/TCH-DGE one-syllable patterns | P1 | Medium | Grade 1/K role normalization | `c-k-ck-words`, `grade-1-floss-rule`, `tch-dge-ending-words`, K CK/double-consonant pages | Grade Units remain grade-specific; reusable pages are explicit where needed; no forced public family. |
| Normalize diphthong reusable pages without public promotion | P1 | Small | Grade 2 roadmap | `vowel-teams-oi-oy`, `vowel-teams-ou-ow` | Pages are usable as Grade 2 targeted Skills/support; public-family decision remains explicit and deferred. |
| Create or normalize broad reusable morphology supports | P2 | Large | Grade 2-5 roadmaps | prefixes, suffixes/word endings, homophones, multisyllabic words, roots | Grade Units link to useful reusable support without fragmenting every affix/root into a public page. |

### Phase C — Grade curriculum completion

| Item | Priority | Scope | Dependencies | IDs/files | Acceptance criteria |
|---|---|---|---|---|---|
| Complete Grade 2 roadmap implementation | P0 | Medium | Phase A Grade 2 registry | Grade 2 grade-level, phonics, Dolch IDs | Grade 2 is a parent-readable bridge from vowel/r-controlled review into word study. |
| Complete Grade 3 roadmap implementation | P0 | Medium | Grade 2 roadmap pattern | `grade-3-*`, Dolch third-grade lists | Grade 3 morphology sequence is curated; phonics review is not presented as new Grade 3 core. |
| Complete Grade 4 roadmap implementation | P1 | Medium | Grade 3 roadmap | `grade-4-*`, `tier-1-roots-and-patterns`, `tier-2-greek-latin-roots` | Grade 4 root/advanced morphology/content vocabulary sequence is clear and not category-dumped. |
| Complete Grade 5 roadmap implementation | P1 | Medium | Grade 4 roadmap | `grade-5-*` | Grade 5 12-list capstone architecture appears as a curated roadmap with supporting vocabulary. |
| Re-check Kindergarten archived theme exclusions | P2 | Small | none | K theme pages and tests | Archived pages remain intentionally excluded or are deliberately republished; no accidental dead roadmap references. |

### Phase D — Supporting content completion

| Item | Priority | Scope | Dependencies | IDs/files | Acceptance criteria |
|---|---|---|---|---|---|
| Sentence-bank coverage audit for all published list words | P1 | Medium | none | `src/lib/sentenceBank/`, all spelling-list markdown | Every published practice word either has a sentence-bank entry or a documented omission reason; audit reports are current. |
| Relationship audit for Grade 2-5 morphology chains | P1 | Medium | Grade 2-5 roadmaps | `relatedLists`, `prerequisiteLists`, `nextLists` in Grade 2-5 pages | All referenced IDs resolve; links express real prerequisite/next/related meaning. |
| Add concise adult-facing explanations where reusable Skills are normalized | P2 | Medium | Phase B | affected Skill markdown | Skill pages explain the concept without becoming long teaching guides. |

### Phase E — Public Skill Family decisions

| Item | Priority | Scope | Dependencies | IDs/files | Acceptance criteria |
|---|---|---|---|---|---|
| Decide and possibly implement R-Controlled Vowels family | P1 | Small | R-controlled role normalization | `src/lib/content/spellingSkills.ts`, family tests | If implemented, family has 3 choices and tests parallel existing families. |
| Decide Consonant Blends grouping | P2 | Medium | broad blend Skill treatment | blend pages and gateways | Public browsing stays compact; narrow pages are not dumped into the index. |
| Decide diphthong placement | P2 | Small | Grade 2 roadmap | `vowel-teams-oi-oy`, `vowel-teams-ou-ow` | OI/OY and OU/OW have a documented public/non-public treatment. |
| Defer broad morphology public families until roadmaps are stable | P2 | Large | Grade 2-5 roadmap completion | Prefixes, suffixes, roots, homophones | Public expansion is deliberate and parent-facing, not a mirror of internal taxonomy. |

### Phase F — Pre-launch polish and verification

| Item | Priority | Scope | Dependencies | IDs/files | Acceptance criteria |
|---|---|---|---|---|---|
| Full visual/responsive/accessibility review | P1 | Large | curriculum structure complete | public pages | Grade hubs, Skill index, list details, and practice flows pass manual QA. |
| SEO/metadata/structured-data review | P1 | Medium | content routes stable | pages/layout/content | Titles, descriptions, canonical URLs, breadcrumbs, and item lists are accurate. |
| Full-site link/build/test verification | P0 | Medium | all launch content complete | whole repo | Content validation, tests, build, link checks, and `git diff --check` pass. |
| Copy consistency pass | P2 | Medium | content frozen | docs/content and markdown | Parent-facing language is consistent and calm. |

## Launch-completeness checklist

- [ ] Every K-5 grade has a curated roadmap registry or equivalent hand-maintained structure.
- [ ] Every roadmap ID resolves to published content.
- [ ] Grade Units have explicit `contentRole: grade-unit` where role adoption has reached that grade.
- [ ] Reusable Skills needed by roadmaps are explicit, linked, and not confused with Grade Units.
- [ ] Public Skill Families remain compact and registered in `SPELLING_SKILL_FAMILIES` only after product-curation decisions.
- [ ] Relationship arrays resolve by actual IDs and express real prerequisite/related/next relationships.
- [ ] Sentence-bank coverage is audited against all launch practice words.
- [ ] Grade 2-5 old gap documents are reconciled with the now-existing pages.
- [ ] Phase F polish verifies visual, accessibility, SEO, performance, link, structured-data, test, and build quality.

## Critical answers

- Do we have enough reusable Skills to complete every K-5 roadmap? Not yet. Early phonics has enough reusable Skills, but R-controlled, diphthongs, one-syllable spelling patterns, suffix/word-ending rules, prefixes, homophones, multisyllabic words, and roots need normalization before they can reliably support Grade 2-5 roadmaps.
- Where do Grade Units depend on missing or inadequate reusable Skills? Grade 2 diphthongs/R-controlled/word study, Grade 3 spelling-change and morphology pages, Grade 4 roots/advanced affixes, and Grade 5 morphology capstone pages need clearer reusable support and relationships.
- Which concepts need reusable Skills but should not become public families now? Narrow blends, CK/FLOSS/TCH-DGE, open syllables/final y, diphthongs, plurals/contractions, individual affixes, multisyllabic words, and roots.
- Which public families should still be implemented before launch? R-Controlled Vowels is the strongest compact pre-launch candidate. Consonant Blends may be before launch only if grouped broadly; morphology families can wait.
- Which grades are closest? Kindergarten and Grade 1. Grade 5 is content-complete but lacks curated roadmap structure.
- Which grade is furthest? Grade 2 is the highest-value next target because it has enough content to normalize now and unlocks the transition into Grade 3 morphology. Grade 3 follows closely.
- Best next coding task: reusable Skill normalization plus a specific Grade 2 Roadmap, not another public Skill Family.
- Exact recommended next PR: implement `grade2Progression` and Grade 2 hub sections/tests, normalize Grade 2 content roles/relationships only as needed for that roadmap, and update stale planning references that still mark shipped Grade 2 lists as missing.
- Launch necessity vs polish: curated K-5 roadmaps, role/relationship correctness, sentence coverage, and validation are launch necessities. Visual polish, SEO refinements, structured-data final review, and copy consistency are Phase F polish once structure is stable.
