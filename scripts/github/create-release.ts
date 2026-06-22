#!/usr/bin/env node

import {readFileSync} from 'node:fs'
import {Octokit} from 'octokit'

interface ReleaseConfig {
  owner: string
  repo: string
  tagName: string
  name: string
  body: string
}

function getConfigPathFromArgs(): string {
  const [, , configPath] = process.argv
  if (!configPath) {
    throw new Error('The release configuration file path is not provided.')
  }
  return configPath
}

function getAuthToken(): string {
  const tokenEnv = 'GITHUB_ACCESS_TOKEN'
  const authToken = process.env[tokenEnv]
  if (!authToken) {
    throw new Error(`Cannot find GitHub token in ${tokenEnv}.`)
  }
  return authToken
}

function loadConfig(configPath: string): ReleaseConfig {
  const text = readFileSync(configPath, 'utf8')
  const data = JSON.parse(text) as ReleaseConfig
  return data
}

function createOctokit(authToken: string): Octokit {
  return new Octokit({auth: authToken})
}

async function callGetReleaseByTagName(octokit: Octokit, data: ReleaseConfig) {
  return octokit.request(`GET /repos/${data.owner}/${data.repo}/releases/tags/${data.tagName}`, {
    owner: data.owner,
    repo: data.repo,
    tag: data.tagName,
    headers: {'X-GitHub-Api-Version': '2022-11-28'},
  })
}

async function callUpdateRelease(octokit: Octokit, data: ReleaseConfig, release: {id: number}) {
  return octokit.request(`PATCH /repos/${data.owner}/${data.repo}/releases/${release.id}`, {
    release_id: release.id,
    owner: data.owner,
    repo: data.repo,
    tag_name: data.tagName,
    name: data.name,
    body: data.body,
    draft: false,
    prerelease: false,
    headers: {'X-GitHub-Api-Version': '2022-11-28'},
  })
}

async function callCreateRelease(octokit: Octokit, data: ReleaseConfig) {
  return octokit.request(`POST /repos/${data.owner}/${data.repo}/releases`, {
    owner: data.owner,
    repo: data.repo,
    tag_name: data.tagName,
    name: data.name,
    body: data.body,
    draft: false,
    prerelease: false,
    generate_release_notes: false,
    headers: {'X-GitHub-Api-Version': '2022-11-28'},
  })
}

async function createOrUpdateRelease(octokit: Octokit, data: ReleaseConfig): Promise<void> {
  const releaseDescription = `'${data.name}' (tag ${data.tagName}) for ${data.owner}/${data.repo}`

  let response
  try {
    response = await callCreateRelease(octokit, data)
  } catch (error: unknown) {
    const err = error as {status?: number; response?: {data?: {errors?: Array<{code?: string; field?: string}>}}}
    const alreadyExists =
      err.status === 422 && err.response?.data?.errors?.some(entry => entry.code === 'already_exists' && entry.field === 'tag_name')

    if (!alreadyExists) {
      throw error
    }

    console.info(`Release ${releaseDescription} has already been created.`)
    const releaseResponse = await callGetReleaseByTagName(octokit, data)
    response = await callUpdateRelease(octokit, data, releaseResponse.data as {id: number})
  }

  if (!response || response.status < 200 || response.status > 201) {
    console.error(response)
    throw new Error('Cannot create release.')
  }

  console.info(`Release ${releaseDescription} successfully created or updated.`)
}

async function main(): Promise<void> {
  const configPath = getConfigPathFromArgs()
  const authToken = getAuthToken()
  const octokit = createOctokit(authToken)
  const config = loadConfig(configPath)

  await createOrUpdateRelease(octokit, config)
}

try {
  await main()
} catch (error) {
  console.error('❌ Failed to create or update GitHub release.', error)
  process.exitCode = 1
}
