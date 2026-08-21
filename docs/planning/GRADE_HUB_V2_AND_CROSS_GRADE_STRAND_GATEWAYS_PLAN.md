# Grade Hub V2 and Cross-Grade Strand Gateways

**Status:** Architecture proposal only — no production implementation is authorized by this
document.  
**Date:** 2026-08-21  
**Scope:** the six Grade Hubs and a proposed second, strand-first navigation axis at
`/core-spelling`, `/high-frequency-words`, and `/themed-spelling-practice`.

## Executive decision

Adopt the curriculum as a two-dimensional matrix without changing its underlying taxonomy:

- **Grade-first:** Grade Hub → same-grade strand gateway → spelling unit/list.
- **Strand-first:** cross-grade strand gateway → existing grade/strand gateway → spelling
  unit/list.
- **Skill-first:** Skills Hub → grade-independent Skill reference.
- **Rationale:** Curriculum page → educational philosophy, progression principles, and editorial
  method.

Recommend all three cross-grade gateways. Each answers a real, different question using a real
corpus: the 51-unit ordered Core sequence, the frozen 27-set/316-word HFW sequence, and the 27-list
Themed catalog. They are not new curricular categories and do not replace the 18 existing
grade/strand gateways.

Grade Hub V2 should preserve one shared renderer and the current three-card hierarchy. Add one
compact, grade-specific curriculum fingerprint and a restrained preview within each card. Previews
are orientation, not directories: four representative Core unit titles, four HFW words, and up to
four Themed topic titles, all plain text. The card itself remains the single link to the same-grade
gateway.

This proposal **reopens two frozen decisions and cannot be implemented until they are formally
amended**:

1. `CANONICAL_GRADE_HUB_STANDARD.md` currently prohibits listing individual units or themes on a
   Hub and prohibits direct member routes. This plan retains the direct-route prohibition but asks
   for a narrow exception allowing a small, non-linked, editorially selected preview.
2. `LAUNCH_SUPPORTING_PAGES_AND_GLOBAL_NAVIGATION_PLAN.md` explicitly rejects global
   Core/HFW/Themed pages, excludes them from the footer, and includes a test requirement that they
   not exist. The present work should be recorded as an authorized architecture reopening, like
   Homepage V3, before route or navigation work begins.

---

## A. Current Grade Hub diagnosis

### A1. What exists

Production uses one dynamic route (`src/pages/[gradeSlug].astro`), one Direction A renderer
(`GradeHubView.astro`), and one model builder (`buildGradeHubModel`). This is the right structural
foundation:

- all six Hubs share an H1/orientation, a three-card strand grid, a “Where to begin” synthesis,
  and adjacent-grade navigation;
- all counts are derived from the canonical route manifest and live word data;
- gateway URLs come from shared route helpers;
- the Hub `ItemList` correctly describes only the three visible gateway destinations; and
- grade atmosphere and strand accent semantics remain separate and should not change.

### A2. Why the Hubs still feel alike

The opening two paragraphs are genuinely grade-specific and already communicate maturation from
alphabetic foundations through morphology and integrated upper-elementary spelling. The problem
begins below them:

- every Core card is assembled from the same sentence frame (“Core Spelling is the main
  systematic path. Its N ordered units…”);
- every HFW card uses the same relationship/count frame;
- every Themed card differs almost entirely by its generated count;
- every card has exactly the same information density and CTA shape; and
- no card gives a scannable, concrete glimpse of the actual curriculum behind its gateway.

The source copy is grade-specific, but it is mostly broad scope prose. Consequently, a reader must
parse the two long opening paragraphs or enter each gateway to see the sharp difference between,
for example, Grade 2 vowel/syllable work and Grade 4 morphology/academic-word work.

### A3. What is genuinely grade-specific today

- two-paragraph grade orientation, metadata, Core scope, HFW relationship wording, Themed
  framing, and cross-strand synthesis in `gradeHubCopy.ts`;
- live Core unit, HFW set/word, and Themed-list counts from `gradeHubModel.ts`;
- actual ordered membership, titles, descriptions, short answers, word inventories, and canonical
  paths from the route manifest and content collection;
- a continuous ordered Core sequence in `CORE_SPELLING_SEQUENCE`;
- the authoritative HFW inventory and totals in `FROZEN_HF_WORDS_CURRICULUM`; and
- a complete, stable Themed inventory (5 + 5 + 5 + 4 + 4 + 4 lists).

