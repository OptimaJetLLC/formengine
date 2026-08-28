#!/usr/bin/env node
/**
 * Checks markdown/MDX image references on both documentation sites against files on disk.
 * Form Author Guide `/assets/guide/*.png` refs require matching `.light.png` and `.dark.png` sources.
 *
 * Usage: node documentation/website/scripts/check-broken-images.ts
 */
import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs'
import {basename, dirname, extname, join, relative, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {applyViteStyleEnv} from './load-env-files.ts'

interface ImageRef {
  line: number
  src: string
}

interface BrokenImage {
  file: string
  line: number
  src: string
  missing: string[]
  resolved: string
  suggestion?: string
}

interface SiteConfig {
  contentDir: string
  filePrefix: string
  publicRoot: string
  siteBase: string
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '../../..')
const WEBSITE_ROOT = join(REPO_ROOT, 'documentation/website')
const DOCS_CONTENT = join(REPO_ROOT, 'documentation/docs')
const DOCS_STATIC = join(WEBSITE_ROOT, 'static')
const GUIDE_ROOT = join(REPO_ROOT, 'designer-guide')
const GUIDE_CONTENT = join(GUIDE_ROOT, 'content')
const GUIDE_PUBLIC = join(GUIDE_ROOT, 'public')

const PRODUCTION_GUIDE_BASE = 'https://learn.formengine.io/'
const PRODUCTION_DOCS_BASE = 'https://formengine.io/documentation/'
const IMAGE_EXT = /\.(png|jpe?g|gif|svg|webp|avif|ico)$/i
const MARKDOWN_IMAGE_RE = /!\[[^\]]*]\(([^)]+)\)/g
const HTML_IMAGE_RE = /<img\b[^>]*\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi

const normalizeBase = (base: string): string => {
  return base.endsWith('/') ? base : `${base}/`
}

const walkFiles = (dir: string, base: string): string[] => {
  const results: string[] = []
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.')) {
      continue
    }
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      if (entry.startsWith('_')) {
        continue
      }
      results.push(...walkFiles(full, base))
    } else if (!entry.startsWith('_') && /\.(md|mdx)$/i.test(entry)) {
      results.push(relative(base, full))
    }
  }
  return results
}

