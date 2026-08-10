// Shared site constants. Swap CONTACT_EMAIL for a dedicated inbox
// (editorial@ / tips@ / corrections@) once the real domain is live.
export const CONTACT_EMAIL = 'sirjairus@macabuhay.asia';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61592073608643';
export const INSTAGRAM_URL = 'https://www.instagram.com/vanta.ge.ph/';

// Primary navigation. Search is deliberately absent — it lives as a search bar
// in the header rather than a nav destination.
//
// "Archive" points at /archive — the complete, paginated run of everything
// published. The home page shows only the latest uploads, so the two are not
// the same listing. The label matches the route deliberately: two names for
// one destination ("Articles" in the nav, "Archive" everywhere else) was a
// wayfinding cost with no upside.
//
// Contact is not a separate destination. It's the second half of /about —
// a one-person masthead and a way to reach that person belong on one page.
export const NAV_LINKS = [
  { href: '/archive', label: 'Archive' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/about', label: 'About' },
];

// ---------------------------------------------------------------------------
// Newsletter
// ---------------------------------------------------------------------------
//
// Delivery runs on beehiiv, but the sign-up form is ours: plain Vantage markup
// posting to `/api/subscribe`, the site's single server-rendered route, which
// calls beehiiv with a key that never reaches the browser. No third-party
// script loads anywhere on the site.
//
// There is nothing to configure here. The two values the endpoint needs —
// BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID — are environment variables in the
// Vercel project and are deliberately absent from the repo. Without them the
// endpoint logs and returns a plain failure rather than silently dropping
// addresses.

// The masthead name for the newsletter, used in page titles and headings.
//
// Deliberately the generic word for now rather than a sub-brand. A second name
// is a second thing readers have to learn and trust, and it is not worth
// inventing one before the first issue has proved what the thing actually is.
//
// The templates treat 'Newsletter' as a signal that there is no sub-brand yet:
// they drop the "Newsletter" eyebrow above the heading so the same word does
// not print twice. Set a real name here and the eyebrow comes back on its own.
export const NEWSLETTER_NAME = 'Newsletter';

// One sentence, in the house voice: what a reader gets. Shown above every
// sign-up form.
//
// No cadence claim, on purpose. "Every Sunday" is a public promise that costs
// real trust the first week it slips, and it buys very little at signup time.
// Describe the contents instead; add a rhythm here only once the publication
// has actually kept one for a while.
export const NEWSLETTER_BLURB =
  'Philippine politics and public money, explained — what happened, and why it matters. Free, and one click to leave.';

// Facebook and Instagram are live. YouTube and X are placeholders so the row
// is laid out and styled — swap `href` as each account is created, and drop
// the `placeholder` flag so the link stops being inert.
export const SOCIAL_LINKS = [
  { label: 'Facebook', href: FACEBOOK_URL, icon: 'facebook', placeholder: false },
  { label: 'Instagram', href: INSTAGRAM_URL, icon: 'instagram', placeholder: false },
  { label: 'YouTube', href: '#', icon: 'youtube', placeholder: true },
  { label: 'X', href: '#', icon: 'x', placeholder: true },
];
