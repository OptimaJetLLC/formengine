/**
 * Algolia DocSearch credentials for documentation sites.
 *
 * Override at build time with:
 *   DOCSEARCH_APP_ID
 *   DOCSEARCH_API_KEY      search-only key
 *   DOCSEARCH_INDEX_NAME
 *
 * Optional path filter (when sharing an index with another site):
 *   DOCSEARCH_PATH_PREFIX  e.g. `/` - keeps hits under that pathname
 */

/**
 */

/**
 * @param fallback values from site-specific docsearch.config.json
 * @returns
 */
export function getDocSearchConfig(fallback) {
  return {
    appId: process.env.DOCSEARCH_APP_ID?.trim() || fallback.appId,
    apiKey: process.env.DOCSEARCH_API_KEY?.trim() || fallback.apiKey,
    indexName: process.env.DOCSEARCH_INDEX_NAME?.trim() || fallback.indexName,
  };
}

/**
 * @param config
 * @returns
 */
export function isDocSearchConfigured(config) {
  return Boolean(config.appId && config.apiKey && config.indexName);
}
