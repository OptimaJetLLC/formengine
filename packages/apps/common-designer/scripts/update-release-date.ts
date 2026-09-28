#!/usr/bin/env node

import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {readJson, writeJson} from '@react-form-builder/cli-lib/json-fs'

interface CommonDesignerConfig {
  releaseDate?: number
  version?: string
  [key: string]: unknown
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const configFilePath = join(__dirname, '..', 'src', 'utils', 'config.json')
const packageJsonPath = join(__dirname, '..', 'package.json')

const config = readJson<CommonDesignerConfig>(configFilePath)
const packageJson = readJson<{dependencies?: Record<string, string>}>(packageJsonPath)
const designerPackageJsonVersion = packageJson.dependencies?.['@react-form-builder/designer'] ?? ''
const designerVersion = designerPackageJsonVersion.replace('^', '')

config.releaseDate = new Date().getTime()
config.version = designerVersion ? `v${designerVersion}` : ''

writeJson(configFilePath, config)
