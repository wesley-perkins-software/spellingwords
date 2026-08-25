# K–5 Simple Website Content Plan

> **Superseded.** Superseded: its simplified page plan predates the final repository reconciliation. Use [K5_FINAL_CONTENT_ARCHITECTURE.md](./K5_FINAL_CONTENT_ARCHITECTURE.md) for frozen architecture, exact K/Grade 1 presentation, and implementation order.

**Purpose:** This is the parent-facing page plan for the three existing journeys: **Practice Your Own Words**, **Browse by Grade**, and **Browse by Skill**. It turns the approved K–5 curriculum direction into a small, ordered set of cards. It does not change the curriculum research, content model, URLs, or technical implementation.

**Decision rule:** A grade answers **“What should my child practice at this grade?”** A Skill answers **“Which spelling pattern does my child need to practice?”** The same practice page may answer both questions. Reuse it rather than make a duplicate.

## 1. The public structure

Every grade page uses no more than these three headings:

1. **Learn in Order** — the main, numbered route through the grade’s spelling instruction. This is the visually dominant section and the only section a parent needs to follow from start to finish.
2. **High-Frequency Words to Spell** — a short, intentional sequence of common or tricky words when that is useful for the grade. It is prominent in K–1, smaller in Grade 2, briefly renamed in Grade 3, and omitted in Grades 4–5.
3. **More Practice** — optional topic, subject, seasonal, and challenge practice. It never contains a foundational spelling lesson.

Not every grade shows every heading. Grades 4–5 show **Learn in Order** and **More Practice** only. Their commonly confused words are part of the main spelling work, not a separate parallel word-list section. A parent opening any page therefore sees one clear next step first, with optional material clearly below it.

## 2. Exact grade-page cards

### Kindergarten

#### Learn in Order

1. First Words
2. Short A
3. Short E
4. Short I
5. Short O
6. Short U
7. Mixed Short Vowels

#### High-Frequency Words to Spell

- Kindergarten Heart Words

#### More Practice

- Ready for More: Consonant Digraphs
- Animal Words
- Numbers and Colors
- More Kindergarten Topics

### Grade 1

#### Learn in Order

1. Short Vowel Review and C/K
2. Double Final Consonants
3. Digraphs and Final -ck
4. Beginning Blends
5. Ending Blends
6. Word Endings: -s, -es, -ed, and -ing
7. Silent E
8. Vowel Teams
9. Longer Words and Final Y
10. -tch and -dge Endings

#### High-Frequency Words to Spell

- Grade 1 Heart Words

#### More Practice

- Everyday Word Collections

### Grade 2

#### Learn in Order

1. R-Controlled Vowels
2. Other Vowel Patterns
3. Longer Words and Syllables
4. Consonant-le and Common Endings
5. Silent Letters and Spelling Patterns
6. Soft C and Soft G
7. Beginning Prefixes and Suffixes

#### High-Frequency Words to Spell

- Tricky High-Frequency Words

#### More Practice

- Compound Words
- Classroom and Topic Words

### Grade 3

#### Learn in Order

1. Prefixes
2. Suffixes
3. Spelling Changes When Adding Endings
4. Plurals, Possessives, and Contractions
5. Longer Words and Syllable Breaks
6. Homophones and Tricky Choices

#### High-Frequency Words to Spell

- High-Frequency Words and Tricky Choices

#### More Practice

- Writing and Topic Words
- Challenge Words

### Grade 4

#### Learn in Order

1. Greek and Latin Roots
2. Prefixes and Suffixes
3. Advanced Multisyllabic Words
4. High-Frequency Word Endings
5. Related Words and Spelling Changes
6. Homophones and Editing Choices

#### More Practice

- Science and Social Studies Words
- Reading and Writing Words
- Challenge Words

### Grade 5

#### Learn in Order

1. Advanced Word Parts and Academic Words
2. Related Words and Spelling Changes
3. Multisyllabic Academic Words
4. Meaning and Conventional Spelling
5. Spelling Strategies for Editing

#### More Practice

- Science and Nature Words
- Civics and Math Words
- Reading, Writing, and Challenge Words

### Placement notes, stated plainly

- This is a recommended U.S. sequence, not a claim that every school teaches every pattern in the same month.
- Kindergarten digraphs are a clearly labeled optional extension, not a second core route. Final **-ck** and FLOSS are Grade 1’s primary instruction.
- Grade 1 may retain its existing r-controlled pages as optional review/early preview once Grade 2’s R-Controlled Vowels card is available. They do not appear in the Grade 1 numbered route.
- Grade 2 introduces early prefixes and suffixes; Grade 3 is where they become the coherent main morphology sequence.

