import {dirname, join} from 'node:path'
import {readFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function readVersions() {
  const path = join(__dirname, '..', '..', 'version.txt')
  const content = readFileSync(path, 'utf-8')
  const data = content.split('\n')
  const versions = {}
  data.forEach(value => {
    const delimiter = '='
    if (value.indexOf(delimiter) < 0) return
    const values = value.split(delimiter)
    versions[values[0].trim()] = values[1].trim()
  })
  return versions
}
