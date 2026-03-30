#!/usr/bin/env node

import {readFileSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

interface CommonDesignerConfig {
  releaseDate?: number
  version?: string

  [key: string]: unknown
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const configFilePath = join(__dirname, '..', 'src', 'utils', 'config.json')
const packageJsonPath = join(__dirname, '..', 'package.json')

const content = readFileSync(configFilePath, 'utf8')
const config = JSON.parse(content) as CommonDesignerConfig

const packageJsonContent = readFileSync(packageJsonPath, 'utf8')
const packageJson = JSON.parse(packageJsonContent) as {dependencies?: Record<string, string>}
const designerPackageJsonVersion = packageJson.dependencies?.['@react-form-builder/designer'] ?? ''
const designerVersion = designerPackageJsonVersion.replace('^', '')

config.releaseDate = new Date().getTime()
config.version = designerVersion ? `v${designerVersion}` : ''

const modifiedContent = `${JSON.stringify(config, undefined, 2)}\n`
writeFileSync(configFilePath, modifiedContent)
