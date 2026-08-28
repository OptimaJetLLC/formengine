import fallback from '../../docsearch.config.json' with { type: 'json' };
import { getDocSearchConfig, isDocSearchConfigured } from '../lib/docsearch-base.mjs';

export const docsearchConfig = getDocSearchConfig(fallback);

export const docsearchEnabled = isDocSearchConfigured(docsearchConfig);

/** Set when `DOCSEARCH_PATH_PREFIX` is configured at build time. */
export const docsearchPathPrefix = process.env.DOCSEARCH_PATH_PREFIX?.trim() || '';
