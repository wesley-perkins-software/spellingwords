# SpellingWords.app Curriculum Bible

> **This is the single source of truth** for grade-level spelling coverage, existing list placement, content gaps, and all future roadmap decisions. Update it whenever lists are added, audited, or reorganized.

---

## 1. Purpose

This document governs all content decisions for SpellingWords.app. It answers:

- What spelling skills belong at each grade level?
- What lists already exist, and where do they fit?
- What gaps remain, and in what order should they be filled?
- What rules prevent ad-hoc, inconsistent content growth?

Every new spelling list, every grade tag assignment, and every hub reorganization should trace back to this document.

---

## 2. Curriculum Principles

These principles apply to every content decision, regardless of grade or topic.

1. **Grade-first.** Parents and teachers search by grade. Grade hubs are the primary entry point — skills and themes exist to support them, not replace them.
2. **Evidence-based sequencing.** Content order follows established literacy research (phonics before morphology, concrete before abstract, simple before multisyllabic). We do not invent our own scope and sequence.
3. **One job per list.** Each list targets one clear skill or theme. Lists that try to cover too much dilute instructional value.
4. **Calm, reassuring tone — always.** No gamification, no timers, no streaks, no badges. Feedback is warm and low-pressure. This applies to all copy, list names, and category labels.
5. **Completeness over quantity.** A grade hub with 5 well-chosen lists is better than one with 20 poorly organized lists. Fill genuine gaps; don't pad.
6. **Accessibility is non-negotiable.** Word lists, instructions, and UI must be usable by children with dyslexia, auditory processing differences, and other learning profiles. Prefer high-legibility fonts and clear structure.
7. **Conservative taxonomy.** Add new categories only when an existing one genuinely cannot accommodate the content. Every new category adds navigation complexity and maintenance burden.
8. **Interoperability with the app.** All lists must conform to the Content Collection schema in `src/content/config.ts`. No content decision should require a schema migration unless it is a deliberate, planned upgrade.

---

## 3. Definitions

| Term | Definition |
|---|---|
| **Primary Grade** | The grade at which this list is the best instructional fit. Every list must have exactly one primary grade. Used to populate grade hubs. |
| **Secondary Grade** | A grade at which this list is useful for review (lower grade) or preview/enrichment (higher grade). Optional. Should be used sparingly to avoid bloating grade hubs. |
| **Skill** | A discrete phonics or word-study concept: a pattern, rule, or structural feature (e.g., "short-a CVC words", "silent-e long vowel", "prefix un-"). Skills drive K–2 phonics lists and 3–5 morphology lists. |
| **Theme** | A concrete topic that groups words by meaning rather than spelling pattern (e.g., "color words", "school words", "science vocabulary"). Themes are most useful in K and early 1st grade before phonics patterns are established. |
| **Sight Word / High-Frequency Word** | A word that appears very frequently in written English and must be recognized quickly. Many are phonetically irregular. We use the Dolch list as our primary source. |
| **Challenge Word** | A word appropriate for advanced practice beyond the expected grade level. The `challenge/` category is reserved for content with no single natural grade home — genuine cross-grade enrichment that extends past a grade's own expectation, not content that merely fills it. `difficulty: challenge` is a separate, independent signal for rigor and can apply to any category, including `grade-level` lists whose content is core curriculum for their grade but written at a demanding tier. |
| **Prerequisite Skill** | A skill that students should have mastered before this list will be effective. Noted as "Builds Upon" in grade sections below. |
| **Coverage** | The degree to which a grade's expected curriculum has lists in the app. "Full" = major skills covered; "Partial" = some skills covered; "Thin" = few lists exist; "Missing" = no lists exist. |
| **Gap** | A skill or theme that research identifies as important for a grade but for which no list currently exists. |

---

## 4. Core Strategy

### Architecture

```
Homepage
  └── Spelling List Hub
        └── Grade Hubs  ← primary entry point
              └── Individual Spelling List Pages
                    └── Practice Session
```

Parents and teachers arrive with a grade in mind. Grade hubs must immediately answer: *"Here are the spelling lists for your child's grade."*

Skill-based browsing (e.g., "all phonics lists", "all sight word lists") is a secondary navigation layer — useful but never the primary path.

### K–2 vs. 3–5 Curriculum Split

| Band | Primary Focus | Secondary Focus |
|---|---|---|
| **K–2** | Phonics, decoding/encoding, letter-sound correspondences, high-frequency words, concrete vocabulary themes | Early morphology, simple inflections |
| **3–5** | Morphology, multisyllabic words, Greek/Latin roots, prefixes/suffixes, academic vocabulary, content-area vocabulary | Phonics review for irregular words |

