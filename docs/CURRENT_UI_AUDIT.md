# Current UI Audit: Gap Analysis Against Product Vision

**Date:** 2026-06-26
**Scope:** All user-facing pages and global application shell
**Reference documents:** PRODUCT_VISION, SITE_ARCHITECTURE, UX_ARCHITECTURE, DESIGN_SYSTEM, HOMEPAGE_SPEC, SPELLING_LIBRARY_SPEC, LIST_DETAIL_SPEC, PRACTICE_SESSION_SPEC, CONTENT_ARCHITECTURE

---

## How to Read This Document

This is a gap analysis — an honest accounting of where the application stands against its documented product vision. It is not a list of everything that is broken. Many things work well and some are genuinely excellent. The goal is to produce a clear-eyed implementation roadmap, not to deprecate the existing work.

Each finding is rated:

- **Excellent** — matches or exceeds the spec; do not change
- **Aligned** — direction is right; polish or minor adjustment needed
- **Partial** — the right intent, but materially incomplete or inconsistently executed
- **Contradicts** — conflicts with documented vision; needs correction
- **Missing** — defined in documentation but entirely absent from the current application

---

## Page 1: Homepage (`/`)

### Purpose

**Rating: Partial**

The homepage currently serves two audiences simultaneously — a parent or teacher who wants to enter custom words and start practicing immediately, and a visitor who wants to browse curated lists. The textarea-first layout privileges custom entry heavily. The curated list section feels secondary.

HOMEPAGE_SPEC defines the homepage's primary jobs as: (1) get a returning visitor into practice in two taps, (2) give a first-time visitor enough confidence to start, (3) invite library exploration as a discovery path. The current page does job 2 reasonably and job 3 barely. Job 1 — the returning visitor experience — does not exist at all. There is no differentiation between a first visit and a repeat visit.

The page also tries to do a lightweight "how it works" explanation that belongs on an About or Teaching Guides page. This creates mild purpose drift.

---

### Information Hierarchy

**Rating: Partial**

Current hierarchy (top to bottom):

1. Logo / nav
2. Ghost watermark "spelling" background — decorative
3. Headline: "Practice spelling, starting now"
4. Custom word input card
5. "Start Practicing →" CTA
6. "or choose from our spelling lists" (link, small)
7. Six curated list category cards
8. Three trust benefit cards
9. Footer

The headline is good — direct, low-anxiety, action-oriented. The problem is what follows it. The custom word input is the right primary CTA for the use case, but the way the page renders, the input card is quite large and its toolbar/word-count detail competes visually with the headline. The primary action (entering words) and the secondary action (choosing a list) are distinguished only by font size and a line of small text. HOMEPAGE_SPEC requires the library invitation to be a genuinely compelling section, not an afterthought.

The six category cards below are currently rendered identically regardless of whether they have content — they look like a fully-populated library when only a handful of lists exist. This can create an impression of false completeness.

The trust section (three benefit cards with emoji icons) is placed correctly but uses emoji, which DESIGN_SYSTEM explicitly discourages as an icon strategy for the editorial aesthetic.

---

### UX

**Rating: Partial**

Strengths:

- The textarea for custom word input is immediately usable with no friction.
- Real-time validation (word count, payload size) is excellent.
- Sample words pre-populate to reduce blank-page anxiety.
- "or choose from our spelling lists" is the correct secondary CTA position.

Weaknesses:

- No returning-visitor path. A parent who used the site last week has no faster entry than a brand-new visitor. HOMEPAGE_SPEC calls for a returning-visitor shortcut achievable with localStorage.
- The session settings (voice, speed) are hidden inside the practice page. There is no way to discover these options from the homepage, which means first-time visitors may start a session with an unsuitable default voice before they know they can change it.
- The scroll-triggered reveal animations (`fade-up` on list cards, trust items) add kinetic energy that conflicts with the "calm workbook" aesthetic. UX_ARCHITECTURE says the site should feel like "a beloved workbook," not a marketing landing page.
- The footer is minimal (copyright only) on a page that could benefit from a small footer nav (About, How it works, Privacy) to establish trust for first-time visitors.

---

### Visual Design

**Rating: Partial**

The core token system is correctly applied: `app-paper` background, `ink` text, `font-display` Fredoka for the headline, `font-sans` Nunito for body, `font-word` Atkinson Hyperlegible for words in the input area. This is the right foundation.

Areas of concern:

**Animation overload.** Scroll-triggered `fade-up` reveals, scale transforms on card hover, and the blinking cursor in the word preview panel all add up to more motion than the design system calls for. DESIGN_SYSTEM says motion should be "calm and purposeful." Several of these animations feel decorative rather than purposeful.

**Ghost watermark.** The large "spelling" ghost text watermark behind the hero section reads as a design trend rather than something from a printed workbook. It adds visual noise without semantic value.

**Category cards on homepage.** The six curated list cards use a colored accent bar at the top, but the bar colors don't map cleanly to the semantic chip color system defined in DESIGN_SYSTEM. They appear to be decorative. The cards also display descriptions but no word-count or difficulty metadata, unlike the same cards on the library page.

**Trust section icons.** Emoji are used for the three benefit cards. DESIGN_SYSTEM does not define an emoji-as-icon pattern and the editorial aesthetic argues against it. If icons are needed here, they should derive from the design system or be replaced with typographic treatment.

**Heading scale.** The hero headline is large and commanding (correct), but the intermediate headings ("Browse our spelling lists," "Why families love spellingwords") are not visually differentiated enough from body text to create clear section rhythm.

---

### Product Vision

**Rating: Aligned (barely)**

