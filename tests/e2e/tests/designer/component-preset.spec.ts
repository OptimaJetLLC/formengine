// eslint-disable-next-line import/no-extraneous-dependencies
import type {Page} from '@playwright/test'
import {expect, test} from '@playwright/test'
import {dragAndDrop} from './dragAndDrop'

const clearForm = async (page: Page) => {
  await page.locator('.FE_MainMenu_Button').first().hover()
  await page.mouse.down()
  await page.mouse.up()
  await page.getByTestId('main-menu-clear').click({force: true})
  await expect(page.getByTestId('add-button').first()).toBeVisible()
}

const shiftClick = async (locator: ReturnType<Page['getByTestId']>) => {
  await locator.evaluate(el => {
    el.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, shiftKey: true}))
  })
}

const assertPresetInsertedOntoClearedForm = async (page: Page) => {
  await expect(page.getByTestId('title-input')).toHaveCount(1)
  await expect(page.getByTestId('title-input')).toBeVisible()
  await expect(page.locator('span').filter({hasText: 'Ant Button'})).toBeVisible()
  await expect
    .poll(async () =>
      page.locator('[data-testid$="-editable-wrapper"]').evaluateAll(els => els.map(el => el.getAttribute('data-testid')).sort())
    )
    .toEqual(['Screen-editable-wrapper', 'antButton1-editable-wrapper', 'rsInput1-editable-wrapper'])
}

test.describe('Preset component', {
  tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`],
}, async () => {
  let page: Page
  test.describe.configure({mode: 'serial'})
  test.beforeAll(async ({browser}) => {
    page = await browser.newPage()
  })

  test('can be created', async () => {
    await page.goto('/')
    await page.getByTestId('Components_Tab').click({force: true})
    const existingPreset = page.locator('.FE_TestPreset')
    if (await existingPreset.count()) {
      await existingPreset.first().hover({force: true})
      await page.locator('.remove-preset-button.show').first().click({force: true})
      await expect(existingPreset).toHaveCount(0)
    }
    await page.getByTestId('AntButton 1-editable-wrapper').evaluate(el => {
      el.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}))
    })
    await shiftClick(page.getByTestId('title-editable-wrapper'))
    const toolbar = page.locator('[data-fe-toolbar]').first()
    await expect(toolbar).toHaveAttribute('data-fe-toolbar-ready', '')
    const actionsButton = toolbar.getByTestId('toolbar-actions-button')
    if ((await actionsButton.count()) > 0) await actionsButton.hover()
    await toolbar.getByTestId('toolbar-create-preset-button').dispatchEvent('click')
    await expect(page.getByTestId('AntButton 1-editable-wrapper')).toHaveClass(/\bselected\b/)
    await expect(page.getByTestId('title-editable-wrapper')).toHaveClass(/\bselected\b/)
    await expect(page.locator('[data-testid$="-editable-wrapper"].selected')).toHaveCount(2)
    await page.getByPlaceholder('Enter a preset name').fill('TestPreset')
    await page.locator('.rs-picker-search-input').first().fill('fields')
    await page.locator('button').filter({hasText: /^OK$/}).click({force: true})
    await expect(page.locator('.FE_TestPreset').first()).toBeVisible()
  })

  test('should be saved after the page is reloaded', async () => {
    await page.reload()
    await page.getByTestId('Components_Tab').click({force: true})
    await expect(page.locator('.FE_TestPreset').first()).toBeVisible()
  })

  test('can be added to the form from components modal', async () => {
    await clearForm(page)

    await page.getByTestId('add-button').first().dispatchEvent('pointerdown')
    await page.locator('.rs-modal-wrapper .FE_TestPreset').first().click({force: true})
    await expect(page.locator('.rs-modal-wrapper')).toHaveCount(0)

    await assertPresetInsertedOntoClearedForm(page)
  })

  test('can be dragged to the form from components tab', async () => {
    await clearForm(page)

    const preset = page.locator('.FE_TestPreset').first()
    const addButton = page.getByTestId('add-button').first()

    await dragAndDrop(page, preset, addButton)

    await assertPresetInsertedOntoClearedForm(page)
  })

  test('can be removed', async () => {
    await page.locator('.FE_TestPreset').first().hover({force: true})
    await page.locator('.remove-preset-button.show').first().click({force: true})
    await expect(page.locator('.FE_TestPreset')).not.toBeAttached()
  })
})