This split reflects how skilled reading develops: phonics fluency must precede morphological analysis. Lists placed at the wrong grade level undermine this progression.

### Taxonomy Constraints

- **Do not create new top-level categories** without explicit justification in this document.
- Current categories: `phonics/`, `sight-words/`, `grade-level/`, `challenge/`
- New sub-themes within a category are acceptable; new top-level categories are not.
- Grade tags (`grades` frontmatter field) drive grade hub membership — keep tagging conservative.

---

## 5. Running Progress Map

| Task | Status | Notes | Date |
|---|---|---|---|
| Curriculum Bible scaffold created | ✅ Complete | Initial document created at `docs/content/curriculum-bible.md` | 2026-06-29 |
| Existing spelling list inventory audited | ✅ Complete | Full audit report with confidence-rated findings and recommendations (fact-gathering only, Bible decisions deferred): `docs/content/curriculum-audit-phase-2.md` | 2026-06-29 |
| Curriculum architecture decisions approved | ✅ Complete | Grade-by-grade canonical model and decision table for the 6 audit findings approved; see Phase 3 Resolution in `docs/content/curriculum-audit-phase-2.md` | 2026-06-30 |
| Primary grade assigned to each list | ✅ Complete | Archived Dolch lists republished; root lists retagged grade 4; diphthongs retagged grade 2. Remaining ungraded lists were already correctly tagged. | 2026-06-30 |
| Secondary grade/review tags assigned | ⬜ Not needed | Cross-grade relationships (e.g. tier-2-greek-latin-roots as Grade 5 review/extension) expressed via `relatedLists`/`prerequisiteLists`/`nextLists` instead of a secondary-grade field — see Decision Rules §12 | 2026-06-30 |
| Kindergarten gaps identified | ⬜ Not started | Known gaps pre-filled in Section 9 | — |
| 1st grade over-tagging reviewed | ⬜ Not started | Many phonics lists may be mis-tagged | — |
| 2nd grade pattern gaps identified | ⬜ Not started | Known gaps pre-filled in Section 9 | — |
| 3rd grade morphology gaps identified | ⬜ Not started | Known gaps pre-filled in Section 9 | — |
| 4th grade morphology/roots gaps identified | ⬜ Not started | Known gaps pre-filled in Section 9 | — |
| 5th grade academic vocabulary/root gaps identified | ⬜ Not started | Known gaps pre-filled in Section 9 | — |
| Grade hub structure finalized | ⬜ Not started | After audit and gap analysis | — |
| Next 20 list roadmap finalized | ⬜ Not started | Use gap matrix as input | — |
| Launch readiness checklist completed | ⬜ Not started | Final pre-launch review | — |

---

## 6. Current Library Snapshot

> Update this table whenever lists are added, removed, or reclassified.

| Category | List Count | Notes |
|---|---|---|
| `phonics/` | 50 | Blends, digraphs, short vowels, silent-e, r-controlled, vowel teams |
| `sight-words/` | 7 | Dolch pre-primer through 3rd grade — all 7 tiers now `status: published` |
| `grade-level/` — Kindergarten | 3 | first-words, number-color-words, describing-words |
| `grade-level/` — 1st Grade | 3 | action-words, describing-words, everyday-words |
| `grade-level/` — 2nd Grade | 4 | action-words, compound-words, describing-words, everyday-words |
| `grade-level/` — 3rd Grade | 3 | describing-words, everyday-words, reading-writing-words |
| `grade-level/` — 4th Grade | 5 | community-words, everyday-words, reading-writing-words, tier-1-roots-and-patterns, tier-2-greek-latin-roots (two root lists reclassified from `challenge/` — see §2.2 of the approved curriculum architecture) |
| `grade-level/` — 5th Grade | 6 | academic-words, community-civics-words, everyday-words, opinion-argument-words, reading-writing-words, science-nature-words |
| `challenge/` | 1 | academic-vocabulary only — the two root lists moved to `grade-level/` (4th Grade) |
| **Total** | **82** | As of 2026-06-30 |

---

## 7. Grade-Level Curriculum Map

---

### Kindergarten

**Builds Upon:** Pre-literacy (letter recognition, phonemic awareness, print concepts)

#### Expected Focus
Letter sounds, beginning sounds, ending sounds, simple CVC words, short vowels, color words, number words, shape words, family words, school words, animal words, beginner high-frequency/sight words (Dolch pre-primer and primer).

#### Common List Types
- Thematic vocabulary lists (color, number, shape, family, school, animal)
- Simple CVC word lists by vowel
- Beginning/ending sound sorts
- Dolch pre-primer and primer sight words