The homepage does not yet feel like "a beloved workbook published by a thoughtful educator." It feels like a capable early-stage web app with a warm color palette. The copy is good. The aesthetic is moving in the right direction. But the scroll animations, the ghost watermark, the emoji icons, and the false-completeness of the six category cards together create a faint impression of marketing template rather than educational authority.

The work remaining: strip animation, ground the visual language, establish typographic hierarchy that teaches rather than sells.

---

### Accessibility

**Rating: Aligned**

- Skip to main content link exists in Layout.astro.
- The textarea has an associated label.
- Focus-visible styles are globally applied.

Minor issues:

- The six category cards use `<a>` tags as full card links. If card text includes both a heading and description, screen reader users will hear the full card text as one link label. A linked heading pattern or explicit `aria-label` per card would improve this.
- The word count pill inside the textarea toolbar should confirm it uses `aria-live` so it updates for screen reader users as they type.

---

### Mobile Experience

**Rating: Partial**

The textarea scales appropriately. The category cards collapse to a single column on small screens. The primary CTA is full-width on mobile, which is correct.

Issues:

- The ghost watermark behind the hero is oversized on small screens and creates visual clutter.
- Scroll-reveal animations on category cards may cause layout jank on lower-powered mobile devices.
- The hero section doesn't have a compact mobile-first variant. The large decorative heading text and watermark stack vertically and push the CTA below the fold on most phones.

---

### SEO

**Rating: Partial**

The `<title>` and `<meta description>` are set in Layout.astro and appear correct. Structured data (JSON-LD) is included.

Issues:

- The hero headline "Practice spelling, starting now" is good UX copy but not optimized for search. PRODUCT_VISION and SITE_ARCHITECTURE target terms like "spelling practice for kids," "free spelling lists," and grade-specific queries. These should appear naturally in the H1 or introductory copy.
- The six category card section has no semantic heading structure linking its content to searchable intent. A parent searching "2nd grade spelling words" should find a clear, indexable answer on this page.

---

### AEO

**Rating: Missing**

No section of the homepage is structured to answer a specific question directly. SITE_ARCHITECTURE defines AEO as a long-term goal — AI systems should be able to extract a clean answer to "what is spellingwords.app?" from the homepage. Currently the homepage is presentation-first. A clear prose "About this tool" paragraph (even two sentences) in the hero would serve real users and improve AI extractability.

---

### Advertising

**Rating: N/A (premature)**

The current layout has natural seam points (below the hero, below the library preview, above the footer) where DESIGN_SYSTEM-compliant banner placements could be inserted later without compromising the primary content. No action needed now.

---

---

## Page 2: Spelling Lists Library (`/spelling-lists`)

### Purpose

**Rating: Partial**

SPELLING_LIBRARY_SPEC defines the library's primary job as **routing** — helping visitors find the right list and move on — not showcasing. The current page does attempt routing (grade navigation chips, list cards), but it lacks the orientation layer the spec requires. A first-time visitor landing here doesn't immediately understand the structure: what grade levels mean in context, how many lists exist, what the difference is between phonics and high-frequency words.

The title and intro copy ("The Spelling Lists Library") are correct in direction. The explanation paragraph is a start. But the page underinvests in helping the visitor orient before asking them to choose.

---

### Information Hierarchy

**Rating: Partial**

Current structure:

1. Breadcrumbs
2. Title + explanation paragraph
3. Grade navigation chips (K–5)
4. Learning Paths section (conditional)
5. Lists by grade level (collapsible sections)
6. Challenge & Advanced section

The grade navigation chips are a strong orientation device. However, they appear as disabled/greyed states for grades without content, which correctly signals "coming soon" but may also signal an unfinished product to a first-time visitor.

The "Learning Paths" section appears before the main list grid, which is conceptually correct, but since no paths are currently published this section is effectively invisible. The page structure anticipates content that doesn't exist yet.

The category type distinction (phonics, high-frequency words, grade-level, challenge) is expressed only through the "category badge" on each card, not in the page structure itself. SPELLING_LIBRARY_SPEC calls for browsing by both grade and category. The current implementation is grade-first only.

---

### UX

**Rating: Partial**

Strengths:

- Grade chip navigation correctly anchors to grade sections.
- Collapsible grade sections avoid overwhelming scroll.
- List cards show metadata (word count, difficulty, duration) that help visitors self-select.

Weaknesses:

- No category-first browse path. A teacher looking for phonics lists has no way to filter without scanning all grades.
- No featured lists. SPELLING_LIBRARY_SPEC calls for a "start here" recommendation for common visitor intents ("my child is in 2nd grade, where do I start?"). Nothing on this page answers that question without scrolling.
- No empty-state design for the current sparse library. All grade sections are shown even when most have no published lists, making the library feel underpopulated.

---

### Visual Design

**Rating: Aligned**

List cards are consistently designed and use the correct token system. The colored category badge chips map to the semantic color system. Metadata badges (difficulty, duration, word count) use the right chip palette.

The page header area (title, explanation, grade chips) is functional but lacks the visual weight and warmth of the homepage. It reads as a utility page. For a Tier 1 page, it deserves more editorial investment in its top section.

---

### Product Vision

**Rating: Partial**

The library page currently feels like a database browser rather than a "curated workbook shelf." DESIGN_SYSTEM describes the library as a place where "the editorial curation should feel visible." A librarian chose these lists. That curatorial voice is absent — there is no copy that contextualizes why phonics lists exist here, what progression means, or how to choose between list families.

This is a content and information-architecture problem, not a design-token problem.

---

### Accessibility

**Rating: Aligned**

