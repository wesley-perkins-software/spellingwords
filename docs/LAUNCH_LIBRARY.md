# LAUNCH_LIBRARY.md

**What lists does spellingwords.app ship on day one?**

This document answers that question. It is a pre-authoring decision record, not a content file. No word lists are created here. The goal is to commit to a specific library shape before a single list is written or rebuilt.

---

## 1. Why Launch Small Instead of Large

A thin, high-quality library is better than a large, uneven one.

Every list that ships must be defensible on its own terms: the words are well-chosen, the rationale is clear, and the authoring meets the standards in `CONTENT_STANDARDS.md`. A list that fails that bar should not exist yet — not even as a stub.

There are three risks to launching large:

**Quality collapse.** Padding a family to hit a number forces word choices that are arbitrary or underpowered. The CONTENT_STANDARDS.md prohibition on "random word lists" exists precisely because it's easy to generate volume and hard to generate coherence.

**Chain breakage.** Lists in the phonics and sight-word families depend on sequencing (`prerequisiteLists`, `nextLists`). A half-authored chain misleads users about what comes next and silently breaks the "Continue Learning" flow designed in `CONTENT_ARCHITECTURE.md`.

**Perception of breadth masking depth.** Forty thin lists look like a resource. Twenty-eight solid lists *are* a resource. The editorial bar is what makes this app credible to parents and teachers; volume does not.

The target launch size is **32–36 lists**, distributed across four families. That is enough to demonstrate real structure in every family. It is not so many that authoring quality degrades.

---

## 2. Why Existing Lists May Be Replaced

The existing lists were scaffolded before the full word-universe, sentence-bank standards, and schema were finalized. Several may need to be rebuilt from scratch rather than patched.

Reasons to replace rather than patch:

- **Schema gaps.** Fields added in `CONTENT_ARCHITECTURE.md` — `id`, `order`, `prerequisiteLists`, `nextLists`, `achievementGroup`, `masteryThreshold` — may not be backfilled correctly on older lists.
- **Word-choice drift.** Some words may predate the inclusion/exclusion rules in `CONTENT_STANDARDS.md` or the grade-band assignments in `WORD_CATALOG.md`.
- **Sentence-bank mismatches.** Example sentences may not satisfy the 8–15 word target, may use advanced vocabulary in the sentence itself, or may violate the heteronym policy defined in `SENTENCE_BANK.md`.
- **Structural incoherence.** A list authored before the phonics progression was designed in `PHONICS_STRATEGY.md` may not fit cleanly into Phase 1's sequence.

The clean path is to use existing lists as reference material while rebuilding each one against the current specification. The `LIST_SPECIFICATIONS.md` template must be completed for every list before authoring begins.

Deletion is not a loss if the replacement is better.

---

## 3. Recommended Launch Size

**Target: 32 lists. Ceiling: 36.**

The lower bound of 32 is achievable without padding. The ceiling of 36 allows for up to four additional lists if a grade or phonics slot turns out to warrant them after authoring begins — but those slots must earn their place, not be filled speculatively.

Distribution across families is described in sections 4–7 below.

---

## 4. Grade-Level Family

**Target: 16 lists**

The product claims to serve K–5. All six grade levels must be represented at launch. A library with no Grade 4 or Grade 5 content signals an unfinished product, even if the grade-level strategy document recommends thinner coverage for upper grades.

The organizing principle for grade-level lists is **word purpose and classroom usefulness**, not phonics alignment or part-of-speech category. See `GRADE_LEVEL_STRATEGY.md` for the full rationale.

Recommended list size per list: 12–15 words. Lists in the 10–12 range are acceptable for Kindergarten where word density is lower.

| Grade | Lists | Notes |
|---|---|---|
| Kindergarten | 3 | Core everyday words; firm cap of 10–12 words per list |
| Grade 1 | 3 | Common words from early readers |
| Grade 2 | 4 | Deepest coverage at launch; includes contractions and long-vowel words |
| Grade 3 | 3 | Solid entry point; signals the family continues upward |
| Grade 4 | 2 | e.g. "4th Grade Reading & Writing Words", "4th Grade Everyday Words" |
| Grade 5 | 1 | e.g. "5th Grade Reading & Writing Words"; minimal but present |
| **Total** | **16** | |

Grades 4 and 5 carry thinner coverage by design, not by neglect. The word bank for upper grades is less mature. Two Grade 4 lists and one Grade 5 list are enough to signal that the ladder goes all the way up, without overstating what the library currently supports.

If a Grade 5 list cannot be authored to standard before launch, it should be marked `status: draft` and excluded from the public library — not shipped as an underpowered placeholder.

---

## 5. Phonics Family

**Target: 8 lists (Phase 1 only)**

Phase 1 of the phonics progression, as defined in `PHONICS_STRATEGY.md`, covers the foundational patterns that a child encounters in K–2 instruction:

| Pattern | List |
|---|---|
| Short vowels (CVC) | 1 |
| Silent E — long A | 1 |
| Silent E — long I | 1 |
| Silent E — long O | 1 |
| Vowel teams ai / ay | 1 |
| Vowel teams ee / ea | 1 |
| Vowel teams oa / ow | 1 |
| R-controlled ar | 1 |
| **Total** | **8** |

Phase 2 — digraphs, consonant blends, remaining r-controlled vowels (er/ir/ur, or), diphthongs — is **not launched**. Adding Phase 2 patterns before Phase 1 is complete and sequenced correctly would break the chain and mislead teachers who use the phonics family for structured intervention.

The short-vowel CVC slot is listed as a single list above, but whether it ships as one combined list or five separate lists (short-a, short-e, short-i, short-o, short-u) is an open question. See section 10.

