# Legacy Architecture Removal — Deletion Manifest

This is the complete, reviewable manifest of every `spelling-lists` content file deleted by the legacy-architecture-removal PR. It is a historical record — the deleted content itself is not preserved anywhere in the active repository; git history is the record of what these pages contained.

**Verification method:** computed directly from the live `spelling-lists` collection and the live `CANONICAL_GRADE_ROUTE_DEFS`/`CANONICAL_SKILL_ROUTE_DEFS` manifests at the time of this PR — not from prior planning docs (which are themselves deleted by this PR). 249 published entries − 145 canonical ids (104 grade + 41 skill) = 104 non-canonical published entries, all accounted for below, plus 12 `spelling-collections` files (not part of the `spelling-lists` collection, deleted alongside it — 6 Dolch collections + 6 High-Frequency Words gateway collections, the latter already excluded from static generation).

After this PR, `getCollection('spelling-lists')`'s published ids equal exactly the union of the two canonical manifests — enforced by `src/lib/content/retainedSpellingListPages.test.ts`.

## Disposition 1 — Deleted outright (71 pages)

No unique content worth preserving: Dolch high-frequency-word member sets, standalone Heart Word pages, orphaned single-pattern "focused child" phonics pages, and grade-1 practice/review pages duplicating live Grade Unit content.