Breadcrumbs use `<nav>` with correct aria semantics. Grade navigation chips use appropriate interactive elements. Collapsible sections should verify `aria-expanded` is implemented. List cards use heading hierarchy correctly.

---

### Mobile Experience

**Rating: Aligned**

Single-column card layout on small screens. Grade chips wrap gracefully. No major mobile regressions identified.

---

### SEO

**Rating: Partial**

The library page has good URL structure (`/spelling-lists`) and correct breadcrumbs. However, the page body contains minimal keyword-rich prose. A parent searching "free spelling lists for 2nd grade" may land here and find a list of titles with no supporting copy confirming this page serves their intent.

Each grade section heading (e.g., "2nd Grade Lists") is a natural target for short introductory prose that would serve visitors and provide search signal. That prose doesn't exist yet.

---

### AEO

**Rating: Missing**

No structured prose that could answer questions like "what spelling lists does spellingwords.app have?" or "what are good phonics lists for first grade?" The page is currently a list of titles and metadata with no connective editorial tissue that AI systems could extract.

---

### Advertising

**Rating: N/A (premature)**

SPELLING_LIBRARY_SPEC prohibits ads above the primary orientation content. The current layout naturally places a seam between the grade navigation section and the list grid where a horizontal banner could be inserted later. No layout changes needed to preserve this option.

---

---

## Page 3: List Detail (`/spelling-lists/[category]/[slug]`)

### Purpose

**Rating: Aligned**

The list detail page correctly serves its primary purpose: give a visitor enough information to decide whether this is the right list, then provide a fast path into practice. LIST_DETAIL_SPEC says the visitor should answer "Is this the right list for my child?" within 15 seconds. The current page — title, description, metadata badges, word preview, "Start Spelling Test" CTA — achieves this reasonably well.

This is the most spec-aligned page in the current application.

---

### Information Hierarchy

**Rating: Aligned**

Current structure:

1. Breadcrumbs
2. Title + description
3. Metadata badges (difficulty, duration, word count)
4. Collection / learning path indicators (conditional)
5. Practice CTAs (primary: 10-word session, secondary: full list)
6. Word count explanation
7. Word list preview
8. "What this list practices" skill tags
9. "Why these words matter" (rendered markdown)
10. Source attribution
11. Related lists (prerequisite, related, next)
12. Footer

This structure is close to LIST_DETAIL_SPEC. The CTA placement (above the fold, before the word list) is correct. The "Why these words matter" section is valuable editorial content that distinguishes the page from a bare word list.

The weakest element in the hierarchy is the Print Worksheet placeholder button, currently disabled. A disabled button at the top of the page teaches visitors that something is broken rather than coming soon. It should either be removed or replaced with a forward-looking signal until the feature ships.

---

### UX

**Rating: Aligned**

Strengths:

- Two practice entry points (10-word session, full list) with clear differentiation.
- Word list preview is immediately visible without scrolling on most screens.
- Related lists (prerequisite, related, next) correctly implement the progression model from CONTENT_ARCHITECTURE.
- Breadcrumbs give clear position within the library hierarchy.

Issues:

- The disabled "Print Worksheet" button creates a dead-end interaction.
- The word count explanation text between the two CTA buttons is small and dense. A parent scanning quickly may not understand why two practice options exist.
- Session settings (voice, speed) are not accessible from this page. A visitor wanting to preview settings before starting has to enter the session first.

---

### Visual Design

**Rating: Aligned**

Correct token usage throughout. The metadata badge row is clean and informative. The word list preview box with its two-column grid is readable and uses the correct `font-word` typeface.

Minor issues:

- The skill tags section ("What this list practices") uses small pill components that are slightly undersized — legible but minimal tap targets on mobile.
- Related list cards use `white` background rather than `app-cloud`, creating a subtle surface inconsistency within a page that otherwise uses `app-paper` as its base.

---

### Product Vision

**Rating: Aligned**

The list detail page is where the editorial voice of spellingwords.app is most visible. The "Why these words matter" markdown sections — where they exist — are excellent. They reflect the "thoughtful educator" tone from PRODUCT_VISION. Pages without this content feel comparatively thin.

---

### Accessibility

**Rating: Aligned**

Breadcrumbs, semantic heading hierarchy, and button labeling are correct. The word list preview is a `<figure>` element, which is appropriate.

One issue: the disabled "Print Worksheet" button may not communicate its disabled state adequately to screen reader users without an `aria-describedby` explaining why the action is unavailable.

---

### Mobile Experience

**Rating: Aligned**

The page degrades gracefully to single column on small screens. The two CTA buttons stack vertically correctly. The word list grid drops from three to two columns on mobile.

The "Why these words matter" section can be quite long on some lists. On mobile, this creates significant scrolling below the practice CTAs — acceptable now but worth monitoring as content grows.

---

### SEO

**Rating: Excellent**

This is the highest SEO-value page in the application. Each list detail page is:

- A unique URL with a descriptive slug
- Correctly titled with the list name + site brand
- Structured with breadcrumbs (supporting sitelinks in search results)
- Populated with unique body copy ("Why these words matter") that provides topical depth
- Contains a complete word list (searchable vocabulary)
- Includes related-list links (internal linking signal)

This is the right approach. As the library grows, these pages should be the primary organic traffic drivers. The implementation is well-positioned for this.

One gap: the `<meta description>` for each list page is currently the list's `description` frontmatter field. This field needs to be consistently written with search intent in mind — not just a label ("2nd grade essential words") but an answer ("Practice these 15 essential spelling words with your 2nd grader using voice-guided audio feedback").

---

### AEO

**Rating: Partial**

