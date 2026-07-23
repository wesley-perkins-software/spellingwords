# SpellingWords.app Curriculum Map

> **Superseded.** Superseded: this freeze candidate has been replaced by [K5_FINAL_CONTENT_ARCHITECTURE.md](../planning/K5_FINAL_CONTENT_ARCHITECTURE.md). Retain its Grade Unit ↔ Skill analysis as supporting technical/curriculum evidence.

**Status: FREEZE CANDIDATE — pending product-owner review. Not yet authoritative.**

## 0. Purpose and how to read this document

This document is the single canonical Grade Unit ↔ Skill curriculum map for SpellingWords.app, Kindergarten through Grade 5. It exists because no current document does this job: `docs/architecture/CONSTITUTION.md`, `CONTENT_MODEL.md`, and `SKILLS_MODEL.md` define *what a Grade Unit is* and *what a Skill is*, but not the concrete sequence. `docs/content/curriculum-bible.md`, `curriculum-audit-phase-2.md`, `K5_CURRICULUM_COVERAGE.md`, and `content-production-roadmap.md` contain real research and history, but they are list-tagging and backlog documents, not a frozen architecture.

**This document defines intended architecture, not merely current implementation.** Where the two differ, the intended architecture is recorded as canonical and the implementation gap is called out explicitly — current frontmatter, routing, or category grouping is never silently treated as curriculum policy.

Once approved, this document supersedes `K5_CURRICULUM_COVERAGE.md` for sequencing/mapping purposes (that document remains useful as historical backlog evidence) and sits alongside `CONSTITUTION.md`/`CONTENT_MODEL.md`/`SKILLS_MODEL.md` in the documentation governance hierarchy (`CONSTITUTION.md` §17, tier 3: "curriculum research and grade-skill source documents"). It does not replace `curriculum-bible.md`'s governance of non-Grade-Unit content (vocabulary/theme lists, sight-word sets).

**What is canonical today vs. proposed:** Kindergarten and Grade 1 core sequences are already implemented, tested, and shipped (`kindergartenProgression.ts`, `grade1Progression.ts`) — they are documented here as canonical. Every Grade 2–5 row, every reclassification recommendation, and every newly identified Skill gap is a **proposal** awaiting sign-off via the Decision Register (§8). Nothing in this document authorizes new content creation, frontmatter changes, or code changes on its own.

---

## 1. Grade-by-grade curriculum spine

One row per **Grade Unit only**. Gateway pages, targeted practice pages, and vocabulary/theme lists are deliberately excluded from this table — they are curriculum *support*, not curriculum *milestones* — and are inventoried in Appendix A.

**Grade Unit status legend** (exactly five values):

| Status | Meaning |
|---|---|
| `Published and canonical` | Live, shipped, and part of the approved core sequence. |
| `Published but supporting` | Live, but optional/supplemental — not a core milestone. |
| `Proposed` | Constructed for this map from existing content or a named gap; not yet approved. |
| `Needs reclassification` | Exists, but its Grade Unit identity is ambiguous or contested. |
| `Archive candidate` | Recommended for retirement, per Appendix B. |

Every row's **Canonical Skill link(s)** states the *intended* relationship regardless of whether it is wired. **Implementation status** states separately whether `skillIds` actually contains that link today.

### Kindergarten — canonical (shipped: `kindergartenProgression.ts`)

| Order | Title | ID | Concept | Practice focus | Prerequisite | Next | Canonical Skill link(s) | Implementation status | Grade Unit status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Kindergarten First Words | `kindergarten-first-words` | Foundational encoding — first whole-word spelling | Short, high-utility concrete words | none | `kindergarten-short-a-words` | none (Vocabulary identity, not a Skill) | n/a | Published and canonical |
| 2 | Kindergarten Short A Words | `kindergarten-short-a-words` | Short-a CVC spelling | short-a CVC words | `kindergarten-first-words` | `kindergarten-short-i-words` | `short-a-words` | **Wired** | Published and canonical |
| 3 | Kindergarten Short I Words | `kindergarten-short-i-words` | Short-i CVC spelling | short-i CVC words | `kindergarten-short-a-words` | `kindergarten-short-o-words` | `short-i-words` | Not wired | Published and canonical |
| 4 | Kindergarten Short O Words | `kindergarten-short-o-words` | Short-o CVC spelling | short-o CVC words | `kindergarten-short-i-words` | `kindergarten-short-u-words` | `short-o-words` | Not wired | Published and canonical |
| 5 | Kindergarten Short U Words | `kindergarten-short-u-words` | Short-u CVC spelling | short-u CVC words | `kindergarten-short-o-words` | `kindergarten-short-e-words` | `short-u-words` | Not wired | Published and canonical |
| 6 | Kindergarten Short E Words | `kindergarten-short-e-words` | Short-e CVC spelling | short-e CVC words | `kindergarten-short-u-words` | `kindergarten-mixed-vowel-review` | `short-e-words` | Not wired | Published and canonical |
| 7 | Kindergarten Mixed Vowel Review | `kindergarten-mixed-vowel-review` | Cross-vowel CVC fluency | Mixed short-vowel CVC words | `kindergarten-short-e-words` | `kindergarten-consonant-digraphs` | Short Vowels and CVC Words (broad family) | Not wired | Published and canonical |
| 8 | Kindergarten Consonant Digraphs | `kindergarten-consonant-digraphs` | Two letters, one consonant sound | sh/ch/th words | `kindergarten-mixed-vowel-review` | `kindergarten-ck-ending-words` | `digraph-sh-words`, `digraph-ch-words`, `digraph-th-words` | Not wired | Published and canonical |
| 9 | Kindergarten CK Ending Words | `kindergarten-ck-ending-words` | Final /k/ spelled `ck` after a short vowel | CK-ending words | `kindergarten-consonant-digraphs` | `kindergarten-double-consonants` | Final CK / C-K-CK Choices (not built) | Not wired | Published and canonical |
| 10 | Kindergarten Double Consonants | `kindergarten-double-consonants` | FLOSS pattern (final double consonants) | ff/ll/ss/zz words | `kindergarten-ck-ending-words` | Grade 1 Core Unit 1 | FLOSS / Double Final Consonants (not built) | Not wired | Published and canonical |

