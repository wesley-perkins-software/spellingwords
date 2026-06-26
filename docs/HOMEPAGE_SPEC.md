# Homepage Specification — spellingwords.app

## What This Document Is

This is the definitive product specification for the homepage of spellingwords.app. It defines what the homepage must accomplish, why each section exists, and how users should experience it.

This document is not a wireframe, visual design, HTML specification, Astro implementation guide, or component inventory. It describes product behavior and user experience only.

**Authoritative upstream documents:**
- `PRODUCT_VISION.md` — why the product exists and what it will never become
- `SITE_ARCHITECTURE.md` — what pages and routes exist and how they relate
- `UX_ARCHITECTURE.md` — the experience blueprint for every page type

This document specializes those documents for one page only: the homepage.

---

## Purpose

The homepage exists to answer a single question every visitor carries when they arrive: **"How do I begin?"**

Every section, every piece of content, every decision on this page should be evaluated against that question. If it doesn't help a visitor understand how to begin — or build enough trust to take that first step — it does not belong here.

The homepage is primarily a **decision page**, not a content page. Its job is not to explain spelling education, showcase the depth of the library, or demonstrate feature completeness. Its job is to help visitors understand what they can do here, quickly determine which path is right for them, and take it.

---

## Primary Audiences

### Parents

A parent arrives with a specific, time-sensitive need: their child has a spelling test, or they want to establish a practice routine. They may have heard about the site from another parent, seen it recommended by an AI assistant, or found it through a search. They are evaluating the site and the child simultaneously — they need to know whether to trust it before they hand it over.

What they need from the homepage:
- Immediate clarity about what the site does
- A fast path to begin, without reading instructions
- Confidence that the experience is safe, calm, and appropriate for their child
- An answer to "do you have a list for my kid?" without requiring deep navigation

### Teachers

Teachers arrive with curricular intent. They are often looking for a list that fits a specific skill, grade, or phonics concept — not just any word list. They may be planning ahead for classroom use or assigning independent practice.

What they need from the homepage:
- An indication that the library is organized in educationally meaningful ways
- A clear path to browse by category or grade
- Evidence that the content meets professional standards
- Enough trust signal to recommend the site to parents or use it with students

### Children

Children rarely arrive at the homepage independently. When they do, it is typically because a parent shared a link to the site (not a specific session). They are not reading copy or evaluating options — they are looking for something to interact with.

The homepage does not need to be designed for children as its primary user. But it must not confuse or exclude a child who lands here with a parent. The visual language and tone should feel warm and accessible to a young person, even if the decision-making content is aimed at adults.

### Returning Visitors

A returning visitor — parent, teacher, or older child — already knows what the site is. They are here to resume practice, not to be re-introduced to the product. Every piece of introductory framing they encounter is friction.

The homepage should recognize returning visitors through localStorage and surface a direct, efficient path back to practice. The introductory experience should be present but non-blocking for someone who has already completed it.

### Search Visitors

A visitor arriving from a branded search query ("spellingwords.app", "spelling words app") already has some awareness of the product. They may be confirming it's real, trying to remember the URL, or arriving after a friend's recommendation. The homepage must instantly confirm what the product is and invite them in.

These visitors are warm leads. They need reassurance that they found the right place, not a full sales pitch.

### AI-Referred Visitors

A visitor arriving after an AI assistant said "try spellingwords.app" has been pre-sold on a promise: calm spelling practice, no accounts, no gamification. The homepage's job for this visitor is to confirm the promise, not explain it again.

This visitor has high intent but low patience for mismatch. If the homepage looks like a game, an ad-heavy content farm, or a login screen, they will leave immediately. The homepage must look and feel exactly like what the AI described.

---

## Success Criteria

The homepage succeeds when a visitor does one of the following:

1. **Begins a custom practice session** — they entered words and started practicing without needing to browse the library or read further.

