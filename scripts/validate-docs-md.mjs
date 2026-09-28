#!/usr/bin/env node
/**
 * Batch-validates markdown files via web-content-validator HTTP API.
 * Usage: node scripts/validate-docs-md.mjs [baseDir] [--port 3099]
 */
import {readdir, writeFile} from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const ROOT = path.resolve(process.argv[2] ?? 'documentation')
const portArg = process.argv.indexOf('--port')
const PORT = portArg !== -1 ? Number(process.argv[portArg + 1]) : 3099
const BASE = `http://localhost:${PORT}`
const CWD = process.cwd()
const SUBMIT_CONCURRENCY = 20
const POLL_MS = 1000
const POLL_CONCURRENCY = 10
const MAX_RETRIES = 8

async function walk(dir) {
  const entries = await readdir(dir, {withFileTypes: true})
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(full)
    }
  }
  return files
}

async function login() {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({login: 'admin', password: 'admin'}),
  })
  if (!res.ok) throw new Error(`Login failed: ${res.status}`)
  const data = await res.json()
  return data.accessToken
}

async function submitJob(token, filePath) {
  const rel = path.relative(CWD, filePath)
  const res = await fetch(`${BASE}/api/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      filePath: rel,
      contentType: 'markdown',
      rulesConfig: {},
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Submit failed for ${rel}: ${res.status} ${text}`)
  }
  const {jobId} = await res.json()
  return {jobId, filePath: rel}
}

async function getJob(token, jobId) {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const res = await fetch(`${BASE}/api/validate/jobs/${jobId}`, {
      headers: {Authorization: `Bearer ${token}`},
    })
    if (res.status === 429) {
      await new Promise(r => setTimeout(r, 1000 * (attempt + 1)))
      continue
    }
    if (!res.ok) throw new Error(`Poll failed for ${jobId}: ${res.status}`)
    return res.json()
  }
  throw new Error(`Poll failed for ${jobId}: rate limited after retries`)
}

function isTerminal(status) {
  return status === 'completed' || status === 'failed' || status === 'cancelled'
}

async function pool(items, limit, fn) {
  const results = []
  let i = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      results[idx] = await fn(items[idx], idx)
    }
  }
  await Promise.all(Array.from({length: Math.min(limit, items.length)}, () => worker()))
  return results
}

function issueKey(file, ruleId, line) {
  return `${file}::${ruleId}::${line ?? ''}`
}

async function main() {
  const files = await walk(ROOT)
  files.sort()
  console.error(`Found ${files.length} markdown files under ${ROOT}`)

  const token = await login()
  console.error('Authenticated')

  const jobs = await pool(files, SUBMIT_CONCURRENCY, async file => submitJob(token, file))
  console.error(`Submitted ${jobs.length} validation jobs`)

  const pending = new Map(jobs.map(j => [j.jobId, j]))
  const fileResults = new Map()

  while (pending.size > 0) {
    const batch = [...pending.entries()]
    await pool(batch, POLL_CONCURRENCY, async ([jobId, meta]) => {
      const job = await getJob(token, jobId)
      if (!isTerminal(job.status)) return
      pending.delete(jobId)
      const results = job.results ?? []
      const fails = results.filter(r => r.status === 'fail')
      const warns = results.filter(r => r.status === 'warn')
      if (fails.length > 0 || warns.length > 0) {
        fileResults.set(meta.filePath, {fails, warns, status: job.status})
      }
    })
    if (pending.size > 0) {
      process.stderr.write(`\rWaiting: ${pending.size} jobs remaining...`)
      await new Promise(r => setTimeout(r, POLL_MS))
    }
  }
  console.error(`\nDone. ${fileResults.size} files with issues.`)

  const allIssues = []
  for (const [file, {fails, warns}] of fileResults) {
    for (const r of [...fails, ...warns]) {
      const lines = r.locations?.map(l => l.line).filter(Boolean) ?? []
      const line = lines[0]
      allIssues.push({
        file,
        severity: r.status,
        ruleId: r.rule_id,
        message: r.message,
        suggestion: r.suggestion,
        line,
        locationMessages: (r.locations ?? []).map(l => l.message).filter(Boolean),
      })
    }
  }

  allIssues.sort((a, b) => a.file.localeCompare(b.file) || (a.line ?? 0) - (b.line ?? 0))

  const failCount = allIssues.filter(i => i.severity === 'fail').length
  const warnCount = allIssues.filter(i => i.severity === 'warn').length
  const filesWithFails = new Set(allIssues.filter(i => i.severity === 'fail').map(i => i.file)).size

  const summary = {
    validatedAt: new Date().toISOString(),
    root: ROOT,
    totalFiles: files.length,
    filesWithIssues: fileResults.size,
    filesWithFails,
    failCount,
    warnCount,
    issues: allIssues,
  }

  const outJson = path.join(ROOT, 'validation-results.json')
  await writeFile(outJson, JSON.stringify(summary, null, 2))

  const lines = [
    '# Documentation Markdown Validation Results',
    '',
    `Validated **${files.length}** files under \`${path.relative(CWD, ROOT) || '.'}\` with web-content-validator (\`contentType: markdown\`).`,
    '',
    '| Metric              | Count |',
    '| ------------------- | ----: |',
    `| Files validated     | ${files.length} |`,
    `| Files with issues   | ${fileResults.size} |`,
    `| Files with failures | ${filesWithFails} |`,
    `| Total failures      | ${failCount} |`,
    `| Total warnings      | ${warnCount} |`,
    '',
    '## Todo list',
    '',
  ]

  const seen = new Set()
  for (const issue of allIssues) {
    const key = issueKey(issue.file, issue.ruleId, issue.line)
    if (seen.has(key)) continue
    seen.add(key)
    const checkbox = issue.severity === 'fail' ? '- [ ]' : '- [ ]'
    const loc = issue.line ? ` (line ${issue.line})` : ''
    const suggestion = issue.suggestion ? ` - **Suggestion:** ${issue.suggestion}` : ''
    const locMsg = issue.locationMessages?.[0] ? ` - ${issue.locationMessages[0]}` : ''
    lines.push(`${checkbox} \`${issue.file}\`${loc}: **${issue.ruleId}** [${issue.severity}]${locMsg}${suggestion}`)
  }

  const outMd = path.join(ROOT, 'validation-todo.md')
  await writeFile(outMd, `${lines.join('\n')}\n`)

  console.log(JSON.stringify({outJson, outMd, failCount, warnCount, filesWithIssues: fileResults.size}))
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
