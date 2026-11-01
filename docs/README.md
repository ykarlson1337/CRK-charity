# Docs

Design sources and planning documents for crkcharity.golf.

## In this folder

- `design/Main.dc.html`, `Sponsor.dc.html`, `Praktisk.dc.html`: desktop artboards (1440 px) from the Claude Design canvas.
- `design/MainMobil.dc.html`, `SponsorMobil.dc.html`, `PraktiskMobil.dc.html`: mobile artboards (390 px).
- `design/tokens.json`: the CRK Charity design system tokens (colors, type scale, spacing, radii).

The `.dc.html` files are design references, not production code. They hold the exact copy, layout and token usage that the Astro components reproduce.

## Online sources

- Website brief (structure, copy, open questions): https://claude.ai/artifact/BmvACPBfZY559evxieBy7c
- Hand-off plan (stack, PR plan, launch checklist): https://claude.ai/artifact/2rmgQwPGSamRyoK64UZZ9M
- Design canvas: https://claude.ai/artifact/RGJJtFgVVnBKJyRDA1MMg6
- Design system "CRK Charity": https://claude.ai/artifact/RJFvDsE11ZRM73UtzbNTjS

## Placeholders

Copy in `[square brackets]` is waiting for a decision from the club (see the open questions in the brief). Most of it lives in `src/data/event.ts`.

- `npm run build` ends with `scripts/check-placeholders.mjs`, which lists every placeholder still visible on the built pages.
- It only warns. Set `STRICT_PLACEHOLDERS=1` to make it fail the build.
- While placeholders remain, `flags.indexable` in `src/data/event.ts` stays `false`, so every page carries `noindex`. Flip it when the list is empty.

## Switches in `src/data/event.ts`

- `flags.titelsponsorSolgt`: shows "Præsenteret af [Firma]" in the hero and the title sponsor's slot on the sponsor wall.
- `flags.formaalAnnonceret`: swaps the good-cause copy from "announced on [dato]" to the beneficiary.
- `flags.indexable`: lets search engines index the site.

## Booking form

The form posts to `src/pages/api/booking.ts` (a Vercel function), which e-mails the request via [Resend](https://resend.com) and redirects to `/tak`. It needs three environment variables in the Vercel project (see `.env.example`):

- `RESEND_API_KEY`
- `BOOKING_TO`: one or more recipients, comma separated
- `BOOKING_FROM`: a sender on a domain verified in Resend, e.g. `Charity Golf <booking@crkcharity.golf>`

Until they are set, the form answers with a friendly error that points people to the phone numbers.

## Motion

Two React islands in `src/components/motion/` are adapted from 21st.dev components: Number Ticker (dillionverma) and Scroll animated timeline (ibrandify). Both server-render their final state and respect `prefers-reduced-motion`.
