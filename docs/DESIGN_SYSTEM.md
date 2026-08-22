# Design System — spellingwords.app

> **Status:** Approved design direction. Implementation-agnostic. Authoritative for all visual and interaction decisions.

---

## 1. Design Thesis

**spellingwords.app feels like a beloved workbook published by a thoughtful educator — not software you log into, but a quiet space you return to.**

The site earns trust by being calm when the internet is loud, generous when apps are demanding, and readable when screens are cluttered. It respects that its primary users are children who need confidence, and its secondary users are parents and teachers who need credibility.

The aesthetic reference point is not an edtech startup. It is the best workbook you remember from school: clean margins, clear type, a tactile warmth that made you want to pick up a pencil. That quality — unhurried, purposeful, slightly elevated — is what the site should embody on every page.

The boldness of the design is expressed in one place: the practice experience, where the word occupies the page with quiet authority. Everything else — navigation, library, list detail — is in service of getting there.

---

## 2. Visual Principles

**Calm before clever.**
The default state of every page is rest. Motion, color, and ornamentation earn their place by serving comprehension or reducing friction. If an element doesn't help the user, it isn't neutral — it's noise.

**Clarity before decoration.**
Legibility is the foundation. Type hierarchy, contrast, and spatial separation carry the design before any surface treatment is applied. Never sacrifice readability for visual interest.

**Educational warmth, not childish playfulness.**
The site is for children, but it should not read like a children's website. It should read like something a careful teacher made — warm in tone, confident in layout, appropriate in color. Rounded corners and friendly fonts, yes. Clip art, cartoons, bright primaries, or sticker-sheet aesthetics, no.

**Tactile without skeuomorphism.**
The workbook metaphor is expressed through texture, warmth, and spatial rhythm — not through drop shadows, fake paper folds, or realistic object rendering. The grain overlay on the background is as literal as the workbook reference gets.

**Spend boldness in one place.**
Each page should have one element of distinction: the wordmark, the word display card, the hero invitation. The remaining elements should be quiet. A page with many focal points has none.

**Fast is a design value.**
Performance is part of the experience. No heavy images without purpose, no layout-shifting content, no deferred fonts that cause reflow. The page should feel instant. Heaviness in visual design (dense color, crowded layout) should be avoided for the same reason: cognitive load is a form of slowness.

**Trust is visible.**
Every design decision sends a signal about who made this and why. Generous whitespace signals confidence. Clear type signals respect for the reader. The absence of dark patterns, popups, and aggressive CTAs signals that the site is not trying to extract anything. Trust is the cumulative effect of every restrained choice.

---

## 3. Brand Personality

### How the site speaks

spellingwords.app speaks in a teacher's voice, not a product manager's. It is warm, direct, and unhurried. It assumes the best of the child in front of it. It never shouts.

The tone is:
- Encouraging without being effusive
- Clear without being clinical
- Calm without being cold
- Specific without being condescending

### Words and phrases to use

- "Let's practice" — invitation, not command
- "Try it again" — matter-of-fact, no shame
- "That one was tricky" — normalizes difficulty
- "Well done" — quiet, genuine
- "Here's your word" — simple, oriented
- "Go at your own pace" — permission
- "No accounts. No timers. Just spelling." — product values stated plainly

### Words and phrases to avoid

- "Amazing!" / "Fantastic!" / "Incredible!" — hollow, performative
- "Level up" / "Earn points" / "Keep your streak" — gamification language
- "You got it!" with excessive exclamation — cheap affirmation
- "Try SpellingWords Pro" or any upsell copy in practice — never
- Passive-aggressive: "Oops!" / "Uh oh!" — cutesy framing of mistakes
- Corporate: "Leverage your learning" / "Optimize your practice" — wrong register entirely

### How feedback should sound

Feedback is an acknowledgment, not a verdict.

**Correct:** Quiet, warm, brief. The word is confirmed and the learner moves forward without ceremony. "Correct." or a soft visual affirmation. No fanfare.

**Incorrect:** Matter-of-fact and supportive. Show the correct spelling. Do not editorialize. "The correct spelling is _____." The child sees what's right and moves on. No shame, no retry-punishment, no exaggerated sadness icons.

**End of session:** Acknowledging, not evaluating. "You practiced 10 words today." Not "You got 7/10" as the headline. Results are available but not the emotional centerpiece.

