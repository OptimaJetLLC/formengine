#!/usr/bin/env node

import {readdirSync, readFileSync, statSync} from 'node:fs'
import {join, resolve} from 'node:path'

import {parseArchivesDir, requireGhToken, githubRepository} from './env.ts'
import {ensureDraftArtifactRelease, uploadReleaseAsset} from './github-api.ts'

function listArchiveFilenames(archivesDir: string): string[] {
  return readdirSync(archivesDir)
    .filter(name => statSync(join(archivesDir, name)).isFile())
    .sort()
}

function targetCommitish(): string {
  const sha = process.env.GITHUB_SHA
  if (sha) {
    return sha
  }
  throw new Error('Missing GITHUB_SHA (commit SHA required to create or update the draft release tag)')
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2)
  const archivesDir = resolve(parseArchivesDir(argv))

  const {version} = JSON.parse(readFileSync(join(archivesDir, 'lerna.json'), 'utf8')) as {version: string}
  const repo = githubRepository()
  const token = requireGhToken()

  console.log(`==> Ensure single draft GitHub release ${version} on ${repo}`)
  const release = await ensureDraftArtifactRelease({
    repo,
    version,
    targetCommitish: targetCommitish(),
    token,
  })

  for (const name of listArchiveFilenames(archivesDir)) {
    console.log(`==> Upload asset ${name}`)
    await uploadReleaseAsset(release, repo, join(archivesDir, name), name, token)
  }

  console.log(`==> Published ${listArchiveFilenames(archivesDir).length} asset(s) to ${release.html_url}`)
}

try {
  await main()
} catch (error) {
  console.error(error)
  process.exitCode = 1
}