**Supporting (K):**

| Title | ID | Concept | Canonical Skill link | Implementation status | Grade Unit status |
|---|---|---|---|---|---|
| Kindergarten Heart Words | `kindergarten-heart-words` | Irregular high-frequency words | none (Sight Word Set identity) | n/a | Published but supporting |
| Kindergarten Animal Words | `kindergarten-animal-words` | Thematic vocabulary | none (Vocabulary/Theme identity) | n/a | Published but supporting |
| Kindergarten Number and Color Words | `kindergarten-number-color-words` | Thematic vocabulary | none (Vocabulary/Theme identity) | n/a | Published but supporting |

### Grade 1 — canonical (shipped: `grade1Progression.ts`)

| Order | Title | ID | Concept | Practice focus | Prerequisite | Next | Canonical Skill link(s) | Implementation status | Grade Unit status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Grade 1 CVC / Short Vowels / C-K Rule | `grade-1-cvc-short-vowels-c-k-rule` | CVC review + when to spell /k/ as c vs. k | Mixed CVC words, c/k choice | `kindergarten-double-consonants` | `grade-1-floss-rule` | Short Vowels family; C/K/CK Choices (not built) | Not wired | Published and canonical |
| 2 | Grade 1 FLOSS Rule | `grade-1-floss-rule` | FLOSS final-consonant doubling | ff/ll/ss/zz words | Unit 1 | `grade-1-consonant-digraphs-final-ck` | FLOSS / Double Final Consonants (not built) | Not wired | Published and canonical |
| 3 | Grade 1 Consonant Digraphs + Final CK | `grade-1-consonant-digraphs-final-ck` | Digraphs incl. WH; final CK | sh/ch/th/wh + ck words | Unit 2 | `grade-1-beginning-consonant-blends` | `digraph-sh/ch/th/wh-words`; Final CK (not built) | Not wired | Published and canonical |
| 4 | Grade 1 Beginning Consonant Blends | `grade-1-beginning-consonant-blends` | Adjacent consonants, both heard, word-initial | 18-blend sampler | Unit 3 | `grade-1-ending-consonant-blends` | Beginning Blends (not built) | Not wired | Published and canonical |
| 5 | Grade 1 Ending Consonant Blends | `grade-1-ending-consonant-blends` | Adjacent consonants, word-final | 11-blend sampler | Unit 4 | `grade-1-long-vowels-silent-e` | Ending Blends (not built) | Not wired | Published and canonical |
| 6 | Grade 1 Long Vowels — Silent E | `grade-1-long-vowels-silent-e` | VCe long-vowel pattern | Mixed silent-e words | Unit 5 | `grade-1-open-syllables-final-y` | `silent-e-long-a/e/i/o/u` (Silent E family) | Not wired | Published and canonical |
| 7 | Grade 1 Open Syllables / Final Y | `grade-1-open-syllables-final-y` | Open-syllable long vowels; y as a vowel | -y ending words | Unit 6 | `grade-1-heart-words` | Open Syllables (not built, provisional) | Not wired | Published and canonical |
| 8 | Grade 1 Heart Words | `grade-1-heart-words` | Irregular high-frequency words | Heart-word set | Unit 7 | `grade-1-inflectional-endings-s-es` | none (Sight Word Set identity) | n/a | Published and canonical |
| 9 | Grade 1 Inflectional Endings -s/-es | `grade-1-inflectional-endings-s-es` | Regular plural/verb inflection | -s/-es words | Unit 8 | `grade-1-inflectional-endings-ed-ing` | Plurals and -s/-es (not built) | Not wired | Published and canonical |
| 10 | Grade 1 Inflectional Endings -ed/-ing | `grade-1-inflectional-endings-ed-ing` | Verb tense inflection | -ed/-ing words | Unit 9 | `grade-1-r-controlled-ar-or` | -ed and -ing (not built) | Not wired | Published and canonical |
| 11 | Grade 1 R-Controlled AR/OR | `grade-1-r-controlled-ar-or` | Vowel-r spelling change | ar/or words | Unit 10 | `grade-1-r-controlled-er-ir-ur` | `r-controlled-ar`, `r-controlled-or` | Not wired | Published and canonical |
| 12 | Grade 1 R-Controlled ER/IR/UR | `grade-1-r-controlled-er-ir-ur` | Vowel-r spelling change (grouped) | er/ir/ur words | Unit 11 | `grade-1-long-a-long-o-vowel-teams` | `r-controlled-er-ir-ur` | Not wired | Published and canonical |
| 13 | Grade 1 Long A / Long O Vowel Teams | `grade-1-long-a-long-o-vowel-teams` | Two-letter long-vowel spellings | ai/ay, oa/ow words | Unit 12 | `grade-1-long-e-vowel-teams` | `vowel-teams-ai-ay`, `vowel-teams-oa-ow` | Not wired | Published and canonical |
| 14 | Grade 1 Long E Vowel Teams | `grade-1-long-e-vowel-teams` | Two-letter long-vowel spellings | ee/ea words | Unit 13 | `grade-1-tch-dge-ending-rules` | `vowel-teams-ee-ea` | Not wired | Published and canonical |
| 15 | Grade 1 TCH/DGE Ending Rules | `grade-1-tch-dge-ending-rules` | When to spell /ch/ and /j/ endings tch/dge vs. ch/ge | tch/dge words | Unit 14 | Grade 2 Unit 1 (proposed) | TCH and DGE (built as a page; see §2/§4) | Not wired | Published and canonical |

