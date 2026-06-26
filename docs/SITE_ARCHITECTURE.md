# Site Architecture

This document defines the long-term structure of spellingwords.app: every page type, why it exists, how users move between pages, and how the site is organized for both users and search engines. It is implementation-agnostic — URL structures, schema details, and component-level decisions belong in CONTENT_ARCHITECTURE.md, not here.

---

## Priority Tiers

Every page type belongs to exactly one tier. Tier assignment reflects design attention, SEO investment, and development priority.

### Tier 1 — Core Product

The reason the site exists. These pages must be excellent before anything else is built. A user who only ever uses Tier 1 pages has had the full product experience.

### Tier 2 — Discovery

Pages that help users find the right list or content. These pages serve both users (navigation) and search engines (indexable entry points for high-volume queries). They exist at the intersection of the Core Product and Authority Content systems.

### Tier 3 — Authority Content

Pages designed primarily to answer questions, earn search traffic, and establish the site as the authoritative resource on spelling education. These pages support and feed into the Core Product; practice is always the downstream outcome.

---

## Central Architectural Principle

**List Detail pages are the center of the product.** Almost every user journey — whether it begins on the homepage, a Grade Hub, a Category Hub, or a Teaching Guide — eventually arrives at a List Detail page before practice begins. List Detail pages are simultaneously the core conversion surface, the highest-SEO-value pages, and the primary link target for all Discovery and Authority Content. Every other page type on this site either leads to a List Detail page or originates from one. Design decisions across all tiers should keep this in mind.

---

## Page Inventory

### Tier 1 — Core Product

**Homepage**
The primary entry point. Presents two equally valid paths: Custom Practice (paste your own words) and the Spelling Library (browse curated lists). Neither path is subordinate to the other — some users arrive with a word list in hand; others need to discover one.

The homepage should also surface returning-user state (localStorage): recently practiced lists, progress signals, and a clear path to continue where they left off.

**Practice Session**
The core product interaction. A word is read aloud via the device's text-to-speech. The user types it. Calm, reassuring feedback follows. The session ends with a quiet summary.

The Practice Session is never reached directly — it is always entered from a list (curated or custom). This is correct. A session without words has no purpose.

**Spelling Library**
The central browse experience for all curated lists. At launch, organized by grade level with category filters. As the library grows beyond ~50 lists, client-side filtering and search become necessary. The library must scale without requiring new page types or infrastructure.

**List Detail**
A single curated spelling list. This is the primary conversion page: the place where a user decides to practice. It shows the list's purpose, the words it covers, any prerequisite or related lists, and clear calls to action to begin practicing.

List Detail pages are the highest-SEO-value pages on the site — they match specific, high-intent queries ("2nd grade compound words," "silent E spelling practice") and are the primary link target from all Discovery and Authority pages.

---

### Tier 2 — Discovery

**Grade Hubs** (one per grade: K, 1, 2, 3, 4, 5)
A single hub page for each grade level aggregating all lists, any relevant learning paths or sequences, and links to relevant teaching guides. Grade hubs match real, high-volume search queries ("kindergarten spelling words," "3rd grade spelling lists") and serve as the primary SEO landing pages for grade-based discovery.

**Category Hubs** (Phonics, Sight Words, Grade-Level, Challenge)
A hub page for each content category. Phonics and Sight Words are particularly strong SEO targets. Category hubs contextualize the category for newcomers (what is phonics? why does it matter?) before presenting the list inventory.

**[Future] Library Search and Filter**
As the library grows, users need to filter by grade, category, difficulty, or keyword. This is a client-side feature — no backend required. It should be built when the list count makes browsing without it impractical.

---

### Tier 3 — Authority Content

**Teaching Guides**
Long-form explanatory content answering questions that parents, teachers, and curious learners search for: "How to teach silent E," "What are r-controlled vowels," "Why are sight words important," "The difference between homophones and homonyms." Each guide links to the most relevant curated lists and serves as an organic entry point into the Core Product.