The word list and "Why these words matter" content is machine-readable and could support AI-system extraction. However, the page lacks an explicit answer to the question "what words are on this list?" in a directly extractable format. A short prose sentence summarizing the list's scope ("This list contains 15 words commonly encountered in 2nd grade reading") would improve AI extractability significantly.

---

### Advertising

**Rating: N/A (premature)**

LIST_DETAIL_SPEC and UX_ARCHITECTURE allow ads on this page below the word list and in the sidebar on wider screens. The current single-column layout does not yet have a sidebar. The area between the word list and the related-lists section is a natural future ad placement. No layout changes needed.

---

---

## Page 4: Practice Session (`/play`)

### Purpose

**Rating: Excellent**

The practice session is the core product. It serves exactly one purpose: guide a child through a spelling practice session, word by word, without anxiety. Everything on this page supports that purpose and nothing distracts from it. The quiet header, hidden footer during the session, and full-screen focus on the current word are all exactly right.

---

### Information Hierarchy

**Rating: Excellent**

The session manages a multi-state flow (begin → question → feedback → results) through progressive disclosure. Each state shows exactly the information needed for that moment and nothing more.

**Begin:** List readiness confirmation → session settings (collapsed by default) → start CTA.
**Question:** Progress indicator → current word prompt → input field → audio controls → submit.
**Feedback:** Emotional response → word display (if incorrect) → next CTA.
**Results:** Summary → missed words → retry options.

This matches PRACTICE_SESSION_SPEC closely.

---

### UX

**Rating: Aligned**

Strengths:

- The "Listen Again" + "Use in a Sentence" audio control pattern is exactly right. Sentence audio is presented as secondary and optional.
- Feedback copy ("Well spelled", "A good attempt", "That's a tricky one") is warm, varied, and non-punishing. PRACTICE_SESSION_SPEC requirements met.
- "Practice the tricky words" CTA on the results screen converts frustration into agency — exactly right.
- "Start this list again" provides a clean restart path.
- Session settings (voice, speed) are accessible before the session without being intrusive.

Issues:

- Voice selection displays raw browser voice IDs or OS voice names (e.g., "Google US English", "Samantha"). These are not parent-friendly labels. A friendly label mapping is needed.
- The speed slider's effect is not previewed in real time. The existing "Preview" button partially addresses this but not completely.
- Progress bar shows "Word X of 10" regardless of session size. If a full list has 15 words and the session is 10, the counter can confuse a child who knows their list has more words.

---

### Visual Design

**Rating: Partial**

The session page is functional and correctly calm. However, DESIGN_SYSTEM describes the **Practice Tray** as the signature design element of the spelling session — a centered, card-like surface that frames the active word and input as a unified element. The current implementation does not render as a visually distinct Practice Tray. The question screen is a full-width page with inline elements rather than a centered, elevated card.

This is the largest visual design gap between the spec and the current implementation.

Other observations:

- The input field on the question screen uses warm cream background and a focus ring, which is correct.
- The progress bar is minimal (thin line + text) — appropriate for a calm aesthetic.
- The feedback screen word display for incorrect answers is legible in `font-word` Atkinson Hyperlegible, which is exactly right.
- Button hierarchy (primary in brand-red, secondary in blue) is consistent.

---

### Product Vision

**Rating: Aligned**

The session experience is the closest thing in the current application to the "beloved workbook" feeling. It is focused, quiet, warm, and student-centered. No timers, no mid-session scores, no gamification. The score footnote on the results screen is appropriately de-emphasized. This is a genuine product differentiator and the current implementation earns it.

The session page is where the product vision is most fulfilled today.

---

### Accessibility

**Rating: Excellent**

- `aria-live` regions on feedback and error messages ensure screen reader users receive dynamic content.
- The input field has a clear associated label.
- Audio controls are labeled and keyboard-accessible.
- Focus is managed correctly between states.
- Decorative elements are hidden from assistive technology.

The practice session is the most accessible page in the application.

---

### Mobile Experience

**Rating: Aligned**

The session scales well to mobile. The input field is full-width. Buttons are large enough for touch. Session settings panel is scrollable on small screens.

One issue: the virtual keyboard on mobile may push the submit button off-screen on smaller devices when the input field is focused. The submit button needs to remain visible above the keyboard — a common challenge for form-based apps that likely requires `visualViewport` handling.

---

### SEO

**Rating: N/A (by design)**

The practice session is not indexed and should not be. It is a tool, not a content page. SITE_ARCHITECTURE correctly excludes `/play` from SEO goals. Verify that `noindex` is set correctly in the layout for this route.

---

### AEO / Advertising

**Rating: N/A / Correctly excluded**

PRACTICE_SESSION_SPEC explicitly prohibits ads during active practice. The current implementation has no ad placement and the immersive session layout makes this easy to maintain.

---

---

## Global Application Audit

### Navigation Consistency

**Rating: Partial**

The application uses three different header states across pages:

1. **Homepage:** Logo + nav links ("Spelling Lists", "How it works") — full header
2. **Library / List Detail:** Logo only — no nav
3. **Practice Session:** Logo + "← New list" link — session-aware minimal header

The inconsistency is partially intentional (session header is correctly minimal), but the library and list detail pages have lost the primary navigation the homepage provides. A visitor arriving at a list detail page from search has no path to the homepage or the broader library without clicking the logo. A consistent minimal nav (Logo + "Spelling Lists" link) on all non-session pages would improve orientation substantially.

The "How it works" nav link on the homepage points to a section anchor, not a page. This is a placeholder pattern that needs resolution as the site grows.

---

### Typography Consistency

**Rating: Excellent**

The three-typeface system (Fredoka display / Nunito body / Atkinson Hyperlegible word display) is applied consistently across all pages. No rogue font families. Font scale is reasonable across page types.

