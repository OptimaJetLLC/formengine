#!/usr/bin/env node

import {mkdir, readdir, rename, rm, stat} from 'node:fs/promises'
import {basename, dirname, extname, join} from 'node:path'
import process from 'node:process'
import {fileURLToPath} from 'node:url'

import sharp from 'sharp'

import {getCpuScaledConcurrency} from '../../../scripts/cli-lib/concurrency.ts'

const QUALITY = 80
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif'])
const {concurrency: MAX_CONCURRENCY} = getCpuScaledConcurrency()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PACKAGE_ROOT = join(__dirname, '..')
const TMP_OUTPUT_DIR = join(PACKAGE_ROOT, 'tmp')

const isSupportedImage = (filePath: string): boolean => {
  return SUPPORTED_EXTENSIONS.has(extname(filePath).toLowerCase())
}

const collectImagesFromDirectory = async (directoryPath: string): Promise<string[]> => {
  const entries = await readdir(directoryPath, {withFileTypes: true})
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = join(directoryPath, entry.name)

    if (entry.isDirectory()) {
      files.push(...await collectImagesFromDirectory(fullPath))
      continue
    }

    if (entry.isFile() && isSupportedImage(fullPath)) {
      files.push(fullPath)
    }
  }

  return files
}

const compressOneImage = async (imagePath: string): Promise<void> => {
  const extension = extname(imagePath).toLowerCase()
  const image = sharp(imagePath, {animated: extension === '.gif'})
  const tempOutputPath = join(
    TMP_OUTPUT_DIR,
    `${basename(imagePath)}.tmp-compress-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  )

  try {
    if (extension === '.jpg' || extension === '.jpeg') {
      await image.jpeg({quality: QUALITY, mozjpeg: true}).toFile(tempOutputPath)
    } else if (extension === '.png') {
      await image.png({quality: QUALITY}).toFile(tempOutputPath)
    } else if (extension === '.gif') {
      await image.gif({reuse: true}).toFile(tempOutputPath)
    }

    await rename(tempOutputPath, imagePath)
  } finally {
    await rm(tempOutputPath, {force: true}).catch(() => undefined)
  }
}

const runWithConcurrency = async (items: string[], concurrency: number): Promise<void> => {
  let index = 0

  const worker = async (): Promise<void> => {
    while (index < items.length) {
      const currentIndex = index++
      const filePath = items[currentIndex]

      try {
        await compressOneImage(filePath)
        console.log(`✓ ${filePath}`)
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        console.error(`✗ ${filePath}: ${message}`)
      }
    }
  }

  const workers = Array.from({length: Math.min(concurrency, items.length)}, () => worker())
  await Promise.all(workers)
}

const getImagesToCompress = async (inputPath: string): Promise<string[]> => {
  const inputStat = await stat(inputPath)

  if (inputStat.isDirectory()) {
    return collectImagesFromDirectory(inputPath)
  }

  if (inputStat.isFile() && isSupportedImage(inputPath)) {
    return [inputPath]
  }

  return []
}

const printUsage = (): void => {
  console.info(`Pass a directory or file path as a parameter.
Examples:
  node scripts/compress-images.ts ./static
  node scripts/compress-images.ts ./static/img/logo.png`)
}

async function main(): Promise<void> {
  const inputPath = process.argv[2]

  if (!inputPath) {
    printUsage()
    process.exit(0)
  }

  const images = await getImagesToCompress(inputPath)

  if (images.length === 0) {
    console.info(`No supported images found at "${inputPath}".`)
    process.exit(0)
  }

  await mkdir(TMP_OUTPUT_DIR, {recursive: true})
  console.log(`Found ${images.length} image(s), using up to ${Math.min(MAX_CONCURRENCY, images.length)} workers.`)
  await runWithConcurrency(images, MAX_CONCURRENCY)
  console.log('Done!')
}

try {
  await main()
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.error(message)
  process.exitCode = 1
}