## 3. Page inventory

**Key:** “Reuse” identifies content already in the repository. “New page needed?” means a new parent-facing practice page, not a new copy of a reusable Skill. A **grouped card** is one grade-page card that opens a calm secondary page or a selected set of existing practice pages; it is not a fourth grade-page section.

| Grade | Visible card | Reuse existing? | New page needed? | Links to smaller Skills? | Notes |
| --- | --- | --- | --- | --- | --- |
| K | First Words | Existing page, revise title/copy only | No | No | Reuse `kindergarten-first-words`; fold beginning/ending-consonant awareness into this first encoding work. |
| K | Short A | Existing reusable page | No | Yes — Short A | Point to the existing Short A Skill/practice page; preserve the K URL as a compatible entry if already live. |
| K | Short E | Existing reusable page | No | Yes — Short E | Same pattern as Short A. |
| K | Short I | Existing reusable page | No | Yes — Short I | Same pattern as Short A. |
| K | Short O | Existing reusable page | No | Yes — Short O | Same pattern as Short A. |
| K | Short U | Existing reusable page | No | Yes — Short U | Same pattern as Short A. |
| K | Mixed Short Vowels | Existing practice page | No | Yes — all five Short Vowels | Reuse `kindergarten-mixed-vowel-review`; it remains the visible checkpoint after the five vowel cards. |
| K | Kindergarten Heart Words | Existing page, revise presentation | No | No | Reuse `kindergarten-heart-words` as the one curated sequence. Dolch Pre-Primer remains supporting source content, not an equal pathway. |
| K | Ready for More: Consonant Digraphs | Existing practice page, renamed/reframed | No | Yes — SH, CH, TH, WH | Reuse `kindergarten-consonant-digraphs` as optional late-K extension; it is not numbered. |
| K | Animal Words | Existing page | No | No | Reuse `kindergarten-animal-words`. |
| K | Numbers and Colors | Existing page | No | No | Reuse `kindergarten-number-color-words`. |
| K | More Kindergarten Topics | Collection/secondary browse page | No | No | Curate existing shapes, family, food, school, body, feelings, and describing-word pages behind one calm card. |
| 1 | Short Vowel Review and C/K | Existing page, rename only | No | Yes — Short Vowels; C/K/CK | Reuse `grade-1-cvc-short-vowels-c-k-rule`. |
| 1 | Double Final Consonants | Existing page | No | Optional FLOSS practice | Reuse `grade-1-floss-rule`; do not create a separate duplicate K page. |
| 1 | Digraphs and Final -ck | Existing page, revise/group copy | No | Yes — SH, CH, TH, WH; Final -ck | Reuse `grade-1-consonant-digraphs-final-ck`; retain focused digraph and C/K/CK pages as targets. |
| 1 | Beginning Blends | Existing grouped page | No | Yes — Beginning Blends | Reuse `grade-1-beginning-consonant-blends`; its individual blend pages stay beneath it. |
| 1 | Ending Blends | Existing grouped page | No | Yes — Ending Blends | Reuse `grade-1-ending-consonant-blends`; its individual blend pages stay beneath it. |
| 1 | Word Endings: -s, -es, -ed, and -ing | Grouped card linking to two existing pages | No | Yes — Word Endings | Group `grade-1-inflectional-endings-s-es` and `grade-1-inflectional-endings-ed-ing`; give the card a short overview before the two practices. |
| 1 | Silent E | Existing page | No | Yes — Silent E vowel choices | Reuse `grade-1-long-vowels-silent-e` and the existing focused Silent E pages. |
| 1 | Vowel Teams | Grouped card linking to existing pages | No | Yes — AI/AY, EE/EA, OA/OW | Reuse the two Grade 1 pages and the existing focused team pages. |
| 1 | Longer Words and Final Y | Existing page, broaden/revise | No | No | Broaden `grade-1-open-syllables-final-y` to include hearing/counting regular two-syllable words; keep the stable page where scope remains compatible. |
| 1 | -tch and -dge Endings | Existing page | No | Yes — TCH/DGE | Reuse `grade-1-tch-dge-ending-rules`. |
| 1 | Grade 1 Heart Words | Existing page, revise presentation | No | No | Reuse `grade-1-heart-words` as the visible sequence; its parts remain smaller practice sets. |
| 1 | Everyday Word Collections | Collection/secondary browse page | No | No | Curate existing Everyday, Action, and Describing Words behind one optional card. |
| 2 | R-Controlled Vowels | Grouped card linking to existing pages | No | Yes — AR, OR, ER/IR/UR | Reuse the three existing reusable r-controlled pages; this is their primary grade placement. |
| 2 | Other Vowel Patterns | Grouped card linking to existing pages | No | Yes — OI/OY; OU/OW | Reuse `vowel-teams-oi-oy` and `vowel-teams-ou-ow`; keep the visible title nontechnical. |
| 2 | Longer Words and Syllables | New practice page | Yes | Later: Multisyllabic Words | Needs a coherent Grade 2 practice set for syllable types and regular longer words. |
| 2 | Consonant-le and Common Endings | New practice page | Yes | Later: Consonant-le | One page provides a useful, parent-sized introduction rather than several tiny pages. |
| 2 | Silent Letters and Spelling Patterns | Existing page, expanded/revised | No | Optional Silent Letters | Reuse `grade-2-silent-letter-words`; add conventional patterns in compatible revised content. |
| 2 | Soft C and Soft G | New practice page | Yes | Later: Soft C and G | No suitable dedicated practice page exists. |
| 2 | Beginning Prefixes and Suffixes | Grouped card linking to existing pages | No | Yes — Prefixes; Word Endings | Reuse UN/RE and FUL/LESS pages; use comparatives and regular plurals as supporting practices, not extra roadmap cards. |
| 2 | Tricky High-Frequency Words | Existing collection, curated/reframed | No | No | Use the Dolch Second Grade collection plus a selected list of common confusing words; do not make two parallel routes. |
| 2 | Compound Words | Existing page | No | No | Reuse `2nd-grade-compound-words`. |
| 2 | Classroom and Topic Words | Collection/secondary browse page | No | No | Curate existing Everyday, Action, and Describing Words; add subject-topic pages only as they are authored. |
| 3 | Prefixes | Existing page | No | Yes — Prefixes | Reuse `3rd-grade-prefix-words`. |
| 3 | Suffixes | Existing page | No | Yes — Word Endings and Suffixes | Reuse `3rd-grade-suffix-words`. |
| 3 | Spelling Changes When Adding Endings | Grouped card linking to existing pages | No | Yes — suffix spelling changes | Group existing doubling-final-consonant, dropping-silent-e, and changing-y-to-i pages. |
| 3 | Plurals, Possessives, and Contractions | New practice page | Yes | No | Build one Grade 3 conventions practice page; existing Grade 2 plurals/contractions can be review links, but possessives are missing. |
| 3 | Longer Words and Syllable Breaks | Existing page, revise title/copy | No | Later: Multisyllabic Words | Reuse `3rd-grade-multisyllabic-words`; add syllable-break framing. |
| 3 | Homophones and Tricky Choices | Existing page | No | Yes — Homophones | Reuse `3rd-grade-homophones`. |
| 3 | High-Frequency Words and Tricky Choices | Existing collection, curated/reframed | No | No | A small secondary collection drawing from Dolch Third Grade and selected common confusions; do not repeat the full Homophones card. |
| 3 | Writing and Topic Words | Collection/secondary browse page | No | No | Curate existing Reading & Writing, Everyday, and Describing Words. |
| 3 | Challenge Words | New collection/secondary browse page | No | No | A small optional collection; author only after core Grade 3 work is complete. |
| 4 | Greek and Latin Roots | Grouped card linking to existing pages | No | Yes — Greek/Latin Word Parts | Reuse `tier-1-roots-and-patterns` and `tier-2-greek-latin-roots`. |
| 4 | Prefixes and Suffixes | Grouped card linking to existing pages | No | Yes — Prefixes; Word Endings | Reuse the existing advanced prefix and suffix pages. |
| 4 | Advanced Multisyllabic Words | Existing page | No | Later: Multisyllabic Words | Reuse `4th-grade-multisyllabic-academic-words`. |
| 4 | High-Frequency Word Endings | New practice page | Yes | Later: common endings | Needs focused work with stable endings such as -tion, -sion, and -ture. |
| 4 | Related Words and Spelling Changes | New practice page | Yes | Later: related words | Needs a morphology-led practice set; do not substitute a themed vocabulary list. |
| 4 | Homophones and Editing Choices | Existing page, revise title/copy | No | Yes — Homophones | Reuse `4th-grade-commonly-confused-words` with editing-transfer framing. |
| 4 | Science and Social Studies Words | Collection/secondary browse page | No | No | Curate Community/Content Words and future science/civics lists. |
| 4 | Reading and Writing Words | Existing page | No | No | Reuse `4th-grade-reading-writing-words`. |
| 4 | Challenge Words | New collection/secondary browse page | No | No | Defer authoring until all Grade 4 core cards are complete. |
| 5 | Advanced Word Parts and Academic Words | Grouped card linking to existing pages | No | Yes — Greek/Latin Word Parts; Prefixes; Suffixes | Group `5th-grade-greek-latin-word-parts`, `5th-grade-prefix-suffix-words`, and `5th-grade-academic-words`. |
| 5 | Related Words and Spelling Changes | Existing page, substantially revised | No | Yes — related words | Reframe `5th-grade-spelling-rules` around related-word changes rather than a loose rule survey. |
| 5 | Multisyllabic Academic Words | Existing page | No | Later: Multisyllabic Words | Reuse `5th-grade-multisyllabic-academic-words`. |
| 5 | Meaning and Conventional Spelling | Grouped card linking to existing pages | No | Yes — Homophones | Group `5th-grade-commonly-confused-words` with the revised spelling-rules work without duplicating word banks. |
| 5 | Spelling Strategies for Editing | New practice page | Yes | No | Needs short editing/transfer practice; it should apply the preceding work, not introduce another pattern family. |
| 5 | Science and Nature Words | Existing page | No | No | Reuse `5th-grade-science-nature-words`. |
| 5 | Civics and Math Words | Grouped card linking to existing pages | No | No | Group the existing Civics and Math pages. |
| 5 | Reading, Writing, and Challenge Words | Grouped card linking to existing pages | No | No | Group existing Reading & Writing and Opinion & Argument pages; add challenge practice only when it has a distinct purpose. |

