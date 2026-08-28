import {existsSync, readFileSync} from 'node:fs'
import {join} from 'node:path'

export interface ViteStyleEnv {
  loaded: string[]
  values: Record<string, string>
}

/**
 * Parses a dotenv file into a key/value map. Quotes and `export` prefixes are stripped.
 * @param content file contents
 * @returns parsed environment variables
 */
export function parseEnvFile(content: string): Record<string, string> {
  const result: Record<string, string> = {}

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const assignment = trimmed.startsWith('export ') ? trimmed.slice(7).trim() : trimmed
    const eq = assignment.indexOf('=')
    if (eq <= 0) {
      continue
    }

    const key = assignment.slice(0, eq).trim()
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) {
      continue
    }

    let value = assignment.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    result[key] = value
  }

  return result
}

/**
 * Loads Vite-style `.env*` files from a directory. Later files override earlier ones.
 * File values are written onto `process.env` so website `.env` wins over a stale shell export.
 * @param dir directory that contains the env files
 * @param mode Vite mode name, for example `development`
 * @returns loaded file names and the merged values
 */
export function applyViteStyleEnv(dir: string, mode = 'development'): ViteStyleEnv {
  const files = ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`]
  const values: Record<string, string> = {}
  const loaded: string[] = []

  for (const file of files) {
    const fullPath = join(dir, file)
    if (!existsSync(fullPath)) {
      continue
    }
    Object.assign(values, parseEnvFile(readFileSync(fullPath, 'utf8')))
    loaded.push(file)
  }

  for (const [key, value] of Object.entries(values)) {
    process.env[key] = value
  }

  return {loaded, values}
}