### A4. Inventory facts available without new curriculum

| Grade        | Core units | HFW sets | HFW words | Themed lists |
| ------------ | ---------: | -------: | --------: | -----------: |
| Kindergarten |          8 |        4 |        40 |            5 |
| 1st Grade    |         12 |        7 |        84 |            5 |
| 2nd Grade    |         13 |        7 |        84 |            5 |
| 3rd Grade    |          7 |        5 |        60 |            4 |
| 4th Grade    |          6 |        2 |        24 |            4 |
| 5th Grade    |          5 |        2 |        24 |            4 |

The route/content data can generate titles and counts, but it cannot decide which examples best
represent a grade. `description`, `shortAnswer`, `skillIds`, and tags are member-level teaching or
relationship metadata; none is a safe substitute for an editorially approved grade fingerprint.

---

## B. Grade Hub V2 content model

### B1. Shared anatomy

Keep the same anatomy for all six Hubs:

1. Breadcrumb.
2. Grade H1 and the existing two-paragraph orientation.
3. **New open editorial fingerprint:** “What students work on in {grade},” with five or six short
   concept phrases separated by middots or rendered as a wrapping, low-emphasis list. Do not put it
   in a fourth large card.
4. The same three strand cards in canonical order.
5. Existing cross-strand “Where to begin” guidance.
6. Existing adjacent-grade navigation.

This produces “same information architecture, different curriculum substance.” No grade-specific
renderer branches, visual motifs, icons, or colors are needed.

### B2. What changes by strand

#### Core Spelling card

- Keep: role as the main systematic path, derived unit count, and same-grade gateway CTA.
- Add: one grade-specific sentence describing that grade's instructional movement, plus exactly
  four curated representative **canonical public titles** in curriculum order.
- Presentation: a small “A few units you’ll find here” label and a wrapping plain-text line. Avoid
  chips if chips imply filters/actions in the design system.
- Linking: do **not** link examples individually. The whole card is already one large link, nested
  links are invalid, direct member shortcuts bypass the gateway's sequence/orientation, and the
  frozen Hub hierarchy explicitly protects that intermediate layer.
- Editorial rule: the four examples should span the sequence rather than mechanically select the
  first four. Store stable IDs, resolve titles/paths for validation, and render titles only.

#### High-Frequency Words card

- Keep: HFW-alongside-Core relationship, derived set and word counts.
- Add: one grade-specific sentence about the role/shape of this grade's collection and exactly
  four curated representative words from the frozen inventory.
- The card must explicitly avoid “HFW = irregular.” Across cards, language should say these are
  frequently encountered spellings with a mix of predictable patterns and details needing
  attention.
- Presentation: “Examples include: …” as plain text, not word chips or links. Words never link to
  sets from a Hub.
- Selection is editorial, not an algorithmic “first four.” It should demonstrate the grade's
  range without implying that the four words are a complete difficulty definition.

#### Themed Spelling Practice card

- Keep: optional/nonsequential framing, derived list count, same-grade gateway CTA.
- Add: up to four representative canonical topic titles. Kindergarten–Grade 2 have five lists, so
  one is deliberately omitted; Grades 3–5 have four and can show all four.
- Presentation: “Topics include: …” as a restrained plain-text line. Strip only the mechanically
  repeated grade/“Spelling Words” wrapper through explicit display labels; do not perform brittle
  title-string manipulation at render time.
- Do not claim that thematic grouping improves retention. It is recognizable context for optional
  spelling practice.

### B3. Concrete, repository-grounded examples

These examples demonstrate the intended content density; final copy still needs editorial signoff.

#### 2nd Grade Core Spelling

> **Core Spelling**  
> The main 13-unit sequence broadens vowel spelling, then applies sound and pattern knowledge to
> r-controlled vowels, soft consonants, syllables, silent letters, and word building.  
> **A few units you’ll find here:** R-Controlled Vowels: ER, IR, and UR · Two-Syllable Words ·
> Silent Letter Words · Compound Words  
> **Explore Core Spelling →**

All four are live canonical titles. This preview communicates progression without reproducing the
13-unit gateway.

#### 4th Grade Core Spelling

> **Core Spelling**  
> The six-unit sequence uses syllables, affixes, roots, and meaning relationships to support longer
> academic words and more independent spelling choices.  
> **A few units you’ll find here:** Multisyllabic Academic Words · Advanced Prefix Words · Latin
> Root Words · Derived Words and Word Meaning  
> **Explore Core Spelling →**

