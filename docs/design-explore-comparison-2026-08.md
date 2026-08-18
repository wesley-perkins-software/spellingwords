# Visual Design Exploration — Comparison (August 2026)

## Overview

Three new, isolated visual-design directions for spellingwords.app, built to answer one question:

> How can a simple, beautiful educational interface feel genuinely made for children ages 5–12 without becoming childish?

This round of exploration was a deliberate correction of two earlier failure modes already visible in `src/pages/design-explore/`:

- **exploration-a/-b/-c** (+ color variants): too adult/sterile — a cool-indigo SaaS-landing-page look.
- **word-as-color-object / shifting-environments / call-and-response**: too concept/metaphor-driven (typographic color-objects, a literal "curriculum notebook," a literal "call/response" dialogue split).

An earlier draft of *this* round's three theses repeated a subtler version of the same problem — one direction pulled toward adult/editorial, one toward preschool/playful, one toward adult/productivity, effectively three different target audiences. That draft was rejected before implementation. The three directions below were revised to all sit inside the same target territory — a warm, colorful, credible K–5 product — and differ only through execution: how color is deployed, how typography carries personality, how geometry is handled, and where each direction spends its "delight budget." Names are neutral (Direction A/B/C) by design — a direction needing a story to explain itself is a warning sign, not a feature.

All three are static, self-contained prototypes under `src/pages/design-explore/`, isolated from production (`noindex,nofollow`, no imports of `global.css` or `tailwind.config.mjs`, own token systems). Nothing here is wired into production.

**Routes** (each direction has 4 pages, desktop + mobile via responsive CSS in the same file):

| | Homepage | Grade Hub | Skill / reference | Practice |
|---|---|---|---|---|
| Direction A | `/design-explore/direction-a/` | `/design-explore/direction-a/grade-hub` | `/design-explore/direction-a/skill` | `/design-explore/direction-a/practice` |
| Direction B | `/design-explore/direction-b/` | `/design-explore/direction-b/grade-hub` | `/design-explore/direction-b/skill` | `/design-explore/direction-b/practice` |
| Direction C | `/design-explore/direction-c/` | `/design-explore/direction-c/grade-hub` | `/design-explore/direction-c/skill` | `/design-explore/direction-c/practice` |

All three use identical real content throughout (the same Grade 1 copy, the same "Short Vowels: CVC Words" list — cat, hat, bed, red, pig, sit, hot, dog, bug, run — and the same real `/play` phrases), so any perceived quality difference is attributable to design, not content.

## The shared test

Every direction's homepage and `/play` screen was built and reviewed against both halves of one test, at once:
1. A child aged ~5–12 should plausibly feel this was designed for someone their age.
2. An adult (parent/teacher) should immediately read it as a credible educational resource — not a toy, not enterprise software.

## Per-direction summary

### Direction A — confident color blocking, friendly structure

One confident cerulean primary + a warm coral secondary, applied as **discrete blocked surfaces** (nav bar, hero panel, grade-card top bands) rather than full-bleed washes, on a light warm-white canvas. Quicksand (display) + Mulish (body). Moderate 10–16px radius, pills reserved for small badges/chips only. The `/play` audio button is the visual star of the screen — large, saturated blue, tactile hover/press states.

- **Passes the dual test**: yes. The grade grid's colored top-bands + big numerals read as playful and organized at once; the practice screen's oversized "Hear Word" button gives it real tactile presence for a child, while the structured section rhythm and calm feedback panels (mint/amber, never red) keep it credible.
- **Avoids prior failures**: not a SaaS panel layout (color lives on discrete blocks, not one dominant dark palette); not a metaphor (no notebook/stamp/dialogue conceit) — the personality comes from the color-blocking system itself.
- **Checkpoint A finding, resolved**: the homepage's closing "trust" section originally sat on a solid dark-blue full-bleed band with white text, reading like a generic SaaS closing CTA. Softened to a light tinted panel (brand-tint background, brand border) — no solid-dark-band pattern exists anywhere in the direction now.
- **Residual note**: the incorrect-feedback "Continue" button uses a solid rust-red (`--incorrect-ink`) fill. It's a muted brick tone rather than a pure alarm-red, and is visually consistent with the panel's own accent, but it's the one place across all three directions that comes closest to a "red state" button — worth a lighter treatment (e.g., an outline/ghost button instead of a solid fill) if this direction advances.

### Direction B — soft tinted surfaces, gentle shape, tactile warmth

A very soft warm-neutral base (pale blush-cream) with color introduced as **gentle watercolor-wash tinted panels** (mint/cream/sky/blush/lilac/peach) rather than saturated blocks. Baloo 2 (warm, rounded, expressive) + Nunito (calm). Soft 10–20px radius with soft-shadow "lift" for depth — geometry stays gentle without tipping into pill-everything (the CTA and Check Spelling buttons are deliberately not full pills).

- **Passes the dual test**: yes. The cozy tinted-panel language and Baloo 2 headings give it warmth a child responds to; the calm mint/peach feedback tokens (never red/green traffic-light), the readiness-signal copy, and the editorial attribution line on the skill page keep it credible to an adult.
- **Avoids prior failures**: not sterile (real color and warmth throughout); not a metaphor; and specifically avoids the "preschool/bubble" overcorrection risk flagged for this direction — no `border-radius: 999px` on any interactive control anywhere in the direction.
- **Checkpoint A finding**: none required — this direction held its own discipline from the start.

### Direction C — crisp contemporary type, restrained accent, exceptional controls

