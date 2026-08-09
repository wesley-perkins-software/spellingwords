# Final Deep-Page Content Quality Audit — spellingwords.app

**Date:** 2026-08-09
**Author:** Independent editorial/UX/SEO/GEO audit (Claude, acting as reviewer)
**Scope:** The three deepest instructional page families — Core Spelling Grade Units, High-Frequency Word Sets, Themed Spelling Practice — immediately before freezing this content layer and moving outward to Grade Hubs, strand gateways, and the Skills Hub, and before the planned visual redesign.
**Type:** Read-only audit. No Markdown, schema, renderer, test, route, curriculum, or documentation changes were made. This document is the sole artifact produced.

> **Scope note, confirmed with the site owner before this audit began:** the primary audited corpus is exactly Core Spelling Grade Units, High-Frequency Word Sets, and Themed Spelling Practice. Canonical **Skill pages are a separate, frozen page family** governed by their own standard (`CANONICAL_SKILL_PAGE_STANDARD.md`) and are **not** counted as a fourth strand in this audit's totals. Skill pages were inspected only as comparison evidence for the Core↔Skill division of responsibility, duplication risk, and internal linking — never scored as a primary-corpus member.

---

## Methodology disclosure

- **No live rendering was inspected.** `node_modules/` is not installed in this environment and no Playwright config or spec exists anywhere in the repository (confirmed by direct search and by `CLAUDE.md`'s own note that "Playwright is in devDependencies but has no config or specs yet"). All presentation-layer conclusions come from reading `src/pages/[gradeSlug]/[strand]/[slug].astro`, `GradeUnitWorldPage.astro`, and the shared components directly, not from screenshots or a running dev server. Any finding that depends on how something *looks* rather than what it *contains* is flagged as unverified-visually below.
- **Corpus-wide metadata** was extracted programmatically from all 153 frontmatter files in `src/content/spelling-lists/` (word counts, note counts, FAQ counts, readiness-signal counts, body length) to ground the content-sufficiency and consistency findings in real numbers rather than a handful of hand-picked pages.
- **19 full pages were deep-read** verbatim (frontmatter + body), deliberately sampled across every grade K–5, all three strands, plus two Skill pages used only as comparison evidence. The sample includes the standards' own named reference/pilot implementations (Kindergarten HFW Set 1, `1st Grade Weather Spelling Words`), short and long pages, pages with zero, few, and several word notes, and both early-grade and upper-grade morphologically complex pages. Every direct quote below is from an actually-read file at the cited path.
- **Existing Vitest tests were read, not run** (same `node_modules` limitation) — their assertions are cited as evidence of the enforced content contract, not re-verified by execution.
- **External research**: general search/content-quality and structured-literacy principles are cited where they materially inform a finding, clearly separated from repository observation and editorial inference. No speculative GEO/AEO tactic is recommended anywhere in this report.

---

## A. Executive verdict

**The deepest content layer is substantially ready, with important refinements — not "not ready," and not yet freeze-ready without a few targeted passes.**

The corpus is, page for page, considerably stronger than its own internal tracking (`CONTENT_IMPROVEMENT_ROADMAP.md`) makes it look. That roadmap's `Complete` status is a strict governance checkbox — "final independent human editorial sign-off" — not a signal that a page is thin, wrong, or unwritten. Every page sampled in this audit, across all three strands and all six grades, already contains full, specific, pattern-literate prose that has evidently been through at least one deliberate authoring and self-review pass (the roadmap documents "9-pass adversarial review," "adversarial self-review," and named factual corrections for many families). This is not a corpus of stub pages waiting to be written; it is a corpus of largely-finished pages waiting for sign-off, with a real but bounded list of genuine editorial issues layered on top. Section B below documents a further finding: the roadmap's own status table understates progress on Core Spelling (it omits completed Grade 3 and Grade 5 batches from its Phase 2 summary row), which the audit corrects.

Genuine issues found (detailed in D–L) are real but narrow: a metadata/tagging gap on ~11 published pages missing `contentRole` (Section I, J), three Core pages that exceed the standard's own 8–16-word ceiling (Section I), zero pages anywhere in Core or Themed carrying a `shortAnswer`/FAQ-worthy AEO-ready direct answer for HFW (by design, per standard — not a gap), a real warmth deficit that is concentrated in Core Spelling's upper-grade pages rather than evenly spread (Section H), and one substantive editorial-voice pattern (heavy, repeated use of "written chunk(s)," "stable spelling," and syllable-hyphenation notation) that is close to becoming a house mannerism rather than a considered choice (Section H, N).

**Recommendation:** run one more targeted editorial pass — not a rewrite — focused on (1) resolving the metadata-tagging gap, (2) a warmth/voice pass concentrated on Core Spelling grades 3–5 and the FAQ language in Grade Unit pages, (3) the three oversized Core word lists, and (4) reconciling the roadmap's own status table with what is actually on disk — before declaring this layer frozen. Full detail and prioritization in Section N.

---

## B. Corpus inventory reviewed

Programmatic frontmatter extraction covered all 153 files under `src/content/spelling-lists/`. Classification is by `contentRole`, not folder (folders do not align 1:1 with strand).

| Strand | Files | K | 1 | 2 | 3 | 4 | 5 | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| **Core Spelling** (`contentRole: grade-unit`) | 45 | 7 | 7 | 13 | 7 | 6 | 5 | Plus **11 published files with no `contentRole` set** that read as Core Grade Units in every structural respect (readiness signals, "How to practice this list," move-on guidance, next-unit references) — see Section I. |
| **High-Frequency Words** (`contentRole: high-frequency-word-set`) | 27 | 4 | 7 | 7 | 5 | 2 | 2 | Matches the frozen 27-set/316-word curriculum contract exactly. |
| **Themed Spelling Practice** (`contentRole: vocabulary-theme`) | 27 | 5 | 5 | 5 | 4 | 4 | 4 | Matches the standard's stated 27-member/237-entry corpus. |
| **Primary corpus total** | **99** (110 incl. the 11 untagged) | | | | | | | |
| *(Comparison evidence only, not counted above)* Skill pages (`contentRole: skill`) | 42 | – | 26 | 11 | 3 | 2 | – | Excluded from every total in this report per the confirmed scope. |
| *(Excluded — legacy)* Archived K "Additional Practice"-style pages, no `contentRole` | 6 | 6 | – | – | – | – | – | `status: archived`; not live, not audited further. |

**Sampling methodology:** given the corpus's modest total size (99–110 primary pages), a full metadata-level pass was performed on every file (word count, note count, FAQ count, readiness-signal count, body length — Section I's numbers are drawn from this complete pass, not an estimate). A deep, full-text read was then performed on 19 representative pages, chosen to cover: every grade K–5; all three strands; the standards' own cited reference/pilot pages (Kindergarten HFW Set 1, `grade-1-weather-words`); pages with zero, few, and multiple word notes; pages with and without context examples and pronunciation notes; a simple early-grade page and a morphologically dense upper-grade page in each strand; and two Skill pages read specifically to evaluate the Core↔Skill boundary. This is not exhaustive at the body-text level, but it is exhaustive at the metadata level and broad enough across all requested axes to support the systemic findings below — every systemic claim below is cross-checked against the full metadata pass, not just the 19 read pages.

