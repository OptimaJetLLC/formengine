#!/usr/bin/env node

import {execFileSync} from 'node:child_process'
import {copyFileSync, mkdirSync, readdirSync} from 'node:fs'
import {join} from 'node:path'

import {NPM_PACKAGE_PATHS} from './constants.ts'

function main(): void {
  const fromPack = process.argv.includes('--from-pack')
  const archivesDir = '.archives'
  mkdirSync(archivesDir, {recursive: true})

  for (const packagePath of NPM_PACKAGE_PATHS) {
    if (fromPack) {
      const dir = join(process.cwd(), packagePath)
      for (const file of readdirSync(dir)) {
        if (file.endsWith('.tgz')) {
          copyFileSync(join(dir, file), join(archivesDir, file))
        }
      }
      continue
    }

    execFileSync('npm', ['run', 'pack'], {cwd: packagePath, stdio: 'inherit'})
    const archiveName = JSON.parse(execFileSync('npm', ['pack', '--json'], {cwd: packagePath, encoding: 'utf8'}))[0].filename as string
    copyFileSync(join(packagePath, archiveName), join(archivesDir, archiveName))
  }
}

try {
  main()
} catch (error) {
  console.error(error)
  process.exitCode = 1
}
