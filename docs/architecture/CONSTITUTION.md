# SpellingWords.app Architecture Constitution

## 1. Purpose and Precedence

This constitution is the first source of truth for product, curriculum, information-architecture, and content-identity decisions on SpellingWords.app.

It is written for developers, designers, curriculum writers, content editors, and future AI coding agents. Read it before changing page types, navigation, curriculum structure, spelling-list identity, or the relationship between grades, skills, and practice.

This document defines what must remain true. It does not prescribe exact routes, schemas, components, or migration plans. Those belong in later technical documents.

When older documentation conflicts with this constitution, this constitution governs unless it is explicitly amended.

## 2. Product Definition

SpellingWords.app is a calm, focused spelling-practice website for children in Kindergarten through Grade 5.

Its central promise is simple:

> SpellingWords.app helps children practice spelling with their own words, by following their grade, or by choosing a specific skill, word type, or practice set.

The product should feel simple, trustworthy, immediate, child-friendly, useful to parents and teachers, and academically responsible without feeling academic or overwhelming. Academic responsibility means curriculum-informed decisions, plain but accurate public terminology, and willingness to revise word selection or sequencing when better evidence emerges.

SpellingWords.app is not a learning-management system, school administration platform, gradebook, broad vocabulary encyclopedia, gamified educational app, clone of a commercial curriculum, or content farm containing every technically possible word-list page.

The practice experience is the center of the product. List Detail pages, Grade Units, Skill pages, high-frequency-word sets, vocabulary lists, guides, and custom-word flows are ways of reaching or supplying useful spelling practice. They are not ends in themselves.

## 3. The Three Primary User Journeys

The canonical public product model contains three primary user journeys. These are the choices an ordinary visitor should understand within about 30 seconds.

### 3.1 Practice Your Own Words

User intent: “I already have a spelling list.”

Typical users include parents, students, teachers, homeschool families, and interventionists with an existing word set.

Expected experience:

- The user types or pastes words.
- The user begins practicing with minimal friction.
- The user does not need to browse curriculum, grade levels, or content categories first.

This is the flagship homepage experience.

Conceptual role: “I already have words. Let’s practice.”

> **Amendment (2026-08-22) — Practice Your Own Words gains a dedicated canonical page; the homepage tool remains the flagship, unchanged.** This section's "flagship homepage experience" status is preserved as-is — the homepage continues to host a fully working, immediate word-entry tool with no detour required. In addition, `/practice-your-own-words` now exists as this journey's dedicated destination page: the global header and footer CTAs for this journey now point there instead of to the homepage's `#practice` anchor, and it is also the landing destination for newly generated shareable practice links (fragment transport, `#list=...`). The homepage anchor (`/#practice`) continues to work and the on-page tool is unchanged; only the *external* entry points (header, footer, and a few inline cross-links) were re-pointed. See docs/content/CANONICAL_HOMEPAGE_STANDARD.md and docs/planning/LAUNCH_SUPPORTING_PAGES_AND_GLOBAL_NAVIGATION_PLAN.md for the fuller amendment.

### 3.2 Learn by Grade

User intent: “My child is in Kindergarten, Grade 1, Grade 2, Grade 3, Grade 4, or Grade 5. What should they practice?”

Expected experience:

- The user chooses a grade.
- The Grade Hub orients the user to the grade-wide curriculum and its three practice strands.
- The user chooses a substantive Grade-Strand Gateway, then a member page within that strand.
- The grade page acts as a roadmap, not an exhaustive directory.
- Each core unit provides immediate useful practice.
- The user can move to previous or next grade-level units.
- Supporting skill, high-frequency-word, or vocabulary practice may be recommended where appropriate.

Conceptual role: “Show me a sensible grade-level learning path.”

### 3.3 Choose Specific Practice

User intent: “I know what we need to practice.”

Examples include spelling skills, high-frequency words, focused practice needs, and named sets such as short vowels, blends, digraphs, silent e, vowel teams, r-controlled vowels, prefixes, suffixes, homophones, or Dolch words.

Expected experience:

- The user searches or browses for a recognizable spelling concept.
- The user reaches focused practice without needing to follow a grade sequence.
- The content may be useful across multiple grades.
- Technical terminology may be explained, but it should not be required to use the site.

Possible labels such as “Spelling Skills,” “Practice by Skill,” or “Choose a Practice List” may be tested later. This constitution freezes the journey, not a specific interface label.