**Resolving the "is this content-complete?" question:** `CONTENT_IMPROVEMENT_ROADMAP.md` §14's summary table reports Phase 2 (Grade curriculum content) as "8 Kindergarten Core pages complete / 70 remaining," which — read in isolation — implies the great majority of Core Spelling is unwritten. That is not what the files on disk show. The same roadmap document's own line items (lines 729–741 and 779–787) record a completed **7-page Grade 3 Core batch audit** and a completed **5-page Grade 5 Core batch audit**, each with specific named corrections, in addition to the 8-page Kindergarten batch — meaning **20 of 78** Core pages have been through a documented audit pass, not 8. The §14 table itself is stale and undercounts the roadmap's own recorded work. This is a real documentation-hygiene finding (Section N, Priority: Medium) but it is not evidence that the Core corpus is thin — direct reads of Grade 4 and Grade 5 pages that carry **no** audit annotation at all (e.g. `4th-grade-advanced-prefixes.md`) show the same structural completeness and prose quality as the audited ones, meaning the underlying authoring pass covered essentially the whole corpus even where the tracking document hasn't caught up.

---

## C. What is already excellent (protect this)

1. **The three-strand semantic separation actually works in practice, not just on paper.** Reading Core, HFW, and Themed pages back to back for the same grade (e.g., Grade 4: `4th-grade-advanced-prefixes.md` vs. `grade-4-high-frequency-words-set-1.md` vs. `4th-grade-solar-system-words.md`) produces three genuinely different reading experiences with different governing questions answered — concept mechanics, retrieval-specific word notes, and theme-cued cross-word comparison, respectively. This is a real, rare achievement; most spelling-list sites blur these into one template.

2. **The selective-note discipline is real, not aspirational.** `hfwWordNotes`/`wordNotes` are consistently *not* applied to every word — e.g., Kindergarten HFW Set 1 notes 4 of 10 words, `grade-1-weather-words` notes 1 of 9, `3rd-grade-life-cycle-words` notes 2 of 8. The standard explicitly bans "a note for every word," and the corpus visibly honors it. Vitest tests (`grade1HfwSets1To2Editorial.test.ts` and siblings) enforce `notes.length < words.length`, so this isn't drift-prone.

3. **No renderer-boilerplate leakage found in any sampled page.** None of the 19 read pages restates "Hear each word, notice and map its spelling..." or "hear or say each word, notice a useful part..." in Markdown, despite those being exact renderer strings per `[slug].astro`. Tests (`themedSpellingPracticePilot.test.ts` et al.) actively guard this, and the discipline holds in every file read.