All phonics lists must follow the sequence metadata design (`prerequisiteLists`, `nextLists`) so the progression is navigable, not just browsable.

---

## 6. Sight Words

**Target: 6 lists**

The Dolch word list is the established canonical source for high-frequency sight words in K–3 instruction. It ships in full at launch. The Fry word list is **not added** at launch.

| List | Source |
|---|---|
| Dolch Pre-Primer | Canonical Dolch |
| Dolch Primer | Canonical Dolch |
| Dolch First Grade | Canonical Dolch |
| Dolch Second Grade | Canonical Dolch |
| Dolch Third Grade | Canonical Dolch |
| Dolch Nouns | Canonical Dolch |
| **Total** | **6** |

The Dolch ladder must be complete before any expansion. Adding Fry words before the Dolch lists are fully authored, sequenced, and linked creates a disjointed sight-word experience. The `FRY_AUDIT.md` exists for future reference; it does not authorize launch inclusion.

---

## 7. Challenge Family

**Target: 2 lists**

Challenge lists serve a different audience: older students, advanced spellers, and curious learners who want etymology and harder patterns. The editorial bar is highest here (`masteryThreshold: 100%` per `CONTENT_ARCHITECTURE.md`, etymology hints recommended).

Two lists at launch:

- **Challenge Tier 1** — Roots and patterns, accessible for strong Grade 4–5 spellers
- **Challenge Tier 2** — Greek and Latin roots, appropriate for Grade 5 and above

More than two challenge lists at launch risks diluting what makes the family feel curated and special. Add lists here only when there is a clear, defensible rationale that does not duplicate an existing list.

---

## 8. Which Categories Intentionally Wait

The following families are **not launched** and should not be stubbed, previewed, or partially seeded:

**Theme lists.** Theme-based lists (animal words, community words, seasons, holidays) require an editorial rationale per list that has not been designed yet. Launching theme lists before a theme strategy document exists invites the scope creep and "random word list" failure mode named in `CONTENT_STANDARDS.md`. Zero theme lists at launch.

**Seasonal lists.** Explicitly excluded by multiple architecture documents. Seasonal content is low-value, creates maintenance pressure, and does not serve the app's core use case of year-round curriculum-aligned practice.

**Fry sight words.** Deferred until the full Dolch ladder is authored, stable, and linked. Adding a competing sight-word system before the primary one is complete creates confusion for parents and teachers.

**Phonics Phase 2.** Digraphs, consonant blends, diphthongs, and remaining r-controlled vowels are not launched until Phase 1 is complete and sequenced. A broken chain is worse than a shorter chain.

**Morphology.** Prefix/suffix patterns, soft C/G, and advanced spelling conventions may eventually form their own family. That family has no strategy document yet and is not launched.

**Grade 4–5 depth.** Two Grade 4 lists and one Grade 5 list launch. Additional upper-grade lists are deferred until the word bank matures and authoring quality can be guaranteed.

---

## 9. Approximate Total List Count

| Family | Lists |
|---|---|
| Grade-Level | 16 |
| Phonics | 8 |
| Sight Words | 6 |
| Challenge | 2 |
| Theme / Seasonal | 0 |
| **Total** | **32** |

The ceiling is 36. Four additional slots are available if authoring reveals that a grade or phonics pattern warrants another list — but those lists must be earned, not scheduled.

The floor is 28. If authoring quality cannot be sustained at 32, it is better to launch with 28 solid lists than 32 lists of uneven quality.

---

## 10. Open Questions

These decisions are not resolved. They should be answered before authoring begins on the affected lists, not during or after.

**Short vowels: one list or five?**
The Phase 1 phonics slot shows one short-vowel CVC list. Should it ship as a single combined list (all five vowels), or as five separate lists (short-a, short-e, short-i, short-o, short-u)? Five lists give the phonics family more navigability and allow teachers to target a specific vowel. One list is simpler and avoids thin lists if a vowel has fewer strong CVC examples. See `PHONICS_STRATEGY.md` for the tradeoff.

**Kindergarten list size: 10–12 or up to 15?**
`GRADE_LEVEL_STRATEGY.md` suggests capping Kindergarten lists at 10–12 words given attention span and word density constraints. Is 15 words ever acceptable for K, or is 12 the hard ceiling?

**Grade 5: launch or mark draft?**
One Grade 5 list is in the plan. If the word bank for Grade 5 is not mature enough to author a defensible list before launch, should it ship as `status: draft` (hidden from public library) or be deferred entirely and represented by a "coming soon" signal in the UI?

**Grade 3 depth: 2 or 3 lists?**
The plan shows 3 Grade 3 lists. If authoring time is constrained, 2 Grade 3 lists is an acceptable reduction (saving one slot for a stronger Grade 4 second list). Which tradeoff is preferred?

**Phonics grade metadata: useful or misleading?**
Phonics lists approximate a grade level (e.g., Silent E ≈ Grade 1–2). Should that grade metadata appear on phonics list pages? A struggling Grade 3 student may be practicing Grade 1 phonics, and displaying "Grade 1" on a phonics list may feel stigmatizing. Alternatively, removing grade metadata from phonics lists makes them harder for teachers to place.

**Challenge list word count: 10–15 or fewer?**
Challenge lists have a 100% mastery threshold and high editorial expectations. Should word count be held to the standard 12–15, or does the difficulty of challenge words justify a shorter list (8–10 words) to keep sessions achievable?

**When does the theme family get a strategy document?**
Theme lists are deferred, but they will eventually be requested by users. Is there a milestone or list count at which theme strategy planning begins? Or is it triggered by a specific content need?

---

*This document represents pre-authoring decisions made before implementation begins. It should be revisited if authoring reveals that a recommended list count is unachievable at the required quality level. Quantity targets are ceilings, not quotas.*
