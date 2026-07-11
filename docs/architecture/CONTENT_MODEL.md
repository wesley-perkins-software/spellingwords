# SpellingWords.app Content Model

## 1. Purpose and precedence

This document defines the canonical content model for SpellingWords.app. It answers: **how do we represent the different kinds of content and their relationships clearly enough that implementation decisions become consistent?**

`docs/architecture/CONSTITUTION.md` remains the highest-precedence project document. When older architecture, curriculum, or list documentation conflicts with the Constitution or this model, the Constitution governs first, then this content model. Older documents may still contain useful history, implementation detail, or editorial guidance, but they no longer decide content identity when they imply that every list must have exactly one grade, grade-first organization is universal, category controls architecture, or List Detail pages are the center of the product.

This is not a route plan, database design, or generic CMS model. It is a practical model for SpellingWords.app's three primary journeys:

1. Practice Your Own Words.
2. Learn by Grade.
3. Choose Specific Practice.

## 2. Core modeling principles

The model separates four things that the current implementation often blends together:

| Concern | Question it answers | Must not be replaced by |
|---|---|---|
| Content identity | What is this item fundamentally? | grade, category, route, nav placement |
| Curriculum placement | Where does it appear in a grade sequence? | content identity |
| Practice configuration | Which words are practiced, in what set, and for what purpose? | page identity |
| Presentation and discovery | Where can users find or be recommended this content? | URL or schema type |

A content item may have one identity while appearing in several discovery contexts. A reusable Skill can be recommended from a Grade Roadmap. A Sight Word Set can belong to a Collection. A Vocabulary or Theme List can be useful for a grade without becoming a Grade Unit.

Every content item must have one primary content identity based on its primary user purpose. Identity is not determined by subject matter alone. Two items may address the same spelling concept while having different identities when their purposes differ. A Grade 1 Silent E curriculum milestone is a Grade Unit; a reusable Silent E practice resource is a Skill. If both are needed, they should be separate content items with separate stable IDs and explicit relationships, not one item left indefinitely as “either this or that.”

The model should stay minimal. Not every identity needs every field, and not every content relationship needs a separate type. Add detail only when it prevents real ambiguity or supports a real product decision.

## 3. Content identities

These identities are conceptual. They are not necessarily routes, Astro collections, frontmatter fields, or components.

To determine identity, ask: **What is the primary reason this item exists for the user?**

- To provide one milestone in a grade sequence → Grade Unit.
- To provide reusable focused concept practice → Skill.
- To provide an actual selectable word set → Practice Set.
- To provide a named high-frequency sequence → Sight Word Set.
- To provide supplemental topic-based words → Vocabulary or Theme List.
- To explain a concept to an adult → Teaching Guide.
- To group related items → Collection.

Subject matter alone does not determine identity.

### Practice Tool

The Practice Tool is the product capability that accepts words and runs a calm spelling-practice session. It supports custom words and curated Practice Sets. It is not necessarily content metadata.

### Grade Roadmap

A Grade Roadmap represents a curated grade-level progression. It answers: “What should this grade practice?”

A Grade Roadmap should normally include:

- grade;
- title and short description;
- ordered Grade Unit references;
- optional supplemental recommendations;
- status;
- optional curriculum version or revision note.

Grade Roadmaps may remain configuration objects rather than ordinary spelling-list entries. They are developmental curriculum sequences, not collections of every page that happens to mention a grade.

### Grade Unit

A Grade Unit represents one grade-specific curriculum milestone.

A Grade Unit typically has:

- stable ID;
- one curriculum grade;
- roadmap placement/order;
- grade-specific title and objective;
- parent-friendly explanation;
- one grade-appropriate primary Practice Set, usually 8–16 active words;
- sequence context, such as prerequisite and curriculum-next relationships;
- optional linked Skills;
- status.

A Grade Unit may overlap with a reusable Skill, but it remains distinct when it has grade-specific intent, framing, word selection, or roadmap context. A Grade 1 Silent E unit and a reusable Silent E Skill are not duplicates if one serves a Grade 1 progression and the other serves cross-grade focused practice.

### Skill

A Skill represents a reusable spelling concept, focused pattern, recognized word type, or named practice need.

A Skill typically has:

- stable ID;
- public label;
- optional technical alternate label;
- plain-language definition;
- optional broader/narrower Skill relationships;
- prerequisite and related Skill relationships where useful;
- introduced or recommended grade information where useful;
- one Practice Set, or multiple named Practice Sets only when justified;
- links to related Grade Units or Teaching Guides;
- status.

A Skill must not be owned by one grade merely because it is first taught there. Short A, SH Digraph, Silent E, Prefixes, Suffixes, and Homophones can all be used across grades, review situations, intervention, search, and focused practice.