2. **Chooses an appropriate curated list** — they navigated into the Spelling Library (or a featured list) with a clear sense of what they are looking for.

3. **Returns to practice efficiently** — a returning visitor resumed or restarted a session without re-navigating the full discovery flow.

4. **Understands what makes this product different** — they absorbed enough of the product's values (calm, no accounts, no gamification, free) to trust it for their child, even if they don't begin practicing on this visit.

5. **Shares or bookmarks the site** — a visitor confident enough in the product to recommend it to another parent or educator.

Success is not measured in time spent on the page, number of sections viewed, or engagement with any individual feature. A visitor who enters words and immediately starts a session — spending ten seconds on the homepage — has been perfectly served.

---

## Information Hierarchy

The order in which information appears on the homepage reflects a deliberate argument about what matters most.

### 1. What this is and how to begin (highest priority)

The first thing a visitor encounters must answer: "What is this, and what can I do right now?" These two questions are answered simultaneously, not sequentially. The product is best explained by showing it, not describing it. The custom word entry interface communicates the product concept more clearly than any headline.

This section exists first because every audience — parent, teacher, returning visitor, AI-referred visitor — needs it. There is no visitor for whom this is the wrong first impression.

### 2. A direct path into the curated library (second priority)

Immediately after the custom practice path, the homepage must answer: "What if I don't have words?" or "Are there lists here for my child?" The library invitation is not a secondary feature — for many visitors, it is the primary path. But it comes after the custom practice path because the custom path is faster, requires no discovery, and works for any visitor with words in hand.

This section exists second because the custom path serves visitors who already know what they want; the library invitation serves visitors who are still choosing.

### 3. Trust signals (third priority)

After a visitor understands what the product is and how to begin, they need confidence to proceed. Trust signals answer: "Is this safe for my child? Is there a catch? What's the business model?" These signals should be clear, honest, and brief — not a marketing pitch, not a list of features, not a comparison table.

This section exists third because trust is a prerequisite to action, but explaining the product before showing it is backwards. Trust signals work best when a visitor already understands what they're being asked to trust.

### 4. Context and supporting content (lowest priority)

Featured lists, seasonal highlights, educational framing, and other supporting content occupy the final positions on the page. These elements enrich the experience for visitors who want more before deciding, but they should never delay or compete with the primary decision the homepage exists to facilitate.

This section exists last because most visitors will not need it. It serves the thoughtful browser, not the decisive beginner.

---

## Sections

### Hero / Entry Point

**Purpose**
This is the product in its simplest form: you have words, you type them, you practice. The hero must communicate this immediately through the presence of the word entry interface itself, not through explanation.

**Required content**
- A brief, honest statement of what the product is — one or two sentences at most, written for a parent who has never heard of the site
- The custom word entry interface, immediately visible and usable without scrolling
- A clear path to begin practice once words are entered
- A secondary invitation to browse the curated library for visitors who don't have their own words

**Optional future enhancements**
- A pre-filled example word list that a visitor can edit or use as-is to immediately experience the product
- A short, silent visual demonstration of the practice session for first-time visitors who want to preview before committing

**Primary CTA**
Begin a custom practice session with words the visitor enters or pastes.

**What should never appear**
- A login or account creation prompt
- A timer, progress bar, or streak counter
- Any gamification mechanic or point system
- Marketing superlatives ("the best," "the most trusted," "award-winning")
- A carousel, auto-playing animation, or motion that competes with the entry interface
- An ad, promotional banner, or anything that resembles a monetization surface

---

### Library Invitation

**Purpose**
Serve the visitor who arrives without words. This section answers: "I don't have a word list. Do you have something for my second grader?" It routes these visitors toward the curated content that exists for exactly this purpose.

**Required content**
- A clear statement that the site has curated, professionally chosen word lists
- An indication of how the library is organized (by grade, by category, or both) — enough context to know whether to click, not enough to substitute for the library itself
- A link to the Spelling Library
- One or more featured or representative lists — concrete examples that make the library feel real, not abstract

