/** Helpers for react-form-builder-*.tgz archives in `.archives/`. */

import {readdirSync} from 'node:fs'

import {NPM_ARCHIVE_FILENAME_PREFIX} from './constants.ts'

export function listNpmArchiveFilenames(archivesDir: string, version?: string): string[] {
  const suffix = version ? `${version}.tgz` : '.tgz'
  return readdirSync(archivesDir)
    .filter(name => name.startsWith(NPM_ARCHIVE_FILENAME_PREFIX) && name.endsWith(suffix))
    .sort()
}