| id | title | source file |
|---|---|---|
| `bl-blend-words` | BL Blend Words | `src/content/spelling-lists/phonics/bl-blend-words.md` |
| `br-blend-words` | BR Blend Words | `src/content/spelling-lists/phonics/br-blend-words.md` |
| `c-k-ck-words` | C, K, and CK Words | `src/content/spelling-lists/phonics/c-k-ck-words.md` |
| `cl-blend-words` | CL Blend Words | `src/content/spelling-lists/phonics/cl-blend-words.md` |
| `cr-blend-words` | CR Blend Words | `src/content/spelling-lists/phonics/cr-blend-words.md` |
| `dolch-first-grade-a` | Dolch First Grade High-Frequency Words — Part A | `src/content/spelling-lists/high-frequency-words/dolch-first-grade-a.md` |
| `dolch-first-grade-b` | Dolch First Grade High-Frequency Words — Part B | `src/content/spelling-lists/high-frequency-words/dolch-first-grade-b.md` |
| `dolch-first-grade-c` | Dolch First Grade High-Frequency Words — Part C | `src/content/spelling-lists/high-frequency-words/dolch-first-grade-c.md` |
| `dolch-nouns-a` | Dolch Noun Words — Part A | `src/content/spelling-lists/high-frequency-words/dolch-nouns-a.md` |
| `dolch-nouns-b` | Dolch Noun Words — Part B | `src/content/spelling-lists/high-frequency-words/dolch-nouns-b.md` |
| `dolch-nouns-c` | Dolch Noun Words — Part C | `src/content/spelling-lists/high-frequency-words/dolch-nouns-c.md` |
| `dolch-nouns-d` | Dolch Noun Words — Part D | `src/content/spelling-lists/high-frequency-words/dolch-nouns-d.md` |
| `dolch-nouns-e` | Dolch Noun Words — Part E | `src/content/spelling-lists/high-frequency-words/dolch-nouns-e.md` |
| `dolch-nouns-f` | Dolch Noun Words — Part F | `src/content/spelling-lists/high-frequency-words/dolch-nouns-f.md` |
| `dolch-nouns-g` | Dolch Noun Words — Part G | `src/content/spelling-lists/high-frequency-words/dolch-nouns-g.md` |
| `dolch-pre-primer-a` | Dolch Pre-Primer High-Frequency Words — Part A | `src/content/spelling-lists/high-frequency-words/dolch-pre-primer-a.md` |
| `dolch-pre-primer-b` | Dolch Pre-Primer High-Frequency Words — Part B | `src/content/spelling-lists/high-frequency-words/dolch-pre-primer-b.md` |
| `dolch-pre-primer-c` | Dolch Pre-Primer High-Frequency Words — Part C | `src/content/spelling-lists/high-frequency-words/dolch-pre-primer-c.md` |
| `dolch-primer-a` | Dolch Primer High-Frequency Words — Part A | `src/content/spelling-lists/high-frequency-words/dolch-primer-a.md` |
| `dolch-primer-b` | Dolch Primer High-Frequency Words — Part B | `src/content/spelling-lists/high-frequency-words/dolch-primer-b.md` |
| `dolch-primer-c` | Dolch Primer High-Frequency Words — Part C | `src/content/spelling-lists/high-frequency-words/dolch-primer-c.md` |
| `dolch-primer-d` | Dolch Primer High-Frequency Words — Part D | `src/content/spelling-lists/high-frequency-words/dolch-primer-d.md` |
| `dolch-second-grade-a` | Dolch Second Grade High-Frequency Words — Part A | `src/content/spelling-lists/high-frequency-words/dolch-second-grade-a.md` |
| `dolch-second-grade-b` | Dolch Second Grade High-Frequency Words — Part B | `src/content/spelling-lists/high-frequency-words/dolch-second-grade-b.md` |
| `dolch-second-grade-c` | Dolch Second Grade High-Frequency Words — Part C | `src/content/spelling-lists/high-frequency-words/dolch-second-grade-c.md` |
| `dolch-second-grade-d` | Dolch Second Grade High-Frequency Words — Part D | `src/content/spelling-lists/high-frequency-words/dolch-second-grade-d.md` |
| `dolch-third-grade-a` | Dolch Third Grade High-Frequency Words — Part A | `src/content/spelling-lists/high-frequency-words/dolch-third-grade-a.md` |
| `dolch-third-grade-b` | Dolch Third Grade High-Frequency Words — Part B | `src/content/spelling-lists/high-frequency-words/dolch-third-grade-b.md` |
| `dolch-third-grade-c` | Dolch Third Grade High-Frequency Words — Part C | `src/content/spelling-lists/high-frequency-words/dolch-third-grade-c.md` |
| `dr-blend-words` | DR Blend Words | `src/content/spelling-lists/phonics/dr-blend-words.md` |
| `fl-blend-words` | FL Blend Words | `src/content/spelling-lists/phonics/fl-blend-words.md` |
| `fr-blend-words` | FR Blend Words | `src/content/spelling-lists/phonics/fr-blend-words.md` |
| `ft-final-blend-words` | FT Final Blend Words | `src/content/spelling-lists/phonics/ft-final-blend-words.md` |
| `gl-blend-words` | GL Blend Words | `src/content/spelling-lists/phonics/gl-blend-words.md` |
| `gr-blend-words` | GR Blend Words | `src/content/spelling-lists/phonics/gr-blend-words.md` |
| `grade-1-beginning-blend-practice` | Beginning Blend Practice | `src/content/spelling-lists/phonics/grade-1-beginning-blend-practice.md` |
| `grade-1-consonant-digraph-practice` | Consonant Digraph Practice | `src/content/spelling-lists/phonics/grade-1-consonant-digraph-practice.md` |
| `grade-1-ending-blend-practice` | Ending Blend Practice | `src/content/spelling-lists/phonics/grade-1-ending-blend-practice.md` |
| `grade-1-heart-word-practice` | Heart Word Practice | `src/content/spelling-lists/phonics/grade-1-heart-word-practice.md` |
| `grade-1-heart-words` | First Grade Heart Words | `src/content/spelling-lists/phonics/grade-1-heart-words.md` |
| `grade-1-heart-words-part-1` | First Grade Heart Words Part 1 | `src/content/spelling-lists/high-frequency-words/grade-1-heart-words-part-1.md` |
| `grade-1-heart-words-part-2` | First Grade Heart Words Part 2 | `src/content/spelling-lists/high-frequency-words/grade-1-heart-words-part-2.md` |
| `grade-1-heart-words-part-3` | First Grade Heart Words Part 3 | `src/content/spelling-lists/high-frequency-words/grade-1-heart-words-part-3.md` |
| `grade-1-r-controlled-vowel-practice` | R-Controlled Vowel Practice | `src/content/spelling-lists/phonics/grade-1-r-controlled-vowel-practice.md` |
| `grade-1-short-vowel-practice` | Short Vowel Practice | `src/content/spelling-lists/phonics/grade-1-short-vowel-practice.md` |
| `grade-1-silent-e-practice` | Silent E Practice | `src/content/spelling-lists/phonics/grade-1-silent-e-practice.md` |
| `grade-1-tch-dge-practice` | Final -tch and -dge Practice | `src/content/spelling-lists/phonics/grade-1-tch-dge-practice.md` |
| `grade-1-vowel-team-practice` | Vowel Team Practice | `src/content/spelling-lists/phonics/grade-1-vowel-team-practice.md` |
| `grade-2-list-01` | 2nd Grade Everyday Words | `src/content/spelling-lists/grade-level/2nd-grade-everyday-words.md` |
| `kindergarten-heart-words` | Kindergarten Heart Words | `src/content/spelling-lists/high-frequency-words/kindergarten-heart-words.md` |
| `kindergarten-number-color-words` | Kindergarten Number and Color Words | `src/content/spelling-lists/grade-level/kindergarten-number-color-words.md` |
| `ld-final-blend-words` | LD Final Blend Words | `src/content/spelling-lists/phonics/ld-final-blend-words.md` |
| `lk-final-blend-words` | LK Final Blend Words | `src/content/spelling-lists/phonics/lk-final-blend-words.md` |
| `lt-final-blend-words` | LT Final Blend Words | `src/content/spelling-lists/phonics/lt-final-blend-words.md` |
| `mp-final-blend-words` | MP Final Blend Words | `src/content/spelling-lists/phonics/mp-final-blend-words.md` |
| `nd-final-blend-words` | ND Final Blend Words | `src/content/spelling-lists/phonics/nd-final-blend-words.md` |
| `ng-final-blend-words` | NG Final Blend Words | `src/content/spelling-lists/phonics/ng-final-blend-words.md` |
| `nk-final-blend-words` | NK Final Blend Words | `src/content/spelling-lists/phonics/nk-final-blend-words.md` |
| `nt-final-blend-words` | NT Final Blend Words | `src/content/spelling-lists/phonics/nt-final-blend-words.md` |
| `pl-blend-words` | PL Blend Words | `src/content/spelling-lists/phonics/pl-blend-words.md` |
| `pr-blend-words` | PR Blend Words | `src/content/spelling-lists/phonics/pr-blend-words.md` |
| `sk-final-blend-words` | SK Final Blend Words | `src/content/spelling-lists/phonics/sk-final-blend-words.md` |
| `sl-blend-words` | SL Blend Words | `src/content/spelling-lists/phonics/sl-blend-words.md` |
| `sm-blend-words` | SM Blend Words | `src/content/spelling-lists/phonics/sm-blend-words.md` |
| `sn-blend-words` | SN Blend Words | `src/content/spelling-lists/phonics/sn-blend-words.md` |
| `sp-blend-words` | SP Blend Words | `src/content/spelling-lists/phonics/sp-blend-words.md` |
| `st-blend-words` | ST Blend Words | `src/content/spelling-lists/phonics/st-blend-words.md` |
| `st-final-blend-words` | ST Final Blend Words | `src/content/spelling-lists/phonics/st-final-blend-words.md` |
| `sw-blend-words` | SW Blend Words | `src/content/spelling-lists/phonics/sw-blend-words.md` |
| `tch-dge-ending-words` | TCH and DGE Ending Words | `src/content/spelling-lists/phonics/tch-dge-ending-words.md` |
| `tr-blend-words` | TR Blend Words | `src/content/spelling-lists/phonics/tr-blend-words.md` |


