/** Release archive contract (published to GitHub Releases; consumed by formengine-tools). */

export const REQUIRED_ARCHIVE_FILES = [
  'demo.tgz',
  'formbuilder.tgz',
  'formengine-src.tgz',
  'gh-release-notes.tgz',
  'documentation.tgz',
  'lerna.json',
] as const

/** Workspace paths packed into react-form-builder-*.tgz archives. */
export const NPM_PACKAGE_PATHS = [
  'packages/core',
  'packages/designer',
  'packages/designer-bundle',
  'packages/indexed-db-form-storage',
  'packages/json-schema-generator',
  'packages/viewer-bundle',
  'packages/viewer-bundle-premium',
  'packages/views/fast-qr',
  'packages/views/google-map',
  'packages/views/mantine',
  'packages/views/material-ui',
  'packages/views/rsuite',
  'packages/views/rsuite-table',
  'packages/views/rich-text',
  'packages/views/signature',
  'packages/views/uploader',
] as const

/** Filename prefix for packed npm archives (react-form-builder-*.tgz). */
export const NPM_ARCHIVE_FILENAME_PREFIX = 'react-form-builder-' as const

/** Package and app paths included in formenginesupport.tgz (keep aligned with formengine-tools compose constants). */
export const FORMENGINE_SUPPORT_PACKAGE_PATHS = [
  'packages/apps/common',
  'packages/apps/common-designer',
  'packages/apps/example-builder',
  'packages/apps/example-viewer',
  'packages/core',
  'packages/designer',
  'packages/designer-bundle',
  'packages/indexed-db-form-storage',
  'packages/json-schema-generator',
  'packages/viewer-bundle',
  'packages/viewer-bundle-premium',
  'packages/views/antd',
  'packages/views/rsuite',
  'packages/views/mantine',
  'packages/views/material-ui',
  'packages/views/rsuite-table',
  'packages/views/signature',
  'packages/views/fast-qr',
  'packages/views/rich-text',
  'packages/views/google-map',
  'packages/views/uploader',
  'scripts/cli-lib',
] as const

/**
 * Path name segments omitted from formengine-src.tgz (aligned with .gitignore and formengine-tools compose).
 * Passed to tar as repeated --exclude flags when archiving the whole repo source tree.
 */
export const FORMENGINE_SRC_TAR_EXCLUDES = [
  'node_modules',
  '.angular',
  '.astro',
  '.bundle-stats',
  'dist',
  'build',
  'coverage',
  '.swc',
  '.next',
  '.docusaurus',
  'reports',
  'playwright-report',
  '.examples-local-packs',
  '.tmp',
  '.archives',
] as const