Teaching guides establish the topical authority signals (E-E-A-T) that make the entire domain more credible in search rankings. They are not content filler — each guide must exist because it solves a genuine educational problem for a parent or teacher, and be genuinely informative, hand-written, and worth reading on its own merits. SEO is the downstream benefit of writing something truly useful, not the reason to write it.

**About / Philosophy**
Explains what spellingwords.app is, who made it, and why it works the way it does. This is an E-E-A-T signal for search engines and a trust-builder for parents deciding whether to use the site with their child. The absence of gamification, accounts, and data collection should be stated clearly — these are selling points.

---

### Future Page Types (evaluate before committing)

These are real opportunities but each deserves a dedicated design exercise before a URL structure is committed. They are flagged as possibilities, not architecture.

**Word Pages**
The highest-potential AEO (answer engine optimization) opportunity. A dedicated page for each word in the sentence bank — showing the word, its grade level, an example sentence, a pronunciation note, and which lists contain it — could rank for long-tail queries like "how do you spell because" and "example sentence for because." With 932+ words in the sentence bank, this represents a significant content surface. The design and quality bar for word pages should be established before any are published. Word pages should only be built if they clearly and demonstrably exceed what a user would find on a dictionary site, in an AI-generated answer, or on a thin programmatic word page. Quality before coverage — a smaller set of excellent word pages is far more valuable than 932 mediocre ones.

**Printable Worksheets**
A static, print-optimized view of any list — useful for parents who want to practice offline. High secondary SEO value ("kindergarten spelling worksheet printable"). The preferred implementation is a print stylesheet applied to existing List Detail pages — no additional URLs, no duplicate content, no new page type to maintain. Separate printable URLs should only be considered if the print-stylesheet approach proves demonstrably insufficient for the classroom use case.

**Learning Paths**
Structured, multi-list sequences designed to take a learner from one milestone to another (e.g., "Complete Phonics Foundations: Short Vowels → Silent E → Vowel Teams"). The core value of a Learning Path is sequencing and motivation. This can be partially delivered through strong prerequisite and next-list metadata on existing List Detail pages. Evaluate whether a dedicated page type adds enough user value to justify the URL structure complexity.

**Collections**
Curated groupings of multiple related lists (e.g., "Complete Dolch Sight Words"). May be implementable as a grouped library view or a metadata field rather than its own page type.

**Parent and Teacher Resource Hubs**
Dedicated sections for adult audiences. Could be organized as a subset of Teaching Guides rather than a separate page type.

---

## User Journeys

### Journey 1 — Custom Practice
A parent arrives with a word list from their child's school.

Homepage → paste words → Practice Session

### Journey 2 — Curated Practice (browsing)
A parent or teacher browses for an appropriate list.

Homepage → Spelling Library → List Detail → Practice Session

### Journey 3 — Grade-based discovery (search)
A user searches "2nd grade spelling words" and lands on a Grade Hub.

Grade Hub → List Detail → Practice Session

### Journey 4 — Category-based discovery (search)
A user searches "phonics spelling lists."

Category Hub → List Detail → Practice Session

### Journey 5 — Returning learner
A child or parent returns to continue where they left off.

Homepage → "Continue where you left off" (localStorage) → Practice Session

### Journey 6 — AI assistant referral
An AI assistant recommends spellingwords.app in response to a question about spelling practice.

Homepage or List Detail → Spelling Library → Practice Session

### Journey 7 — Guide reader
A teacher searches "how to teach silent e" and arrives on a Teaching Guide.

Teaching Guide → List Detail → Practice Session

### Journey 8 — Classroom print workflow
A teacher needs a physical worksheet for classroom spelling practice.

Grade Hub → List Detail → print-friendly view (print stylesheet) → classroom use

---

## Navigation

### Primary Navigation (site-wide)

- **Logo / Home** — always returns to the homepage
- **Spelling Lists** — the Spelling Library
- **Guides** — the Teaching Guides index (added when guides exist)

