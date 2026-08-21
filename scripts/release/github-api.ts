/** GitHub REST API client for RC draft release artifact publishing. */

import {readFileSync} from 'node:fs'

export const GITHUB_API_VERSION = '2022-11-28'

const githubHeaders = (token: string): Record<string, string> => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': GITHUB_API_VERSION,
})

export interface GitHubApiErrorBody {
  message?: string
  errors?: Array<{code?: string; field?: string; message?: string}>
}

export class GitHubApiError extends Error {
  readonly status: number
  readonly body: GitHubApiErrorBody

  constructor(status: number, body: GitHubApiErrorBody) {
    const parts = [`status=${status}`]
    if (body.message) {
      parts.push(body.message)
    }
    if (body.errors?.length) {
      const summary = body.errors.map(entry => [entry.field, entry.code, entry.message].filter(Boolean).join(': ')).join('; ')
      if (summary) {
        parts.push(summary)
      }
    }
    super(parts.join(' — '))
    this.status = status
    this.body = body
  }
}

export async function githubJsonRequest<T>(method: string, url: string, token: string, body?: unknown): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: {
      ...githubHeaders(token),
      ...(body !== undefined ? {'Content-Type': 'application/json'} : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const text = await response.text()
  const parsed = text ? (JSON.parse(text) as GitHubApiErrorBody & T) : ({} as GitHubApiErrorBody & T)

  if (!response.ok) {
    throw new GitHubApiError(response.status, parsed)
  }

  return parsed as T
}

export interface GitHubRelease {
  id: number
  tag_name: string
  draft: boolean
  created_at: string
  html_url: string
}

interface GitHubReleaseAsset {
  id: number
  name: string
}

function releaseAlreadyExists(error: unknown): boolean {
  return (
    error instanceof GitHubApiError &&
    error.status === 422 &&
    error.body.errors?.some(entry => entry.code === 'already_exists' && entry.field === 'tag_name') === true
  )
}

async function listRepoReleases(repo: string, token: string): Promise<GitHubRelease[]> {
  const perPage = 100
  const releases: GitHubRelease[] = []

  for (let page = 1; ; page++) {
    const url = `https://api.github.com/repos/${repo}/releases?per_page=${perPage}&page=${page}`
    const pageReleases = await githubJsonRequest<GitHubRelease[]>('GET', url, token)
    if (!Array.isArray(pageReleases) || pageReleases.length === 0) {
      break
    }
    releases.push(...pageReleases)
    if (pageReleases.length < perPage) {
      break
    }
  }

  return releases
}

function sortReleasesNewestFirst(releases: GitHubRelease[]): GitHubRelease[] {
  return [...releases].sort((left, right) => Date.parse(right.created_at) - Date.parse(left.created_at))
}

/** Finds releases by `tag_name` metadata (works for draft releases without a git tag). */
export async function findReleasesByVersion(repo: string, version: string, token: string): Promise<GitHubRelease[]> {
  const releases = await listRepoReleases(repo, token)
  return sortReleasesNewestFirst(releases.filter(release => release.tag_name === version))
}

export async function findDraftReleaseByVersion(repo: string, version: string, token: string): Promise<GitHubRelease | null> {
  const matches = (await findReleasesByVersion(repo, version, token)).filter(release => release.draft)
  return matches[0] ?? null
}

export interface DraftArtifactReleaseConfig {
  repo: string
  version: string
  targetCommitish: string
  token: string
}

export async function deleteRelease(repo: string, releaseId: number, token: string): Promise<void> {
  const url = `https://api.github.com/repos/${repo}/releases/${releaseId}`
  await githubJsonRequest('DELETE', url, token)
}

async function deleteDraftReleasesByVersion(repo: string, version: string, token: string): Promise<number> {
  const drafts = (await findReleasesByVersion(repo, version, token)).filter(release => release.draft)
  for (const draft of drafts) {
    await deleteRelease(repo, draft.id, token)
  }
  return drafts.length
}

function draftArtifactReleasePayload(version: string, targetCommitish: string): Record<string, unknown> {
  return {
    tag_name: version,
    target_commitish: targetCommitish,
    name: `${version} (RC artifacts)`,
    body: 'Draft release with deployment archives.',
    draft: true,
    prerelease: true,
    generate_release_notes: false,
  }
}

async function createDraftArtifactRelease(repo: string, version: string, targetCommitish: string, token: string): Promise<GitHubRelease> {
  const createUrl = `https://api.github.com/repos/${repo}/releases`
  return githubJsonRequest<GitHubRelease>('POST', createUrl, token, draftArtifactReleasePayload(version, targetCommitish))
}

/**
 * Ensures exactly one draft prerelease exists for the version.
 * Existing drafts with the same `tag_name` are deleted and recreated.
 */
export async function ensureDraftArtifactRelease(config: DraftArtifactReleaseConfig): Promise<GitHubRelease> {
  const {repo, version, targetCommitish, token} = config

  const matches = await findReleasesByVersion(repo, version, token)
  if (matches.some(release => !release.draft)) {
    throw new Error(`Release ${version} exists and is not a draft; refusing to overwrite artifacts`)
  }

  const removed = await deleteDraftReleasesByVersion(repo, version, token)
  if (removed > 0) {
    console.log(`==> Recreated draft release ${version} (removed ${removed} existing draft(s))`)
  }

  try {
    return await createDraftArtifactRelease(repo, version, targetCommitish, token)
  } catch (error) {
    if (!releaseAlreadyExists(error)) {
      throw error
    }
    await deleteDraftReleasesByVersion(repo, version, token)
    return createDraftArtifactRelease(repo, version, targetCommitish, token)
  }
}

export async function listReleaseAssets(repo: string, releaseId: number, token: string): Promise<GitHubReleaseAsset[]> {
  const url = `https://api.github.com/repos/${repo}/releases/${releaseId}/assets`
  const data = await githubJsonRequest<GitHubReleaseAsset[]>('GET', url, token)
  return Array.isArray(data) ? data : []
}

export async function deleteReleaseAsset(repo: string, assetId: number, token: string): Promise<void> {
  const url = `https://api.github.com/repos/${repo}/releases/assets/${assetId}`
  await githubJsonRequest('DELETE', url, token)
}

export async function uploadReleaseAsset(
  release: GitHubRelease,
  repo: string,
  filePath: string,
  assetName: string,
  token: string
): Promise<void> {
  const assets = await listReleaseAssets(repo, release.id, token)
  const existing = assets.find(asset => asset.name === assetName)
  if (existing) {
    await deleteReleaseAsset(repo, existing.id, token)
  }

  const content = readFileSync(filePath)
  const url = `https://uploads.github.com/repos/${repo}/releases/${release.id}/assets` + `?name=${encodeURIComponent(assetName)}`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...githubHeaders(token),
      'Content-Type': 'application/octet-stream',
      'Content-Length': String(content.byteLength),
    },
    body: content,
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Release asset upload ${response.status}: ${body}`)
  }
}
