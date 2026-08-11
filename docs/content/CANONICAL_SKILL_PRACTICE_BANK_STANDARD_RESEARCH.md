# Canonical Skill Practice Bank Standard — Research & Proposed Model

**Status:** Research document. Proposes conclusions for a later, separate `docs/content/CANONICAL_SKILL_PRACTICE_BANK_STANDARD.md`. Not itself a frozen editorial standard. No production code, route, taxonomy, curriculum, Skill page, or architecture document was changed to produce this document.

**Scope:** the educational standard for **Skill practice banks** — the one canonical, grade-independent pool of practice words each of the 41 canonical Skills owns, and which a "Practice this Skill" action on `/skills/{slug}` draws from to launch `/play`.

**Does not govern:** the 41-Skill/12-family taxonomy (`docs/architecture/SKILLS_ARCHITECTURE.md`, frozen), Skill page structure or prose (`docs/content/CANONICAL_SKILL_PAGE_STANDARD.md`, frozen), the Skills Hub (`docs/content/CANONICAL_SKILLS_HUB_STANDARD.md`), Grade Unit Practice Sets (`docs/content/CANONICAL_GRADE_UNIT_PAGE_STANDARD.md`, frozen), the frozen K–5 curriculum, the High-Frequency Words strand, the practice engine's interaction design (`docs/PRACTICE_SESSION_SPEC.md`), or visual design.

**Evidence tags used inline throughout:** **[Repository fact]** — verified by direct read of this repo's files at the current commit. **[External evidence]** — supported by a named, linked outside source (§20). **[Professional/instructional inference]** — a structured-literacy or orthographic judgment made by this document, defensible but not tied to a specific study. **[Product recommendation]** — this document's own design call, which a human may simply overrule.

---

## 1. Executive summary

Skill practice banks are already architecturally approved. The three highest-precedence documents in the project have been amended to permit and require them: `CONSTITUTION.md` §10 now states that "A Skill explains and demonstrates a concept, and also owns exactly one canonical, grade-independent practice bank for that concept"; `CONTENT_MODEL.md` §3/§4 defines the bank as a distinct content identity from both the demonstration and any Grade Unit's Practice Set, and forbids per-grade forks; `SKILLS_MODEL.md` §15 has been reworded to say a Skill page "offer[s] direct practice from its own canonical practice bank." **[Repository fact]** The prior blocking contradiction recorded in `docs/planning/SKILL_PRACTICE_INTEGRATION_PLAN.md` §0 has therefore been resolved in the affirmative and is **no longer open**; that plan's §0/§M-1/§M-2 "hard gate" is satisfied. **This document found no remaining serious architectural contradiction.** Two smaller, real discrepancies are flagged (§2.6, §13.11) rather than silently resolved.

What is *not* yet decided — and what this document decides — is the **educational** standard: what words go in a bank, how big a bank should be, how a session relates to a bank, and what makes a bank ready to publish.

The central finding is that **"20 words per skill" is not a defensible standard, and neither is any other single number.** **[Product recommendation]** The 41 canonical Skills differ in a way that matters mechanically, not just editorially: some (Beginning Blends, CK/Double Letters/TCH-DGE, Multisyllabic Words, Greek and Latin Roots) have a frozen scope that names three to six sub-patterns each of which needs its own exemplars, while others (WH Digraph Words, Long U Silent E Words) have a genuinely closed inventory of roughly a dozen child-usable words and cannot reach 20 without padding that would actively teach the wrong pattern. A flat quota would simultaneously under-serve the first group and corrupt the second.

The proposed standard is therefore **one rule with one honest escape hatch**, which an implementation agent can apply mechanically to all 41 Skills:

1. **Sub-pattern floor.** Every sub-pattern named in the Skill's frozen scope gets **at least 6 pattern-true bank words** (§5, §6).
2. **Size band derived from sub-pattern count.** One sub-pattern → **16–20** words; two → **20–26**; three or more → **26–36** (§6).
3. **Quality override (the escape hatch).** If the pattern-true, age-appropriate, TTS-safe inventory genuinely cannot fill the band, publish the smaller honest bank down to an absolute floor of **12**, and record the reason in the bank file. **Never pad.** (§6.4, §13.1)
4. **Hard ceiling of 36.** Beyond 36 a bank stops adding session variety and starts being the "giant word bank" `CONSTITUTION.md` §9 prohibits (§6.5).

Sessions are governed separately and by an already-decided number: **the default `/play` session drawn from a Skill bank is 10 words**, per `docs/LEARNING_MODEL.md` decision 2, with "practice all N" as an explicit secondary opt-in per decision 3 **[Repository fact]**. This document adopts that unchanged and recommends rejecting the different figure (full bank if ≤18, else cap 16) sketched in `SKILL_PRACTICE_INTEGRATION_PLAN.md` §C3/§E, which is lower-precedence planning material that contradicts a canonical decisions document (§7.2, §13.11).

The 41-Skill audit (§12) was built by reading every canonical Skill's Markdown frontmatter directly. **All 41 canonical Skills exist, resolve to a content file, and carry a demonstration word set — the count is confirmed at 41, matching `CURATED_SPELLING_SKILL_IDS` and `CANONICAL_SKILL_ROUTE_DEFS` exactly.** **[Repository fact]** Current demonstration sets total 296 words across 41 Skills (mean 7.2, range 5–12). Every Skill's existing demonstration set is a viable *seed* for its bank; **no Skill can ship a bank from its demonstration set alone**, and the two meaning-dependent Skills (Homophones, Commonly Confused Words) cannot ship a usable bank at all until disambiguating context sentences are authored, because browser TTS pronounces their target words identically (§9.5, §12, §13.6).

**Verdict:** the capability is educationally sound and architecturally cleared. The standard proposed here is simple enough to apply consistently, but it is deliberately not uniform, because the underlying instructional content is not uniform. Recommended: adopt §5–§11 as the frozen standard, gated on the acceptance criteria in §16.

---

## 2. Repository/current-state findings

### 2.1 Documentary authority is already in place

Read in full for this research: `docs/architecture/CONSTITUTION.md`, `docs/architecture/CONTENT_MODEL.md`, `docs/architecture/SKILLS_ARCHITECTURE.md`, `docs/architecture/SKILLS_MODEL.md` (§15 and practice-related sections), `docs/content/CANONICAL_SKILL_PAGE_STANDARD.md`, `docs/content/CANONICAL_SKILLS_HUB_STANDARD.md`, `docs/content/CANONICAL_GRADE_UNIT_PAGE_STANDARD.md`, `docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md`, `docs/planning/SKILL_PRACTICE_INTEGRATION_PLAN.md`, `docs/content/inventory/skill-pages.md`, `docs/PRACTICE_SESSION_SPEC.md`, `docs/LEARNING_MODEL.md`, `docs/CONTENT_STANDARDS.md`, `docs/architecture/CURRICULUM_MAP.md` (marked *Superseded*), `docs/content/K5_CURRICULUM_COVERAGE.md` (marked *Superseded*), and both prior-art research documents used for house style (`CANONICAL_SKILLS_HUB_STANDARD_RESEARCH.md`, `CANONICAL_GRADE_HUB_STANDARD_RESEARCH.md`).

The load-bearing amendments, quoted:

- `CONSTITUTION.md` §10: *"A Skill explains and demonstrates a concept, and also owns exactly one canonical, grade-independent practice bank for that concept… This keeps exactly one canonical practice bank per concept, owned by the Skill regardless of how many grades reference it — no grade-specific forks of a Skill's bank are permitted."* **[Repository fact]**
- `CONTENT_MODEL.md` §4: *"A Skill's practice bank is an additional canonical source alongside these… A Skill's bank is never forked per grade… A Skill practice session is a selection from the bank, not necessarily the entire bank."* **[Repository fact]**
- `CONTENT_MODEL.md` §4, delegating precisely this document's subject matter: *"its size, structure, and any richer-than-plain-string item shape are defined in implementation-level documentation, not this model."* **[Repository fact]**
- `CANONICAL_SKILL_PAGE_STANDARD.md` §5: *"The demonstration set never launches practice… every canonical Skill page instead offers a separate 'Practice this Skill' action sourced from the Skill's own practice bank (a fourth kind of word content, distinct from all three listed above)."* **[Repository fact]**

So the model already recognises **four** distinct kinds of word content: demonstration set, Skill practice bank, Grade Unit Practice Set, and session words. This document governs the second and its relationship to the other three.

### 2.2 No practice-bank implementation exists yet

A repo-wide grep for `practiceBank`, `wordBank`, `practiceWords`, and `skillPractice` across `src/` and `docs/` returns hits in exactly one file: `docs/planning/SKILL_PRACTICE_INTEGRATION_PLAN.md`. **[Repository fact]** There is no type, no field, no data file, no registry, and no test. `src/content/config.ts`'s `words` union (`z.union([z.string(), z.object({word, hint?, phonicsPattern?})])`) is shared by Grade Units, HFW sets, and theme lists as well as Skills, so it cannot absorb bank-specific metadata without affecting unrelated content.

### 2.3 The 41 canonical Skills — verified count

`CURATED_SPELLING_SKILL_IDS` in `src/lib/content/spellingSkills.ts` is derived by flattening 12 `SPELLING_SKILL_FAMILIES` entries; `CANONICAL_SKILL_ROUTE_DEFS` in `src/lib/content/canonicalSkillRoutes.ts` is an explicit 41-row id→slug manifest. Both were enumerated for this research and cross-checked against `src/content/spelling-lists/**/*.md`: **every one of the 41 ids resolves to exactly one Markdown file with a matching `id:` and a non-empty `words:` frontmatter array. Count confirmed: 41 Skills, 12 families. No discrepancy with the frozen taxonomy.** **[Repository fact]**

A methodological note the task asked about: the `*SkillFamily.ts` files named in the brief **do not exist as implementation modules**. `find src/lib/content -iname "*SkillFamily*"` returns only `.test.ts` files (`shortVowelsSkillFamily.test.ts`, `silentESkillFamily.test.ts`, `vowelTeamsSkillFamily.test.ts`, `rControlledVowelsSkillFamily.test.ts`, `consonantBlendsSkillFamily.test.ts`, `consonantDigraphsSkillFamily.test.ts`, `prefixesSkillFamily.test.ts`, `wordBuildingAndEndingsSkillFamily.test.ts`, `multisyllabicWordsSkillFamily.test.ts`, `homophonesAndConfusedWordsSkillFamily.test.ts`, `greekAndLatinRootsSkillFamily.test.ts`, `commonSpellingPatternsSkillFamily.test.ts`). The family *definitions* live as `as const` objects in the single file `spellingSkills.ts`; the per-family word content lives in the Markdown files. The §12 audit is therefore built from the Markdown frontmatter, which is the actual source of truth, not from the (non-existent) family modules. **[Repository fact]**

### 2.4 Demonstration-set sizes today

Extracted directly from frontmatter. Total 296 words across 41 Skills; **mean 7.2, median 6, range 5–12**. Distribution: 5 words (×9), 6 (×13), 7 (×6), 8 (×8), 9 (×2), 10 (×4), 12 (×2). The two 12-word sets are `vowel-teams-ai-ay` and `vowel-teams-ee-ea`. **[Repository fact]** These sets are small, curated, and — per `inventory/skill-pages.md`'s per-page notes — have been actively *trimmed* during editorial passes ("demonstration set trimmed," "trimmed to 5 unpadded words," "re-curated to remove a competing untaught pattern"). The demonstration layer is healthy and is not the problem this document solves.

### 2.5 Instructional word material already authored in the Skill page bodies

Every Skill page body carries word-family tables and italicised in-prose examples well beyond its demonstration set. A conservative extraction (table cells plus italic runs, unfiltered for non-target tokens) gives a rough breadth signal per Skill, ranging from ~15 (Long U Silent E) to ~106 (CK/Double Letters/TCH-DGE) and ~100 (Greek and Latin Roots). **[Repository fact]** This matters for §12's "could current words seed a bank" column: for most Skills the answer is that the *demonstration set alone* cannot, but the demonstration set *plus the page's own already-screened instructional examples* is a strong, already-editorially-vetted starting pool. Bank authoring is largely a promotion-and-extension job, not a from-scratch job — with the two meaning-dependent Skills as the exception (§9.5).

