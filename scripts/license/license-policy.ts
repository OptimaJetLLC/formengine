import {relative} from 'node:path'

import {PACKAGE_LICENSE_EULA} from './eula-config.ts'
import {renderEulaLicense} from './render-eula-license.ts'
import {renderMitLicense} from './render-mit-license.ts'

/** SPDX identifier for MIT-licensed packages. */
export const PACKAGE_LICENSE_SPDX_MIT = 'MIT' as const

/** package.json license field for EULA-covered packages. */
export const PACKAGE_LICENSE_SPDX_EULA = PACKAGE_LICENSE_EULA

export type PackageLicenseType = typeof PACKAGE_LICENSE_SPDX_MIT | typeof PACKAGE_LICENSE_SPDX_EULA

/**
 * Repository-relative paths under the MIT License.
 * Includes FormEngine Core (see EULA.md: Core is not governed by the EULA).
 * All other packages use the FormEngine EULA.
 */
export const MIT_PACKAGE_RELATIVE_DIRS = [
  'packages/core',
  'packages/apps/common',
  'packages/apps/example-viewer',
  'packages/json-schema-generator',
  'packages/viewer-bundle',
  'packages/views/mantine',
  'packages/views/material-ui',
  'packages/views/print',
  'packages/views/rsuite',
  'packages/views/sortable-list',
  'packages/views/uploader',
] as const

/** Repository-relative path prefix; every package under it uses MIT. */
export const MIT_PACKAGE_RELATIVE_DIR_PREFIXES = ['examples/community/'] as const

const MIT_PACKAGE_RELATIVE_DIR_SET = new Set<string>(MIT_PACKAGE_RELATIVE_DIRS)

function isMitLicensedPath(relativeDir: string): boolean {
  if (MIT_PACKAGE_RELATIVE_DIR_SET.has(relativeDir)) {
    return true
  }

  return MIT_PACKAGE_RELATIVE_DIR_PREFIXES.some(prefix => relativeDir.startsWith(prefix))
}

/**
 * Returns the license type for a package directory.
 * @param repoRoot absolute monorepo root
 * @param packageDir absolute package directory
 */
export function getPackageLicenseType(repoRoot: string, packageDir: string): PackageLicenseType {
  const relativeDir = relative(repoRoot, packageDir).replaceAll('\\', '/')
  return isMitLicensedPath(relativeDir) ? PACKAGE_LICENSE_SPDX_MIT : PACKAGE_LICENSE_SPDX_EULA
}

/**
 * Renders the expected LICENSE file content for a package.
 * @param licenseType MIT or FormEngine EULA
 * @param _licensedWork unused (kept for call-site compatibility)
 */
export function renderLicenseFileContent(licenseType: PackageLicenseType, _licensedWork: string): string {
  if (licenseType === PACKAGE_LICENSE_SPDX_MIT) {
    return renderMitLicense()
  }

  return renderEulaLicense()
}
