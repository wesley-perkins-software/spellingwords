# Authoritative K–5 Content Architecture

> **Status: authoritative, frozen at the architecture level.** This document is the single implementation reference for K–5 grade hubs and their curriculum-facing content. It replaces the broad architecture recommendations in [K5_FINAL_CONTENT_PLAN.md](./K5_FINAL_CONTENT_PLAN.md), [K5_SIMPLE_WEBSITE_CONTENT_PLAN.md](./K5_SIMPLE_WEBSITE_CONTENT_PLAN.md), and [CANONICAL_CURRICULUM_IMPLEMENTATION_PLAN.md](./CANONICAL_CURRICULUM_IMPLEMENTATION_PLAN.md). Historical research remains useful evidence; it is not an implementation specification.

## 1. Decisions that are frozen

### Public grade-hub architecture

Every K–5 grade hub has these sections, in this order:

1. **Learn in Order** — a recommended encoding/spelling route.
2. **Common Words to Spell** — one gateway to cumulative common-word sets.
3. **Practice by Topic** — small, optional, clearly scoped vocabulary collections.

Grade hubs recommend canonical content; they do not create alternate copies of it. A focused Skill can be reached from its Grade Unit, a Skill browse surface, search, and related links, but it has one canonical practice URL.

### Content identity and URLs

- Keep the existing flat canonical-list URL shape: `/spelling-lists/{category}/{urlSlug}`.
- A gateway is an existing `spelling-collections` entry when it is only an orientation page that lists child practice sets. Its canonical URL is `/spelling-lists/collections/{urlSlug}`.
- A practice set remains a `spelling-lists` entry, normally in the existing `sight-words` category for Common Words during this validation slice. This preserves current routes and requires no new top-level category.
- Keep stable IDs forever. A title, section placement, or helper copy can change without changing an ID or URL.
- `grade-unit` is for an instructional roadmap page; `skill` is reusable focused pattern practice; `sight-word-set` is the appropriate existing content role for a numbered Common Words set; `vocabulary-theme` is for a bounded optional topic list.
- Do not create duplicate grade-nested URLs, duplicate Sight Word pages, or duplicate Heart Word pages for the same words.

### Common Words system

Every grade has exactly one Common Words gateway and these eventual numbered-set counts:

| Grade | Sets | Role |
|---|---:|---|
| Kindergarten | 4 | Early high-frequency writing words, including appropriate Heart Word annotations. |
| Grade 1 | 6 | Continued useful words and irregular/temporarily irregular spellings. |
| Grade 2 | 6 | Final heavy acquisition year for common school-writing words. |
| Grade 3 | 5 | Everyday writing words and persistent trouble words. |
| Grade 4 | 4 | Narrow corrective writing-spelling sequence. |
| Grade 5 | 4 | Narrow corrective writing-spelling sequence. |

Dolch and Fry are source/reference pools, not public curriculum taxonomies. “Sight words,” “high-frequency words,” and “Heart Words” are explanatory search and helper terms, never peer top-level architectures. Heart Word treatment is mainly K–2 and is an annotation, not a separate route family.

### What remains flexible

The following are deliberately **not** architecture decisions: exact word membership after the validation sets, the detailed K/Grade 1 card descriptions, which later topic pages meet quality thresholds, the exact Grade 4–5 root families, and the individual visual treatment of an annotation. They require editorial curation or implementation work, but may not change the three sections, URL/identity rule, or Common Words set counts without an explicit new architecture decision.

### Deferred optional content

Do not add generic “vocabulary,” “challenge,” “more topics,” “geography,” “family,” “school,” or duplicated subject pages merely to fill a grid. K–5 optional topic pages are deferred until a page has a coherent word set, a distinct parent need, and enough original educational value.

## 2. Repository reconciliation

The repository already contains a substantial raw library: published phonics, grade-level, sight-word, and challenge lists; six grade hubs; Dolch collections; curated Kindergarten and Grade 1 progressions; reusable focused Skills; and one dynamic canonical detail route. The architecture work is therefore primarily **reclassification, linking, and selective gap filling**, not wholesale replacement.

