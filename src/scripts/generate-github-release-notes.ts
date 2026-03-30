#!/usr/bin/env node

/* eslint-disable import/no-nodejs-modules,no-console */

import {mkdirSync, readFileSync, readdirSync, writeFileSync} from 'fs'
import {basename, extname, join, dirname} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..', '..')
const DOCS_ROOT = join(REPO_ROOT, 'src', 'documentation', 'docs', 'release-notes')
const OUTPUT_DIR = join(REPO_ROOT, 'scripts', 'github-release-notes')

function parseFrontmatterAndBody(content: string): {body: string} {
  if (!content.startsWith('---')) {
    return {body: content}
  }

  const endIndex = content.indexOf('\n---', 3)
  if (endIndex === -1) {
    return {body: content}
  }

  const body = content.slice(endIndex + 4).trimStart()
  return {body}
}

function toAbsoluteLinks(markdown: string): string {
  return markdown.replace(
    /\]\((\/[^\s)]+)\)/g,
    (_match, path: string) => `](${`https://formengine.io/documentation${path}`})`,
  )
}

function generateNotesForVersion(version: string): void {
  const docPath = join(DOCS_ROOT, `${version}.md`)
  const raw = readFileSync(docPath, 'utf8')
  const {body} = parseFrontmatterAndBody(raw)

  const transformed = toAbsoluteLinks(body)
  const outputPath = join(OUTPUT_DIR, `notes-${version}.md`)
  writeFileSync(outputPath, transformed, {encoding: 'utf8'})
}

function main(): void {
  mkdirSync(OUTPUT_DIR, {recursive: true})

  const entries = readdirSync(DOCS_ROOT, {withFileTypes: true})
  const docFiles = entries
    .filter(entry => entry.isFile())
    .map(entry => entry.name)
    .filter(name => name.endsWith('.md') || name.endsWith('.mdx'))
    .filter(name => name !== 'index.mdx')

  if (docFiles.length === 0) {
    console.error(`No release note documents found in ${DOCS_ROOT}`)
    process.exitCode = 1
    return
  }

  for (const name of docFiles) {
    const version = basename(name, extname(name))
    generateNotesForVersion(version)
  }

  console.log(`Generated GitHub release notes for ${docFiles.length} versions in ${OUTPUT_DIR}.`)
}

main()