4. **Grade-appropriate maturation is genuinely present, not just claimed.** Compare `kindergarten-animal-words.md` ("Say the word slowly and write the three letters in the same order as the sounds") against `5th-grade-ecosystem-environment-words.md` ("Ecosystem can be held as e-co-sys-tem, preserving system as a recognizable written part"). The register, sentence complexity, and analytical demand both step up convincingly across the sampled grade range, in both Core and Themed.

5. **The HFW word-note voice is a strong model for the rest of the site.** Notes like `of`: *"...the f usually sounds like v, but the spelling is still o-f"* (`grade-1-high-frequency-words-set-1.md`) or `attention`: *"Attention is related to attentive. Both keep atten with double t..."* (`grade-5-high-frequency-words-set-1.md`) are precise, actionable, and readable by a non-specialist parent without being condescending. This is exactly the "plain-language expertise" the brief asks for.

6. **The frozen-inventory discipline is airtight where it matters.** Every sampled Themed and HFW page's `words` list matched its prose exactly with no invented, reordered, or silently-dropped words — consistent with the test suite's frozen-inventory guards.

7. **The Core/Skill separation is philosophically sound where both exist.** `short-a-words.md` (Skill) is a comprehensive, reusable concept reference with word families, a routine, common mistakes, and mastery signs; `kindergarten-short-a-words.md` (Grade Unit) is a tight, grade-specific practice page that references the same pattern without reproducing the Skill page's teaching apparatus. This is the differentiation the standard demands, and it is being honored, not just described.

---

## D. Core Spelling audit

**Educational quality:** high across the sample. The morphology treatment in `4th-grade-advanced-prefixes.md` and `grade-5-greek-latin-word-parts.md` is accurate and appropriately hedges on bound roots ("Some are bound roots: they carry a recognizable spelling even though they do not usually stand alone as modern English words"). The phonics sequencing rationale in `kindergarten-consonant-digraphs.md` ("This step comes after the mixed CVC review because the child has already practiced mapping individual consonant and short-vowel sounds in order") is exactly the kind of curriculum-position framing §9.3 of the Grade Unit standard asks for, not an unsupported developmental claim.

**Core↔Skill boundary:** mostly well-kept, with one real ambiguity found. `grade-1-tch-dge-ending-rules.md` (Grade Unit-shaped: readiness signals, "How to practice this list," move-on guidance naming the next Core unit) covers the same *tch*/*dge* territory as the Skill page `ck-tch-dge-word-endings.md`, but scoped correctly — the Skill page teaches four related endings (*ck*, doubled consonants, *tch*, *dge*) as one family with a general routine and exception list; the Grade Unit narrows to just *tch*/*dge* for this grade's practice set and does not reproduce the Skill page's FLOSS-rule table or exception taxonomy. This is the standard being followed correctly — flagged here only because `grade-1-tch-dge-ending-rules.md` has no `contentRole` set at all (see Section I), which is a metadata gap, not a content-duplication problem.

**Word list length:** three Core pages exceed the standard's explicit 8–16-word ceiling (§6, §13 checklist item 3): `3rd-grade-multisyllabic-words.md`, `3rd-grade-prefix-words.md`, and `3rd-grade-suffix-words.md` each carry **18 words**. Small, mechanical, easy to fix (trim to 16, or the standard's ceiling should be revisited if 18 is judged pedagogically necessary for these three morphology-heavy sets — either is defensible, but the current state contradicts the written standard as-is).

**Warmth:** this is where Core is weakest, and it is a real, systemic pattern, not a one-off. Grades 3–5 Core "How to practice this list" sections read as procedurally correct but emotionally flat compared to the HFW and Themed prose sampled at the same grades. Compare `4th-grade-advanced-prefixes.md`'s practice section — *"Sort the words by their five prefixes. For each word, have your child underline the prefix, say the whole word, cover it, and write the prefix first..."* — against the Kindergarten Core equivalent in `kindergarten-short-a-words.md` — *"Calm correction is part of the practice, not a failed turn."* The Kindergarten and early-grade Core pages consistently include one warm, reassuring sentence about what a mistake means or how to respond to it; the Grade 4–5 sample pages in this corpus generally do not. This is a genuine, presentation-independent content gap (Section H expands with more examples and a concrete remedy), not a rendering artifact.