| Existing asset | Final treatment |
|---|---|
| `spelling-lists` schema and related/prerequisite/next IDs | Retain. It already supports stable identity, grade association, list sequence, provenance, and crawlable relationships. |
| `spelling-collections` schema | Retain. Use it for Common Words gateways; no gateway-specific framework is needed. |
| Flat list route and collection route | Retain as the only canonical URLs. |
| Kindergarten curated progression | Reframe into the three frozen sections; retain underlying practice URLs. |
| Grade 1 curated progression and focused Skills | Retain its stronger instructional distinctions; reduce what appears as peer grade-hub cards. |
| Dolch collections and sets | Retain as reference/discovery pages, not grade-route cards. |
| Existing Heart Word pages | Retain as source material and related practice; absorb their public curriculum role into Common Words. |

## 3. Final K–5 map

This is the final grade-level content map. “Existing” means reuse/reframe source material; “new” means author a genuine gap or gateway; “merge” means retain focused child pages while presenting one parent-facing roadmap item.

| Grade | Learn in Order | Common Words | Practice by Topic |
|---|---|---|---|
| K | First Words; Short A, I, O, U, E; Mixed CVC Review; late-K Digraph preview. `-ck`/FLOSS are not required. | 4 sets + gateway. | Number and Color Words; Animal Words. |
| 1 | Short Vowel Review & C/K; FLOSS; Digraphs & Final `-ck`; Beginning Blends; Ending Blends; Silent E; Open Syllables & Final Y; Vowel Teams; `-s/-es`; `-ed/-ing`; R-Controlled Vowels; `-tch/-dge`. | 6 sets + gateway. | Deferred in the first slice. |
| 2 | R-Controlled Vowels; Diphthongs/additional vowel patterns; Soft C/G **new**; Silent Letters/ending patterns; two-syllable and final-stable-`-le` bridge **new**; compounds; contractions; inflectional changes. | 6 sets + gateway. | Months; Math; one Plants/Animals science page; Story-Writing Words after audit. |
| 3 | Longer words/syllable division; Prefixes; Suffixes; merged base-word changes; Homophones/confusions; review. | 5 sets + gateway. | Math; Earth/Weather; Maps/Communities; Writing Transitions after audit. |
| 4 | Multisyllabic spelling/unstressed vowels; prefixes/derived words; suffixes/stable endings; Latin roots; Greek roots; confusions. | 4 sets + gateway. | Math; Science; Social Studies; opinion/explanation writing after audit. |
| 5 | Advanced multisyllabic spelling; academic prefixes; academic suffixes plus `-tion/-sion/-cian`; Greek/Latin word parts; related-word spellings **new**; confusions; editing. | 4 sets + gateway. | Math; Science; U.S. History/Civics; research/transition writing after audit. |

### Publishing estimate

The prior 180-page recommendation is not a target. Reuse existing canonical practice URLs and add only coherent pages: 29 Common Words sets, 6 Common Words gateways, a small number of genuine Grade 2/5 instructional gaps, and later optional topic pages that clear editorial review. The initial validation slice creates 6 sets and 2 gateways; it does not create Grade 2–5 pages.

## 4. Exact Kindergarten grade-hub cards

The visible Kindergarten hub has twelve cards. A direct page means its listed canonical route is the card destination. A Grade Unit keeps its existing practice page identity; a collection is a new Common Words gateway only.

