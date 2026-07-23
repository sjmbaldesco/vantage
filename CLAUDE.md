# Vantage

Vantage is a social-media-native editorial and information publication — "explanatory journalism" for a Philippine audience, in the lineage of Vox and Assortedge. The job is to break down *why* a story matters, not just report what happened, and to do it credibly enough that "delivers truthful facts to the public" is a claim the brand can actually stand behind.

This repo is Vantage's website. The brand system below is settled — build within it rather than reinventing it. If a design decision isn't covered here, prefer the option that reads as more restrained and more neutral; that restraint is the whole strategy.

## Voice

Measured, plain-spoken explainer — write like the smartest friend in the room walking someone through a story, not a meme account and not an academic. Headlines state the fact plainly. Body copy explains the mechanism behind it. Avoid outrage framing, avoid partisan-coded language, avoid speculation presented as fact. The brand's entire credibility rests on reading as neutral and fact-first — that's the gap both Vox and Assortedge separately proved exists.

**Never invent real-sounding news content.** Placeholder copy must stay obviously fake until real reporting is supplied. This applies to imported designs too — mockups often carry plausible sample stories, and those do not get promoted into the content collections.

## Visual system: signal teal on dark

The site runs in **dark mode**. The page sits on a near-black ground; Ink is the *surface* for bars and cards on top of it, and Paper is the primary text color rather than the background.

| Token | Hex | Use |
|---|---|---|
| Ground | `#171614` | Page background |
| Ink | `#2C2C2A` | Surface for header, footer, and cards |
| Paper | `#F1EFE8` | Primary text, wordmark |
| Signal teal | `#1D9E75` | Logo underline, card hover borders |
| Highlight | `#9FE1CB` | Background for the one highlighted fact per post; also carries eyebrows, secondary links, and primary buttons on dark |
| Deep text | `#04342C` | Text on top of the highlight |

These are wired up as Tailwind v4 theme tokens in `src/styles/global.css` — use the generated utilities (`bg-ground`, `bg-ink`, `text-paper`, `bg-teal-light`, `text-teal-dark`, etc.) rather than hardcoding hex anywhere new. Body-copy dimming is done with opacity on Paper (`text-paper/70`), and hairline borders with `border-paper/10`–`/15`.

Note the role shift on dark: **teal-dark (`#04342C`) is no longer usable as an eyebrow or link color** — it disappears against the ground. Teal-light took over those jobs, and teal-dark is now reserved for text sitting on a highlight-colored surface.

Why teal and not red or amber: red/coral reads as aligned with a party color and as alarm rather than information in a Philippine political-news context — a credibility cost for a "truthful facts" brand. Teal has no such baggage and still reads as a deliberate, singular signature.

### Type

- Headline: Space Grotesk, weight 500/700 — Tailwind utility `font-display`
- Body: Inter, weight 400/500 — Tailwind utility `font-body`
- Both loaded via Google Fonts in `src/layouts/Layout.astro`.

### Logo

- Primary lockup: "VANTAGE" set in Space Grotesk bold, tight tracking, with a short signal-teal bar underneath. Implemented in `src/components/Header.astro`, echoed smaller in `src/components/Footer.astro`.
- Profile/avatar mark: a single teal "V" on an ink square, in `public/favicon.svg`. Still a placeholder pending a real commissioned mark — it is intentionally simple, not final. Any replacement needs to work at favicon size, hold up on ink *and* on the near-black ground, and keep signal teal as the only color signal.

### The signature device — one highlight per post, no exceptions

Every post highlights exactly one fact: the number or phrase that makes the story worth reading. This is Vantage's own version of Vox's yellow-highlighter device — a single, disciplined signal used constantly, rather than decoration used occasionally. It only works if it stays rare. The moment more than one thing is highlighted in a post, it stops signaling anything.

This is enforced in code, not just convention:

- `src/components/FactPost.astro` takes a `headline` and a `highlight`, and throws a build error if `highlight` doesn't appear in `headline` exactly once.
- `src/pages/explained/[slug].astro` applies the same check to each explainer's `leadParagraph` / `highlight` pair.

Don't work around these by concatenating strings or disabling the check — if a headline needs two facts called out, it should be two posts. The check is deliberately duplicated rather than extracted into a shared helper, so FactPost's guarantee stays singly owned.

## Content architecture

Content lives in **Astro content collections**, not hand-written pages. Adding a story means adding a YAML file — never a new `.astro` file. Schemas are in `src/content.config.ts`.

- **`posts`** — `src/content/posts/*.yaml`, fields `category`, `headline`, `highlight`, `order`. Rendered as the feed. `order` exists because `getCollection()` ordering is not guaranteed.
- **`explainers`** — `src/content/explainers/*.yaml`, fields `title`, `description`, `category`, `leadParagraph`, `highlight`, `drivers[]` (`heading` + `body`), and an optional `image` for card hero art. The filename becomes the URL slug.

All current content is placeholder and must be replaced with real reporting before launch.

## Site structure

| Route | File | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | Feed of `FactPost` cards from the `posts` collection |
| `/explained` | `src/pages/explained/index.astro` | Card index of the `explainers` collection |
| `/explained/<slug>` | `src/pages/explained/[slug].astro` | Long-form explainer, generated per collection entry |
| `/about` | `src/pages/about.astro` | Masthead — placeholder names pending real copy |
| `/contact` | `src/pages/contact.astro` | Mailto channel block + corrections callout |
| `/robots.txt` | `src/pages/robots.txt.ts` | Derives the sitemap URL from `site` config |
| 404 | `src/pages/404.astro` | Branded not-found page |

Shared contact details and nav links live in `src/consts.ts` — change them there, not inline.

`src/layouts/Layout.astro` owns `<head>` (title, description, canonical, Open Graph, Twitter Card) and mounts the global footer. It accepts an optional `image` prop for per-page OG art. `Header.astro` is added per page.

## Deploy

Auto-deploys to Vercel from `main` — every push triggers a build. No adapter or `vercel.json` is needed; it's a plain static Astro build.

`site` in `astro.config.mjs` drives canonical URLs, OG tags, the sitemap, and robots.txt. It currently points at the Vercel URL and must be updated if a custom domain is added.

## What's left

1. **Real content** — masthead copy and names for `/about`, and real stories in both collections.
2. **Real logo mark** to replace the type-only placeholder favicon (see Logo constraints above).
3. **OG share image** (1200×630). The meta tags already support one via `Layout`'s `image` prop; there's no asset yet, so social shares currently render without art.
4. **Custom domain** — then update `site` in `astro.config.mjs`.
5. **Dedicated mailboxes** (editorial / tips / corrections) — currently everything routes to one address in `src/consts.ts`.
6. **Hero art** for explainer cards, via the optional `image` field.

## Stack

Astro 7 + Tailwind CSS v4 (`@tailwindcss/vite`, CSS-first config — there is no `tailwind.config.js`; tokens live in `src/styles/global.css`), plus `@astrojs/sitemap`. Deployed on Vercel.
