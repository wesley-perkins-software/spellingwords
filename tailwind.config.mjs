/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,svelte,vue}'],
  theme: {
    extend: {
      colors: {
        // Background surfaces — warm chalk replaces cool white
        'app-paper':   '#FBF8F3',   // warm chalk (was #FFFFFF)
        'app-cloud':   '#F3EDE3',   // soft cream (was cool #F4F7FB)
        'cream-deep':  '#EAE0CC',   // deeper cream, for input toolbars

        brand: {
          // Blue kept intact — used by play page, listing pages, components
          blue:         '#2F6FED',
          'blue-deep':  '#1E4FBE',
          // Red — homepage CTA and primary brand accent
          red:          '#C94030',
          'red-deep':   '#A83226',
          // Sky — homepage links / eyebrows
          sky:          '#4A80B4',
        },

        // Text — black on cream for maximum readability
        ink:         '#000000',   // black text for maximum readability on cream backgrounds
        'ink-soft':  '#000000',   // formerly grey secondary text; now black for contrast
        'ink-faint': '#000000',   // formerly faint grey text; now black for contrast

        // Border — warmer to match new background
        line: '#E4E0DA',          // warm border (was cool blue-gray #E2E8F2)

        chip: {
          sun:   '#FFB347',
          grass: '#4CAF6D',
          berry: '#EF5DA8',
          sky:   '#3FB6E8',
        },
        feedback: {
          correct:   '#22B36B',
          incorrect: '#F0594B',
        },

        // ─────────────────────────────────────────────────────────────
        // "da" (Direction A) — the new production design system being
        // staged in page-by-page (see src/lib/content/pilotContent.ts).
        // This is not a permanent parallel theme: once the full rollout
        // is complete, these tokens become the normal production system
        // and the legacy tokens above (app-*, brand.*, chip.*, ink*) are
        // retired. Until then, the two systems intentionally stay
        // separate — nothing here is derived from or blended with the
        // legacy palette above, and legacy pages never reference `da.*`.
        // Promoted from src/pages/design-explore/direction-a/_shared/Proto.astro.
        // ─────────────────────────────────────────────────────────────
        da: {
          canvas: '#fffbf5',
          'canvas-raised': '#ffffff',
          'canvas-sunken': '#fbf3e8',

          // Text policy: default reading copy is near-black, not gray — hierarchy
          // comes from weight/size/spacing, not from washing out body text.
          // `ink` is reserved for headings/strong emphasis, `ink-soft` is the
          // default for body copy/descriptions (deliberately very close to
          // `ink`, not a mid-gray), and `ink-faint` is the one quieter tier,
          // reserved for genuinely minor metadata (word counts, timestamps) —
          // still dark enough to read easily, just the least emphatic of the three.
          ink: '#2a2420',
          'ink-soft': '#332e29',
          'ink-faint': '#5c534b',

          border: '#ece2d4',
          'border-strong': '#ddcfba',

          // Structure / navigation / learning
          brand: '#2e7dd1',
          'brand-strong': '#1f5fa8',
          'brand-tint': '#e4f0fc',

          // Principal user action (Practice / Start CTAs) — never used decoratively
          coral: '#ff8a5b',
          'coral-strong': '#e06a3a',
          'coral-tint': '#ffece2',
          'coral-ink': '#9a3d17',

          // Semantic accents for strand/grade/skill-family wayfinding — a shared
          // hue vocabulary, NOT a single-purpose token: brand and coral are the
          // only two colors with one fixed job (structure, action) and are
          // never assigned here. Grade identity, strand identity, and Skill
          // families each draw their own mapping from this pool (see
          // pilotContent.ts) and may reuse a hue where their page roles never
          // compete for the same visual space.
          sun: '#ffc24b',
          'sun-tint': '#fff5df',
          'sun-ink': '#7a5300',
          teal: '#2fb6a3',
          'teal-tint': '#e2f7f4',
          'teal-ink': '#0d5c50',
          pink: '#ff6b8a',
          'pink-tint': '#ffe6ec',
          'pink-ink': '#a01d3f',
          periwinkle: '#7c8cf8',
          'periwinkle-tint': '#ecefff',
          'periwinkle-ink': '#3b3fb0',
          // Fresh green — added for Grade 1 so grade identity no longer has to
          // borrow action coral. Kept visibly distinct from teal (less cyan,
          // more leaf-green).
          green: '#4caf6d',
          'green-tint': '#e5f6ea',
          'green-ink': '#1f6b3e',
          // Plum — added for Grade 5 so grade identity no longer has to borrow
          // structural brand blue. Deliberately leans magenta/violet rather
          // than blue-violet (unlike periwinkle) so it never reads as "another
          // blue" next to brand.
          plum: '#8659a8',
          'plum-tint': '#f2eaf8',
          'plum-ink': '#5a3878',
          // Grade-only hues — added to resolve exact hue collisions between
          // GRADE_ACCENT and STRAND_ACCENT (Kindergarten/sun, Grade 2/teal,
          // Grade 3/periwinkle previously shared a hue 1:1 with Core Spelling,
          // High-Frequency Words, and Themed Practice respectively — see
          // pilotContent.ts). Strand keeps its original sun/teal/periwinkle,
          // since strand is the higher-prominence, more widely-used axis;
          // these three replace only the colliding GRADE_ACCENT slots.
          // sprout (Kindergarten) — yellow-green, sits in the open gap between
          // sun and green; kept warm/springlike, never neon.
          sprout: '#a4c251',
          'sprout-tint': '#f1f5e5',
          'sprout-ink': '#5a6f20',
          // fern (Grade 2) — a cooler, deeper spring green than sprout or
          // green, sitting between green and teal without reading as either.
          fern: '#60bc4e',
          'fern-tint': '#e8f4e6',
          'fern-ink': '#2c6321',
          // orchid (Grade 3) — magenta-violet, sits in the open gap between
          // plum and pink; distinct from periwinkle's blue-violet lean.
          orchid: '#d369c2',
          'orchid-tint': '#f6e4f3',
          'orchid-ink': '#7a1f6b',

          correct: '#1f6b34',
          'correct-bg': '#e3f3e4',
          'correct-border': '#a9d9ae',
          incorrect: '#a13a24',
          'incorrect-bg': '#fbe9e6',
          'incorrect-border': '#edb9ab',

          // Page-role atmospheres — one low-chroma near-white base tone per
          // major page role (see pilotContent.ts for which routes opt in).
          'surface-home': '#f3f8fd',
          'surface-unit': '#fdf6f3',
          'surface-skill': '#f3faf6',
          'surface-white': '#ffffff',
          'surface-cool': '#f2f6fb',
          'surface-neutral': '#f6f3ee',
          // Grade Hub atmospheres — one near-white surface per grade, barely
          // tinted with that grade's identity hue. Deliberately far paler than
          // the strand-card tints below: the goal is "I moved into another
          // grade," not "this page is green." Every Grade Hub shares the same
          // template; only this whisper of cast should differ.
          // k/2/3 re-derived from sprout/fern/orchid (was sun/teal/periwinkle)
          // to match the GRADE_ACCENT reassignment above.
          'surface-grade-k': '#f8faf5',
          'surface-grade-1': '#f3f9f5',
          'surface-grade-2': '#f6faf5',
          'surface-grade-3': '#faf5f9',
          'surface-grade-4': '#fbf3f5',
          'surface-grade-5': '#f7f3fa',
        },
      },
      fontFamily: {
        // Nunito — warm, rounded body font
        sans:    ['"Nunito"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Fredoka — friendly display font for headlines and wordmark
        display: ['"Fredoka"', 'ui-rounded', 'system-ui', 'sans-serif'],
        // Baloo 2 — bouncier display face used only in Grade Unit "world" heroes
        // (src/lib/theme/worldKits.ts). Not the site-wide display font — kept
        // scoped to that one context rather than replacing Fredoka everywhere.
        baloo: ['"Baloo 2"', 'ui-rounded', 'system-ui', 'sans-serif'],
        // Atkinson Hyperlegible — maximally legible for word display and textarea
        word:    ['"Atkinson Hyperlegible"', 'ui-sans-serif', 'sans-serif'],
        mono:    ['"Atkinson Hyperlegible"', 'ui-monospace', 'monospace'],
        // Direction A typography — pilot pages only (see pilotContent.ts).
        quicksand: ['"Quicksand"', 'ui-rounded', 'system-ui', 'sans-serif'],
        mulish:    ['"Mulish"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm:      '8px',
        DEFAULT: '12px',
        md:      '12px',
        lg:      '16px',
        xl:      '16px',
        '2xl':   '20px',
        '3xl':   '24px',
        '4xl':   '28px',
      },
      maxWidth: {
        'content-sm': '480px',
        'content-md': '672px',
        'content-lg': '960px',
        'content-xl': '1120px',
      },
      boxShadow: {
        'card':     '0 2px 8px -2px rgba(43, 35, 24, 0.08)',
        'card-md':  '0 6px 20px -6px rgba(43, 35, 24, 0.12)',
        'card-lg':  '0 12px 32px -8px rgba(43, 35, 24, 0.18)',
        'btn-blue': '0 8px 20px -8px rgba(47, 111, 237, 0.45)',
        'btn-red':  '0 8px 28px -6px rgba(201, 64, 48, 0.22)',
      },
    },
  },
  plugins: [],
};