| # | Section | Public title | Type and destination | Underlying content | Status | Parent-facing description | Role |
|---:|---|---|---|---|---|---|---|
| 1 | Learn in Order | **First Words** | Direct Grade Unit: `kindergarten-first-words` → `/spelling-lists/grade-level/kindergarten-first-words` | Existing mixed familiar CVC list. | Renamed from “Kindergarten First Words.” | Start with eight familiar, sound-out words that help a child connect spoken sounds to letters before concentrating on one vowel pattern. | Essential |
| 2 | Learn in Order | **Short A Words** | Direct Grade Unit: `kindergarten-short-a-words` | Canonical focused Short A practice. | Existing. | Practice short-a CVC words as the first focused vowel step. | Essential |
| 3 | Learn in Order | **Short I Words** | Direct Grade Unit: `kindergarten-short-i-words` | Canonical focused Short I practice. | Existing. | Continue the sequence with short-i CVC words. | Essential |
| 4 | Learn in Order | **Short O Words** | Direct Grade Unit: `kindergarten-short-o-words` | Canonical focused Short O practice. | Existing. | Practice the short-o vowel sound in simple words. | Essential |
| 5 | Learn in Order | **Short U Words** | Direct Grade Unit: `kindergarten-short-u-words` | Canonical focused Short U practice. | Existing. | Practice the short-u vowel sound in simple words. | Essential |
| 6 | Learn in Order | **Short E Words** | Direct Grade Unit: `kindergarten-short-e-words` | Canonical focused Short E practice. | Existing. | Finish the focused short-vowel sequence with short-e words. | Essential |
| 7 | Learn in Order | **Mixed CVC Review** | Direct Grade Unit: `kindergarten-mixed-vowel-review` | Mixed-vowel CVC review. | Existing. | Check whether a child can choose among short vowels instead of relying on one list pattern. | Review |
| 8 | Learn in Order | **Digraph Words** | Direct late-K preview Grade Unit: `kindergarten-consonant-digraphs` → `/spelling-lists/phonics/kindergarten-consonant-digraphs` | Existing K preview; link onward to canonical CH/SH/TH/WH Skills where available. | Renamed/reframed. | Try common two-letter consonant sounds after CVC work; this is a preview, not a required kindergarten milestone. | Optional preview |
| 1 | Common Words to Spell | **Kindergarten Common Words** | New collection gateway: `kindergarten-common-words` → `/spelling-lists/collections/kindergarten-common-words` | The four numbered K Common Words sets. | New. | Practice four small, cumulative sets of everyday words, noticing the regular parts and the small parts learned by heart. | Essential |
| 1 | Practice by Topic | **Number and Color Words** | Direct vocabulary page: `kindergarten-number-color-words` → `/spelling-lists/grade-level/kindergarten-number-color-words` | Existing 10 number words plus red, blue, yellow, green. | Existing; intentionally not split. | Practice useful number and color spellings from kindergarten math, art, and classroom routines. | Optional |
| 2 | Practice by Topic | **Animal Words** | Direct vocabulary page: `kindergarten-animal-words` → `/spelling-lists/grade-level/kindergarten-animal-words` | Existing familiar animal list. | Existing. | Practice concrete animal names while applying early sound-to-letter knowledge. | Optional |

**First Words decision:** the final visible title is **First Words**. It is plain, short, and accurately describes the existing direct on-ramp; “Spell Your First Words” is an unnecessary imperative and “First Words and Letter Sounds” overpromises a distinct letter-sound lesson. It differs from the Short Vowel cards because it deliberately mixes familiar CVC words across vowels to establish sound-based spelling transfer before focused vowel discrimination.

**Short Vowels decision:** show the five direct vowel cards, not one gateway. Their ordered presentation communicates a real sequence, preserves every canonical focused page, and avoids a thin new gateway.

**`-ck`/FLOSS decision:** neither card is visible on the Kindergarten hub. They remain published related/support practice only, with no required or preview placement on the K hub.

**Number/Color decision:** retain one canonical page. Its 14 words form two very small, complementary kindergarten classroom sets; splitting would create thin pages and duplicate the same parent intent.

## 5. Exact Grade 1 grade-hub cards

The visible Grade 1 hub has thirteen cards: twelve Learn in Order cards and one Common Words gateway. It has no Practice by Topic card in the first slice.

