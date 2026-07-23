import type { APIRoute } from 'astro';

// Served at /robots.txt. The Sitemap URL is derived from `site` in
// astro.config.mjs, so it stays correct once the real domain is set.
export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
};
