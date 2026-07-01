/** Release archive contract (published to GitHub Releases; consumed by formengine-tools). */

export const REQUIRED_ARCHIVE_FILES = [
  'demo.tgz',
  'formbuilder.tgz',
  'formengine.tgz',
  'formenginesupport.tgz',
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
