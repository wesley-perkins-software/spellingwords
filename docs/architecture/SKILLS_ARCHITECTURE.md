# SpellingWords.app Skills Architecture

*Status: frozen canonical specification. Supersedes `docs/architecture/SKILLS_MODEL.md` §7 (canonical families), §8 (focused skills), and §10 (taxonomy summary table) as the authoritative reference for the "Browse by Skill" pathway.*

## Context

The K–5 Grade curriculum, Common Words, and Additional Practice are frozen and are not touched by this document. This document defines the **frozen canonical Skills architecture** for the "Browse by Skill" pathway — the destination for the user journey "I know what we need to practice."

This is the third and final revision of the process that produced it. **v1** validated `docs/architecture/SKILLS_MODEL.md` against the implemented K–5 curriculum and a parent/teacher search-and-browse test, arriving at 12 families and 37 skills. An **independent Deep Research pass** reviewed v1 against Structured Literacy, Orton-Gillingham, Words Their Way, UFLI, and Fundations scope-and-sequence evidence and returned **B: fundamentally sound, bounded corrections required**, with eight specific corrections and a skill-by-skill title audit. **v2** was an intermediate draft that applied every one of those eight corrections wholesale, without independent adjudication. **v3 (this document)** replaces v2 entirely — §1 below re-examines every one of the reviewer's recommendations on its own merits, verified directly against this repo's files rather than taken on faith, and accepts, rejects, or modifies each one accordingly.

Sources used: `docs/architecture/SKILLS_MODEL.md`, `src/lib/content/spellingSkills.ts` + `src/pages/spelling-lists/skills/index.astro`, `src/content/spelling-lists/phonics/` (85 files, including direct frontmatter verification of live page titles), `src/content/spelling-lists/grade-level/` (including direct verification of word-list contents for the Greek/Latin scope question), `src/content/spelling-lists/sight-words/` and `challenge/`, `src/content/config.ts`, plus the independent Deep Research validation's structured-literacy citations (UFLI, Fundations, Wilson, Words Their Way, IDA).

This document does not redesign the Grade curriculum, Grade pages, Common Words, or Additional Practice, and does not write Skill page content.

---

## 1. Critical Evaluation of the Independent Validation

Each recommendation is judged on its own merits against this project's actual constraints — the frozen curriculum, real content files, already-shipped page titles, and the product's explicit brand voice (`CLAUDE.md`: "Restrained, warm, low-cognitive-load UI") — not accepted by default because it came from a review pass.

### Accepted outright

| Recommendation | Verdict | Reasoning |
|---|---|---|
| Split OI/OY from OU/OW rather than merging them | **Accept** | Verified directly: `vowel-teams-oi-oy.md` and `vowel-teams-ou-ow.md` already exist as separate files with the titles "OI and OY Words" and "OU and OW Words" — the split isn't a new proposal, it's restoring what already exists. It also fixes an internal inconsistency in v1: every other Vowel Teams page groups two *spellings of one sound* (AI/AY → /eɪ/, EE/EA → /iː/, OA/OW → /oʊ/); OI/OY and OU/OW are the only pair that would cram two *different target sounds* onto one page. Splitting brings the family in line with its own pattern, not just outside opinion. |
| Add OO Words | **Accept** | Backed by an existing file (`grade-2-oo-two-sounds.md`). Correctly kept as **one** page, not two, despite covering two phonemes — unlike OI/OY vs. OU/OW, there is no spelling *choice* here (the spelling is always "oo" either way); it's a single recognition concept ("this spelling has two sounds"), so merging is the right call here even though splitting was right for the diphthongs. |
| Add AU and AW Words | **Accept** | Backed by an existing file (`grade-2-au-aw-words.md`); matches the family's one-sound-two-spellings pattern (/ɔː/). |
| Promote Soft C and Soft G | **Accept** | v1's dismissal ("merely a decoding rule") was wrong. Spelling "circle" or "gem" requires knowing *which letter to write* for /s/ or /j/ — that's an encoding decision, not just a reading rule. Backed by `grade-2-soft-c-soft-g.md`. |
| Require an explicit Consonant-LE section within Multisyllabic Words | **Accept** | Final consonant-le is one of the six standard syllable types. v1's "excluded even folded in" was indefensible for a documented syllable type; making it a required, named section (not a new page) is the right-sized fix. |
| Demote Long E Silent E from an equal peer page to a labeled section | **Accept, independently re-verified** | Not just taking the reviewer's word for it: the actual one-syllable Long E Silent E word bank is genuinely thin (*eve, gene, theme, scheme, these* — most other plausible examples like *complete, extreme, athlete* are multisyllabic). That independently confirms the concern rather than merely deferring to it. |
| Rename "Word Endings and Suffixes" family to "Word Building and Endings" | **Accept** | Factually correct: Compound Words and Contractions are not suffix patterns. Low-risk — no already-shipped page is affected, since none of this family's skills are live yet. |