Minor issue: heading sizes (h1, h2, h3) are set inline per component with utility classes rather than governed by a shared named scale in `tailwind.config.mjs`. This works now but will produce drift as page count grows. A named heading scale (e.g., `text-heading-xl`, `text-heading-lg`) defined in the config would improve long-term consistency.

---

### Spacing Consistency

**Rating: Partial**

Section spacing within pages is inconsistent. The homepage uses large section gaps (`py-20`, `gap-12`). The library is tighter (`py-8`, `gap-6`). The list detail page has its own rhythm. None of these is wrong individually, but they create a perception of multiple design hands working independently.

DESIGN_SYSTEM defines a section rhythm principle but doesn't specify explicit spacing tokens. Establishing three or four named section spacing values (`section-sm`, `section-md`, `section-lg`) would allow pages to share a visual cadence.

---

### Component Consistency

**Rating: Aligned**

The component library is small and correctly focused. All components — `Breadcrumbs`, `ListMetadataBadges`, `CategoryChip`, `RelatedListCards`, `WordListPreview`, `HeroWordPanel`, `SourceAttribution` — use shared tokens and follow established patterns.

One inconsistency: card surfaces use different background colors across pages. Homepage category cards use `app-cloud`. List detail related-list cards use `white`. The word list preview uses `app-cloud`. DESIGN_SYSTEM should specify a canonical "card surface" token. The distinction between `app-paper`, `app-cloud`, `cream-deep`, and `white` surfaces is not yet formalized, leading to subtle visual drift.

---

### Page Rhythm

**Rating: Partial**

Each page has its own internal rhythm, but the pages do not feel like a family. Moving from the homepage (animated, spacious, slightly kinetic) to the library (denser, static, utility-focused) to the practice session (minimal, focused) creates three distinct emotional registers.

DESIGN_SYSTEM's "calm and purposeful" principle applies to all three, but in practice only the session fully achieves it. The homepage needs to de-escalate its energy. The library needs to invest more in warmth and editorial voice. Then the three pages will feel like chapters of the same book.

---

### Interaction Consistency

**Rating: Aligned**

Hover states, focus rings, button press effects, and disabled states are consistently applied via global styles and the Tailwind config. No rogue interaction patterns detected.

The scroll-reveal animation on the homepage (Intersection Observer fade-up) is not present on any other page. This is correct for the library and session, but it means the homepage has a uniquely animated quality that sets an expectation the rest of the site doesn't meet.

---

### Copy Consistency

**Rating: Aligned**

Copy tone across the site is consistently warm and calm. No urgency language. No gamification language. The feedback phrases in the session, list descriptions, and homepage benefits section all use the same editorial register.

Minor inconsistency: the site has no brand-reinforcing copy elements beyond the logo that could serve SEO or AEO goals. This is intentional restraint, not a flaw — but it means the brand voice currently lives only in the session feedback and list descriptions.

---

### Trust Signals

**Rating: Partial**

Current trust signals:

- "No account needed" (homepage benefit card)
- "Hear every word" (homepage benefit card)
- "Works everywhere" (homepage benefit card)
- Source attribution on list detail pages (e.g., "Based on Dolch high-frequency words")

Missing trust signals (per PRODUCT_VISION and SITE_ARCHITECTURE):

- No privacy statement or link anywhere on the site. For a children's education app, this is a significant omission for parents evaluating the tool.
- No About page or editorial standards explanation. SITE_ARCHITECTURE defines Teaching Guides as Tier 3 content that builds authority. None exists.
- No parent/teacher framing that acknowledges the child is not the only audience.
- No publication or last-updated signals on list pages.

The absence of a privacy policy link is the most significant trust gap for a children's product.

---

### Overall Polish

**Rating: Partial**

The application is clearly past prototype stage. It has a coherent aesthetic, working business logic, and good accessibility foundations. What keeps it from feeling fully polished:

1. The homepage animation energy clashes with the calm workbook vision.
2. No Tier 2 or Tier 3 pages exist — the site is architecturally one tier deep.
3. The library feels sparse with the current content volume.
4. Several "coming soon" signals (disabled print button, greyed grade chips) signal incompleteness rather than curation.
5. No footer navigation — no way for a visitor to learn more, find a privacy policy, or navigate beyond the primary funnel.

The foundation is solid. The polish gap is real but addressable.

---

---

## Missing Product Pieces

The following capabilities are defined in documentation but entirely absent from the current application.

### Grade Hub Pages (`/grade/[grade]`)

SITE_ARCHITECTURE defines Grade Hub pages as Tier 2 — dedicated pages for each grade collecting all lists with editorial introduction, progression narrative, and SEO targeting for queries like "3rd grade spelling words." No Grade Hub pages exist. The library page partially serves this function through collapsible grade sections, but without dedicated URLs these sections cannot be indexed or linked directly.

**Impact:** High SEO value. Parents searching "2nd grade spelling words" should land on a dedicated hub page, not a general library page.

### Category Hub Pages (`/category/[category]`)

SITE_ARCHITECTURE defines Category Hub pages for phonics, high-frequency words, grade-level, and challenge. No Category Hub pages exist. A teacher searching "phonics spelling lists" finds no category-level landing page.

**Impact:** High SEO value, improved library navigation, essential for the cross-cutting browse path SPELLING_LIBRARY_SPEC requires.

### Print Worksheet Experience

LIST_DETAIL_SPEC and PRACTICE_SESSION_SPEC reference a print-friendly word list view. The "Print Worksheet" button exists on the list detail page but is disabled. A basic print stylesheet and print-ready layout would deliver significant value for classroom use.

