#!/usr/bin/env node

import {readdirSync, readFileSync, statSync} from 'node:fs'
import {join} from 'node:path'

const wrongImportRegex = /import.*from\s*['"]@.*\/src\/.*['"]/g

function needAnalyzeFile(file: string): boolean {
  return file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')
}

function readFiles(dir: string, errors: string[]): void {
  const fileList = readdirSync(dir)
  for (const file of fileList) {
    const name = join(dir, file)
    if (statSync(name).isDirectory()) {
      readFiles(name, errors)
    } else {
      const content = readFileSync(name, 'utf8')
      if (needAnalyzeFile(name) && wrongImportRegex.test(content)) {
        errors.push(name)
      }
    }
  }
}

function main(): void {
  const errors: string[] = []
  readFiles('./packages', errors)

  if (errors.length === 0) {
    process.exit(0)
  }

  console.error('Wrong imports found:')
  for (const error of errors) {
    console.error(error)
  }

  process.exit(1)
}

main()

