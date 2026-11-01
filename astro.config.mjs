// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';

// Static by default. The booking API route opts out of prerendering
// and runs as a Vercel function (see src/pages/api/booking.ts).
export default defineConfig({
  site: 'https://crkcharity.golf',
  output: 'static',
  adapter: vercel(),
  // React only for the two motion islands (number ticker, history timeline).
  integrations: [react()],
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