### How empty states and errors should sound

Empty states are orientation moments, not dead ends. If a list is empty, the copy explains what belongs there and what to do next. If a URL is malformed, the message is helpful, not technical.

Errors should never feel like the user did something wrong. If the session cannot start, the page explains why calmly and offers the nearest useful path.

---

## 4. Palette Direction

The palette is warm, muted, and specific. It is not generic cream-and-terracotta. The warmth comes from slightly amber-shifted neutrals — the color of good paper — paired with a confident blue that anchors action. The overall effect is a workbook printed on off-white stock with a clear ink.

### Named colors

| Name | Hex | Role |
|---|---|---|
| **Paper** | `#FBF8F3` | Page background. Warm chalk white. The ground everything sits on. |
| **Cloud** | `#F3EDE3` | Card and panel backgrounds. A step deeper than Paper, creating gentle surface separation without borders. |
| **Ink** | `#000000` | Default text on cream-colored surfaces. Use black for maximum readability on Paper, Cloud, and Cream Deep backgrounds. |
| **Brand Blue** | `#2F6FED` | Primary action: buttons, links, focus states. Clear, confident, not cold. |
| **Correct** | `#22B36B` | Feedback: correct spelling. Calm green, not neon. |
| **Incorrect** | `#F0594B` | Feedback: spelling error. Warm red, not alarm-red. |

### Supporting tones

- **Ink Soft** (`#000000`) and **Ink Faint** (`#000000`): legacy hierarchy tokens retained for compatibility, but they intentionally resolve to black. Do not introduce grey text on cream-colored surfaces for captions, metadata, helper text, placeholders, or secondary copy.
- **Cream Deep** (`#EAE0CC`): borders, dividers, subtle surface depth. Replaces the need for grey in the palette.
- **Homepage Red** (`#C94030`): reserved for the homepage start-practice CTA only. A warm deep red that creates urgency without alarm. Not a recurring action color.
- **Category chips** (sun, grass, berry, sky): small accentuating color used on category labels. Should appear in small quantities only — a chip label, a tag, a heading accent. Never used for backgrounds at full saturation.

### Print considerations

Paper, Cloud, and Ink should print faithfully in greyscale. Feedback colors are the only elements that may lose meaning in greyscale — consider supplementing with iconography and text labels rather than color alone.

### Ad context

Ads will be placed in Paper or Cloud backgrounds. Ad containers should use the same surface colors as the surrounding page, not stand out with white boxes or contrasting backgrounds that signal "ad placement here" in an aggressive way. Recessing ads visually into the page rhythm reduces the sense that they compete.

---

## 5. Typography Direction

### Font roles

**Display / Wordmark — Fredoka**
Used for: site name, page-level headings, section headers, navigation wordmark.
Fredoka is rounded and friendly without being childish. Its letterforms read confidently at large sizes. It establishes the site's warmth at the very first glance. Use it for headings where personality matters; do not use it for body text, captions, or the practice word display.

**Body / Interface — Nunito**
Used for: body copy, UI labels, navigation links, list descriptions, list items, button labels, captions, metadata.
Nunito is rounded, highly legible at medium sizes, and warm without drawing attention to itself. It is the workhorse of the interface. Use it for everything that must be read rather than seen.

**Practice / Word Display — Atkinson Hyperlegible**
Used for: the word presented during practice, the user's typed input, word lists on List Detail pages, any context where letter-by-letter reading accuracy matters.
Atkinson Hyperlegible was specifically designed to maximize letter differentiation — a critical property for children learning to spell, who may confuse b/d, p/q, n/u, or similar pairs. This font choice is a deliberate accessibility and pedagogical decision, not a stylistic one. It should always be used where individual letter recognition matters.

### Reading comfort principles

- Type should never be set at a size that requires effort. When in doubt, go larger.
- Line length should be controlled. Long lines of body text tire readers quickly, especially children.
- Line height should be generous. Compressed leading feels rushed.
- Letter spacing should be left at the font's defaults unless there is a specific reason to adjust. Do not artificially widen tracking on body text.
- Text on cream-colored surfaces (Paper, Cloud, and Cream Deep) should use black Ink. Do not use grey text on cream backgrounds; create hierarchy with size, weight, spacing, or layout instead of lowering contrast.

### Child-facing text principles

