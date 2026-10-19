// eslint-disable-next-line import/no-extraneous-dependencies
import {expect, test} from '@playwright/test'

const tags = ['@viewer', `@${process.env['TEST_TEMPLATE']}`, '@sortable-list']

const inputValues = async (page: import('@playwright/test').Page) => {
  return page.locator('input.rs-input').evaluateAll(inputs => inputs.map(input => (input as HTMLInputElement).value))
}

test.describe('SortableList reordering', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/?form=sortable-list')
    await expect(page.getByTestId('sortable-list-handle')).toHaveCount(3)
    await expect.poll(async () => inputValues(page)).toEqual(['Alpha', 'Beta', 'Gamma'])
  })

  test('reorders rows with the mouse', {tag: tags}, async ({page}) => {
    const handles = page.getByTestId('sortable-list-handle')
    const source = handles.nth(0)
    const target = handles.nth(2)

    const sourceBox = await source.boundingBox()
    const targetBox = await target.boundingBox()
    expect(sourceBox).toBeTruthy()
    expect(targetBox).toBeTruthy()

    await page.mouse.move(sourceBox!.x + sourceBox!.width / 2, sourceBox!.y + sourceBox!.height / 2)
    await page.mouse.down()
    await page.mouse.move(targetBox!.x + targetBox!.width / 2, targetBox!.y + targetBox!.height / 2, {steps: 12})
    await page.mouse.up()

    await expect.poll(async () => inputValues(page)).toEqual(['Beta', 'Gamma', 'Alpha'])
  })

  test('reorders rows with the keyboard', {tag: tags}, async ({page}) => {
    const firstHandle = page.getByTestId('sortable-list-handle').nth(0)
    const liveRegion = page.locator('[id^="dnd-kit-announcement"]')

    await firstHandle.focus()
    await page.keyboard.press('Space')
    await expect.poll(async () => liveRegion.textContent()).toMatch(/draggable item/i)
    await page.keyboard.press('ArrowDown')
    await expect.poll(async () => liveRegion.textContent()).toMatch(/droppable target/i)
    await page.keyboard.press('Space')

    await expect.poll(async () => inputValues(page)).toEqual(['Beta', 'Alpha', 'Gamma'])
  })
})
