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
          blue: '#3B82F6',
          yellow: '#FBBF24',
          coral: '#F06449',
          green: '#2DBD7E',
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