**Impact:** High teacher utility. Differentiates from digital-only tools.

### Local Progress Tracking

CONTENT_ARCHITECTURE defines localStorage-based progress tracking as a planned capability. No implementation exists. The results screen shows missed words but does not persist them. A returning visitor cannot see which words they've practiced or struggled with.

**Impact:** High user retention value. Required for the returning-visitor experience HOMEPAGE_SPEC describes.

### Teaching Guides (`/teach/[topic]`)

SITE_ARCHITECTURE defines Tier 3 authority pages — teaching guides, method explanations, parent FAQs — as long-term SEO and AEO drivers. No teaching guide pages exist. The "How it works" homepage anchor is the only content partially serving this purpose.

**Impact:** Long-term SEO authority. Establishes trust for parents. Required to answer questions AI systems increasingly field directly.

### About Page

No About page exists. For a children's education product, an About page establishes editorial credibility, privacy posture, and the human story behind the tool.

**Impact:** Trust signal for parents. Supports privacy compliance. Low effort.

### Footer Navigation

No footer navigation exists — only copyright. The footer is the conventional location for Privacy Policy, About, Teaching Resources, and Contact links.

**Impact:** Trust signal. SEO internal-linking. Low effort.

### Structured Learning Paths

LEARNING_MODEL and CONTENT_ARCHITECTURE define Learning Paths as first-class objects — curated sequences of lists with defined progression. The library page has a "Learning Paths" section in its markup, but no paths are published. As content grows, paths will become an important navigation and recommendation mechanism.

**Impact:** User retention. Differentiates from a bare list repository. Primarily requires content authoring.

### Launch Library Content

LAUNCH_LIBRARY.md targets 36 lists at launch (16 grade-level, 12 phonics, 6 high-frequency words, 2 challenge). The library UI is capable of displaying these, but the current sparse state means the library experience is not fully evaluable. Many library UX concerns in this audit (empty states, greyed grade chips, lack of featured content) are partly consequences of pre-launch content volume.

**Impact:** Unlocks the full intended library experience. Required before broad promotion.

---

---

## Implementation Philosophy

The planning phase is now complete. The documentation — PRODUCT_VISION, DESIGN_SYSTEM, SITE_ARCHITECTURE, UX_ARCHITECTURE, and the page-level specs — is sufficiently mature to guide execution without further elaboration.

**From this point forward, the default activity is implementation.**

New documentation should be created only when a major architectural decision genuinely requires it: a new data model, a significant change to URL structure, a meaningful departure from the tech stack. Routine feature work does not require a planning document. The existing specs are the plan.

Every phase in this roadmap ends with a user-visible improvement that makes the product feel more complete. Phases are organized around the systems and capabilities being built, not the individual pages being touched. Most changes cross page boundaries; organizing by system prevents the false impression that pages can be completed independently.

---

## Content: A Parallel Workstream

Content authoring — the 36 lists defined in LAUNCH_LIBRARY.md — is not a phase of implementation. It is a parallel workstream that proceeds alongside all implementation phases.

The frontend and the content library should mature together. UI work in every phase creates containers that content fills. Content work in every phase makes the UI feel real. Waiting until the UI is complete to author content would delay the only thing that gives the library experience its actual value.

The content target:
- **16 grade-level lists** (K–5, across all grades)
- **12 phonics lists** (Phase 1 patterns per PHONICS_STRATEGY)
- **6 high-frequency word lists** (complete Dolch set per GRADE_LEVEL_STRATEGY)
- **2 challenge lists**

Each list published during a UI phase improves the testability of that phase's work. Aim to have meaningful content at each grade level before Phase 3 (Discovery) begins, since Grade Hub and Category Hub pages depend on having lists to display.

Content authoring follows CONTENT_STANDARDS and LIST_SPECIFICATIONS. No new lists should be published outside those constraints.

---

## Execution Roadmap

---

### Phase 0 — Visual Design Audit

**Deliverable:** A concrete visual punch list that becomes the reference during all subsequent implementation phases.

Before implementation begins, capture the current visual state of every major page and produce an annotated record of what to keep, what to fix, and what is inconsistent. This is not a redesign — it is a precise inventory of visual debt.

**0.1 — Screenshot every major page state**
Capture: homepage (above fold, full page), library (with and without lists), list detail (full page), practice session (begin screen, question screen, feedback screen, results screen). Capture both desktop and mobile viewports.

**0.2 — Annotate strengths**
For each screenshot, identify elements that are already correct and should not be changed during implementation. This is as important as identifying problems — it prevents regressions.

**0.3 — Annotate weaknesses and inconsistencies**
Mark: spacing inconsistencies, surface color drift (the `app-cloud`/`white`/`cream-deep` ambiguity), heading scale variations, animation artifacts, elements that conflict with DESIGN_SYSTEM, elements that contradict the "calm workbook" aesthetic.

**0.4 — Produce the visual punch list**
A flat, ordered list of discrete visual corrections — each item small enough to address in a single commit. This list feeds directly into Phase 1.

The Phase 0 output replaces further written analysis. Screenshots annotated with specifics are more useful than prose descriptions during implementation.

---

### Phase 1 — Design Foundation

**Deliverable:** Every existing page feels like it belongs to the same product.

This phase touches `tailwind.config.mjs`, `global.css`, and `Layout.astro` primarily. Changes here propagate to every page automatically. Work within the existing token system — no new colors, no new fonts.

**1.1 — Typographic scale tokens**
Define named heading scale values in `tailwind.config.mjs`: `text-heading-xl`, `text-heading-lg`, `text-heading-md`, `text-label`. Audit every page and component to use them. Removes inline heading size variation that currently causes drift.

