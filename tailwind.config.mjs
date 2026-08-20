/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,svelte,vue}'],
  theme: {
    extend: {
      colors: {
        // Canvas — cool near-white, barely blue, no purple undertone.
        // Production home of Exploration A1's --canvas/--canvas-raised/--canvas-sunken.
        canvas: {
          DEFAULT: '#F5F8FC',
          raised:  '#FFFFFF',
          sunken:  '#EAF0F7',
        },

        // Ink — cobalt-tinted near-black text hierarchy.
        ink: {
          DEFAULT:        '#14202F',
          soft:           '#44586E',
          faint:          '#75879A',
          'on-stage':      '#EEF3FB',
          'on-stage-soft': '#B9C9E0',
        },

        border: {
          DEFAULT:     '#DDE4EF',
          strong:      '#C2CEE0',
          interactive: '#5F7FA8',
        },

        // Brand — desaturated, ink-heavy cobalt. The site's throughline color.
        brand: {
          DEFAULT: '#1F4D8F',
          strong:  '#163863',
          tint:    '#E5EDF9',
        },

        // Stage — the dark, saturated surface reserved for the practice
        // question/feedback screens and the homepage word-entry panel. Used
        // sparingly so it reads as a considered destination, not a theme.
        stage: {
          DEFAULT: '#14294F',
          deep:    '#0B1930',
          edge:    '#3A5F9E',
        },

        // Secondary accents — small, purposeful doses: grade/skill wayfinding
        // tags, chip hovers, illustrative dots. Each -tint pairing is tuned to
        // also work as small AA text on its own tint background.
        accent: {
          coral:        '#C14A2B',
          'coral-tint': '#FBE6DF',
          gold:         '#A8701E',
          'gold-tint':  '#F8ECD6',
          teal:         '#146059',
          'teal-tint':  '#DCF0EC',
          plum:         '#6A3F89',
          'plum-tint':  '#EFE3F5',
          // Brighter gold reserved for use ON the dark stage surface only.
          'gold-on-stage':       '#C98A2C',
          'gold-on-stage-hover': '#DDA13F',
        },

        // Feedback — calm, always paired with icon/text, never the sole signal.
        feedback: {
          correct:          '#1F6B34',
          'correct-bg':     '#E3F3E4',
          'correct-border': '#A9D9AE',
          incorrect:          '#A13A24',
          'incorrect-bg':     '#FBE9E6',
          'incorrect-border': '#EDB9AB',
        },

        focus: '#C98A2C',
      },
      fontFamily: {
        // Plus Jakarta Sans — body/interface text.
        sans:    ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Petrona — the site's one expressive typographic moment: headings,
        // wordmark, hero display type.
        display: ['"Petrona"', 'Iowan Old Style', 'Georgia', 'serif'],
        // Baloo 2 — kept scoped to Grade Unit "world" heroes (GradeUnitWorldPage.astro
        // / src/lib/theme/worldKits.ts), untouched by this redesign.
        baloo: ['"Baloo 2"', 'ui-rounded', 'system-ui', 'sans-serif'],
        // Lexend — student-facing spelling-word display, where extra letterform
        // clarity earns its place. Not used indiscriminately across the UI.
        word: ['"Lexend"', 'ui-sans-serif', 'sans-serif'],
        mono: ['"Lexend"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm:      '8px',
        DEFAULT: '14px',
        md:      '14px',
        lg:      '22px',
        xl:      '22px',
        '2xl':   '22px',
        '3xl':   '26px',
        '4xl':   '30px',
        pill:    '999px',
      },
      maxWidth: {
        'content-sm': '480px',
        'content-md': '672px',
        'content-lg': '960px',
        'content-xl': '1120px',
      },
      boxShadow: {
        sm:      '0 1px 2px rgba(23, 27, 46, 0.06), 0 1px 1px rgba(23, 27, 46, 0.04)',
        card:    '0 1px 2px rgba(23, 27, 46, 0.06), 0 1px 1px rgba(23, 27, 46, 0.04)',
        'card-md':  '0 8px 24px rgba(23, 27, 46, 0.09), 0 2px 6px rgba(23, 27, 46, 0.06)',
        'card-lg':  '0 12px 32px -8px rgba(23, 27, 46, 0.16)',
        stage:   '0 24px 60px rgba(23, 22, 59, 0.28)',
        'btn-brand': '0 8px 20px -8px rgba(31, 77, 143, 0.45)',
        'btn-amber': '0 8px 24px -8px rgba(168, 112, 30, 0.35)',
      },
    },
  },
  plugins: [],
};
