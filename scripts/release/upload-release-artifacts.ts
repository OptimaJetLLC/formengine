#!/usr/bin/env node

import {readdirSync, readFileSync, statSync} from 'node:fs'
import {join, resolve} from 'node:path'

import {DRAFT_RELEASE_GITHUB_REPOSITORY, DRAFT_RELEASE_TARGET_COMMITISH} from './constants.ts'
import {parseArchivesDir, requireGhToken} from './env.ts'
import {ensureDraftArtifactRelease, uploadReleaseAsset} from './github-api.ts'

function listArchiveFilenames(archivesDir: string): string[] {
  return readdirSync(archivesDir)
    .filter(name => statSync(join(archivesDir, name)).isFile())
    .sort()
}

function draftReleaseRepository(): string {
  return process.env.DRAFT_RELEASE_GITHUB_REPOSITORY?.trim() || DRAFT_RELEASE_GITHUB_REPOSITORY
}

function targetCommitish(): string {
  const explicit = process.env.DRAFT_RELEASE_TARGET_COMMITISH?.trim()
  if (explicit) {
    return explicit
  }
  // Drafts live on optimajet/formengine; product CI SHAs from fb/open-formengine are not on that repo.
  return DRAFT_RELEASE_TARGET_COMMITISH
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2)
  const archivesDir = resolve(parseArchivesDir(argv))

  const {version} = JSON.parse(readFileSync(join(archivesDir, 'lerna.json'), 'utf8')) as {version: string}
  const repo = draftReleaseRepository()
  const token = requireGhToken()
  const commitish = targetCommitish()

  console.log(`==> Ensure single draft GitHub release ${version} on ${repo} (target_commitish=${commitish})`)
  const release = await ensureDraftArtifactRelease({
    repo,
    version,
    targetCommitish: commitish,
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