const stripMarkdownDest = (raw: string): string => {
  const trimmed = raw.trim().replace(/^<|>$/g, '')
  const unquoted = trimmed.match(/^(".*"|'.*')/)
  if (unquoted) {
    return unquoted[1].slice(1, -1)
  }
  const titleIndex = trimmed.search(/\s+"|\s+'/)
  return (titleIndex === -1 ? trimmed : trimmed.slice(0, titleIndex)).trim()
}

const isSkippableSrc = (src: string): boolean => {
  return (
    src.length === 0 ||
    src.startsWith('#') ||
    src.startsWith('data:') ||
    src.startsWith('blob:') ||
    /^https?:\/\//i.test(src) ||
    src.startsWith('docs:') ||
    src.startsWith('designer-guide:')
  )
}

const collectImageRefs = (filePath: string): ImageRef[] => {
  const lines = readFileSync(filePath, 'utf8').split('\n')
  const found: ImageRef[] = []
  let inCodeBlock = false

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    if (/^```/.test(line.trim())) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) {
      continue
    }

    MARKDOWN_IMAGE_RE.lastIndex = 0
    let markdownMatch = MARKDOWN_IMAGE_RE.exec(line)
    while (markdownMatch) {
      found.push({line: i + 1, src: stripMarkdownDest(markdownMatch[1])})
      markdownMatch = MARKDOWN_IMAGE_RE.exec(line)
    }

    HTML_IMAGE_RE.lastIndex = 0
    let htmlMatch = HTML_IMAGE_RE.exec(line)
    while (htmlMatch) {
      const src = htmlMatch[1] ?? htmlMatch[2] ?? htmlMatch[3] ?? ''
      found.push({line: i + 1, src})
      htmlMatch = HTML_IMAGE_RE.exec(line)
    }
  }

  return found
}

const isThemedGuidePng = (src: string): boolean => {
  return (
    src.includes('/assets/guide/') &&
    src.endsWith('.png') &&
    !src.endsWith('.light.png') &&
    !src.endsWith('.dark.png')
  )
}

const requiredDiskPaths = (src: string, contentFile: string, publicRoot: string): string[] => {
  if (src.startsWith('/')) {
    const relativePath = src.slice(1)
    if (isThemedGuidePng(src)) {
      return [
        join(publicRoot, relativePath.replace(/\.png$/, '.light.png')),
        join(publicRoot, relativePath.replace(/\.png$/, '.dark.png')),
      ]
    }
    return [join(publicRoot, relativePath)]
  }

  return [resolve(dirname(contentFile), src.split('?')[0].split('#')[0])]
}

const publicUrlForMissing = (src: string, siteBase: string): string => {
  if (src.startsWith('/')) {
    return `${siteBase}${src.slice(1)}`
  }
  return src
}

const tokensOf = (name: string): string[] => {
  return basename(name, extname(name))
    .replace(/\.(light|dark)$/i, '')
    .split(/[-_.]/)
    .filter(Boolean)
}

const suggestFromDir = (missingPath: string): string | undefined => {
  const dir = dirname(missingPath)
  if (!existsSync(dir)) {
    return undefined
  }

  const wanted = basename(missingPath)
  const wantedStem = wanted.replace(/\.(light|dark)\.png$/i, '').replace(/\.png$/i, '')
  const wantedTokens = new Set(tokensOf(wanted))
  let best: string | undefined
  let bestScore = 0

  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    if (!entry.isFile() || !/\.(png|jpe?g|gif|svg)$/i.test(entry.name)) {
      continue
    }
    if (/\.(preview|full)\.webp$/i.test(entry.name)) {
      continue
    }
    const stem = entry.name.replace(/\.(light|dark)\.png$/i, '').replace(/\.png$/i, '')
    let score = tokensOf(entry.name).filter((token) => wantedTokens.has(token)).length * 10
    if (stem === wantedStem) {
      score += 80
    } else if (stem.includes(wantedStem) || wantedStem.includes(stem)) {
      score += 40
    }
    if (score > bestScore) {
      bestScore = score
      best = entry.name
    }
  }

  return bestScore >= 30 ? best : undefined
}

const checkSite = (site: SiteConfig): BrokenImage[] => {
  const broken: BrokenImage[] = []

  for (const rel of walkFiles(site.contentDir, site.contentDir)) {
    const full = join(site.contentDir, rel)
    const posixRel = rel.replaceAll('\\', '/')
    for (const ref of collectImageRefs(full)) {
      if (isSkippableSrc(ref.src)) {
        continue
      }
      if (!IMAGE_EXT.test(ref.src.split('?')[0]) && !ref.src.startsWith('/') && !ref.src.startsWith('.')) {
        continue
      }

      const required = requiredDiskPaths(ref.src, full, site.publicRoot)
      const missing = required.filter((diskPath) => !existsSync(diskPath))
      if (missing.length === 0) {
        continue
      }

      const suggestionName = suggestFromDir(missing[0])
      broken.push({
        file: `${site.filePrefix}${posixRel}`,
        line: ref.line,
        src: ref.src,
        missing: missing.map((diskPath) => relative(REPO_ROOT, diskPath).replaceAll('\\', '/')),
        resolved: publicUrlForMissing(ref.src, site.siteBase),
        suggestion: suggestionName
          ? `${dirname(ref.src).replace(/\\/g, '/')}/${suggestionName.replace(/\.(light|dark)\.png$/i, '.png')}`
          : undefined,
      })
    }
  }

  return broken
}

const main = (): void => {
  const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
  const websiteEnv = applyViteStyleEnv(WEBSITE_ROOT, mode)
  const guideEnv = applyViteStyleEnv(GUIDE_ROOT, mode)
  const guideBase = normalizeBase(
    websiteEnv.values.DESIGNER_GUIDE_URL?.trim() ||
      process.env.DESIGNER_GUIDE_URL?.trim() ||
      PRODUCTION_GUIDE_BASE,
  )
  const docsBase = normalizeBase(
    guideEnv.values.MAIN_DOCS_URL?.trim() || process.env.MAIN_DOCS_URL?.trim() || PRODUCTION_DOCS_BASE,
  )

  console.log(`Mode: ${mode}`)
  console.log(`documentation/website env files: ${websiteEnv.loaded.join(', ') || '(none)'}`)
  console.log(`  MAIN_DOCS_URL=${docsBase}`)
  console.log(`designer-guide env files: ${guideEnv.loaded.join(', ') || '(none)'}`)
  console.log(`  DESIGNER_GUIDE_URL=${guideBase}`)
  console.log()

  const broken = [
    ...checkSite({
      contentDir: GUIDE_CONTENT,
      filePrefix: 'designer-guide/content/',
      publicRoot: GUIDE_PUBLIC,
      siteBase: guideBase,
    }),
    ...checkSite({
      contentDir: DOCS_CONTENT,
      filePrefix: 'documentation/docs/',
      publicRoot: DOCS_STATIC,
      siteBase: docsBase,
    }),
  ]

  if (broken.length === 0) {
    console.log('All documentation image references resolve to files on disk.')
    process.exit(0)
  }

  for (const item of broken) {
    console.log(item.file)
    console.log(`  ${item.line}: ${item.src}`)
    console.log(`  page: ${item.resolved}`)
    for (const missing of item.missing) {
      console.log(`  missing: ${missing}`)
    }
    if (item.suggestion) {
      console.log(`  did you mean: ${item.suggestion}`)
    }
    console.log()
  }

  console.log(`${broken.length} broken image reference(s).`)
  process.exit(1)
}

try {
  main()
} catch (error) {
  console.error('check-broken-images failed.', error)
  process.exitCode = 1
}
