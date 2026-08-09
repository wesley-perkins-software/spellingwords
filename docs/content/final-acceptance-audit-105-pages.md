# Final Independent Acceptance Audit — All 105 Canonical Deepest Spelling Pages

**Repository state audited:** `spellingwords`, `development` branch, HEAD `ec99d80` (merge of PR #266, "Refine Grade 3–5 themed page intros and add tiny Core orientation for suffix changes"), inspected via detached checkout. Read-only at the time of the original audit — no production files, tests, or documentation were modified, and nothing was committed.

**This report was originally delivered standalone**, not written into the repository, because the audit task that produced it explicitly prohibited committing anything. It has since been committed to `docs/content/` in this branch (PR #267) at the site owner's explicit request, after an independent reconciliation pass confirmed it accurately describes the current repository. See the Reconciliation Note immediately below for that verification.

---

## Reconciliation note (added after initial delivery)

After this report was first delivered, a follow-up request asked for it to be reconciled against the current `development` branch, on the premise that PR #266 had fixed several items this audit reports as issues. That reconciliation was performed and is summarized here for anyone reading this file going forward:

- **`origin/development` had not moved** since this audit was performed — `git log ec99d80..origin/development` returns nothing. There was no stale-repository-state problem to correct.
- **Attribution correction:** the metadata/governance fixes (six files gaining `contentRole: grade-unit`, the 8–16-word standard gaining an explicit exception clause for the three frozen 18-word Grade 3 inventories, and the roadmap/inventory-doc reconciliation) were made by **PR #265** ("Clean up canonical grade unit governance," commit `00c89ae`), not PR #266. PR #266 (commit `c2623c8`, "Refine upper-grade spelling page introductions") is a separate, later PR that touched only the 12 upper-grade Themed pages plus one Core file. Both PRs are ancestors of `ec99d80`, the commit this audit actually inspected, so **every conclusion below was already based on a repository state that includes both PRs** — this correction is about which PR did which work, not about missing content.
- **Every item this audit already marked "Resolved" in Section B was re-verified fresh and is still correctly resolved**: all 6 files independently re-confirmed to carry `contentRole: grade-unit`; the standard's exception clause independently re-confirmed present at §6/§8/§13; and a dedicated regression test, `src/lib/content/canonicalGradeRoutes.test.ts` → `'preserves the three frozen 18-word Grade 3 Core inventories exactly'`, was located and confirmed to lock the exact word arrays and length for all three pages (this test's existence was not previously cited by name in this report and is added here for completeness).
- **Every item this audit already marked "Unresolved" or flagged as a defect was also re-verified fresh and remains accurate**, including the most load-bearing one: `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md`'s own top-of-file banners were corrected by PR #265, but its §14 summary table (lines ~1081–1090) was not — it still reads "8 Kindergarten Core pages / 70 remaining" and "1 member set / 26 member sets + 6 gateways remaining," contradicting the corrected banners in the same file. `docs/content/inventory/high-frequency-words.md` was confirmed untouched by either PR #265 or #266 (last modified at commit `96fb032`, well before both) and still says "the other 26 member sets remain pending editorial transformation." The three factual/orthographic errors and the renderer-dependent phrase (Section L, items 1–4) are all inside content added by PR #266, which nothing since has touched.
- **No finding in this report required correction.** Sections A through R stand as originally written. No production-content changes have been made as part of this reconciliation, per instruction.

---

## A. Executive verdict

# **NOT READY — IMPORTANT ISSUES REMAIN**

This is one notch better than it sounds, and worth stating precisely: the corpus is **structurally excellent and factually clean in 102 of 105 pages**, all governance/metadata debt from the previous audit has been resolved, and one of the two previously-flagged systemic concerns (Themed upper-grade human framing) received real, substantive editorial attention. But that same attention pass introduced **three verifiable factual/orthographic errors** and **one new presentation-independence violation**, and the other previously-flagged systemic concern (Core Grade 3–5 warmth) received **essentially no attention at all** — confirmed at 0 of 18 pages. A site whose entire purpose is teaching correct spelling cannot freeze its content layer while it contains sentences that assert an incorrect spelling fact, however small the affected surface area (3 pages of 105).

This does **not** mean the corpus needs another large authoring pass. The fix scope is small and precisely locatable: 3 factual corrections, 1–2 phrasing fixes, and one honest decision about the Core warmth pass (either do it, or explicitly descope it rather than leave the roadmap silently claiming it's "pending" indefinitely). Section Q gives the exact worklist.

**Why not "PASS WITH MINOR CLEANUP" instead:** the severity model in this brief explicitly lists "factual educational error" as a BLOCKER-caliber example, and this audit found three of them, independently verified by direct inspection of the file content (not agent claims taken on faith). That alone is disqualifying for a freeze verdict, however narrow the surface area. Once those three are fixed, this corpus is very close to freeze-ready — closer than the previous audit, not further from it.

---

## B. Previous-audit resolution

| Previous concern | Current state | Verdict |
|---|---|---|
| 6 published Core-shaped pages missing `contentRole` (discoverability/navigation-tooling risk) | Commit `00c89ae` ("Clean up canonical grade unit governance") set `contentRole: grade-unit` on all 6 files (`kindergarten-first-words.md`, `grade-1-floss-rule.md`, `grade-1-inflectional-endings-ed-ing.md`, `grade-1-inflectional-endings-s-es.md`, `grade-1-r-controlled-ar-or.md`, `grade-1-tch-dge-ending-rules.md`). Verified independently via full-corpus metadata extraction: 0 published files now lack `contentRole`. | **Resolved** |
| 3 Grade 3 Core pages (18 words) silently contradicted the standard's stated 8–16-word ceiling | The same governance-cleanup commit added an explicit exception clause to `CANONICAL_GRADE_UNIT_PAGE_STANDARD.md` (§6, §8, §13): "normally 8–16 words, except where the frozen curriculum defines a larger coherent inventory." Verified the three files still have exactly 18 words, and verified independently across all 51 Core pages that no *other* page exceeds 16 words. | **Resolved** — correctly documented as a deliberate exception, not silently tolerated |
| Themed Spelling Practice Grades 3–5 human-context openers read as templated/generic, close to failing the standard's own "swap test" | Commit `c2623c8` added a new opening body paragraph to 12 upper-grade Themed pages specifically to address this. Substantively, the new paragraphs are more specific than the old `description` field they sit alongside (naming actual spelling foci, e.g. "doubled consonants, useful word parts, and contrasting sounds for *c*" vs. the old generic "This eight-word set develops spelling through compounds..."). **However:** the fix introduced its own tight cross-page template ("[Topic] words become relevant/Students meet/use... when they read/write/discuss/explain..."), left the old `description` field unedited so 12 pages now say a near-duplicate thing twice in two places, and — most seriously — introduced two content defects along the way (see Section L: 3 factual/orthographic errors, 1 clear renderer-dependent phrase). | **Partially resolved, with a regression** — genuine improvement in specificity, but new redundancy and new defects introduced in the same commit |
| Core Spelling Grade 3–5 practice sections read as procedurally correct but emotionally flat, with no reassurance sentence comparable to Kindergarten's "Calm correction is part of the practice, not a failed turn" | Independently re-verified across all 18 Grade 3–5 Core pages, quoting every closing move-on sentence verbatim: **0 of 18 contain any reassurance/warmth sentence in the practice-closing guidance.** Exactly one Core file was touched by the most recent commit (`3rd-grade-suffix-spelling-changes.md`), and that edit added one sentence to the *opening rationale*, not the practice-closing section where the original gap was identified. The roadmap document's own banner (`CONTENT_IMPROVEMENT_ROADMAP.md` line 13) still states: "A selective final human-voice and warmth pass for upper-grade Core and Themed pages remains pending." | **Unresolved** — confirmed by both direct re-audit and the project's own honest self-reporting |
| `CONTENT_IMPROVEMENT_ROADMAP.md` §14 Phase 2 summary table understated Core progress (omitted completed Grade 3/5 batches) | Re-read the current §14 table: it is **byte-for-byte unchanged** from the version audited previously — still reads "8 Kindergarten Core pages / 70 remaining" and "1 member set / 26 member sets + 6 gateways remaining" for HFW, despite Grades 1–5 Core, all 27 HFW sets, and all 27 Themed members having been completed and merged since. | **Unresolved** — this specific recommendation was not acted on |
| (New, not in previous audit) `docs/content/inventory/high-frequency-words.md` | Discovered during this audit: this companion inventory file still states "The other 26 member sets remain pending editorial transformation," directly contradicting the roadmap's own top-of-file banner ("Production editorial implementation is complete across the 27 frozen inventories") and the actual file contents. Also, the roadmap's "Companion inventory files" list still references two files (`deprecated-and-legacy-pages.md`, `untagged-and-data-quality.md`) that were deleted from the repository in an earlier commit (`a4720e0`) and no longer exist. | **New finding this round** — the documentation-staleness pattern is broader than previously identified, not narrower |
| Unglossed morphology terminology (e.g., "bound root") on first Core-page use | Not specifically re-verified this round; no agent flagged a new instance, but this was a low-priority item and wasn't the focus of any batch's search criteria. | **Not reverified — carry forward, low priority** |

---

## C. Corpus verification

Independently verified via a full programmatic frontmatter extraction across all 153 files in `src/content/spelling-lists/`, not trusted from documentation:

| Invariant | Claimed | Verified |
|---|---|---|
| Total canonical deepest pages | 105 | **105** (51 + 27 + 27) |
| Core Spelling Grade Units | 51 | **51** — K=8, Grade1=12, Grade2=13, Grade3=7, Grade4=6, Grade5=5 |
| High-Frequency Word sets | 27 | **27** — K=4, Grade1=7, Grade2=7, Grade3=5, Grade4=2, Grade5=2 |
| Themed Spelling Practice pages | 27 | **27** — K=5, Grade1=5, Grade2=5, Grade3=4, Grade4=4, Grade5=4 |
| HFW total word assignments | 316 | **316**, matching the frozen per-grade pattern exactly on every set |
| HFW normalized-unique spellings | 316 | **316** (no duplicate words across the entire HFW corpus) |
| Themed total entries | 237 | **237** |
| Themed case-normalized distinct spellings | 236 | **236** |
| Duplicate `id` or `urlSlug` values anywhere in the collection | none expected | **None found** — 153 unique ids, 153 unique slugs |
| Conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) anywhere in content or docs | none expected | **None found** |
| Word-list length outliers (Core, >16 words) | 3 documented exceptions | **Exactly 3**, all Grade 3, all matching the documented exception (`3rd-grade-multisyllabic-words`, `3rd-grade-prefix-words`, `3rd-grade-suffix-words`, all at 18 words); no undocumented overage anywhere else in the 51-page Core corpus |
| Published files missing `contentRole` | 0 expected | **0** — the only blank-`contentRole` files remaining are 6 `status: archived` Kindergarten legacy pages, correctly out of the live corpus |

All eight structural/curriculum invariants named in the task brief are independently confirmed correct.

---

## D. Educational-quality assessment

**Core Spelling:** Sound throughout. All 51 pages were read in full (33 by one batch pass covering K–2, 18 by a second covering Grades 3–5). Phonics, morphology, and syllable-structure claims checked out as accurate in every page — including deliberately scrutinized upper-grade morphology claims (bound roots, prefix/suffix meanings, base-word preservation rules across `advanced-prefixes`, `advanced-suffixes`, `derived-words`, `tier-1-roots-and-patterns`, `greek-latin-word-parts`). No invented rules, no misleading generalizations; several pages explicitly and correctly hedge generalizations ("These are useful generalizations, not promises about every English word" — `grade-1-cvc-short-vowels-c-k-rule.md`). Dialect sensitivity is a genuine strength: multiple pages explicitly instruct the adult not to correct a child's accent (e.g., the *th*, *r*-controlled, and long-*u* pages in Grade 1).

**High-Frequency Words:** Excellent. All 27 pages read in full. Every pronunciation note checked for dialect-safety passed — no absolute claims found anywhere across 27 sets. The heteronym handling on `read`/`live` (Grade 2 Set 7) and the noun/verb stress-shift handling on `subject` (Grade 3 Set 2) are genuinely careful, technically correct treatments that most competitor sites would get wrong or avoid entirely.

**Themed Spelling Practice:** Strong, with three confirmed exceptions. Orthographic claims were checked in every one of the 27 pages; 24 of 27 pages contain zero factual issues. The 3 exceptions (Section L) are real, verifiable spelling-fact errors — not stylistic disagreements — and are concentrated entirely in the batch of pages touched by the most recent "warmth pass" commit, suggesting the fix was applied without a fact-check step on the pre-existing body content it was appended next to.

**Subject-matter drift:** None found anywhere in the 105-page corpus. Every Themed page stays spelling-focused; several explicitly and correctly disclaim subject teaching in their own prose (e.g., "not a separate astronomy lesson" — `4th-grade-solar-system-words.md`; "without turning the page into a math lesson" — `4th-grade-geometry-words.md`). This is a genuine, corpus-wide strength worth protecting.

---

## E. Human-voice assessment

The picture is sharply bimodal by strand and grade band, not evenly distributed:

- **Kindergarten Core (8/8 pages) and Grade 1 Core (12/12 pages):** genuinely warm. Every single page contains at least one explicit reassurance sentence about normal error patterns — "Calm correction is part of the practice, not a failed turn" (`kindergarten-short-a-words`), "Writing duk or duc for duck is a normal sound-based attempt" (`grade-1-cvc-short-vowels-c-k-rule`), "do not require a child to change their home pronunciation" (`grade-1-consonant-digraphs-final-ck`). This is a real strength, not a template — the specific error named and the specific reassurance differ page to page even though the sentence *shape* repeats (see Section K).
- **Grade 2 Core (13/13 pages):** noticeably terser and more clinical than K/Grade 1 — reassurance is present but thinner ("Calmly confirm that the sound is right..." is functional, not warm), and every page follows an almost fixed two-sentence rationale shape.
- **Grade 3–5 Core (18/18 pages):** **flat and purely procedural, zero exceptions.** Every closing move-on sentence is built from qualitative-but-impersonal behavioral criteria ("...can spell a mixed selection without losing internal material, use a known ending... and independently point to the section they need to check" — `grade-4-multisyllabic-academic-words`). None reassures the reader about what a mistake means. This is the single most consistent voice gap in the corpus.
- **HFW:** warm throughout, all grades — the word-note format is inherently personal ("Keep every letter in cloud, including the vowel team ou" reads as direct, plain-spoken instruction regardless of grade).
- **Themed K–2 (15/15 untouched pages):** clean, minimal, appropriately warm without an explicit "human-context opener" — several pages simply open on the first `###` heading with no preamble at all, which reads as confident rather than thin.
- **Themed 3–5 (12/12 recently-touched pages):** now has an opener, but the openers share a tight cross-page formula (Section K), and 9 of 12 openers substantially restate the adjacent `description` field's claim in different words on the same page — a redundancy that undercuts the "human, not templated" goal the fix was aiming for.

**Representative jargon/mechanical-language check:** no unexplained jargon or academic-paper tone was found anywhere in the 105-page sample (a real strength — this was a stated risk in the original brief and did not materialize). The concern here is not jargon; it's *sameness of rhetorical scaffolding*, detailed fully in Section K.

---

## F. Audience assessment

**Parent:** succeeds across nearly the whole corpus. A parent with no literacy-training background can act on essentially every instruction and note read across all 105 pages without translation. The one place this could stumble is upper-grade Core, where morphology terms (*bound root*, *combining form*) appear correctly but sometimes without a plain-language gloss on first use outside the Skill-page link — a small, low-priority carryover from the previous audit, not independently re-verified this round.

**Teacher:** the corpus remains genuinely usable as a reference — nothing found in any of the 105 pages reads as simplistic, misleading, or technically dubious to a knowledgeable reviewer, *except* the three factual errors in Section L, which a teacher would (correctly) flag immediately and which would cost real credibility if published as-is.

**Student:** appropriate throughout — the corpus consistently targets a parent/teacher reader for instructional prose (matching the product's own stated model), and nothing sampled talks down to or over the head of the intended age range.

---

## G. SEO assessment

**Strengths:** every page's `description`/`shortAnswer` pair remains specific to its actual inventory (the "swap test" passes on all 27 HFW pages and the great majority of Core/Themed pages, independently re-verified this round for HFW in full). Titles are specific and grade-marked. No keyword stuffing, no artificial statistics, no manufactured FAQ anywhere in 105 pages.

**Remaining weaknesses:**
1. The 12 recently-touched Themed pages now carry two overlapping "why this matters" statements (frontmatter `description` + new body opener) that say close to the same thing in different words — this is redundant content on the same page, a mild but real information-architecture smell (not duplicate *pages*, but duplicate *claims within* a page).
2. Grade-terminology migration (numeral vs. "1st Grade" public convention) remains inconsistent across titles — this was already known, explicitly deferred by the Themed standard itself, and correctly out of scope to fix now; noted again only for completeness.
3. Two isolated Skill-link fit questions in Core K–2 (`multisyllabic-words` reused across `grade-1-open-syllables-final-y`, `grade-2-final-stable-le`, and `grade-2-two-syllable-words`, with the Grade 1 fit being the weakest of the three) — a minor internal-linking precision issue, not a duplication or cannibalization risk.

**No new thin-content or cannibalization risk found** across any of the 105 pages this round.

---

## H. GEO/AEO assessment

No hidden text, AI-targeted schema, or manufactured FAQ found anywhere in 105 pages — confirmed corpus-wide (HFW: 0/27 FAQ by design; Core and Themed FAQ counts were checked page-by-page and every FAQ found reads as a genuine residual question, not padding, with one soft exception: `4th-grade-commonly-confused-words.md`'s FAQ "How can a teacher tell whether a student is ready for this page?" functionally overlaps with the entry-readiness bullets it sits beside — a minor redundancy, not a fabricated-FAQ problem).

The one genuine, non-speculative AEO-relevant finding: the redundant description/opener pairing on the 12 recently-touched Themed pages (Section G, item 1) is also an *extractability* weakness — an answer engine summarizing "why does this page matter" would currently pull from two overlapping, not-quite-identical source sentences on the same page rather than one clean, canonical statement. This is the same underlying defect described from an SEO angle above, restated because it independently fails a GEO self-containment test too.

No speculative GEO/AEO tactic is recommended anywhere in this report, and none was found improperly present in production.

---

## I. Topical-authority assessment

No new gaps or orphaned concepts found this round beyond what the previous audit already noted (the Core↔Skill boundary, out of this audit's primary-corpus scope but spot-checked incidentally: the `multisyllabic-words` Skill-id reuse across 3 Core pages is worth a light look but is not evidence of cannibalization — each Grade Unit page still reads as distinctly grade/pattern-specific). The graph remains coherent: Core establishes concept authority, HFW establishes retrieval authority for the frozen frequency inventory, Themed broadens practice without diluting focus. Nothing in this pass suggests reopening the frozen architecture.

---

## J. Content-sufficiency assessment

**If the practice interface were ignored, would the written page still provide meaningful educational value?**

- **Core:** Yes, unambiguously, across all 51 pages — the rationale and practice-guidance prose is substantive and specific enough to function as a standalone teaching note, independent of the interactive tool.
- **HFW:** Yes, unambiguously, across all 27 pages — the set-level cross-word analysis (e.g., the *even*/*ever*, *ought*/*aught*, *effect*/*affect* contrasts) is genuine original content that a parent or teacher gets nowhere else.
- **Themed:** Yes for 24 of 27 pages. For the 3 pages containing a factual error (Section L), the *page* still has value, but a specific *sentence* within it is actively wrong, which is worse than merely thin.

**When the practice experience is included, does the page offer a premium overall resource?** Yes, for 102 of 105 pages, without qualification. For the 3 flagged pages, the practice tool and word list remain fully usable and correct (the errors are confined to prose describing spelling patterns, not to the underlying `words[]` data used by the practice tool itself) — so the interactive experience is unaffected, but the written page currently teaches something false alongside it.

**No page in the 105-page corpus was classified as "too thin."** This finding is unchanged from the previous audit and reconfirmed by this full-corpus pass.

---

## K. Information-gain / formulaic-writing assessment

This is the most significant systemic (non-factual) finding of this audit. All three batch reads independently converged on the same underlying phenomenon from different angles, which increases confidence this is real and corpus-wide rather than an artifact of any one reviewer's framing.

**HFW (27/27 pages):** No literal sentence is duplicated verbatim across sets, and every description/shortAnswer passes the swap test. But a fixed *rhetorical scaffolding* recurs: a two-heading, two-paragraph shape on every single page; a "handoff to notes" closing sentence with swapped lexical filler ("deserves special/focused attention" / "less expected" / "isolate the part... rather than treating [X] as unpredictable") in some recognizable form on nearly all 27 pages; "written chunks"/"written syllables" as a recurring structural metaphor, especially dense in Grades 3–5; and "The words X and Y..." as a stock second-paragraph opener on 10+ of 27 pages.

**Core K–2 (33/33 pages):** the "normal [sound-based/developmental] attempt" sentence template recurs near-verbatim across at least 12 pages ("Writing *duk* for *duck* is a normal sound-based attempt: the child heard /k/ but has not yet applied..."); the practice-session opening instruction ("Say a word without showing it...stretch...write...check") is templated across nearly all K/Grade 1 pages; "with growing independence" appears as the corpus's stock qualitative-evidence phrase 10+ times; and — a genuinely new and more concerning observation — **all 33 K–2 pages carry exactly 3 `readinessSignals` bullets with no exception**, and **11 of the 13 Grade 2 pages carry exactly 4 FAQ items** (vs. 0–2 for nearly every K/Grade 1 page), a suspiciously round, uniform count that reads as a quota rather than organic per-page judgment, even though the FAQ content itself was checked and found genuinely non-redundant in every instance.

**Core Grade 3–5 (18/18 pages):** the "Move on when your child can..." skeleton, the "compare with the model/known word and repair only the uncertain part" diagnostic instruction, and "mix the groups/words/families" as the second-to-last practice step recur on effectively all 18 pages regardless of the pattern being taught.

**Themed Grade 3–5 (12/12 recently-touched pages):** the newest and clearest instance — 6 of 12 openers closely match the literal template "[Topic] words become relevant/Students meet/use... when they read/write/discuss/explain...", the other 6 are shape-variants of the same underlying pattern, and the openers overlap substantially with the unedited `description` field on the same page in 9 of 12 cases (Section B, E).

**Verdict on this dimension:** the corpus reads as **intentionally edited, not mass-generated** — there is no evidence of copy-paste duplication, no fabricated content, and the specific linguistic claims within each template slot are accurate and genuinely inventory-specific. But the *scaffolding itself* — sentence shapes, paragraph architecture, transition phrases, and (in Grade 2 Core) exact structural counts — is uniform enough across 90 of 105 pages to read as produced from a small number of shared authoring templates applied repeatedly, which is a real, fair "formulaic" finding distinct from and less severe than fabrication. This is an IMPORTANT-tier finding, not a BLOCKER: it affects premium-feel and corpus-wide freshness, not correctness or trust.

**Strongest counter-examples worth modeling more broadly:** `grade-4-high-frequency-words-set-1.md`'s set-level prose contains explicit, non-formulaic editorial reasoning ("these are useful endings here, but the beginnings are best secured as written syllables... rather than forced into smaller meaningful parts") that sounds like a specific editorial judgment rather than a template being filled in — this is the single best model of "sounds like a human decided this" in the entire 105-page corpus and is worth studying as a target register for a future voice pass.

---

## L. Page-level findings

Findings requiring attention, in severity order. (102 of 105 pages required no findings and are not listed individually — see Sections C–K for full-corpus confirmation that they were, in fact, read and checked.)

| # | Page | Strand | Grade | Severity | Problem | Why it matters | Recommended correction |
|---|---|---|---|---|---|---|---|
| 1 | `src/content/spelling-lists/grade-level/3rd-grade-time-words.md` | Themed | 3 | **BLOCKER** | Both the `shortAnswer` frontmatter ("groups digital and analog by their final al") and the body ("*Digital* and *analog* each have three syllables and end with the stable written ending *al*: *dig-i-tal* and *an-a-log*") claim `analog` ends in "-al." It ends in "-og" — the word's own syllabification shown in the same sentence (*an-a-log*) contradicts the claim. | This is a factual spelling error, stated twice on one page (once in metadata, once in body), on a site whose product is teaching correct spelling. | Correct both instances: only `digital` ends in "-al" (dig-i-**tal**); `analog` ends in "-og." Either drop the shared-ending claim for `analog` or reframe the observation around what the two words actually share (both are two-part compound-ish tech/description words with a stable final chunk that must simply be checked individually). |
| 2 | `src/content/spelling-lists/grade-level/4th-grade-geometry-words.md` | Themed | 4 | **BLOCKER** | Body claims: "*quad-ri-lat-er-al* and *per-pen-dic-u-lar*. Both end with *al*." `perpendicular` ends in "-ar" (per-pen-dic-u-l**ar**), not "-al" — again visibly contradicted by the syllabification given in the same sentence. | Same category of error as #1 — a stated-and-immediately-self-contradicted spelling fact. | Correct to note that only `quadrilateral` ends in "-al"; `perpendicular` ends in "-ar." Reframe the comparison (e.g., both are five-syllable words that must be held in full rather than guessed from the ending). |
| 3 | `src/content/spelling-lists/grade-level/5th-grade-money-management-words.md` | Themed | 5 | **BLOCKER** | Body claims: "*Expense* and *balance* share the final spelling *nce*." `expense` ends in "-nse" (e-x-p-e-n-s-**e**); only `balance` ends in "-nce" (matching its own word-note text, which correctly says "the larger written chunk *ance*"). | Same category — the page's own word note elsewhere on the same file correctly identifies balance's real ending, making this a page that is internally inconsistent as well as factually wrong. | Correct the claim; the two words do not share a final spelling. Reframe around what's actually true (e.g., both use "n" immediately before a soft-c/s cluster, which is the genuinely useful shared observation). |
| 4 | `src/content/spelling-lists/grade-level/3rd-grade-map-globe-words.md` | Themed | 3 | **IMPORTANT** | New opener sentence (added by the most recent commit) contains "the spelling work **below** helps students hold their longer and less predictable letter sequences in memory" — a direct, literal violation of the standard's own presentation-independence rule (§12), which explicitly names "below" as exactly the kind of phrase to avoid. | Content must survive a completely different renderer per the site's own stated redesign plan; "below" assumes a specific current layout. | Remove "below"; state the observation without a positional reference (e.g., "...helps students hold their longer and less predictable letter sequences in memory" with no "the spelling work below" framing at all — the sentence works fine without it). |
| 5 | 9 of the 12 recently-touched Themed pages (`3rd-grade-life-cycle-words`, `3rd-grade-multiplication-division-words`, `3rd-grade-time-words`, `4th-grade-career-occupation-words`, `4th-grade-measurement-words`, `4th-grade-solar-system-words`, `5th-grade-community-civics-words`, `5th-grade-ecosystem-environment-words`, `5th-grade-fraction-decimal-words`, `5th-grade-money-management-words`) | Themed | 3–5 | **IMPORTANT** | The new body opener substantially restates the existing `description` frontmatter field's claim in different words on the same page (worst case: `4th-grade-measurement-words.md`, where both fields literally begin with the identical clause "Measurement words appear..."). | Redundant "why this matters" content on one page undercuts both the SEO/AEO self-containment goal and the human-voice goal the fix was meant to achieve — a reader (or answer engine) encounters the same claim twice, worded differently, which reads as padding rather than intentional emphasis. | Either fold the two into one sentence (keep whichever is more specific/less templated) and delete the redundant field, or deliberately differentiate their jobs (e.g., `description` stays a plain factual summary for meta/SEO use, body opener does something the description structurally can't — but as currently written, they do the same job twice). |
| 6 | All 18 Grade 3–5 Core Spelling Grade Unit pages | Core | 3–5 | **IMPORTANT** | Zero of 18 pages contain a reassurance/warmth sentence in the practice-closing guidance, confirmed via verbatim quotation of every closing sentence. | This is the corpus's most consistent, most clearly-scoped, and (per the project's own roadmap) most explicitly acknowledged-but-unaddressed voice gap. | A short, targeted warmth pass on exactly these 18 pages' practice-closing sections — not a rewrite, one added sentence each, matching the register already proven to work on the 20 K/Grade-1 Core pages that already do this well. |
| 7 | `4th-grade-solar-system-words.md`, `5th-grade-ecosystem-environment-words.md`, `5th-grade-fraction-decimal-words.md`, `5th-grade-community-civics-words.md` (and the broader 12-page group) | Themed | 3–5 | **IMPORTANT** (cross-reference to K, item 5 above; listed separately here because it is also the direct evidence for the "formulaic template" finding, Section K) | The new openers collectively form a tight, recognizable cross-page template ("[Topic] words become relevant/Students meet/use... when they read/write/discuss/explain..."; 6 of 12 match closely, the other 6 are shape-variants). | The specific problem the fix was meant to solve (genericness/interchangeability) is only partially solved — the new sentences are more inventory-specific in their *content* but not in their *shape*, so a reader encountering several of these pages in sequence will notice the pattern. | No rewrite needed for accuracy — this is a voice/variety concern, lower urgency than items 1–4. If another editorial pass touches these pages anyway (e.g., to fix item 5's redundancy), vary the opening construction page to page rather than reusing the same "[group] [verb] when [context]" shape each time. |
| 8 | `grade-1-open-syllables-final-y.md` | Core | 1 | **MINOR** | `skillIds: ["multisyllabic-words"]` — this page teaches single-syllable open syllables and final-y, not multisyllabic word structure; the Skill link's topical fit is the weakest of three pages sharing this id. | A reader following "Go deeper on the pattern" from this page would land on a Skill page about a different (though related) concept than what this page teaches. | Verify whether a more specific Skill page exists or should exist for open syllables/final-y; if not, this may be an acceptable stretch link, but it's worth a deliberate look rather than leaving it as an apparent side effect of reusing a generic id. |
| 9 | `4th-grade-commonly-confused-words.md` | Core | 4 | **MINOR** | One FAQ ("How can a teacher tell whether a student is ready for this page?") functionally overlaps with the entry-readiness bullets it sits beside. | Minor redundancy within one page; not a fabricated-FAQ problem, just a slightly duplicated one. | Either remove the FAQ (its content is already covered by the readiness bullets) or sharpen it to answer something the bullets genuinely don't. |
| 10 | `4th-grade-derived-words.md` | Core | 4 | **MINOR** | FAQ answer to "What comes after this list?" is vague ("Fifth-grade reading and writing words are the natural next step") rather than naming the actual next unit. | Slightly imprecise forward-reference; low stakes since Core navigation is driven by the renderer/sequence data, not this FAQ text. | Name the actual next unit, or remove the question if it can't be answered precisely. |
| 11 | `2nd-grade-compound-words.md` | Core | 2 | **OBSERVATION** | `id: grade-2-list-02` doesn't match the descriptive-id convention used by every sibling page. | Cosmetic internal-naming inconsistency; no functional impact found. | Note for a future ID-hygiene pass; not urgent. |
| 12 | `docs/content/inventory/high-frequency-words.md` | Documentation (not a production page) | N/A | **MINOR** | Still states "the other 26 member sets remain pending editorial transformation," contradicting the roadmap's own banner and actual file contents. | Misleads anyone consulting this specific tracking file about real corpus status; same pattern as the previously-flagged roadmap staleness. | Sync this file's editorial-status line with the actual state (all 27 sets complete). |
| 13 | `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md` §14 | Documentation (not a production page) | N/A | **MINOR** | Phase 2 / HFW summary rows still show pre-completion numbers, unchanged since the previous audit despite the underlying work being done and merged. | Same as above — an internal tracking document that undersells actual progress, risking wasted future effort re-deriving what's already known. | Update §14's numbers to reflect actual completion; also remove the two dead references to deleted inventory files in the "Companion inventory files" list. |

---

## M. Pages sampled in depth

All 105 primary-corpus pages were read in full (not metadata-only) across four parallel, independently-conducted batch passes: all 27 High-Frequency Word sets; all 27 Themed Spelling Practice pages; all 33 Core Grade Unit pages for Kindergarten through Grade 2; and all 18 Core Grade Unit pages for Grades 3–5. Each pass was instructed to quote verbatim rather than paraphrase for every safety-relevant claim (word counts, closing move-on sentences, orthographic assertions), and this report's author independently re-verified — by direct file inspection, not by trusting the batch reports — every claim serious enough to affect the executive verdict: the three factual errors (Section L, items 1–3), the renderer-dependent phrase (item 4), the c2623c8 commit's exact diff scope and content, the corpus-wide structural invariants (Section C), and the current state of the two flagged documentation files.

Pages that received the closest individual scrutiny, beyond the full-corpus pass: `grade-1-weather-words.md` (the standards' own canonical reference implementation for Themed), `kindergarten-high-frequency-words-set-1.md` (canonical reference for HFW), all 12 Themed pages touched by the most recent commit (`c2623c8`), all 18 Grade 3–5 Core pages (for the warmth-pass question specifically), and the three pages found to contain factual errors.

---

## N. Technical integrity

- **Counts:** 105 canonical deepest pages (51 + 27 + 27), independently verified — see Section C.
- **Content roles:** `grade-unit` (51), `high-frequency-word-set` (27), `vocabulary-theme` (27), `skill` (42, out of this audit's primary scope), plus 6 blank-role files that are all correctly `status: archived` legacy content, not live.
- **Routes/IDs/slugs:** 153 unique `id` values, 153 unique `urlSlug` values across the full content collection; zero duplicates.
- **Grade ownership:** matches the frozen curriculum tables exactly for both HFW and Themed (Section C).
- **Duplicate frontmatter / conflict-marker state:** clean — no Git conflict markers (`<<<<<<<`/`=======`/`>>>>>>>`) found anywhere in `src/content/` or `docs/content/`.
- **Obsolete taxonomy:** none found in a targeted sweep of all 27 HFW pages for "sight word(s)," "Sight Word," "common word(s)," "heart word," "Heart part:," "Dolch," "Fry" — zero occurrences.
- **Suspicious post-merge artifacts:** none found. The most recent merge (`ec99d80`, PR #266) is a clean fast-forward-style merge of a single feature branch with no conflict resolution artifacts, and its diff was read in full — it touches exactly 13 files as documented, no unexpected collateral changes.
- **Word-list length invariant:** exactly 3 documented exceptions (18 words each, Grade 3 Core only), matching the standard's own stated exception language; no undocumented overage found anywhere in the 51-page Core corpus.

No technical-integrity finding beyond what's already captured in Sections C and L.

---

## O. Presentation-independent readiness

With one exception, the written content of all 105 pages would survive a complete visual redesign without rewriting — no page (beyond the one flagged instance) references "the box," "the card," "the column," a color, a screen position, or scrolling behavior. The one confirmed violation is `3rd-grade-map-globe-words.md`'s new "the spelling work below" phrase (Section L, item 4), introduced by the most recent commit. A neighboring page touched by the same commit (`4th-grade-geometry-words.md`, "without turning the page into a math lesson") uses "the page" in a way that reads as a self-referential figure of speech about the content itself rather than a literal UI pointer — defensible, but close enough to the boundary that a future editor should have final judgment on whether to reword it.

**Verdict: presentation-independence holds for 104 of 105 pages as written; one confirmed fix needed before this claim can be made without qualification.**

---

## P. What NOT to change

To avoid endless polishing, these should be left alone:

- The three-strand architecture and every frozen curriculum, taxonomy, route, and ID — nothing in this audit rises to the bar for reopening any of it.
- The HFW strand's zero-FAQ convention and selective-note discipline — both hold cleanly across all 27 pages and should not be "fixed" by adding content.
- The Kindergarten and Grade 1 Core warmth model — it works, is not templated in a harmful way (the sentence *shape* repeats, but the specific content genuinely varies page to page), and should be the register Grade 3–5 is brought up to, not replaced.
- The `masteryThreshold: 90` frontmatter field's uniformity — it never surfaces in visible prose anywhere in the 105-page sample, so its uniform value is a non-issue, not a content defect.
- The Grade 2 Core FAQ content itself — despite the suspicious *count* uniformity (11/13 pages at exactly 4), every individual FAQ answer checked out as genuinely non-redundant; don't strip FAQs just because the count pattern looks templated.
- The deferred grade-terminology migration and the deferred HFW/Themed gateway work — both are already correctly scoped as separate, later tasks and this audit found nothing that changes that.
- The governance-cleanup commit's metadata and standard-document fixes (items already resolved in Section B) — no further action needed there.

---

## Q. Exact pre-freeze worklist

**Must fix (blocks freeze):**
1. Correct the `analog` "-al" ending error in `3rd-grade-time-words.md` (frontmatter `shortAnswer` and body).
2. Correct the `perpendicular` "-al" ending error in `4th-grade-geometry-words.md` (body).
3. Correct the `expense`/`balance` "shared -nce ending" error in `5th-grade-money-management-words.md` (body).
4. Remove the "below" renderer-dependent phrase in `3rd-grade-map-globe-words.md`.

**Should fix (strongly recommended before freeze, not individually blocking):**
5. Resolve the description/opener redundancy on the 9 Themed pages listed in Section L, item 5 (pick one job per field, or merge).
6. Either complete a genuine warmth pass on the 18 Grade 3–5 Core pages' practice-closing sections, or make an explicit, documented decision to descope this and update the roadmap to say so rather than leaving it permanently "pending."
7. Sync `docs/content/inventory/high-frequency-words.md` and `CONTENT_IMPROVEMENT_ROADMAP.md` §14 with actual corpus status; remove the two dead inventory-file references.

**Optional / defer:**
8. Vary the sentence-shape of the 12 Themed openers so they don't read as a single template applied 12 times (Section L, item 7) — a polish item, not a correctness item.
9. Look at the `multisyllabic-words` Skill-link fit on `grade-1-open-syllables-final-y.md`.
10. Tighten the two minor FAQ issues (`4th-grade-commonly-confused-words.md`, `4th-grade-derived-words.md`).
11. `2nd-grade-compound-words.md` id-naming cosmetic fix.

Items 1–4 are small, mechanical, single-sentence corrections — realistically under an hour of focused work, not a new authoring phase. Item 6 is the only item on this list with meaningful scope (up to 18 short additions), and even that is bounded and precisely specified by the K/Grade-1 pages that already demonstrate the target register.

---

## R. Final recommendation

**Not yet.** I would not be comfortable declaring the written-content layer of all 105 canonical deepest pages complete and frozen in its current state, because three of those pages currently teach an incorrect spelling fact, and a fourth contains content that won't survive the stated redesign plan without editing anyway. Freezing now would mean shipping known, specific, easily-fixable errors on a spelling-instruction site — precisely the trust risk this audit exists to catch before freeze rather than after.

**But the gap is narrow, and I would be comfortable recommending freeze immediately after the 4 "must fix" items above are corrected and directly re-verified** (a second reviewer or a second pass re-reading just those 4 files, not a re-audit of the corpus). The "should fix" items are real and worth doing in the same pass since the files are already open, but none of them individually would keep me from recommending freeze if time pressure forced a choice — except item 6 (the Core warmth pass), which the project's own roadmap has now twice stated is pending and which this audit twice confirms is still fully outstanding. If the site owner's actual intent is to freeze without ever completing that pass, that's a legitimate call to make — but it should be an explicit decision recorded in the roadmap, not an item that silently stays "pending" through two consecutive audits.