Conceptual role: “I know what we need to practice.”

## 4. Product Journeys vs. Internal Content Systems

The visible product should expose user intent, not internal departments.

The three product journeys are simple decisions users make:

- I already have words.
- I know the grade.
- I know the skill or word type.

Internal content systems support those journeys. They may include curriculum, skills, high-frequency-word sets, vocabulary and themes, teaching guides, and collections.

These systems must not automatically become top-level navigation. Parents and children should not need to understand taxonomy, metadata, curriculum data, or editorial workflow to start practicing.

## 5. Canonical Content Identities

These are conceptual content identities, not necessarily route names, Astro collections, frontmatter fields, or separate technical systems.

### 5.1 Practice Tool

The Practice Tool accepts user-provided words, runs spelling practice, provides calm feedback, and supports both curated lists and custom lists.

The interaction should remain familiar across custom words, Grade Units, Skill pages, High-Frequency Word Sets, and Vocabulary or Theme Lists.

### 5.2 Grade Roadmap

A Grade Roadmap answers: “What should this grade practice?”

It presents a curated sequence of major spelling milestones for a grade. It should be calm, scannable, and useful as a roadmap. It should not expose every narrow practice page or pretend to be a rigid national pacing guide.

### 5.3 Grade Unit

A Grade Unit represents one grade-specific spelling milestone. This defines the experience, not whether it must be rendered as a standalone page.

A Grade Unit should generally provide:

- a clear title
- a short parent-friendly explanation
- a grade-appropriate curated practice set, usually 8–16 words
- immediate access to practice
- previous and next grade-unit navigation
- limited optional links to focused practice
- accurate terminology explained in plain language

A Grade Unit experience should not primarily be a gateway to other pages. In the current grade-first architecture, the normal journey should be:

> Grade Hub → Grade-Strand Gateway → Member Page → Practice

The Grade-Strand Gateway is permitted at this point only because it independently provides
substantive strand orientation or synthesis and a complete, legitimate browse experience for the
grade-and-strand's member pages. Optional focused practice is secondary.

### 5.4 Skill

A Skill represents a reusable spelling concept, focused pattern, recognized word type, or named practice need. It supports targeted practice independent of one grade and may be referenced from several grades.

Examples include Short A, Consonant Digraphs, Beginning Blends, Silent E, AI and AY, R-Controlled Vowels, Prefixes, Suffixes, and Homophones.

A skill may be introduced in one grade and revisited in another. Current grade metadata must not automatically imply that a page is fundamentally a Grade Unit.

### 5.5 High-Frequency Word Set

A High-Frequency Word Set supports recognized high-frequency word systems and irregular-word practice. Examples may include Dolch, Fry, Heart Words, or other carefully defined sets.

High-Frequency Words are conceptually distinct because user intent differs from both grade curriculum and phonics-pattern practice. High-frequency-word resources may be reached through Grade Roadmaps, skill or list browsing, contextual recommendations, direct search, or collections such as Dolch. Their future navigation treatment is intentionally undecided.

Important terms must not be collapsed:

- High-frequency words are common in print.
- Irregular words have spellings that are not fully predictable from common phoneme-grapheme patterns.
- Heart-word instruction is a teaching frame for drawing attention to the parts of a word students must learn “by heart.”

These overlap, but they are not synonyms.

For the frozen K–5 High-Frequency Words strand, **frequency determines eligibility**, while spelling complexity and developmental appropriateness determine the ownership grade. Core Spelling may teach a structure represented by an HFW word while HFW practice builds accurate and increasingly automatic retrieval. Themed Additional Practice may also overlap when independently justified. Overlap across strands is therefore not inherently a defect; duplicate ownership inside the HFW strand is prohibited. The exact inventory lives in `docs/curriculum/FROZEN_HIGH_FREQUENCY_WORDS_CURRICULUM.md` and `src/lib/content/hfWordsCurriculum.ts`.

### 5.6 Vocabulary or Theme List

A Vocabulary or Theme List provides supplemental spelling practice organized by topic, subject, writing use, or enrichment purpose.

Examples may include animal words, action words, weather words, science words, academic vocabulary, or describing words.

These lists may be useful, but they do not define the core spelling curriculum, should not dominate Grade Roadmaps or the main product identity, and are not a near-term development priority by default. Grade curriculum, reusable Skills, and the Practice Tool remain the core product.

### 5.7 Teaching Guide