Broad Skills and focused subskills can use the same conceptual identity. For example, Consonant Digraphs and SH Digraph may both be Skills, with one broader than the other.

### Sight Word Set

A Sight Word Set represents a named or curated high-frequency-word practice set. It may come from a known system or a custom editorial set.

A Sight Word Set may include:

- stable ID;
- source/system, such as Dolch, Fry, Heart Words, or custom;
- level or sequence, where relevant;
- grade association, where relevant;
- word set;
- instructional framing;
- collection membership;
- status.

Do not collapse high-frequency, irregular, temporarily irregular, and heart-word teaching language into one generic Skill label. They overlap, but they answer different instructional questions.

### Vocabulary or Theme List

A Vocabulary or Theme List provides supplemental practice organized by topic, subject, writing purpose, vocabulary purpose, or enrichment.

It may include:

- stable ID;
- theme or topic;
- optional grade or grade range;
- purpose;
- word set;
- status.

A grade association does not make it a Grade Unit. Animal Words can be useful for Kindergarten without defining the Kindergarten spelling progression.

### Teaching Guide

A Teaching Guide is adult-facing explanatory content. It helps parents, teachers, and tutors understand a concept and choose useful practice.

It may include:

- stable ID;
- title;
- concepts explained;
- audience;
- related Skills;
- related Grade Units;
- related Practice Sets;
- status.

Teaching Guides do not need to use the same schema as practice lists. They should support practice without turning the site into a broad educational encyclopedia.

### Collection

A Collection represents an ordered or grouped set of related content items.

It may include:

- stable ID;
- title;
- member IDs;
- order;
- collection type;
- optional source/system;
- status.

Collections are not Grade Roadmaps. A Dolch Primer Collection is a named grouping from an external sight-word sequence. A Grade 1 Roadmap is a grade-specific developmental curriculum path. Both may contain ordered references, but they mean different things.

## 4. Practice Sets

A **Practice Set** is the actual word set loaded into the practice experience. It is conceptually distinct from the page or content item that exposes it.

A Practice Set may include:

- stable identifier;
- title or label;
- words;
- purpose;
- source content identity;
- recommended grade or grade range, where useful;
- optional ordering;
- maximum active-session size;
- status.

Initial compatibility rule: existing `words` on a spelling-list entry represent that item’s primary Practice Set. This does not require Practice Sets to immediately become a separate Astro collection, separate files, separate routes, or database records.

Later, a broad Skill may support multiple named Practice Sets only when there is a genuine product need. For example, a Silent E Skill might support a mixed silent-e set, a long-a silent-e set, and a long-i silent-e set. That does not mean every Skill needs multiple sets.

The 8–16-word guideline applies to a single active curated Practice Set. A broad Skill can organize several sets without forcing every possible word bank to become a page.

A Practice Set is not automatically an independently discoverable content item. SH Digraph is a focused Skill when it has an independent reusable identity, explanation, relationships, discovery value, or assignable destination. SH words are only a Practice Set when they exist solely as a selectable word set within a broader Consonant Digraphs Skill experience.

## 5. Grade relationships

Avoid a complex grade mastery matrix. The smallest useful model is:

- for Grade Units: curriculum grade and roadmap placement/order;
- for Skills: introduced grade, recommended grade or grade range, and optional notes about later review or extension when useful;
- for Sight Word Sets and Vocabulary/Theme Lists: grade association only when it helps users choose practice.

The model should express that Short A is introduced early and can be reviewed later; Silent E appears first as a long-vowel Skill and later relates to suffix rules; a Grade 1 Silent E unit uses a simple Practice Set; a Grade 3 suffix unit may reference the broader Silent E Skill for a different objective; and an older learner may access Silent E directly for remediation.

These ideas do not all need separate fields now. Public users should see a simple grade roadmap or focused practice option, not a cross-grade graph.

## 6. Skill relationships

The long-term model should support typed relationships, but the initial conceptual set should stay small:

| Relationship | Meaning |
|---|---|
| prerequisite | This should generally come first. |
| related | This is meaningfully connected but not ordered. |
| broader | This item belongs under a wider concept. |
| narrower | This item is a focused part of a wider concept. |
| curriculum-next or sequence-next | This is the next item in a curated sequence. |

Current `relatedLists`, `prerequisiteLists`, and `nextLists` are useful compatibility fields, but they are semantically overloaded. They can represent adjacent skills, grade-unit sequence, collection-like order, focused-practice recommendations, or generic related pages. During migration, they can continue to power current UI while validation and compatibility logic map them toward clearer relationships.