**Optional future enhancements**
- A simple grade-level selector that bypasses the full library browse for parents who know their child's grade
- A seasonal or editorially curated "featured this week" highlight
- A brief statement about the curation standard ("hand-selected, not algorithmically assembled")

**Primary CTA**
Navigate to the Spelling Library or a specific featured list.

**What should never appear**
- An overwhelming catalog of lists — the library page exists for that
- Persuasive framing designed to make the library feel larger or more impressive than it is
- Lists that have not been reviewed to the site's editorial standard

---

### Trust and Values

**Purpose**
Give a first-time parent or teacher the confidence to proceed. This section is not a sales pitch — it is a brief, honest account of what this product is and what it will never be. The goal is informed trust, not enthusiasm.

**Required content**
- A clear statement that there are no accounts, no login, and no personal data collected
- A clear statement that there are no timers, points, streaks, or gamification mechanics
- An acknowledgment that the site is free
- An honest description of the product's editorial approach (human-curated, not algorithmically generated)

**Optional future enhancements**
- A link to the About page for visitors who want to read more
- A brief note about the teaching philosophy — why calm, low-anxiety practice works

**Primary CTA**
Implicit — build enough confidence that the visitor takes one of the primary actions (custom practice or library browse).

**What should never appear**
- Social proof metrics ("10,000 families use this site") that cannot be verified or updated
- Testimonials — the product's values should speak for themselves
- An explanation of the business model that feels defensive rather than transparent
- Any framing that positions the absence of gamification as a feature by criticizing gamification elsewhere — the product's approach should be stated positively

---

### Supporting Discovery (below the primary decision zone)

**Purpose**
Serve visitors who want more before deciding — the thoughtful parent who reads before clicking, the teacher comparing options, the returning visitor who wants to explore a different part of the library.

**Required content**
- Links to featured or curated lists that illustrate the library's range
- Navigation into different parts of the library (by grade, by category)

**Optional future enhancements**
- A "new to the library" section highlighting recently added lists
- An editorial "where to start" recommendation for different types of learners
- A brief explanation of how the site's two modes (custom and curated) work together

**Primary CTA**
Explore a specific list or category.

**What should never appear**
- Content that requires scrolling past to reach the primary CTAs
- Anything that resembles a blog feed, news section, or article index
- Dense text blocks that require reading before the visitor can act

---

## Returning Visitor Experience

When localStorage contains previous practice history, the homepage should recognize that the visitor has been here before and change its behavior accordingly.

The introductory experience — the headline explaining what the product is, the trust signals, the "here's how this works" framing — should remain present but visually subordinate. A returning visitor should not feel lectured at.

A clear, direct surface showing recently practiced lists (with list names, not just session counts or scores) should appear at or near the top of the page. The returning visitor's most important question is "where did I leave off?" — not "what is this site?"

The path from homepage to practice for a returning visitor should require no explanation and minimal navigation: see the list they were using, click, begin.

Progress signals — if shown — should be calm and descriptive ("you practiced this list last Tuesday") rather than motivational or streak-based ("keep your streak alive"). Returning visitors should feel welcomed back, not pressured to maintain a performance metric.

The returning experience is an enhancement of the first-time experience, not a replacement. A visitor who has practiced twice should see their history; a visitor on a new device without localStorage data should see the standard first-time experience without error or confusion.

---

## First-Time Visitor Experience

A visitor who has never been to spellingwords.app before should be able to answer the following questions within ten seconds of arriving, without reading anything carefully:

1. **What is this?** — A spelling practice site for children.
2. **How does it work?** — You enter words, you hear them, you type them.
3. **Is there something here for my child?** — Yes, there is a library of curated lists.
4. **Do I need to sign up or pay?** — No.

