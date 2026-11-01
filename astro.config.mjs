// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Static by default. The booking API route opts out of prerendering
// and runs as a Vercel function (see src/pages/api/booking.ts).
export default defineConfig({
  site: 'https://crkcharity.golf',
  output: 'static',
  adapter: vercel(),
  integrations: [
    // React only for the two motion islands (number ticker, history timeline).
    react(),
    sitemap({
      filter: (page) => !/\/(tak|404)\/?$/.test(page),
    }),
  ],
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  env: {
    // Set in Vercel project settings. Optional so the site builds without
    // them; the booking route answers with a friendly error until they exist.
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      BOOKING_TO: envField.string({ context: 'server', access: 'secret', optional: true }),
      BOOKING_FROM: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