### Rejected or modified

| Recommendation | Verdict | Reasoning |
|---|---|---|
| Rename already-shipped page titles (e.g. "SH" → "SH Words", "Long A Silent E" → "Long A with Silent E") | **Rejected** | Checked the actual frontmatter directly: the live titles are already "SH Digraph Words," "CH Digraph Words," "TH Digraph Words," "WH Digraph Words," "Long A Silent E Words," and (confirming the point above) "Long E Silent E Words" already exists too. These are *better* than the reviewer's proposed replacements — "SH Digraph Words" names the actual phonics concept, which "SH Words" does not. The reviewer proposed renaming pages without checking what's already shipped or weighing the churn cost of changing indexed, live titles. Reverted to the real, already-good titles throughout this document. |
| Retitle the merged patterns page fully to "CK, Double-Letter, TCH, and DGE Endings" | **Modified, not fully accepted** | The reviewer optimized purely for AEO/entity-precision and didn't weigh the product's explicit brand mandate against clinical, list-like titles. A title that is nothing but a string of technical abbreviations reads as a spec sheet, not a "calm workbook" page. Adopted a hybrid that leads with the concrete patterns (for search/AI precision) but keeps a plain descriptive frame: **"CK, Double Letters, and TCH/DGE Word Endings."** |
| Rename "Greek and Latin Roots" family to "Greek and Latin Roots and Word Families" | **Rejected** | The reviewer's own caveat was conditional: broaden the scope label *only if* the folded-in derived-word content isn't actually classical in origin. Checked directly: `4th-grade-derived-words.md`'s word list is *nation, national, nationality* (Latin *natio*) and `5th-grade-spelling-changes-related-words.md`'s is *critic, critical, criticism* (Greek *kritikos*) — the content genuinely is classical. The reviewer's condition for renaming doesn't hold once the actual words are checked. Diluting a clean, strongly recognized, frequently-searched term ("Greek and Latin Roots") for a hedge that turns out not to apply is a real cost with no offsetting benefit. Kept the original title; added an editorial safeguard instead — see §3. |
| Add IE and IGH Words as a fully equal-status new page | **Accepted after content authorship** | The original v3 decision reserved the slot because no backing file existed. The approved brief and `src/content/spelling-lists/phonics/ie-and-igh-words.md` now supply the screened word bank and canonical treatment, so the former content contingency is resolved without changing the frozen taxonomy. |

### A caveat the review itself flagged, worth repeating

The independent review was explicit that it had no keyword-volume or Search Console data and that its SEO/AEO/GEO judgments are qualitative pattern-matching against how structured-literacy programs name concepts, not measured search demand. That caveat carries through to this document too — every "search intent" call here (in this section and throughout) is an informed editorial judgment, not a validated metric.

---

## 2. Recommended Skill Families

12 families, confirmed final — the independent review explicitly endorsed keeping 12 and rejected inventing a 13th solely to fix a naming problem, and nothing in the critical evaluation above changes that count.