These answers should emerge from the design and structure of the page, not from a bulleted explanation. The custom word entry interface communicates how the product works more clearly than any description. The library invitation communicates that curated content exists. The absence of a login screen communicates that no account is required.

A first-time visitor should be able to begin practicing within three actions of arriving — not three minutes, not three pages: three clicks or taps at most.

The first-time experience should not front-load explanation. The product should feel immediately usable. Any visitor who wants to understand more before starting has clear paths to do so; any visitor who is ready to begin should never be delayed by content aimed at the visitor who isn't.

---

## Internal Linking

The homepage should link to the following destinations, for the following reasons:

**Spelling Library (`/spelling-lists`)**
The primary destination for visitors who want to browse curated content. This link must be prominently accessible — not buried in footer navigation — because library browsing is a valid and common primary path.

**Featured List Detail pages**
Two to four specific lists that represent the library's range and quality. These serve visitors who want a concrete example rather than an abstract invitation to browse. Featured lists should be chosen to illustrate the breadth of the library, not to highlight the newest or most recently added content.

**Grade Hubs (optional, from library invitation section)**
A direct path for parents who know their child's grade and want to skip the full library browse.

**About / Philosophy (`/about`)**
Available from the trust section or the footer. Not prominently linked from the primary decision zone — the About page serves visitors who want to understand more deeply, not visitors making their first decision.

**Teaching Guides (`/guides`)**
Available from the footer or a secondary link within the trust section. These serve teachers and engaged parents, not the majority of first-time visitors.

**Practice Session (`/play`)**
The homepage links to the Practice Session indirectly — through the custom word entry CTA and through list detail pages. There is no direct link to `/play` from the homepage; a session without words has no purpose.

The homepage should not link to every page on the site. Linking generously from the homepage implies that every destination is equally relevant to every visitor. The links above represent the correct scope: the paths most visitors actually need, and nothing more.

---

## SEO Role

The homepage's primary SEO role is **branded authority and trust confirmation**, not keyword targeting.

Visitors who find spellingwords.app through a search engine and land on the homepage are most often searching for the site by name — they have a referral, a recommendation, or prior awareness. The homepage must confirm their expectation immediately. A branded visitor who arrives and feels immediately oriented is more likely to stay, more likely to return, and more likely to recommend the site to others.

The homepage is not the right destination for non-branded educational queries. Those queries — "2nd grade spelling words," "phonics word lists for first grade" — are better served by Grade Hubs, Category Hubs, and List Detail pages that match the specific intent of the query.

The homepage should contain a clear, accurate, and specific product description — not for keyword density, but because search engines use the homepage's description to understand the site as a whole. If the homepage describes spellingwords.app accurately, search engines will better understand every page that flows from it.

Structured data on the homepage should describe the site as an educational product with a clear purpose, audience, and value proposition. This supports the site's overall presence in search results without over-optimizing a page that doesn't need to rank for any particular query.

---

## AEO / GEO Role

When an AI assistant is asked "what's a good spelling practice website for kids?" or "recommend a calm spelling app without timers," the homepage is likely the first page that AI evaluates before forming a recommendation.

The homepage must be designed so that an AI can extract an accurate, quotable description of the product without ambiguity:

- What it is: a free spelling practice website for children
- How it works: hear a word, type it, receive calm feedback
- What makes it different: no timers, no points, no accounts required, no gamification
- Who it serves: children ages 6–10, with parents and teachers as decision-makers

This means the product description on the homepage should be specific, factual, and honest. Vague marketing language ("the best way to learn") is useless to AI systems. Specific, accurate claims ("no timers, no points, no account required") are exactly what AI systems cite.

The homepage should not try to rank in AI answers for generic queries. It should ensure that when an AI retrieves the homepage to evaluate or describe the product, the product description it finds is accurate, clear, and trustworthy enough to cite with confidence.

---

## Advertising Philosophy

The homepage contains no advertising.

This is a principle, not a gap that will be filled later. The homepage is the product's first impression and primary trust-building moment. Advertising on the homepage would:

