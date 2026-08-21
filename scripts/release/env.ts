/** Environment helpers for release scripts (run inside Earthly or GitHub Actions). */

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export function requireGhToken(): string {
  return requireEnv('GH_TOKEN')
}

export function githubRepository(): string {
  return requireEnv('GITHUB_REPOSITORY')
}

function archivesDir(): string {
  return process.env.ARCHIVES_DIR ?? '.archives'
}

function parseFlag(argv: string[], name: string): string | undefined {
  const idx = argv.indexOf(name)
  if (idx === -1) {
    return undefined
  }
  const value = argv[idx + 1]
  if (!value || value.startsWith('--')) {
    throw new Error(`Missing value for ${name}`)
  }
  return value
}

export function parseArchivesDir(argv: string[]): string {
  for (const arg of argv) {
    if (arg.startsWith('--archives-dir=')) {
      return arg.slice('--archives-dir='.length)
    }
  }
  const fromFlag = parseFlag(argv, '--archives-dir')
  if (fromFlag) {
    return fromFlag
  }
  return archivesDir()
}
