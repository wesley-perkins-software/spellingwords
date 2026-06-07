/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,svelte,vue}'],
  theme: {
    extend: {
      colors: {
        'app-paper': '#FFFFFF',
        'app-cloud': '#F4F7FB',
        brand: {
          blue: '#2F6FED',
          'blue-deep': '#1E4FBE',
        },
        ink: '#1F2937',
        'ink-soft': '#5B6472',
        line: '#E2E8F2',
        chip: {
          sun: '#FFB347',
          grass: '#4CAF6D',
          berry: '#EF5DA8',
          sky: '#3FB6E8',
        },
        feedback: {
          correct: '#22B36B',
          incorrect: '#F0594B',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Baloo 2"', 'ui-rounded', 'system-ui', 'sans-serif'],
        mono: ['"Courier Prime"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '12px',
        md: '12px',
        lg: '16px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '28px',
      },
    },
  },
  plugins: [],
};
