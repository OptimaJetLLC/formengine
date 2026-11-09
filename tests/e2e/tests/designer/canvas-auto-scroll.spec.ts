// eslint-disable-next-line import/no-extraneous-dependencies
import {expect, test} from '@playwright/test'

for (const afterPreview of [false, true]) {
  test(`scrolls only the builder canvas${afterPreview ? ' after returning from preview' : ''}`, {
    tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`],
  }, async ({page}) => {
    await page.goto('/')

    const source = page.getByTestId('RsCalendar-palette-component')
    await expect(source).toBeVisible()

    const canvas = page.locator('.FE_CentralPanel [data-fe-canvas]').first()
    await expect(canvas).toBeAttached()

    if (afterPreview) {
      await page.getByRole('button', {name: 'Preview', exact: true}).click()
      await page.getByRole('button', {name: 'Edit', exact: true}).click()
      await expect(source).toBeVisible()
    }

    await expect
      .poll(async () => {
        try {
          await source.scrollIntoViewIfNeeded()
          return await source.boundingBox()
        } catch {
          return null
        }
      })
      .not.toBeNull()

    const sourceBox = await source.boundingBox()
    if (!sourceBox) throw new Error('The drag source is not visible')

    const edgePoint = await canvas.evaluate(canvasElement => {
      const builderCanvas = canvasElement as HTMLElement
      const rect = builderCanvas.getBoundingClientRect()
      const left = rect.left + builderCanvas.clientLeft
      const top = rect.top + builderCanvas.clientTop

      builderCanvas.dataset.autoScrollCalls = '0'
      builderCanvas.dataset.testid = 'builder-auto-scroll-canvas'
      builderCanvas.scrollBy = () => {
        builderCanvas.dataset.autoScrollCalls = String(Number(builderCanvas.dataset.autoScrollCalls) + 1)
      }

      const viewerCanvas = document.createElement('div')
      viewerCanvas.dataset.feCanvas = ''
      viewerCanvas.dataset.testid = 'separate-viewer-canvas'
      viewerCanvas.dataset.autoScrollCalls = '0'
      Object.assign(viewerCanvas.style, {
        position: 'fixed',
        left: `${left}px`,
        top: `${top}px`,
        width: `${builderCanvas.clientWidth}px`,
        height: `${builderCanvas.clientHeight}px`,
        opacity: '0',
        pointerEvents: 'auto',
        zIndex: '5',
      })
      viewerCanvas.scrollBy = () => {
        viewerCanvas.dataset.autoScrollCalls = String(Number(viewerCanvas.dataset.autoScrollCalls) + 1)
      }
      document.body.prepend(viewerCanvas)

      const nestedCanvas = document.createElement('div')
      nestedCanvas.dataset.feCanvas = ''
      nestedCanvas.dataset.testid = 'nested-viewer-canvas'
      nestedCanvas.dataset.autoScrollCalls = '0'
      nestedCanvas.scrollBy = () => {
        nestedCanvas.dataset.autoScrollCalls = String(Number(nestedCanvas.dataset.autoScrollCalls) + 1)
      }
      builderCanvas.prepend(nestedCanvas)

      return {
        x: left + builderCanvas.clientWidth - 5,
        y: top + builderCanvas.clientHeight / 2,
      }
    })

    await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2)
    await page.mouse.down()
    await page.mouse.move(edgePoint.x, edgePoint.y, {steps: 50})

    await expect
      .poll(() =>
        page.evaluate(() =>
          Number(document.querySelector<HTMLElement>('[data-testid="builder-auto-scroll-canvas"]')?.dataset.autoScrollCalls)
        )
      )
      .toBeGreaterThan(0)

    await page.mouse.up()

    const callsAfterDrop = await canvas.evaluate(async canvasElement => {
      const calls: number[] = []
      for (let frame = 0; frame < 4; frame++) {
        await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
        calls.push(Number((canvasElement as HTMLElement).dataset.autoScrollCalls))
      }
      return calls
    })
    expect(callsAfterDrop.every(count => count === callsAfterDrop[0])).toBe(true)

    const scrollCalls = await page.evaluate(() => ({
      builder: Number(document.querySelector<HTMLElement>('[data-testid="builder-auto-scroll-canvas"]')?.dataset.autoScrollCalls),
      viewer: Number(document.querySelector<HTMLElement>('[data-testid="separate-viewer-canvas"]')?.dataset.autoScrollCalls),
      nestedViewer: Number(document.querySelector<HTMLElement>('[data-testid="nested-viewer-canvas"]')?.dataset.autoScrollCalls),
    }))

    expect(scrollCalls.viewer).toBe(0)
    expect(scrollCalls.nestedViewer).toBe(0)
    expect(scrollCalls.builder).toBeGreaterThan(0)
  })
}
