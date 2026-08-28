import {createHash} from 'node:crypto'
import {readFileSync} from 'node:fs'

/**
 * npm integrity (sha512-...) for a .tgz file - same algorithm as package-lock / npm.
 * @param absolutePath absolute path to the tarball
 * @returns integrity string (e.g. sha512-...)
 */
export function integrityForTgz(absolutePath: string): string {
  const buf = readFileSync(absolutePath)
  return `sha512-${createHash('sha512').update(buf).digest('base64')}`
}
