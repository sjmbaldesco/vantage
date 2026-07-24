// Category names are authored as display strings in the posts collection
// ("Accountability"), so URLs derive from them rather than being a separate
// authored field. Keep this the single source of truth for that mapping so
// /category/<slug> links and getStaticPaths can never drift apart.
export function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
