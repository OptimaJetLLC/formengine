#!/usr/bin/env node

import {existsSync, lstatSync, readFileSync, renameSync, unlinkSync, writeFileSync} from 'node:fs'
import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..')
const DEFAULT_CLA_SIGNATURES_PATH = join(REPO_ROOT, 'cla.json')

type ClaSignatures = {
  signedContributors?: Array<{
    name?: string
    id?: number | string
    comment_id?: number | string
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

/**
 * Ensures the CLA signatures path is safe to read/write (no symlink trickery).
 * @param signaturesPath path to cla.json
 * @returns absolute regular-file path
 */
function assertSafeClaSignaturesPath(signaturesPath: string): string {
  const absolutePath = resolve(signaturesPath)
  const parentPath = dirname(absolutePath)

  if (!existsSync(parentPath)) {
    throw new Error(`CLA signatures parent directory is missing: ${parentPath}`)
  }

  const parentStat = lstatSync(parentPath)
  if (parentStat.isSymbolicLink() || !parentStat.isDirectory()) {
    throw new Error(`CLA signatures parent must be a real directory: ${parentPath}`)
  }

  if (existsSync(absolutePath)) {
    const fileStat = lstatSync(absolutePath)
    if (fileStat.isSymbolicLink() || !fileStat.isFile()) {
      throw new Error(`CLA signatures path must be a regular file (not a symlink): ${absolutePath}`)
    }
  }

  return absolutePath
}

function loadSignatures(path: string): ClaSignatures {
  const absolutePath = assertSafeClaSignaturesPath(path)
  if (!existsSync(absolutePath)) {
    return {signedContributors: []}
  }

  return JSON.parse(readFileSync(absolutePath, 'utf8')) as ClaSignatures
}

/**
 * Writes cla.json via temp file + rename so a destination symlink is not followed.
 * @param signaturesPath path to cla.json
 * @param signatures payload to write
 */
function writeSignaturesAtomic(signaturesPath: string, signatures: ClaSignatures): void {
  const absolutePath = assertSafeClaSignaturesPath(signaturesPath)
  const tempPath = join(dirname(absolutePath), `.cla-signatures.${process.pid}.tmp`)

  if (existsSync(tempPath)) {
    const tempStat = lstatSync(tempPath)
    if (tempStat.isSymbolicLink() || !tempStat.isFile()) {
      throw new Error(`CLA signatures temp path must be a regular file: ${tempPath}`)
    }
    unlinkSync(tempPath)
  }

  writeFileSync(tempPath, `${JSON.stringify(signatures, undefined, 2)}\n`)

  try {
    // Re-check destination immediately before rename (TOCTOU shrink).
    assertSafeClaSignaturesPath(absolutePath)
    renameSync(tempPath, absolutePath)
  } catch (error) {
    if (existsSync(tempPath)) {
      unlinkSync(tempPath)
    }
    throw error
  }
}

/**
 * Appends a contributor signature to cla.json when not already present.
 * @returns true when the file was updated
 */
function appendClaSignature(signaturesPath: string, authorLogin: string, authorId: string, commentId?: string): boolean {
  const signatures = loadSignatures(signaturesPath)
  const signedContributors = signatures.signedContributors ?? []

  const alreadySigned = signedContributors.some(contributor => {
    if (contributor.name?.toLowerCase() === authorLogin.toLowerCase()) {
      return true
    }
    return contributor.id !== undefined && String(contributor.id) === authorId
  })

  if (alreadySigned) {
    return false
  }

  const entry: NonNullable<ClaSignatures['signedContributors']>[number] = {
    name: authorLogin,
    id: /^\d+$/.test(authorId) ? Number(authorId) : authorId,
  }

  if (commentId !== undefined) {
    entry.comment_id = /^\d+$/.test(commentId) ? Number(commentId) : commentId
  }

  signatures.signedContributors = [...signedContributors, entry]
  writeSignaturesAtomic(signaturesPath, signatures)
  return true
}

function main(): void {
  const authorLogin = readRequiredEnv('CLA_AUTHOR_LOGIN')
  const authorId = readRequiredEnv('CLA_AUTHOR_ID')
  const commentId = process.env.CLA_COMMENT_ID
  const signaturesPath = resolveClaSignaturesPath()

  const updated = appendClaSignature(signaturesPath, authorLogin, authorId, commentId)
  if (updated) {
    console.log(`Recorded CLA signature for ${authorLogin} in ${signaturesPath}.`)
    return
  }

  console.log(`CLA signature for ${authorLogin} is already recorded in ${signaturesPath}.`)
}

try {
  main()
} catch (error) {
  console.error('❌ append-cla-signature failed.', error)
  process.exitCode = 1
}
