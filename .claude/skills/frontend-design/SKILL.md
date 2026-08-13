---
name: frontend-design
description: Design and implement distinctive, production-grade frontend interfaces. Use for components, pages, applications, and substantial visual redesigns. Prioritizes context-specific visual identity, coherent systems, usability, accessibility, responsiveness, performance, and maintainability over generic AI-generated styling.
license: Complete terms in LICENSE.txt
---

Create frontend work that feels deliberately designed for its product and audience, not assembled from generic model defaults.

The goal is BOTH:
- a distinctive, context-specific visual identity; and
- an exceptionally usable, accessible, performant, maintainable real product.

Do not trade one for the other.

## Start with the product, not a style

Before choosing visual treatments, understand:
- the interface's job and the user's primary tasks;
- the audiences and how their needs differ;
- the content: its density, length, variability, and hierarchy;
- interaction frequency, and whether users are new, occasional, or repeat/expert;
- brand attributes and any existing visual equity;
- accessibility and performance requirements;
- technical constraints, framework conventions, and device/browser expectations.

For an existing product, inspect before redesigning. Identify the current design system, tokens, reusable components, layout patterns, page families, important states, responsive behavior, and behaviors that must be preserved. Do not casually replace working architecture or established product conventions just because a different implementation would be more aesthetically convenient.

## Derive a clear visual thesis

Choose a strong visual direction that follows from the brief rather than picking a style category arbitrarily.

Aesthetic references — editorial, brutalist, organic, playful, industrial, luxury, retro, maximal, minimal, and so on — are useful vocabulary for exploration. They are not the decision process. Ask instead:
- What qualities should this product communicate?
- What visual decisions naturally reinforce those qualities?
- What should be memorable? What should stay familiar and quiet?

Seek one or a small number of recognizable signature ideas: a typographic voice, a compositional rule, an illustration language, a shape grammar, a framing device, an interaction motif, or another ownable characteristic. Spend originality where it creates identity. Keep ordinary interactions immediately understandable — brand distinctiveness is not the same as UI unpredictability. Don't make every section surprising.

For substantial or ambiguous redesigns, explore 2-3 genuinely different directions before applying one broadly. Good directions differ conceptually — typography strategy, compositional grammar, surface/elevation treatment, density, brand signature — not just by palette. When human review is available, converge on a direction with the user before broad implementation.

## Avoid AI-default design by making better decisions, not a blacklist

Common fonts, simple layouts, cards, gradients, rounded corners, minimalism, and maximalism are not inherently wrong. They're wrong when chosen automatically, with no relationship to the product. Don't replace one blacklist with another (e.g. banning specific fonts or effects) — that just relocates the convergence problem.

Watch for these failure patterns instead:
- generic neutral styling with no brand character;
- excessive/unmotivated cards and containers;
- decorative gradients, glows, blobs, grain, or glass effects with no purpose;
- predictable hero/three-card/CTA compositions applied regardless of content;
- display fonts chosen only for novelty;
- overuse of pills, badges, and ornamental labels;
- strong hierarchy hidden behind surface polish;
- repeated information or low-density containers;
- component-library conventions forced onto a problem they don't fit;
- visual complexity that doesn't serve the user's task.

Every prominent visual decision should be defensible from the brief, hierarchy, interaction, or brand — familiar or unusual, common or rare.

## Build a system, not a collection of pages

Establish or extend a compact visual system before styling many surfaces:
- foundations — color, typography, spacing, shape, elevation, motion;
- semantic tokens named by purpose (e.g. `text-muted`, `surface-raised`, `action-primary`, `focus-ring`, `danger`);
- reusable primitives (buttons, links, fields, text roles, icons, surfaces, layout primitives);
- reusable patterns (headers, sections, cards/lists, navigation, forms, shells).

Use existing appropriate tokens/components before inventing local replacements. If the existing system can't express the new direction, evolve it centrally rather than accumulating page-specific magic numbers, duplicated colors, one-off type scales, or selector overrides. Keep the system small enough to actually understand — add an abstraction because values share meaning, not because every value technically could become one.

## Practice visual craft with judgment

**Typography** — choose for readability, hierarchy, brand character, glyph/language coverage, rendering, and loading cost, not for rarity or familiarity as such. Use a role-based type scale; give display type more personality and keep sustained-reading/UI type highly legible.

**Color** — build a semantic system (text, surfaces, borders, actions, focus, selection, status), not a "dominant color + accent" formula. Never rely on color alone to convey meaning or state.