A clean, light, cool-neutral canvas with **one** confident warm-leaning accent (coral-violet) used for CTAs/focus/active states, plus four semantic marks used only as small details (never fills). Space Grotesk (bold, expressive, at real generous scale) + Work Sans. Small-medium 10–18px radius, minimal shadow — personality comes from typographic scale and interaction craft (hover/focus/press states, a genuinely custom SVG waveform icon on the audio button) rather than color or shape maximalism.

- **Passes the dual test**: yes, though this is the direction with the most inherent risk of drifting back toward the "adult SaaS" failure mode. It clears the bar via big, confident Space Grotesk headlines (not shrunk for "restraint"), a genuinely vivid accent color, generous spacing, and real craft on the `/play` controls rather than a clinical, dense layout.
- **Avoids prior failures**: not a metaphor; and specifically avoids repeating exploration-a/b/c's cool-indigo-SaaS look — canvas and type choices are warmer and bolder than that prior direction.
- **Checkpoint A finding, resolved**: the homepage's primary CTA button and skill chips originally used a full pill radius (`--radius-pill`), directly contradicting this direction's own "small-medium consistent radius" thesis and reading too similarly to Direction A's pill usage. Fixed — both now use `--radius-md` (12px), with slightly more padding to keep them feeling generous rather than stiff.

## Side-by-side comparison

| Axis | Direction A | Direction B | Direction C |
|---|---|---|---|
| Palette deployment | Discrete blocked surfaces (nav, hero panel, card top-bands) | Gentle tinted watercolor-wash panels | One confident accent; 4 marks used only as small details, never fills |
| Typography role | Quicksand (geometric-rounded, confident) + Mulish | Baloo 2 (warm, rounded, expressive) + Nunito | Space Grotesk (bold, large-scale) + Work Sans — type carries most of the personality |
| Geometry | Moderate 10–16px, pills only for small badges | Soft 10–20px, no pills on interactive controls | Small-medium 10–18px, minimal shadow, crisp borders |
| Where the "delight budget" is spent | The oversized primary-blue "Hear Word" button as visual star | Tactile softness — cushioned tinted cards, soft shadow "lift" | Interaction-state craftsmanship (hover/focus/press, custom icon) |
| `/play` feedback treatment | Mint/amber tinted panels, calm icon + phrase | Mint/peach tinted panels inside the practice card | Border/icon color shift only, no full panel tint (most restrained) |
| Grade Hub treatment | Colored top-band + large numeral per card | Each grade a softly tinted rounded card | Large expressive numeral as focal point + one accent-colored detail |
| Density | Medium, structured sections | Medium-low, cozy grouped clusters | Medium, precise alignment, generous spacing |

No two directions share a palette-deployment strategy, a display typeface, or a geometry approach — differentiation is real, not a palette swap of one template.

## Accessibility verification

All three directions were built with WCAG 2.2 AA contrast checked at the token level (each direction's `-ink`/`-strong` shades were chosen specifically to clear 4.5:1 on their paired tint/background), an explicit `:focus-visible` style (not relying on browser default), a `prefers-reduced-motion: reduce` block collapsing all transitions, semantic HTML (real `<nav aria-label="Breadcrumb"><ol>`, `<label>`-bound inputs, `<button aria-label="Play the word">` on icon-only audio controls, `role="progressbar"` with `aria-valuenow/min/max`, real `<ul>/<li>` and `<dl>/<dt>/<dd>` for lists/FAQ, non-skipped heading hierarchy), and ≥44×44px touch targets throughout.

| Check | Direction A | Direction B | Direction C |
|---|---|---|---|
| Contrast (token-level AA) | Pass | Pass | Pass |
| Visible `:focus-visible` | Pass | Pass | Pass |
| Touch targets ≥44×44px | Pass | Pass | Pass |
| `prefers-reduced-motion` | Pass | Pass | Pass |
| Semantic HTML / heading hierarchy | Pass | Pass | Pass |
| Known residual issue | Incorrect-state "Continue" button reads slightly red (muted rust fill) — recommend an outline treatment if this direction advances | None | None |

`npm run build` completes cleanly (228 pages) with all 12 new routes rendering correctly.

## Ranked recommendation

1. **Direction A — confident color blocking, friendly structure.** The strongest all-around balance: it is the most immediately, legibly "made for a child" of the three (the color-blocked grade grid and the oversized audio button are instantly readable as kid-facing) while its structured section rhythm and calm feedback treatment keep it fully credible to a parent or teacher. Its one residual issue (the red-leaning incorrect-continue button) is a small, easily-fixed detail, not a structural problem.
2. **Direction B — soft tinted surfaces, gentle shape, tactile warmth.** Very close behind — arguably the warmest and most tactile of the three, and it held its own geometry discipline (no pill overcorrection) throughout without any Checkpoint A fixes needed. It may read as very slightly lower-energy than Direction A on first impression, which is a matter of taste rather than a flaw.
3. **Direction C — crisp contemporary type, restrained accent, exceptional controls.** The most distinctive and the best fit if the product wants to differentiate through typographic confidence and interaction polish rather than color. It required one real correction (the pill-radius drift) to stay true to its own thesis, and it remains the direction with the most ongoing risk of sliding toward "adult SaaS" as it's extended to more surfaces — worth extra scrutiny in any surface built beyond what's here.

This is exploration output only. **The winning direction is not implemented into production as part of this task.** The owner should review all 12 routes directly (desktop and mobile) before deciding whether — and which — direction to carry forward.
