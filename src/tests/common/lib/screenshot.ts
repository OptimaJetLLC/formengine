import {Page} from '@playwright/test'
import {promises as fs} from 'fs'

const {writeFile, mkdir} = fs

export const viewportSizes = [
  [375, 812], // iphone
  [360, 800], // samsung
  [1366, 768],
  [1920, 1080],
  [2560, 1024],
  [5120, 1440]
]

export type ScreenshotImageInfo = {
  name: string,
  path: string
}

const renderResponsiveReport = (images: Array<ScreenshotImageInfo>): string => {
  const screenshots = images.map(({name, path}) => `<figure>
        <img src="${path}" alt="${name}" title="${name}" />
        <figcaption>${name}</figcaption>
    </figure>`)

  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test Report</title>
    </head>
    <body>
        <h1>Test Report</h1>
        <h2>Screenshots</h2>
        ${screenshots.join('')}
    </body>
    </html>`
}

export const writeResponsiveReport = async (folder: string, images: Array<ScreenshotImageInfo>): Promise<void> => {
  const content = renderResponsiveReport(images)

  try {
    await mkdir(folder, {recursive: true})
  } catch (e) {
    // @ts-ignore
    if (e?.code === 'EEXIST') {
      console.log('Directory already exists, skipping creation.')
    } else {
      console.error('Error creating directory:', e)
    }
  }

  return writeFile(`${folder}/index.html`, content)
}

// await page.setViewportSize(devices['iPhone X'].viewport);
export const testResponsive = async (folder: string, page: Page) => {
  await page.goto('/')

  const images: Array<ScreenshotImageInfo> = []
  const title = await page.title()

  for (const [width, height] of viewportSizes) {
    const dim = `${width}x${height}`
    const path = `${title}-${dim}.png`
    await page.setViewportSize({width, height})
    await page.screenshot()
    await page.screenshot({path: `${folder}/${path}`})
    images.push({
      name: dim,
      path
    })
  }

  await writeResponsiveReport(folder, images)
}
