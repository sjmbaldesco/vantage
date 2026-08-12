// Category names are authored as display strings in the posts collection
// ("Accountability"), so URLs derive from them rather than being a separate
// authored field. Keep this the single source of truth for that mapping so
// /category/<slug> links and getStaticPaths can never drift apart.
// Newest first. `publishedAt` is optional by design — an explainer with no
// verified publication date renders no dateline rather than a fabricated one —
// so undated entries sort to the end and fall back to alphabetical order.
// Once every entry carries a date this is plain reverse-chronological.
export function sortExplainers<
  T extends { data: { publishedAt?: Date; title: string } }
>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    const at = a.data.publishedAt?.getTime();
    const bt = b.data.publishedAt?.getTime();
    if (at !== undefined && bt !== undefined) return bt - at;
    if (at !== undefined) return -1;
    if (bt !== undefined) return 1;
    return a.data.title.localeCompare(b.data.title);
  });
}

// Reading time, printed in the explainer dateline and on the Explained index.
//
// 220 words a minute is the middle of the range usually cited for adult reading
// of non-technical prose, and the result is rounded up and floored at one — a
// "0 min read" is worse than no estimate. Tables count their cells; they are
// read, not skipped.
const WORDS_PER_MINUTE = 220;

type ExplainerBody = {
  leadParagraph: string;
  drivers: {
    body: string;
    bullets?: string[];
    coda?: string;
    table?: { columns: string[]; rows: { label?: string; cells: string[] }[] };
  }[];
};

export function readingMinutes(data: ExplainerBody): number {
  const chunks: string[] = [data.leadParagraph];

  for (const driver of data.drivers) {
    chunks.push(driver.body);
    if (driver.bullets) chunks.push(...driver.bullets);
    if (driver.coda) chunks.push(driver.coda);
    if (driver.table) {
      chunks.push(...driver.table.columns);
      for (const row of driver.table.rows) {
        if (row.label) chunks.push(row.label);
        chunks.push(...row.cells);
      }
    }
  }

  const words = chunks.join(' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

// Category counts for the Explained filter rail, newest-category-first is not a
// thing so this is alphabetical. Derived from the entries themselves rather
// than a maintained list, same as the /category route generation.
export function categoryCounts<T extends { data: { category: string } }>(
  entries: T[]
): { category: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    counts.set(entry.data.category, (counts.get(entry.data.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => a.category.localeCompare(b.category));
}

export function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
