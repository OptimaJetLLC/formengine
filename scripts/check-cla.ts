#!/usr/bin/env node

import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..')
const DEFAULT_CLA_SIGNATURES_PATH = join(REPO_ROOT, 'cla.json')

/** Associations that do not need to sign the CLA (maintainers / org members). */
const CLA_EXEMPT_ASSOCIATIONS = new Set(['OWNER', 'MEMBER', 'COLLABORATOR'])

type ClaSignatures = {
  signedContributors?: Array<{
    name?: string
    id?: number | string
  }>
}

function readRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function resolveClaSignaturesPath(): string {
  return process.env.CLA_SIGNATURES_PATH || DEFAULT_CLA_SIGNATURES_PATH
}

function hasSignedCla(authorLogin: string, authorId: string, signaturesPath: string): boolean {
  const signatures = JSON.parse(readFileSync(signaturesPath, 'utf8')) as ClaSignatures
  const signedContributors = signatures.signedContributors ?? []

  return signedContributors.some(contributor => {
    if (contributor.name?.toLowerCase() === authorLogin.toLowerCase()) {
      return true
    }
    return contributor.id !== undefined && String(contributor.id) === authorId
  })
}

function main(): void {
  const authorLogin = readRequiredEnv('PR_AUTHOR')
  const authorId = readRequiredEnv('PR_AUTHOR_ID')
  const authorAssociation = process.env.PR_AUTHOR_ASSOCIATION ?? 'NONE'
  const signaturesPath = resolveClaSignaturesPath()

  if (CLA_EXEMPT_ASSOCIATIONS.has(authorAssociation)) {
    console.log(`CLA check skipped for ${authorLogin} (${authorAssociation}).`)
    return
  }

  if (hasSignedCla(authorLogin, authorId, signaturesPath)) {
    console.log(`CLA signature found for ${authorLogin} (from ${signaturesPath}).`)
    return
  }

  console.error(`CLA signature missing for ${authorLogin}.`)
  console.error('Sign the CLA by commenting on the pull request:')
  console.error('  I have read the CLA Document and I hereby sign the CLA')
  console.error('See CLA.md and CONTRIBUTION.md for details.')
  process.exitCode = 1
}

try {
  main()
} catch (error) {
  console.error('❌ check-cla script failed.', error)
  process.exitCode = 1
}
