/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'app-cream':   '#FDFBF7',
        'app-charcoal':'#1E2022',
        'app-leather': '#8C7862',
        // Core brand — brighter, more classroom-friendly
        'app-sage':    '#3FA757',
        // Extended palette for educational context
        'app-sky':     '#3BAED6',
        'app-sun':     '#F0B429',
        'app-coral':   '#E8623D',
      },
      fontFamily: {
        // Nunito: rounded, warm, highly readable — body text
        sans:    ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Fredoka: friendly, rounded headlines — not childish, not corporate
        display: ['Fredoka', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl':  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