Grade 1's 15 core units are supported by 9 gateway pages, 52 targeted-skill pages, and 3 vocabulary pages — deliberately excluded from this spine and classified by family in **Appendix A**.

### Grade 2 — proposed (constructed from `curriculum-bible.md` §7 and `K5_CURRICULUM_COVERAGE.md` coverage-by-concept table; no hand-curated roadmap exists in code today)

| Order | Title | ID / planned ID | Concept | Practice focus | Prerequisite | Next | Canonical Skill link(s) | Implementation status | Grade Unit status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Grade 2 Diphthongs (OI/OY, OU/OW) | content exists, no Grade Unit role: `vowel-teams-oi-oy`, `vowel-teams-ou-ow` | Extend vowel teams to diphthongs | oi/oy, ou/ow words | Grade 1 Unit 15 | Order 2 | `vowel-teams-oi-oy`, `vowel-teams-ou-ow` (curriculum status: Needs reclassification, §2) | Not wired | Proposed |
| 2 | Grade 2 R-Controlled Vowels Review | no dedicated Grade Unit found; would reuse `r-controlled-ar/or/er-ir-ur` content | Fluency/review of r-controlled vowels at grade 2 | ar/or/er/ir/ur review set | Order 1 | Order 3 | `r-controlled-ar`, `r-controlled-or`, `r-controlled-er-ir-ur` | Not wired | Proposed |
| 3 | Grade 2 Compound Words | `grade-2-list-02` (also referenced as `2nd-grade-compound-words` — see Appendix B) | Two words joined into one | Compound words | Order 2 | Order 4 | Compound Words (not built) | Not wired | Proposed |
| 4 | Grade 2 Contractions | `grade-2-contractions` | Apostrophe substitution for omitted letters | Contractions | Order 3 | Order 5 | Contractions (not built) | Not wired | Proposed |
| 5 | Grade 2 Regular Plurals | `grade-2-regular-plurals` | Plural spelling rules | -s/-es/-ies plurals | Order 4 | Order 6 | Plurals and -s/-es (not built) | Not wired | Proposed |
| 6 | Grade 2 Comparatives -er/-est | `grade-2-comparatives-er-est` | Comparative/superlative suffixes | -er/-est words | Order 5 | Order 7 | Comparatives -er/-est (not built) | Not wired | Proposed |
| 7 | Grade 2 Prefixes UN-/RE- | `grade-2-prefixes-un-re` | Introductory prefixes | un-/re- words | Order 6 | Order 8 | UN and RE Prefixes (not built) | Not wired | Proposed |
| 8 | Grade 2 Suffixes -FUL/-LESS | `grade-2-suffixes-ful-less` | Introductory suffixes | -ful/-less words | Order 7 | Order 9 | Common Suffixes (not built) | Not wired | Proposed |
| 9 | Grade 2 Silent Letters | `grade-2-silent-letter-words` | Silent letters in common spellings | kn-/wr-/-mb words | Order 8 | Order 10 | Silent Letters (not built) | Not wired | Proposed |
| 10 | Grade 2 Homophones | `grade-2-homophones` | Meaning-based spelling choice | Homophone pairs | Order 9 | Grade 3 Order 1 (proposed) | Homophones (not built) | Not wired | Proposed |

### Grade 3 — proposed (constructed from `curriculum-bible.md` §7, `curriculum-audit-phase-2.md`, `K5_CURRICULUM_COVERAGE.md`; no hand-curated roadmap exists in code today)

| Order | Title | ID / planned ID | Concept | Practice focus | Prerequisite | Next | Canonical Skill link(s) | Implementation status | Grade Unit status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Grade 3 Prefixes | `grade-3-prefix-words` | un-/re-/pre-/dis-/mis- prefixes | Prefixed words | Grade 2 Order 10 | Order 2 | Common Prefixes, UN and RE Prefixes (not built) | Not wired | Proposed |
| 2 | Grade 3 Suffixes | `grade-3-suffix-words` | -er/-est/-tion/-ly/-ness suffixes | Suffixed words | Order 1 | Order 3 | Common Suffixes (not built) | Not wired | Proposed |
| 3 | Grade 3 Doubling Final Consonants | `grade-3-doubling-final-consonants` | Suffix spelling change: double before suffix | running/bigger-type words | Order 2 | Order 4 | Doubling Final Consonants (not built) | Not wired | Proposed |
| 4 | Grade 3 Dropping Silent E | `grade-3-dropping-silent-e` | Suffix spelling change: drop e before vowel suffix | making/loved-type words | Order 3 | Order 5 | Dropping Silent E (not built); relates to Silent E family | Not wired | Proposed |
| 5 | Grade 3 Changing Y to I | `grade-3-changing-y-to-i` | Suffix spelling change: y→i before suffix | babies/happier-type words | Order 4 | Order 6 | Changing Y to I (not built) | Not wired | Proposed |
| 6 | Grade 3 Multisyllabic Words | `grade-3-multisyllabic-words` | 2–3 syllable spelling | Multisyllabic words | Order 5 | Order 7 | Multisyllabic Words (not built) | Not wired | Proposed |
| 7 | Grade 3 Homophones | `grade-3-homophones` | Meaning-based spelling choice (grade 3 level) | Homophone pairs | Order 6 | Order 8 | Homophones (not built) | Not wired | Proposed |
| 8 | Grade 3 Root Word Families | `grade-3-root-word-families` | Introduction to root words | Common root families | Order 7 | Grade 4 Order 1 (proposed) | Greek and Latin Roots (not built) | Not wired | Proposed |