Children are the primary users of the practice session. Text in the practice context should be:
- Larger than equivalent text on a discovery page
- Set in Atkinson Hyperlegible for words, Nunito for instructions
- Never set in italics in a context where the child needs to read it accurately
- Short in line length — a few words per line for word display, a sentence at most for instruction copy

### Typography by page type

**Discovery pages** (homepage, library, list detail, hubs): Fredoka headings establish warmth and hierarchy. Nunito carries body content. Atkinson is used in word lists within list detail pages.

**Practice session**: Atkinson Hyperlegible for the word card and typing input. Nunito for session chrome (instructions, word count, navigation). Fredoka only in the wordmark or page-level header, never within the practice tray itself.

---

## 6. Layout and Spacing Philosophy

### Density

Pages should feel like they have room to breathe. spellingwords.app is not a dashboard, a news site, or an e-commerce catalog. It is a focused tool with a small surface area of content. That smallness is an asset — lean into it with space.

The impulse to fill empty space should be resisted. A list of 15 words on a page with generous padding and breathing room is more trustworthy than the same list crammed with upsells and related widgets.

### Whitespace

Whitespace is structural, not cosmetic. It separates distinct types of content, creates visual hierarchy, and gives the eye places to rest. The Paper background only works as a calming signal if it can actually be seen.

Sections should be clearly separated. Within a section, elements should be comfortably spaced. The minimum unit of spacing should feel generous to an adult and comfortable to a child.

### Page rhythm

Pages should have a clear vertical cadence. A page with a large heading, a natural pause, a content zone, and a clear exit feels complete. A page with five independent card grids, multiple competing CTAs, and no hierarchy feels exhausting.

Discovery pages follow a natural reading order from top to bottom: orientation → browse → action. The eye should never need to scan sideways to understand where it is.

### Cards

Cards are containers for navigable content, not decoration. A card represents something the user can go somewhere with: a list, a category, a guide. Cards should not be used for informational content that has no destination — that content belongs in a section, not a card grid.

Cards should be simple: title, brief context, one implied action. They should feel like index cards or notebook entries, not feature marketing tiles.

### Mobile vs desktop

The practice session is mobile-first. Children often practice on tablets or phones. The practice interface — word display, audio controls, typing input, feedback — should be fully usable one-handed at arm's length, with large touch targets and a minimal vertical layout.

Discovery pages are comfortable on mobile but benefit from wider layouts on desktop. A two-column grid on desktop collapses gracefully to a single column on mobile. Navigation is always accessible, never hidden behind UI that requires discovery.

### Discovery vs practice pages

Discovery pages (homepage, library, list detail, hubs) carry the site's editorial weight. They may have multiple sections, navigable lists, and some structural complexity. Their job is orientation and decision-making.

The practice session is a different mode entirely. Once practice begins, all chrome is suppressed or minimized. The page becomes the Practice Tray. There is one thing to do. Nothing competes.

---

## 7. Signature Design Element

### The Practice Tray

**What it is:** A visually distinct container — calm, inset, and contained — that holds the word display and response input during a practice session. It occupies the center of the practice session page and signals that the user has entered a focused mode.

**Why this element:** Spelling practice in physical form happens in defined spaces: a sentence strip, a lined worksheet, a word card on a table. The Practice Tray translates that spatial specificity to the screen. It tells the child: this is where the work happens. It focuses attention the way a sheet of paper on a clear desk focuses attention.

**What it feels like:** A slightly warmer surface (Cloud or Cream Deep) within the Paper background, with a soft boundary that reads as container without reading as decorative frame. The word card sits within it, large and clear. The input field sits below, generous and unadorned. Nothing else competes.

**What it is not:** It is not a modal, a dialog, or a game HUD. It does not animate dramatically on entrance. It is not a scored scoreboard. It is simply the designated place — present, ready, and calm.

**On discovery pages:** The Practice Tray does not appear. Its visual language (the slightly warmer surface, the contained layout) may echo in word list items within list detail pages, but it is not used outside the practice session.

**Justification:** This element works because it earns its distinction through purpose, not decoration. It is the UI embodiment of the product's core promise: a quiet place to practice. Its absence on other pages preserves its meaning when it does appear.

---

## 8. Interaction and Motion Philosophy

### When motion is useful

Motion earns its place by reducing cognitive surprise or communicating state change clearly. Appropriate uses:

- **Page load:** A single gentle fadeUp on primary content (as currently implemented) orients the user without visual noise.
- **Word reveal:** The presented word can appear with a brief, soft transition — not a dramatic entrance, but a moment of settling that cues "here it is."
- **Feedback acknowledgment:** A small, calm transition when feedback is shown — a brief color shift, a text fade, not an explosion.
- **Focus transitions:** Smooth, instant focus rings without dramatic keyframe animation.

### When motion should be avoided

- Score counters incrementing visibly — don't do this
- Confetti, stars, particles, or celebratory burst effects — never
- Elements that shake, bounce, or pulse to attract attention
- Progress bars that animate loudly to celebrate completion
- Any motion that serves pride rather than comprehension

### Reduced motion

All transitions and animations must respect `prefers-reduced-motion`. When reduced motion is requested, transitions become instant. No animation should be load-bearing (i.e., content should never be hidden and then revealed solely through animation — always render accessibly without it).

### Hover and focus behavior

Hover states should communicate interactivity through a subtle visual shift — a slight deepening of color, a gentle shadow, an underline — not transformation, scale, or dramatic color change. The interaction should feel like picking something up, not flipping it over.

Focus states must always be visible and consistent: the brand blue outline as currently implemented in `global.css`. This is non-negotiable and applies to every interactive element.

### Practice session interaction tone

The practice session has a deliberate, quiet rhythm. After a word is spoken, the child types. There is no countdown, no visual urgency, no blinking cursor that implies hurry. The feedback appears and settles. The next word arrives calmly.

Every interaction in the practice session should feel like turning a page, not pulling a lever. The child is in control of the pace. The UI reflects that.

---

## 9. Accessibility Principles

### Contrast

All body text must meet WCAG AA contrast requirements at minimum. Practice words (Atkinson Hyperlegible at large sizes) and interactive elements should meet WCAG AAA where achievable. The Ink-on-Paper baseline contrast is by design; it must not be weakened.

### Type sizes

Minimum type size for any readable content is 16px equivalent. Practice words, which children read and transcribe, should be significantly larger — large enough that there is no ambiguity about any individual letterform. Captions and metadata may be smaller, but should never be smaller than 13px equivalent.

### Dyslexia-friendly considerations

Atkinson Hyperlegible is the practice word font precisely because it was designed to minimize letter confusion for readers with dyslexia. Additional measures:
- Avoid italics in instructional or practice contexts
- Avoid condensed type
- Use generous line spacing
- Do not set word lists in all caps
- Do not justify text (left-aligned reading is more comfortable for dyslexic readers)

### Touch targets

Every interactive element — buttons, links, audio replay controls, navigation items — should have a minimum touch target of 44x44 points. In the practice session, audio and navigation controls should be generously sized. No small icon buttons.

### Audio and TTS

The native `speechSynthesis` API is the core audio mechanism. The design must assume that TTS voice quality varies by browser and device. The word card must always display the word visually — audio is the primary delivery mechanism but not the exclusive one.

If TTS fails silently, the child should not be stuck. The word display is the fallback. Instructions adjacent to the audio control should make clear that the word is also shown on screen.

### Screen reader clarity

Screen readers should announce the current word before the input is focused. Feedback must be delivered via `aria-live` regions so screen reader users receive it without additional navigation. Session state (word number, total words) should be available to assistive technology without requiring visual reading.

Navigation and page structure should use semantic landmarks consistently. Every interactive element should have an accessible name.

### Reduced motion

Reiterated from section 8: `prefers-reduced-motion` must be respected. No content should depend on animation to be understood.

---

## 10. Advertising Design Principles

Ads are part of the long-term business model. They are planned into the design, not bolted on after the fact. This distinction matters: planned ads are positioned in the natural negative space of discovery pages, where content pauses and the user's attention is transitioning. Retrofitted ads disrupt flow and look cheap.

### Where ads may appear

- Footer areas of discovery pages (homepage, library, list detail, hubs, teaching guides)
- Sidebar of list detail pages on wide desktop layouts
- Reserved side rails flanking the practice stage on wide desktop (see "Practice session ad rails" below) — never inline within the practice stage itself, at any state

### Where ads must never appear

- Inside the practice stage at any state — ready, active question, feedback, or results (this supersedes an earlier version of this document that allowed inline ads on the start and completion screens; the 2026 practice redesign moved to a stricter rails-only architecture so the practice interaction never has to make room for an ad next to itself)
- Within the word list on a list detail page
- Immediately adjacent to a "Start Practice" call to action
- As interstitials between pages
- As autoplay video or audio of any kind