## Disposition 2 — Deleted, no content merged (9 pages)

A plausible canonical owner exists for each of these, but per explicit product direction this PR performs no content migration — these are deleted as-is. Two are the former "focused-component legacy-role exception" pages (`grade-4-final-stable-syllables`, `grade-5-spelling-rules`); their anchor pages' `relatedLists` entries pointing at them have been removed.

| id | title | source file |
|---|---|---|
| `grade-2-comparatives-er-est` | Comparative Words: ER and EST | `src/content/spelling-lists/grade-level/2nd-grade-comparatives-er-est.md` |
| `grade-2-homophones` | Homophones: To, Too, and Two | `src/content/spelling-lists/grade-level/2nd-grade-homophones.md` |
| `grade-2-prefixes-un-re` | Prefix Words: UN and RE | `src/content/spelling-lists/grade-level/2nd-grade-prefixes-un-re.md` |
| `grade-2-regular-plurals` | Regular Plural Words: Review | `src/content/spelling-lists/grade-level/2nd-grade-regular-plurals.md` |
| `grade-2-suffixes-ful-less` | Suffix Words: FUL and LESS | `src/content/spelling-lists/grade-level/2nd-grade-suffixes-ful-less.md` |
| `grade-4-final-stable-syllables` | 4th Grade Final Stable Syllables: -ture and -sure | `src/content/spelling-lists/grade-level/4th-grade-final-stable-syllables.md` |
| `grade-5-math-vocabulary` | 5th Grade Math Vocabulary | `src/content/spelling-lists/grade-level/5th-grade-math-vocabulary.md` |
| `grade-5-science-nature-words` | 5th Grade Science Words | `src/content/spelling-lists/grade-level/5th-grade-science-nature-words.md` |
| `grade-5-spelling-rules` | 5th Grade Spelling Rules | `src/content/spelling-lists/grade-level/5th-grade-spelling-rules.md` |


## Disposition 3 — Reviewed and rejected from the frozen canonical architecture (24 pages)