### Grade 4 — proposed (constructed from `curriculum-bible.md` §7, `content-production-roadmap.md`; no hand-curated roadmap exists in code today)

| Order | Title | ID / planned ID | Concept | Practice focus | Prerequisite | Next | Canonical Skill link(s) | Implementation status | Grade Unit status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Grade 4 Latin Roots (Tier 1) | `tier-1-roots-and-patterns` | Latin roots: port, dict, spect, rupt | Root-family words | Grade 3 Order 8 | Order 2 | Greek and Latin Roots (not built) | Not wired | Proposed |
| 2 | Grade 4 Greek Roots (Tier 2) | `tier-2-greek-latin-roots` | Greek roots: tele, photo, graph, bio, demo | Root-family words | Order 1 | Order 3 | Greek and Latin Roots (not built) | Not wired | Proposed |
| 3 | Grade 4 Advanced Prefixes | `grade-4-advanced-prefixes` | anti-/inter-/sub-/super-/trans- prefixes | Prefixed words | Order 2 | Order 4 | Common Prefixes / Advanced Prefixes (not built, provisional) | Not wired | Proposed |
| 4 | Grade 4 Advanced Suffixes | `grade-4-advanced-suffixes` | -ible/-able/-ous/-ive suffixes | Suffixed words | Order 3 | Order 5 | Common Suffixes / Advanced Suffixes (not built, provisional) | Not wired | Proposed |
| 5 | Grade 4 Commonly Confused Words | not yet authored (production roadmap Phase B: "Not Started") | Meaning-based word-choice accuracy | affect/effect, than/then-type sets | Order 4 | Grade 5 Order 1 (proposed) | Commonly Confused Words (not built) | Not wired | Proposed |

*Grade 4 science/social-studies vocabulary (also "Not Started" per production roadmap) is a Vocabulary/Theme List by Content Model definition, not a Grade Unit — intentionally excluded from the spine; see §6.*

### Grade 5 — proposed (constructed from `curriculum-bible.md` §7; "12-list architecture" exists but most of it is vocabulary, not morphology Grade Units — see §6 for the distinction)

| Order | Title | ID / planned ID | Concept | Practice focus | Prerequisite | Next | Canonical Skill link(s) | Implementation status | Grade Unit status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Grade 5 Multisyllabic Academic Words | `grade-5-multisyllabic-academic-words` | Upper-elementary multisyllabic spelling | Longer academic words | Grade 4 Order 5 | Order 2 | Multisyllabic Words (not built) | Not wired | Proposed |
| 2 | Grade 5 Prefix & Suffix Words | `grade-5-prefix-suffix-words` | Prefix/suffix extension | Affixed words | Order 1 | Order 3 | Common Prefixes, Common Suffixes (not built) | Not wired | Proposed |
| 3 | Grade 5 Greek & Latin Word Parts | `grade-5-greek-latin-word-parts` | Roots inside longer academic words | Root-based academic words | Order 2 | Order 4 | Greek and Latin Roots (not built) | Not wired | Proposed |
| 4 | Grade 5 Spelling Rules | `grade-5-spelling-rules` | Combined suffix-spelling rules: -tion/-sion, -able/-ible, -ance/-ence | Rule-based word sets | Order 3 | Order 5 | Suffix Spelling Changes (not built) | Not wired | Proposed |
| 5 | Grade 5 Commonly Confused Words | `grade-5-commonly-confused-words` | Meaning-based word-choice accuracy (capstone level) | Confused-word sets | Order 4 | none (K–5 sequence terminus) | Commonly Confused Words (not built) | Not wired | Proposed |

---

## 2. Skill inventory

Three independent status columns so **a page existing never implies its role is approved**.

### Existing public Skill Families (Built)

| Skill | Slug | Purpose | Canonical Grade Unit references | Build status | Curriculum status | Relationship status |
|---|---|---|---|---|---|---|
| Short A | `short-a-words` | Focused short-a CVC practice | `kindergarten-short-a-words`, `grade-1-cvc-short-vowels-c-k-rule` | Built | Canonical | **Wired** (from `kindergarten-short-a-words`) |
| Short E | `short-e-words` | Focused short-e CVC practice | `kindergarten-short-e-words`, `grade-1-cvc-short-vowels-c-k-rule` | Built | Canonical | Not wired |
| Short I | `short-i-words` | Focused short-i CVC practice | `kindergarten-short-i-words`, `grade-1-cvc-short-vowels-c-k-rule` | Built | Canonical | Not wired |
| Short O | `short-o-words` | Focused short-o CVC practice | `kindergarten-short-o-words`, `grade-1-cvc-short-vowels-c-k-rule` | Built | Canonical | Not wired |
| Short U | `short-u-words` | Focused short-u CVC practice | `kindergarten-short-u-words`, `grade-1-cvc-short-vowels-c-k-rule` | Built | Canonical | Not wired |
| SH Digraph | `digraph-sh-words` | Focused SH practice | `kindergarten-consonant-digraphs`, `grade-1-consonant-digraphs-final-ck` | Built | Canonical | Not wired |
| CH Digraph | `digraph-ch-words` | Focused CH practice | `kindergarten-consonant-digraphs`, `grade-1-consonant-digraphs-final-ck` | Built | Canonical | Not wired |
| TH Digraph | `digraph-th-words` | Focused TH practice | `kindergarten-consonant-digraphs`, `grade-1-consonant-digraphs-final-ck` | Built | Canonical | Not wired |
| WH Digraph | `digraph-wh-words` | Focused WH practice | `grade-1-consonant-digraphs-final-ck` | Built | Canonical | Not wired |
| Long A Silent E | `silent-e-long-a` | Focused VCe long-a practice | `grade-1-long-vowels-silent-e` | Built | Canonical | Not wired |
| Long I Silent E | `silent-e-long-i` | Focused VCe long-i practice | `grade-1-long-vowels-silent-e` | Built | Canonical | Not wired |
| Long O Silent E | `silent-e-long-o` | Focused VCe long-o practice | `grade-1-long-vowels-silent-e` | Built | Canonical | Not wired |
| Long U Silent E | `silent-e-long-u` | Focused VCe long-u practice | `grade-1-long-vowels-silent-e` | Built | Canonical | Not wired |
| Long E Silent E | `silent-e-long-e` | Focused VCe long-e practice | `grade-1-long-vowels-silent-e` | Built | **Needs reclassification** — `SKILLS_MODEL.md` §7 explicitly says Long E Silent E "should require autonomy review," but it already ships as a full member of the public Silent E family. The map should not treat it as settled-canonical until that review happens. | Not wired |
| AI and AY | `vowel-teams-ai-ay` | Focused long-a vowel-team practice | `grade-1-long-a-long-o-vowel-teams` | Built | Canonical | Not wired |
| EE and EA | `vowel-teams-ee-ea` | Focused long-e vowel-team practice | `grade-1-long-e-vowel-teams` | Built | Canonical | Not wired |
| OA and OW | `vowel-teams-oa-ow` | Focused long-o vowel-team practice | `grade-1-long-a-long-o-vowel-teams` | Built | Canonical | Not wired |