### What actually needs authoring

The only new core practice pages proposed by this plan are: **Grade 2 Longer Words and Syllables; Grade 2 Consonant-le and Common Endings; Grade 2 Soft C and Soft G; Grade 3 Plurals, Possessives, and Contractions; Grade 4 High-Frequency Word Endings; Grade 4 Related Words and Spelling Changes; and Grade 5 Spelling Strategies for Editing.** “Challenge Words” are explicitly deferred and never block the core route. All other gaps are card copy, a calm grouping page, or a compatible revision to existing content.

## 4. Skills recommendation

### Direct answers

- **Should Browse by Skill remain?** Yes. It is the short route for a parent who already knows the pattern to practice.
- **Which current families remain?** Keep **Short Vowels**, **Consonant Digraphs**, **Silent E**, and **Vowel Teams**. They are familiar and already have focused practice pages.
- **Which additional families are clearly justified?** Add **Consonant Blends** and **R-Controlled Vowels** first. Next, only after their grade roadmaps are stable, add **Word Endings and Suffixes**, **Prefixes**, **Greek and Latin Word Parts**, and **Homophones and Commonly Confused Words**. Keep OI/OY and OU/OW inside Vowel Teams for now rather than adding a separate Diphthongs top-level choice.
- **Should every grade card become a Skill?** No. A grade route also contains grade-specific sequence, review, word conventions, high-frequency words, and optional collections. Those are not all reusable patterns.
- **When does a grade card open one practice page?** When the parent-sized concept and existing practice page match cleanly: Short A, Mixed Short Vowels, Silent E, FLOSS, or Homophones.
- **When does a grade card open several smaller Skill pages?** When one parent-sized step is naturally made of a few choices: Vowel Teams, R-Controlled Vowels, Digraphs, Blends, or Grade 3 spelling changes. The grade card supplies the order; the smaller pages supply focused practice.
- **How is duplicate content avoided?** The grade card links to the existing Skill/practice page. It does not copy its word list into a grade-only version. Retain stable pages and use compatible title/copy updates or a grouping page where needed.
- **What belongs only in the grade journey?** First Words; the recommended order; Heart/High-frequency-word sequences; grade-specific writing conventions; editing transfer; and themed/subject collections.
- **What can remain a Skill without a prominent grade-roadmap card?** Individual blend pages, individual vowel-team pages, individual digraph pages, C/K/CK choices, and focused final-ck/FLOSS/TCH-DGE practice. They are useful when sought directly but would clutter the grade route.

