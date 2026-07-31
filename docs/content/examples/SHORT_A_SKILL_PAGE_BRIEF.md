# Skill Page Content Brief — Short A Words (worked example)

*Completed example using the template at `docs/content/templates/SKILL_PAGE_CONTENT_BRIEF.md`, per `docs/content/CANONICAL_SKILL_PAGE_STANDARD.md` §22. This is an implementation brief for planning purposes — it is not final public prose, and `short-a-words.md` is not rewritten as part of producing this brief. Where current live content differs from what this brief recommends, both are recorded; the current 4-word demonstration set is an audit baseline to evaluate against the Standard, not a requirement to preserve as-is.*

- **Canonical title:** Short A Words
- **Canonical id:** `short-a-words`
- **Skill family:** Short Vowels and CVC Words
- **Instructional variant:** 1 — Sound–spelling patterns
- **Parent Skill family:** Short Vowels and CVC Words (siblings: Short E, Short I, Short O, Short U Words)
- **Skills Hub destination:** Confirmed present in `SPELLING_SKILL_FAMILIES` (`src/lib/content/spellingSkills.ts`) — no change needed.
- **Related Grade Units:** `kindergarten-short-a-words` (Kindergarten) is the primary corresponding Grade Unit; `grade-1-cvc-short-vowels-c-k-rule` (Grade 1) reviews short vowels within the C/K rule unit. Both are expected to declare `short-a-words` in their own `skillIds` — verify at draft time rather than assume; this brief does not add or change any Grade Unit's frontmatter.
- **Primary audience:** A parent or early-elementary teacher helping a child who is just starting to spell CVC words.
- **Primary search intent:** "What is the short a sound / what are short a words" — a direct, teachable explanation of the pattern.
- **Secondary intents:** How is short a different from long a; why is short a taught first; how do I help my child who keeps writing e for a.
- **One-sentence learner competency:** A child who has this concept secure can segment and spell a new, regular short-a CVC word without help.
- **Conceptual scope:** The short /a/ sound as heard in the middle of one-syllable CVC words (cat, hat, pan); segmenting a spoken short-a word into its three sounds; the contrast between short a and the letter name "a"; the contrast between short a and long a (setting up Silent E later).
- **Out-of-scope concepts:** Long A (belongs to `silent-e-long-a` and `vowel-teams-ai-ay`); blends and digraphs with a short-a vowel (belong to `beginning-blends`/`ending-blends`/digraph Skills — mention only as a forward pointer, don't teach here); Kindergarten-specific pacing or word-count targets (belongs to `kindergarten-short-a-words`).
- **Direct-answer requirements:** `shortAnswer` must state the sound in plain terms, give 2–3 anchor examples, and note the CVC regularity that makes it a good starting pattern — the current live value already does this well and can serve as the baseline (see "Current vs. recommended" below).
- **Immediate instructional resource:** A small demonstration set of clearly regular CVC short-a words, plus a fuller instructional example system in the body organized by ending consonant or rime family (e.g. -at, -an, -ad) to show the pattern's productivity — not present in the current body, which uses only inline examples.
- **Demonstration set:**
  - *Current:* `cat, pan, mad, bad` (4 words, in `short-a-words.md` frontmatter `words`).
  - *Recommended:* Audit against Standard §8's screening criteria — all four pass (regular CVC, familiar, no distracting untaught patterns). Consider whether 4 is the right size versus a slightly larger set (e.g. 6–8) that shows a little more of the pattern's range (different ending consonants) while staying well below Practice Set size (`CONTENT_MODEL.md` §4). This is a drafting-time decision, not decided by this brief.
- **Instructional example groupings:** Group by rime family for the instructional example system in the body (e.g. -at: cat, hat, mat, bat; -an: pan, man, can, ran; -ad: bad, mad, sad, dad) — gives the "productivity" of the pattern more visibly than the current single flat list, per Standard §8's grouping requirement (word position/word family is the natural grouping for Variant 1).
- **Core explanation:** How to hear the short a sound (stretch-and-segment technique); why nearly every short-a word is fully regular CVC; the "no exceptions to explain" framing already present in the live body's opening paragraph.
- **What the learner should notice:** That the middle sound stays constant across many different beginning/ending consonants — segmenting reveals the same vowel sound each time.
- **Essential distinction (Level 1):** Short a sound vs. the letter name "a" — already present in the live body implicitly via the segmenting example; should be made explicit per Standard §7's sound-vs-letter rule.
- **Common exceptions (Level 2):** Short a vs. short e confusion (*bad* written as *bed*) — already covered in the live FAQ and body ("What trips children up"); keep, and consider promoting from FAQ-only to a labeled body section per Standard §4.1's required neighboring-pattern-contrast element.
- **Advanced nuance, if needed (Level 3):** Dialect variation in how open/closed the short-a vowel sounds regionally — not currently present; add only a brief note if it would help, not an extended treatment (Standard §9).
- **Primary teaching routine:** Say the word slowly and stretch each sound before writing (already the live body's practice tip) — keep this as the one routine; do not add a second competing routine.
- **Diagnostic response:** Read back exactly what the child wrote and let them locate the sound that needs fixing, rather than correcting the letter directly — already present in the live body; this is the model example cited in the Standard itself (§10).
- **Signs the skill is becoming secure:** Spells a new, unfamiliar regular short-a CVC word from dictation; reads an unfamiliar short-a word correctly; explains in their own words why *cat* isn't spelled *cet*. Not currently present as a labeled section in the live page — a genuine addition under this standard, written as Markdown prose (not `readinessSignals`).
- **Canonical internal links:**
  - `short-e-words` (`relatedLists`, already present) — nearest sound-contrast neighbor, most likely confusion pair (Standard §4.1).
  - `short-i-words`, `short-o-words`, `short-u-words` (`relatedLists`, already present) — sibling short vowels; keep, but the body prose should foreground the short-e contrast specifically rather than treating all four siblings as equally relevant (Standard §12's "don't reuse an identical related-link block" rule).
  - Consider whether `silent-e-long-a` belongs as a `nextLists` entry (currently empty) — short a is the direct precursor to the silent-e long-a pattern; add only if the draft actually sets up that forward connection in prose.
- **FAQ candidates:**
  1. "What is the short a sound and why is it taught first?" *(keep — already live, passes: clarifies scope/rationale)*
  2. "How is short a different from long a?" *(keep — already live, passes: resolves a likely misunderstanding)*
  3. "Should short A words be sounded out or memorized?" *(keep — already live, passes: helps an adult decide what to do)*
- **FAQ justification:** All three existing FAQs each satisfy at least one Standard §13 test and are not repeated in the body verbatim — no changes recommended. Do not add a fourth or fifth FAQ merely to look more complete (Standard §13, §19).
- **Claims requiring verification:** "Short a is usually the first vowel pattern children learn to spell" (developmental/grade-sequence claim) — currently phrased as bounded to this site's own curriculum ("usually"), which is acceptable per Standard §14's ladder without external citation; if strengthened to a general pedagogical claim about all curricula, it would need verification.
- **Sources:** Internal — this site's own frozen Kindergarten/Grade 1 curriculum sequence (`K5_FINAL_CONTENT_ARCHITECTURE.md`) is sufficient basis for the "taught first" claim as currently scoped. No external citation needed at current claim strength (Standard §14).
- **Metadata recommendation:** Current `title`/`description` already follow Standard §17 (specific, non-keyword-stuffed); no changes recommended.
- **Structured-data notes:** Page currently emits `BreadcrumbList` and `FAQPage` only, consistent with current repository capability (Standard §18). Do not add `WebPage`/`Article`/`LearningResource` markup at draft time — that remains a documented future gap, not something this brief or its resulting draft should implement.
- **Visual opportunities for a later phase:** A simple sound-comparison audio or highlighted-letter visual for short a vs. short e; a rime-family grid for the recommended instructional example groupings above. Both explicitly deferred — Markdown/table only for the actual draft.
- **Duplication risks:** `kindergarten-short-a-words` (Grade Unit) must keep its own Kindergarten-specific framing and word count; this Skill page must not adopt Kindergarten-only phrasing ("in Kindergarten, you will...") since the Skill is grade-independent (Standard §2). Checked against the live Grade Unit's existing framing conventions at draft time, not assumed clear here.
- **Editorial status:** Not started