### Built pages with ambiguous or deferred Skill identity

| Skill | Slug | Purpose | Canonical Grade Unit references | Build status | Curriculum status | Relationship status |
|---|---|---|---|---|---|---|
| OI and OY (diphthong) | `vowel-teams-oi-oy` | Focused oi/oy diphthong practice | Grade 2 Order 1 (proposed) | Built | Needs reclassification — deferred public-family decision (fold into Vowel Teams vs. separate Diphthongs family), per `SKILLS_MODEL.md` §7 | Not wired |
| OU and OW (diphthong) | `vowel-teams-ou-ow` | Focused ou/ow diphthong practice | Grade 2 Order 1 (proposed) | Built | Needs reclassification (same as above) | Not wired |
| AR | `r-controlled-ar` | Focused AR practice | `grade-1-r-controlled-ar-or`, Grade 2 Order 2 (proposed) | Built | Proposed — strong candidate per `K5_CURRICULUM_COVERAGE.md`, not yet registered in `SPELLING_SKILL_FAMILIES` | Not wired |
| OR | `r-controlled-or` | Focused OR practice | `grade-1-r-controlled-ar-or`, Grade 2 Order 2 (proposed) | Built | Proposed | Not wired |
| ER/IR/UR | `r-controlled-er-ir-ur` | Focused grouped ER/IR/UR practice | `grade-1-r-controlled-er-ir-ur`, Grade 2 Order 2 (proposed) | Built | Proposed | Not wired |
| C/K/CK Choices | `c-k-ck-words` | Explains c vs. k vs. ck spelling choice | `kindergarten-ck-ending-words`, `grade-1-cvc-short-vowels-c-k-rule` | Built | Needs reclassification — role vs. Grade Unit vs. One-Syllable-Patterns family undecided | Not wired |
| TCH and DGE | `tch-dge-ending-words` | Explains tch/dge vs. ch/ge choice | `grade-1-tch-dge-ending-rules` | Built | Needs reclassification — carries grade-3 metadata per audit but functions as a Grade 1 targeted page | Not wired |

### Named-canonical Skills not yet built (per `SKILLS_MODEL.md` §8)

| Skill | Purpose | Canonical Grade Unit references | Build status | Curriculum status |
|---|---|---|---|---|
| Beginning Blends | Reusable blend-family practice | `grade-1-beginning-consonant-blends` | Not built | Canonical |
| Ending Blends | Reusable blend-family practice | `grade-1-ending-consonant-blends` | Not built | Canonical |
| Final CK | Explains CK spelling | `kindergarten-ck-ending-words`, `grade-1-consonant-digraphs-final-ck` | Not built (see `c-k-ck-words` above, which may already fill this role) | Canonical |
| FLOSS / Double Final Consonants | Explains FLOSS pattern | `kindergarten-double-consonants`, `grade-1-floss-rule` | Not built | Canonical |
| Silent Letters | Explains silent-letter spellings | Grade 2 Order 9 (proposed) | Not built | Canonical |
| Open Syllables | Explains open-syllable long vowels | `grade-1-open-syllables-final-y` | Not built | Proposed (provisional per `SKILLS_MODEL.md` §7) |
| Multisyllabic Words | Reusable multisyllabic-word practice | `grade-3-multisyllabic-words`, `grade-5-multisyllabic-academic-words` | Not built | Canonical |
| Compound Words | Reusable compound-word practice | Grade 2 Order 3 (proposed) | Not built | Canonical |
| Plurals and -s/-es | Reusable plural-spelling practice | `grade-1-inflectional-endings-s-es`, Grade 2 Order 5 (proposed) | Not built | Canonical |
| Contractions | Reusable contraction practice | Grade 2 Order 4 (proposed) | Not built | Canonical |
| -ed and -ing | Reusable inflectional-ending practice | `grade-1-inflectional-endings-ed-ing` | Not built | Canonical |
| Comparatives -er/-est | Reusable comparative-suffix practice | Grade 2 Order 6 (proposed) | Not built | Canonical |
| Common Suffixes | Reusable suffix practice | Grade 2 Order 8, Grade 3 Order 2, Grade 5 Order 2 (proposed) | Not built | Canonical |
| Doubling Final Consonants | Suffix spelling-change practice | `grade-3-doubling-final-consonants` | Not built | Canonical |
| Dropping Silent E | Suffix spelling-change practice | `grade-3-dropping-silent-e` | Not built | Canonical |
| Changing Y to I | Suffix spelling-change practice | `grade-3-changing-y-to-i` | Not built | Canonical |
| Suffix Spelling Changes (grouping) | Umbrella for the three rules above | `grade-5-spelling-rules` | Not built | Canonical |
| UN and RE Prefixes | Reusable prefix practice | `grade-2-prefixes-un-re`, `grade-3-prefix-words` | Not built | Canonical |
| Common Prefixes | Reusable prefix practice | `grade-3-prefix-words`, `grade-5-prefix-suffix-words` | Not built | Canonical |
| Greek and Latin Roots | Reusable root-family practice | `grade-3-root-word-families`, `tier-1-roots-and-patterns`, `tier-2-greek-latin-roots`, `grade-5-greek-latin-word-parts` | Not built | Canonical |
| Homophones | Reusable homophone practice | `grade-2-homophones`, `grade-3-homophones` | Not built | Canonical |
| Commonly Confused Words | Reusable confused-word practice | Grade 4 Order 5 (proposed), `grade-5-commonly-confused-words` | Not built | Canonical |
| Advanced Prefixes | Upper-elementary prefix extension | `grade-4-advanced-prefixes` | Not built | Proposed (provisional per `SKILLS_MODEL.md` §8) |
| Advanced Suffixes | Upper-elementary suffix extension | `grade-4-advanced-suffixes` | Not built | Proposed (provisional per `SKILLS_MODEL.md` §8) |

