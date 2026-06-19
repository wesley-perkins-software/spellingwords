# Phonics Strategy

This document defines how the phonics family should be organized on spellingwords.app — which patterns deserve dedicated lists, in what order children should encounter them, and how the phonics family relates to the rest of the curriculum.

---

## Current State

The site currently has ten phonics lists, covering four foundational families:

| Family | Lists |
|---|---|
| Short vowels (CVC) | Short Vowels (CVC Words) |
| Silent E | Silent E Long A, Silent E Long I, Silent E Long O |
| Vowel teams | AI and AY Words, EE and EA Words, OA and OW Words, OI and OY Words, OU and OW Words |
| R-controlled vowels | R-Controlled AR Words |

This is a solid foundation, but it is not yet complete. Significant gaps remain:

- **Digraphs** (sh, ch, th, wh, ph) — not yet represented
- **Consonant blends** (initial: bl, br, cl, cr…; final: nd, nt, mp, st…) — not yet represented
- **Remaining r-controlled vowels** — ER, IR, UR, and OR have no lists yet
- **Diphthongs** — OI/OY and OU/OW lists exist but are not yet described as diphthongs explicitly
- **Multisyllabic patterns** — VCV open syllables, VCCV closed syllables, compound words
- **Advanced spelling patterns** — silent letter pairs (kn, wr, mb), soft C and G, suffix patterns (-tion, -sion)

---

## Why Phonics Matters

Sight words and phonics are often taught in parallel, but they serve different purposes.

Sight-word lists prioritize **reading fluency**. Children memorize high-frequency words so they can read a page without stopping. The emphasis is recognition speed, not pattern understanding.

Phonics lists prioritize **spelling logic**. Phonics explains *why* a word is spelled the way it is. When a child knows the AI vowel team, they can spell "rain," "mail," "chain," and "paint" not by memory but by pattern. That generative ability is the goal.

This distinction matters for spellingwords.app specifically because the core activity is spelling, not reading. A child who hears a word and types it is doing phonics work even when they don't know it. Explicit phonics lists make the pattern visible.

Phonics coverage also serves a wide range of users:

- Classroom teachers who teach phonics as a discrete skill sequence
- Homeschool families following structured literacy curricula (Orton-Gillingham, UFLI, etc.)
- Tutors running phonics-focused intervention
- Parents whose children are struggling with a specific sound or pattern

Search intent reflects this directly. Parents and educators search for things like "long a words," "short i words," "ai words," "oa words," "blends words," "digraph words," "r controlled vowels." These are phonics queries, not grade-level queries. A site with explicit phonics lists meets them where they are.

---

## Organizing Principles

Three approaches are possible.

**Pattern-first (recommended)**

Each list focuses on a single phoneme-grapheme correspondence or pattern family: Short A Words, Long A Silent E Words, AI and AY Words, EE and EA Words, R-Controlled AR Words, and so on.

This is the recommended approach because:

- Parents and teachers search by pattern, not by grade
- Phonics instruction is organized by pattern in every major structured literacy curriculum
- Pattern-first lists have clear instructional focus — a teacher knows exactly what skill a list practices
- It produces the strongest search alignment without keyword stuffing

**Grade-first**

Grouping by grade (First Grade Phonics Words, Second Grade Phonics Words) loses instructional specificity. A first-grade classroom might be working on digraphs while another is still on silent E. Grade labels obscure this. Grade metadata can still be added to pattern-first lists as a secondary signal; it should not be the primary organizational axis.

**Mixed approach**

Some curricula organize phonics by grade within a pattern (Grade 1 Short Vowels, Grade 2 Short Vowels). This adds complexity without clear benefit for a spelling practice site. It is harder to navigate, harder to name, and harder to maintain. Not recommended.

---

## Recommended Phonics Progression

The following sequence is the recommended order in which phonics families should be introduced. This is not a commitment to build every list immediately — it is the instructional order that should guide which lists get built next and how `prerequisiteLists` and `nextLists` chain together.

