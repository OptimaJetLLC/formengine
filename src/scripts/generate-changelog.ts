#!/usr/bin/env node

import {readdirSync, readFileSync, writeFileSync} from 'node:fs'
import {basename, dirname, extname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

interface ReleaseDocMeta {
  version: string
  date?: string
  title?: string
  description?: string
  overview?: string
  keyFeatures?: string[]
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..', '..')
const DOCS_ROOT = join(REPO_ROOT, 'src', 'documentation', 'docs', 'release-notes')
const OUTPUT_CHANGELOG = join(REPO_ROOT, 'CHANGELOG.md')
const DOCS_ORIGIN = 'https://formengine.io'
const DOCS_PREFIX = '/documentation'

function normalizeDocumentationLinks(value: string): string {
  return value.replace(/\]\((\/[^)\s]+)\)/g, (_match, path: string) => {
    const normalizedPath = path.startsWith(DOCS_PREFIX) ? path : `${DOCS_PREFIX}${path}`
    return `](${DOCS_ORIGIN}${normalizedPath})`
  })
}

function parseFrontmatterAndBody(content: string): {frontmatter?: string; body: string} {
  if (!content.startsWith('---')) {
    return {body: content}
  }

  const endIndex = content.indexOf('\n---', 3)
  if (endIndex === -1) {
    return {body: content}
  }

  const frontmatter = content.slice(3, endIndex).trim()
  const body = content.slice(endIndex + 4).trimStart()
  return {frontmatter, body}
}

function extractDate(body: string): string | undefined {
  const match = body.match(/^_(.+?)_\s*$/m)
  if (!match) {
    return undefined
  }
  return match[1].trim()
}

function extractSection(body: string, heading: string): string | undefined {
  const pattern = new RegExp(`^## ${heading}\\s*([\\s\\S]*?)(^##\\s|\\Z)`, 'm')
  const match = body.match(pattern)
  if (!match) {
    return undefined
  }
  return match[1].trim()
}

function extractKeyFeatures(body: string): string[] | undefined {
  const section = extractSection(body, 'Key features')
  if (!section) {
    return undefined
  }

  const lines = section.split('\n')
  const features: string[] = []
  let currentFeature: string | undefined

  const pushCurrentFeature = (): void => {
    if (!currentFeature) {
      return
    }
    const normalized = currentFeature.trim()
    if (normalized) {
      features.push(normalized)
    }
    currentFeature = undefined
  }

  for (const line of lines) {
    const trimmedStart = line.trimStart()
    if (trimmedStart.startsWith('* ') || trimmedStart.startsWith('- ')) {
      pushCurrentFeature()
      currentFeature = trimmedStart.replace(/^[*-]\s+/, '').trim()
      continue
    }

    if (!currentFeature || trimmedStart === '' || trimmedStart.startsWith('## ')) {
      continue
    }

    currentFeature = `${currentFeature} ${trimmedStart}`.trim()
  }

  pushCurrentFeature()

  if (features.length === 0) {
    return undefined
  }

  return features
}

function readReleaseDoc(filePath: string): ReleaseDocMeta {
  const version = basename(filePath, extname(filePath))
  const raw = readFileSync(filePath, 'utf8')
  const {frontmatter, body} = parseFrontmatterAndBody(raw)

  let title: string | undefined
  let description: string | undefined
  if (frontmatter) {
    const titleMatch = frontmatter.match(/^title:\s*(.+)$/m)
    if (titleMatch) {
      title = titleMatch[1].trim()
    }
    const descriptionMatch = frontmatter.match(/^description:\s*(.+)$/m)
    if (descriptionMatch) {
      description = descriptionMatch[1].trim()
    }
  }

  const date = extractDate(body)
  const overview = extractSection(body, 'Overview')
  const keyFeatures = extractKeyFeatures(body)

  return {
    version,
    date,
    title,
    description,
    overview,
    keyFeatures,
  }
}

function sortVersionsDescending(versions: string[]): string[] {
  const parse = (v: string): number[] => v.split('.').map(part => Number.parseInt(part, 10) || 0)
  return [...versions].sort((a, b) => {
    const [a1, a2, a3] = parse(a)
    const [b1, b2, b3] = parse(b)
    if (a1 !== b1) {
      return b1 - a1
    }
    if (a2 !== b2) {
      return b2 - a2
    }
    return b3 - a3
  })
}

function buildChangelog(releases: ReleaseDocMeta[]): string {
  const headerLines: string[] = [
    '# Changelog',
    '',
    'All notable changes to FormEngine are documented here. For full, detailed release notes with screenshots and links, see the documentation:',
    '',
    '- Latest release notes: https://formengine.io/documentation/release-notes',
    '',
    '',
  ]

  const sections: string[] = []

  for (const release of releases) {
    const lines: string[] = []
    const heading = release.date ? `## ${release.version} - ${release.date}` : `## ${release.version}`

    lines.push(heading)

    if (release.description) {
      lines.push('')
      lines.push(normalizeDocumentationLinks(release.description))
    } else if (release.title) {
      lines.push('')
      lines.push(normalizeDocumentationLinks(release.title))
    }

    if (release.keyFeatures && release.keyFeatures.length > 0) {
      lines.push('')
      lines.push('### Highlights')
      lines.push('')
      for (const feature of release.keyFeatures) {
        lines.push(`- ${normalizeDocumentationLinks(feature)}`)
      }
    }

    lines.push('')
    lines.push(`[Full release notes for ${release.version}](https://formengine.io/documentation/release-notes/${release.version})`)
    lines.push('')

    sections.push(lines.join('\n'))
  }

  return `${headerLines.join('\n')}${sections.join('\n')}`.trimEnd() + '\n'
}

function main(): void {
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

  const versions = sortVersionsDescending(docFiles.map(name => basename(name, extname(name))))

  const releases = versions.map(version => {
    const filePath = join(DOCS_ROOT, `${version}.md`)
    return readReleaseDoc(filePath)
  })

  const content = buildChangelog(releases)
  writeFileSync(OUTPUT_CHANGELOG, content, {encoding: 'utf8'})

  console.log(`Generated CHANGELOG.md with ${releases.length} releases.`)
}

try {
  main()
} catch (error) {
  console.error('❌ generate-changelog script failed.', error)
  process.exitCode = 1
}