| # | Section | Public title | Type and destination | Underlying content | Status | Parent-facing description | Role |
|---:|---|---|---|---|---|---|---|
| 1 | Learn in Order | **Short Vowel Review and C/K Spelling** | Direct Grade Unit: `grade-1-cvc-short-vowels-c-k-rule` | Existing unit; focused short-vowel Skills remain related practice. | Renamed. | Refresh short vowels and learn when the /k/ sound is usually spelled c or k. | Review/essential bridge |
| 2 | Learn in Order | **The FLOSS Rule** | Direct Grade Unit: `grade-1-floss-rule` | Existing focused unit. | Existing. | Learn a useful short-vowel ending pattern with doubled f, l, s, or z. | Essential |
| 3 | Learn in Order | **Digraphs and Final -ck** | Direct Grade Unit: `grade-1-consonant-digraphs-final-ck` | Existing unit plus focused CH/SH/TH/WH Skills. | Renamed. | Practice common two-letter consonant spellings and the -ck ending after a short vowel. | Essential |
| 4 | Learn in Order | **Beginning Consonant Blends** | Direct Grade Unit: `grade-1-beginning-consonant-blends` | Existing unit; individual blend Skills remain child practice. | Existing. | Spell words that begin with two consonant sounds, such as bl- and st-. | Essential |
| 5 | Learn in Order | **Ending Consonant Blends** | Direct Grade Unit: `grade-1-ending-consonant-blends` | Existing unit; individual final-blend Skills remain child practice. | Existing. | Spell words that end with two consonant sounds, such as -nd and -mp. | Essential |
| 6 | Learn in Order | **Long Vowels with Silent E** | Direct Grade Unit: `grade-1-long-vowels-silent-e` | Existing unit and Silent E Skill family. | Existing. | Learn how a final silent e can change a vowel sound in a one-syllable word. | Essential |
| 7 | Learn in Order | **Open Syllables and Final Y** | Direct Grade Unit: `grade-1-open-syllables-final-y` | Existing focused unit. | Renamed. | Notice short words where an open syllable or final y makes the vowel sound long. | Essential |
| 8 | Learn in Order | **Long Vowel Teams** | Combined roadmap entry, destination `grade-1-long-a-long-o-vowel-teams`; link to `grade-1-long-e-vowel-teams` and AI/AY, EE/EA, OA/OW Skills. | Two existing Grade Units plus focused Skill pages. | Merged presentation; no duplicate route. | Learn common vowel teams that spell long-vowel sounds, then choose a focused pattern when needed. | Essential |
| 9 | Learn in Order | **Plural Endings: -s and -es** | Direct Grade Unit: `grade-1-inflectional-endings-s-es` | Existing unit. | Renamed. | Spell common plural endings in words children use in everyday writing. | Essential |
| 10 | Learn in Order | **Verb Endings: -ed and -ing** | Direct Grade Unit: `grade-1-inflectional-endings-ed-ing` | Existing unit. | Renamed. | Add common verb endings while keeping the base word readable and spellable. | Essential |
| 11 | Learn in Order | **R-Controlled Vowels** | Combined roadmap entry, destination `grade-1-r-controlled-ar-or`; link to `grade-1-r-controlled-er-ir-ur` and focused ar/or/er-ir-ur Skills. | Two existing Grade Units plus Skills. | Merged presentation; no duplicate route. | Practice vowel sounds changed by r, then use a focused pattern page for extra help. | Essential |
| 12 | Learn in Order | **Final -tch and -dge** | Direct Grade Unit: `grade-1-tch-dge-ending-rules` | Existing unit plus `tch-dge-ending-words` Skill. | Renamed. | Learn useful endings for final /ch/ and /j/ after a short vowel. | Essential |
| 1 | Common Words to Spell | **Grade 1 Common Words** | New collection gateway: `grade-1-common-words` → `/spelling-lists/collections/grade-1-common-words` | Six eventual numbered Grade 1 sets; first two are in the validation slice. | New. | Practice small cumulative sets of useful Grade 1 writing words, including words with parts learned by heart. | Essential |

**Grade 1 Practice by Topic decision:** defer all topic cards. The current “1st Grade Everyday Words” set mixes words for places, time, and general vocabulary rather than providing one bounded, parent-recognizable writing task; Action and Describing Words are stronger but still do not justify a visible third section in the validation slice. Retain their routes as library/discovery content and reconsider only after usage and word-level editorial review.

## 6. Common Words content model and Heart Word treatment

### Model

Use the existing models with no schema change in the first slice:

| Need | Representation |
|---|---|
| Gateway | `spelling-collections` entry, `category: sight-words`, grade set, ordered `listIds`. |
| Numbered set | `spelling-lists` entry with `contentRole: sight-word-set`, `category: sight-words`, grade, stable ID, `order`, and `sourceType: curated`. |
| Set number | The final numeral in the stable ID/title and collection `listIds` order; no new field is needed. |
| Sequence | `prerequisiteLists`/`nextLists` link adjacent numbered sets; the gateway lists all sets. |
| Provenance | `canonicalSource` records `Hybrid editorial` with a tier such as `K common words`; body copy names Dolch/Heart Word source overlap without claiming that a set reproduces a source list. |
| Related links | Each set links to its gateway, adjacent set, and only truly related Heart Word/Dolch/phonics pages. |
| Canonical URL | Only the existing list or collection route. Grade hubs and Skills link to it. |
| Structured data | Existing collection `ItemList` describes gateway child sets; existing list breadcrumbs remain valid. Do not add FAQ markup unless a page has real, non-repetitive questions. |

### Lightest Heart Word metadata

For the validation slice, use the existing object-form word entry only where a short editorial hint is useful:

```yaml
- word: said
  hint: "Heart part: ai"
```