Future sequence audits may use UFLI (University of Florida Literacy Institute) as a reference model. UFLI's scope-and-sequence is one of the strongest research-based phonics progressions currently available.

### 1. Short Vowels (CVC)

The starting point for all phonics instruction. A consonant-vowel-consonant word has a predictable short vowel sound.

- Short A (cat, hat, map, ran)
- Short E (bed, red, net, pet)
- Short I (pig, sit, win, drip)
- Short O (hot, dog, log, cob)
- Short U (bug, run, mud, cup)

**Status:** One combined list exists (Short Vowels CVC Words). See Open Questions for whether this should become five separate lists.

### 2. Silent E (CVCe)

Adding a silent E to the end of a CVC word lengthens the vowel sound.

- Long A Silent E (cake, gate, brave, plate)
- Long I Silent E (bike, fine, ride, time)
- Long O Silent E (bone, home, note, rose)

**Status:** All three lists exist. Long-E Silent E (here, these) and Long-U Silent E (tune, cube) are real but less common; they can be deferred or handled as edge cases within larger vowel team lists.

### 3. Common Vowel Teams

Two vowels working together to make one sound.

- AI and AY — long A (rain, day, mail, play)
- EE and EA — long E (tree, beach, feet, clean)
- OA and OW — long O (boat, snow, road, blow)

**Status:** All three lists exist.

### 4. Digraphs

Two letters that make a single new sound. This is the key distinction from blends: in a digraph, neither letter's individual sound is heard.

- SH words (ship, shop, fish, wish)
- CH words (chip, chair, much, peach)
- TH words (thin, this, that, cloth)
- WH words (when, where, which, while)
- PH words (phone, graph, photo, dolphin) — may be better suited to an advanced list given typical grade placement

**Status:** No digraph lists exist yet. High priority for Phase 2.

> **Digraphs vs. blends:** Many educational resources incorrectly group these together. spellingwords.app should keep them strictly separate. In a blend, both sounds are still heard (bl-, str-). In a digraph, the two letters produce a completely new sound (sh, ch, th). The distinction is instructionally important and worth maintaining clearly.

### 5a. Initial Consonant Blends

Two or three consonants at the start of a word where each sound is still heard.

- L-blends: bl, cl, fl, gl, pl, sl (blue, clean, flat, glad, play, slow)
- R-blends: br, cr, dr, fr, gr, pr, tr (brave, crab, drop, frog, grade, proud, trip)
- S-blends: sc, sk, sl, sm, sn, sp, st, sw (skip, slim, small, snap, spin, step, swim)

**Status:** No initial blend lists exist yet. High priority for Phase 2.

### 5b. Final Consonant Blends

Two consonants at the end of a word where each sound is still heard.

- Common endings: nd (band, hand, sand), nt (tent, mint, plant), mp (camp, jump, stamp), st (best, last, must), sk (ask, desk, task), lk (milk, silk, hulk), ld (bold, old, cold)

**Status:** No final blend lists exist yet. Final blends are instructionally distinct from initial blends and should be taught and listed separately.

### 6. R-Controlled Vowels

When a vowel is followed by R, it produces a new sound that is neither the short nor long vowel.

- AR words (art, barn, car, dark, farm)
- ER, IR, UR words — all three produce the same sound (her, bird, burn)
- OR words (corn, fork, horn, sort)

**Status:** AR list exists. ER/IR/UR and OR lists do not yet exist.

### 7. Diphthongs

Vowel sounds that glide from one position to another within a single syllable.

- OI and OY (coin, boy, noise, joy, point)
- OU and OW (out, brown, mouse, found, down)

**Status:** Both lists exist, though they are currently filed under "vowel teams" in the frontmatter. Explicitly labeling them as diphthongs in their descriptions would improve instructional clarity.

### 8. Multisyllabic Patterns

Words with more than one syllable, organized by syllable type.

- Compound words (rainbow, football, starfish, cupcake)
- VCV open syllables — long vowel before a single consonant (paper, baby, music, robot)
- VCCV closed syllables — short vowel before two consonants (rabbit, kitten, basket, butter)

