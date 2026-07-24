// Shared site constants. Swap CONTACT_EMAIL for a dedicated inbox
// (editorial@ / tips@ / corrections@) once the real domain is live.
export const CONTACT_EMAIL = 'sirjairus@macabuhay.asia';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61592073608643';

// Primary navigation. Search is deliberately absent — it lives as a search bar
// in the header rather than a nav destination.
//
// "Articles" points at the explainers index: those are the written articles,
// where the feed (/) is the short social-native format and /archive is a
// utility listing. Retargeting it is a one-line change here.
export const NAV_LINKS = [
  { href: '/explained', label: 'Articles' },
  { href: '/videos', label: 'Videos' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// Facebook is the only live account. The rest are placeholders so the row is
// laid out and styled — swap `href` as each account is created, and drop the
// `placeholder` flag so the link stops being inert.
export const SOCIAL_LINKS = [
  { label: 'Facebook', href: FACEBOOK_URL, icon: 'facebook', placeholder: false },
  { label: 'Instagram', href: '#', icon: 'instagram', placeholder: true },
  { label: 'YouTube', href: '#', icon: 'youtube', placeholder: true },
  { label: 'X', href: '#', icon: 'x', placeholder: true },
];
