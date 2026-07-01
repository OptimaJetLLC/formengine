import {readdirSync, statSync} from 'node:fs'
import {join, resolve} from 'node:path'

import {REQUIRED_ARCHIVE_FILES} from './constants.ts'
import {parseArchivesDir} from './env.ts'
import {listNpmArchiveFilenames} from './npm-archives.ts'

export function validateArchivesDir(archivesDir: string): void {
  let hasFile = false
  for (const entry of readdirSync(archivesDir)) {
    if (statSync(join(archivesDir, entry)).isFile()) {
      hasFile = true
      break
    }
  }
  if (!hasFile) {
    throw new Error(`${archivesDir} is empty`)
  }

  for (const name of REQUIRED_ARCHIVE_FILES) {
    const path = join(archivesDir, name)
    try {
      statSync(path)
    } catch {
      throw new Error(`Missing ${path}`)
    }
  }

  const npmArchives = listNpmArchiveFilenames(archivesDir)
  if (npmArchives.length === 0) {
    throw new Error(`No react-form-builder-*.tgz in ${archivesDir}`)
  }
}

function main(): void {
  const archivesDir = resolve(parseArchivesDir(process.argv.slice(2)))
  validateArchivesDir(archivesDir)
  console.log(`Archives OK: ${archivesDir}`)
}

if (process.argv[1]?.endsWith('validate-archives.ts')) {
  try {
    main()
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  }
}
