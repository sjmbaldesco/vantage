import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // TODO: replace with the real production domain before launch. This drives
  // canonical URLs, Open Graph tags, sitemap-index.xml, and robots.txt.
  site: 'https://vantage.example.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