#### Current Coverage
| List | Type | Notes |
|---|---|---|
| kindergarten-first-words | Theme | General starter vocabulary |
| kindergarten-number-color-words | Theme | Numbers and colors combined |
| kindergarten-describing-words | Theme | Basic adjectives |
| dolch-pre-primer | Sight words | ✅ Live (`status: published`) |
| dolch-primer | Sight words | ✅ Live (`status: published`) |

Coverage: **Thin** — 5 lists total; major thematic and phonics categories missing.

#### Target Coverage Checklist
- [ ] CVC short-a words (kindergarten level)
- [ ] CVC short-e words (kindergarten level)
- [ ] CVC short-i words (kindergarten level)
- [ ] CVC short-o words (kindergarten level)
- [ ] CVC short-u words (kindergarten level)
- [x] Color words
- [x] Number words
- [ ] Shape words
- [ ] Family words (mom, dad, sister, brother…)
- [ ] School words (desk, pencil, teacher…)
- [ ] Animal words (cat, dog, fish…)
- [x] Dolch pre-primer sight words
- [x] Dolch primer sight words
- [x] Basic describing/adjective words

#### Likely Gaps
Shape words, family words, school words, animal words, and individual short-vowel CVC lists at a kindergarten level of difficulty. The existing phonics CVC lists (`phonics/short-vowels-cvc-words.md`) may be appropriate, but individual short-vowel lists may be more instructionally useful at K level.

#### Notes
Kindergarten is the most underbuilt grade. Thematic lists (by topic, not pattern) are the right approach here — children at this stage benefit from meaningful word groups before abstract phonics patterns are introduced formally.

Real K phonics foundations — letter sounds, beginning/ending sounds, phonemic awareness — are a legitimate instructional need at this grade and are not being dismissed. What stays Grade 1 primary is full CVC *spelling* practice: typing a complete CVC word matches both standard scope-and-sequence (decoding/sound-isolation precedes encoding/spelling) and this app's current type-the-whole-word practice format. This is recorded here as a **future curriculum consideration** — a possible K-appropriate phonics-foundations list format (e.g., beginning-sound identification) distinct from CVC spelling — not as an open gap to fill by simply relabeling Grade 1 content as Grade K. No Target Coverage Checklist item is added for it.

---

### 1st Grade

**Builds Upon:** Kindergarten letter sounds, CVC words, pre-primer/primer sight words

#### Expected Focus
Short vowel mastery across all five vowels, initial consonant blends, consonant digraphs (ch, sh, th, wh), silent-e / magic-e long vowels, simple inflectional endings (-s, -ed, -ing), simple two-syllable words, irregular high-frequency words (Dolch 1st grade).

#### Common List Types
- Short vowel word families
- Initial blend lists (bl-, br-, cl-, cr-, dr-, fl-, fr-, gl-, gr-, pl-, pr-, sl-, sm-, sn-, sp-, st-, sw-, tr-)
- Final blend lists (-ft, -ld, -lk, -lt, -mp, -nd, -ng, -nk, -nt, -sk, -st)
- Digraph lists (ch, sh, th, wh)
- Silent-e long vowel lists
- Dolch 1st grade sight words

