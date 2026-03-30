#!/usr/bin/env node

import {writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const configFilePath = join(__dirname, '..', 'src', 'features', 'license', 'assemblyDate.ts')

const assemblyDate = new Date().getTime()
const modifiedContent = `// DO NOT CHANGE THIS FILE\nexport const assemblyDate = new Date(${assemblyDate})\n`
writeFileSync(configFilePath, modifiedContent)