A Teaching Guide explains spelling concepts, builds trust, helps users choose practice, and links into useful practice experiences.

Examples include consonant blends, silent e, heart words, or parent practice guidance. Teaching Guides support the product but should not interrupt immediate practice or duplicate practice experiences unnecessarily.

### 5.8 Collection

A Collection packages related lists or sets and may support navigation or a named external sequence such as Dolch.

A Collection is an editorial packaging mechanism, not a primary product journey by default.

## 6. Curriculum Foundation

SpellingWords.app should reflect broad U.S. consensus about elementary spelling development without copying one commercial curriculum.

No single national scope and sequence exists. State standards and respected curricula differ in ordering and terminology, but broadly agree that elementary spelling develops through:

1. alphabet knowledge and sound-to-letter encoding;
2. short-vowel and closed-syllable spelling;
3. digraphs, blends, and one-syllable spelling conventions;
4. long-vowel patterns, including silent e, vowel teams, open syllables, and r-controlled vowels;
5. syllable awareness and multisyllabic spelling;
6. inflectional endings and basic morphology;
7. prefixes, suffixes, roots, and suffix spelling changes;
8. Greek and Latin morphology;
9. high-frequency irregular words, homophones, meaning-based spelling, and proofreading transfer.

Spelling is encoding, not merely vocabulary memorization. It involves phonology, orthography, syllables, morphology, meaning, and convention.

The full technical taxonomy should remain mostly internal. Public pages should expose recognizable concepts in plain language. Curriculum research documents are the detailed curriculum reference; this constitution is the product and architecture reference.

## 7. Relationship Between Grades and Skills

Skills are reusable concepts. Grades are curated developmental paths through those concepts.

A skill may appear in multiple grades with different word complexity or a different instructional objective.

Silent E may appear as simple one-syllable long-vowel practice in an early grade, as review in a later grade, and as part of the “drop silent e” suffix rule in later spelling work.

Consonant blends may appear as simple CCVC and CVCC words in Grade 1, as longer or multisyllabic words in later grades, or as remediation practice for an older learner.

Therefore:

- No grade owns the concept of Silent E.
- No grade owns Short A, SH, BL, or any other reusable pattern.
- A Grade Unit may provide a grade-specific view or word list for a broader skill.
- A Skill page may serve several grades.
- Relationships should be represented through metadata and links, not through duplicating the same concept beneath every grade.
- Users do not need to see or understand a complex cross-grade skill graph.

The visible experience should remain simple even when the internal relationships are rich.

## 8. Grade Roadmap Principles

Each Grade Roadmap should:

- answer “What should this grade practice?”
- show only major curriculum milestones
- remain calm and scannable
- avoid exposing dozens of atomic skill pages
- use a curated order
- distinguish core progression from optional supplemental material only when that distinction adds value
- favor direct access to practice
- preserve teacher trust through sound curriculum sequencing

A Grade Roadmap should not:

- function as a complete sitemap
- list every focused skill page
- expose internal categories such as phonics, morphology, or orthography as required navigation
- be generated automatically from raw content categories
- imply that every child must complete every resource
- pretend to be a rigid national pacing guide

## 9. Grade Unit Principles

A Grade Unit should help a user understand and practice one grade-specific spelling milestone.

It should not contain an overwhelming directory of subpages, require a long lesson before practice, repeat a large teaching article, contain a giant word bank, or claim that one practice session proves mastery.

Grade Units should be useful even if a user never clicks any optional supporting links.

## 10. Skill Principles

Skill experiences should answer: “What is this spelling concept, how does it work, and where is it taught?”

They should use recognizable parent and teacher language, teach the concept as its primary job, remain grade-neutral unless the content itself is explicitly grade-specific, identify prerequisites and related concepts when useful, and avoid unnecessary technical terminology.

A Skill explains and demonstrates a concept, and also owns exactly one canonical, grade-independent practice bank for that concept. A Skill's demonstration words remain distinct from this bank: the demonstration illustrates the pattern (for hearing it, highlighting it, comparing forms) and never launches practice; the Skill's practice bank is what a "Practice this Skill" session draws from. This keeps exactly one canonical practice bank per concept, owned by the Skill regardless of how many grades reference it — no grade-specific forks of a Skill's bank are permitted. A Skill's own practice bank is an additional canonical source of the shared practice experience (`/play`), alongside custom words and whatever curated word sets other content identities already expose (Grade Units among them) — this does not limit or redefine those other sources. A Skill's curriculum-placement links to the Grade Unit(s) where it is taught remain a separate, valuable path for a user who wants grade-sequenced context rather than direct practice.