`hint` is optional and already schema-supported. It is editorial guidance, not a new interactive teaching system. Do **not** add substring ranges, grapheme components, a state machine, or a separate Heart Word collection in this slice. The current practice payload reduces words to playable text, so it can practice all words now but does not display hints during the test; the introductory text and list-page body carry the annotation. A later UI improvement may expose `hint` beside a preview word without changing IDs or word membership.

Use these classifications in editorial notes only:

- **Regular/currently decodable:** the current grade’s taught patterns account for the word.
- **Temporarily irregular:** it becomes explainable after a later pattern (for example, an open-syllable long vowel or silent-e convention).
- **Permanently irregular portion:** a small spelling portion needs direct memory support at this level.

A word has one canonical numbered-set membership. Appearance in a phonics/example list is incidental; a later numbered set may review earlier words only when explicitly labeled cumulative review, never by silently duplicating membership.

### SEO, GEO, and AEO pattern

| Surface | H1 | Title tag | Visible helper language |
|---|---|---|---|
| K gateway | Kindergarten Common Words to Spell | `Kindergarten Common Words to Spell: 4 Sets | spellingwords` | “Includes kindergarten sight words and Heart Word guidance.” |
| K set | Kindergarten Common Words 1 | `Kindergarten Common Words 1 | Sight Words and Spelling` | Explain the set’s phonics-aware progression; do not repeat the gateway’s full copy. |
| Grade 1 gateway | Grade 1 Common Words to Spell | `1st Grade Common Words to Spell: 6 Sets | spellingwords` | “Includes first-grade sight-word and Heart Word support.” |
| Grade 1 set | Grade 1 Common Words 1 | `1st Grade Common Words 1 | Sight Words and Spelling` | Use “common spelling words” naturally. |

Every gateway must server-render: (1) a concise answer block explaining what is practiced, set/approximate word count, grade fit, and regular/irregular treatment; (2) crawlable links to child sets; and (3) distinct introductory copy. The collection route’s existing breadcrumb and `ItemList` implementation is sufficient when the gateway’s visible text is authored well.

## 7. Validation slice: exact Common Words content

### Gateways

| Title | Stable ID | Route | Members | Parent-facing introductory copy |
|---|---|---|---|---|
| Kindergarten Common Words | `kindergarten-common-words` | `/spelling-lists/collections/kindergarten-common-words` | `kindergarten-common-words-1` through `-4`; 40 words total | “These four small sets help kindergarteners spell everyday words used in early reading and writing. Most words can be connected to sounds your child knows; when one small part does not match yet, the page points it out as a Heart Word part.” |
| Grade 1 Common Words | `grade-1-common-words` | `/spelling-lists/collections/grade-1-common-words` | eventual `grade-1-common-words-1` through `-6`; first two published in this slice | “These six cumulative sets build useful Grade 1 writing words without treating them as a list to memorize blindly. Children use familiar phonics when possible and learn only the unexpected spelling parts by heart.” |

### Kindergarten sets

| Set | ID and route | Ordered words | Classification (`R` regular, `T` temporarily irregular, `P` permanently irregular portion) | Sources, overlap, and relationship |
|---|---|---|---|---|
| Kindergarten Common Words 1 | `kindergarten-common-words-1`<br>`/spelling-lists/sight-words/kindergarten-common-words-1` | **a, I, am, at, can, in, it, is, and, the** (10) | a T; I T; am R; at R; can R; in R; it R; is T; and R; the P (`e`). | Hybrid early-writing set drawing on Dolch Pre-Primer A/B/C and existing K Heart Words. `am/at/can/in/it` are incidental phonics examples; none has another Common Words membership. First set; next `-2`. Intro: “Start with ten short words children use to label, answer, and make simple sentences. Sound out the parts that work as expected, then notice the small tricky parts in a, I, is, and the.” |
| Kindergarten Common Words 2 | `kindergarten-common-words-2`<br>`/spelling-lists/sight-words/kindergarten-common-words-2` | **he, she, we, me, my, go, to, do, you, like** (10) | he T; she T; we T; me T; my T; go T; to P (`o`); do P (`o`); you P (`ou`); like T. | Hybrid Dolch Pre-Primer/Primer plus existing K Heart Words. These are intentionally not copied into a second numbered set. Prerequisite `-1`; next `-3`. Intro: “Use these common people, action, and sentence words to write about yourself and others. Many become easier to explain as children learn long-vowel patterns; to, do, and you still need a remembered part now.” |
| Kindergarten Common Words 3 | `kindergarten-common-words-3`<br>`/spelling-lists/sight-words/kindergarten-common-words-3` | **for, of, was, said, have, are, here, come, look, see** (10) | for T; of P (`f`); was P (`a`); said P (`ai`); have T; are T; here T; come P (`o`); look T; see T. | Hybrid Dolch and K Heart Words; connects incidentally to silent-e/vowel-team knowledge taught later. Prerequisite `-2`; next `-4`. Intro: “Practice high-use words that help children explain, tell, and describe. Use the sounds that make sense and learn the small unexpected parts in words such as said, was, of, and come.” |
| Kindergarten Common Words 4 | `kindergarten-common-words-4`<br>`/spelling-lists/sight-words/kindergarten-common-words-4` | **this, that, with, they, one, two, three, where, little, play** (10) | this T; that T; with T; they T; one P (`o_e`); two P (`w`); three P (`ee`); where P (`wh/ere`); little T; play T. | Hybrid Dolch Pre-Primer/Primer and existing K topical material (`one`, `two`, `three`, `play`). Topic-page appearances are incidental; this set owns common-word membership. Prerequisite `-3`; no next K set; related to Grade 1 gateway. Intro: “Finish kindergarten common-word practice with words used in early questions, counting, and simple stories. Several spellings are not fully predictable yet, so practice the regular parts and remember only the tricky part.” |