- Undermine the perception of the site as a calm, child-safe educational tool
- Suggest that monetization is a higher priority than the user experience
- Compete visually and cognitively with the primary CTAs
- Create a mismatch between the product's stated values (no gamification, no anxiety, no manipulation) and the experience of arriving at an ad-laden page

Advertising belongs on content and discovery pages — List Detail pages, Teaching Guides, and (selectively) Category Hubs — where visitors are browsing and reading rather than making a first impression or beginning a session.

The absence of ads on the homepage is itself a trust signal. A parent who arrives expecting an ad-supported content farm and finds a clean, focused product interface has already received important information about the quality of what they're being offered.

---

## What This Page Must Never Become

### A landing page full of SEO text

Long explanatory paragraphs about the benefits of spelling practice, the importance of phonics, or the history of sight words have no place on the homepage. That content belongs in Teaching Guides, where it serves visitors who searched for it. On the homepage, it is noise that delays the only thing the visitor actually needs: a way to begin.

### A feature dump

The homepage is not the place to list every capability of the product. Custom lists, curated lists, text-to-speech, session review, progress tracking, print support — these are features. The homepage's job is to make the product feel approachable and immediately usable, not to enumerate everything it can do. Feature lists belong in documentation or an About page, not in the entry experience.

### A marketing site

The homepage should not try to convince a skeptical visitor to use the product through persuasion, social proof, or competitive positioning. The product earns trust by being immediately useful and honest about what it is. A homepage that reads like a marketing brochure signals that the product needs to be sold rather than simply used.

### A dashboard

The homepage is not a command center. Even for returning visitors with significant practice history, the homepage should feel like an invitation to begin, not a data display. History, progress, and statistics are contextually appropriate as a returning-visitor enhancement, but they should never dominate the page or make a first-time visitor feel like they are missing something.

### A blog homepage

The homepage should never surface news, updates, recently added content, or editorial commentary as primary content. The site is not a publication. Content discovery on the homepage should be limited to list discovery — the direct path to the product's value.

---

## Future Expansion

The following additions may appear on the homepage as the product matures, without changing its core purpose:

**Recently practiced lists (returning visitors)**
Already described in the returning visitor experience. This is a near-term addition that improves the experience for regular users without changing anything for first-time visitors.

**Featured seasonal collections**
At certain times of year (back to school, National Spelling Bee season), the library invitation section may surface a themed collection or curated set of lists. This is an editorial enhancement that makes the library feel alive and maintained, not a structural change to the page.

**"Where should I start?" guidance**
A brief editorial recommendation for visitors who are overwhelmed by choice. Could take the form of a simple "new to the site? start here" suggestion pointing to a beginner-friendly list or the grade-level browser. This reduces decision paralysis without adding complexity.

**Learning path invitations**
When structured multi-list sequences are developed, the homepage may surface an invitation to begin a learning path (e.g., "Complete Phonics Foundations") as an alternative to browsing the library or entering custom words. This addition must be framed as an option, never as a recommendation that implies the user's current approach is inadequate.

**Progress summary for returning visitors**
A brief, calm summary of how much a child has practiced and which lists they have completed. This is motivating without being competitive — it acknowledges effort rather than measuring performance. It should never resemble a streak counter or a score.

All future additions must reinforce the homepage's single purpose — helping visitors understand how to begin — rather than redefining it as something broader. An addition that causes a visitor to pause and read before they can act has failed, regardless of how valuable it is in isolation.

---

## Out of Scope

This document does not address:

- HTML structure or markup
- Astro components or page templates
- Tailwind utility classes or CSS properties
- Responsive layout breakpoints or grid systems
- Visual mockups, wireframes, or design compositions
- Component boundaries or reuse patterns
- Implementation order or development priority
- Any page other than the homepage

Those decisions belong to design and implementation phases that follow from this specification.