- Complexity: Low.

**1.2 — Card surface token**
Define a canonical card surface color — either formalize `app-cloud` as the answer or introduce a named `card` token. Audit all components (`RelatedListCards`, `HeroWordPanel`, the list cards in the library, the category cards on the homepage) to use it consistently. Resolves the `app-cloud`/`white`/`cream-deep` ambiguity.

- Complexity: Low.

**1.3 — Section spacing tokens**
Define 3–4 named section spacing values in `tailwind.config.mjs` — `section-xs`, `section-sm`, `section-md`, `section-lg`. Audit all pages and replace the current `py-8`/`py-12`/`py-16`/`py-20` variation with consistent named values. Gives every page the same vertical rhythm.

- Complexity: Low.

**1.4 — Motion reduction**
Remove scroll-triggered `fade-up` reveal animations from the homepage category cards and trust section. Remove hover `scale` transforms from all cards. Retain: a single page-load fade-in on the homepage hero, hover border/color state changes on interactive cards. The motion that remains should be purposeful, not decorative.

- Why it matters: Animations are the most visible conflict with the "calm workbook" product vision. They make the homepage feel like a marketing page.
- Complexity: Low.

**1.5 — Remove ghost watermark**
Remove the large decorative "spelling" background text from the homepage hero section. Replace with clean whitespace; the paper grain overlay already provides the tactile background quality this was trying to achieve.

- Complexity: Low.

**1.6 — Consistent header navigation**
Add a minimal shared nav (Logo + "Spelling Lists" link) to the library and list detail page headers. The session header remains session-specific ("← New list" only). Establishes a consistent navigation presence on all non-session pages.

- Complexity: Low.

**1.7 — Footer navigation**
Replace the copyright-only footer in `Layout.astro` with a minimal nav footer: Home, Spelling Lists, About (placeholder), Privacy (placeholder). Every page on the site should offer an exit path to the rest of the product.

- Why it matters: A footer with no navigation links signals a prototype. A privacy link is non-negotiable for a children's product, even as a placeholder.
- Complexity: Low.

---

### Phase 2 — Core Product

**Deliverable:** A complete, polished core spelling practice experience.

This phase improves the three pages at the center of every user journey: homepage, list detail, and practice session. By the end of Phase 2, a visitor who arrives at the homepage, finds a list, and completes a practice session should feel like they used a finished product.

**2.1 — Homepage: replace emoji trust icons**
Remove emoji from the three benefit cards. Replace with a consistent small typographic or icon treatment. DESIGN_SYSTEM does not define an emoji-as-icon pattern.

- Complexity: Low.

**2.2 — Homepage: library invitation section**
Replace the six static category cards with a data-driven section that only displays categories with published content. Add a short editorial introduction and a "Browse all lists →" CTA. Cards for empty categories should not appear.

- Why it matters: The current section implies a complete library. Displaying all six categories when most have no content creates an impression of incompleteness.
- Complexity: Low.

**2.3 — Homepage: SEO-conscious hero copy**
Revise the hero subheading and introductory copy to naturally include terms parents search for — "spelling practice for kids," grade-level references, "free." The headline ("Practice spelling, starting now") can remain. The supporting copy should be rewritten with search intent alongside user intent.

- Complexity: Low (copy change, minimal code).

**2.4 — List Detail: remove disabled Print button**
Remove the disabled "Print Worksheet" button from the list detail page until the print feature is implemented. A disabled button with no explanation teaches visitors that something is broken.

- Complexity: Low.

**2.5 — List Detail: AEO prose sentence**
Add a one-sentence summary to each list detail page that directly answers "what words are on this list?" Generated from the word list or added to frontmatter. Improves both AI extractability and parent scanning speed.

- Complexity: Low (template + content change).

**2.6 — List Detail: meta description optimization**
Update the list detail page meta description template to produce search-intent-aware copy rather than passing the raw `description` frontmatter field through directly.

- Complexity: Low.

**2.7 — Practice Session: Practice Tray design**
Implement the Practice Tray as described in DESIGN_SYSTEM: a centered, elevated card surface that contains the word prompt, input field, and audio controls as a unified element. This is the session's signature design moment. The current session is functional but visually undistinguished — the Practice Tray makes it memorable and reinforces the "workbook" metaphor.

- Complexity: Medium (visual redesign of the question screen; no logic changes required).

**2.8 — Practice Session: voice label improvement**
Map browser voice IDs to friendly labels for the voice selection UI (e.g., "US English", "UK English"). Eliminate raw OS voice names like "Google US English" and "Microsoft Zira."

- Complexity: Medium (browser voice API + label mapping).

**2.9 — Practice Session: mobile keyboard handling**
Ensure the submit button remains visible above the virtual keyboard when the input field is focused on mobile. Use `visualViewport` or `env(keyboard-inset-height)` CSS. Children on tablets and phones are a primary audience.

- Complexity: Medium.

**2.10 — List Detail: print worksheet (basic)**
Implement a print-optimized view using a `@media print` CSS block: list title, word list with blank lines for writing practice, and a brief instructional note. Enables the Print button to be re-introduced (enabled) in this phase.

- Why it matters: Classroom utility. Teachers expect a print option. Differentiates from digital-only tools.
- Complexity: Medium.

---

### Phase 3 — Discovery

**Deliverable:** Users and search engines can easily discover the library.

This phase builds the Tier 2 pages that SITE_ARCHITECTURE defines — Grade Hubs and Category Hubs — and improves the library browsing experience. These pages are the primary SEO surface for high-volume queries like "2nd grade spelling words" and "phonics spelling lists." They also complete the navigation architecture the library index page currently implies but doesn't deliver.

