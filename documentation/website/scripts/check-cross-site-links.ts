#!/usr/bin/env node
/**
 * Checks `designer-guide:` and `docs:` cross-links between developer docs and the Form Author Guide.
 * Resolves bases from each site's `.env*` files (same Vite-style order as local dev).
 *
 * Usage: node documentation/website/scripts/check-cross-site-links.ts
 */
import {readdirSync, readFileSync, statSync} from 'node:fs'
import {basename, dirname, extname, join, relative, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {applyViteStyleEnv} from './load-env-files.ts'

interface PrefixedLink {
  href: string
  line: number
  path: string
}

interface BrokenLink {
  file: string
  href: string
  line: number
  resolved: string
  suggestion?: string
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '../../..')
const WEBSITE_ROOT = join(REPO_ROOT, 'documentation/website')
const DOCS_CONTENT = join(REPO_ROOT, 'documentation/docs')
const GUIDE_ROOT = join(REPO_ROOT, 'designer-guide')
const GUIDE_CONTENT = join(GUIDE_ROOT, 'content')

const GUIDE_PREFIX = 'designer-guide:'
const DOCS_PREFIX = 'docs:'
const PRODUCTION_GUIDE_BASE = 'https://learn.formengine.io/'
const PRODUCTION_DOCS_BASE = 'https://formengine.io/documentation/'

const normalizeBase = (base: string): string => {
  return base.endsWith('/') ? base : `${base}/`
}

const stripHashAndSlash = (href: string): string => {
  const withoutHash = href.split('#')[0].split('?')[0]
  return withoutHash.replace(/^\//, '').replace(/\/$/, '')
}

const walkFiles = (
  dir: string,
  base: string,
  fileFilter?: (name: string) => boolean,
): string[] => {
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
      results.push(...walkFiles(full, base, fileFilter))
    } else if (!entry.startsWith('_') && (fileFilter ? fileFilter(entry) : /\.(md|mdx)$/i.test(entry))) {
      results.push(relative(base, full))
    }
  }
  return results
}

const readFrontmatterSlug = (content: string): string | undefined => {
  if (!content.startsWith('---')) {
    return undefined
  }
  const end = content.indexOf('\n---', 3)
  if (end === -1) {
    return undefined
  }
  const match = /^slug:\s*['"]?([^'"\n]+?)['"]?\s*$/m.exec(content.slice(0, end))
  return match?.[1]?.trim()
}

const collectGuideSlugs = (contentDir: string): Set<string> => {
  const slugs = new Set(['', 'index'])
  for (const rel of walkFiles(contentDir, contentDir)) {
    const slug = rel.slice(0, -extname(rel).length).replaceAll('\\', '/')
    slugs.add(slug)
    if (basename(slug) === 'index') {
      slugs.add(dirname(slug) === '.' ? '' : dirname(slug).replaceAll('\\', '/'))
    }
  }
  return slugs
}

const collectDocsSlugs = (contentDir: string): Set<string> => {
  const slugs = new Set<string>()
  for (const rel of walkFiles(contentDir, contentDir)) {
    const posix = rel.replaceAll('\\', '/')
    const withoutExt = posix.slice(0, -extname(posix).length)
    const fileSlug = basename(withoutExt) === 'index' ? dirname(withoutExt) : withoutExt
    const normalizedFile = fileSlug === '.' ? '' : fileSlug
    const content = readFileSync(join(contentDir, rel), 'utf8')
    const fmSlug = readFrontmatterSlug(content)
    if (fmSlug) {
      slugs.add(stripHashAndSlash(fmSlug))
    } else {
      slugs.add(normalizedFile)
    }
  }
  return slugs
}

const extractHrefs = (line: string): string[] => {
  const hrefs: string[] = []
  const re = /]\(([^)]+)\)/g
  let match = re.exec(line)
  while (match) {
    hrefs.push(match[1].trim())
    match = re.exec(line)
  }
  return hrefs
}

const tokensOf = (slug: string): string[] => {
  const last = slug.split('/').pop() ?? slug
  return last.split('-').filter(Boolean)
}

