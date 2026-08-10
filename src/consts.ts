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
// Delivery runs on beehiiv. A static Astro build has no server, so the sign-up
// form cannot post to beehiiv's API directly — that endpoint takes a secret
// key, and a key shipped to the browser is a key that is public. The supported
// keyless path is beehiiv's hosted embed, which is an <iframe>, so that is what
// `NewsletterSignup.astro` renders.
//
// Both values below come from beehiiv and are blank until the publication is
// created. While they are blank the sign-up block renders nothing in
// production and a visible reminder under `astro dev` — a form that looks real
// and collects nothing is worse than no form.
//
//   NEWSLETTER_EMBED_URL — beehiiv → Grow → Subscribe Forms → build a form →
//     "Get embed code", then copy only the iframe's src (it looks like
//     https://embeds.beehiiv.com/<uuid>). Set the form's colors in beehiiv's
//     builder to match: Ground #171614, Paper #F1EFE8, button Highlight
//     #9FE1CB with Deep text #04342C. The iframe cannot inherit our CSS.
//
//   NEWSLETTER_SUBSCRIBE_URL — the hosted subscribe page,
//     https://<handle>.beehiiv.com/subscribe. Used as the no-JS and
//     blocked-iframe fallback, and as the call to action on issue pages.
export const NEWSLETTER_EMBED_URL = '';
export const NEWSLETTER_SUBSCRIBE_URL = '';

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
