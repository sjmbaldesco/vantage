# Vantage

Vantage is a social-media-native editorial and information publication — "explanatory journalism" for a Philippine audience, in the lineage of Vox and Assortedge. The job is to break down *why* a story matters, not just report what happened, and to do it credibly enough that "delivers truthful facts to the public" is a claim the brand can actually stand behind.

This repo is the starting point for Vantage's website. The brand system below is settled — build within it rather than reinventing it. If a design decision isn't covered here, prefer the option that reads as more restrained and more neutral; that restraint is the whole strategy.

## Voice

Measured, plain-spoken explainer — write like the smartest friend in the room walking someone through a story, not a meme account and not an academic. Headlines state the fact plainly. Body copy explains the mechanism behind it. Avoid outrage framing, avoid partisan-coded language, avoid speculation presented as fact. The brand's entire credibility rests on reading as neutral and fact-first — that's the gap both Vox and Assortedge separately proved exists.

## Visual system: signal teal

| Token | Hex | Use |
|---|---|---|
| Ink | `#2C2C2A` | Primary text, dark surfaces (header, logo lockup) |
| Paper | `#F1EFE8` | Page background, light surfaces |
| Signal teal | `#1D9E75` | Primary accent — logo underline, links, CTAs |
| Highlight | `#9FE1CB` | Background for the one highlighted fact per post |
| Deep text | `#04342C` | Text color on top of the highlight |

These are already wired up as Tailwind v4 theme tokens in `src/styles/global.css` — use the generated utilities (`bg-ink`, `bg-paper`, `bg-teal`, `bg-teal-light`, `text-teal-dark`, etc.) rather than hardcoding hex anywhere new.

Why teal and not red or amber: red/coral reads as aligned with a party color and as alarm rather than information in a Philippine political-news context — a credibility cost for a "truthful facts" brand. Teal has no such baggage and still reads as a deliberate, singular signature.

### Type

- Headline: Space Grotesk, weight 500/700 — Tailwind utility `font-display`
- Body: Inter, weight 400/500 — Tailwind utility `font-body`
- Both loaded via Google Fonts in `src/layouts/Layout.astro`.

### Logo

- Primary lockup: "VANTAGE" set in Space Grotesk bold, tight tracking, with a short signal-teal bar underneath. Implemented in `src/components/Header.astro`.
- Profile/avatar mark: a single teal "V" on an ink square, in `public/favicon.svg`. Treat this as a placeholder for the social profile picture until a real mark is designed — it is intentionally simple, not final.

### The signature device — one highlight per post, no exceptions

Every post highlights exactly one fact: the number or phrase that makes the story worth reading. This is Vantage's own version of Vox's yellow-highlighter device — a single, disciplined signal used constantly, rather than decoration used occasionally. It only works if it stays rare. The moment more than one thing is highlighted in a post, it stops signaling anything.

This is enforced in code, not just convention: `src/components/FactPost.astro` takes a `headline` string and a `highlight` string, and throws a build error if `highlight` doesn't appear in `headline` exactly once. Don't work around this constraint by concatenating strings or disabling the check — if a headline needs two facts called out, it should be two posts.

## Content templates already built

- `src/pages/index.astro` — feed of `FactPost` cards (the short, social/carousel-style format).
- `src/pages/explained/rice-prices.astro` — long-form explainer template (numbered driver breakdown), the web equivalent of a multi-slide carousel explainer.

Both currently use placeholder copy and placeholder figures. Replace with real reporting before publishing anything live.

## Suggested next steps

1. Replace placeholder copy in the homepage feed and the explainer sample with real stories.
2. Add an About/masthead page. Who's behind Vantage matters more than most sites for a "truthful facts" positioning — anonymity undercuts the claim.
3. Add real social links and a repeatable pattern for cross-posting from Instagram/Threads.
4. Commission a real logo mark to replace the type-only placeholder (see Visual system above for the constraints any new mark needs to satisfy: works at favicon size, works on both ink and paper backgrounds, keeps the signal-teal accent as the only color signal).
5. Decide on a CMS or Astro content collections once story volume grows past hand-written `.astro` pages — content collections are the natural fit here and shouldn't require restructuring what's already built.

## Stack

Astro 7 + Tailwind CSS v4 (`@tailwindcss/vite`, CSS-first config — there is no `tailwind.config.js`; tokens live in `src/styles/global.css`).
