/**
 * Normalizes a pathname relative to the designer guide base URL.
 * @param pathname browser pathname
 * @param basePath Astro `import.meta.env.BASE_URL`
 * @returns path relative to the guide base, or `/` for the home page
 */
export function normalizeGuidePath(pathname: string, basePath: string): string {
  const normalizedBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  let path = pathname;

  if (normalizedBase && path.startsWith(normalizedBase)) {
    path = path.slice(normalizedBase.length) || '/';
  }

  path = path.replace(/\/$/, '');
  return path === '' ? '/' : path;
}

/**
 * @param basePath Astro base URL
 * @returns base URL with a trailing slash
 */
export function getGuideBasePath(basePath: string): string {
  return basePath.endsWith('/') ? basePath : `${basePath}/`;
}

/**
 * Builds a guide page href on the client.
 * @param slug content slug or `index`
 * @param basePath Astro base URL
 * @returns absolute path within the guide site
 */
export function buildGuidePageUrl(slug: string, basePath: string): string {
  const base = getGuideBasePath(basePath);
  if (slug === 'index') {
    return base;
  }
  return `${base}${slug}/`;
}
