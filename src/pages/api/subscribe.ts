import type { APIRoute } from 'astro';

// The only server-rendered route on the site. Everything else is prerendered
// HTML; this exists because a static build cannot accept a POST, and beehiiv's
// subscribe API takes a secret key that must never reach the browser.
export const prerender = false;

// Both values are set as environment variables in the Vercel project, never in
// the repo. `import.meta.env` covers the build and dev server; `process.env`
// covers the Vercel runtime.
const API_KEY = import.meta.env.BEEHIIV_API_KEY ?? process.env.BEEHIIV_API_KEY;
const PUBLICATION_ID =
  import.meta.env.BEEHIIV_PUBLICATION_ID ?? process.env.BEEHIIV_PUBLICATION_ID;

// Deliberately loose. Strict email regexes reject valid addresses more often
// than they catch bad ones, and beehiiv validates properly on its side anyway.
// This only exists to give an instant answer to obvious typos.
const looksLikeEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;

type Result = { ok: boolean; message: string };

const SUCCESS: Result = {
  ok: true,
  message: "Almost there — check your inbox and confirm to finish subscribing.",
};

// One message for "already subscribed" and one for success would let anyone
// test whether a given address is on the list. Same response either way.
const respond = (
  request: Request,
  redirectTo: URL,
  result: Result,
  status: number
) => {
  const wantsJSON = (request.headers.get('accept') ?? '').includes(
    'application/json'
  );

  if (wantsJSON) {
    return new Response(JSON.stringify(result), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // No-JS path: the browser posted the form natively, so send it back to the
  // page it came from with the outcome in the query string.
  redirectTo.searchParams.set(result.ok ? 'subscribed' : 'error', '1');
  return new Response(null, {
    status: 303,
    headers: { Location: redirectTo.toString() },
  });
};

export const POST: APIRoute = async ({ request, url }) => {
  // Only ever redirect to a path on this site.
  //
  // `new URL(value, base)` ignores the base whenever `value` is absolute, so
  // taking `?from=` straight from the query string turned this into an open
  // redirect: ?from=https://example.com sent a 303 Location off-site. It takes
  // a POST rather than a link click, so it is awkward to exploit — but a
  // redirector living on the domain of a publication that sells credibility is
  // a phishing primitive we have no use for.
  //
  // The test demands a leading slash that is not followed by a second one,
  // which also rejects protocol-relative values like //example.com, and no
  // backslashes, which some URL parsers fold into forward slashes.
  const requestedFrom = url.searchParams.get('from') ?? '/newsletter';
  const safeFrom = /^\/(?!\/)[^\\]*$/.test(requestedFrom)
    ? requestedFrom
    : '/newsletter';

  const back = new URL(safeFrom, url.origin);
  back.search = '';

  if (!API_KEY || !PUBLICATION_ID) {
    console.error('Newsletter: BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID unset');
    return respond(
      request,
      back,
      { ok: false, message: 'Sign-up is temporarily unavailable.' },
      500
    );
  }

  let email = '';
  let honeypot = '';

  const contentType = request.headers.get('content-type') ?? '';
  try {
    if (contentType.includes('application/json')) {
      const body = await request.json();
      email = String(body.email ?? '').trim();
      honeypot = String(body.company ?? '').trim();
    } else {
      const form = await request.formData();
      email = String(form.get('email') ?? '').trim();
      honeypot = String(form.get('company') ?? '').trim();
    }
  } catch {
    return respond(
      request,
      back,
      { ok: false, message: 'That request could not be read.' },
      400
    );
  }

  // Hidden field, invisible to humans and irresistible to bots. Answer as
  // though it worked so the bot has nothing to learn.
  if (honeypot !== '') return respond(request, back, SUCCESS, 200);

  if (!looksLikeEmail(email)) {
    return respond(
      request,
      back,
      { ok: false, message: "That doesn't look like an email address." },
      400
    );
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          // Force the confirmation email regardless of what the publication
          // default happens to be. Every address on this list confirmed it
          // wanted to be there — that is the deliverability-safe choice and
          // the consistent one for a publication that runs corrections.
          double_opt_override: 'on',
          // Never reactivate someone who deliberately unsubscribed. They can
          // resubscribe through beehiiv's own page if they mean it.
          reactivate_existing: false,
          send_welcome_email: false,
          referring_site: 'www.vantageph.com',
          utm_source: 'vantageph.com',
        }),
      }
    );

    if (!response.ok) {
      // Log the detail for us, tell the reader nothing that would confirm
      // whether the address is already on the list.
      console.error(
        'beehiiv subscribe failed',
        response.status,
        await response.text().catch(() => '')
      );

      if (response.status === 429) {
        return respond(
          request,
          back,
          { ok: false, message: 'Too many attempts. Try again in a minute.' },
          429
        );
      }

      return respond(request, back, SUCCESS, 200);
    }

    return respond(request, back, SUCCESS, 200);
  } catch (error) {
    console.error('beehiiv subscribe threw', error);
    return respond(
      request,
      back,
      { ok: false, message: 'Something broke on our end. Try again shortly.' },
      502
    );
  }
};

// A GET here is someone poking at the URL, not a reader. Say so plainly.
export const GET: APIRoute = () =>
  new Response('This endpoint accepts POST requests only.', {
    status: 405,
    headers: { Allow: 'POST' },
  });
