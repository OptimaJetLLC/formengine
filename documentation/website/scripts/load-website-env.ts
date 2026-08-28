/**
 * Side-effect import for `docusaurus.config.ts`: load `.env*` before other website modules
 * read `DESIGNER_GUIDE_URL`.
 */
import {fileURLToPath} from 'node:url'

import {applyViteStyleEnv} from './load-env-files.ts'

const websiteRoot = fileURLToPath(new URL('..', import.meta.url))
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

applyViteStyleEnv(websiteRoot, mode)
