import type {Locator, Page} from '@playwright/test'

const maxRetryTime = 2000
const retryDelay = 50
const moveSteps = 10

const getCenter = async (page: Page, locator: Locator): Promise<{x: number; y: number}> => {
  const deadline = Date.now() + maxRetryTime
  for (;;) {
    try {
      await locator.scrollIntoViewIfNeeded()
      const box = await locator.boundingBox()
      if (!box) throw new Error('The element is not visible')
      return {x: box.x + box.width / 2, y: box.y + box.height / 2}
    } catch (error) {
      if (Date.now() >= deadline) throw error
      await page.waitForTimeout(retryDelay)
    }
  }
}

const isPointerOver = async (locator: Locator, point: {x: number; y: number}): Promise<boolean> => {
  return await locator.evaluate((element, {x, y}) => {
    const hit = document.elementFromPoint(x, y)
    return !!hit && (hit === element || element.contains(hit))
  }, point)
}

/**
 * Drags the source element to the center of the target element using the mouse.
 *
 * The designer relies on the HTML5 drag and drop API and renders the drop zones above the form elements
 * as soon as the drag starts, so the usual hover action cannot be used to move the pointer to the target:
 * the pointer events check fails on the drop zones.
 * The drop point is calculated before the drag starts because the designer re-renders the form elements during the drag.
 * The pointer is placed on the source element only while this element is actually under it, because the palette
 * can be re-rendered right after the page is loaded.
 * The mouse is moved in several steps because a single move does not always produce the drag events
 * the drop zones expect and the component may not be dropped.
 * @param page the page to drag on.
 * @param source the element to drag.
 * @param target the element to drop on.
 * @see https://playwright.dev/docs/input#drag-and-drop
 * @see https://github.com/microsoft/playwright/issues/19892
 * @see https://stackoverflow.com/questions/64718915/playwright-drag-and-drop
 */
export const dragAndDrop = async (page: Page, source: Locator, target: Locator): Promise<void> => {
  const targetPoint = await getCenter(page, target)

  const deadline = Date.now() + maxRetryTime
  for (;;) {
    const sourcePoint = await getCenter(page, source)
    await page.mouse.move(sourcePoint.x, sourcePoint.y)
    if (await isPointerOver(source, sourcePoint)) break
    if (Date.now() >= deadline) throw new Error('The drag source is not under the pointer')
    await page.waitForTimeout(retryDelay)
  }

  await page.mouse.down()
  await page.mouse.move(targetPoint.x, targetPoint.y, {steps: moveSteps})
  await page.mouse.up()
}
