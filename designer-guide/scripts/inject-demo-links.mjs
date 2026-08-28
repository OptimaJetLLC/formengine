#!/usr/bin/env node
/**
 * Inserts or replaces start/end demo deep-link tips in walkthrough articles listed in
 * data/demo-article-forms.json.
 */
import {existsSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {demoEndTip, demoStartTip} from '../src/lib/demo-links.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const mapPath = join(root, 'data/demo-article-forms.json')
const contentRoot = join(root, 'content')

const map = JSON.parse(readFileSync(mapPath, 'utf8'))

/** Single tip block that contains the start-form phrase (does not cross `:::`). */
const START_TIP_RE =
  /:::tip Try it\n+\s*<a [^>]+>\s*[^<]*<\/a>\s*-\s*opens the FormEngine demo in a (?:new tab|popup window) with the form this article (?:starts from|uses)\.\n+\s*:::\n+/
/** Single tip block that contains the finished-form phrase (does not cross `:::`). */
const END_TIP_RE =
  /:::tip Try it\n+\s*<a [^>]+>\s*[^<]*<\/a>\s*-\s*opens the FormEngine demo in a (?:new tab|popup window) with the completed form from this article\.\n+\s*:::\n+/

/**
 * @param {string} text
 * @param {string} tip
 */
function upsertAfterIntro(text, tip) {
  if (START_TIP_RE.test(text)) {
    return text.replace(START_TIP_RE, tip)
  }
  const header = text.match(/^---\n[\s\S]*?\n---\n+# [^\n]+\n+/)
  if (!header) {
    return text
  }
  const introEnd = text.indexOf('\n\n', header[0].length)
  if (introEnd === -1) {
    return text
  }
  const insertAt = introEnd + 2
  return `${text.slice(0, insertAt)}${tip}${text.slice(insertAt)}`
}

/**
 * @param {string} text
 * @param {string} tip
 */
function upsertBeforeSeeAlso(text, tip) {
  if (END_TIP_RE.test(text)) {
    return text.replace(END_TIP_RE, tip)
  }
  const seeAlso = text.lastIndexOf('\n## See also')
  const summary = text.lastIndexOf('\n## Summary')
  const anchor = seeAlso !== -1 ? seeAlso : summary
  if (anchor === -1) {
    return `${text.trimEnd()}\n\n${tip}`
  }
  return `${text.slice(0, anchor + 1)}\n${tip}${text.slice(anchor + 1)}`
}

let updated = 0
for (const [slug, entry] of Object.entries(map.articles)) {
  const filePath = join(contentRoot, `${slug}.md`)
  if (!existsSync(filePath)) {
    console.warn(`Missing article: ${slug}`)
    continue
  }
  let text = readFileSync(filePath, 'utf8')
  const before = text
  if (entry.start) {
    text = upsertAfterIntro(text, demoStartTip(entry.start))
  }
  if (entry.end) {
    text = upsertBeforeSeeAlso(text, demoEndTip(entry.end))
  }
  if (text !== before) {
    writeFileSync(filePath, text)
    console.log(`Updated ${slug}`)
    updated += 1
  } else {
    console.log(`Unchanged ${slug}`)
  }
}

console.log(`Done. Updated ${updated} articles.`)
