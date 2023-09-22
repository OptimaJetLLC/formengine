import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {readVersions} from './util/read-versions.js'
import {executeCommand} from './util/execute-command.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function updateLernaVersion() {
  const versions = readVersions()
  const path = join(__dirname, '..', '..')
  const command = `npx lerna version ${versions['NpmVersion']} --preid ${versions['NpmPublishTag']} --no-git-tag-version --yes`
  executeCommand(command, path)
}

updateLernaVersion()