#### Current Coverage
| List | Type | Notes |
|---|---|---|
| phonics/short-a/e/i/o/u-words | Phonics | ✅ All five short vowels |
| phonics/short-vowels-cvc-words | Phonics | ✅ Mixed CVC |
| phonics/*-blend-words (18 lists) | Phonics | ✅ Comprehensive initial blend coverage |
| phonics/*-final-blend-words (11 lists) | Phonics | ✅ Comprehensive final blend coverage |
| phonics/digraph-ch/sh/th/wh-words | Phonics | ✅ All four major digraphs |
| phonics/silent-e-long-a/i/o | Phonics | ✅ Three silent-e patterns |
| dolch-first-grade-a/b/c | Sight words | ✅ Full Dolch 1st grade set |
| grade-level/1st-grade-action-words | Theme | Vocabulary enrichment |
| grade-level/1st-grade-describing-words | Theme | Vocabulary enrichment |
| grade-level/1st-grade-everyday-words | Theme | Vocabulary enrichment |

Coverage: **Strong for phonics and sight words.** May appear "overbuilt" because the 44 phonics lists are all natural 1st grade instructional content.

#### Target Coverage Checklist
- [x] Short-a, e, i, o, u word lists
- [x] CVC mixed vowel list
- [x] Initial blends (bl, br, cl, cr, dr, fl, fr, gl, gr, pl, pr, sl, sm, sn, sp, st, sw, tr)
- [x] Final blends (ft, ld, lk, lt, mp, nd, ng, nk, nt, sk, st)
- [x] Digraphs (ch, sh, th, wh)
- [x] Silent-e long-a, long-i, long-o
- [ ] Silent-e long-u (cube, tune…)
- [x] Dolch 1st grade sight words (a, b, c sets)
- [ ] Inflectional endings (-s, -ed, -ing) as a dedicated list
- [ ] Simple two-syllable words list

#### Likely Gaps
Silent-e long-u pattern; a dedicated inflectional endings list; simple two-syllable words. The phonics coverage for 1st grade is otherwise thorough.

#### Notes
The impression of being "overbuilt" is partly an artifact of phonics lists being correctly placed here. The grade hub should organize these lists clearly (e.g., grouped by skill type) so parents aren't overwhelmed. Consider whether the `phonics/` lists should display prominently in the 1st grade hub or be shown as a secondary "phonics practice" section.

The final-blend lists are intentionally split across two grades, not inconsistently tagged: `nd/ng/ld/st/nt/nk` are Grade 1 because they are higher-frequency patterns; `ft/lk/lt/mp/sk` are Grade 2 because they are lower-frequency patterns that build on the Grade 1 set. This is a documented, intentional sequencing choice approved as part of the curriculum architecture review — a future audit should not re-flag it as a mis-tag.

---

### 2nd Grade

**Builds Upon:** Short vowels, blends, digraphs, silent-e, Dolch 1st grade words

#### Expected Focus
Vowel teams (ai/ay, ee/ea, oa/ow, oi/oy, ou/ow), r-controlled vowels (ar, er/ir/ur, or), diphthongs, compound words, contractions, plurals (regular and irregular), inflectional endings with spelling changes (doubling, drop-e), prefixes (un-, re-), suffixes (-ful, -less), homophones, harder high-frequency words (Dolch 2nd grade).

#### Common List Types
- Vowel team lists by pattern
- R-controlled vowel lists
- Compound word lists
- Contraction lists
- Homophone pairs
- Dolch 2nd grade sight words
- Early prefix/suffix lists

#### Current Coverage
| List | Type | Notes |
|---|---|---|
| phonics/vowel-teams-ai-ay | Phonics | ✅ |
| phonics/vowel-teams-ee-ea | Phonics | ✅ |
| phonics/vowel-teams-oa-ow | Phonics | ✅ |
| phonics/vowel-teams-oi-oy | Phonics | ✅ (diphthong, `grade: "2"`) |
| phonics/vowel-teams-ou-ow | Phonics | ✅ (diphthong, `grade: "2"`) |
| phonics/r-controlled-ar | Phonics | ✅ |
| phonics/r-controlled-er-ir-ur | Phonics | ✅ |
| phonics/r-controlled-or | Phonics | ✅ |
| grade-level/2nd-grade-compound-words | Theme/Skill | ✅ |
| grade-level/2nd-grade-action-words | Theme | Vocabulary |
| grade-level/2nd-grade-describing-words | Theme | Vocabulary |
| grade-level/2nd-grade-everyday-words | Theme | Vocabulary |
| dolch-second-grade | Sight words | ✅ |

Coverage: **Moderate.** Core phonics patterns are covered; morphology (contractions, homophones, prefixes/suffixes, plurals) is largely missing.

#### Target Coverage Checklist
- [x] Vowel teams: ai/ay, ee/ea, oa/ow, oi/oy, ou/ow
- [x] R-controlled: ar, er/ir/ur, or
- [x] Compound words
- [x] Dolch 2nd grade sight words
- [ ] Contractions (I'm, it's, can't, won't…)
- [ ] Homophones (to/two/too, their/there/they're…)
- [ ] Plural spelling rules (-s, -es, -ies)
- [ ] Inflectional endings with spelling changes (running, hopped, babies)
- [ ] Prefix un- words
- [ ] Prefix re- words
- [ ] Suffix -ful and -less words
- [ ] Silent letters (kn-, wr-, -mb)

#### Likely Gaps
Contractions, homophones, plurals, inflectional endings with spelling changes, basic prefixes (un-, re-), basic suffixes (-ful, -less), and silent letter patterns. These are core 2nd grade word study topics.

#### Notes
2nd grade is where word study begins to expand beyond pure phonics. The transition from phonics → morphology starts here with simple affixes and spelling-change rules.

Compound words are the first morphology content at this grade — and the grade's largest remaining gap (contractions, homophones, plurals, basic prefixes/suffixes) is the next layer of that same "emerging morphology" thread. Future authoring should tag new 2nd grade word-study lists with this framing in mind, distinguishing them from the pure phonics-pattern lists above.

---

### 3rd Grade

**Builds Upon:** Vowel teams, r-controlled vowels, compound words, Dolch 2nd grade words, basic prefixes/suffixes

#### Expected Focus
Prefixes (un-, re-, pre-, dis-, mis-), suffixes (-er, -est, -tion, -ly, -ness, -ment), multisyllabic words (2–3 syllables), homophones, spelling changes when adding endings (doubling, drop-e, y→i), root word basics, harder irregular words, academic vocabulary starter lists (words used in classroom instruction).

#### Common List Types
- Prefix/suffix lists by affix
- Multisyllabic word lists (2–3 syllable)
- Homophone pairs and sets
- Spelling-change rule lists
- Root word introductions
- Dolch 3rd grade sight words
- Academic vocabulary (tier 2 words)

#### Current Coverage
| List | Type | Notes |
|---|---|---|
| grade-level/3rd-grade-everyday-words | Theme | General vocabulary |
| grade-level/3rd-grade-describing-words | Theme | Adjectives/adverbs |
| grade-level/3rd-grade-reading-writing-words | Theme | Academic/ELA vocabulary |
| dolch-third-grade | Sight words | ✅ |

Coverage: **Thin.** Four lists only; no morphology lists exist for this grade.

#### Target Coverage Checklist
- [x] Dolch 3rd grade sight words
- [x] Reading/writing academic vocabulary
- [ ] Prefix un- (review/expansion from 2nd grade)
- [ ] Prefix re- (review/expansion)
- [ ] Prefix pre-
- [ ] Prefix dis-
- [ ] Prefix mis-
- [ ] Suffix -er / -est (comparatives)
- [ ] Suffix -tion / -sion
- [ ] Suffix -ly
- [ ] Suffix -ness / -ment
- [ ] Spelling changes: doubling final consonant (running, bigger)
- [ ] Spelling changes: drop-e (making, loved)
- [ ] Spelling changes: y → i (babies, happier)
- [ ] Homophones (grade 3 level pairs)
- [ ] Multisyllabic words — 2 syllable
- [ ] Multisyllabic words — 3 syllable
- [ ] Root word introduction (act, port, form…)

#### Likely Gaps
Almost all morphology content: prefixes, suffixes, spelling-change rules, roots, homophones, and multisyllabic word practice. This is the biggest structural gap in the library.

#### Notes
3rd grade is the inflection point where literacy instruction pivots from phonics to morphology. Building this grade out is a high priority.

Grade 3 carries **zero primary phonics content** by design under the approved curriculum architecture — all vowel-team, diphthong, and r-controlled phonics lists are tagged Grade 1 or 2. Any phonics relevance to a 3rd grader is review of Grade 2 content, not new instruction; this grade's content should be morphology and academic vocabulary only.

---

### 4th Grade

**Builds Upon:** Basic prefixes/suffixes, 2–3 syllable words, root word introduction, Dolch 3rd grade words

#### Expected Focus
Greek and Latin roots (aqua, aud, dict, port, rupt, scrib/script, spec/spect, struct, vis…), advanced prefixes (anti-, inter-, sub-, super-, trans-, pre-), advanced suffixes (-ible/-able, -ous, -ive, -tion, -ation), syllable types, longer multisyllabic words (3–4 syllables), academic vocabulary, commonly confused words (affect/effect, than/then, accept/except), science and social studies vocabulary.

#### Common List Types
- Greek/Latin root lists (one root per list)
- Advanced prefix/suffix lists
- Commonly confused word pairs
- Content-area vocabulary (science, social studies)
- Multisyllabic word lists (3–4 syllables)
- Academic vocabulary lists

#### Current Coverage
| List | Type | Notes |
|---|---|---|
| grade-level/4th-grade-everyday-words | Theme | General vocabulary |
| grade-level/4th-grade-reading-writing-words | Theme | Academic/ELA vocabulary |
| grade-level/4th-grade-community-words | Theme | Civic/community vocabulary |
| grade-level/tier-1-roots-and-patterns | Roots | Latin roots: port, dict, spect, rupt — reclassified from `challenge/`, `category: grade-level`, `grade: "4"` |
| grade-level/tier-2-greek-latin-roots | Roots | Greek roots: tele, photo, graph, bio, demo — reclassified from `challenge/`, `category: grade-level`, `grade: "4"`; also serves as Grade 5 review/extension via `relatedLists`/`prerequisiteLists` |

Coverage: **Moderate.** Five grade-level lists, including two dedicated root lists now correctly tagged to this grade. Advanced prefix/suffix and content-area vocabulary lists remain a gap.

#### Target Coverage Checklist
- [x] Reading/writing academic vocabulary
- [x] Community/civic vocabulary
- [x] Latin root: port (portable, transport, import…)
- [x] Latin root: dict (dictate, predict, contradict…)
- [ ] Latin root: struct (construct, instruct, structure…)
- [ ] Latin root: vis/vid (visible, vision, video…)
- [ ] Latin root: scrib/script (describe, prescription…)
- [x] Greek root: graph (photograph, paragraph…)
- [x] Greek root: phon/bio/demo family (biography, democracy…)
- [ ] Greek root: scope (microscope, telescope…)
- [ ] Prefix anti-
- [ ] Prefix inter-
- [ ] Prefix sub-
- [ ] Prefix super-
- [ ] Prefix trans-
- [ ] Suffix -ible / -able
- [ ] Suffix -ous / -ious
- [ ] Suffix -ive / -ative
- [ ] Commonly confused words (affect/effect, than/then, principal/principle…)
- [ ] Science vocabulary (4th grade level)
- [ ] Social studies vocabulary (4th grade level)
- [ ] 3–4 syllable multisyllabic word practice

#### Likely Gaps
Additional Latin/Greek root lists (struct, vis/vid, scrib/script, scope), advanced prefix/suffix lists, commonly confused words, and content-area vocabulary.

#### Notes
`tier-1-roots-and-patterns` and `tier-2-greek-latin-roots` are Grade 4's canonical morphology content, per the approved curriculum architecture (no longer flagged for audit — that audit is resolved). `tier-2-greek-latin-roots` additionally serves as Grade 5 review/extension through its existing `relatedLists`/`prerequisiteLists` chain rather than a duplicate grade tag.

---

### 5th Grade

**Builds Upon:** Basic Greek/Latin roots, advanced prefixes/suffixes, 3–4 syllable words, academic vocabulary introduction

#### Expected Focus
Advanced roots and affixes, academic vocabulary (tier 2 words: analyze, conclude, summarize, justify…), science and social studies vocabulary, suffix spelling changes (-tion vs. -sion, -ible vs. -able), commonly misspelled words, word origins (Anglo-Saxon vs. Latin vs. Greek), challenge words for advanced readers.

#### Common List Types
- Academic vocabulary by discipline (ELA, science, social studies, math)
- Advanced root lists
- Commonly misspelled word lists
- Word-origin exploration lists
- Suffix spelling-rule lists (-tion/-sion, -ible/-able)
- Challenge/enrichment lists

#### Current Coverage
| List | Type | Notes |
|---|---|---|
| grade-level/5th-grade-everyday-words | Theme | General vocabulary |
| grade-level/5th-grade-academic-words | Theme | Academic vocabulary ✅ |
| grade-level/5th-grade-reading-writing-words | Theme | ELA academic vocab ✅ |
| grade-level/5th-grade-science-nature-words | Theme | Science vocabulary ✅ |
| grade-level/5th-grade-community-civics-words | Theme | Civic/social studies vocab ✅ |
| grade-level/5th-grade-opinion-argument-words | Theme | Argument/persuasive writing |
| challenge/academic-vocabulary | Challenge | Advanced academic terms |

Coverage: **Best-covered grade** for thematic vocabulary; still missing morphology, spelling-rule, and misspelled-words content.

#### Target Coverage Checklist
- [x] Academic vocabulary (general)
- [x] Reading/writing/ELA academic vocabulary
- [x] Science vocabulary
- [x] Civic/social studies vocabulary
- [x] Opinion/argument writing words
- [ ] Advanced Latin root lists (beyond 4th grade roots)
- [ ] Advanced Greek root lists
- [ ] Prefix review and extension (all major prefixes)
- [ ] Suffix -tion vs. -sion spelling rule
- [ ] Suffix -ible vs. -able spelling rule
- [ ] Suffix -ance / -ence spelling rule
- [ ] Commonly misspelled words (5th grade list)
- [ ] Commonly confused words (5th grade extension)
- [ ] Word origins: Anglo-Saxon vs. Latin vs. Greek awareness
- [ ] Math vocabulary (grade 5 level)

#### Likely Gaps
Advanced morphology (roots, suffix spelling rules), commonly misspelled words, math vocabulary, and word-origin content.

#### Notes
5th grade has the strongest thematic vocabulary coverage of any grade. The next priority is adding the morphology and spelling-rule content that makes students into stronger spellers, not just better word-recognizers.

`tier-1-roots-and-patterns` and `tier-2-greek-latin-roots` are now Grade 4 primary content (see §7 4th Grade), not listed here. `tier-2-greek-latin-roots` remains usefully linked to this grade as review/extension through its `relatedLists`/`prerequisiteLists` chain — no duplicate grade tag is added, per the no-secondary-grade-field decision in §12.

The word overlap between `5th-grade-academic-words` and `challenge/academic-vocabulary` is intentional and acceptable: the grade-level list covers standard 5th grade academic vocabulary expectations, while the challenge list is genuine extension beyond that expectation. No action needed.

---

## 8. Existing List Inventory

> Fill this in during the inventory audit (see Running Progress Map). One row per file.

| File/List | Category | Current Grade Tags | Recommended Primary Grade | Secondary Grades | Skill/Topic | Status | Notes |
|---|---|---|---|---|---|---|---|
| *(to be completed during audit)* | | | | | | | |

---

## 9. Content Gap Matrix

> Pre-filled with known gaps from curriculum research. Add rows as the audit reveals new gaps. Mark as the library grows.

| Grade | Topic | Exists | Partial | Missing | Priority | Notes |
|---|---|---|---|---|---|---|
| K | Simple CVC words (per vowel, K-level) | | | ✓ | Future consideration | Full CVC spelling stays Grade 1 primary by design (matches standard scope-and-sequence and the app's type-the-whole-word format); a K-appropriate phonics-foundations list (e.g. beginning-sound identification) is a documented future idea, not a gap to fill by relabeling Grade 1 content — see §7 Kindergarten Notes |
| K | Color words | | ✓ | | High | Partially in number-color-words list |
| K | Number words | | ✓ | | High | Partially in number-color-words list |
| K | Shape words | | | ✓ | High | No list exists |
| K | Family words | | | ✓ | High | No list exists |
| K | School words | | | ✓ | Medium | No list exists |
| K | Animal words | | | ✓ | Medium | No list exists |
| 1 | Silent-e long-u words | | | ✓ | Medium | long-a, i, o exist but not long-u |
| 1 | Inflectional endings (-s, -ed, -ing) | | | ✓ | Medium | No dedicated list |
| 1 | Simple two-syllable words | | | ✓ | Low | |
| 2 | Vowel teams | ✓ | | | — | Already covered in phonics/ |
| 2 | R-controlled vowels | ✓ | | | — | Already covered in phonics/ |
| 2 | Diphthongs | ✓ | | | — | oi/oy and ou/ow lists exist, both `grade: "2"` |
| 2 | Contractions | | | ✓ | High | No list exists |
| 2 | Compound words | ✓ | | | — | Already covered |
| 2 | Homophones | | | ✓ | High | No list exists |
| 2 | Plural spelling rules | | | ✓ | High | No list exists |
| 2 | Prefix un- | | | ✓ | Medium | |
| 2 | Prefix re- | | | ✓ | Medium | |
| 2 | Suffix -ful / -less | | | ✓ | Medium | |
| 3 | Prefixes (un-, re-, pre-, dis-, mis-) | | | ✓ | High | No morphology lists at grade 3 |
| 3 | Suffixes (-er, -est, -tion, -ly, -ness) | | | ✓ | High | |
| 3 | Multisyllabic words (2–3 syllable) | | | ✓ | High | |
| 3 | Homophones (grade 3 level) | | | ✓ | Medium | |
| 3 | Spelling changes (doubling, drop-e, y→i) | | | ✓ | Medium | |
| 3 | Root word introduction | | | ✓ | Medium | |
| 4 | Greek and Latin roots | ✓ | | | — | `tier-1-roots-and-patterns` and `tier-2-greek-latin-roots` reclassified to `grade-level/`, `grade: "4"` |
| 4 | Advanced prefixes (anti-, inter-, sub-, super-, trans-) | | | ✓ | High | |
| 4 | Advanced suffixes (-ible/-able, -ous, -ive) | | | ✓ | High | |
| 4 | Commonly confused words | | | ✓ | Medium | |
| 4 | Science vocabulary | | | ✓ | Medium | |
| 4 | Social studies vocabulary | | | ✓ | Medium | |
| 5 | Academic vocabulary | ✓ | | | — | Already covered |
| 5 | Advanced roots/affixes | ✓ | | | — | Served by `tier-2-greek-latin-roots` (Grade 4 primary) via `relatedLists`/`prerequisiteLists` review/extension link, no duplicate grade tag |
| 5 | Suffix spelling rules (-tion/-sion, -ible/-able) | | | ✓ | High | |
| 5 | Commonly misspelled words | | | ✓ | Medium | |
| 5 | Math vocabulary | | | ✓ | Medium | |
| 5 | Word origins awareness | | | ✓ | Low | |

---

## 10. Near-Term Roadmap

### Phase 1 — Create Curriculum Bible
✅ Create this document as the single source of truth before any further content creation.

### Phase 2 — Audit Existing Lists
Review every list in `src/content/spelling-lists/`. For each:
- Confirm or assign a primary grade
- Note secondary grade eligibility
- Validate the list content against the grade's target coverage checklist
- Flag any mis-tagged or incorrectly scoped lists
- Fill in Section 8 (Existing List Inventory)

### Phase 3 — Assign Primary and Secondary Grade Placement
Based on the audit, update frontmatter `grades` fields to reflect accurate primary and secondary grade placement. Update the Running Progress Map.

### Phase 4 — Finalize Grade Hub Structure
Design how each grade hub presents its lists. Decide how phonics lists surface in 1st grade hub without overwhelming it. Confirm the hub navigation architecture matches the grade-first mental model.

### Phase 5 — Fill Kindergarten Foundation Gaps
Create missing K lists in priority order: shape words, family words, school words, animal words. Ensure the existing K lists (number-color, first-words, describing-words) are properly scoped and named.

### Phase 6 — Fill 2nd Grade Pattern Gaps
Create: contractions, homophones, plural rules, simple prefix/suffix lists. These are high-priority 2nd grade word study topics not currently in the library.

### Phase 7 — Fill 3rd–5th Morphology and Academic Vocabulary Gaps
Work through the grade 3, 4, and 5 target coverage checklists systematically. Prioritize: 3rd grade prefix/suffix lists, 4th grade root lists, 5th grade suffix spelling-rule lists.

### Phase 8 — Add SEO/AEO Informational Guides
Create supporting content that helps parents and teachers discover the app through search: grade-level guides ("What spelling words should a 3rd grader know?"), skill explainers, and curated practice recommendations.

### Phase 9 — Ongoing Maintenance *(recurring)*
- **Annual curriculum review:** Each fall, re-check grade-level content against current Common Core/state standards alignment. Flag any lists that have drifted out of scope.
- **Search-demand review:** Quarterly, review search analytics for the most common queries reaching the site. Identify content gaps driven by real user demand.
- **List quality review:** As lists are added, spot-check word selection for age-appropriateness, difficulty calibration, and phonics/morphology accuracy.
- **Library snapshot update:** Update Section 6 (Current Library Snapshot) whenever lists are added or removed.
- **Gap matrix update:** Mark items resolved in Section 9 as lists are created.

---

## 11. Future Ideas / Parking Lot

> Ideas worth considering but intentionally deferred. Add a brief rationale for deferral.

| Idea | Rationale for Deferral | Revisit When |
|---|---|---|
| Fry word lists (as alternative to Dolch) | Dolch is sufficient for launch; Fry adds complexity without clear user demand signal | After Dolch lists are audited and confirmed complete |
| Dialect-aware word lists | Highly complex; requires linguistic expertise and significant content work | Post-launch, if user research surfaces need |
| Spanish/English cognate lists | Valuable for ELL students; requires content expertise and bilingual review | After core English curriculum gaps are filled |
| Dyslexia-targeted word lists | Specialized scope; overlaps with phonics but needs expert guidance | Partnership or contributor with OG background |
| Custom list builder with AI suggestions | Product/engineering scope; not a content decision | After content library reaches 150+ lists |
| Progress tracking across sessions | Planned for localStorage (see CONTENT_ARCHITECTURE.md); content-neutral | Engineering roadmap |
| Printable word list PDFs | Nice-to-have; adds hosting and generation complexity | After site reaches stable traffic baseline |
| Teacher classroom tools (assign lists, track students) | Significant product scope expansion; changes the product's nature | Long-term if teacher segment validates |

---

## 12. Decision Rules

Follow these rules for every content decision:

1. **Do not create a new spelling list unless it fills a documented curriculum gap or a deliberate expansion identified in this document.** Ad-hoc list creation leads to uneven coverage and a cluttered library.

2. **Every list must have exactly one primary grade.** A list with multiple primary grades belongs to none of them. If a list genuinely spans grades, assign the lowest grade where it is first appropriate.

3. **Use secondary grade tags sparingly.** Secondary grades indicate review (lower) or preview/enrichment (higher). A grade hub with 30 lists — most of them secondary — defeats the purpose of grade-first browsing.

4. **Grade hubs must answer the parent's question immediately.** If a parent of a 3rd grader sees the grade hub and can't quickly find relevant practice lists, the hub has failed. Organize lists by skill cluster, not just alphabetically.

5. **Sight words support grade hubs; they do not dominate site architecture.** Sight words are important but should be clearly positioned as one category among many, not the defining feature of the app.

6. **Phonics lists belong primarily to 1st and 2nd grade.** Phonics lists tagged to 3rd grade and above should have a clear justification (e.g., review for struggling readers, specific pattern that bridges grades).

7. **Avoid schema migrations unless absolutely necessary.** Content Collection schema changes affect all lists and require careful migration. If a new field is genuinely needed, add it as optional with a sensible default so existing lists don't break.