**Governing rule:** A Skill is reusable practice for a spelling pattern. A grade page places the most relevant practice in a recommended order.

## 5. Firm Kindergarten decision

Kindergarten has one unambiguous start-to-finish route: **First Words → Short A → Short E → Short I → Short O → Short U → Mixed Short Vowels.**

- **Beginning and ending consonants:** Fold them into **First Words**. Separate cards would overstate a prerequisite exercise and make the first page feel more technical than it needs to be.
- **Five short vowels:** Keep all five visible and in the listed order. These are compact, parent-recognizable steps and give a child a clear next practice.
- **Mixed CVC review:** Keep it visible as **Mixed Short Vowels**. It is the meaningful checkpoint after the five focused cards, not a redundant sixth vowel lesson.
- **Digraphs:** Put them in **More Practice** as **Ready for More: Consonant Digraphs**. This honestly accommodates late-K exposure without presenting it as the next required lesson for every child.
- **Final -ck:** Do not show it on the Kindergarten page. Preserve its existing stable page for direct practice and use it within Grade 1’s Digraphs and Final -ck work.
- **FLOSS/double final consonants:** Do not show it on the Kindergarten page. Its primary instruction is Grade 1’s **Double Final Consonants** card. Preserve the existing K double-consonant page as non-roadmap supporting practice until its role is reviewed; do not delete it.
- **Heart Words and Dolch Pre-Primer:** Show one card only: **Kindergarten Heart Words**. Its small sets are the intended order. Dolch Pre-Primer is a supporting collection linked from inside that experience or from a quiet “see more high-frequency words” link, never a second visible K pathway.
- **Themes:** Show only Animal Words, Numbers and Colors, and one **More Kindergarten Topics** card. The latter contains shapes, family, food, school, body, feelings, and describing words so the grade page remains calm.

