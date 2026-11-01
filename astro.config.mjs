// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Static by default. The booking API route opts out of prerendering
// and runs as a Vercel function (see src/pages/api/booking.ts).
export default defineConfig({
  site: 'https://crkcharity.golf',
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