const suggestSlug = (wanted: string, targets: Set<string>): string | undefined => {
  if (!wanted) {
    return undefined
  }

  let best: string | undefined
  let bestScore = 0
  const wantedParent = wanted.split('/').slice(0, -1).join('/')
  const wantedLast = wanted.split('/').pop() ?? wanted
  const wantedTokens = new Set(tokensOf(wanted))

  for (const candidate of targets) {
    if (!candidate) {
      continue
    }
    const candidateLast = candidate.split('/').pop() ?? candidate
    let score = 0
    const candidateParent = candidate.split('/').slice(0, -1).join('/')
    if (wantedParent && wantedParent === candidateParent) {
      score += 50
    }
    if (candidateLast.includes(wantedLast) || wantedLast.includes(candidateLast)) {
      score += 40
    }
    score += tokensOf(candidate).filter((token) => wantedTokens.has(token)).length * 10
    if (score > bestScore) {
      bestScore = score
      best = candidate
    }
  }

  return bestScore >= 40 ? best : undefined
}

const collectPrefixedLinks = (filePath: string, prefix: string): PrefixedLink[] => {
  const lines = readFileSync(filePath, 'utf8').split('\n')
  const found: PrefixedLink[] = []
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
    for (const href of extractHrefs(line)) {
      if (href === prefix || href.startsWith(prefix)) {
        found.push({
          href,
          line: i + 1,
          path: stripHashAndSlash(href.slice(prefix.length)),
        })
      }
    }
  }

  return found
}

const isKnownSlug = (path: string, targets: Set<string>): boolean => {
  return targets.has(path) || targets.has(`${path}/index`)
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
  console.log(`  DESIGNER_GUIDE_URL=${guideBase}`)
  console.log(`designer-guide env files: ${guideEnv.loaded.join(', ') || '(none)'}`)
  console.log(`  MAIN_DOCS_URL=${docsBase}`)
  console.log()

  const guideSlugs = collectGuideSlugs(GUIDE_CONTENT)
  const docsSlugs = collectDocsSlugs(DOCS_CONTENT)
  const broken: BrokenLink[] = []

  for (const rel of walkFiles(DOCS_CONTENT, DOCS_CONTENT)) {
    const full = join(DOCS_CONTENT, rel)
    for (const link of collectPrefixedLinks(full, GUIDE_PREFIX)) {
      if (isKnownSlug(link.path, guideSlugs)) {
        continue
      }
      const suggestion = suggestSlug(link.path, guideSlugs)
      broken.push({
        file: `documentation/docs/${rel.replaceAll('\\', '/')}`,
        href: link.href,
        line: link.line,
        resolved: `${guideBase}${link.path}${link.path ? '/' : ''}`,
        suggestion: suggestion ? `${GUIDE_PREFIX}${suggestion}${suggestion ? '/' : ''}` : undefined,
      })
    }
  }

  for (const rel of walkFiles(GUIDE_CONTENT, GUIDE_CONTENT)) {
    const full = join(GUIDE_CONTENT, rel)
    for (const link of collectPrefixedLinks(full, DOCS_PREFIX)) {
      if (isKnownSlug(link.path, docsSlugs)) {
        continue
      }
      const suggestion = suggestSlug(link.path, docsSlugs)
      broken.push({
        file: `designer-guide/content/${rel.replaceAll('\\', '/')}`,
        href: link.href,
        line: link.line,
        resolved: `${docsBase}${link.path}${link.path ? '/' : ''}`,
        suggestion: suggestion ? `${DOCS_PREFIX}${suggestion}` : undefined,
      })
    }
  }

  if (broken.length === 0) {
    console.log('All designer-guide: and docs: cross-links resolve to existing pages.')
    process.exit(0)
  }

  for (const item of broken) {
    console.log(item.file)
    console.log(`  ${item.line}: ${item.href}`)
    console.log(`  resolved: ${item.resolved}`)
    if (item.suggestion) {
      console.log(`  did you mean: ${item.suggestion}`)
    }
    console.log()
  }

  console.log(`${broken.length} broken cross-site link(s).`)
  process.exit(1)
}

try {
  main()
} catch (error) {
  console.error('check-cross-site-links failed.', error)
  process.exitCode = 1
}
