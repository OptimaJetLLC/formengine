// eslint-disable-next-line import/no-extraneous-dependencies
import type {Page} from '@playwright/test'
import {expect, test} from '@playwright/test'
import {dragAndDrop} from './dragAndDrop'

declare global {
  interface Window {
    __formBuilderAddCalls?: Array<{sourceType?: string; targetKey?: string}>
    __formBuilderRemoveCalls?: Array<{sourceKey?: string}>
  }
}

const clearRecordedCalls = async (page: Page) => {
  await page.evaluate(() => {
    if (typeof window !== 'undefined') {
      window.__formBuilderAddCalls = []
      window.__formBuilderRemoveCalls = []
    }
  })
}

const clearForm = async (page: Page) => {
  await page.locator('.FE_MainMenu_Button').first().hover()
  await page.mouse.down()
  await page.mouse.up()
  await page.getByText('Clear').first().click({force: true})
}

test.describe(
  'onFormElementAdd and onFormElementRemove callbacks',
  {
    tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`],
  },
  () => {
    test.beforeEach(async ({page}) => {
      await page.goto('/')
    })

    test('onFormElementAdd is called when adding a component via ComponentsModal', async ({page}) => {
      await clearForm(page)
      await clearRecordedCalls(page)

      await page.locator('.isRoot.isInner button').first().click({force: true})
      await page
        .locator('.rs-modal-wrapper')
        .locator('div')
        .filter({hasText: /^Calendar$/})
        .first()
        .click({force: true})

      await expect(page.getByTestId('rsCalendar1-editable-wrapper')).toBeVisible()
      await expect(page.locator('[data-fe-toolbar-ready]').getByText('rsCalendar1')).toBeVisible()

      const addCalls = await page.evaluate(() => window.__formBuilderAddCalls ?? [])
      expect(addCalls.length).toBeGreaterThanOrEqual(1)
      expect(addCalls.some(c => c.sourceType === 'RsCalendar')).toBe(true)
    })

    test('onFormElementAdd is called when adding a component via drag and drop', async ({page}) => {
      await clearRecordedCalls(page)

      const calendar = page
        .locator('div')
        .filter({hasText: /^Calendar$/})
        .nth(1)

      const breadcrumb = page
        .locator('div')
        .filter({hasText: /^one\/two\/three$/})
        .locator('div')
        .first()

      await dragAndDrop(page, calendar, breadcrumb)

      const addCalls = await page.evaluate(() => window.__formBuilderAddCalls ?? [])
      expect(addCalls.length).toBeGreaterThanOrEqual(1)
      expect(addCalls.some(c => c.sourceType === 'RsCalendar')).toBe(true)
    })

    test('onFormElementRemove is called when removing a component', async ({page}) => {
      await clearRecordedCalls(page)

      const calendar = page
        .locator('div')
        .filter({hasText: /^Calendar$/})
        .nth(1)

      const breadcrumb = page
        .locator('div')
        .filter({hasText: /^one\/two\/three$/})
        .locator('div')
        .first()

      await dragAndDrop(page, calendar, breadcrumb)

      await expect(page.getByTestId('rsCalendar1-editable-wrapper')).toBeVisible()

      await page.getByTestId('rsCalendar1-editable-wrapper').click({force: true})
      const toolbar = page.locator('[data-fe-toolbar]')
      await expect(toolbar).toHaveAttribute('data-fe-toolbar-ready', '')
      const actionsButton = toolbar.getByTestId('toolbar-actions-button')
      if ((await actionsButton.count()) > 0) await actionsButton.hover()
      const removeButton = toolbar.getByTestId('toolbar-remove-button')
      await expect(removeButton).toBeVisible()
      await removeButton.dispatchEvent('click')

      const removeCalls = await page.evaluate(() => window.__formBuilderRemoveCalls ?? [])
      expect(removeCalls.length).toBeGreaterThanOrEqual(1)
      expect(removeCalls.some(c => c.sourceKey === 'rsCalendar1')).toBe(true)
    })
  }
)
