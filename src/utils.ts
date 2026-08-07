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

export function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