This corrects an important prompt-level assumption: “Greek/Latin roots” accurately describes the
broad Grade 4 curriculum, but the live Grade 4 Core member title is **Latin Root Words**. Grade Hub
examples must use the production title, not normalize it into a title the repository does not have.

#### 2nd Grade High-Frequency Words

> **High-Frequency Words**  
> Seven sets provide focused practice with 84 frequently used words alongside Core Spelling. The
> collection includes familiar spellings and words whose vowel, syllable, or letter sequence merits
> closer attention.  
> **Examples include:** again · people · school · night  
> **Explore High-Frequency Words →**

These are real frozen Grade 2 words. The wording does not label every example irregular and does
not teach their spelling on the Hub.

#### 4th Grade Themed Spelling Practice

> **Themed Spelling Practice**  
> Four optional, nonsequential lists place additional spelling practice in familiar school and
> real-world topics.  
> **Topics include:** Measurement · Solar System · Careers & Occupations · Geometry  
> **Explore Themed Spelling Practice →**

These display labels map explicitly to the four canonical Grade 4 themed members; they are not a
new subject taxonomy.

### B4. Curriculum fingerprints for all six grades

Use five or six curated concepts, not automatically tokenized titles:

| Grade        | Proposed fingerprint                                                                                                                |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Kindergarten | Sounds and letters · First words · Short vowels · Mixed-vowel review · Consonant digraphs · First high-frequency spellings          |
| 1st Grade    | Short-vowel accuracy · Blends and digraphs · Silent e · Vowel teams · Inflectional endings · Early r-controlled vowels              |
| 2nd Grade    | Broader vowel patterns · R-controlled vowels · Soft c and g · Two-syllable words · Silent letters · Word building                   |
| 3rd Grade    | Prefixes · Suffixes · Spelling changes · Possessives · Multisyllabic words · Meaning and word families                              |
| 4th Grade    | Academic multisyllabic words · Advanced affixes · Latin roots · Stable endings · Confused words · Derived-word relationships        |
| 5th Grade    | Advanced academic spelling · Roots and affixes · Greek and Latin word parts · Meaning-based choices · Related-word spelling changes |

These are editorial summaries of canonical scope, not a new layer of Skill links. Keep every item
plain text.

### B5. Mobile-length controls

- Fingerprint: maximum six phrases; wrap naturally; no descriptions per phrase.
- Strand summary: target 35–55 words before its preview.
- Core/HFW preview: exactly four examples; Themed: maximum four.
- No member descriptions, word counts per unit, thumbnails, expandable directories, or secondary
  K–5 links inside cards.
- Keep one CTA per card. A full-width card remains understandable as a single destination.
- Test at 320, 375, and 768 CSS pixels. If a card becomes too tall, shorten authored prose rather
  than hide canonical information behind a mobile-only disclosure.

---

## C. Cross-grade gateway recommendations

| Route                       | Recommendation | H1                                    | Primary intent                                                                                      |
| --------------------------- | -------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `/core-spelling`            | **Yes**        | **K–5 Core Spelling Curriculum**      | Understand how the systematic Core path develops from Kindergarten through Grade 5.                 |
| `/high-frequency-words`     | **Yes**        | **High-Frequency Words by Grade**     | Understand what HFW means here and locate the grade-level set sequence.                             |
| `/themed-spelling-practice` | **Yes**        | **Themed Spelling Practice by Grade** | Browse the real optional topic catalog across grades, then choose the appropriate grade collection. |

### C1. `/core-spelling`

**Owns:** a brief Core definition; K–5 developmental arc; six grade-specific Core summaries;
derived unit counts; curated representative unit titles/concepts; links to all six existing Core
gateways.

**Excludes:** full methodology, research claims, all 51 unit descriptions, word inventories,
practice controls, full pattern teaching, readiness guidance, and a second copy of each grade's
complete ordered sequence.

**Relationship to children:** it is an orientation/index across grades. Each child gateway remains
the authoritative complete ordered inventory, owns where-to-begin guidance, and links onward to
units.

**Display choice:** use a concise six-row/section editorial progression, not accordions. Each grade
shows its count plus three or four curated unit titles and one CTA. Do not show all 51 titles: that
would recreate all six gateway inventories and make the page a replacement rather than an axis.

### C2. `/high-frequency-words`

