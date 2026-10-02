#!/usr/bin/env node

import {mkdirSync, readdirSync, readFileSync, writeFileSync} from 'node:fs'
import {basename, dirname, extname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..')
const DOCS_ROOT = join(REPO_ROOT, 'documentation', 'docs', 'release-notes')
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

const DOCS_ORIGIN = 'https://formengine.io/documentation'
const GUIDE_ORIGIN = 'https://learn.formengine.io'

/**
 * Rewrites docs-site links to absolute URLs for GitHub release notes.
 * `/...` becomes a developer-docs URL. `designer-guide:...` becomes a Form Author Guide URL.
 * @param markdown release note body
 * @returns markdown with absolute http(s) links
 */
function toAbsoluteLinks(markdown: string): string {
  const withGuideLinks = markdown.replace(/\]\(designer-guide:([^)\s]*)\)/g, (_match, guidePath: string) => {
    const hashIndex = guidePath.indexOf('#')
    const pathPart = hashIndex === -1 ? guidePath : guidePath.slice(0, hashIndex)
    const hash = hashIndex === -1 ? '' : guidePath.slice(hashIndex)
    const clean = pathPart.replace(/^\/+|\/+$/g, '')
    const url = clean ? `${GUIDE_ORIGIN}/${clean}/${hash}` : `${GUIDE_ORIGIN}/${hash}`
    return `](${url})`
  })
  return withGuideLinks.replace(/\]\((\/[^\s)]+)\)/g, (_match, path: string) => `](${DOCS_ORIGIN}${path})`)
}

/**
 * Collapses soft line wraps so GitHub release notes match documentation rendering.
 * GitHub Flavored Markdown treats single newlines as hard breaks; CommonMark/Docusaurus
 * collapses them inside paragraphs. List continuations (indented lines) are joined to
 * the previous list item line.
 * @param markdown source body after frontmatter removal
 * @returns markdown with paragraph and list wraps merged onto single lines
 */
function collapseSoftLineBreaksForGitHub(markdown: string): string {
  const lines = markdown.split('\n')
  const out: string[] = []
  let inFence = false

  const isStructuralLine = (line: string): boolean => {
    const t = line.trimStart()
    if (t.startsWith('#')) {
      return true
    }
    if (/^[-*+]\s/.test(t)) {
      return true
    }
    if (/^\d+\.\s/.test(t)) {
      return true
    }
    if (t.startsWith('>')) {
      return true
    }
    if (t.startsWith('|')) {
      return true
    }
    if (t === '---') {
      return true
    }
    return false
  }

  for (const line of lines) {
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence
      out.push(line)
      continue
    }
    if (inFence) {
      out.push(line)
      continue
    }

    if (line.trim() === '') {
      out.push('')
      continue
    }

    const prev = out.length > 0 ? out[out.length - 1] : ''
    if (prev === '') {
      out.push(line)
      continue
    }

    const trimmedIndented = line.trimStart()
    const isIndentedNestedListItem = /^ {2,}\S/.test(line) && (/^[-*+]\s/.test(trimmedIndented) || /^\d+\.\s/.test(trimmedIndented))
    if (/^ {2,}\S/.test(line) && !isIndentedNestedListItem) {
      out[out.length - 1] = `${prev.trimEnd()} ${line.trim()}`
      continue
    }

    if (isStructuralLine(line)) {
      out.push(line)
      continue
    }

    if (isStructuralLine(prev)) {
      out.push(line)
      continue
    }

    out[out.length - 1] = `${prev.trimEnd()} ${line.trimStart()}`
  }

  return out.join('\n')
}

function generateNotesForVersion(version: string): void {
  const docPath = join(DOCS_ROOT, `${version}.md`)
  const raw = readFileSync(docPath, 'utf8')
  const {body} = parseFrontmatterAndBody(raw)

  const transformed = collapseSoftLineBreaksForGitHub(toAbsoluteLinks(body))
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

try {
  main()
} catch (error) {
  console.error('❌ generate-github-release-notes script failed.', error)
  process.exitCode = 1
}