1. **Short Vowels and CVC Words** — *already live, no change.* Skills: Short A Words, Short E Words, Short I Words, Short O Words, Short U Words.
2. **Consonant Digraphs** — *already live, no change.* Skills: SH Digraph Words, CH Digraph Words, TH Digraph Words, WH Digraph Words.
3. **Consonant Blends** — purpose: adjacent consonants where both sounds are heard, at the beginning or end of a word. Skills: Beginning Blends, Ending Blends.
4. **Common Spelling Patterns** *(editorial name: One-Syllable Spelling Patterns)* — purpose: common single-syllable spelling conventions beyond basic vowels, blends, and digraphs. Skills, in order: CK, Double Letters, and TCH/DGE Word Endings; Silent Letters; **Soft C and Soft G**.
5. **Silent E** — *already live; one correction.* Skills: Long A Silent E Words, Long I Silent E Words, Long O Silent E Words, Long U Silent E Words. *(Long E Silent E: real content, retained as a labeled section of this family's overview — not a fifth peer page. See §5.)*
6. **Vowel Teams** — *live, substantially expanded.* Skills, in order: AI and AY Words, EE and EA Words, OA and OW Words, OI and OY Words, OU and OW Words, IE and IGH Words, OO Words, AU and AW Words.
7. **R-Controlled Vowels** — purpose: vowel spellings changed by a following r. Skills, in order: AR Words, OR Words, ER, IR, and UR Words.
8. **Multisyllabic Words** — purpose: longer-word spelling strategies. Single skill, scope explicitly includes Open Syllables and Words Ending in Consonant-LE as named sections.
9. **Word Building and Endings** *(renamed from "Word Endings and Suffixes")* — purpose: simplified public grouping for inflectional endings, suffixes, and the two other recognizable word-formation concepts (compounding, contracting) that don't fit any other family. Skills, in order: Plural Words with -s and -es, Words Ending in -ed and -ing, Common Suffixes, Spelling Rules for Adding Suffixes, Compound Words, Contractions.
10. **Prefixes** — purpose: recognizable, assignable word-building concept recurring across Grades 2–5. Skills, in order: Un- and Re- Prefixes, Common Prefixes.
11. **Greek and Latin Roots** *(name unchanged — see §1's rejection of the proposed rename)* — purpose: upper-elementary roots and meaning-based word parts. Single skill; scope safeguard applies, see §3.
12. **Homophones and Commonly Confused Words** — purpose: meaning-based spelling choices, where words sound alike or are otherwise easily confused in writing. Skills, in order: Homophones, Commonly Confused Words.

---

## 3. Skills Directory (Final)

**A note on slug stability:** files already flagged `contentRole: skill` and already live as Skill pages (all of Short Vowels, Digraphs, Silent E's four live vowels, and AI/AY, EE/EA, OA/OW in Vowel Teams) keep their exact existing title — changing it would churn an indexed, working title for no benefit. Files newly promoted *from* `contentRole: grade-unit` *to* a Skill identity (OI/OY, OU/OW, Soft C and Soft G, OO, AU/AW) are a different case: per `SKILLS_MODEL.md`, a Grade Unit and a Skill are distinct content identities that coexist rather than one replacing the other, so the source Grade 2 unit keeps its own URL untouched while the new Skill page is free to get a purpose-built slug rather than inheriting the grade-unit file's internal-sounding one (e.g. `oi-and-oy-words` rather than the grade-unit's `vowel-teams-oi-oy`).

**Update (pre-launch URL hardening PR):** the "URL slug" column below is the **canonical public routing slug** — the segment used in `/skills/{slug}`, sourced from the explicit stable-id manifest `src/lib/content/canonicalSkillRoutes.ts`. It is **not** the content file's frontmatter `urlSlug` field, which is untouched by this column and remains whatever the source file already has (see `docs/content/inventory/skill-pages.md` for the frontmatter values). For 14 of the 41 Skills the two now differ, because this PR revisited the ordering of a handful of already-live public slugs (Digraphs, Silent E, three Vowel Teams pairs, R-Controlled Vowels) now that the site is confirmed pre-launch and the "don't churn an indexed URL" concern above no longer applies to the *route*, only to the *title* (titles are unaffected). Example: `digraph-ch-words` is the stable id and the frontmatter `urlSlug`; `/skills/ch-digraph-words` is the canonical public path. No id, title, taxonomy, or frontmatter changed.

| Final Title | URL slug (canonical public path segment) | Skill Family | Educational Justification |
|---|---|---|---|
| Short A Words / Short E Words / Short I Words / Short O Words / Short U Words | `short-a-words` etc. | Short Vowels and CVC Words | Already live; titles verified against actual frontmatter, unchanged |
| SH Digraph Words / CH Digraph Words / TH Digraph Words / WH Digraph Words | `sh-digraph-words` / `ch-digraph-words` / `th-digraph-words` / `wh-digraph-words` | Consonant Digraphs | Titles unchanged (rejecting the reviewer's proposed "SH Words" simplification — see §1). Public slug reordered pattern-first (from frontmatter `digraph-sh-words` etc.) for scanability, per the pre-launch URL hardening PR |
| Beginning Blends | `beginning-blends` | Consonant Blends | 18 individual blend word lists exist in `phonics/`; standard classroom and search language |
| Ending Blends | `ending-blends` | Consonant Blends | 11 individual ending-blend files exist |
| CK, Double Letters, and TCH/DGE Word Endings | `ck-tch-dge-word-endings` | Common Spelling Patterns | Merges Final CK (`c-k-ck-words.md`, `kindergarten-ck-ending-words.md`), the FLOSS rule (`kindergarten-double-consonants.md`, `grade-1-floss-rule.md`), and TCH/DGE (`tch-dge-ending-words.md`, `grade-1-tch-dge-ending-rules.md`). Title leads with the concrete patterns for search/AI precision while staying in plain, warm language — a deliberate compromise between the reviewer's fully-technical suggestion and the product's calm-brand requirement (see §1) |
| Silent Letters | `silent-letters` | Common Spelling Patterns | `2nd-grade-silent-letter-words.md` covers wr/kn/mb |
| Soft C and Soft G | `soft-c-soft-g` | Common Spelling Patterns | `grade-2-soft-c-soft-g.md`; genuine encoding choice, not just a decoding rule (see §1) |
| Long A Silent E Words / Long I Silent E Words / Long O Silent E Words / Long U Silent E Words | `long-a-silent-e` / `long-i-silent-e` / `long-o-silent-e` / `long-u-silent-e` | Silent E | Titles unchanged (rejecting the reviewer's "with Silent E" rename — see §1). Public slug reordered vowel-first (from frontmatter `silent-e-long-a` etc.), per the pre-launch URL hardening PR |
| AI and AY Words | `ai-ay-vowel-teams` | Vowel Teams | Title unchanged. Public slug reordered pattern-first (from frontmatter `vowel-teams-ai-ay`), per the pre-launch URL hardening PR |
| EE and EA Words | `ee-ea-vowel-teams` | Vowel Teams | Title unchanged; less-common final -ey spelling stays a subordinate section, not a separate page. Public slug reordered (from frontmatter `vowel-teams-ee-ea`) |
| OA and OW Words | `oa-ow-vowel-teams` | Vowel Teams | Title unchanged; less-common final -oe spelling stays a subordinate section. Public slug reordered (from frontmatter `vowel-teams-oa-ow`) |
| OI and OY Words | `oi-and-oy-words` | Vowel Teams | Already exists as `vowel-teams-oi-oy.md` with this exact title, currently excluded from the live hub — promoted, un-merged from OU/OW (see §1) |
| OU and OW Words | `ou-and-ow-words` | Vowel Teams | Already exists as `vowel-teams-ou-ow.md` with this exact title, currently excluded from the live hub — promoted, un-merged from OI/OY |
| IE and IGH Words | `ie-and-igh-words` | Vowel Teams | Fills the long-I vowel-team gap with a deliberately asymmetric final-IE and IGH treatment; backed by `src/content/spelling-lists/phonics/ie-and-igh-words.md` and its approved persisted brief |
| OO Words | `oo-words` | Vowel Teams | `grade-2-oo-two-sounds.md`; one page, two clearly separated sections for the two common sounds (moon vs. book) |
| AU and AW Words | `au-and-aw-words` | Vowel Teams | `grade-2-au-aw-words.md` |
| AR Words | `r-controlled-ar-words` | R-Controlled Vowels | `r-controlled-ar.md` + `grade-1-r-controlled-ar-or.md`. Public slug keeps the `r-controlled-` prefix (rejecting a shorter `ar-words` alternative considered during the pre-launch URL hardening PR) for disambiguation and concept-identity clarity |
| OR Words | `r-controlled-or-words` | R-Controlled Vowels | `r-controlled-or.md` + `grade-1-r-controlled-ar-or.md` (the same Grade 1 grade-unit cited for AR Words teaches both patterns together). Public slug keeps the `r-controlled-` prefix, same rationale as AR Words |
| ER, IR, and UR Words | `r-controlled-er-ir-ur-words` | R-Controlled Vowels | `r-controlled-er-ir-ur.md` + `grade-1-r-controlled-er-ir-ur.md`; grouped because the three spellings share one sound. Public slug keeps the `r-controlled-` prefix, same rationale as AR Words |
| Multisyllabic Words | `multisyllabic-words` | Multisyllabic Words | Merges `grade-2-two-syllable-words.md` through `5th-grade-multisyllabic-academic-words.md`. Must include two required named sections: **Open Syllables** (`grade-1-open-syllables-final-y.md`) and **Words Ending in Consonant-LE** (`grade-2-final-stable-le.md`) |
| Plural Words with -s and -es | `plurals` | Word Building and Endings | `grade-1-inflectional-endings-s-es.md` + `2nd-grade-regular-plurals.md`; short form "Plurals" fine for card/nav display |
| Words Ending in -ed and -ing | `ed-and-ing` | Word Building and Endings | `grade-1-inflectional-endings-ed-ing.md` |
| Common Suffixes | `common-suffixes` | Word Building and Endings | Merges `2nd-grade-suffixes-ful-less.md` + `3rd-grade-suffix-words.md` with comparative endings (`2nd-grade-comparatives-er-est.md`). **Scope boundary:** suffix forms/meanings; must not duplicate Spelling Rules for Adding Suffixes |
| Spelling Rules for Adding Suffixes | `suffix-spelling-changes` | Word Building and Endings | `suffix-spelling-changes.md`. **Scope boundary:** base-word spelling changes before a suffix, distinct from Common Suffixes |
| Compound Words | `compound-words` | Word Building and Endings | `2nd-grade-compound-words.md` |
| Contractions | `contractions` | Word Building and Endings | `2nd-grade-contractions.md` |
| Un- and Re- Prefixes | `un-and-re-prefixes` | Prefixes | `2nd-grade-prefixes-un-re.md`. **Scope boundary:** focused introductory destination; Common Prefixes should treat un-/re- only as brief review, not primary practice |
| Common Prefixes | `common-prefixes` | Prefixes | `3rd-grade-prefix-words.md` + `4th-grade-advanced-prefixes.md` |
| Greek and Latin Roots | `greek-and-latin-roots` | Greek and Latin Roots | Merges `tier-1-roots-and-patterns.md`, `tier-2-greek-latin-roots.md`, `3rd-grade-root-word-families.md`, `5th-grade-greek-latin-word-parts.md` with the derived-word-family content from `4th-grade-derived-words.md` + `5th-grade-spelling-changes-related-words.md`. **Editorial safeguard (replaces the rejected family rename):** before publishing, confirm each derived-word-family example is genuinely of Greek or Latin origin (verified for the current word lists — *nation* < Latin *natio*; *critic* < Greek *kritikos*, etc.); if a future edit adds a non-classical example, move it to Common Suffixes instead of stretching this page's scope |
| Homophones | `homophones` | Homophones and Commonly Confused Words | `2nd-grade-homophones.md` + `3rd-grade-homophones.md`. **Scope boundary:** true sound-alike pairs |
| Commonly Confused Words | `commonly-confused-words` | Homophones and Commonly Confused Words | `4th-grade-commonly-confused-words.md` + `5th-grade-commonly-confused-words.md`. **Scope boundary:** meaning/usage confusions that aren't true homophones |

**Finalized as remaining outside the Skills taxonomy** (confirmed final):
- **Final Stable -LE** — no standalone page; required named section within Multisyllabic Words.
- **Possessives** — confirmed excluded; a punctuation operation, not a spelling pattern.
- **Individual blends** — stay Practice Sets/filters within Beginning Blends and Ending Blends.
- **Individual homophone sets** (there/their/they're, to/too/two) — stay as worked examples within the Homophones page.

---

## 4. Final Skills Hub (canonical navigation)

**41 live, content-backed skills across 12 families:**

1. **Short Vowels and CVC Words** — Short A Words · Short E Words · Short I Words · Short O Words · Short U Words
2. **Consonant Digraphs** — SH Digraph Words · CH Digraph Words · TH Digraph Words · WH Digraph Words
3. **Consonant Blends** — Beginning Blends · Ending Blends
4. **Common Spelling Patterns** — CK, Double Letters, and TCH/DGE Word Endings · Silent Letters · Soft C and Soft G
5. **Silent E** — Long A Silent E Words · Long I Silent E Words · Long O Silent E Words · Long U Silent E Words *(Long E Silent E: labeled section within the family overview, not a peer page — see §5)*
6. **Vowel Teams** — AI and AY Words · EE and EA Words · OA and OW Words · OI and OY Words · OU and OW Words · IE and IGH Words · OO Words · AU and AW Words
7. **R-Controlled Vowels** — AR Words · OR Words · ER, IR, and UR Words
8. **Multisyllabic Words** *(single-skill family — one direct entry; includes named Open Syllables and Consonant-LE sections)*
9. **Word Building and Endings** — Plural Words with -s and -es · Words Ending in -ed and -ing · Common Suffixes · Spelling Rules for Adding Suffixes · Compound Words · Contractions
10. **Prefixes** — Un- and Re- Prefixes · Common Prefixes
11. **Greek and Latin Roots** *(single-skill family — one direct entry)*
12. **Homophones and Commonly Confused Words** — Homophones · Commonly Confused Words

**Single-skill family navigation note:** Multisyllabic Words and Greek and Latin Roots each contain exactly one skill. In the hub, each displays as a single direct destination rather than an extra family-level page whose only job would be to link to its one child — removing an unnecessary click while keeping the hub simple. This is a navigation-layer simplification only; both remain full 12-family members in the taxonomy itself.

**Vowel Teams is the largest family (8 skills).** This is intentional, not accidental bloat: it corresponds almost one-to-one with the standard structured-literacy vowel-team inventory (ai/ay, ee/ea, oa/ow, ie/igh, oo, au/aw, oi/oy, ou/ow), and every page answers exactly one distinct sound/spelling question. If a future implementer finds 8 items visually heavy in one navigation list, the mitigation is a page-layout grouping (e.g., visually clustering "long-vowel teams" apart from "diphthongs and other teams" within the single Vowel Teams family) — not splitting into two families, which would fragment a coherent, already-recognized concept.

---

## 5. Silent E Family — Long E Resolution (Final)

**Decision: Long E Silent E is real, teachable content and remains part of the Silent E family, but as a labeled section within the family overview, not a fifth peer page. Final.**

- **Independently re-verified, not just deferred to the reviewer:** the genuine one-syllable word bank is thin (*eve, gene, theme, scheme, these*); most other plausible examples are multisyllabic or borderline cases of whether the VCe generalization even applies cleanly.
- **v1's "parity" argument doesn't hold up:** identical instructional framing across five vowels doesn't require identical destination-page autonomy when the underlying word banks aren't comparably deep.
- **Content is preserved, not deleted** — it moves to a section of the family overview rather than disappearing.
- **Single, bounded exception** — does not reopen any other excluded candidate.

**Implemented disposition:** `silent-e-long-e.md` is archived, its former URL permanently redirects to the Silent E family anchor, and canonical-active content no longer links to it as a peer page. The family overview preserves concise Long E guidance.

---

## 6. UX / Search-Intent Consolidation Pass

The standard applied throughout: **"Would an ordinary parent or teacher naturally browse to or search for this exact page, and does it answer exactly one coherent spelling question?"**

| Candidate(s) | Verdict | Resolution |
|---|---|---|
| Final CK, FLOSS, TCH/DGE | Individually fail the plain-title test but are one coherent group of final-position spelling choices | Merged into **CK, Double Letters, and TCH/DGE Word Endings** |
| Silent Letters | Passes independently | Kept standalone |
| Soft C and Soft G | Passes — genuine spelling-choice concept | Added, own page |
| OI/OY vs. OU/OW | Two different target sounds and two different spelling-choice systems — the only pair in the family that would have merged unlike concepts | **Split** into two pages (already existed as separate files — see §1) |
| IE and IGH | Real structural gap, matches family pattern | Live canonical page after approved brief and content authorship |
| Two sounds of OO | One spelling, two sounds, no spelling-choice decision — genuinely one concept | One page, two labeled sections |
| AU and AW | One sound, two spellings, matches family pattern | Added, own page |
| AR / OR / ER-IR-UR | AR, OR each independently distinct; ER/IR/UR share one sound | Kept as 3 separate skills |
| Open Syllables / Consonant-LE | Fail as standalone pages (jargon), but are real, standard syllable-type content | Required named sections within Multisyllabic Words |
| Comparatives -er/-est | Real but thin standalone; mechanically a suffix pattern | Folded into Common Suffixes |
| Plurals, -ed/-ing, Compound Words, Contractions | Each independently passes | Kept separate |
| Suffix spelling-change rules | One coherent "what happens to the base word" question | Kept as one merged page |
| Derived-word spelling-stability content | Verified genuinely classical in origin | Folded into Greek and Latin Roots with an editorial safeguard, not a title change (see §1, §3) |
| Homophones vs. Commonly Confused Words | Each independently passes, genuinely different concepts | Kept separate, scope boundaries documented |
| Beginning/Ending Blends, Un-/Re- and Common Prefixes | Each independently passes | Kept separate, scope boundary documented for prefixes |

**Net effect:** one merger reversed into a split (+1), four content-backed pages added (Soft C/Soft G, OO, AU/AW, IE/IGH), one exclusion reversed into a required section rather than a standalone page, one page demoted from peer to labeled section, and two family-naming corrections. **Total: 41 live skills across 12 families.**

---

## 7. Coverage Validation

**Does every reusable spelling concept taught K–5 now have an appropriate home?**
Yes — every concept currently taught anywhere in the curriculum has a family and skill in §4. IE and IGH Words is now live as a grade-independent destination; no existing Grade Unit is falsely credited with teaching it, and the placement gap is recorded for Phase 2.

**Are there any unnecessary Skills that should be removed?**
No. Long E Silent E is resolved (§5). The two rejected reviewer recommendations (renaming already-live titles, renaming the Greek/Latin family) were rejected specifically because adopting them would have made the architecture *worse* — churning working titles and diluting an accurate, recognized name — not because they were arbitrary suggestions to dismiss.

**Are any Skills too narrow or too broad?**
No remaining candidate is too narrow. Vowel Teams (8 members) is deliberately broad and matches the standard structured-literacy inventory rather than being padded. Word Building and Endings (6 members) has documented scope boundaries between its most similar pairs.

**Does the final taxonomy feel complete without feeling bloated?**
Yes. 41 content-backed skills across 12 families is proportionate to the K–5 curriculum. Every addition beyond v1 closes a specific, independently verified gap.

---

## Status

This document is final: it incorporates an independent Deep Research validation of v1, critically adjudicates every one of its recommendations with reasoning verified against this repo's actual files (not taken on faith), and resolves every open question explicitly. It supersedes `docs/architecture/SKILLS_MODEL.md` §7 (canonical families), §8 (focused skills), and §10 (taxonomy summary table) — plus both prior drafts (v1, v2) — as the canonical Skills reference for any future Skill-page implementation work.

The architecture itself has no open questions: every family, every skill, every merge, every exclusion, and every title is settled, and all 41 canonical destinations now have content.