**Composition** — use alignment, grids, rhythm, spacing, and scale to build hierarchy. Asymmetry, overlap, and grid-breaking are excellent tools when they strengthen the concept — optional, not expected defaults. Content clarity and responsive robustness always win over decorative composition.

**Surfaces & decoration** — cards, shadows, texture, transparency, gradients, and illustration must earn their presence. Use containment when it communicates a real grouping or boundary, not by default. Prefer a few coherent devices over many unrelated effects.

**Motion** — use it to explain state changes, give feedback, preserve spatial continuity, or reinforce a genuinely meaningful brand moment. Don't animate to prove polish. Page-load reveals, staggered entrances, parallax, and scroll-triggered effects are exceptional tools, not defaults — never delay access to real content for one. Respect `prefers-reduced-motion` with a calm equivalent, and prefer cheap CSS/native techniques over animation dependencies.

## Accessibility is a design input

For serious web products, WCAG 2.2 AA is the default floor unless the project says otherwise. Design it in from the start, not as a final pass:
- semantic HTML and native controls first;
- logical heading/landmark structure;
- sufficient text and non-text contrast;
- visible, consistent keyboard focus that isn't obscured;
- full keyboard operability and sensible focus order;
- comfortable pointer/touch target sizing;
- no meaning conveyed by color alone;
- clear labels, instructions, errors, and status messages;
- screen-reader semantics where native HTML isn't enough;
- reflow/zoom support and resilience to user text-spacing overrides;
- reduced-motion support and readable, predictable interaction.

Don't discover at the end that a chosen layout, animation, or effect can't be made accessible without changing the design.

## Design complete states

A component isn't finished because its default state looks good. As relevant, design: default, hover, focus-visible, active/pressed, selected, disabled/unavailable, loading, empty, success, warning, error, and long/missing-content cases. Only cover states the component actually has.

## Protect performance

Visual choices are performance decisions: a dramatic hero asset, five font weights, or an animation library all have engineering cost. For web projects, protect LCP, INP, and CLS — size media to avoid layout shift, lazy-load non-critical assets (not the initial view), load only the font weights/axes actually needed, avoid layout/paint-heavy animation properties, and justify any dependency added purely for a decorative effect. Use a project-specific performance budget where one exists; otherwise preserve or improve the current baseline unless a tradeoff is explicitly agreed.

## Implement production software

Prefer semantic structure, native platform behavior, progressive enhancement, reusable components, straightforward responsive CSS, and existing project conventions. Preserve existing functionality unless the brief authorizes changing it.

Avoid monolithic components without reason, excessive absolute positioning for normal content, DOM shaped only to match a screenshot, gratuitous dependencies, CSS specificity wars, and cosmetically-duplicated components. Match implementation complexity to the aesthetic ambition, but constrain it by accessibility, performance, maintainability, and regression risk.

## Validate visually, not just syntactically

A successful build is not proof of successful design. When browser or screenshot tooling is available, use it for meaningful visual work:

1. render the real interface with realistic content and edge cases;
2. inspect narrow/mobile and desktop widths (and an intermediate width when useful);
3. check hierarchy, alignment, wrapping, overflow, clipping, density, and image cropping;
4. inspect the interaction states that actually apply (hover, focus, loading, empty, error, ...);
5. exercise the real flow, verify keyboard behavior, and verify reduced-motion behavior if motion exists;
6. fix what's wrong, then render again.

Scale the effort to the size and risk of the change — don't screenshot after every small CSS tweak, but never skip validation for a new pattern or a substantial visual change. For large redesigns, validate representative templates before propagating a system across many pages.

## Work in progressive scope for large redesigns

For a substantial existing-product redesign: inspect the app and preservation constraints → identify representative page families and patterns → define the design problem → explore visual directions → converge on one → establish/evolve tokens and primitives → implement representative surfaces → render, critique, iterate → verify accessibility and performance → propagate by template/page family → final consistency/regression audit → remove obsolete styling.

Do not immediately rewrite an entire site's CSS after being asked to "redesign the website."

## Final standard

Before calling the work done, ask:
- Does this clearly belong to this product, not a generic template?
- Is there a memorable visual thesis without unnecessary novelty?
- Can users immediately understand the important content and actions?
- Is it coherent across pages, states, and screen sizes?
- Is it accessible, responsive, performant, and maintainable?
- Has the running interface actually been visually inspected?

If any answer is no, it isn't finished.