**Owns:** concise canonical definition; frequency-versus-irregularity distinction; how HFW
complements Core; derived K–5 totals; grade-by-grade set/word counts; one brief grade-specific
orientation; links to all six HFW gateways.

**Excludes:** all 316 words, set cards, word-level spelling notes, sentences, practice controls,
methodology/source history, and claims that HFW and Core align unit by unit.

**Relationship to children:** the cross-grade page explains and locates the sequence. Each
grade/HFW gateway remains the complete cumulative set inventory.

**Display choice:** counts and descriptions are clearer than representative words at this level.
Examples already appear on the homepage and proposed Grade Hubs; repeating words six more times
would add little cross-grade information and risk readers interpreting samples as a list.

### C3. `/themed-spelling-practice`

**Owns:** a brief definition of optional/nonsequential themed practice; the actual topic catalog
grouped by grade; derived counts; links to all six Themed gateways.

**Excludes:** claims about retention, topic instruction/vocabulary definitions, word inventories,
member descriptions, practice controls, a new taxonomy grouping topics across subjects, and any
implied cross-grade prerequisite sequence.

**Relationship to children:** this page answers “what optional topics exist anywhere in K–5?” A
grade/Themed gateway remains the authoritative list of selectable pages for that grade and owns
selection guidance.

**Why it is justified:** the 27-member inventory is large and visibly changes with learner context
(e.g., Kindergarten Animals/Body/Numbers/Colors/Family; Grade 4 Measurement/Solar System/Careers
and Occupations/Geometry; Grade 5 Money Management/Ecosystems and Environment/Fractions and
Decimals/Community and Civics). Cross-grade browsing is a genuine discovery task, not symmetry for
symmetry's sake.

**Display choice:** because there are only four or five topics per grade, show every topic as plain
text under its grade, with one link to that grade's gateway. Do not link all 27 topic names. The
page is a catalog, but the click hierarchy still passes through the grade-specific gateway.

---

## D. Proposed page anatomy

### D1. K–5 Core Spelling Curriculum

1. Home → Core Spelling breadcrumb.
2. H1 and a 1–2 paragraph direct answer: Core is the main systematic grade-level sequence.
3. Compact “How Core develops” bridge: foundation (K–1), expansion (2–3), integration (4–5).
   Phrase this uniquely; do not copy the homepage progression section.
4. Six grade sections in canonical order. Each contains:
   - grade heading linked only through a distinct CTA;
   - derived unit count;
   - 1–2 sentence curated progression summary;
   - 3–4 representative canonical unit titles as plain text; and
   - “View {grade} Core Spelling” → existing gateway.
5. Boundary note: students may review adjacent grades; grade placement is a useful starting point,
   not a mastery score.
6. Contextual link to `/curriculum` for methodology and `/skills` for concept explanations.

### D2. High-Frequency Words by Grade

1. Home → High-Frequency Words breadcrumb.
2. H1 and direct definition.
3. Visible clarification: “high-frequency” describes how often words occur, not whether every
   spelling is irregular; explain that HFW is practiced alongside Core.
4. Derived corpus summary: 27 sets and 316 unique grade-owned words.
5. Six grade sections with set count, word count, one curated grade-role sentence, and one link to
   the existing grade/HFW gateway.
6. Brief organization note: sets are cumulative within a grade; they do not mechanically align to
   Core units.
7. Links to `/core-spelling` and `/curriculum` where the relationship/rationale requires them.

Do not add an FAQ merely to restate the definition. The top answer and grade facts are already
answer-friendly.

### D3. Themed Spelling Practice by Grade

1. Home → Themed Spelling Practice breadcrumb.
2. H1 and direct definition: optional, additional, nonsequential spelling practice in recognizable
   contexts.
3. Short “How to use these lists” guidance: choose the learner's grade and a useful/interesting
   topic; Core remains the recommended systematic path.
4. Six grade sections with derived count, all canonical topic display labels as plain text, and one
   link to the existing grade/Themed gateway.
5. Contextual link to `/core-spelling` for the systematic path and `/curriculum` for strand roles.

No cross-subject filters, search interface, or topic taxonomy is warranted for 27 items.

---

## E. Content ownership map