### Grade 1 validation sets

| Set | ID and route | Ordered words | Classification | Sources, overlap, and relationship |
|---|---|---|---|---|
| Grade 1 Common Words 1 | `grade-1-common-words-1`<br>`/spelling-lists/sight-words/grade-1-common-words-1` | **all, but, did, do, get, good, new, now, our, out, please, want** (12) | all T; but R; did R; do P (`o`); get R; good P (`oo`); new T; now T; our P (`ou`); out T; please T; want P (`a`). | Hybrid Dolch Primer plus grade-appropriate writing use. `do` has K incidental exposure but is deliberately introduced here as a canonical Grade 1 set member after the K sequence; no K Common Words set contains it. Prerequisite K gateway completion conceptually, not a hard route prerequisite; next `grade-1-common-words-2`. Intro: “Begin Grade 1 common words with useful words for sentences, directions, and everyday writing. Some sound out with known patterns; in good, our, do, and want, remember the part that is not yet predictable.” |
| Grade 1 Common Words 2 | `grade-1-common-words-2`<br>`/spelling-lists/sight-words/grade-1-common-words-2` | **after, again, any, ask, by, could, every, fly, from, give, going, had** (12) | after R; again P (`ai`); any P (`a`); ask T; by T; could P (`oul`); every P (`e`); fly T; from R; give T; going T; had R. | Hybrid Dolch First Grade A and Grade 1 Heart Word support. `give`, `fly`, `going`, and `by` connect incidentally to silent-e/final-y/vowel-pattern work; only this set owns their Common Words membership. Prerequisite `grade-1-common-words-1`; next eventual `grade-1-common-words-3`. Intro: “Continue with words first graders need for stories, questions, and classroom writing. Use familiar patterns when they help, and pay special attention to the unexpected spellings in again, any, could, and every.” |

The remaining Grade 1 sets 3–6 and all Grade 2–5 set word lists require word-level editorial curation later. Their counts, IDs, gateway model, and canonical URL strategy are frozen now; their membership is intentionally not guessed in advance.

## 8. First implementation slice — next task specification

### Scope

Implement only the frozen Kindergarten and Grade 1 three-section layouts and the eight validation-slice Common Words URLs: two collection gateways, four K sets, and two Grade 1 sets. Do not implement Grade 2–5 architecture, future Common Words sets, new topical pages, or visual redesign.

### Expected files

| Change | Files |
|---|---|
| New authoritative Common Words data | `src/content/spelling-collections/kindergarten-common-words.md`; `src/content/spelling-collections/grade-1-common-words.md`; `src/content/spelling-lists/sight-words/kindergarten-common-words-{1,2,3,4}.md`; `src/content/spelling-lists/sight-words/grade-1-common-words-{1,2}.md`. |
| Grade hub presentation | `src/pages/spelling-lists/[gradeSlug].astro`; replace Kindergarten/Grade 1 special rendering or extract a small data-driven helper only if it reduces duplication. |
| Curated presentation data | `src/lib/content/kindergartenProgression.ts`; `src/lib/content/grade1Progression.ts`; add a purpose-built grade-hub card configuration only if the current arrays cannot encode the frozen sections cleanly. |
| Copy and metadata | `src/lib/content/gradeHubCopy.ts`; update K/1 hero/guidance terminology to the frozen section names. |
| Minimal optional UI support | `src/pages/spelling-lists/collections/[slug].astro` only if needed to render the server-side Common Words answer block distinctly; do not add a separate application framework. |
| Tests | Extend/add focused tests for K/1 grade-hub ordering, collection membership/order, list IDs, canonical routes, and Common Words relationships. |