Concepts such as review, extension, remediation, and recommended next practice may remain presentation or recommendation metadata until implementation proves they need distinct relationship types.

## 7. Identity vs. placement

Identity must not be inferred from route location, grade metadata, category metadata, or navigation placement.

Examples:

- `kindergarten-short-a-words` is a Grade Unit: a Kindergarten curriculum experience with Kindergarten framing, placement, and a curated Short A Practice Set.
- `short-a-words` is a Skill: reusable focused Short A practice that may be linked from Kindergarten, Grade 1 review, intervention, search, or skill browsing.
- `grade-1-floss-rule` is a Grade Unit: it belongs to a Grade 1 core sequence.
- `dolch-primer-a` is a Sight Word Set: it may appear in Grade 1 and in a Dolch Primer Collection.
- `kindergarten-animal-words` is a Vocabulary or Theme List: it may be optional Kindergarten practice, but it is not a Kindergarten curriculum milestone.

Two items can relate to the same spelling concept without being duplicates when their intent, audience, framing, or Practice Set differs.

## 8. Content role

The project should eventually add a first-class explicit content identity field. This document does not freeze the exact implementation name; it may be called content role, content identity, kind, or another name in a later schema plan.

Long-term identities should include:

- `grade-unit`;
- `skill`;
- `sight-word-set`;
- `vocabulary-theme`;
- `teaching-guide`;
- `collection`.

Grade Roadmaps may remain configuration objects. The Practice Tool is a product capability, not necessarily content metadata.

Recommended staged adoption:

1. Add the identity field as optional.
2. Warn for missing or ambiguous identity.
3. Migrate Kindergarten.
4. Migrate Grade 1.
5. Migrate reusable Skills.
6. Later make identity required where appropriate.

Temporary inference from IDs, category, grade, or tags is acceptable only as compatibility logic and should be labeled temporary. The long-term goal is explicit identity, not inference.

## 9. Stable identifiers

Stable internal IDs must remain independent of:

- public title;
- slug;
- URL;
- grade;
- category;
- navigation placement;
- page role changes.

References among content items should use stable IDs. Do not rename IDs merely to match future URLs or labels. Renaming IDs should be rare because it breaks relationships, validation history, and migration confidence. Human-readable IDs are useful, but stability matters more than perfect naming.

Stable IDs should not be silently reused when an item is split, merged, or materially changes its primary content identity or user purpose. When that happens, create a new stable ID where appropriate, preserve the old item as archived or superseded if necessary, record the replacement relationship explicitly, and do not repurpose an old ID merely to avoid migration work. The same ID may continue when a reusable Short A Skill moves to a different URL. New IDs are appropriate when one old gateway page is replaced by both a Grade Unit and a reusable Skill.

Validation should eventually check uniqueness, unresolved references, and duplicate or conflicting identifiers across content systems.

## 10. Status and lifecycle

The current lifecycle of draft, published, and archived is enough for most near-term needs.

- Draft means not ready for public use.
- Published means visible and usable.
- Archived means preserved for history or compatibility but not normally shown.

Archived content is not deleted content. It can preserve editorial work, old references, and migration context.

If the project later needs deprecated or superseded states, those should indicate that a canonical replacement exists. Superseded content should reference its replacement by stable ID. Do not add these states until they solve a real migration or editorial problem.

## 11. Public and technical labels

The model should support plain public labels with optional technical labels or aliases.

Examples:

| Public label | Technical or alternate label |
|---|---|
| Silent E | VCe |
| Ending Spelling Patterns | final short-vowel orthographic conventions |
| Sight Words | high-frequency and irregular words, depending on context |

This does not require a full synonym system. A minimal approach is enough: public title, optional technical label, and optional recognized search terms where useful.

## 12. Minimal curriculum evidence

Curriculum grounding matters, but every content file should not carry large research notes.

Recommended separation:

- production content: brief source or rationale only when useful;
- Grade Roadmaps: curriculum rationale or revision note;
- curriculum research documents: deeper evidence and grade-placement reasoning;
- editorial metadata: review notes or dates where needed.

Keep evidence close enough to maintain trust, but not so heavy that ordinary list authoring becomes research-document maintenance.

## 13. Validation principles

Validation should be staged.

Early warnings:

- missing content identity;
- ambiguous grade/identity combinations;
- unresolved stable IDs;
- duplicate stable IDs;
- relationship arrays that point to archived or missing content;
- category/role combinations that are likely transitional.

Later validation can become stricter after migration:

- Grade Units require curriculum grade and roadmap placement.
- Skills require reusable identity independent of one grade.
- Sight Word Sets require source/framing when relevant.
- Collections require member IDs and collection type.
- Practice Sets require usable words and status.

Do not require a schema-breaking migration immediately.

