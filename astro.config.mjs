import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Production URL — drives canonical URLs, Open Graph tags, sitemap-index.xml,
  // and robots.txt.
  //
  // This must match the host Vercel actually serves, not just any domain that
  // resolves. vantageph.com currently 308s to www.vantageph.com, so www is the
  // canonical host; pointing `site` at the apex would emit canonicals to a URL
  // that immediately redirects. If the Vercel primary domain is ever switched
  // to the apex, change this in the same deploy.
  site: 'https://www.vantageph.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
