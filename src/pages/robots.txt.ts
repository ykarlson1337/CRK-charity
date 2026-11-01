import type { APIRoute } from 'astro';

// Crawling stays open either way: while flags.indexable is false, every page
// carries <meta name="robots" content="noindex">, which crawlers must be able
// to read for it to work.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap-index.xml', site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