### 2.6 Curriculum placements — every Skill has at least one

Scanning every content file's `skillIds` gives 56 Grade Unit → Skill placements across the 41 Skills. **Every Skill has ≥1 placement**, so `CONTENT_MODEL.md` §10's "zero placements → stays draft" rule currently binds nothing. Distribution: 33 Skills have exactly 1 placement; `digraph-ch/sh/th-words` and `commonly-confused-words` have 2; `ck-tch-dge-word-endings`, `common-prefixes`, and `greek-and-latin-roots` have 3; `multisyllabic-words` has 6. **[Repository fact]**

This is directly relevant to §11: the Skills with the *most* grade placements (Multisyllabic Words, Common Prefixes, Greek and Latin Roots, CK/TCH/DGE) are the same Skills whose scope names the most sub-patterns, which is exactly why they need the largest banks. Their banks serve real cross-grade re-entry, not just a bigger word count.

**Small flagged discrepancy (not architectural):** `CONTENT_MODEL.md` §10's justification for the draft rule is that a placement-less Skill *"has no route into the practice experience."* Once Skill practice banks ship, that justification no longer holds — a Skill with zero placements would have its own practice route. The rule's *effect* is currently moot (all 41 have placements), but its stated *reason* is now stale. Flagged for a future editorial pass on that paragraph; not resolved here. **[Repository fact]**

### 2.7 The practice engine, as it will receive a Skill session

- **Route:** `/play?list=<payload>`. `encodeWordList` normalises, dedupes, and base64url-encodes plain words; `MAX_WORD_COUNT = 200`, `MAX_PAYLOAD_LENGTH = 4096`. **[Repository fact]** The proposed 36-word ceiling is far below both limits — serialization imposes **no** constraint on any bank size under discussion.
- **Rich payload:** `sessionStorage['sw:words:' + payload]` carries `{word, exampleSentence}[]`, already shipped and already used to survive navigation. This is the existing, no-new-code path by which a Skill bank could supply a per-item context sentence (§9.5). **[Repository fact]**
- **Evaluation:** `compareWords` via `normalizeWord` — case-insensitive, accent-sensitive, exact match. Requires only the target string; a sentence is never graded. **[Repository fact]**
- **Audio:** the isolated word is spoken first, then (if present) the sentence ~1s later, in a fixed order. **[Repository fact]** §9.5 identifies this order as the one genuine engine gap for the meaning-dependent Skills.
- **Session size is not a concept in the engine at all** — a session is exactly the words encoded into the URL. Every existing launch site encodes its entire list. Bank→session selection is therefore new logic that must live in `src/lib/`, not in the engine. **[Repository fact]**

### 2.8 Grade Unit Practice Sets, measured

Across the 51 files carrying `contentRole: grade-unit`, practice-set sizes are: 6 (×1), 8 (×7), 9 (×2), 10 (×7), 12 (×27), 13 (×2), 14 (×1), 15 (×1), 18 (×3). **Modal size is 12; 47 of 51 sit inside the frozen 8–16 guideline**, with three 18-word sets and one 6-word set as the documented exceptions `CANONICAL_GRADE_UNIT_PAGE_STANDARD.md` §5 already allows for frozen-curriculum inventories. **[Repository fact]** This gives §11 a hard number to design against: a Skill bank at 16–36 is 1.3×–3× a typical Grade Unit set, which is enough to be visibly a different kind of object without being a word dump.

---

## 3. External educational evidence

**Honesty note on sourcing.** The network egress proxy in this environment blocked full-text fetches from `link.springer.com`, `nature.com`, `readingrockets.org`, `irrc.education.uiowa.edu`, and `education.ufl.edu`. Where a source below is cited, the citation metadata (authors, year, journal, volume, page range, URL) came from search-result records that returned it verbatim, and the summarised finding came from those same records — **not** from reading the full paper in this session. No claim below is attributed to a source that this document could not confirm exists at the cited URL. Where no source could be confirmed, the claim is tagged **[Professional/instructional inference]** instead of dressed up as evidence.

### 3.1 Explicit spelling instruction works, and it is a distinct skill from reading

Graham & Santangelo's meta-analysis (53 studies, 6,037 students, K–12) reported that formal spelling instruction outperformed no or unrelated instruction with an overall effect size around **d = 0.54**, with benefits sustained over time, and that it improved spelling, phonological awareness, and reading. **[External evidence]** This underwrites the whole feature: a grade-independent bank that lets a learner practise one pattern repeatedly is a legitimate instructional object, not a convenience feature.

### 3.2 Spelling is encoding — words must be selected for their *spelling* demand

Structured-literacy sources are consistent that encoding practice "forces the child to think about every sound in a word and choose the correct letter or letter pattern," and that programs should teach patterns systematically, starting with the most common and predictable, "ensuring that students are never asked to read words containing patterns they have not yet been taught." **[External evidence]** Two direct consequences for bank authoring, adopted in §5: (a) a bank word must be *spellable from the pattern*, not merely *contain* the pattern; (b) a bank word must not smuggle in a second, harder, untaught pattern that dominates the encoding decision. This repo already applies exactly that rule editorially — `inventory/skill-pages.md` records `black` being removed from Beginning Blends "to remove a competing untaught pattern (`black`'s ck ending)" and `fire` dropped from Long I Silent E as an "r-controlled-vowel confound." **[Repository fact]** The standard in §5 formalises existing practice rather than importing a foreign one.

### 3.3 Word-list size: real-world practice clusters at 10–24, and never at one number

Reported classroom and program practice: weekly lists "of about 10 to 20 words, focusing on two or three different spelling patterns"; some programs at 10 per list; some recommending 15–20 pattern words; some using 20 pattern words plus 5 review words. **[External evidence]** Words Their Way's *Word Sorts for Syllables and Affixes Spellers* uses **24 words per sort** at that developmental stage. **[External evidence]**

Two things follow. First, the *practised set* per sitting sits near the low end (10–20), which corroborates this repo's already-frozen 10-word default session (§7). Second, the *authored pool* legitimately sits higher (20–24 at the affixes stage), which corroborates a bank being larger than a session. Notably, the sources describe list size varying with what is being taught ("two or three different spelling patterns," a stage-specific 24) — **no source found in this research prescribes a single universal number across all spelling concepts.** That absence is itself the strongest available evidence against a flat "20 words per skill" rule.

### 3.4 Retrieval practice and spacing favour a bank larger than a session

Retrieval-based practice and spaced/distributed practice are well-supported for encoding and retention, benefits are additive when combined, and retrieval-practice effects have been demonstrated specifically for **spelling** in fifth-grade children and in real primary-school settings. **[External evidence]** The practical implication for this standard: a bank meaningfully larger than one session lets repeat visits produce genuinely different retrieval events rather than a re-read of the same ten items, which is exactly the mechanism these findings favour. It also argues against the site ever adding a "seen words" memory to force novelty — the bank/session ratio delivers variety without state, accounts, or tracking, all of which `CONSTITUTION.md` §13 restricts. **[Professional/instructional inference]**

### 3.5 Morphology instruction earns richer item structure

Bowers, Kirby & Deacon's systematic review (22 studies, preschool–Grade 8) concluded that morphological instruction benefits learners, brings particular benefits to less able readers, is no less effective for younger students, and is **more effective when combined with other aspects of literacy instruction**. **[External evidence]** Manyak, Baumann & Manyak (2018) built and published a curated high-utility affix-and-root list specifically for grades 3–5, i.e. treating *which morphemes to teach* as a selection problem with explicit criteria rather than an inventory problem. **[External evidence]**

Consequence adopted in §9.3: for the morphological Skills, a bank item's instructional value is the **base → derived relationship**, not the derived string alone, and banks for those Skills should carry the base explicitly. "Combined with other aspects of literacy instruction" also supports keeping morphology banks anchored to bases the learner can already spell (§5, rule 4).

### 3.6 Homophones: the one place where isolated dictation cannot work

Instructional guidance on homophones is consistent on the mechanism even where it differs on sequencing: homophones "get tangled up in your brain when met all at once," and a common recommendation is to establish one member of a set before introducing the other, while pairing homophone teaching to phonics patterns already taught (teach *mail/male* after `ai` and `a_e`). Teaching a pair simultaneously is described as acceptable mainly for older students who already own both patterns and both meanings. **[External evidence]**

This maps onto a hard technical constraint in this repo: browser TTS pronounces `their`/`there`/`they're` identically, so an isolated-word prompt is not merely suboptimal for these Skills — it is *unanswerable*. `docs/CONTENT_STANDARDS.md` already encodes the analogous rule for heteronyms (spelling-only entry, `sentenceOmissionReason: 'heteronym'`, no sentence, "do not invent a sentence to make it fit"). **[Repository fact]** §9.5 and §13.6 treat this as the single largest content dependency in the whole feature.

### 3.7 What the evidence does *not* settle

No source found in this research specifies an optimal bank-to-session ratio, an optimal number of exemplars per orthographic sub-pattern, or a maximum useful pool size for self-directed practice. The "≥6 per sub-pattern" floor in §6 and the 36-word ceiling are **[Professional/instructional inference]** and **[Product recommendation]** respectively, calibrated against the observed 10–24 range in §3.3 and this repo's own constraints — not derived from a study.

---

## 4. Canonical definition of a Skill practice bank

**Proposed canonical definition** — intended to be lifted verbatim into the frozen standard. **[Product recommendation]**

> A **Skill practice bank** is the single canonical, grade-independent, editorially curated pool of practice words owned by one canonical Skill, from which every "Practice this Skill" session is drawn. It exists to let a learner practise one spelling concept directly and repeatedly, independent of any grade sequence.
>
> A Skill practice bank:
>
> 1. **is owned by exactly one Skill, and every canonical Skill owns exactly one.** No Skill has two banks; no bank is shared between Skills; no bank is ever forked per grade, per difficulty tier, or per grade band (`CONSTITUTION.md` §10). **[Repository fact]**
> 2. **is grade-independent.** It carries no grade field, is not sequenced against any Grade Roadmap, and is not calibrated to the grade in which the concept is first taught (§8).
> 3. **is a pool, not an assignment.** Its size is a fact about the concept's coverage, not an instruction about how much to practise at once — the Collection/Session distinction in `docs/LEARNING_MODEL.md`, applied to Skills. A session is a bounded selection from it (§7).
> 4. **is distinct from the Skill's demonstration set.** The demonstration teaches the pattern on the page and never launches practice; the bank is what practice draws from. They may overlap at the word level but are separately authored sets with separate rules (§10).
> 5. **is distinct from every Grade Unit's Practice Set.** A bank is never a copy, superset, or concatenation of Grade Unit sets, and never replaces the Skill's curriculum-placement links (§11).
> 6. **is bounded by the Skill's own frozen scope.** A bank may only contain words that fall inside the scope `SKILLS_ARCHITECTURE.md` §3 defines for that Skill, including its explicit scope boundaries against neighbouring Skills. A bank must never be used to quietly widen a Skill's scope (§13.4).
> 7. **is complete enough to be worth practising more than once.** A bank whose whole content fits in one default session provides no repeat value and fails this definition; the minimum viable bank is materially larger than one session (§6).
> 8. **is curated, not generated.** Every word is a deliberate editorial choice under §5. A bank that could have been produced by filtering a corpus for a substring is disqualified under `docs/CONTENT_STANDARDS.md`'s "No AI-generated filler" and "quality over quantity" rules. **[Repository fact]**

**What a Skill practice bank is not:** a word list page; an indexable destination; a complete inventory of English words containing the pattern; a difficulty ladder; a placement test; a Grade Unit; a substitute for the Grade Unit route.

---

## 5. Word-selection standard

Seven ordered filters. A candidate word must pass **all** of them. Applied in order, because failing an early filter makes later ones moot. **[Product recommendation]**, built on **[External evidence]** (§3.2) and existing repo precedent **[Repository fact]**.

### Filter 1 — Pattern-true