Content dependency: Grade Hub pages need meaningful content at each grade level to be useful. Phase 3 should begin only after the content workstream has published at least 2–3 lists per grade.

**3.1 — Grade Hub pages**
Create `/grade/[grade]` pages (K, 1, 2, 3, 4, 5) with dedicated URLs, a grade-level editorial introduction (2–3 sentences), and a filtered list display. These pages are the primary landing page for the most-searched educational queries the site targets.

- SEO impact: Very high.
- Complexity: Medium (new page type + editorial content per grade).

**3.2 — Category Hub pages**
Create `/category/[category]` pages (phonics, high-frequency-words, grade-level, challenge) with a category-level editorial introduction and filtered list display. Teachers search by method, not by grade. No category-level landing page currently exists.

- SEO impact: High.
- Complexity: Medium.

**3.3 — Library: featured lists section**
Add a "Start here" section at the top of the library index page — 3–5 hand-curated list cards identified by a frontmatter flag. Gives first-time visitors without a specific intent a starting recommendation.

- Complexity: Low.

**3.4 — Library: empty-state and honest completeness**
Show only grade sections with published content. Replace disabled/greyed grade chips with an honest "More lists coming soon" message. Do not expose empty containers.

- Complexity: Low.

**3.5 — Library: category-first browse path**
Add secondary navigation to the library index page for browsing by category (phonics, high-frequency words) alongside the existing grade-first navigation. The two browse paths — by grade for parents, by method for teachers — are both required per SPELLING_LIBRARY_SPEC.

- Complexity: Medium.
- Dependencies: 3.2 (Category Hub pages as link targets).

---

### Phase 4 — Trust & Retention

**Deliverable:** Parents trust the product and returning users have a better experience.

This phase builds the trust infrastructure the site currently lacks and introduces persistence that converts one-time visitors into returning users.

**4.1 — Privacy page**
Create `/privacy` with a plain-language privacy statement appropriate for a children's educational tool. Link from the footer (enabled in Phase 1.7).

- Why it matters: Non-negotiable for a children's product before broad promotion.
- Complexity: Low.

**4.2 — About page**
Create `/about` with the product story, editorial philosophy, and a parent-facing explanation of how the site is free and ad-supported. Differentiates from AI-generated content mills by making the human editorial process visible.

- Complexity: Low (static content page).

**4.3 — Local progress tracking**
Implement localStorage-based progress persistence: after each session, save missed words and session completion per list ID. Surface on the results screen ("You've practiced this list 3 times"). Schema and storage belong in a new `src/lib/progress/` module following the existing pure-function pattern.

- Why it matters: Without persistence, every visit is a first visit. Progress tracking is the clearest path to user retention.
- Complexity: Medium (localStorage schema, session integration, no backend required).

**4.4 — Returning visitor experience**
Use the progress data from 4.3 to surface a "Pick up where you left off" card on the homepage for users who have prior sessions. Implement as a client-side localStorage check on page load — no server state required.

- Complexity: Medium.
- Dependencies: 4.3.

---

### Phase 5 — Authority

**Deliverable:** spellingwords.app becomes the definitive spelling resource online.

This phase builds the Tier 3 content that SITE_ARCHITECTURE defines as the long-term SEO and AEO foundation: teaching guides, word-level pages, and broader educational authority content. This is primarily a content investment, not a UI build.

**5.1 — Teaching guide (first installment)**
Create one Teaching Guide page — e.g., "How to Practice Spelling with Your Child" — as the first Tier 3 authority page. Establishes the template and editorial voice for the guide format. Targets the class of questions parents ask that the practice tool alone cannot answer.

- SEO impact: High (long-form authority content targeting parent research queries).
- Complexity: Low (static Astro page, editorial investment).

**5.2 — Teaching guide expansion**
Publish additional Teaching Guides covering the topics SITE_ARCHITECTURE defines: phonics method explanation, high-frequency word rationale, grade-level progression, how to use spellingwords.app in the classroom. Each guide is a standalone SEO and AEO asset.

- Complexity: Low per guide (editorial investment scales with volume).

**5.3 — Word pages (if warranted)**
Evaluate whether individual word pages (`/words/[word]`) provide enough SEO value to justify the content investment. This decision depends on traffic data from earlier phases. Do not build speculatively.

- Complexity: Medium to high (content × word count).
- Dependencies: Traffic evidence from Phase 3 and 4.

---

## Summary

The current application has a correct foundation: the right technology choices, the right aesthetic direction, working core functionality, and good accessibility bones. The practice session — the heart of the product — is already close to excellent and requires only refinement.

The gaps are concentrated in three areas:

**1. Homepage energy.** Animations and decorative elements overshoot the "calm workbook" aesthetic. The homepage currently feels like a marketing landing page with a warm palette. It needs to feel like the front cover of a well-made workbook.

**2. Site architecture incompleteness.** No Tier 2 pages (Grade Hubs, Category Hubs), no Tier 3 pages (About, Teaching Guides), no footer navigation, no privacy page. The site is architecturally one tier deep, which limits both SEO reach and visitor trust materially.

**3. Library content volume.** The library UI is designed for a full catalog but operates with a fraction of the intended content. Content authoring — running as a parallel workstream throughout all phases — is what unlocks the library's full value. UI work creates the containers; content makes them worth visiting.

The phases are ordered so that every merge improves something a real user can see and feel. Phase 0 makes implementation precise. Phase 1 makes the existing pages coherent. Phase 2 completes the core experience. Phase 3 makes the product discoverable. Phase 4 makes it trustworthy and sticky. Phase 5 makes it authoritative.
