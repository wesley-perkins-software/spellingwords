# Kindergarten Curriculum (Canonical, Locked)

> **This is the authoritative reference for Kindergarten spelling curriculum** — page order, exact word lists, instructional rationale, and what is intentionally excluded. It supersedes the thematic-vocabulary approach recorded in `docs/content/curriculum-bible.md` §7 (pre-2026-07-08) and `docs/content/content-production-roadmap.md` Phase D. Update this document, not the Bible's historical sections, whenever the Kindergarten curriculum changes.

---

## 1. Purpose & Status

Locked 2026-07-08. Kindergarten follows a structured, single-pattern-per-page phonics progression rather than topic-based thematic vocabulary. This reflects `docs/CURRICULUM_PHILOSOPHY.md`'s inclusion test — every core page must be able to name its shared spelling pattern in one sentence — applied consistently down to the Kindergarten level for the first time.

Do not redesign this sequence, substitute words, reorder pages, or add/remove concepts without a documented reason. Genuine factual errors should be fixed; curriculum preference should not.

---

## 2. Core Sequence (Locked, 11 Pages)

| # | Title | id | Category | Word list | Why this page, and why here |
|---|---|---|---|---|---|
| 1 | Kindergarten First Words | `kindergarten-first-words` | grade-level | bird, bug, cup, egg, fish, hen, jump, nest, rain, rock, snow, sun | The on-ramp: a small set of highly familiar, mostly-regular words across several vowels, so a child's very first spelling experience is a successful one, before any single vowel is isolated for focused practice. |
| 2 | Kindergarten Short A Words | `kindergarten-short-a-words` | phonics | cat, hat, bag, man, ran, sad, tap, van | Isolates the short "a" sound in the simplest possible word shape (CVC), the first of five vowels practiced one at a time. |
| 3 | Kindergarten Short I Words | `kindergarten-short-i-words` | phonics | pig, sit, hid, win, lip, big, hit, fin | Second isolated vowel. Continues the one-vowel-at-a-time approach before any mixing. |
| 4 | Kindergarten Short O Words | `kindergarten-short-o-words` | phonics | hot, dog, box, mom, hop, job, log, mop | Third isolated vowel. |
| 5 | Kindergarten Short U Words | `kindergarten-short-u-words` | phonics | bug, sun, run, cup, bus, fun, cut, hug | Fourth isolated vowel. `mud` is deliberately withheld from this list — it's reserved as a fresh transfer word for Mixed Vowel CVC Review (page 7). |
| 6 | Kindergarten Short E Words | `kindergarten-short-e-words` | phonics | bed, hen, leg, ten, pet, red, get, met | Fifth and final isolated vowel. `wet` is deliberately withheld for the same reason as `mud` above. |
| 7 | Mixed Vowel CVC Review | `kindergarten-mixed-vowel-cvc-review` | phonics | jam, lid, cob, mud, wet, rag, dig, sub | Deliberately fresh words (not reused from pages 2–6) mixing all five short vowels, to test whether the pattern has transferred — not whether a specific list was memorized. |
| 8 | Consonant Digraphs | `kindergarten-consonant-digraphs` | phonics | chip, chin, shop, ship, path, math, what, when | Introduces "two letters, one sound" (ch, sh, th, wh) with two words each. Uses only the unvoiced "th" sound (path, math) — not `this`/`that` — so a beginner isn't asked to distinguish voiced/unvoiced "th" yet. |
| 9 | The -ck Ending Rule | `kindergarten-ck-ending-rule` | phonics | back, kick, sock, duck, neck, pick, rock, sack | First rule-based (not purely one-letter-one-sound) pattern: after a short vowel in a one-syllable word, the /k/ ending is spelled -ck. |
| 10 | Double Consonants | `kindergarten-double-consonants` | phonics | off, puff, ball, bell, hill, mess, pass, kiss | Second rule-based pattern: a short vowel is often followed by a doubled f, l, or s. Every word is a plain base word with no leading/trailing blend. Not to be confused with Grade 3's "doubling final consonants" (a suffix rule, run→running) — a different concept that happens to share vocabulary. |
| 11 | Kindergarten Heart Words | `kindergarten-heart-words` | sight-words | the, to, a, is, you, said, for, they | Capstone: common words with one irregular part that must be learned by heart rather than sounded out, closing the core sequence. |

---

## 3. Supplemental Pages (Locked, Exactly 2)

Supplemental pages are explicitly **not** part of the sequential core — they don't chain forward via `nextLists`, and both point only to page 1 (`kindergarten-first-words`) as their sole prerequisite.