| Page family                                                | Governing question                                              | Owns                                                                                                                                | Deliberately does not own                                                 |
| ---------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Homepage                                                   | What can I do here, and which major route fits?                 | Product identity; own-list practice entry; brief Grade/Skill/strand orientation                                                     | Grade inventories, K–5 strand maps, lessons, methodology detail           |
| Grade Hub                                                  | What should a student in this grade practice?                   | Grade-wide orientation; concise fingerprint; three grade-specific strand previews; cross-strand starting guidance                   | Complete member inventories; K–5 strand progression; concept teaching     |
| Top-level strand gateway                                   | How does this one strand progress/organize across K–5?          | Six-grade comparison/orientation; cross-grade counts/catalog; links to grade/strand gateways                                        | Complete Core/set inventories; unit content; full educational rationale   |
| Grade/strand gateway                                       | What units, sets, or topics exist in this strand at this grade? | Strand synthesis for one grade; complete authoritative child inventory; Core starting guidance                                      | Sibling-strand explanation; full K–5 map; member teaching/practice        |
| Spelling unit/list page (internal: Grade Unit/member page) | What do I learn and practice in this specific unit/list?        | Unit explanation, assigned words, notes, readiness, practice                                                                        | Whole-grade or K–5 synthesis                                              |
| Skill page                                                 | How does this spelling concept work, independent of grade?      | Durable concept explanation, examples/demonstration, teaching support, grade-placement relationships                                | Grade ownership, grade sequence, duplicate assigned unit list             |
| Curriculum page                                            | Why is the system designed this way?                            | Philosophy, progression principles, strand relationships, selection/exclusion criteria, editorial/research method, U.S. positioning | Complete inventories, grade-by-grade directory, individual concept lesson |

Public copy should say **grade page**, **Core Spelling page**, **spelling unit**, **word set**,
**themed list**, and **spelling skill/concept**. Keep **Grade Hub**, **Grade-Strand Gateway**,
**member**, **Grade Unit identity**, **route manifest**, and **frozen contract** in code/docs only.

---

## F. URL, canonical, breadcrumb, sitemap, and internal-link plan

### F1. Routes and canonicals

Use exactly:

- `/core-spelling`
- `/high-frequency-words`
- `/themed-spelling-practice`

They are short, readable, consistent with all existing child route segments, and extensible. Do
not nest them under `/curriculum`: they are browse gateways, while `/curriculum` owns rationale.
Do not move or redirect any existing grade route. Every new page gets a self-referencing canonical
through the existing `getCanonicalUrl`/`Layout` convention.

### F2. Breadcrumbs

- Top-level strand: `Home → {Strand}`.
- Existing grade/strand gateway remains `Home → {Grade} → {Strand}`. Do not add the top-level
  strand as a fourth breadcrumb because URL ancestry and the user's grade-first trail remain valid.
- Existing member remains `Home → {Grade} → {Strand} → {unit/list}`.

The cross-grade relationship is lateral navigation, not a claim that existing pages changed
parents.

### F3. Sitemap and structured data

- Add the three paths to `sitemap.xml`; expected canonical total changes from 176 to 179 if no
  other routes change.
- Add `BreadcrumbList` matching each visible breadcrumb.
- Add an `ItemList` of the six linked grade/strand gateways on each top-level page. For Themed,
  topic labels are plain text, so the ItemList must still contain only the six actual linked
  destinations.
- Do not add `FAQPage`, `Course`, or crawler-only schema without matching visible content and a
  separate evidence-based need.

### F4. Internal-link rule

**Homepage:** link each of the three strand card/headings to its top-level strand gateway once the
routes exist. Keep example concepts/words/topics plain text. This converts the existing
organization explanation into the natural entry to the newly valid second axis without linking to
deep units. Amend the frozen Homepage Standard's current link-depth rule first.

**Grade Hubs:** keep each primary card linked only to its same-grade gateway. Do not add “View K–5
progression” three times: it competes with the page's grade-first job, creates two destinations per
card, and lengthens mobile cards. A single low-emphasis sentence after the three cards may link to
the three K–5 gateways only if usability review shows readers need axis switching; default is no.

**Curriculum:** link each strand name in its strand-roles section to the corresponding top-level
gateway. `/curriculum` remains the “why”; these links hand off to “what across grades.” Do not copy
the six-grade summaries into Curriculum.

**Footer:** revise Explore to:

1. Core Spelling
2. High-Frequency Words
3. Themed Spelling Practice
4. Spelling Skills
5. Practice Your Own Words

Remove “Browse All Grades” from Explore because the dedicated Grades column already lists all six
destinations. Five Explore links are still restrained and expose the two browse axes plus practice.

