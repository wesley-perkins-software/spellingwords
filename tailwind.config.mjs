/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,svelte,vue}'],
  theme: {
    extend: {
      colors: {
        'app-cream': '#F7F3EC',
        'app-charcoal': '#3A332E',
        'app-leather': '#8C7862',
        'app-sage': '#6E8870',
        'app-hairline': '#E5DFD3',
        accent: {
          moss: '#6B8064',
          rust: '#B17F4A',
          indigo: '#6B7CA0',
          plum: '#8A6B7E',
        },
        feedback: {
          correct: '#2DBD7E',
          incorrect: '#E0664B',
        },
      },
      fontFamily: {
        sans: ['"Public Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Source Serif 4"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"Courier Prime"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '6px',
        md: '6px',
        lg: '8px',
        xl: '8px',
        '2xl': '8px',
        '3xl': '10px',
      },
    },
  },
  plugins: [],
};
