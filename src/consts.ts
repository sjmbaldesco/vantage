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
  { href: '/about', label: 'About' },
];

// Facebook and Instagram are live. YouTube and X are placeholders so the row
// is laid out and styled — swap `href` as each account is created, and drop
// the `placeholder` flag so the link stops being inert.
export const SOCIAL_LINKS = [
  { label: 'Facebook', href: FACEBOOK_URL, icon: 'facebook', placeholder: false },
  { label: 'Instagram', href: INSTAGRAM_URL, icon: 'instagram', placeholder: false },
  { label: 'YouTube', href: '#', icon: 'youtube', placeholder: true },
  { label: 'X', href: '#', icon: 'x', placeholder: true },
];
