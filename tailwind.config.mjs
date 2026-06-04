/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,svelte,vue}'],
  theme: {
    extend: {
      colors: {
        'app-cream': '#FDFBF7',
        'app-charcoal': '#1E2022',
        'app-leather': '#8C7862',
        'app-sage': '#6E8870',
        classroom: {
          blue: '#4A90D9',
          amber: '#F5A623',
          coral: '#E8735A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