Not every micro-pattern deserves a separate destination. Focused practice should exist only when it provides real value, such as instructional isolation, teacher assignment utility, distinct user intent, a useful word set, or meaningful search and bookmarking value.

The site must not create destinations simply because a route can generate them. A filter, tab, section, or practice-state variation may be better than a separate indexed page.

## 11. The No-Gateway Rule

A page should not be inserted into the normal learning or practice path merely to expose another directory of links.

An empty or pass-through gateway is undesirable:

> Grade Roadmap → Practice Gateway → More choices → Actual practice

Such a page is one inserted merely to expose another directory of links or add another click before
the user reaches useful content. It remains prohibited.

The canonical grade-first journey is:

> Grade Hub → Grade-Strand Gateway → Member Page → Practice

The existing Grade-Strand Gateway layer is permitted because each page independently provides both
substantive orientation or synthesis appropriate to its strand and a complete, legitimate browse
experience for that grade-and-strand's member pages. Each such page must still satisfy the real-value
test below. This is not a blanket exemption for future pages named "gateway," and it does not
authorize another gateway layer elsewhere.

Every indexable destination should provide value appropriate to its primary user intent through at least one of:

- practice
- a useful Grade Roadmap
- a meaningful word set
- a substantive explanation
- a recognized collection
- a legitimate browse or search experience

This rule does not mean every page must contain the practice engine. Legitimate index, browse, and collection pages may exist when choosing among a recognized set is the page’s explicit purpose, such as a Grade Roadmap, skill index, Dolch collection, or search results page.

The rule is: every page must provide real value for its primary user intent.

## 12. Simplicity Principles

The architecture should pass the 30-second test. A new parent should quickly understand what the site does, how their child practices, which journey fits, and that the experience is calm and trustworthy.

The constitution favors:

- fewer clear choices
- direct practice
- plain-language labels
- curated recommendations
- reusable content
- gradual expansion
- evidence-based changes

It rejects:

- architecture for architecture’s sake
- visible technical taxonomies
- unnecessary page types
- unnecessary hierarchy
- content generated merely for page count
- large directories in the main learning flow
- premature implementation of every future possibility

Complexity may exist internally, but it should not be exposed unless it helps the user.

## 13. Practice Experience Principles

The practice experience should remain consistent across custom words, Grade Units, Skill pages, High-Frequency Word Sets, and Vocabulary or Theme Lists. The source and purpose of the words may differ, but the central interaction should feel familiar.

The project should favor calm feedback, clear instructions, minimal setup, and no mandatory account.

### Accessibility

Accessibility is a product requirement, not an enhancement. Experiences should support keyboard access, readable layouts, meaning not conveyed only through color, replayable audio where appropriate, and practical use on classroom devices.

### Privacy

The project should collect as little personal information as possible, especially from or about children. Defaults should remain privacy-preserving. Any future account system would require strong product justification.

The project rejects rankings, public comparison, manipulative streak pressure, anxiety-producing timers, complex gradebooks, and mandatory accounts.

Calm optional continuity, such as “continue where you left off,” may be explored later. If introduced, progress should support continuity rather than completion pressure.

## 14. Content and Editorial Principles

SpellingWords.app should focus on words children are expected to spell, not merely words they are expected to understand.

Curriculum word lists should be deliberately curated. A single Grade Unit's curated practice set should generally contain 8–16 words; a Skill's demonstration is smaller still, curated to teach the pattern rather than to be assigned. Neither should expose every possible word in one enormous session.

Every page must answer a clear user question and have one primary purpose. Page count is not a product goal.

Vocabulary and theme lists should be labeled and treated as supplemental. Existing useful content should be preserved and repurposed where possible, but duplicate pages should not be created for the same user intent.

Grade metadata must not be treated as page identity. Public labels should use familiar language. Technical terms may appear as secondary explanations. Important instructional distinctions should not be erased merely to reduce categories.

## 15. SEO, GEO, and AEO Principles

Discoverability matters, but SEO must not dictate the product.

The site should satisfy real user intent first. Topical authority comes from complete, accurate coverage and meaningful relationships, not from exposing every page at once.

Different content identities answer different intents:

- Grade Roadmaps answer grade-based curriculum intent.
- Skill pages answer focused spelling-concept intent.
- High-Frequency Word Sets answer high-frequency, irregular-word, or named-set intent.
- Vocabulary or Theme Lists answer topic- or subject-based supplemental intent.
- Teaching Guides answer explanatory intent.

Pages should not be created solely to target a keyword. Thin, near-duplicate, or filter-only pages should not be indexed automatically.

The same user intent should have one canonical destination. Related experiences may coexist when their purpose, framing, or practice set differs. For example, a Grade 1 Silent E unit and a reusable Silent E Skill may both be valid if one serves grade-sequenced learning and the other serves cross-grade focused practice. Grade pages may curate or recommend content without owning or duplicating it.

URL design should follow content identity after the model is stable. URL migration is not the immediate next step. Any future URL change must preserve redirects, canonical metadata, structured data, breadcrumbs, and internal links through a dedicated migration plan.

## 16. Implementation Boundaries

This constitution does not freeze:

- exact public URLs
- exact route paths
- exact database, JSON, or content structures
- exact Astro collections
- exact frontmatter field names
- exact component names
- whether focused practice is a page or filtered state
- exact navigation labels
- exact URL migration schedule

Those decisions belong in `docs/architecture/CONTENT_MODEL.md` and later technical implementation plans.

The constitution defines what must be true, not the precise code used to accomplish it.

## 17. Documentation Governance

Documentation precedence is:

1. `docs/architecture/CONSTITUTION.md` — product purpose, user journeys, conceptual content identities, and non-negotiable principles.
2. `docs/architecture/CONTENT_MODEL.md` — metadata, content representation, relationships, field definitions, and validation rules.
3. Curriculum research and grade-skill source documents — K–5 taxonomy, grade-skill matrix, and source analysis.
4. Grade-specific plans — Kindergarten, Grade 1, and later grades.
5. Technical and migration plans — routes, migrations, components, and PR-specific implementation plans.
6. Archived or historical documents.

Older documents may remain valuable, but they are subordinate when they conflict with this constitution.

Likely future archival candidates include older or superseded portions of `docs/CONTENT_ARCHITECTURE.md`, `docs/SITE_ARCHITECTURE.md`, `docs/GRADE_LEVEL_STRATEGY.md`, and `docs/LIST_ARCHITECTURE.md`. Do not move or delete them as part of adopting this constitution. A later cleanup may archive clearly outdated planning documents and label them as non-canonical.

## 18. Renovation, Not Restart

The current project should evolve rather than be rebuilt from scratch.

The existing project contains valuable work: practice functionality, curated content, curriculum research, Kindergarten and Grade 1 work, interface design, content relationships, and testing and deployment infrastructure.

The correct strategy is renovation:

- preserve useful content
- clarify content identity
- remove or merge redundant gateway pages over time
- progressively align implementation with this constitution
- avoid a wholesale rewrite unless a future technical audit demonstrates that one is necessary

This constitution should guide alignment work. It should not be read as a claim that the current code, routes, or content already fully conform.

## 19. Near-Term Sequence

The current recommended rollout is:

1. Adopt and approve this constitution.
2. Define `docs/architecture/CONTENT_MODEL.md`.
3. Audit and archive outdated documentation after the new canonical documents exist.
4. Align Kindergarten as the first reference implementation under this constitution.
5. Revise Grade 1 using the same model.
6. Build the initial reusable Skills experience.
7. Revisit URL structure after page identities are stable.
8. Expand Grades 2–5 incrementally.
9. Consider supporting systems such as guides, themed lists, and calm local continuity later.

This sequence may change as the project evolves. The conceptual principles should remain stable unless explicitly amended.

## 20. Amendment Standard

This constitution should guide evolution without pretending the product can never change.

A foundational change must be explicit. It should:

- identify the principle being changed
- explain the evidence or product reason for the change
- update this constitution
- update any conflicting canonical documents
- avoid silently changing architecture through implementation alone

Implementation should not become architecture by accident. If the product model changes, the constitution must change with it.

## Authorized pre-launch route decision — 2026-08-23

Grade curriculum is canonically nested beneath `/grades`: the comparison page is `/grades`, Grade pages are `/grades/{grade}`, and every grade strand and unit continues beneath that Grade page. Cross-grade strand pages and grade-independent Skills remain top-level. The never-public root-grade route shape is retired without redirects.