## 6. Grade 1 normalization

### Keep in the numbered progression

Keep the existing CVC/C-K review, FLOSS, Digraphs/Final CK, Beginning Blends, Ending Blends, Silent E, Vowel Teams, Open Syllables/Final Y, inflectional endings, and TCH/DGE content. Rename them to the parent-facing card titles in this plan; retain their existing URLs and word banks where their purpose is unchanged.

### Group rather than add more visible steps

- Combine the two existing inflectional-ending pages under **Word Endings: -s, -es, -ed, and -ing**.
- Combine the two existing vowel-team pages under **Vowel Teams**.
- Keep each broad Blend card as one visible step; individual BL/BR/… and final-blend pages stay targeted practice beneath it.
- Keep Grade 1 Heart Words as the one high-frequency-word card; its part pages and Heart Word Practice page are supporting practice, not parallel pathways.

### Move, review, or remove from the numbered route

- **R-Controlled Vowels:** Move primary placement to Grade 2. Keep the existing Grade 1 pages as optional early preview/review after Grade 2 is live.
- **Grade 1 gateway pages** (Short Vowel Practice, Consonant Digraph Practice, Beginning/Ending Blend Practice, Silent E Practice, Vowel Team Practice, R-Controlled Vowel Practice, and Heart Word Practice): remove them from the numbered route. Retain them as direct targeted practice and links from their parent cards while their URLs remain useful.
- **Everyday, Action, and Describing Words:** move out of the numbered route into the one optional **Everyday Word Collections** card.

### One compatible expansion and no missing major concept

Broaden the existing Open Syllables/Final Y page into **Longer Words and Final Y** by adding regular two-syllable hearing/counting and spelling practice. This supplies the matrix’s two-syllable introduction without forcing a new URL if the revised scope remains compatible. No other major Grade 1 instructional page is missing; the work is normalization, grouping, and clear Grade 2 handoff.

## 7. Minimal build sequence

1. Approve this visible K–5 page plan as the parent-facing decision record.
2. Reconcile the canonical curriculum documentation and roadmap planning notes to this decision record; do not change the underlying curriculum model.
3. Finalize the Kindergarten page: apply the firm route, make Digraphs optional, and remove Final -ck/FLOSS from its visible grade page while keeping stable content live.
4. Normalize Grade 1 to the ten-card roadmap and move r-controlled vowels to optional preview/review.
5. Build the Grade 2 curated page and its three missing core pages.
6. Build Grade 3’s curated page and the Plurals, Possessives, and Contractions page.
7. Build the Grade 4 and Grade 5 curated pages and their remaining core pages.
8. Expand Browse by Skill only when the relevant grade pages have confirmed a compact, reusable need: Consonant Blends and R-Controlled Vowels first; morphology families later.

**Single next implementation task after approval:** **Finalize the Kindergarten grade page to the seven-card Learn in Order route, one Heart Words card, and the four-card More Practice section specified above.** It is the smallest high-confidence change, reuses nearly all existing content, establishes the visual pattern for every later grade, and resolves the most visible current ambiguity before Grade 1 normalization begins.
