import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Production URL — drives canonical URLs, Open Graph tags, sitemap-index.xml,
  // and robots.txt. Update if a custom domain is added later.
  site: 'https://vantage-xi-two.vercel.app',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