| Title | id | Word list | Relationship to core |
|---|---|---|---|
| Kindergarten Animal Words | `kindergarten-animal-words` | cat, dog, pig, hen, duck, fish, rat, cub | Every word decodes via a core-taught pattern (short-vowel CVC, the -ck rule, or the sh digraph) — re-audited 2026-07-08 to satisfy this. |
| Kindergarten Number and Color Words | `kindergarten-number-color-words` | one, two, three, four, five, six, seven, eight, nine, ten, red, blue, yellow, brown | Kept as the full, recognizable numbers-and-colors set by explicit decision — **not** fully decodable via core concepts alone (e.g. `seven`, `eight`, `yellow`). Framed honestly in its own copy as vocabulary learned partly by memory, not phonics-aligned practice. |

**Standing rule for future supplemental pages:** every word must already be spellable using concepts taught in the core sequence above. Number & Color Words is a deliberate, documented exception grandfathered at launch for its practical value as a recognizable numbers/colors set — it is not a precedent for new supplemental pages to also skip this rule. New supplemental proposals should meet the rule in full.

Supplemental pages exist because they have real educational value and search demand, but they are never presented as part of the instructional sequence — their editorial copy says so explicitly, and they carry no `nextLists` into the core.

---

## 4. What's Intentionally Excluded, and Why

The core sequence deliberately does **not** include:
- Consonant blends (bl-, st-, fr-, etc.) — Grade 1 content per `docs/CURRICULUM_PHILOSOPHY.md`'s reference spine.
- Vowel teams (ai/ay, ee/ea, oa/ow, etc.) — Grade 1–2 content.
- R-controlled vowels (ar, er/ir/ur, or) — Grade 2 content.
- Silent-e long vowels — Grade 1 content.
- Multisyllabic words — later-grade content.

This is why, for example, `fox` was excluded from Short O Words (the final /ks/ sound spelled by a single letter is a step beyond plain CVC) and why the supplemental Animal Words list dropped words like `frog`, `goat`, `horse`, and `sheep` (r-blend, vowel teams, r-controlled vowel — none taught in the core sequence).

---

## 5. Archived Pages Record

The following 7 pages were `status: published` Kindergarten grade-level thematic vocabulary lists, archived 2026-07-08 because they have no place in the locked curriculum (neither core nor one of the 2 named supplemental pages). Each 301-redirects to `/spelling-lists/kindergarten` (see `netlify.toml`).

| Former id | Former order | Reason |
|---|---|---|
| `kindergarten-describing-words` | 3 | Orphaned thematic list — no shared spelling pattern, not one of the 2 named supplemental pages |
| `kindergarten-shape-words` | 4 | Same |
| `kindergarten-family-words` | 6 | Same |
| `kindergarten-school-words` | 7 | Same |
| `kindergarten-body-words` | 8 | Same |
| `kindergarten-feelings-words` | 9 | Same |
| `kindergarten-food-words` | 10 | Same |

These pages had real editorial investment (readiness signals, FAQ, body copy) at the time of archival — the decision to remove them was a curriculum-fit judgment, not a quality judgment.

---

## 6. Relationship to the Dolch Sight-Word Path

`kindergarten-heart-words` (page 11) is a distinct, smaller capstone list — not a replacement for, or a re-run of, the existing `dolch-pre-primer-a/b/c` sequence. Despite 6 of its 8 words (`the, to, a, is, you, said`) overlapping with Dolch Pre-Primer, this overlap is intentional: Heart Words groups words by which specific spelling is irregular and must be learned by heart (a phonics-sequence framing), while Dolch groups words by frequency in early reading (a fluency framing). The same word can reasonably belong to both. **Do not "fix" this overlap by removing words from either list.**

---

## 7. Cross-Reference Map

```
kindergarten-first-words
  ├─ nextLists → kindergarten-short-a-words
  └─ relatedLists → kindergarten-number-color-words, kindergarten-animal-words (supplemental branches)

kindergarten-short-a-words → kindergarten-short-i-words → kindergarten-short-o-words
  → kindergarten-short-u-words → kindergarten-short-e-words → kindergarten-mixed-vowel-cvc-review
  → kindergarten-consonant-digraphs → kindergarten-ck-ending-rule → kindergarten-double-consonants
  → kindergarten-heart-words (end of core sequence)

kindergarten-heart-words
  └─ relatedLists → dolch-pre-primer-a (bridge into the separate Dolch path)

kindergarten-number-color-words     prerequisiteLists → kindergarten-first-words only; nextLists → []
kindergarten-animal-words           prerequisiteLists → kindergarten-first-words only; nextLists → []
```

Each core page's `prerequisiteLists`/`nextLists` points to exactly the previous/next page above; the five vowel-pattern pages (Short A–E, Mixed Vowel Review) additionally cross-list each other in `relatedLists`.

---

## 8. Revision History

| Date | Change |
|---|---|
| 2026-07-08 | Document created. Locked 11-page core curriculum and 2 supplemental pages implemented, superseding the prior thematic-vocabulary approach. 7 thematic pages archived. |
