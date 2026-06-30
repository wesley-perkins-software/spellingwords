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

        // Text — warmer tones throughout
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
      },
      fontFamily: {
        // Nunito — warm, rounded body font
        sans:    ['"Nunito"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Fredoka — friendly display font for headlines and wordmark
        display: ['"Fredoka"', 'ui-rounded', 'system-ui', 'sans-serif'],
        // Atkinson Hyperlegible — maximally legible for word display and textarea
        word:    ['"Atkinson Hyperlegible"', 'ui-sans-serif', 'sans-serif'],
        mono:    ['"Atkinson Hyperlegible"', 'ui-monospace', 'monospace'],
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