The word must genuinely exemplify the Skill's target pattern **in the target position and with the target sound**. Not "contains the letters." `head` is not an EE/EA bank word (the `ea` is /e/, not /ē/); `through` is not an OU/OW word (not /aʊ/); `war` is not an AR word (/or/); `word` is not an OR word (/er/); `ie` in `field` is not the IE/IGH long-I pattern; `school` is not a CH digraph word. **[Professional/instructional inference]**

For Skills whose scope names sub-patterns, each bank word is tagged with the one sub-pattern it exemplifies (§9.2). A word that exemplifies none, or ambiguously two, fails.

### Filter 2 — No dominant competing pattern

The word must not contain a second orthographic feature that is *harder, later-taught, or more salient* than the target. This is the rule the repo already applies (`black` removed from Beginning Blends for its `ck`; `fire` removed from Long I Silent E for the r-controlled confound). **[Repository fact]** Formalised: if a learner who has just been taught this Skill's pattern would still plausibly misspell the word *for a reason unrelated to this pattern*, the word tests something else and does not belong in this bank.

This filter is the single most common reason to reject an otherwise attractive word, and it is what keeps a "grade-independent" bank from silently drifting upward in difficulty (§8.3).

### Filter 3 — Encodable from the pattern

A learner who owns the pattern must be able to *produce* the spelling, not merely *recognise* it. Irregular or unpredictable spellings are excluded, **except where irregularity is the Skill's subject** — Homophones, Commonly Confused Words, and the deliberately irregular members inside Silent Letters and Soft C/Soft G's exception discussions (which are page content, not bank items — see Filter 7). A word requiring memorisation rather than encoding belongs to the High-Frequency Words strand, which is a different content identity with its own frozen curriculum. **[Repository fact]**

Schwa is the sharpest form of this filter: in multisyllabic and Greek/Latin words, an unstressed vowel gives the speller no phonological information at all (`separate`, `definite`, `national`). Such words are admissible **only** when the Skill's own instructional logic supplies the missing information — e.g. a morphological relative that stresses the vowel (`nation` → `national`). Otherwise they fail. **[Professional/instructional inference]**

### Filter 4 — Age-appropriate and meaning-known

Governed unchanged by `docs/CONTENT_STANDARDS.md`'s Vocabulary Rules: common elementary vocabulary; curriculum words; words with real reading-life payoff. Excluded: obscure or archaic words, slang, proper nouns and brand names (with that document's stated closed-set exception for days and months), and any word whose only justification is search volume. **[Repository fact]**

For morphological Skills there is an additional clause: **the base must itself be spellable by a learner at the level the derived word targets.** `unhappy` is a good `un-` item because `happy` is known; a prefix attached to a base the learner cannot spell tests the base, not the prefix. **[Professional/instructional inference]**, supported by §3.5's "more effective when combined with other aspects of literacy instruction" **[External evidence]**.

### Filter 5 — Dictation-safe

Every bank word must work as an audio prompt through the site's actual TTS path (`src/modules/speech/`, default voice per `voiceSelection.ts`). Concretely:

- **Heteronyms** follow the existing frozen rule in `CONTENT_STANDARDS.md` — spelling-only, no invented sentence. **[Repository fact]** In practice this means a heteronym is admissible as a bank word only where the isolated pronunciation is unambiguous for the target spelling.
- **Homophones and near-homophones** are inadmissible as bare items. Either exclude them, or (only in the two Skills whose subject they are) include them with a mandatory disambiguating context sentence (§9.5).
- **Dialect-sensitive items** get an explicit check: the cot–caught merger (Short O, AU/AW), the wine–whine merger (WH), and regional `oo` variation (`roof`, `room`). A word whose target sound is absent in a substantial share of American English is a poor bank item even when it is a perfect textbook example. **[Professional/instructional inference]**
- **Punctuated targets** (Contractions) must be verified against `normalizeWord`/`compareWords` before the bank is authored, not after (§13.8).

### Filter 6 — Sub-pattern coverage, not frequency ranking

A bank must distribute across the sub-patterns its Skill's scope names, rather than over-sampling whichever rime family is most productive. Fifteen `-at`/`-an` words is a worse Short A bank than eight rime families of two or three. This is the bank-level expression of the same instinct the Skill pages already show, where word-family tables group by rime rather than listing. **[Repository fact]** Operationalised as the ≥6-per-sub-pattern floor in §6.1.

### Filter 7 — Positive examples only; contrasts are page content, not bank items

A bank contains **targets** — words the Skill's rule produces correctly. Words that exist to show where the rule does *not* apply (`get`, `give`, `girl` for Soft G; `hopeful`, `carrying` for Spelling Rules for Adding Suffixes; `gone`, `done`, `some` for Long O Silent E) are **exceptions and contrasts, and belong on the Skill page's prose, not in the practice bank.** **[Product recommendation]**

This is a deliberate divergence from `SKILL_PRACTICE_INTEGRATION_PLAN.md` §C1's proposed `role: 'target' | 'contrast'` field. The reasoning: a `/play` session gives no explanation — the learner hears a word, types it, and sees right or wrong. A contrast item delivered through that channel is indistinguishable from a target and therefore teaches the *opposite* generalisation from the one intended. There is exactly one defensible exception, and it is Spelling Rules for Adding Suffixes, where "no change" is genuinely one of the four rule outcomes rather than an exception to the rule (§9.2, §12 row 34) — there, `hopeful` is a *target* of the "keep the e before a consonant suffix" rule, not a contrast, and needs no special field. With that reframing, `role` is unnecessary across all 41 Skills, and the data model gets simpler.

### Cross-cutting: overlap between Skills is expected and permitted

`fish` legitimately sits in both Short I Words and SH Digraph Words; `night` in both IE/IGH and (potentially) Silent Letters. `CONTENT_MODEL.md` §3 explicitly permits purposeful word-level overlap. **[Repository fact]** No cross-Skill uniqueness rule should be written, and no test should assert one. What *is* prohibited is a bank that duplicates another bank *as a whole* — that would mean two Skills have the same scope, which is a taxonomy problem, not a bank problem.

---

## 6. Bank-size recommendations

### 6.1 The rule

**[Product recommendation]**, calibrated against **[External evidence]** §3.3 and this repo's measured content **[Repository fact]** §2.4–§2.5.

Let *n* = the number of distinct sub-patterns the Skill's **frozen scope** (`SKILLS_ARCHITECTURE.md` §3, plus the Skill page's own named sections) requires it to cover.

| Rule | Statement |
|---|---|
| **R1 — Sub-pattern floor** | Every named sub-pattern receives **≥6 pattern-true bank words**. |
| **R2 — Size band** | *n* = 1 → **16–20** words. *n* = 2 → **20–26**. *n* ≥ 3 → **26–36**. |
| **R3 — Quality override** | If §5's filters cannot fill the band, publish the smaller honest bank, down to an **absolute floor of 12**, and record the shortfall reason in the bank file. Padding is a defect, not a compromise. |
| **R4 — Ceiling** | **36 words, hard.** No Skill bank exceeds 36 regardless of *n* or available inventory. |
| **R5 — Repeat-value minimum** | A bank must be at least **1.5× the default session size** (i.e. ≥15) to be considered *complete*; a bank between 12 and 14 is publishable only under R3 and must be labelled as inventory-limited. |

R1 is the rule that does the real work. R2 falls out of it almost mechanically (6 words × *n* sub-patterns, plus headroom for the most productive one), which is why the standard stays applicable by an implementation agent without per-Skill judgement calls: *count the named sub-patterns, read the band off the table, check the floor.*

### 6.2 Why not one flat number

Applying a flat 20 to the audited data produces two distinct failure modes, both real:

- **Padding failures.** WH Digraph Words has roughly 13 usable items in its own page body, of which `who`, `whom`, `whose`, `whole` are the /h/ group — a different sound. Long U Silent E Words has ~9 (`cube, cute, rule, flute, huge, prune, mule, fuse`, plus a handful more). Reaching 20 for either requires importing words that fail Filter 1 or Filter 4. A padded WH bank does not teach WH better; it teaches that WH is bigger and messier than it is. **[Repository fact]** + **[Professional/instructional inference]**
- **Capping failures.** CK/Double Letters/TCH-DGE covers four separately-conditioned conventions; a 20-word cap gives each five words, below any reasonable exemplar count, and forces the author to under-serve one convention. Multisyllabic Words must cover six syllable types plus two required named sections and carries 6 Grade Unit placements — a 20-word bank there is roughly three words per syllable type. **[Repository fact]**

### 6.3 Why not per-family sizing

An intuitive alternative is to size by the 12 families. It fails on inspection: within Vowel Teams, AI/AY is broad and IE/IGH is deliberately asymmetric and narrow; within Silent E, Long A is broad and Long U is nearly closed; within Common Spelling Patterns, CK/TCH/DGE needs 4 sub-patterns and Soft C/Soft G needs 2. Family membership predicts bank size poorly. Sub-pattern count predicts it well, and is a property an author can *count* rather than *judge*. **[Professional/instructional inference]**

### 6.4 What the quality override means in practice

R3 is not a licence to under-author. It applies **only** when a genuine, documented inventory limit exists — a closed set (Contractions), a small phonotactic inventory (WH, Long U Silent E, final `-ie`, /ʊ/ `oo`, `-mb`), or a scope boundary that hands most candidate words to a neighbouring Skill (CH Digraph Words, whose `-tch` words belong to CK/TCH/DGE). It requires a one-line recorded reason. An author who cannot state such a reason has not finished searching for words. **[Product recommendation]**

Predicted from §12: **six Skills** are likely to invoke R3 — WH Digraph Words, Long U Silent E Words, IE and IGH Words (final `-ie` sub-pattern only), Silent Letters (`-mb` sub-pattern only), Contractions, and possibly OO Words (/ʊ/ sub-pattern). In four of these the shortfall is at the *sub-pattern* level (R1) rather than the *total* level (R2), which the frozen standard should permit explicitly.

### 6.5 Why 36 is the ceiling

Three converging reasons. **[Product recommendation]**

1. `CONSTITUTION.md` §9 prohibits a page containing "a giant word bank." A 36-word bank at a 10-word default session already yields distinct sessions across several visits; the marginal variety of word 37 is negligible. **[Repository fact]**
2. `CONTENT_STANDARDS.md`'s "quality over quantity" and per-word editorial-judgement requirements make each additional word a real authoring and QA cost across 41 Skills. **[Repository fact]**
3. Above ~36, the §5 filters get quietly relaxed to hit the number — which is the padding failure mode arriving through the back door.

### 6.6 Aggregate implication

Applying R1–R5 to the §12 audit gives an estimated **total corpus of roughly 850–950 authored bank words across all 41 Skills** (versus 296 demonstration words today), of which a substantial fraction already exists in screened form inside the Skill page bodies (§2.5). This is a large but bounded content project, and it is the number a human should react to before the standard is frozen. **[Repository fact]** for the inputs; the total is this document's arithmetic.

---

## 7. Session-size and practice-behaviour recommendations

### 7.1 Default session size: 10 words, unchanged

`docs/LEARNING_MODEL.md` decision 2 already states: *"The default session size for curated library lists is **10 words**. This keeps a sitting short enough to match the attention span of the app's core audience (roughly ages 6–10) while still being a meaningful amount of practice."* Decision 3 states full-collection practice is *"an explicit opt-in."* **[Repository fact]**

**Recommendation: adopt both unchanged for Skill practice.** **[Product recommendation]** A Skill bank is precisely the "canonical collection" that document describes; a Skill session is precisely its "session." No new session-size concept is needed, and inventing one would fork a settled decision. The external picture (§3.3) — practised sets clustering at 10–20, authored pools at 20–24 — is consistent with a 10-word session drawn from a 16–36-word bank.

### 7.2 Flagged conflict with the prior planning document

`SKILL_PRACTICE_INTEGRATION_PLAN.md` §C3/§E proposes a different default: *"the full bank for banks ≤ ~18 items and… a fixed cap (e.g. 16) for larger ones."* **[Repository fact]** This conflicts with `LEARNING_MODEL.md`'s 10-word default and, for small banks, eliminates the bank/session distinction entirely.

