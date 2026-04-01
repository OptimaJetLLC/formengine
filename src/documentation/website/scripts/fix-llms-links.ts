import {access, readFile, writeFile} from 'node:fs/promises'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const fileExists = async (filePath: string) => {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

const fixFile = async (filePath: string) => {
  console.info(`Fixing file '${filePath}'`)
  if (!await fileExists(filePath)) {
    throw new Error(`File '${filePath}' does not exist`)
  }

  const originalContent = await readFile(filePath, 'utf8')
  const updatedContent = originalContent.replaceAll('/documentation/documentation/', '/documentation/')

  await writeFile(filePath, updatedContent, 'utf8')

  console.info(`File '${filePath}' patched`)
}

const main = async () => {
  const outputPath = resolve(__dirname, '..', 'build')
  const targetFiles = ['llms.txt', 'llms-full.txt']

  for (let targetFile of targetFiles) {
    const filePath = resolve(outputPath, targetFile)
    await fixFile(filePath)
  }
}

// fixes bug in @signalwire/docusaurus-plugin-llms-txt
main().catch(console.error)