**Status:** No multisyllabic lists exist yet. Lower priority; appropriate for Phase 3.

### 9. Advanced Spelling Patterns

Patterns that lie at the edge of phonics, shading into morphology and etymology.

- Silent letter pairs: KN (kneel, knit, knock), WR (wrap, write, wrist), MB (lamb, thumb, comb)
- Soft C and soft G (city, cent, fence; gem, giraffe, giant)
- Suffix patterns: -tion (nation, station, fraction), -sion (mission, vision, tension)

**Status:** No lists exist yet. These are the lowest priority and may eventually belong in a future morphology or spelling-rules family rather than phonics. Use the label "advanced spelling patterns" rather than "advanced phonics" to preserve that flexibility.

---

## Relationship to Sight Words

Phonics and sight words are complementary, not competing. They address different dimensions of literacy.

Words like "said," "was," "want," and "come" are irregular — their spelling does not follow predictable phonics rules. They appear on Dolch lists because children need to memorize them for reading fluency. But those same words can still appear in phonics-adjacent lists (irregular vowel patterns, for example) as counterexamples or as the focus of a "tricky words" list.

The principle is simple: a word can serve both purposes. A sight-word list and a phonics list are different views of the same word, just as a grade-level list and a phonics list can share a word without conflict. The word exists once in the word universe; lists are lenses.

---

## Relationship to Grade-Level Lists

The same principle applies to grade-level lists. A word like "train" can appear in:

- Grade 1 Everyday Words (high-frequency, grade-appropriate)
- AI and AY Words (vowel team pattern)

This is not duplication. It is a feature. Overlap between phonics lists and grade-level lists reflects the reality that children encounter words in multiple instructional contexts. Lists are views; the word universe is the source of truth.

---

## List Size

The standard for the site is 12–15 words per list, and phonics lists should follow the same standard with some flexibility.

Some patterns are productive: Short A CVC has dozens of strong candidate words, and a list of 15 is easy to fill with high-quality words. Other patterns are constrained: Long-U Silent E (cube, tune, flute, mule, dune) may only support 8–10 genuinely useful words at the appropriate grade level. That is fine.

Guidelines:

- **Don't pad lists** to hit 12 if only 8–10 strong words exist for the pattern
- **Don't split a coherent pattern** into artificial sublists (Part 1, Part 2) to stay under 15
- **Do split by subpattern** when instructional logic supports it (AI words vs. AY words could be separate lists if the patterns diverge in usage)
- Most phonics lists will land naturally in the 10–15 range

---

## Naming Rules

List titles should be immediately understood by a parent who is not a reading specialist.

**Good names:**

- Short A Words
- Long A Silent E Words
- AI and AY Words
- EE and EA Words
- R-Controlled AR Words
- SH Digraph Words
- Initial Blends: BR and BL
- Diphthong OI and OY Words

**Avoid:**

- Phase 4 Set B
- Orthographic Pattern Group 3
- Advanced Grapheme Cluster Collection
- CVC Phoneme Mapping Level 2
- Vowel Glide Sequence A

If the title requires decoding before a parent can understand what the list practices, the title is wrong. The pattern name (short A, silent E, AI/AY, digraph SH) is the title.

---

## What Phonics Lists Should Not Become

- **Giant pattern dumps** — a list of 40 words with every vowel team mixed together has no instructional focus
- **Arbitrary mixtures** — if the words in a list don't share a single learnable pattern, the list doesn't belong
- **Near-duplicates** — two AI/AY lists with overlapping words and no distinct purpose
- **Overly technical titles** — names that require a linguistics degree to parse
- **Filler lists built for SEO** — a list exists because the pattern is worth practicing, not because the search volume is high

---

## Launch Recommendation

### Phase 1 — Foundational (largely complete)

