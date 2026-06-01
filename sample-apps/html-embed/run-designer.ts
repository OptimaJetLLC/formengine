#!/usr/bin/env node

import {execSync} from 'node:child_process'
import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

function getScriptRoot(): string {
  return dirname(fileURLToPath(import.meta.url))
}

function runCommandInDir(command: string, cwd: string): void {
  console.log(`▶ ${command} (cwd=${cwd})`)
  execSync(command, {cwd, stdio: 'inherit'})
}

function openFileInOs(filePath: string): void {
  if (process.platform === 'win32') {
    execSync(`start "" ${JSON.stringify(filePath)}`, {stdio: 'ignore'})
    return
  }
  if (process.platform === 'darwin') {
    execSync(`open ${JSON.stringify(filePath)}`, {stdio: 'ignore'})
    return
  }
  execSync(`xdg-open ${JSON.stringify(filePath)}`, {stdio: 'ignore'})
}

function main(): void {
  const scriptRoot = getScriptRoot()
  const designerBundleDir = resolve(scriptRoot, '../../src/packages/designer-bundle')

  runCommandInDir('npm install', designerBundleDir)
  runCommandInDir('npm run build', designerBundleDir)

  const htmlPath = join(scriptRoot, 'designer-bundle', 'designer-bundle.html')
  console.log(`🌐 Opening ${htmlPath}`)
  openFileInOs(htmlPath)
}

try {
  main()
} catch (error) {
  console.error('❌ run-designer script failed.', error)
  process.exitCode = 1
}
