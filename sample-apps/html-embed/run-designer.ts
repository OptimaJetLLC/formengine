#!/usr/bin/env node

/* eslint-disable import/no-nodejs-modules,no-console */

import {execSync} from 'child_process'
import {dirname, join, resolve} from 'path'
import {fileURLToPath} from 'url'

function getScriptRoot(): string {
  const __filename = fileURLToPath(import.meta.url)
  return dirname(__filename)
}

function runCommand(command: string, cwd: string): void {
  console.log(`▶ ${command} (cwd=${cwd})`)
  execSync(command, {cwd, stdio: 'inherit'})
}

function openHtmlFile(filePath: string): void {
  const platform = process.platform

  if (platform === 'win32') {
    execSync(`start "" ${JSON.stringify(filePath)}`, {stdio: 'ignore'})
  } else if (platform === 'darwin') {
    execSync(`open ${JSON.stringify(filePath)}`, {stdio: 'ignore'})
  } else {
    execSync(`xdg-open ${JSON.stringify(filePath)}`, {stdio: 'ignore'})
  }
}

function main(): void {
  const scriptRoot = getScriptRoot()
  const designerBundleDir = resolve(scriptRoot, '../../src/packages/designer-bundle')

  try {
    runCommand('npm install', designerBundleDir)
    runCommand('npm run build', designerBundleDir)

    const htmlPath = join(scriptRoot, 'designer-bundle', 'designer-bundle.html')
    console.log(`🌐 Opening ${htmlPath}`)
    openHtmlFile(htmlPath)
  } catch (error) {
    console.error('❌ run-designer script failed.', error)
    process.exitCode = 1
  }
}

main()