**Header:** no change. Grades, Skills, Curriculum, and Practice represent user intents. Adding
three curriculum strands would mix a lower-level content axis into primary navigation, overload
mobile, and give Themed equal global prominence to the systematic Core path. Top-level URL does not
automatically mean top-level header item.

**Cross-grade pages:** link laterally only when it clarifies strand relationships (HFW ↔ Core;
Themed → Core as systematic path) and to Curriculum for rationale. Do not create a repeated
three-tab navigation that looks like a new primary taxonomy.

---

## G. Data/model changes

### G1. Reuse existing canonical data

Generate these facts:

- grade order/labels/hrefs from `gradeConfig`;
- strand labels and grade/strand paths from `GRADE_STRANDS` and route helpers;
- membership/counts/paths from `canonicalGradeRoutes`;
- Core order validation from `CORE_SPELLING_SEQUENCE`;
- member titles/descriptions/words from the content collection;
- HFW set and word totals from `FROZEN_HF_WORDS_CURRICULUM` (and assert content equality); and
- Themed membership/order from canonical routes.

### G2. Smallest durable curated model

Extend the existing grade-authored module rather than content frontmatter on 105 members:

```ts
type GradeHubPreview = {
  fingerprint: readonly string[]; // exactly 5–6 curated concepts
  core: {
    summary: string;
    representativeIds: readonly [string, string, string, string];
  };
  hfw: {
    summary: string;
    representativeWords: readonly [string, string, string, string];
  };
  themed: {
    summary: string;
    representativeIds: readonly string[]; // 4 maximum
    displayLabels: Readonly<Record<string, string>>;
  };
};

type CrossGradeStrandCopy = {
  intro: string;
  gradeSummaries: Record<GradeCode, string>;
  coreRepresentativeIds?: Record<GradeCode, readonly string[]>;
  themedDisplayLabels?: Readonly<Record<string, string>>;
};
```

Prefer two explicit exports (`gradeHubPreviewCopy` and `crossGradeStrandCopy`) over expanding the
content collection schema. These are page-family editorial decisions, not intrinsic properties of
an individual unit. The same member may be representative on one gateway and not another.

IDs, not copied titles, make examples resilient to title correction while tests guarantee that
every ID belongs to the correct grade/strand. Display-label overrides are explicit only where a
canonical title contains redundant grade/page words; never generate them with regex title
stripping.

### G3. Never infer automatically

- instructional summaries or fingerprints from slugs, tags, or title frequency;
- “representative” status from first/featured/popular items;
- spelling characteristics from HFW word shapes;
- HFW regularity/irregularity classifications;
- subject taxonomies from themed titles;
- progression claims from counts; or
- public display labels through string replacement.

Add validation tests for membership, uniqueness, tuple/list length, Core order, frozen-word
membership, non-empty summaries, no deprecated HFW terminology, and absence of direct member URLs
in Grade Hub output.

---

## H. SEO / GEO / AEO assessment

These pages are legitimate entities because each resolves a navigation and comprehension gap that
the grade-first architecture cannot:

- Core shows one continuous instructional progression across six otherwise separate gateways.
- HFW provides one precise definition and the complete grade/set/count organization of a frozen
  316-word curriculum.
- Themed exposes a bounded 27-topic catalog across grades and helps a reader choose the appropriate
  grade collection.

They avoid doorway-page behavior because they contain unique cross-grade synthesis, do not swap a
grade token into identical copy, do not reproduce child-page word lists, and send users to complete
authoritative gateways rather than funneling every query into practice. Clear H1s, early direct
answers, semantic grade headings, derived counts, descriptive anchors, breadcrumbs, and visible
ItemLists make the relationships understandable to people, crawlers, and answer systems without
AI-only prose or keyword blocks.

Potential cannibalization is controlled by intent and ownership:

- top-level strand page = K–5 overview;
- grade/strand gateway = complete inventory and sequence for one grade;
- member page = one lesson/list and practice;
- Skill page = grade-independent concept explanation;
- Curriculum = rationale/methodology.

Metadata must reflect those different jobs. Do not use the same title/description frame on all
levels, and do not claim the top-level Core page teaches individual patterns.

---

## I. Governance impact

Before implementation, approve and amend:

1. **Canonical Grade Hub Standard §§4, 6, 11, and 12.** Permit only a bounded, non-linked preview
   (four representative names/words/topics) while retaining the ban on inventories, member cards,
   and direct member routes. Add the fingerprint requirement and preview validation rules.