No Skills were identified in this session's research that are absent from `SKILLS_MODEL.md`'s canonical list — every "not built" Skill above is already named there, so nothing in this table needed a fresh `Proposed`-from-scratch entry beyond the two provisional ones SKILLS_MODEL itself flags.

---

## 3. Grade Unit ↔ Skill relationship map

**Intended relationships:** every Grade Unit row in §1 lists its Canonical Skill link(s) — that is the intended map. In aggregate, essentially every phonics-pattern Grade Unit (K short-vowels through Grade 1's 15 units) is intended to link to one or more of the 17 built Skills, and essentially every Grade 2–5 morphology Grade Unit is intended to link to a named-but-unbuilt Skill.

**Implementation gap:** of the ~25 Grade Units in §1 with a stated canonical Skill link, **exactly one** (`kindergarten-short-a-words → short-a-words`) has that link wired via `skillIds`. This is not a set of isolated oversights; it is a systemic, unimplemented layer of the architecture. Concretely:

- **Skills with no canonical Grade Unit reference at all (true orphans):** none identified — every built Skill traces to at least one Grade Unit's intended link above. The gap is entirely on the wiring side, not on missing relationships.
- **Skills that should be referenced but are not wired (the common case):** all 16 remaining built Skills (`short-e/i/o/u-words`, all four digraphs, all five Silent E pages, all three Vowel Teams pages), plus every not-yet-built Canonical Skill once it ships.
- **Skills with genuinely unresolved identity** (§2's "ambiguous or deferred" table) cannot be meaningfully wired until their Skill-vs-Grade-Unit-vs-Practice-Set role is settled — wiring them today would encode an unreviewed decision into the content graph.

---

## 4. Appendix A — Grade 1 supporting inventory (by family)

Grade 1's core sequence fans out into 9 gateway pages, 52 targeted-skill pages, and 3 vocabulary pages. Organized by family; individual pages are called out only where they diverge from their family's recommendation.

| Family | IDs | Recommended classification | Rationale |
|---|---|---|---|
| Beginning blend pages (18) | `bl`, `br`, `cl`, `cr`, `dr`, `fl`, `fr`, `gl`, `gr`, `pl`, `pr`, `sl`, `sm`, `sn`, `sp`, `st`, `sw`, `tr` — all `-blend-words` | **Practice Set / filtered destination** | `SKILLS_MODEL.md` §9: individual blends should normally remain Practice Sets/filters, not independent pages. `gl-blend-words`, `sm-blend-words`, `sw-blend-words` are only 6 words each — thin content, reinforcing the recommendation. |
| Ending blend pages (11) | `nd`, `ng`, `ld`, `st`, `nt`, `nk`, `ft`, `lk`, `lt`, `mp`, `sk` — all `-final-blend-words` | **Practice Set / filtered destination** | Same rationale. Note the 6-at-grade-1/5-at-grade-2 split (`ft/lk/lt/mp/sk`) is documented as intentional sequencing, not a tagging bug (Bible §7 Notes) — preserve that split if these become filters. |
| Short-vowel targeted pages (5) | `short-a/e/i/o/u-words` | **Skill page** | Already `Existing`/`Canonical` in §2 — correctly built as reusable Skills, not narrow Practice Sets. |
| Digraph targeted pages (4) | `digraph-sh/ch/th/wh-words` | **Skill page** | Already `Existing`/`Canonical` in §2. |
| Silent-E targeted pages (5) | `silent-e-long-a/e/i/o/u` | **Skill page** | Already `Existing`/`Canonical` in §2, except `silent-e-long-e` — see its Needs-reclassification note. |
| Vowel-team targeted pages (3) | `vowel-teams-ai-ay/ee-ea/oa-ow` | **Skill page** | Already `Existing`/`Canonical` in §2. |
| R-controlled targeted pages (3) | `r-controlled-ar/or/er-ir-ur` | **Skill page** | Built but `Proposed` curriculum status in §2 — recommended promotion to `Canonical` pending Decision Register item 4. |
| Heart-word targeted pages (3) | `grade-1-heart-words-part-1/2/3` | **Supporting Grade Unit** (Sight Word Set sub-parts, not Skills) | These split the Grade 1 Heart Words Grade Unit's word set; they are not reusable spelling-pattern Skills, so they don't belong in §2. |
| CK / TCH-DGE pages | `c-k-ck-words`, `tch-dge-ending-words` | **Needs reclassification** | See §2 — role vs. Grade Unit vs. One-Syllable-Patterns family membership is unresolved. |
| Gateway pages (9) | `grade-1-short-vowel-practice`, `grade-1-consonant-digraph-practice`, `grade-1-beginning-blend-practice`, `grade-1-ending-blend-practice`, `grade-1-silent-e-practice`, `grade-1-heart-word-practice`, `grade-1-r-controlled-vowel-practice`, `grade-1-vowel-team-practice`, `grade-1-tch-dge-practice` | **Needs reclassification** | These exist specifically to route users to the targeted pages above — `CONSTITUTION.md` §11 (No-Gateway Rule) says a page inserted into the learning path "merely to expose another directory of links" should not survive indefinitely. Whether these become redundant once their sibling Skill pages are properly discoverable is Decision Register item 6. |
| Vocabulary pages (3) | `grade-1-list-01`, `grade-1-list-02`, `grade-1-describing-words` | **Supporting Grade Unit** (Vocabulary/Theme List identity) | Useful supplemental practice; not part of the phonics/morphology spine. |

---

## 5. Appendix B — Legacy / duplicate inventory

| Item(s) | Issue | Recommendation |
|---|---|---|
| `phonics/short-vowels-cvc-words.md` (archived) vs. `short-a/e/i/o/u-words.md` (published, 5 separate) | Superseded mixed-CVC list, still archived not deleted. Its stale prerequisite link into `silent-e-long-a` was already fixed in the audit's Phase 4 pass. | **Archive** (confirm, no action needed) — already effectively resolved; keep archived rather than republish. |
| `dolch-pre-primer`, `dolch-primer`, `dolch-second-grade`, `dolch-third-grade` (previously archived) vs. `dolch-first-grade-a/b/c` | Per the audit, these were republished in Phase 3 Resolution (2026-06-30) — all 7 Dolch tiers are now `status: published`. | **Keep** — resolved; flagged here only so this map doesn't get read as contradicting that resolution. |
| `grade-level/5th-grade-academic-words.md` vs. `challenge/academic-vocabulary.md` | 3-word overlap (communicate, examine, identify); different difficulty tiers. Bible documents this as an intentional grade→challenge ladder. | **Keep as ladder** — but recommend an explicit `relatedLists` link between them if not already present, so the relationship is discoverable, not just documented in prose. |
| `grade-level/5th-grade-reading-writing-words.md` vs. `grade-level/5th-grade-opinion-argument-words.md` | 3-word overlap (argument, claim, conclusion); different instructional framing (reading/writing vs. persuasive writing). | **Keep** — plausible intentional distinction, but confidence is lower than the item above; worth one editorial look, not urgent. |
| `2nd-grade-compound-words` (Bible naming) vs. `grade-2-list-02` (K5-coverage naming) | Same underlying content referenced by two different names across documents — a naming-consistency problem, not a content duplicate. | **Reclassify** — confirm the single stable `id`, and stop referring to it by inconsistent names across curriculum documents going forward. |
| Grade 1's `c-k-ck-words` carrying an implied Kindergarten/Grade-1 crossover role, and `tch-dge-ending-words` carrying grade-3 metadata while functioning as a Grade 1 page (per `curriculum-audit-phase-2.md` §1.3 notes) | Metadata/role mismatch. | **Reclassify** — align grade metadata with actual placement once Decision Register item 1 resolves these pages' Skill status. |

---

## 6. Curriculum review

Evaluated the way a reviewer would evaluate a commercial K–5 spelling program:

1. **The single biggest structural weakness is that four of six grades have no curated Grade Unit sequence at all.** `CONSTITUTION.md` §8 explicitly prohibits Grade Roadmaps that are "generated automatically from raw content categories," yet that is exactly what Grades 2–5 do today. This map's proposed Grade 2–5 spines close that gap on paper; implementing `grade2Progression.ts`–`grade5Progression.ts` analogues is the highest-leverage next engineering step once these sequences are approved.

2. **Grade 3 is a structural cliff, not a gentle ramp.** By explicit design (Bible §7), Grade 3 carries zero primary phonics content — all phonics review is pushed to Grades 1–2. But Grade 3 also has zero *built* morphology Grade Units today (all eight proposed Grade 3 rows in §1 are `Proposed`, none `Published`). A student moving from Grade 2 to Grade 3 today has no live grade-appropriate content at all. This is the single most urgent sequencing gap in the entire map.

3. **Grade 1's four-tier fan-out (15 core → 9 gateways → 52 targeted → 3 vocabulary) is a pattern, not an accident, and it should not propagate unexamined into Grades 2–5.** Individually, most of the 52 targeted pages are legitimate (short vowels, digraphs, silent-e, vowel teams are already correctly built as Skills). But 29 of them are single-blend Practice Sets that `SKILLS_MODEL.md` itself says should not be independent pages, and the 9 gateway pages exist solely to route between core units and those targeted pages — precisely the "Practice Gateway → more choices → actual practice" anti-pattern `CONSTITUTION.md` §11 names directly. Grades 2–5 have no gateway/targeted layer yet; this is the moment to decide whether Grade 1's pattern is a template to repeat or a mistake to correct before it does.

4. **`skillIds` wiring is effectively unimplemented (1 of ~25 intended links), which means the "Choose Specific Practice" journey (`CONSTITUTION.md` §3.3) cannot currently be reached from a Grade Roadmap context.** The Skills exist; the relationship metadata connecting them to Grade Units does not. This silently defeats one of the product's three core journeys for every grade and pattern except Kindergarten Short A.

5. **Duplicated concepts are mostly benign, but one is worth resolving before it multiplies.** The 5th-grade-academic-words/challenge-academic-vocabulary and reading-writing/opinion-argument overlaps (Appendix B) look like deliberate ladders. But the pattern of parallel near-identical vocabulary lists at every grade (`Nth-grade-everyday-words`, `Nth-grade-describing-words`, etc.) is Vocabulary/Theme content, not curriculum spine — this map deliberately excludes it from §1, and recommends the same discipline apply as Grades 2–5 content gets formalized, so vocabulary breadth doesn't get mistaken for morphology-core completeness (as arguably happened with Grade 5's "12-list capstone architecture," most of which is vocabulary, not Grade Units — see §1's Grade 5 table, which surfaces only 5 of those 12 as genuine spine units).

6. **Missing Skills are not really "missing" — they're unbuilt, and the taxonomy is already sound.** `SKILLS_MODEL.md` §8 already names essentially every Skill this map's Grade 2–5 proposal needs (Compound Words, Contractions, Plurals, Common Prefixes/Suffixes, Suffix Spelling Changes, Greek and Latin Roots, Homophones, Commonly Confused Words). The gap is production, not design — a good sign for how fast Grades 2–5 could move once sequencing is approved.

7. **Documentation itself has drifted out of sync in at least one place worth naming plainly:** `curriculum-bible.md`/`content-production-roadmap.md` list Grade 2 Contractions, Homophones, and Plural rules as "Missing" / "Not Started," while `K5_CURRICULUM_COVERAGE.md` (written later, from direct frontmatter inspection) lists `grade-2-contractions`, `grade-2-homophones`, and `grade-2-regular-plurals` as existing content needing only role/roadmap integration. This map follows the more recent, directly-verified source (`K5_CURRICULUM_COVERAGE.md`) for §1's Grade 2 table, but the contradiction itself is a signal that the older planning documents need a reconciliation pass — tracked in the Decision Register.

8. **Kindergarten's CVC scope is a real, unresolved product question, not just a content gap.** The Bible explicitly defers on whether Kindergarten should get a phonics-foundations format (e.g., beginning-sound identification) distinct from full CVC spelling, which today starts at Kindergarten only via the five short-vowel core units built for whole-word spelling. This map does not resolve it either — it is Decision Register item 3.

---

## 7. Decision Register

Every item below requires product-owner approval before this document can move from freeze *candidate* to authoritative. Each lists the options and a recommendation; none has been decided unilaterally.

1. **Role of the 52 Grade 1 targeted practice pages.**
   Options: (a) keep as-is (individually indexed pages); (b) demote single-pattern pages (blends, final blends) to Practice Sets/filters per `SKILLS_MODEL.md` §9, keeping only the pattern-family Skills (short vowels, digraphs, silent-e, vowel teams, r-controlled) as standalone pages; (c) full audit page-by-page.
   *Recommendation: (b) — Appendix A's family-level classification already supports this reading; formal approval just needs to ratify it.*

2. **Final Grade 2–5 Grade Unit sequence.**
   Options: (a) approve §1's proposed sequences as-is; (b) revise ordering/inclusion before approval; (c) request additional content-gap research before deciding.
   *Recommendation: (a), with the caveat that Grade 3 (finding 2 in §6) should be prioritized for implementation regardless of final ordering.*

3. **Kindergarten CVC scope.**
   Options: (a) keep full CVC spelling as Kindergarten's phonics core, as currently shipped; (b) add a distinct K-appropriate phonics-foundations format (e.g., beginning-sound identification) alongside it; (c) leave undecided and revisit post-launch.
   *Recommendation: (a) for the frozen map, since it's already shipped and tested — but log (b) as a distinct future-format question, not a curriculum-sequencing one.*

4. **Which `Proposed` Skills should become `Canonical`.**
   Specifically: `vowel-teams-oi-oy`/`vowel-teams-ou-ow` (fold into Vowel Teams vs. new Diphthongs family), `r-controlled-ar/or/er-ir-ur` (promote to a registered public family), `c-k-ck-words` and `tch-dge-ending-words` (Skill vs. Grade Unit vs. One-Syllable-Patterns membership), and `silent-e-long-e` (confirm or revisit its already-shipped inclusion in the Silent E family).
   *Recommendation: promote R-Controlled Vowels to a registered family (strong, compact, already flagged pre-launch-ready by `K5_CURRICULUM_COVERAGE.md`); defer the CK/TCH-DGE and diphthong calls pending the One-Syllable-Patterns family decision.*

5. **Legacy/duplicate content disposition (Appendix B).**
   Each of the five Appendix B items needs an explicit keep/merge/archive/reclassify sign-off, even where this map recommends "keep" — silent inheritance of the status quo is exactly what this process is meant to avoid.

6. **Whether the 9 Grade 1 gateway pages remain part of the architecture.**
   Options: (a) keep as permanent navigation aids; (b) retire once Skill pages are independently discoverable via a Skills browsing experience; (c) keep temporarily, revisit after Grades 2–5 are built (avoiding the same pattern from being designed into new grades in the meantime).
   *Recommendation: (c) — matches `SKILLS_MODEL.md` §16's own framing of gateway pages as transitional.*

7. **Reconciliation of `curriculum-bible.md`/`content-production-roadmap.md` against `K5_CURRICULUM_COVERAGE.md`** where they disagree on what currently exists (finding 7 in §6), so future planning documents don't propagate the stale "Missing" status for Grade 2 Contractions/Homophones/Plurals.
   *Recommendation: a short reconciliation pass updating the two older documents' gap tables, separate from this map's own approval.*
