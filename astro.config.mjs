import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

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

  // The site is still static: every page is prerendered at build time and
  // served as HTML. The adapter exists for exactly one route,
  // `src/pages/api/subscribe.ts`, which opts out with `prerender = false`.
  //
  // It is there because a static build has no server to accept a POST, and
  // beehiiv's subscribe API needs a secret key — a key shipped to the browser
  // is a public key. One server function is the smallest thing that lets the
  // sign-up form be our own markup instead of a third-party embed.
  //
  // If the newsletter ever moves off beehiiv, deleting that route and this
  // adapter returns the project to a plain static build.
  adapter: vercel(),

  // /panels/<slug> is a production surface for the social carousels, not a
  // reader destination — it renders the same explainer at 1080×1350 for export.
  // Leaving it in the sitemap would offer search engines a second, worse copy
  // of every explainer. The pages also carry noindex and data-pagefind-ignore;
  // this is the third of the three places that has to agree.
  integrations: [sitemap({ filter: (page) => !page.includes('/panels/') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