2. **Launch Supporting Pages and Global Navigation Plan §§B/footer/implementation.** Supersede the
   explicit statement that global strands do not exist, the footer exclusion, and the “verify no
   global strand route” check. Record the date/reason rather than silently deleting history.
3. **Public URL Architecture.** Add the three canonical page identities and clarify that they are
   lateral parents for a strand-first journey, not URL ancestors of existing grade routes.
4. **Canonical Homepage Standard §§7/10 (linking).** Authorize the three existing strand summaries
   to link one level to the new gateways; keep representative examples non-linked.
5. **Canonical Grade-Strand Gateway Standard §§1, 3, and 5.** Replace “never a full K–5 map (that's
   a site-wide feature, not this page's job)” ambiguity with an explicit handoff to the new
   top-level strand page; retain each gateway's full member ownership.
6. **Canonical naming/terminology audit.** Add public labels for these page families while keeping
   “cross-grade gateway” internal.
7. **Tests/standards:** update sitemap count, footer expected links/column contents, homepage
   allowed-link tests, current-path/header tests if needed, canonical-route completeness tests, and
   any test asserting nonexistent top-level strand routes.

The constitution's rule against generating pages merely because routes are possible remains
satisfied: this proposal documents the user task and unique information gain for every route.
Direction A design tokens and semantics are not reopened.

---

## J. Reviewable implementation sequence

Each phase should be independently reviewable; production route work begins only after Phase 0 is
approved.

1. **Governance amendment (docs-only commit).** Amend frozen authorities, define ownership and
   terminology, record this authorized reopening.
2. **Curated data + validation (no UI commit).** Add preview/cross-grade copy types and six-grade
   editorial data; add membership/count/order/terminology tests.
3. **Grade Hub V2 model (logic commit).** Resolve IDs/words against production data and expose a
   typed render model; preserve gateway-only hrefs and schema.
4. **Grade Hub V2 presentation (UI commit).** Add fingerprint and restrained previews to the shared
   renderer; responsive/a11y review and screenshots at representative desktop/mobile sizes.
5. **Shared cross-grade gateway model (logic commit).** Add route constants/helpers, six-grade
   aggregation, metadata inputs, and tests without publishing pages.
6. **Core gateway (page commit).** Implement `/core-spelling`, canonical metadata, breadcrumb,
   six-child ItemList, links, sitemap, and crawl tests.
7. **HFW gateway (page commit).** Implement `/high-frequency-words` from the frozen executable
   curriculum; test 27/316 totals and frequency ≠ irregularity language.
8. **Themed gateway (page commit).** Implement `/themed-spelling-practice`, explicit topic labels,
   all 27 plain-text topics, and six child gateway links.
9. **Internal linking/navigation (separate commit).** Homepage strand links, Curriculum handoffs,
   footer Explore revision; header unchanged.
10. **Release audit (verification commit only if fixes result).** Build, unit tests, lint/format,
    static crawl, unique title/H1/canonical check, sitemap 179 check, JSON-LD/visible-link parity,
    keyboard/heading review, and 320/375/768/desktop screenshots.

---

## K. Open decisions requiring product/editorial approval

1. **Approve the frozen-standard reopening:** allow up to four non-linked representative examples
   per Grade Hub card, or retain the present no-member-name boundary and rely only on fingerprints.
   This is the principal decision; direct member links are not recommended in either case.
2. **Approve all three top-level gateways together or defer Themed:** Core and HFW have the
   strongest progression intent. This plan finds Themed independently useful because the real
   27-topic catalog supports cross-grade discovery, but product may choose a staged launch after
   observing the first two.
3. **Themed catalog density:** approve all 27 plain-text topic labels on the cross-grade page
   (recommended), or cap each grade at four and require an extra click for the fifth K–2 topic.
4. **Final editorial selections/copy:** approve the four representative IDs/words per Hub and the
   six grade summaries per top-level strand. These are curriculum-facing editorial judgments and
   must not be generated.
5. **Footer rollout timing:** update Explore when all three pages publish (recommended) rather than
   exposing a partial strand set during staged implementation.

Everything else—URL spelling, preservation of existing grade routes, no header additions, one CTA
per Grade Hub card, no direct unit shortcuts, derived counts, and the ownership boundaries above—
has a clear architectural answer and should not remain open during implementation.