### Practice session ad rails

The practice stage (`src/pages/play.astro`) reserves two fixed-width, empty rail columns that only become visible at genuinely wide viewports — no ad code today, layout architecture only:

- Below 1360px: single column, no rails. The practice stage is exactly what it is today.
- 1360px–1759px: one fixed 300px rail appears (left side), alongside the centered 672px practice stage. Gutter between rail and stage: 32px.
- 1760px and wider: two symmetric fixed 300px rails appear. The outer shell is capped at 1336px (672px stage + 2×300px rails + 2×32px gutters) so the stage never compresses once both rails are present.

A rail never overlaps the stage, never sits between the progress bar and the question, never sits adjacent to Check Spelling / Continue, and never appears on mobile or tablet. Because the rails are reserved (not inserted) at these breakpoints, populating them later with a real ad causes no layout shift and never forces the stage off-center.

### Visual treatment

Ads should occupy the same surface color as the surrounding page. They should not be set in white boxes if the background is Paper — this creates a jarring visual break. Ads are visually secondary: they sit in the layout without competing for hierarchy.

Ads must not cause layout shift. Their dimensions should be reserved in the layout before the ad loads, so the page does not jump when content arrives.

### Cognitive safety

The learning experience must feel uninterrupted even when ads are present. The reader should be able to ignore an ad effortlessly. No ad adjacent to a practice action.

---

## 11. Page-Type Design Notes

### Homepage

The homepage's design job is to make a confident, warm first impression and get the user into practice within three interactions. The primary entry point — the custom word input — should be unmistakable and inviting, not buried below scrolling hero content. The page should feel like opening a workbook to the first exercise: ready to begin. Advertising does not appear on the homepage.

### Spelling Library

The Library is a reference page, not a discovery page in the magazine sense. Its design should feel like a well-organized table of contents — clear categories, scannable entries, restrained visual hierarchy. It is not a card explosion. The user should be able to identify their path in one glance. Advertising may appear in the footer.

### List Detail

List Detail pages carry the most SEO weight and must hold the attention of both parents/teachers evaluating a list and children ready to practice. The design should lead with the list's identity, present the word list in a clean, readable format, and surface the "Start Practice" action prominently without aggression. Educational context (what skill this builds, why these words) is present but not dominant. Ads may appear in the sidebar (desktop) or footer, never within the word list.

### Practice Session

The practice session is the only page where the UI disappears. Once practice begins, the page IS the Practice Tray. The header carries the full "Sw" mark and wordmark (quieter than the discovery header, but unmistakably the same brand) plus one contextual action: "← Back to {source}" before a session starts (when the session has a known source page), "Exit practice" during an active question or feedback state, and "← New list" as the fallback when no source is known. The site footer never appears during ready, question, feedback, or results — only on the error/unsupported screens, which sit outside the practice shell entirely. The child sees a word, hears it, types it, and receives calm feedback. Nothing else competes. No ads during active practice — see "Practice session ad rails" in §10 for the reserved-rail architecture that keeps future ads outside the stage entirely.

### Grade Hub

Grade Hubs orient users who browse by grade. The design should convey the scope of available content at a glance and make it easy to pick a list or narrow to a category. It should feel like a well-organized chapter in a reference book, not a grid of undifferentiated cards. Advertising in footer.

### Category Hub

Category Hubs serve parents and teachers understanding a specific skill type (phonics, high-frequency words, challenge). The design should explain what the category is briefly, then get out of the way and show the lists. A small amount of editorial context is appropriate. Advertising in footer.

### Teaching Guide

Teaching Guides are long-form content pages written for educators and parents. The design should be editorially calm — close to an article layout, with a strong typographic hierarchy and comfortable line length. Reading comfort is the primary concern. The guide should not look like a blog post or an SEO article farm. Advertising in sidebar or footer.

### About

The About page exists to build trust. Its design should feel personal and considered — not the typical corporate "Mission and Values" page, but an honest statement of what the site is and why it was made. Wide margins, clear type, modest length. No advertising.

### Future Word Pages

Individual word reference pages (etymology, usage, example sentences, related words) are currently out of scope but planned. When they arrive, their design should feel like a dictionary entry published by a thoughtful hand — authoritative, readable, compact. Advertising may appear alongside them, but the word entry itself must be the unambiguous primary content.