**Recommendation: `LEARNING_MODEL.md` governs; the planning document's figure should not be implemented.** **[Product recommendation]** Rationale: (a) `CONSTITUTION.md` §17 places technical/PR-specific implementation plans at precedence tier 5, below curriculum and content decisions; (b) a session equal to the whole bank makes repeat visits identical, forfeiting the retrieval-variety benefit that justifies having a bank (§3.4); (c) 16 words at ages 6–10 exceeds the attention-span reasoning `LEARNING_MODEL.md` gives for 10. This is a real, resolvable discrepancy, reported rather than silently overridden.

### 7.3 Selection algorithm

**[Product recommendation]**, deliberately minimal:

1. **Shuffle the full bank** using the existing pure, RNG-injectable Fisher–Yates in `src/modules/spellingTest/order.ts` — reuse, do not reimplement. **[Repository fact]**
2. **Take 10** (or the whole bank if it holds fewer than 10, which R5 makes unlikely).
3. **Sub-pattern balancing, where sub-patterns exist:** guarantee at least one word from each named sub-pattern before filling the remainder randomly, *when the session size allows*. For *n* ≤ 4 this is always satisfiable at 10 words. For the two Skills where *n* could exceed 6 (Multisyllabic Words' syllable types; Common Suffixes' suffix set), guarantee coverage of a rotating subset rather than all of them.
4. **No state.** No "seen words" memory, no localStorage, no progress tracking. Repeat visits reshuffle. This is required by `CONSTITUTION.md` §13's privacy and no-accounts posture and is sufficient because bank size ≥ 1.5× session already produces variety. **[Repository fact]**

Recommendation 3 is a small, deliberate scope increase over the planning document's "plain shuffle-and-cap," and it is worth it: without it, a 30-word CK/FLOSS/TCH/DGE bank can produce an all-`ck` session that silently misrepresents the Skill. It is ~15 lines of pure, testable function. **[Product recommendation]**

### 7.4 Practice behaviour on the Skill page

- **CTA copy** should differ from the Grade Unit's "Start practice" so a parent who lands on both can tell them apart. `SKILL_PRACTICE_INTEGRATION_PLAN.md` §E's "Practice these words" is reasonable; **[Product recommendation]** this document mildly prefers **"Practice this Skill"**, matching the phrasing already written into `CANONICAL_SKILL_PAGE_STANDARD.md` §5 and `CONSTITUTION.md` §10. **[Repository fact]** Final wording is editorial.
- **Session count should be stated** — "Practice 10 of the 24 words for this Skill" — because it makes the bank/session distinction visible to the adult and matches the count-forward pattern Grade Units already use. **[Product recommendation]**
- **Immediate start.** Reuse `/play`'s existing begin screen as the only checkpoint; no Skill-specific setup screen (`CONSTITUTION.md` §13: "minimal setup"). **[Repository fact]**
- **Full-bank opt-in** should exist as a clearly secondary affordance ("Practice all 24"), per `LEARNING_MODEL.md` decision 3, not as the primary button. **[Repository fact]**
- **No gamification of any kind** attaches to bank completion — no "you've now seen every word," no coverage meter, no streaks. `CONSTITUTION.md` §13 and `LEARNING_MODEL.md` decision 6. **[Repository fact]**

---

## 8. Grade-independence and difficulty recommendations

### 8.1 One bank, no tiers — already frozen, and correct

`CONSTITUTION.md` §10 forbids grade-specific forks; `CONTENT_MODEL.md` §4 repeats it. **[Repository fact]** This document endorses it on the merits, not merely by inheritance: a per-grade Skill bank would recreate the Grade Unit, which is the content identity that already exists for exactly that purpose (§11). The site would then have two grade-calibrated word sets for one concept, differing only in which page they hang from — the duplicate-intent failure `CONSTITUTION.md` §15 warns against. **[Professional/instructional inference]**

### 8.2 No difficulty selector, no difficulty tiers inside the bank

**[Product recommendation]** Rejected: an "easy/hard" toggle, a `difficulty` field per item, and a beginner/advanced split within a bank. Reasons: (a) it is a setup step, against `CONSTITUTION.md` §13's minimal-setup principle; (b) it asks an adult to make a judgement the site has no data to inform; (c) it is a re-introduction of grade-tiering under another name; (d) it doubles the authoring surface for every one of 41 Skills.

### 8.3 Difficulty is controlled in *authoring*, not at runtime — the accessibility ceiling rule

Since selection is a shuffle, **every word in a bank must be an acceptable session word for the learner the Skill targets.** Formalised as one authoring constraint: **[Product recommendation]**

> **Accessibility ceiling.** A bank word must be spellable by a learner who has just been taught this Skill's pattern and nothing later. If a word requires a later-taught pattern, a longer word shape, or vocabulary beyond the Skill's own level, it fails Filter 2 or Filter 4 and does not enter the bank — regardless of how well it exemplifies the pattern.

This is what makes grade-independence *work* rather than merely be declared. A Silent Letters bank containing `psychology` and `rhythm` would be grade-independent on paper and unusable in practice. The ceiling is set by the Skill's own concept, not by any grade's roadmap position — which is exactly the distinction `CONSTITUTION.md` §7 draws between skills and grades. **[Repository fact]**

### 8.4 Bank ordering