**SEO/AEO/GEO:** titles and `shortAnswer` fields are specific and pass the "swap test" (a `shortAnswer` written for another grade's word list would visibly be wrong) in every sample read — e.g., `grade-5-greek-latin-word-parts.md`'s `shortAnswer` names its actual words (*photo, graph, tele, port, struct, spect, dict, script, rupt*), which could not be reused for any other Grade 5 unit. This is strong, genuine information gain, not templated boilerplate.

**Topical authority:** Core is the strand best positioned to function as a genuine reference resource — the Skill-page companion system means a parent or teacher landing on a Core page can go one click deeper into a durable concept explainer, which HFW and Themed intentionally don't offer (correctly, per their own governing questions).

---

## E. High-Frequency Words audit

**Role fit:** excellent. Every one of the 4 HFW pages read (K Set 1, Grade 1 Set 1, Grade 3 Set 3, Grade 5 Set 1) does exactly the job the standard specifies: set-level cross-word observations first, then selective per-word notes only where genuinely needed, with **zero** duplication between the two. The set-level/word-note split is handled with real editorial judgment — e.g., in `grade-3-high-frequency-words-set-3.md`, *even* vs. *ever* is handled as a set-level contrast ("begin with the same three letters, eve, but their first vowels do not sound alike") rather than forcing two redundant word notes.

**Information gain beyond the word list:** strong and inventory-specific in every sample. The "swap test" from the standard (§8) passes cleanly: `grade-5-high-frequency-words-set-1.md`'s prose about *government*/*information* sharing a *govern*/*inform* base, and *language* ending in the "stable letter sequence guage," could not be transplanted to any other HFW set without becoming false. This directly answers task question 10 ("Do HFW pages have enough information beyond their lists?") — yes, convincingly, in every page sampled.

**FAQ:** by design, **zero of the 27 HFW pages carry a `faq` block** (confirmed corpus-wide via metadata pass). This is correct per the standard (§7 explicitly bans "FAQs for symmetry, schema, SEO, GEO, or AEO") and should not be treated as a gap — it is a deliberate, defensible restraint that should be protected, not "fixed" by adding filler FAQs.

**Pronunciation handling:** consistently careful and dialect-safe across the sample — *"the f usually sounds like v"* (not "always"), *"the a may not sound like the short a in an, but the spelling stays w-h-a-t"* — no sample page presents one accent as canonical, matching the standard's explicit requirement.

**Systemic strength worth calling out for the report's warmth section:** HFW pages, despite being the most inventory-driven and mechanically constrained of the three strands, read *warmer* on average than upper-grade Core pages, because the word-note voice is inherently personal ("Keep every letter in..."; "the spelling is still..."). This is a useful internal model: the site already knows how to sound warm while being precise — it just isn't applying that voice evenly (see Section H).

---

## F. Themed Spelling Practice audit

**Human/theme framing — the brief's central concern for this strand.** The sample supports a nuanced verdict: **the one-sentence human-context model is working, but its execution is inconsistent in how much it actually earns the "human" label.**

- `grade-1-weather-words.md` (the standard's own reference page) opens: *"First graders can use these nine weather words when talking about the day and noticing what it is like outside."* This is genuinely human-relevant — it names a real, unforced reason a first grader encounters these words (talking about the weather) without assuming a specific home routine.
- `4th-grade-solar-system-words.md` opens: *"Children may write these solar system words in science notes, reports, and stories."* This is functional but generic — "children may write these words in reports" is a sentence that, with minor edits, could describe almost any Grade 4 academic-vocabulary theme (career words, geometry words, measurement words all sampled or scanned use near-identical "children may encounter/write these words in..." framing). This is the **information-gain trap the task brief specifically warns about**: the human-context sentence, while not wrong, is close to the line of "could be transferred to another inventory with only the words changed."
- `3rd-grade-life-cycle-words.md` similarly opens with "Children meet life cycle words in science books, classroom observations, and written explanations of how living things change" — same structural pattern (*"Children [encounter/meet/may write] these [X] words in [context]"*), third occurrence in the sample.

This is a **systemic, not isolated, pattern**: the four Grades 3–5 science/academic-topic Themed pages sampled or scanned (life cycle, solar system, ecosystem, and by title pattern also geometry/measurement/career) share a near-identical opening template, while the K–2 Themed pages sampled (animal words, weather words, transportation words) each find a more specific, less templated human reason. This maps to task §13's explicit instruction to investigate this "especially carefully," and the finding is real: **Themed pages get warmer and more specific in early grades and flatter/more templated in upper grades** — the inverse of what might be expected (if anything, upper-grade readers can support *more* specific framing, not less).

**Spelling-first discipline:** excellent, no violations found. No sampled Themed page teaches ecosystem science, solar-system facts, or life-cycle biology — every observation is genuinely orthographic (*"the letter c spells its hard sound at the beginning of cocoon, but it spells its soft sound at the beginning of cycle"*), matching the standard's explicit anti-pattern list (§14) precisely.

**Word notes:** correctly sparse and non-formulaic — 25 of 27 Themed pages have at least one note, but note count ranges 0–3 per page with no fixed pattern (confirmed via full metadata pass), matching the standard's "no minimum or maximum quota" instruction.

**FAQ:** zero of 27 Themed pages carry FAQ (confirmed corpus-wide), same correct restraint as HFW.

---

## G. Parent / teacher / student experience

**Parent:** the corpus succeeds well. A parent with zero literacy-training background can act on virtually every note read in this audit without translation — "the final s sounds like z, but the word still ends with s" requires no jargon decoding. The one place a parent might stumble: Core's morphology terminology (*bound root*, bare in `grade-5-greek-latin-word-parts.md`) is used correctly but without a plain-language gloss the first time it appears on a page a parent might land on directly from search, rather than via the (glossed) Skill page. Small, localized fix — see Section N.

**Teacher:** the corpus is genuinely usable as a reference. A teacher could pull `ck-tch-dge-word-endings.md` (Skill) directly into planning without editing; a teacher could equally use any Core Grade Unit's "Why these words?" section as an accurate, curriculum-position-aware rationale for why a given list sits where it does. This is a real differentiator versus typical worksheet-mill competitors (Section L).

**Student:** most Core/HFW/Themed prose is explicitly parent/teacher-facing (per the standards' own voice rules — "write for a parent, guardian, or teacher"), which is appropriate and consistent with the product's stated model (parents/teachers select and administer practice, not students reading instructional prose unassisted). Nothing sampled is condescending or falsely "kid-voiced" — the tone guidelines in `CONTENT_STANDARDS.md` ("would a calm, experienced elementary teacher say this?") are being honored; no sampled page fails that test.

---

## H. Warmth and editorial-voice audit

**Corpus-wide strengths:** the register is calm, confident, and free of "AI filler" phrasing — no sampled page opens with "In today's world..." or similar throat-clearing, and no sampled page uses stacked hedges or empty transitions. This is a real accomplishment relative to typical AI-generated educational content.

**Corpus-wide weaknesses — two systemic patterns:**

1. **Mechanical-verb concentration.** Across the sample, "hold [word] in [n] parts," "organize as," "keep the written chunk/sequence," and "stable spelling" recur with enough frequency to feel like a house formula rather than a considered choice, especially in Grades 3–5 Themed and upper-grade HFW. Examples from the sample alone: *"hold interest in-ter-est,"* *"held as e-co-sys-tem,"* *"held in the two syllables ev-er,"* *"organize astronaut as as-tro-naut,"* *"organized as sat-el-lite."* This is not wrong — syllable-chunking language is genuinely useful — but reading five upper-grade pages in a row surfaces the pattern as a tic. This matches the brief's own named concern almost verbatim ("stable written structure," "anchor," "retrieve" recurring to the point of feeling mechanical).
2. **Warmth is front-loaded into Kindergarten and drains out by Grade 4–5**, across *all three strands*, not just Core (Section D flagged this for Core specifically; the same pattern is visible in Themed's human-context openers, Section F). This is the audit's single most consistent cross-strand finding.

**A concrete, presentation-independent remedy** (semantic sketch, not a rewrite): one additional sentence per upper-grade page — not a paragraph — that does for Grades 3–5 what `kindergarten-short-a-words.md` already does ("Calm correction is part of the practice, not a failed turn") and what the Grade 1 Weather page already does (naming a real, specific reason the theme matters). Example sketch for `4th-grade-solar-system-words.md`'s opener, replacing the generic "Children may write these solar system words in science notes, reports, and stories" with something that earns its place the way the Weather reference page does — e.g., *"Space vocabulary shows up whenever a fourth grader writes about a planet, a mission, or a night sky they've actually looked at — and several of these words hide a spelling shortcut once you see their parts."* This is illustrative only; the actual sentence should be written by an editor with the full inventory in view, not copy-pasted from this report.

---

## I. Content-sufficiency audit

Classification is judged against each strand's own standard, not a word-count threshold, per the task brief's explicit instruction.

| Family | Verdict | Basis |
|---|---|---|
| Core Spelling, all grades sampled | **Appropriately complete** | Every required section per §5/§6 of the Grade Unit standard present in every sample; "Why these words?" consistently covers selection + sequence position without duplicating the Skill page. |
| HFW, all grades sampled | **Appropriately complete** | Matches the standard's own semantic model exactly; the "selective, not exhaustive" model is a designed sufficiency point, not a gap. |
| Themed, K–2 sampled | **Appropriately complete** | Matches the standard; human framing lands. |
| Themed, Grades 3–5 sampled | **Slightly thin on human framing specifically** (not on spelling content — spelling analysis is fully sufficient) | See Section F — the opener template is reusable across inventories, which the standard's own "swap test" (§8 of the HFW standard, analogously applicable) treats as a genuine information-gain failure mode. |
| Core, `3rd-grade-multisyllabic-words.md` / `-prefix-words.md` / `-suffix-words.md` | **Slightly overdeveloped relative to the standard's own stated ceiling** (18 words vs. the stated 8–16) | Not overdeveloped as *prose* — the ceiling violation is purely in `words[]` length. |

**Systemic component check:** no missing semantic component was found in any strand's core information architecture (all match their respective standards' canonical section orders in every sample read). The one true gap is metadata, not prose: **11 published files have no `contentRole` set** — `kindergarten-first-words.md`, `grade-1-floss-rule.md`, `grade-1-inflectional-endings-ed-ing.md`, `grade-1-inflectional-endings-s-es.md`, `grade-1-r-controlled-ar-or.md`, and `grade-1-tch-dge-ending-rules.md` (`status: published`), plus 6 further `status: archived` Kindergarten pages correctly out of the live corpus. The 5 published-but-untagged phonics files structurally read as Core Grade Units (readiness signals, move-on guidance, next-unit references) in every one sampled (`grade-1-tch-dge-ending-rules.md`), but their missing `contentRole` means they were excluded from this audit's own primary-corpus count in Section B until manually reclassified, and — more importantly — they may be invisible to any tooling, navigation logic, or future audit that filters by `contentRole` the way this one initially did. **This is a Content problem (a real classification gap), not a Presentation problem**, and it should be fixed before freeze regardless of how small it looks, because it is exactly the kind of gap that silently compounds (a future Grade Hub build could omit these pages entirely if it queries by `contentRole`).

---

## J. SEO audit

- **Search intent alignment:** strong across all three strands. Every sampled `title`/`shortAnswer` pair names the actual grade and actual words, satisfying literal "grade 3 life cycle spelling words" / "kindergarten short a words" type queries precisely.
- **Grade terminology migration status:** confirmed inconsistent, as the task brief anticipated. Titles mix the target public convention (`1st Grade Weather Spelling Words`, matching the standard's stated direction) with legacy numeral-grade forms (`Grade 5 High-Frequency Words — Set 1`, `4th Grade Solar System Spelling Words` uses "4th Grade" not "Grade 4" — actually already migrated in Themed) and un-migrated forms (`Short A Words` carries no grade prefix at all in its title, `grade: "1"` only in frontmatter). **This is a known, explicitly deferred migration per the Themed standard §10** ("This standard records direction but defers the sitewide migration") — correctly out of scope to fix now, but worth flagging precisely because the task brief asked to surface (not fix) exactly this kind of inconsistency.
- **Thin-content/templated-content risk:** low for Core and HFW (every sampled page's prose is inventory-specific and would fail the "swap test" if transplanted). **Real, non-trivial risk for the Grades 3–5 Themed opener pattern** identified in Section F/H — while the *spelling analysis* in those pages is not templated, the *human-context opener* is close enough to formulaic that a search-quality reviewer applying Google's own "would this page have been written by combining a topic and a template" heuristic (a well-established helpful-content principle, not speculative) might flag it.
- **Internal linking:** sound within the sample — Themed pages correctly link to deterministic same-grade peers and their gateway (not sequential "next lesson" framing, matching the standard's explicit ban on that), Core pages correctly use Review First/Next Step only.
- **Cannibalization:** no clear case found in the sample. The tightest overlap risk (Section D's `grade-1-tch-dge-ending-rules.md` vs. `ck-tch-dge-word-endings.md`) is scoped correctly, not cannibalizing.

---

## K. GEO/AEO audit

- Every sampled page provides a genuinely self-contained, extractable direct answer via `shortAnswer` — well-established "helpful content" and answer-engine-extractability practice (a page that states its specific claim plainly near the top is more citable, independent of any AI-specific optimization). This is **established evidence, not speculation**, and the corpus already does it well.
- No sampled page contains hidden text, AI-targeted schema, manufactured FAQ, or any of the anti-patterns the task brief warns against — confirmed corpus-wide for FAQ counts (HFW: 0/27, Themed: 0/27) and spot-checked for hidden content (none found in any rendered Markdown body read).
- **One genuine, non-speculative GEO-relevant recommendation:** the Grades 3–5 Themed opener pattern flagged in F/H is *also* an AEO weakness independent of the SEO framing above — an answer engine summarizing "why is this list useful" across several Grade 4 Themed pages would currently produce near-identical summaries for different topics, which is a real extractability/distinctiveness problem, not a manufactured one.

---

## L. Topical-authority audit

The three-strand model builds a convincing, non-cannibalizing topical graph in every case sampled: Core establishes concept authority (reinforced by the Skill-page link-out), HFW establishes frequency-driven retrieval authority, Themed establishes practice breadth without diluting focus (no sampled Themed page drifts into subject-matter teaching). The corpus reads as intentionally comprehensive rather than artificially padded — every sampled page's word list and analysis is genuinely distinct from its neighbors.

**Differentiator check (task §12 thought experiment):** against a typical worksheet-mill or generic word-list competitor, the real, visible differentiators found in this sample are: (1) named, inventory-specific spelling analysis no generic list-generator produces (the *even*/*ever* contrast, the *dge* vs. *ge* boundary explanation); (2) accurate curriculum-position framing a worksheet site rarely bothers with; (3) dialect-safe pronunciation handling, which is rare even among specialist competitors. These are genuinely visible in the content itself, not just claimed — this is a real, defensible competitive position.

---

## M. Content versus visual-design matrix

| Observation | Classification | Rationale |
|---|---|---|
| Grades 3–5 Core practice sections read flatter/less warm than K–2 | **Content** | Purely a prose/sentence-choice issue; no layout change would fix it. |
| Grades 3–5 Themed opener sentences are template-adjacent | **Content** | Same — a wording problem, not a rendering one. |
| Repeated "written chunk"/"hold in N parts" phrasing | **Content** | Word-choice pattern, independent of any component. |
| 3 Core pages exceed the 8–16 word ceiling | **Content** | Frontmatter data issue. |
| 11 published pages missing `contentRole` | **Content** (with a **presentation-adjacent risk**: future navigation/hub tooling that filters on `contentRole` could silently drop these pages) | Root cause is metadata, but the downstream risk is a build/rendering-visibility issue — flagged as Both for planning purposes. |
| Roadmap §14 table undercounts completed Core batches | **Neither** (a documentation-process issue, not a production-content or presentation issue) | Affects internal tracking accuracy only; does not affect any live page. |
| Grade-terminology inconsistency across titles (numeral vs. public convention) | **Content** | Text field, not a rendering choice — though the *migration* itself, once undertaken, is explicitly deferred and out of scope here. |
| Perceived "sparseness" of any given page (not specifically evidenced in this sample, but worth pre-empting) | **Presentation, if raised** | Per the task brief's own instruction: do not treat renderer-caused whitespace as a content deficiency without confirming the gap is real in both Markdown and renderer output — no such case was found in this sample, but this is the correct test to apply if one is raised later. |

---

## N. Highest-value improvements (ranked)

1. **[SIGNIFICANT GAP, Priority: High, Content, Scope: Page family]** Fix the metadata-tagging gap on the 5 published, untagged phonics pages (`grade-1-floss-rule.md`, `grade-1-inflectional-endings-ed-ing.md`, `grade-1-inflectional-endings-s-es.md`, `grade-1-r-controlled-ar-or.md`, `grade-1-tch-dge-ending-rules.md`) and `kindergarten-first-words.md` by setting `contentRole: grade-unit` (they already structurally match the Grade Unit pattern in every field checked). Smallest remedy: a metadata-only edit to 6 files, no prose change needed. This should happen before any Grade Hub work reads the corpus by `contentRole`.

2. **[SYSTEMIC IMPROVEMENT, Priority: High, Content, Scope: Strand — Themed Grades 3–5]** Replace the "Children may encounter/write these words in..." templated opener pattern on the Grades 3–5 science/academic-topic Themed pages (solar system, life cycle, ecosystem, and likely geometry/measurement/career by title-pattern — worth a full-corpus check beyond this sample) with a page-specific human-context sentence that would fail the standard's own swap test if transplanted, matching what `grade-1-weather-words.md` already achieves. Estimated scope: roughly 8–12 pages based on the pattern's visibility in the sample; confirm exact count with a full read before starting.

3. **[SYSTEMIC IMPROVEMENT, Priority: Medium, Content, Scope: Strand — Core Grades 3–5]** Add one warmth/reassurance sentence to the "How to practice this list" close of upper-grade Core pages, matching the model already present in Kindergarten and Grade 1 Core pages ("Calm correction is part of the practice, not a failed turn" is the exact bar to match, not exceed).

4. **[SMALL REFINEMENT, Priority: Medium, Content, Scope: Individual pages]** Trim `3rd-grade-multisyllabic-words.md`, `3rd-grade-prefix-words.md`, and `3rd-grade-suffix-words.md` from 18 to ≤16 words, or make an explicit, documented exception to the standard's ceiling for morphology-dense Grade 3 units if 18 is judged pedagogically necessary — either resolves the current silent contradiction between standard and content.

5. **[SMALL REFINEMENT, Priority: Low, Documentation, Scope: N/A — not production content]** Update `CONTENT_IMPROVEMENT_ROADMAP.md` §14's Phase 2 row to reflect the already-documented Grade 3 (7 pages) and Grade 5 (5 pages) Core batch audits, so the tracking table matches the roadmap's own recorded work. This does not touch any page and carries no user-facing effect, but it currently makes the corpus look considerably less finished than it is, which risks misdirecting future editorial effort.

6. **[SMALL REFINEMENT, Priority: Low, Content, Scope: Individual pages]** Where a Core page uses unglossed morphology terminology likely to be a reader's first landing point (e.g., "bound root" in `grade-5-greek-latin-word-parts.md`), add a three-to-six-word plain-language gloss on first use, matching the pattern the same page already uses for other terms.

**Deliberately not recommended:** adding FAQ to HFW or Themed pages (correctly absent by design — Sections E, F); adding more word notes to any sampled page (selectivity is a protected strength — Section C); any visual/layout change (out of scope per the task brief, and no content gap traced back to rendering in this sample); any curriculum, taxonomy, or route change (frozen, and nothing found here rises to the "genuinely serious problem" bar the brief sets for reopening that).

---

## O. Representative page matrix

| Page | Grade | Strand | Content quality | Warmth | Information gain | Search-intent satisfaction | Sufficiency | Recommended action |
|---|---|---|---|---|---|---|---|---|
| `kindergarten-short-a-words.md` | K | Core | High | High | High | High | Appropriately complete | Keep as is |
| `kindergarten-consonant-digraphs.md` | K | Core | High | High | High | High | Appropriately complete | Keep as is |
| `4th-grade-advanced-prefixes.md` | 4 | Core | High | Medium (flat practice-section tone) | High | High | Appropriately complete | Small refinement (warmth, item 3) |
| `grade-5-greek-latin-word-parts.md` | 5 | Core | High | Medium | High | High | Appropriately complete | Small refinement (gloss "bound root," item 6) |
| `grade-1-tch-dge-ending-rules.md` | 1 | Core (untagged) | High | Medium | High | Medium (missing `contentRole` risks discoverability) | Appropriately complete | Small refinement (tag fix, item 1) |
| `kindergarten-high-frequency-words-set-1.md` | K | HFW | High | High | High | High | Appropriately complete | Keep as is |
| `grade-1-high-frequency-words-set-1.md` | 1 | HFW | High | High | High | High | Appropriately complete | Keep as is |
| `grade-3-high-frequency-words-set-3.md` | 3 | HFW | High | High | High | High | Appropriately complete | Keep as is |
| `grade-5-high-frequency-words-set-1.md` | 5 | HFW | High | High | High | High | Appropriately complete | Keep as is |
| `kindergarten-animal-words.md` | K | Themed | High | High | Medium-High | High | Appropriately complete | Keep as is |
| `grade-1-weather-words.md` | 1 | Themed (reference) | High | High | High | High | Appropriately complete | Keep as is |
| `grade-2-transportation-words.md` | 2 | Themed | High | Medium-High | Medium-High | High | Appropriately complete | Keep as is |
| `3rd-grade-life-cycle-words.md` | 3 | Themed | High | Medium (templated opener) | Medium (opener) / High (analysis) | Medium (opener) / High (analysis) | Slightly thin (human framing only) | Systemic improvement, item 2 |
| `4th-grade-solar-system-words.md` | 4 | Themed | High | Medium (templated opener) | Medium (opener) / High (analysis) | Medium (opener) / High (analysis) | Slightly thin (human framing only) | Systemic improvement, item 2 |
| `5th-grade-ecosystem-environment-words.md` | 5 | Themed | High | Medium (templated opener) | Medium (opener) / High (analysis) | Medium (opener) / High (analysis) | Slightly thin (human framing only) | Systemic improvement, item 2 |
| `3rd-grade-multisyllabic-words.md` | 3 | Core | High (prose) | Medium | High | High | Slightly overdeveloped (word count only) | Small refinement, item 4 |
| `short-a-words.md` *(Skill, comparison only)* | 1 | Skill | High | High | High | High | Appropriately complete | Keep as is (not primary corpus) |
| `ck-tch-dge-word-endings.md` *(Skill, comparison only)* | 1 | Skill | High | Medium | High | High | Appropriately complete | Keep as is (not primary corpus) |

---

## P. Final recommendation

**Run one more targeted editorial pass before declaring the deepest-page content layer frozen — but a narrow one, not a rewrite.**

The pass should accomplish exactly the six items in Section N, in priority order, and nothing more:

1. Fix the 6-file `contentRole` metadata gap.
2. Rewrite the human-context opener on the Grades 3–5 science/academic-topic Themed pages (confirm the full affected set first — likely 8–12 pages, not the 3 sampled here).
3. Add one warmth sentence to upper-grade Core "How to practice this list" closings, scoped to Grades 3–5 Core pages that currently lack one (confirm scope with a fuller read; this audit's sample found the pattern in 2 of 2 Grade 4–5 Core pages read, suggesting it is corpus-wide but not verified at 100% coverage).
4. Trim or explicitly except the 3 oversized Core word lists.
5. Gloss unexplained morphology terminology on first Core-page use, where a Skill-page link isn't the reader's likely first stop.
6. Sync `CONTENT_IMPROVEMENT_ROADMAP.md` §14 with its own recorded batch work (documentation-only, no production risk).

None of these require reopening curriculum, taxonomy, schema, or rendering. All six are additive or corrective within existing pages and frontmatter. Given the corpus's actual state — much further along than its own tracking table suggests — this should be a short, bounded pass, not a new authoring phase. After it, the deepest-page layer is reasonably frozen to move outward to Grade Hubs, strand gateways, the Skills Hub, and the visual redesign.

**Explicitly do not change:** the three-strand architecture; the selective-note model in HFW and Themed; the zero-FAQ convention in HFW and Themed; the frozen word inventories, IDs, routes, or grade ownership; any Core↔Skill content boundary found sound in this sample; the deferred grade-terminology migration (already correctly scoped as a separate, later, sitewide task per the Themed standard itself).
