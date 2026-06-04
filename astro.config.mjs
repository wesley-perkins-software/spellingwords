import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  site: 'https://spellingwords.netlify.app',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
