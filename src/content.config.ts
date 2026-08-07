import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/posts' }),
  schema: z.object({
    category: z.string(),
    headline: z.string(),
    highlight: z.string(),
    order: z.number(),
  }),
});

// A single section of an explainer. On the carousels this is one panel, and
// the shape here follows what the panels actually carry rather than what is
// convenient to render: some panels are prose, some end in a bullet list,
// two are comparison tables, and most carry their own attribution bar.
const driver = z.object({
  heading: z.string(),
  // Blank-line-separated paragraphs. The template splits on \n\n and renders
  // one <p> each — a single string collapses whitespace in HTML, so multi-part
  // panels would otherwise run together into one block.
  body: z.string(),
  // Rendered after the body, for panels that end in a list.
  bullets: z.array(z.string()).optional(),
  // A closing line that sits *after* the bullets or table rather than before
  // them. Several panels build to a final beat — "And who approves the
  // spending? The agency head." — which would land in the wrong place if it
  // were folded into `body`.
  coda: z.string().optional(),
  // Comparison tables. `label` is the stub column on the left; leave it unset
  // for tables that are just two columns of text.
  table: z
    .object({
      columns: z.array(z.string()),
      rows: z.array(
        z.object({
          label: z.string().optional(),
          cells: z.array(z.string()),
        })
      ),
    })
    .optional(),
  // The attribution bar printed at the foot of the panel. Kept per-section
  // rather than folded into `sources` so a reader can see which claim rests
  // on which document without scrolling to the end.
  sourceNote: z.string().optional(),
});

const explainers = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/explainers' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().default('Explained'),
    // The cover-panel standfirst, e.g. "What the Philippines is actually
    // signing". Optional because not every explainer runs as a carousel first.
    subtitle: z.string().optional(),
    leadParagraph: z.string(),
    // Optional hero art for the Explained index card. Cards render text-only
    // until a real licensed image is supplied.
    image: z.string().optional(),
    // Deliberately optional, and deliberately NOT defaulted to the build date.
    // An explainer with no verified publication date renders no dateline at
    // all — inventing one on a publication that sells factual accuracy is a
    // worse failure than omitting it.
    publishedAt: z.coerce.date().optional(),
    author: z.string().optional(),
    // Set when the piece is a correction-bearing update, so the page can say
    // what the reader is looking at is current as of a known point.
    currentAsOf: z.string().optional(),
    drivers: z.array(driver),
    // The closing source panel, one entry per line, in the flat house format:
    // OUTLET, "HEADLINE," DATE — DOMAIN. Defaults empty so older entries keep
    // validating, but an explainer shipping with an empty list is a red flag.
    sources: z.array(z.string()).default([]),
  }),
});

export const collections = { posts, explainers };