---

## 12. Anti-Patterns

The following approaches are explicitly rejected. If a proposed design decision can be described by one of these patterns, it should not proceed without deliberate justification and approval.

**Generic SaaS hero.** The homepage should not open with a large headline, subheadline, CTA button, and illustration above the fold. spellingwords.app is a tool, not a product being sold. Lead with the thing, not the pitch for the thing.

**Cartoon classroom theme.** No clip art, no illustrated chalkboard, no cartoon pencil mascot, no starburst buttons. The workbook metaphor is warm and tactile, not illustrated and playful.

**Bright gamified kids app.** Primary-color saturation, animated mascots, score counters, reward sounds, or anything that reads as a game UI. spellingwords.app is defined by the absence of these elements.

**Dark mode as the primary identity.** The site is built on warm Paper backgrounds. A dark mode variant may eventually be considered as an accessibility option, but the product's visual identity is light, warm, and legible — not dramatic or techno.

**Worksheet warehouse look.** Dense tables, small type, no whitespace, pure-white backgrounds with black borders. The opposite of the warmth this product is built on.

**Dense SEO article look.** Long blocks of copy broken up by headers and keyword-stuffed subheadings, surrounded by ads. Educational authority should come from genuine quality, not content volume.

**Excessive cards everywhere.** Cards are for navigable content with a destination. Using card grids for sections that are better expressed as lists, paragraphs, or simple headings fragments the page without adding value.

**Overuse of badges and chips.** Category chips appear on list entries to identify their type — that's appropriate. They should not proliferate across every page element as decoration.

**Fake productivity dashboard.** Progress charts, streak counters, daily goal rings, completion percentages — anything that turns spelling practice into self-management theater. The product explicitly does not track this.

**Loud confetti or score-focused UI.** The session completion experience should be gentle acknowledgment, not a celebration optimized for dopamine. "You practiced 10 words" is the message. The visual should match.

**Ad-first layouts.** A layout designed around maximizing ad placement at the cost of content legibility or trust. Ads are planned in, not dominant.

**Interstitials and autoplay media.** These are disallowed absolutely, in any context.

---

## 13. Design Review Checklist

Use this checklist when evaluating any page, component, or design decision.

**Tone**
- [ ] Does this page feel calm? Is there anything that creates urgency, pressure, or anxiety?
- [ ] Does the copy sound like a thoughtful educator, or does it sound like product marketing?
- [ ] Are feedback states (correct, incorrect, empty, error) warm and matter-of-fact?

**Clarity**
- [ ] Is the primary action obvious without reading the entire page?
- [ ] Can a child understand what to do on this page without help from an adult?
- [ ] Is the visual hierarchy clear from the first glance?

**Distinctiveness and restraint**
- [ ] Is this page visually distinctive without being distracting?
- [ ] Is there one focal element, or are multiple elements competing for attention?
- [ ] Does the page use only established design tokens (colors, fonts, spacing)?

**Trust**
- [ ] Does this page feel trustworthy to a parent evaluating the site for their child?
- [ ] Is there anything on this page that could feel manipulative, extractive, or gamified?
- [ ] Is the site's privacy stance (no accounts, no tracking beyond localStorage) implicitly honored by the design?

**Practice experience**
- [ ] If this is a practice page: is everything except the Practice Tray visually secondary?
- [ ] If this is a practice page: is there any ad, animation, or chrome that competes with the word?
- [ ] Does the interaction rhythm feel child-paced, not app-paced?

**Accessibility**
- [ ] Are all interactive elements keyboard accessible with visible focus states?
- [ ] Are touch targets large enough for a child's hand?
- [ ] Is contrast sufficient for children and adults in varied lighting conditions?
- [ ] Does the page work correctly with `prefers-reduced-motion` set?

**Advertising**
- [ ] Are ads absent from the practice session active zone?
- [ ] Do ads sit naturally in the page rhythm, or do they interrupt it?
- [ ] Is there any risk of layout shift when ads load?

**Performance**
- [ ] Is the page fast? Are there any large images, blocking scripts, or layout-shifting resources?
- [ ] Does the page feel instant on a mobile connection?

**Purpose**
- [ ] Does the design serve the stated purpose of this specific page?
- [ ] Would removing any element from this page make the remaining elements stronger?
