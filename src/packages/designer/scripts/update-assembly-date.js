import fs from 'fs'
import {fileURLToPath} from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const configFilePath = path.join(__dirname, '..', 'src', 'features', 'license', 'assemblyDate.ts')

const assemblyDate = new Date().getTime()
const modifiedContent = `export const assemblyDate = new Date(${assemblyDate})\n`
fs.writeFileSync(configFilePath, modifiedContent)