### Data and compatibility requirements

- Add `contentRole: sight-word-set` to each new numbered set; use existing fields only.
- New collection `listIds` must exactly match the frozen ordered members; Grade 1’s gateway must support not-yet-published future members only when the collection route can safely omit unpublished references. Prefer publishing it with the two live members and update its membership as subsequent sets ship, while its visible copy states “six planned cumulative sets.”
- Set `prerequisiteLists` and `nextLists` only between published adjacent sets. K set 4 has no next list; Grade 1 set 2 has no next list until set 3 exists.
- Do not change existing list IDs/routes, delete Dolch pages, or alter reusable Skill relationships.
- Do not add a schema field for set number or Heart Word state. Use titles/list order and optional `hint` object entries where editorially needed.

### Internal links and structured data

- K and Grade 1 hubs link only to the cards in Sections 4 and 5 of this document.
- Common Words gateways link crawlably to their child sets; each child links to its gateway and adjacent live set.
- Keep grade-hub breadcrumb and `ItemList` data aligned with exactly the visible cards.
- Collection pages retain their `BreadcrumbList` and `ItemList`; render the gateway answer block as visible server HTML, not client-only state.
- Add no repetitive SEO FAQ blocks. Use the four required explanatory facts in the gateway introduction instead.

### Acceptance criteria

1. The K hub displays exactly the 12 cards in Section 4, in section/order shown.
2. The Grade 1 hub displays exactly the 13 cards in Section 5, in section/order shown, with an intentionally empty/no-rendered Practice by Topic section.
3. All eight Common Words routes build, use the exact IDs/titles/word lists in Section 7, and expose crawlable parent/adjacent links.
4. Existing canonical list and Skill routes remain unchanged and resolve.
5. Gateway text visibly explains practice focus, set/word count, grade fit, and regular/irregular treatment.
6. Existing breadcrumb and `ItemList` JSON-LD match visible pages and links.
7. Tests cover the fixed card order and Common Words collection/set relationships.

### Explicit non-goals

- No Grade 2–5 hub implementation.
- No remaining Grade 1 Common Words sets.
- No new Family, School, Animal, or Grade 1 topical pages.
- No splitting the existing K Number and Color list.
- No redesign of the visual system, practice session, or a sophisticated Heart Word interface.
- No migration, redirect, deletion, or canonical URL change for existing content.

## 9. SEO, internal linking, and documentation governance

### Durable SEO/AEO/GEO principles

- Teach a specific spelling concept or provide a bounded, useful collection; do not publish generic keyword buckets.
- Use natural familiar terms (“sight words,” “Heart Words,” “high-frequency words”) in explanatory copy and metadata while retaining the one Common Words architecture.
- Every gateway needs substantive server-rendered orientation text, unique purpose, and a complete crawlable child list.
- Each practice page needs one canonical URL, a clear answer-oriented introduction, grade/skill context, and a limited set of relevant internal links.
- Structured data must describe visible content, not planned-but-unpublished pages.

### Documentation governance

This document supersedes only prior **planning documents** whose purpose was to choose a K–5 architecture. Retain technical and evidence documents that describe the current schema, routes, audits, curriculum research, source policies, or historical rationale. When implementation changes a technical contract, update that technical document separately; do not use this architecture plan as a substitute for code-level documentation.

## 10. Implementation order after validation

1. Complete the first implementation slice in Section 8.
2. Validate K/Grade 1 navigation, indexing, and editorial treatment against the live templates.
3. Curate Grade 1 sets 3–6, then Grade 2 Common Words and its two genuine instructional gaps.
4. Normalize Grade 3’s suffix-change and syllable-division route.
5. Reframe Grades 4–5 morphology/multisyllabic material and curate their narrower Common Words sequences.
6. Add optional topic cards only after the core route and Common Words system are complete.
