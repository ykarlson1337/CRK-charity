import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import { bookingOptions, event } from '../../data/event';

// Runs as a Vercel function; everything else on the site is static.
export const prerender = false;

const MAX = { short: 200, message: 4000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(form: FormData, name: string, max = MAX.short): string {
  const value = form.get(name);
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

/** 303 back to the form with an error code the page can show. */
function back(code: 'felter' | 'send'): Response {
  return new Response(null, { status: 303, headers: { Location: `/?fejl=${code}#kontakt` } });
}

function done(): Response {
  return new Response(null, { status: 303, headers: { Location: '/tak' } });
}

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return back('felter');
  }

  // Honeypot: people never see this field, bots tend to fill it. Pretend it worked.
  if (field(form, 'website')) return done();

  const data = {
    navn: field(form, 'navn'),
    virksomhed: field(form, 'virksomhed'),
    email: field(form, 'email'),
    telefon: field(form, 'telefon', 40),
    pakke: field(form, 'pakke', 40),
    antal: field(form, 'antal', 10),
    besked: field(form, 'besked', MAX.message),
  };

  const option = bookingOptions.find((o) => o.value === data.pakke);
  if (!data.navn || !EMAIL.test(data.email) || !data.telefon || !option) return back('felter');

  const apiKey = getSecret('RESEND_API_KEY');
  const to = getSecret('BOOKING_TO');
  const from = getSecret('BOOKING_FROM');
  if (!apiKey || !to || !from) {
    console.error('Booking form is not configured: set RESEND_API_KEY, BOOKING_TO and BOOKING_FROM.');
    return back('send');
  }

  const lines = [
    `Ny forespørgsel til ${event.name} ${event.year}`,
    '',
    `Pakke: ${option.label}`,
    `Antal: ${data.antal || '-'}`,
    '',
    `Navn: ${data.navn}`,
    `Virksomhed: ${data.virksomhed || '-'}`,
    `E-mail: ${data.email}`,
    `Telefon: ${data.telefon}`,
    '',
    'Besked:',
    data.besked || '-',
  ];

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: to
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        reply_to: data.email,
        subject: `Booking: ${option.label} · ${data.virksomhed || data.navn}`,
        text: lines.join('\n'),
      }),
    });
    if (!res.ok) {
      console.error('Resend rejected the booking e-mail', res.status, await res.text());
      return back('send');
    }
  } catch (err) {
    console.error('Could not reach Resend', err);
    return back('send');
  }

  return done();
};

// A plain visit to the endpoint goes to the form.
export const GET: APIRoute = () => new Response(null, { status: 303, headers: { Location: '/#kontakt' } });