## 14. Migration and compatibility strategy

Renovate incrementally:

1. Preserve existing stable IDs.
2. Keep current routes and URL slugs until a separate URL plan exists.
3. Treat current `words` as primary Practice Sets.
4. Add explicit content identity gradually.
5. Use temporary inference only for compatibility.
6. Add warning validation before hard failures.
7. Use Kindergarten as the first reference implementation.
8. Then migrate Grade 1.
9. Then migrate reusable Skills and later grades.
10. Keep existing content loading working throughout.

Do not bulk-edit content files, move URLs, or archive old documents merely to adopt this model.

## 15. Intentionally undecided

This document does not decide:

- public URLs;
- route hierarchy;
- redirects;
- final navigation wording;
- whether every identity uses a separate Astro collection;
- whether Grade Units are standalone pages or rendered states;
- whether focused practice uses pages, tabs, filters, or query states;
- exact component structure;
- database, account, or progress systems;
- final SEO schema;
- exact field names.

Later implementation plans must respect the content-level distinctions here without assuming this document has already chosen a technical shape.

## 16. Examples

| Example | Content identity | Practice Set | Grade relationship | Skill relationships | Discovery contexts | URL independence |
|---|---|---|---|---|---|---|
| Kindergarten Short A (`kindergarten-short-a-words`) | Grade Unit | Kindergarten-level Short A set | Kindergarten roadmap placement | Links to Short A Skill | Kindergarten roadmap, related practice | ID, role, grade placement, and words remain independent of URL. |
| Reusable Short A (`short-a-words`) | Skill | Focused Short A set | Introduced/recommended early; review later | Narrower part of Short Vowels; related to other short vowels and Silent E | skill browsing, search, Grade 1 review, intervention | Skill identity must not depend on current grade or route. |
| Grade 1 Floss Rule | Grade Unit | Grade 1 Floss Rule set | Grade 1 core sequence | Related to short vowels and final consonant spelling | Grade 1 roadmap, search, related practice | The Floss Rule objective remains stable even if route changes. |
| Grade 1 Beginning Consonant Blends | Grade Unit | Grade-appropriate blend words | Grade 1 core sequence | Related to broader Consonant Blends and focused BL/BR/etc. Skills | Grade 1 roadmap, focused-practice links | Unit role does not come from `phonics` category. |
| Reusable Silent E Skill | Skill | One mixed set initially; additional long-a/long-i sets only if needed | Introduced early; later related to suffix rules | Broader/narrower relationships with long-vowel and VCe patterns | skill browsing, search, Grade 1, Grade 3 review/remediation | Silent E is not owned by any grade or URL. |
| SH Digraph focused practice | Focused Skill | Primary SH word set | Recommended early, useful for review | Narrower than Consonant Digraphs; related to CH/TH/WH | skill browsing, Grade 1 support, intervention | Skill identity remains independent of grade route; a future implementation may model SH only as a Practice Set if it lacks independent identity. |
| Dolch Primer Collection and members | Collection plus Sight Word Sets | Each member part has its own set | Grade association where helpful, not core grade unit | Related to high-frequency/irregular word practice | sight-word browsing, Grade 1 recommendations, Dolch sequence | Collection and member IDs remain stable apart from URL slugs. |
| First Grade Heart Words practice set | Sight Word Set | Heart-word set | Recommended for or associated with Grade 1 | Related to high-frequency and irregular-word concepts | Grade 1 recommendations, sight-word browsing, direct search | Heart-word sequence identity remains independent of category or URL; a separate Grade 1 Heart Words Grade Unit may reference it. |
| Kindergarten Animal Words | Vocabulary or Theme List | Animal word set | Optional Kindergarten supplemental practice | May relate loosely to vocabulary, not core spelling Skill | additional practice, search, theme browsing | Grade K does not make it a Grade Unit. |
| Grade 3 Dropping Silent E | Grade Unit | Suffix-rule words such as making/writing | Grade 3 roadmap placement | Related to Silent E Skill and suffix spelling changes | Grade 3 roadmap, related Silent E guide | Later morphology objective remains distinct from early Silent E Skill page. |
| Prefixes across multiple grades | Skill or Skill family with grade-specific units | Sets by grade/objective where justified | Introduced and expanded across grades | Broader Prefixes with narrower un-, re-, advanced prefixes | Grade roadmaps, skill browsing, writing support | Prefix Skill identity remains stable across grade placements. |
| Silent E Teaching Guide | Teaching Guide | Usually none, or links to Practice Sets | Useful across grades | Explains Silent E Skill; links Grade 1 and Grade 3 units | guides, related links, search | Guide identity and relationships remain independent of URL. |