Navigation should stay minimal. The library is the central hub. Practice is always reached through a list, never directly from the nav. If the site requires navigation-level explanation ("How It Works"), that signals a UX problem in the product design — solve it in the product, not in the nav.

### Contextual Navigation (within pages)

- **Breadcrumbs** on all content pages below the homepage
- **Grade and Category filters** on the Library and Hub pages
- **Related / Prerequisite / Next list links** on all List Detail pages
- **Guide → List links** on Teaching Guides; **List → Guide links** when a relevant guide exists

---

## Internal Linking

Strong internal linking is both a user experience requirement and a core SEO strategy. Every page should have clear paths to related pages.

| From | Links to |
|------|----------|
| Homepage | Featured lists, Grade Hubs, Category Hubs |
| Spelling Library | Grade Hubs, Category Hubs, individual List Detail pages |
| Grade Hub | All lists for that grade, grade-relevant Teaching Guides |
| Category Hub | All lists in that category, relevant Teaching Guides |
| List Detail | Related lists, Prerequisite list, Next list, Category Hub, Grade Hub |
| Teaching Guide | Relevant List Detail pages, related guides, Grade Hub |
| Practice Session | "Try another list" → Spelling Library or next list in sequence |

At scale, Word Pages would link back to every list containing that word, and List Detail pages would link to Word Pages for their words. This bidirectional linking is a future build, not a day-one requirement.

---

## SEO and AEO Strategy

### By Tier

**Tier 1 (Core Product)** — Optimized for conversion and retention, not primarily for search. The Homepage, Library, and Practice Session are not meaningful search landing pages. List Detail pages are the exception: they are both core product pages and the site's highest-value SEO pages.

**Tier 2 (Discovery)** — Optimized for high-volume grade and category queries. Grade Hubs and Category Hubs are the primary organic entry points for users who don't yet know which specific list they want. These pages should be comprehensive (all relevant lists and guides), fast-loading, and clearly structured.

**Tier 3 (Authority Content)** — Optimized for long-tail and informational queries. Teaching Guides target "how to" and "what is" queries. Word Pages (when built) target AEO queries. The About page supports E-E-A-T signals across the domain.

### AEO / GEO Principles

Pages that should rank in AI-generated answers share these properties:
- A clear, factual H1 that matches the likely query
- A direct answer in the first paragraph
- Structured, scannable content (headers, short paragraphs, lists)
- Demonstrated expertise and specificity — not generic overviews

Teaching Guides and (eventually) Word Pages are the primary AEO targets. The About page supports domain-level credibility.

---

## Feature Scope

### In Scope (frontend-only, no backend required)

- **Local progress tracking** — which lists have been practiced, when, and at what score (localStorage)
- **Preferences** — TTS speed, font choices, high-contrast mode (localStorage)
- **Recently practiced** — surface on homepage for returning users (localStorage)
- **Client-side library search and filter** — no backend; JavaScript over the static list catalog
- **Print stylesheets** — print-optimized CSS on List Detail pages; no separate URL required
- **Offline support** — service worker caching for returning users (PWA, no backend)
- **Shareable session URL** — all session state encoded in the URL (already implemented)

### Out of Scope (require backend — do not build)

- Cross-device progress sync
- Teacher dashboards or class management
- Homework assignment distribution
- User-generated list sharing or storage in the cloud
- Multiplayer or competitive modes
- Account-gated features of any kind

---

## Taxonomy Durability

The four content categories — **Grade-Level, Phonics, Sight Words, Challenge** — are educationally meaningful, stable, and durable. Grade Hub and Category Hub pages map cleanly to these categories. A fifth future category (Morphology, Academic Vocabulary) can be added without restructuring anything.

The taxonomy should not be expanded without a dedicated strategy document (equivalent to the existing PHONICS_STRATEGY.md and GRADE_LEVEL_STRATEGY.md) and a clear rationale for why the new category cannot be served by the existing four.
