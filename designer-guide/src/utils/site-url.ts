/**
 * Joins a path to the configured Astro base URL.
 * @param path path relative to site root, e.g. `meet-the-designer/what-is-formengine-designer/` or `img/logo.svg`
 * @returns siteUrl string.
 */
export function siteUrl(path = '') {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  if (!path) {
    return normalizedBase;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${normalizedBase}${cleanPath}`;
}

/**
 * Maps a content collection id to the public navigation slug.
 * Section landing pages live at `section/index.md` and are served as `/section/`.
 * @param entryId content id such as `meet-the-designer/index` or `meet-the-designer/what-is-formengine-designer`
 * @returns slug used in URLs and sidebar navigation
 */
export function navSlugFromEntryId(entryId: string): string {
  if (entryId.endsWith('/index')) {
    return entryId.slice(0, -'/index'.length);
  }
  return entryId;
}

/**
 * Returns whether the content entry is a section landing page.
 * Astro's glob loader uses the folder name as the id for `section/index.md` (for example `first-form`).
 * @param entryId content collection id
 * @returns `true` when the entry is a section landing page
 */
export function isSectionIndexEntry(entryId: string): boolean {
  if (entryId === 'index') {
    return false;
  }

  return !entryId.includes('/') || entryId.endsWith('/index');
}

/**
 * Builds a documentation page href from a content slug.
 * @param slug content id such as `meet-the-designer/what-is-formengine-designer` or `index`
 * @returns siteUrl string.
 */
export function docPageUrl(slug: string) {
  if (slug === 'index') {
    return siteUrl();
  }

  return siteUrl(`${slug}/`);
}