| List | Status |
|---|---|
| Short Vowels CVC | ✅ Published |
| Silent E Long A | ✅ Published |
| Silent E Long I | ✅ Published |
| Silent E Long O | ✅ Published |
| AI and AY Words | ✅ Published |
| EE and EA Words | ✅ Published |
| OA and OW Words | ✅ Published |
| OI and OY Words (diphthong) | ✅ Published |
| OU and OW Words (diphthong) | ✅ Published |
| R-Controlled AR Words | ✅ Published |

Phase 1 is mostly done. The remaining work is labeling OI/OY and OU/OW as diphthongs in their descriptions, and deciding whether Short Vowels should split into five lists.

### Phase 2 — High Value, High Search Intent

| List | Status |
|---|---|
| SH Digraph Words | ❌ Not created |
| CH Digraph Words | ❌ Not created |
| TH Digraph Words | ❌ Not created |
| WH Digraph Words | ❌ Not created |
| Initial Blends (L-blends: BL, CL, FL…) | ❌ Not created |
| Initial Blends (R-blends: BR, CR, DR…) | ❌ Not created |
| Initial Blends (S-blends: SK, SL, SM…) | ❌ Not created |
| Final Blends (ND, NT, MP, ST…) | ❌ Not created |
| R-Controlled ER, IR, UR Words | ❌ Not created |
| R-Controlled OR Words | ❌ Not created |

### Phase 3 — Complete Coverage

| List | Status |
|---|---|
| Compound Words | ❌ Not created |
| VCV Open Syllable Words | ❌ Not created |
| VCCV Closed Syllable Words | ❌ Not created |
| Silent KN Words | ❌ Not created |
| Silent WR Words | ❌ Not created |
| Silent MB Words | ❌ Not created |
| Soft C and Soft G Words | ❌ Not created |
| -tion and -sion Words | ❌ Not created |

Phase 3 lists are lower priority and some may eventually move to a morphology family if that family is developed.

---

## Open Questions

These are unresolved and should be answered before Phase 2 list authoring begins.

**1. Should the five short vowels remain one combined list or become five separate lists?**

This is the most consequential organizational question in the phonics family.

One combined list (current state):
- Simpler; fewer items in the library browser
- Lower maintenance

Five separate lists (Short A Words, Short E Words, Short I Words, Short O Words, Short U Words):
- Stronger instructional alignment — a teacher working on Short A specifically can assign exactly that list
- Stronger search intent — "short a words" is a common parent/teacher search
- Easier targeted practice for a child who has mastered four vowels but is still struggling with one
- Each list would be 10–15 words instead of a combined 30–50

Recommendation: five separate lists, but this is worth discussing before committing.

**2. Should phonics lists carry grade metadata?**

Some existing phonics lists have grade fields (e.g., Silent E lists are marked grade 2). This is reasonable as a secondary signal for filtering, but phonics skill acquisition does not map cleanly to grade. A third grader doing intervention might be working on short vowels. Grade metadata should be treated as approximate guidance, not a hard filter.

**3. Should advanced spelling patterns eventually move to a morphology family?**

Soft C/G and suffix patterns (-tion, -sion) are as much about morphology and etymology as about phonics. If a morphology family is developed in the future, these lists would be natural candidates for migration. Plan for this now by labeling them "advanced spelling patterns" rather than "advanced phonics."

**4. Do compound words belong in phonics or grade-level?**

Compound words (rainbow, football, starfish) are multisyllabic but phonically regular. They could appear in a phonics family (multisyllabic patterns) or a grade-level family (grade 2 vocabulary). The word universe handles this: the same word can appear in both. The question is which list family creates the compound-words list.

**5. How should initial blends be grouped?**

Options:
- One list per blend family (BL Words, BR Words, CL Words…) — very granular, potentially too many lists
- Grouped by onset type (L-blends, R-blends, S-blends) — the recommended approach above
- One large initial blends list — loses instructional focus

**6. How much overlap between lists is too much?**

There is no ceiling on how many lists a word can appear in across families. Within the phonics family, a word should generally not appear in two lists of the same type (two vowel team lists, for example) unless the pattern distinction justifies it.