Author banks in rough simple → complex order (consistent with `LEARNING_MODEL.md`'s guidance that "curated collections are typically taught in a rough frequency or difficulty order"). **[Repository fact]** With shuffled selection this ordering is not load-bearing at runtime, but it makes the bank readable, makes the "practice all N" opt-in sensible, and gives a future full-bank session a natural sequence. It should be a *soft* authoring convention, not a tested invariant. **[Product recommendation]**

### 8.5 What a learner needing harder words does instead

Routes to a Grade Unit via the Skill page's existing curriculum-placement links — the path `CONTENT_MODEL.md` §3 describes as the complementary one. **[Repository fact]** This is the honest answer to "but a Grade 5 learner practising Multisyllabic Words needs harder words than a Grade 2 learner": they do, and that is what the six Grade Units linked from that Skill provide (§2.6). The bank's job is the concept; the Grade Unit's job is the grade.

---

## 9. Skill-type differences

Five types. Every one of the 41 Skills belongs to exactly one. Assignment per Skill is in §12. **[Product recommendation]**, informed by §3.

### 9.1 Type A — Single-pattern phonics Skills (*n* = 1)

**Members (23):** the five Short Vowels; SH, CH, TH, WH Digraph Words; the four Silent E vowels; AR and OR Words; AI/AY, EE/EA, OA/OW, OI/OY, OU/OW; Beginning Blends and Ending Blends (see note); Compound Words (see note).

Plain strings suffice. No metadata, no sub-groups, no sentences. Shuffle-and-take-10 is fully adequate. Band 16–20 under R2.

*Note on Blends:* Beginning Blends and Ending Blends are formally one pattern (adjacent consonants, both heard) but in practice cover ~20 and ~11 distinct blends respectively. Treat their blend *classes* (l-blends, r-blends, s-blends, three-letter blends; and for endings, nasal+stop, s-blends, l-blends) as sub-patterns for R1/R2 purposes, giving *n* = 3–4. This is the one place where the sub-pattern count is a judgement rather than a reading of the scope, and §12 records it explicitly.

*Note on Compound Words:* structurally a morphological Skill, but its practical selection problem is the opposite of Type C's — the inventory is effectively unbounded, so the work is curation for component-transparency and child familiarity, not sourcing. Bank items are plain strings; recording the two components is useful for authoring/QA only.

### 9.2 Type B — Multi-condition orthographic-rule Skills

**Members (7):** CK/Double Letters/TCH-DGE (`ck`, FLOSS, `tch`, `dge` → *n* = 4); Silent Letters (`wr`, `kn`, `mb` → *n* = 3); Soft C and Soft G (*n* = 2); Long U Silent E (/yū/, /ū/ → *n* = 2); OO Words (/ū/, /ʊ/ → *n* = 2); IE and IGH Words (final `-ie`, `igh` → *n* = 2); ER/IR/UR Words (*n* = 3).

These need one added piece of data per item: **a sub-pattern tag** (a short string such as `ck`, `floss`, `tch`, `dge`). It drives R1 validation and §7.3's balanced selection. It is never shown to the learner and never used in grading.

Spelling Rules for Adding Suffixes also belongs here (*n* = 4: doubling, drop-e, y→i, no-change) — with the reframing from §5 Filter 7 that "no change" is a rule outcome and therefore a target, which removes the need for a separate contrast concept.

ER/IR/UR deserves a specific note: it is the site's purest *encoding-choice* problem — one sound, three spellings, no phonological cue. **[Professional/instructional inference]** Its bank should lean on high-frequency, meaning-anchored words the learner meets in print, because there is no rule to fall back on; and its sub-pattern balance matters more than anywhere else, since a session skewed to `er` would misrepresent the entire difficulty.

### 9.3 Type C — Morphological Skills

**Members (7):** Plural Words with -s and -es; Words Ending in -ed and -ing; Common Suffixes; Un- and Re- Prefixes; Common Prefixes; Greek and Latin Roots; Contractions.

Backed by §3.5's **[External evidence]** that morphological instruction is effective and is more effective combined with other literacy work. Three consequences: **[Product recommendation]**

1. **Items carry their base** (`carry` for `carried`; `happy` for `unhappy`; `do not` for `don't`). The base is authoring/QA data, and the raw material for any future explanatory UI — it is *not* spoken or shown during a session.
2. **The bank is counted in derived forms**, not in bases. A `-ed`/`-ing` bank of 24 means 24 practice targets, which may come from 12 bases.
3. **Base and derived form must not appear in the same session** where the base is itself a bank item (a live concern for Common Suffixes and Greek and Latin Roots) — hearing `nation` immediately before `national` hands over the answer. This is a small constraint on §7.3's selection function. **[Professional/instructional inference]**

Contractions sits here with a technical caveat rather than an instructional one (§13.8): it is the only Skill whose targets contain punctuation, so `normalizeWord`/`compareWords` behaviour on the apostrophe (including the curly `’` vs straight `'` distinction, both of which appear in this repo's content) must be verified *before* authoring.

### 9.4 Type D — Multisyllabic Words (its own type, *n* = 6+)

One Skill, but genuinely unlike the others: its organising dimension is **syllable type** (closed, open, VCe, vowel team, r-controlled, consonant-`le`), with Open Syllables and Consonant-LE required as named sections by the frozen architecture. **[Repository fact]** It carries 6 Grade Unit placements, the most of any Skill.

Its sub-pattern tag is the syllable type. Its band is 26–36 under R2, with R1 giving ≥6 per syllable type — the arithmetic is tight (6 × 6 = 36) and this document accepts that the bank will sit at or near the ceiling, or that a couple of syllable types will be represented at the floor exactly. It is also the Skill where Filter 3's schwa clause bites hardest: a very large share of natural multisyllabic words are un-encodable by sound in their unstressed syllable. Expect the highest rejection rate here of any Skill. **[Professional/instructional inference]**

### 9.5 Type E — Meaning-dependent Skills

**Members (2):** Homophones; Commonly Confused Words.

These are categorically different, and the difference is not stylistic. **The `/play` engine's prompt for these Skills is not merely suboptimal — for true homophones it is unanswerable**, because TTS pronounces `their`/`there`/`they're` identically. **[Repository fact]** §3.6's instructional guidance says the same thing pedagogically. **[External evidence]**

Requirements, all mandatory: **[Product recommendation]**

1. **Every item carries a hand-authored context sentence in which exactly one spelling of its set is valid.** No item without one may ship. This is not optional metadata; it is the item's prompt.
2. **Sentences follow `CONTENT_STANDARDS.md`'s existing sentence guidelines** unchanged — age-appropriate, concrete, short, present tense, no advanced vocabulary inside the sentence. **[Repository fact]**
3. **Banks are counted in sets, not words.** A Homophones bank of 20 words is ~9–10 sets.
4. **Not all members of one set in the same session.** Per §3.6, meeting `wait` and `weight` back-to-back invites exactly the interference the instruction is trying to prevent. Selection should draw at most one member per set per session. This is the second constraint on §7.3.
5. **Audio order must change for these two Skills only:** the sentence must be at least as prominent as the isolated word, and arguably first. The existing rich-payload path can carry a per-item flag; `renderQuestion()` in `play.astro` is the only file that changes. **[Repository fact]** on the mechanism; **[Product recommendation]** on the behaviour.
6. **Hear, don't show.** The sentence is spoken, not displayed — showing it would let a strong reader read the spelling off the screen, and nothing else in the app shows dictation text before submission. **[Repository fact]** on current behaviour.
7. **These two Skills ship last**, after the other 39. A Homophones bank whose sentences do not actually disambiguate is worse than no feature: it silently marks a correct-sounding answer wrong (§13.6).

Commonly Confused Words has a further, distinct risk: its members are *not* true homophones, so some pairs (`than`/`then`, `advice`/`advise`) *are* TTS-distinguishable and behave like ordinary items, while others are usage distinctions (`affect`/`effect`) whose meaning is beyond most K–5 learners even when the spelling is not. **[Professional/instructional inference]** Its bank needs an age-appropriateness pass more than a sentence pass — flagged in §12 and §17.

---

## 10. Demonstration-word vs. practice-bank rules

Both are frozen as conceptually distinct (`CONTENT_MODEL.md` §3/§4; `CANONICAL_SKILL_PAGE_STANDARD.md` §5). **[Repository fact]** What is not yet specified is how they interact. Proposed: **[Product recommendation]**

| # | Rule | Rationale |
|---|---|---|
| **D1** | The demonstration set is authored for the page; the bank is authored for practice. Neither is derived from the other. | `CONTENT_MODEL.md` §3: the demonstration "must not be curated as a copy of… the Skill's own practice bank." **[Repository fact]** |
| **D2** | Word-level overlap is **permitted** — a word may be both the clearest illustration and a good practice item. | `CONTENT_MODEL.md` §3 explicitly allows purposeful overlap. **[Repository fact]** |
| **D3** | **Bank ≥ 2× demonstration.** A bank must contain at least twice as many words as its Skill's demonstration set. | Operationalises `CONTENT_MODEL.md` §4's "capped well below Practice Set or Skill-practice-bank size." Checkable mechanically. |
| **D4** | The bank must not read as "demonstration set + filler." At least half the bank must be words that are *not* in the demonstration set, and the bank's ordering must not begin with the demonstration set in order. | Guards the copy-paste shortcut a future editor is most likely to take. |
| **D5** | **Demonstration sets should be trimmed to ≤ 8.** | Two Skills sit at 12 today (`vowel-teams-ai-ay`, `vowel-teams-ee-ea`) against a median of 6. **[Repository fact]** At 12 they violate the spirit of "well below bank size" against a 20–26 band, and D3 would force a 24-word bank floor for reasons unrelated to the concept. Trim the demonstration, do not inflate the bank. |
| **D6** | The demonstration set never gains a practice action, and the bank is never rendered as a browsable word list on the Skill page. | `CANONICAL_SKILL_PAGE_STANDARD.md` §5 for the first half; `CONSTITUTION.md` §9's giant-word-bank prohibition for the second. **[Repository fact]** |

**A real edge case, accepted with eyes open (§13.3):** the demonstration words are visible as text on the Skill page directly above the practice CTA. If a session includes a demonstration word, a learner could in principle scroll up and copy it. This document recommends **accepting** the overlap anyway: the learner is on `/play`, not the Skill page, when they answer; the site has no anti-cheating posture and should not acquire one; and re-encoding a word just seen is legitimate practice, not a defect. D3/D4 already keep the demonstration share of any session low (at a 6-word demonstration and a 24-word bank, a 10-word session contains ~2.5 demonstration words on average). Flagged rather than engineered around.

---

## 11. Relationship to Grade Unit Practice Sets

### 11.1 They are different objects doing different jobs

| | Grade Unit Practice Set | Skill practice bank |
|---|---|---|
| Answers | "What should my Grade 2 child practise this week?" | "We need to work on `ai`/`ay`." |
| Grade | Exactly one; roadmap-placed | None; grade-independent |
| Size | 8–16 (measured mode: 12) **[Repository fact]** | 16–36, sub-pattern-driven |
| Session | The whole set — it is an assignment | A 10-word selection — it is a pool |
| Sequenced | Yes: prerequisite / next unit | No |
| Calibrated to | The grade's developmental position | The concept's own accessibility ceiling (§8.3) |
| Reached via | Grade Hub → Strand Gateway → Unit | Skills Hub → Skill page |

`CONTENT_MODEL.md` §3 already frames these as "two distinct, complementary paths: direct Skill practice and grade-sequenced curriculum practice." **[Repository fact]**

### 11.2 Non-cannibalisation rules

**[Product recommendation]**

- **N1 — No superset copying.** A Skill bank may share **at most half** of any single Grade Unit's Practice Set. A bank that contains a Grade Unit's whole set has replaced it, which is the duplicate-intent failure `CONSTITUTION.md` §15 prohibits. Mechanically checkable, and comfortably satisfiable at the proposed sizes (a 12-word Grade Unit set against a 24-word bank means ≤6 shared words).
- **N2 — No concatenation.** A bank is never built by unioning the Practice Sets of the Grade Units that link to the Skill. That would make the bank grade-derived, contradicting §8.1, and would import each unit's grade calibration.
- **N3 — Curriculum links stay primary.** The "Where this fits in the curriculum" section on the Skill page must remain a prominent path, not a vestige below the fold. It is the route for the "which grade?" question, which the bank cannot answer. `CANONICAL_SKILL_PAGE_STANDARD.md` already requires this section. **[Repository fact]**
- **N4 — One-directional.** Grade Unit pages never link to a Skill bank as an alternative to their own Practice Set. A Grade Unit's set is its assignment; offering a substitute undermines the sequence.
- **N5 — Distinct CTA language.** The two entry points must not use the same button copy (§7.4).

### 11.3 Why this is complementary rather than competitive

The Skills with the largest banks are the Skills with the most Grade Unit placements (§2.6): Multisyllabic Words (6 placements, 26–36 band), Common Prefixes (3, 26–36), Greek and Latin Roots (3, 26–36), CK/TCH/DGE (3, 28–36). **[Repository fact]** These are exactly the concepts a learner re-enters across several years. A single grade's 12-word unit cannot carry that; a 30-word grade-independent bank can, and does so *without* the site inventing per-grade Skill variants. The correlation is evidence that the two systems are addressing the same underlying reality from different directions, not competing for the same job. **[Professional/instructional inference]**

---

## 12. 41-Skill current-state audit

**Method.** Demonstration-word counts were extracted programmatically from each Skill's Markdown frontmatter `words:` array at the current commit and are exact, not estimated. **[Repository fact]** Skill ids and family assignments come from `spellingSkills.ts`; scope boundaries from `SKILLS_ARCHITECTURE.md` §3. "Apparent breadth" combines the count of already-authored instructional example words in the page body (§2.5) with an orthographic judgement about how many child-usable words the pattern actually admits — the latter is **[Professional/instructional inference]**. "Recommended band" applies §6's R1–R5 given the sub-pattern count *n*.

**Count reconciliation:** the taxonomy contains **exactly 41 Skills in practice**, matching the frozen figure. No discrepancy to flag. Every id in `CURATED_SPELLING_SKILL_IDS` resolves to a published content file with a non-empty demonstration set. **[Repository fact]**

**Column key.** *Demo* = current demonstration-word count. *n* = sub-patterns in frozen scope. *Seed?* = can the current words seed a bank. *Expansion* = how much new authoring is needed. *Band* = recommended approximate bank size.

| # | Skill | Family | Demo | Apparent breadth | *n* | Seed? | Expansion needed | Band | Special word-selection concerns | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Short A Words | Short Vowels | 5 | Broad — ~35 screened body words, many rime families | 1 | Yes | Moderate | 16–20 | Spread across rime families, don't over-sample `-at`/`-an`; exclude words whose `ck`/FLOSS ending dominates (Filter 2) | High |
| 2 | Short E Words | Short Vowels | 5 | Moderate — ~34 body words; short `e` has the thinnest CVC inventory of the five | 1 | Yes | Moderate | 16–20 | Exclude `ea`-spelled /e/ (`head`, `bread`); /e/–/ɪ/ confusion means avoid minimal pairs with Short I | High |
| 3 | Short I Words | Short Vowels | 5 | Broad — ~30 body words | 1 | Yes | Moderate | 16–20 | Overlap with SH/CH Skills (`fish`, `chip`) expected and permitted | High |
| 4 | Short O Words | Short Vowels | 5 | Broad — ~27 body words | 1 | Yes | Moderate | 16–20 | Cot–caught merger: `dog`, `off`, `long` are unreliable across dialects (Filter 5) | Medium-High |
| 5 | Short U Words | Short Vowels | 5 | Broad — ~26 body words | 1 | Yes | Moderate | 16–20 | Single-syllable only; a schwa in an unstressed syllable is not short U (Filter 3) | High |
| 6 | CH Digraph Words | Consonant Digraphs | 6 | Moderate — ~31 body words, but the scope boundary removes a large slice | 1 | Yes | Moderate | 16–20 | **Scope:** `-tch` words belong to CK/TCH/DGE, not here. Exclude /k/ `ch` (`school`) and /ʃ/ `ch` (`chef`). May invoke R3 | High |
| 7 | SH Digraph Words | Consonant Digraphs | 6 | Broad — ~24 body words; both initial and final positions productive | 1 | Yes | Moderate | 16–20 | Balance initial and final `sh`; `-tion`/`-sion` are out of scope | High |
| 8 | TH Digraph Words | Consonant Digraphs | 6 | Broad — ~28 body words | 1 | Yes | Moderate | 16–20 | Cover voiced and unvoiced. Many TH words are high-frequency irregulars (`the`, `they`, `there`) — the bank must not become an HFW set (different content identity) | High |
| 9 | WH Digraph Words | Consonant Digraphs | 6 | **Narrow — genuinely closed.** ~13 body words, of which `who`/`whom`/`whose`/`whole` are /h/ | 1 | Yes | Little — bank will be small by nature | **12–16 (R3)** | Closed inventory; wine–whine merger means the sound may be absent in the learner's dialect; the /h/ group is a different sound and is page content, not bank content | High |
| 10 | Beginning Blends | Consonant Blends | 6 | **Very broad** — ~48 body words; ~20 distinct blends | 3–4 (blend classes) | Yes | Substantial | 26–36 | Proportional coverage of l-, r-, s- and three-letter blends; existing precedent (`black` removed for its `ck`) is exactly Filter 2 | High |
| 11 | Ending Blends | Consonant Blends | 6 | Broad — ~34 body words; ~11 ending blends | 3 (blend classes) | Yes | Substantial | 24–30 | Ending blends are harder to *hear*, so audio quality matters more; decide up front whether `-nk`/`-ng` nasals are in scope | Medium-High |
| 12 | CK, Double Letters, and TCH/DGE Word Endings | Common Spelling Patterns | 10 | **Very broad** — ~106 body words, the richest page in the repo | **4** (`ck`, FLOSS, `tch`, `dge`) | Yes — strongest seed of all 41 | Moderate | **28–36** | ≥6 per convention (R1). Exceptions (`much`, `rich`, `which`, `catch`/`watch` interactions) stay on the page, not in the bank (Filter 7) | High |
| 13 | Silent Letters | Common Spelling Patterns | 9 | Moderate — ~38 body words, but very unevenly split | **3** (`wr`, `kn`, `mb`) | Yes | Moderate | 22–28 | `-mb` is genuinely thin (~8 child-usable: `lamb, comb, thumb, climb, crumb, limb, numb, bomb`) → likely **sub-pattern R3**. Near-homophone traps (`write`/`right`, `know`/`no`, `knot`/`not`) fail Filter 5 without context — exclude or handle carefully | Medium-High |
| 14 | Soft C and Soft G | Common Spelling Patterns | 6 | Moderate — ~22 body words, half of them hard-c/hard-g contrasts | **2** | Yes | Moderate | 20–26 | Hard-c/hard-g words are contrasts, never bank items (Filter 7). Soft-g exceptions (`get`, `give`, `girl`, `gift`) must never enter the bank — the page already treats them as its central caution | Medium-High |
| 15 | Long A Silent E Words | Silent E | 5 | Broad — ~40 body words | 1 | Yes | Moderate | 16–20 | Exclude r-controlled confounds (`care`, `share`); `have` is an exception, not a target | High |
| 16 | Long I Silent E Words | Silent E | 5 | Broad — ~39 body words | 1 | Yes | Moderate | 16–20 | Exclude `fire`/`hire` (already-recorded r-controlled confound) and `give`/`live` exceptions | High |
| 17 | Long O Silent E Words | Silent E | 5 | Broad — ~31 body words | 1 | Yes | Moderate | 16–20 | Exclude the `gone`/`done`/`some`/`come`/`one` exception cluster the page already flags | High |
| 18 | Long U Silent E Words | Silent E | 6 | **Narrow — ~9–15 usable.** Thinnest body pool of all 41 | **2** (/yū/, /ū/) | Yes | Little — inventory-limited | **12–16 (R3)** | R1's ≥6 per sub-pattern is barely reachable; this is the clearest case where the floor must yield to honesty. Dialect note on `tune`/`tube` already on the page | High |
| 19 | AI and AY Words | Vowel Teams | **12** | Broad — ~37 body words | 1 (positional rule) | Yes | Modest | 20–26 | **Trim the demonstration to ≤8 (D5), don't inflate the bank.** `ay` is word-final; `ai` is medial — the positional rule is the actual concept | High |
| 20 | EE and EA Words | Vowel Teams | **12** | Broad — ~21 body words | 1 | Yes | Modest | 20–26 | **Trim the demonstration to ≤8 (D5).** Restrict to long-e `ea` only — `head` (/e/) and `great` (/ā/) fail Filter 1 | High |
| 21 | OA and OW Words | Vowel Teams | 10 | Moderate — ~33 body words | 1 | Yes | Modest | 20–26 | **Scope collision:** `ow` also spells /aʊ/ in the OU/OW Skill. Every `ow` item must be /ō/ and must not be a near-neighbour of an OU/OW item | Medium-High |
| 22 | OI and OY Words | Vowel Teams | 10 | Narrow-moderate — ~28 body words; the /ɔɪ/ inventory is small in child vocabulary | 1 (positional) | Yes | Modest | 18–24 | Small total inventory; `oi` medial / `oy` final is the concept, so both positions need real coverage | Medium-High |
| 23 | OU and OW Words | Vowel Teams | 10 | Moderate — ~26 body words | 1 | Yes | Modest | 20–26 | `ou` spells many other sounds (`through`, `four`, `touch`, `young`) — Filter 1 rejects most of them. Scope collision with OA/OW (row 21) | Medium-High |
| 24 | IE and IGH Words | Vowel Teams | 8 | Deliberately asymmetric — ~54 body words but concentrated in `igh` | **2** (final `-ie`, `igh`) | Yes | Modest | 16–22 | Final `-ie` is nearly closed (`pie, tie, lie, die, vie`) → likely **sub-pattern R3**. `ie` also spells /ē/ (`field`, `chief`) — out of scope per the page's own framing | Medium |
| 25 | OO Words | Vowel Teams | 8 | Moderate — ~14 body words | **2** (/ū/, /ʊ/) | Yes | Modest | 18–24 | /ʊ/ `oo` is small (`book, look, took, foot, good, wood, hook, cook, stood, shook, wool`) → possible **sub-pattern R3**. `roof`/`room` vary by dialect (Filter 5) | Medium-High |
| 26 | AU and AW Words | Vowel Teams | 8 | Moderate — ~33 body words | 1 (positional) | Yes | Modest | 18–24 | Cot–caught merger is the dominant risk: for a merged-dialect learner there is no distinct sound to encode. `au` medial / `aw` final | Medium |
| 27 | R-Controlled AR Words | R-Controlled Vowels | 8 | Broad — ~34 body words | 1 | Yes | Modest | 16–20 | Exclude `war`/`warm` (/or/) and unstressed `-ar` (`dollar`, `sugar`) — both fail Filter 1 | High |
| 28 | R-Controlled OR Words | R-Controlled Vowels | 8 | Broad — ~30 body words | 1 | Yes | Modest | 16–20 | Exclude `word`/`work`/`world` (/er/). Alternative spellings (`ore`, `oar`, `our`) are out of this Skill's scope | High |
| 29 | R-Controlled ER, IR, and UR Words | R-Controlled Vowels | 10 | Moderate — the site's purest encoding-choice problem | **3** (`er`, `ir`, `ur`) | Yes | Moderate | 24–30 | No phonological cue exists, so the bank must lean on high-frequency, print-familiar words; sub-pattern balance matters more here than anywhere (§9.2) | Medium-High |
| 30 | Multisyllabic Words | Multisyllabic Words | 8 | **Very broad but heavily filtered** — ~39 body words; 6 Grade Unit placements | **6** (syllable types, incl. required Open Syllables and Consonant-LE) | Yes | Substantial | **28–36** | Highest rejection rate of any Skill: schwa in unstressed syllables makes most natural multisyllabic words un-encodable by sound (Filter 3). Quota by syllable type, not by frequency | Medium |
| 31 | Plural Words with -s and -es | Word Building and Endings | 7 | Moderate — ~23 body words | **2–3** (`-s`, `-es` after sibilants, possibly `y`→`ies`) | Yes | Moderate | 20–26 | **Scope boundary:** decide explicitly whether `y`→`ies` and `f`→`ves` live here or in Spelling Rules for Adding Suffixes. Base and plural must not co-occur in one session (§9.3) | Medium-High |
| 32 | Words Ending in -ed and -ing | Word Building and Endings | 8 | Moderate — ~19 body words | **2** (`-ed`, `-ing`), ×3 `-ed` pronunciations | Yes | Moderate | 20–26 | **Scope boundary is critical:** only no-change bases belong here; doubling and drop-e belong to row 34. `-ed` has three pronunciations (/t/, /d/, /ɪd/) — all three need coverage or the concept is misrepresented | Medium-High |
| 33 | Common Suffixes | Word Building and Endings | 6 | **Broad** — ~61 body words | **≥5** (`-ful`, `-less`, `-ness`, `-ment`, `-er`/`-est`, `-ly`) | Yes | Substantial | **26–36** | Every base must require **no** spelling change (that is row 34's scope). ≥6 per suffix is arithmetically tight against the 36 ceiling — expect a rotating sub-pattern subset in selection (§7.3) | Medium-High |
| 34 | Spelling Rules for Adding Suffixes | Word Building and Endings | 6 | Moderate — ~34 body words | **4** (double, drop-e, y→i, no-change) | Yes | Moderate | 24–30 | The only Skill where "no change" is a rule *outcome* rather than an exception — so `hopeful` and `carrying` are **targets**, not contrasts, and no `role` field is needed (§5 Filter 7). Getting this framing wrong teaches the inverse rule | Medium |
| 35 | Compound Words | Word Building and Endings | 6 | **Effectively unbounded** — ~57 body words | 1 | Yes | Modest *sourcing*, substantial *curation* | 20–26 | Inverse problem: the risk is over-inclusion, not scarcity. Both components must be independently spellable and the compound's meaning transparent (`butterfly` fails transparency; `sunshine` passes) | High |
| 36 | Contractions | Word Building and Endings | 7 | **Closed** — ~30 common contractions, ~20 child-appropriate | 2 (`not`-type, pronoun+aux) | Yes | Modest | **16–22 (R3-adjacent)** | **Only Skill whose targets contain punctuation** — verify `normalizeWord`/`compareWords` apostrophe handling, including curly `’` vs straight `'`, *before* authoring (§13.8). `won't`/`can't` are irregular forms and need explicit treatment | Medium |
| 37 | Un- and Re- Prefixes | Prefixes | 6 | Moderate — ~40 body words | **2** | Yes | Moderate | 18–24 | ≥6 each. Every base must be a free-standing word the learner can already spell (Filter 4). `re-` carries two meanings ("again"/"back") — the bank should favour the transparent "again" sense | Medium-High |
| 38 | Common Prefixes | Prefixes | 8 | **Broad** — ~65 body words | **≥6** (`dis-`, `pre-`, `mis-`, `in-`/`im-`, `sub-`, `super-`, `trans-`, `inter-`, `anti-`) | Yes | Substantial | **26–36** | **Scope boundary:** `un-`/`re-` are review only, not bank items (frozen in `SKILLS_ARCHITECTURE.md` §3). Many bases are bound Latin roots, not free words — overlaps row 39 and strains Filter 4 | Medium |
| 39 | Greek and Latin Roots | Greek and Latin Roots | 9 | **Very broad** — ~100 body words; merges 6 source files | **≥5** (root families) | Yes | Substantial | **26–36** | Long, multisyllabic words: a learner may know the root and still fail on the schwa (Filter 3). The frozen editorial safeguard — every item verified as genuinely Greek/Latin — must be applied per bank word. Base+derived co-occurrence rule applies (`nation`/`national`) | Medium |
| 40 | Homophones | Homophones and Commonly Confused Words | 6 | Moderate — ~33 body words | n/a — counted in **sets** | **No — not without authored sentences** | Substantial (sentences, not words) | 18–24 (~9–12 sets) | **Blocking:** isolated TTS cannot disambiguate; every item requires a hand-authored sentence in which only one spelling is valid. One member per set per session (§9.5). Ships last | Medium |
| 41 | Commonly Confused Words | Homophones and Commonly Confused Words | 8 | Moderate — ~58 body words | n/a — counted in **sets** | **No — same dependency** | Substantial (sentences + an age pass) | 16–22 (~8–11 sets) | Mixed: some pairs *are* TTS-distinguishable (`than`/`then`, `advice`/`advise`) and behave normally; others are usage distinctions beyond most K–5 (`affect`/`effect`). Needs an age-appropriateness pass more than a sentence pass | Low-Medium |

### 12.1 Audit summary

**[Repository fact]** for the counts, **[Professional/instructional inference]** for the groupings.

- **41 of 41** Skills have a published content file and a non-empty demonstration set. Total 296 demonstration words; mean 7.2; median 6; range 5–12.
- **39 of 41** can seed a bank from existing material today. The two exceptions (Homophones, Commonly Confused Words) are blocked on authored context sentences, not on words.
- **Substantial expansion needed (8 Skills):** Beginning Blends, Ending Blends, Multisyllabic Words, Common Suffixes, Common Prefixes, Greek and Latin Roots, Homophones, Commonly Confused Words.
- **Likely to invoke the R3 quality override (6 Skills):** WH Digraph Words and Long U Silent E Words at the *total* level; Silent Letters (`-mb`), IE and IGH Words (final `-ie`), OO Words (/ʊ/) at the *sub-pattern* level; Contractions by closed inventory. CH Digraph Words may join them once its `-tch` scope exclusion is applied.
- **Demonstration sets needing a trim under D5 (2 Skills):** AI and AY Words, EE and EA Words (both at 12).
- **Scope boundaries that must be settled before authoring (5 pairs):** CH Digraph ↔ CK/TCH/DGE (`-tch`); OA/OW ↔ OU/OW (`ow`); Plurals ↔ Spelling Rules for Adding Suffixes (`y`→`ies`, `f`→`ves`); `-ed`/`-ing` ↔ Spelling Rules for Adding Suffixes (doubling, drop-e); Common Prefixes ↔ Un-/Re- Prefixes and ↔ Greek and Latin Roots.
- **Confidence distribution:** High 17, Medium-High 14, Medium 9, Low-Medium 1. Confidence is lowest exactly where the instructional content is genuinely contested (Commonly Confused Words' age band) or where the filter rejection rate is hardest to predict without authoring (Multisyllabic Words, Greek and Latin Roots).

---

## 13. Risks and edge cases

**13.1 — Quantity-over-quality, in both directions (the headline risk).** The failure mode of any numeric standard is that the number becomes the goal. Padding a narrow Skill (WH, Long U Silent E) to hit a quota imports words that fail Filter 1 or 2 and actively teach a wrong or blurred pattern — a 20-word WH bank would necessarily contain the /h/ group or non-WH words, and would be *worse than a 13-word one*. Capping a broad Skill (Multisyllabic Words, CK/TCH/DGE) below its sub-pattern needs under-serves whichever convention the author trims. §6's R1/R3 exist specifically to make both failures visible: R1 makes under-coverage countable, R3 makes honest shortfall a *recorded, legitimate outcome* rather than something an author has to hide. **The frozen standard should say in plain words that a bank below its band with a recorded reason is compliant, and a bank at its band containing a Filter-1 failure is not.** **[Product recommendation]**

**13.2 — Scope drift via the bank.** The bank is the easiest place to quietly widen a Skill. An author short of Common Prefixes words reaches for `unhappy`; an author short of CH words reaches for `catch`. Both violate frozen scope boundaries in `SKILLS_ARCHITECTURE.md` §3. Mitigation: §5 Filter 1 plus an explicit per-Skill exclusion list recorded alongside each bank, and the five boundary pairs in §12.1 settled before authoring.

**13.3 — Demonstration words visible above the CTA.** Accepted, not engineered around; see §10's edge-case note.

**13.4 — Contrast items delivered as targets.** A `/play` session cannot explain that `get` is an exception. If contrast items ever enter a bank, the learner is taught the inverse rule with no signal. Mitigated by Filter 7 (contrasts are page content) and by the §9.2 reframing of Spelling Rules for Adding Suffixes' "no change" as a rule outcome. This is the risk this document most firmly diverges from the prior planning document on.

**13.5 — Morphological answer leakage.** Hearing `nation` then `national` in one session gives the answer away; likewise `happy`/`unhappy`, `cat`/`cats`, `jump`/`jumped`. Mitigated by the base/derived co-occurrence constraint (§9.3.3). Affects Common Suffixes, Greek and Latin Roots, Plurals, `-ed`/`-ing`, and both Prefix Skills.

**13.6 — Homophone banks shipping without real sentences (the most damaging failure).** A Homophones session with generic or non-disambiguating sentences will mark correct-sounding answers wrong with no explanation, on a page a parent reached deliberately for that concept. That is worse than the feature not existing. Mitigations: mandatory per-item sentence (§9.5.1), ship-last sequencing (§9.5.7), and a test that fails loudly on any bank item in these two Skills lacking a non-empty sentence (§15.4).

**13.7 — Dialect.** Cot–caught (Short O, AU/AW), wine–whine (WH), `oo` variation (`roof`, `room`), and rhotic assumptions throughout R-Controlled Vowels. A word can be a perfect textbook example and still be un-hearable for a substantial share of American learners. Filter 5 makes this a selection criterion; it cannot be fully eliminated.

**13.8 — Apostrophes in Contractions.** The only Skill whose targets contain punctuation. `normalizeWord`/`compareWords` behaviour on `'` vs `’` (both present in this repo's content — the Contractions page uses `don't` in frontmatter and `’` forms in prose) must be verified before authoring, not discovered during QA. If the comparison is strict, a child typing a straight apostrophe against a curly target would be marked wrong for a reason that has nothing to do with spelling. **[Repository fact]** on the mixed characters; the comparison behaviour was not tested in this pass. Recorded as an open question (§17.5).

**13.9 — Unbalanced sessions from a plain shuffle.** A 30-word four-sub-pattern bank can produce an all-`ck` session. Mitigated by §7.3.3's balancing. Without it, the bank's careful sub-pattern coverage is invisible to any individual learner.

**13.10 — Cross-Skill overlap read as duplicate content.** `fish` in two banks is correct and permitted (`CONTENT_MODEL.md` §3). A future editor or automated audit may flag it as duplication. The frozen standard should state affirmatively that no cross-Skill uniqueness rule exists, so nobody "fixes" it. **[Repository fact]**

**13.11 — Session-size conflict between canonical documents.** `LEARNING_MODEL.md` says 10; `SKILL_PRACTICE_INTEGRATION_PLAN.md` §C3/§E says full-bank-if-≤18-else-16. Reported in §7.2 with a recommendation (`LEARNING_MODEL.md` wins) rather than silently resolved. A human should confirm.

**13.12 — Stale justification in `CONTENT_MODEL.md` §10.** The draft-status rule's stated reason ("has no route into the practice experience") is superseded by the existence of Skill banks, though its effect is currently moot. §2.6. Flagged for editorial cleanup, not resolved here.

**13.13 — Authoring-volume risk.** ~850–950 curated words plus ~40 disambiguating sentences (§6.6). At `CONTENT_STANDARDS.md`'s per-word editorial standard this is the largest content project in the repo's near-term backlog. The realistic risk is not that it is done badly but that it is done *partially* and left half-shipped. Mitigation: `getPracticeBank(skillId)` returning `undefined` should be a supported state that simply hides the CTA, so partial rollout is safe by construction rather than by discipline — an approach the prior plan already proposed and this document endorses. **[Repository fact]**

---

## 14. SEO / GEO / AEO implications

Deliberately brief; per `CONSTITUTION.md` §15, discoverability must not drive educational decisions, and nothing in §5–§11 was chosen for search reasons. **[Repository fact]**

1. **No new indexable URLs.** Practice launches into `/play?list=<payload>`, a query-parameterised state, not a page. The 41 Skill pages and `/skills` remain the complete indexable Skill surface. This keeps the feature clear of the No-Gateway Rule (§11) and of thin-page proliferation entirely. **[Repository fact]**
2. **Bank words must not be dumped onto the Skill page as crawlable text.** Rendering a 30-word bank as a browsable list would (a) violate `CONSTITUTION.md` §9's giant-word-bank prohibition, (b) dilute the carefully-curated demonstration set that is the page's actual instructional content, and (c) add near-duplicate word text across the 41 pages. D6 forbids it. This is the one place where the SEO and educational answers coincide exactly. **[Product recommendation]**
3. **Stating the bank size is a legitimate, useful entity fact.** "Practice 10 of the 24 words for this Skill" is a concrete, machine-extractable claim about the page's offering and is honest AEO surface without adding content. It is recommended on UX grounds (§7.4) and happens to help. **[Product recommendation]**
4. **No structured-data change is warranted.** No `ItemList` of bank words, no new schema type. The existing `BreadcrumbList` (+ conditional `FAQPage`) on Skill pages is unaffected. Consistent with `CANONICAL_SKILLS_HUB_STANDARD_RESEARCH.md` §15's parallel conclusion. **[Repository fact]**
5. **GEO/AEO framing.** The genuinely quotable fact a generative engine can extract from this feature is *"you can practise this pattern directly, without following a grade sequence"* — which is the Skill journey's proposition (`CONSTITUTION.md` §3.3) stated more completely than before. That is a content-quality outcome, not an optimisation to pursue separately.

---

## 15. Minimal implementation implications

Descriptive only. **Nothing in this section is implemented by this document, and it does not authorise implementation.**

**15.1 — Storage.** Adopt `SKILL_PRACTICE_INTEGRATION_PLAN.md` §H's recommendation unchanged: dedicated TypeScript modules under `src/lib/content/skillPractice/`, one bank file per Skill, with a typed registry barrel exposing `getPracticeBank(skillId)` / `getAllPracticeBanks()`, mirroring `canonicalSkillRoutes.ts`'s existing id-keyed-manifest pattern. Rejected there and here: putting banks in Skill frontmatter (the `words` field is frozen as demonstration content and the zod union is shared with three other content identities), and a parallel Astro Content Collection (banks have no prose body, no route, and benefit from direct Vitest import in the `node` environment). **[Repository fact]**

**15.2 — Data model.** Simpler than the prior plan's proposal, because §5 Filter 7 removes `role` and §9 clarifies which fields are actually needed:

- a plain `string` is a complete item, sufficient for all Type A Skills;
- an optional sub-pattern tag for Types B and D;
- an optional `base` for Type C;
- a **required** context sentence for Type E only;
- no `role`, no `contrasts`, no `difficulty`, no `grade`.

**15.3 — `/play` changes.** None for 39 Skills — the existing `encodeWordList` + `sessionStorage` rich-payload + `/play` path carries a Skill session as-is, and `MAX_WORD_COUNT = 200` is far above the 36-word ceiling. One additive change for the two Type E Skills: a per-item flag on the rich payload that makes `renderQuestion()` play the sentence first (or with equal prominence) and adjust the instruction line. No reducer, evaluation, serialization, or speech-module change. **[Repository fact]**

**15.4 — New pure logic.** One selection function (`bank → SpellingWord[]`), reusing the existing Fisher–Yates in `src/modules/spellingTest/order.ts`, implementing: shuffle, take 10, sub-pattern balance (§7.3.3), one-member-per-homophone-set (§9.5.4), and no-base-with-its-derived-form (§9.3.3). **[Repository fact]** on the reused shuffle.

**15.5 — Tests worth writing.** Registry integrity (exactly 41 banks, one per `CURATED_SPELLING_SKILL_IDS` entry, no orphans); intra-bank duplicate detection via the existing `normalizeWord` comparison key; band and floor checks as **range** assertions with an explicit opt-out marker for R3 banks; sub-pattern floor for Types B and D; required `base` for Type C; **required non-empty sentence for Type E, failing loudly**; D3's bank ≥ 2× demonstration; N1's ≤50% overlap with any single Grade Unit Practice Set; and a guard against grade-suffixed bank ids.

**15.6 — Tests worth avoiding.** Exact per-bank word counts; per-bank word-identity assertions; any cross-Skill uniqueness assertion (§13.10); rendered-HTML snapshots of the CTA. All four convert ordinary editorial revision into required test diffs, and the third asserts something the content model explicitly permits. **[Repository fact]**

**15.7 — Docs that would need updating after implementation.** `CLAUDE.md` (a directory pointer to `src/lib/content/skillPractice/`); `docs/content/inventory/skill-pages.md` (a bank-status column); `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md` (a phase); and the §13.12 stale-justification paragraph in `CONTENT_MODEL.md` §10. No frozen architectural decision requires amendment — that work is already done (§1, §2.1).

---

## 16. Proposed acceptance criteria for a future frozen standard

A Skill practice bank is **ready to publish** when all of the following hold. Intended to be lifted into the frozen standard as a checklist. **[Product recommendation]**

**Scope and identity**
- [ ] The bank is registered against exactly one id in `CURATED_SPELLING_SKILL_IDS`.
- [ ] Every word falls inside the Skill's frozen scope, including its stated boundaries against neighbouring Skills (§13.2).
- [ ] The bank carries no grade, no difficulty tier, and no per-grade variant (§8.1).

**Word selection**
- [ ] Every word passes all seven filters in §5, and the author can state which sub-pattern each word exemplifies.
- [ ] No word is an exception or contrast to the Skill's rule (§5 Filter 7).
- [ ] Dialect-sensitive and TTS-ambiguous candidates were explicitly considered and either excluded or justified (§5 Filter 5).
- [ ] Every word sits within the Skill's accessibility ceiling (§8.3).

**Size**
- [ ] Every named sub-pattern has ≥6 words (R1), **or** a recorded inventory-limit reason (R3).
- [ ] Total size is inside the band for the Skill's sub-pattern count (R2), **or** below it with a recorded reason and ≥12 (R3/R5).
- [ ] Total size ≤36 (R4).

**Relationships**
- [ ] Bank size ≥ 2× the demonstration-set size (D3), and ≥50% of bank words are outside the demonstration set (D4).
- [ ] The bank shares ≤50% of the words of any single Grade Unit Practice Set (N1) and is not a union of Grade Unit sets (N2).
- [ ] The Skill page's curriculum-placement links remain prominent (N3), and the practice CTA copy differs from the Grade Unit CTA (N5).

**Type-specific**
- [ ] Type B/D: every item carries a sub-pattern tag from that Skill's declared set.
- [ ] Type C: every item carries a base, and the base is spellable at the Skill's own level.
- [ ] Type E: **every** item carries a hand-authored sentence in which exactly one spelling of its set is valid, and each sentence meets `CONTENT_STANDARDS.md`'s sentence guidelines.
- [ ] Type C/E: the selection function's co-occurrence constraints (base+derived; two members of one homophone set) are implemented and tested.

**Session behaviour**
- [ ] Default session is 10 words drawn from the bank (§7.1), with a secondary "practice all N" opt-in.
- [ ] Selection is stateless, sub-pattern-balanced where applicable, and reshuffles on each launch.
- [ ] No gamification, coverage meter, or completion tracking attaches to the bank (§7.4).

**Editorial**
- [ ] Every word reflects deliberate human judgement; the bank could not have been produced by substring-filtering a corpus (`CONTENT_STANDARDS.md`).
- [ ] Any R3 shortfall is recorded in the bank file with its reason.

---

## 17. Open questions

Genuine unresolved items for a human reviewer. Items this document *did* resolve are not repeated here.

1. **Total authoring volume.** ~850–950 curated words plus ~40 sentences (§6.6). Is that acceptable as a content programme, or should the bands be lowered across the board? Lowering them is a legitimate product call; this document's bands are calibrated to instructional coverage, not to authoring capacity.
2. **The five scope boundaries in §12.1.** CH ↔ CK/TCH/DGE; OA/OW ↔ OU/OW; Plurals ↔ Suffix Spelling Changes; `-ed`/`-ing` ↔ Suffix Spelling Changes; Common Prefixes ↔ Un-/Re- and ↔ Greek/Latin Roots. Each needs a one-line ruling before authoring begins. These are taxonomy clarifications, not taxonomy changes.
3. **Commonly Confused Words' age band.** `affect`/`effect` and `principal`/`principle` are in the demonstration set today, but both are usage distinctions arguably beyond most K–5 learners. Should the bank prefer `than`/`then`, `lose`/`loose`, `quiet`/`quite`, `breath`/`breathe`? This is an editorial curriculum call this document is not confident enough to make (§12 row 41, Low-Medium).
4. **Sub-pattern balancing in v1 or v2.** §7.3.3 is a small scope increase over a plain shuffle. Confirm it is in scope for the first implementation, since retrofitting it later means the earliest sessions misrepresent the multi-condition Skills.
5. **Apostrophe comparison behaviour** (§13.8). Verify `normalizeWord`/`compareWords` against `'` vs `’` before Contractions is authored. Not tested in this pass.
6. **Whether "practice all N" is a v1 affordance** or deferred. `LEARNING_MODEL.md` decision 3 requires it eventually; nothing requires it in the first release.
7. **Whether `CONTENT_MODEL.md` §10's draft-status justification is edited now or later** (§13.12). Its effect is currently moot, so this is a scheduling question.

---

## 18. Final recommendation

**Adopt §4–§11 as the basis for a frozen `docs/content/CANONICAL_SKILL_PRACTICE_BANK_STANDARD.md`, gated on the §16 acceptance criteria and the §17 rulings.**

The architectural question is closed: `CONSTITUTION.md` §10, `CONTENT_MODEL.md` §3/§4, and `SKILLS_MODEL.md` §15 have all been amended to require exactly the capability this document specifies, and the blocking contradiction recorded in the prior planning document is resolved. **No serious remaining architectural contradiction was found.** Two smaller discrepancies are flagged for a human — a session-size conflict between `LEARNING_MODEL.md` and the prior planning document (§7.2, §13.11), and a now-stale justification sentence in `CONTENT_MODEL.md` §10 (§2.6, §13.12) — neither of which blocks the standard.

The educational recommendation, in one paragraph: a Skill practice bank is a curated, grade-independent pool of 16–36 words, sized by counting the sub-patterns the Skill's frozen scope names (≥6 words each; 16–20 for one, 20–26 for two, 26–36 for three or more), with an explicit and *honourable* shortfall path down to 12 for the six or so Skills whose real inventory is genuinely closed. Words are chosen by seven ordered filters that this repository already applies informally, the most important being that a bank word must be *spellable from this pattern* and must not smuggle in a harder untaught one. A session is 10 words shuffled from the bank, balanced across sub-patterns, with no state and no gamification — a number already decided in `LEARNING_MODEL.md` and adopted unchanged. Demonstration sets and banks may overlap at the word level but the bank must be at least twice as large and at least half new; banks may overlap across Skills freely and must never be a copy or union of Grade Unit Practice Sets.

Two things should not be compromised on. First, **the escape hatch is part of the standard, not an exception to it** — WH Digraph Words and Long U Silent E Words should ship banks of a dozen honest words and be considered fully compliant, because a padded bank for a narrow pattern teaches the pattern wrongly. Second, **Homophones and Commonly Confused Words must ship last and must not ship without real disambiguating sentences**, because the practice engine's isolated-word prompt is not merely weak for those two Skills — it is unanswerable, and a session that marks a correctly-spelled homophone wrong is the one outcome that would damage trust in the whole product.

Everything else here is a bounded content programme against an already-approved architecture.

**SKILL PRACTICE BANK RESEARCH COMPLETE — READY FOR REVIEW**

---

## 19. Sourcing note

Full-text retrieval was blocked by this environment's network egress proxy for `link.springer.com`, `nature.com`, `readingrockets.org`, `irrc.education.uiowa.edu`, and `education.ufl.edu`. Citation metadata below (authors, year, journal, volume, pages, URL) was returned verbatim by search records, and the summarised findings come from those records rather than from full-text reading in this session. Every URL below was returned by a live search in this session; none is reconstructed from memory. Where this document could not confirm a source for a claim, the claim is tagged **[Professional/instructional inference]** rather than cited.

## 20. Citations

**Spelling instruction effectiveness**
- Graham, S., & Santangelo, T. (2014). *Does spelling instruction make students better spellers, readers, and writers? A meta-analytic review.* Reading and Writing, 27, 1703–1743. https://link.springer.com/article/10.1007/s11145-014-9517-0 · ERIC record: https://eric.ed.gov/?id=EJ1041016
- Texas Center for Learning Disabilities summary of the above (Nov 2014). https://texasldcenter.org/education-research-matters/november-2014/
- *Systematic review and meta-analysis of the implementation and effectiveness of spelling instruction and intervention.* Psychology in the Schools. https://onlinelibrary.wiley.com/doi/10.1002/pits.23223

**Structured literacy and word-list construction**
- Orton-Gillingham / IDA, *What is Structured Literacy.* https://www.orton-gillingham.com/what-is-structured-literacy/
- The Orton-Gillingham Approach. https://www.orton-gillingham.com/approach/
- The Literacy Nest, *Orton-Gillingham Lesson Plans: Tips for Word Lists* (2019). https://www.theliteracynest.com/2019/05/orton-gillingham-lesson-plans-tips-for-word-lists.html
- The Literacy Nest, *Word List Builder — diagnostic/prescriptive word list construction* (2025). https://www.theliteracynest.com/2025/05/word-list-builder-orton-gillingham-diagnostic-prescriptive.html

**Word-list size and selection**
- Iowa Reading Research Center, *Where Have All the Spelling Lists Gone?* (Oct 2023). https://irrc.education.uiowa.edu/blog/2023/10/spelling-lists
- Reading Rockets, *The Basic Spelling Vocabulary List.* https://www.readingrockets.org/topics/writing/articles/basic-spelling-vocabulary-list
- The Writing For Pleasure Centre, *Teaching spelling: Powerful evidence-based practices.* https://writing4pleasure.com/teaching-spelling-powerful-evidence-based-practices/
- Johnston, F., Invernizzi, M., Bear, D., & Templeton, S. *Word Sorts for Syllables and Affixes Spellers* (Words Their Way series) — 24 words per sort at that stage. https://www.pearson.com/en-us/subject-catalog/p/word-study-word-sorts-for-syllables-and-affixes-spellers-formerly-words-their-way/P200000011267/9780138220099
- Education Week, *Spellcheck Won't Cut It. Here's Why Kids Need Spelling Instruction* (Feb 2025). https://www.edweek.org/teaching-learning/spellcheck-wont-cut-it-heres-why-kids-need-spelling-instruction/2025/02

**Retrieval practice and spacing**
- Carpenter, S. K., Pan, S. C., & Butler, A. C. (2022). *The science of effective learning with spacing and retrieval practice.* Nature Reviews Psychology. https://www.nature.com/articles/s44159-022-00089-1
- *Retrieval practice benefits for spelling performance in fifth-grade children.* Memory, 31(9). https://www.tandfonline.com/doi/abs/10.1080/09658211.2023.2248420
- *Retrieval practice enhances learning in real primary school settings, whether distributed or not.* https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12372469/
- *Retrieval-Based Learning: Positive Effects of Retrieval Practice in Elementary School Children.* https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4786565/
- *The Advantages of Retrieval-Based and Spaced Practice: Implications for Word Learning in Clinical and Educational Contexts.* Language, Speech, and Hearing Services in Schools. https://pubs.asha.org/doi/abs/10.1044/2020_LSHSS-19i-00001

**Morphology**
- Bowers, P. N., Kirby, J. R., & Deacon, S. H. (2010). *The effects of morphological instruction on literacy skills: A systematic review of the literature.* Review of Educational Research, 80(2), 144–179. https://journals.sagepub.com/doi/abs/10.3102/0034654309359353
- Manyak, P. C., Baumann, J. F., & Manyak, A.-M. (2018). *Morphological Analysis Instruction in the Elementary Grades: Which Morphemes to Teach and How to Teach Them.* The Reading Teacher. https://ila.onlinelibrary.wiley.com/doi/abs/10.1002/trtr.1713 · ERIC record: https://eric.ed.gov/?id=EJ1195302
- Goodwin, A. P., & Ahn, S. *A meta-analysis of morphological interventions: Effects on literacy achievement of children with literacy difficulties.* https://www.researchgate.net/profile/Amanda-Goodwin-2/publication/46010226_A_meta-analysis_of_morphological_interventions_Effects_on_literacy_achievement_of_children_with_literacy_difficulties/links/02e7e53208c8340c90000000/A-meta-analysis-of-morphological-interventions-Effects-on-literacy-achievement-of-children-with-literacy-difficulties.pdf
- Mendes, B. B., & Kirby, J. R. (2024). *The Effects of a Morphological Awareness Intervention on Reading and Spelling Ability of Children With Dyslexia.* https://journals.sagepub.com/doi/10.1177/07319487241259775

**Homophones**
- Orton Gillingham Online Academy, *Teaching Homophones Matters.* https://ortongillinghamonlineacademy.com/blog/teaching-homophones-matters/
- All About Learning Press, *How to Teach Homophones.* https://www.allaboutlearningpress.com/blog/homophones/
- The Literacy Nest, *Building an Understanding of Homophones* (2018). https://www.theliteracynest.com/2018/04/building-understanding-of-homophones.html
- Language Foundations Handbook, *Spelling — Homophones.* https://ecampusontario.pressbooks.pub/languagefoundationshandbook/chapter/spelling-homophones/

**Internal (repository) sources**
`docs/architecture/CONSTITUTION.md` · `docs/architecture/CONTENT_MODEL.md` · `docs/architecture/SKILLS_ARCHITECTURE.md` · `docs/architecture/SKILLS_MODEL.md` · `docs/content/CANONICAL_SKILL_PAGE_STANDARD.md` · `docs/content/CANONICAL_SKILLS_HUB_STANDARD.md` · `docs/content/CANONICAL_GRADE_UNIT_PAGE_STANDARD.md` · `docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md` · `docs/planning/SKILL_PRACTICE_INTEGRATION_PLAN.md` · `docs/content/inventory/skill-pages.md` · `docs/PRACTICE_SESSION_SPEC.md` · `docs/LEARNING_MODEL.md` · `docs/CONTENT_STANDARDS.md` · `src/lib/content/spellingSkills.ts` · `src/lib/content/canonicalSkillRoutes.ts` · `src/lib/words/serialization.ts` · `src/modules/spellingTest/order.ts` · `src/pages/skills/[slug].astro` · `src/content/spelling-lists/**/*.md` (all 41 canonical Skill files, plus all 51 `contentRole: grade-unit` files for §2.8)
