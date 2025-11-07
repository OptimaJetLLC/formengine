// eslint-disable-next-line import/no-extraneous-dependencies
import {expect, test} from '@playwright/test'
import type {Page} from 'playwright'

const clearForm = async (page: Page) => {
  await page.locator('.FE_MainMenu_Button').first().hover()
  await page.mouse.down()
  await page.mouse.up()
  await page.getByText('Clear').first().click({force: true})
}

test.describe('Preset component', {
  tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`]
}, async () => {
  let page: Page
  test.describe.configure({mode: 'serial'})
  test.beforeAll(async ({browser}) => {
    page = await browser.newPage()
  })

  test('can be created', async () => {
    await page.goto('/')
    await page.getByTestId('ant-button').click({force: true})
    await page.keyboard.down('Shift')
    await page.getByTestId('title-input').click({force: true})
    await page.keyboard.up('Shift')

    await page.locator('.create-preset-button').first().click({force: true})
    await page.getByPlaceholder('Enter a preset name').fill('TestPreset')
    await page.locator('.rs-picker-search-input').first().fill('fields')
    await page.locator('button').filter({hasText: /^OK$/}).click({force: true})
  })

  test('should be saved after the page is reloaded', async () => {
    await page.reload()
    await expect(page.locator('.FE_TestPreset').first()).toBeVisible()
  })

  test('can be added to the form from components modal', async () => {
    await clearForm(page)

    await page.locator('.isRoot.isInner button').first().click({force: true})
    await page.locator('.rs-modal-wrapper .FE_TestPreset').first().click({force: true})

    await expect(page.getByTestId('title-input')).toBeVisible()
    await expect(page.locator('span').filter({hasText: 'Ant Button'})).toBeVisible()
  })

  test('can be dragged to the form from components tab', async () => {
    await clearForm(page)

    await page.locator('.FE_TestPreset').first().hover({force: true})
    await page.mouse.down()
    await page.locator('.isRoot.isInner button').first().hover({force: true})
    await page.mouse.up()

    await expect(page.getByTestId('title-input')).toBeVisible()
    await expect(page.locator('span').filter({hasText: 'Ant Button'})).toBeVisible()
  })

  test('can be removed', async () => {
    await page.locator('.FE_TestPreset').first().hover({force: true})
    await page.locator('.remove-preset-button.show').first().click({force: true})
    await expect(page.locator('.FE_TestPreset')).not.toBeAttached()
  })
})