These pages were individually audited during PR planning. Each had a plausible, non-duplicate word list and — in several cases — `order`/`prerequisiteLists`/`nextLists` metadata chaining into canonical neighbors. **None of that is sufficient grounds for promotion.** The canonical Grade and Skill manifests (`CANONICAL_GRADE_ROUTE_DEFS`, `CANONICAL_SKILL_ROUTE_DEFS`, `gradeHubCards.ts`) are frozen for this PR — no page below was added to them. Each is deleted outright; any future decision to add similar content to the canonical curriculum requires a separate, explicitly product-owner-approved PR.

| id | title | source file |
|---|---|---|
| `academic-vocabulary` | Challenge: Academic Vocabulary | `src/content/spelling-lists/challenge/academic-vocabulary.md` |
| `grade-1-describing-words` | 1st Grade Describing Words | `src/content/spelling-lists/grade-level/1st-grade-describing-words.md` |
| `grade-1-five-senses-words` | Grade 1 Five Senses Words | `src/content/spelling-lists/grade-level/grade-1-five-senses-words.md` |
| `grade-1-list-01` | 1st Grade Everyday Words | `src/content/spelling-lists/grade-level/1st-grade-everyday-words.md` |
| `grade-1-list-02` | 1st Grade Action Words | `src/content/spelling-lists/grade-level/1st-grade-action-words.md` |
| `grade-1-long-e-vowel-teams` | Long E Vowel Teams | `src/content/spelling-lists/phonics/grade-1-long-e-vowel-teams.md` |
| `grade-1-r-controlled-er-ir-ur` | R-Controlled Vowels: er / ir / ur | `src/content/spelling-lists/phonics/grade-1-r-controlled-er-ir-ur.md` |
| `grade-2-describing-words` | 2nd Grade Describing Words | `src/content/spelling-lists/grade-level/2nd-grade-describing-words.md` |
| `grade-2-list-03` | 2nd Grade Action Words | `src/content/spelling-lists/grade-level/2nd-grade-action-words.md` |
| `grade-3-changing-y-to-i` | 3rd Grade Spelling Rule: Changing Y to I | `src/content/spelling-lists/grade-level/3rd-grade-changing-y-to-i.md` |
| `grade-3-doubling-final-consonants` | 3rd Grade Spelling Rule: Doubling Final Consonants | `src/content/spelling-lists/grade-level/3rd-grade-doubling-final-consonants.md` |
| `grade-3-list-01` | 3rd Grade Everyday Words | `src/content/spelling-lists/grade-level/3rd-grade-everyday-words.md` |
| `grade-3-list-02` | 3rd Grade Describing Words | `src/content/spelling-lists/grade-level/3rd-grade-describing-words.md` |
| `grade-3-reading-writing-words` | 3rd Grade Reading & Writing Words | `src/content/spelling-lists/grade-level/3rd-grade-reading-writing-words.md` |
| `grade-4-list-01` | 4th Grade Everyday Words | `src/content/spelling-lists/grade-level/4th-grade-everyday-words.md` |
| `grade-4-list-02` | 4th Grade Academic & Content Words | `src/content/spelling-lists/grade-level/4th-grade-community-words.md` |
| `grade-4-reading-writing-words` | 4th Grade Reading & Writing Words | `src/content/spelling-lists/grade-level/4th-grade-reading-writing-words.md` |
| `grade-5-academic-words` | 5th Grade Academic Words | `src/content/spelling-lists/grade-level/5th-grade-academic-words.md` |
| `grade-5-list-01` | 5th Grade Everyday Words | `src/content/spelling-lists/grade-level/5th-grade-everyday-words.md` |
| `grade-5-opinion-argument-words` | 5th Grade Opinion & Argument Words | `src/content/spelling-lists/grade-level/5th-grade-opinion-argument-words.md` |
| `grade-5-reading-writing-words` | 5th Grade Reading & Writing Words | `src/content/spelling-lists/grade-level/5th-grade-reading-writing-words.md` |
| `kindergarten-ck-ending-words` | The -ck Ending Rule | `src/content/spelling-lists/phonics/kindergarten-ck-ending-words.md` |
| `kindergarten-double-consonants` | Double Consonants | `src/content/spelling-lists/phonics/kindergarten-double-consonants.md` |
| `tier-2-greek-latin-roots` | 4th Grade Greek Root Words | `src/content/spelling-lists/grade-level/tier-2-greek-latin-roots.md` |


---

**Total: 71 + 9 + 24 = 104 non-canonical `spelling-lists` files deleted**, plus 12 `spelling-collections` files (not counted above — different collection).
