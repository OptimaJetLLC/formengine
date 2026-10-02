// eslint-disable-next-line import/no-extraneous-dependencies
import {expect, test} from '@playwright/test'
import {dragAndDrop} from './dragAndDrop'

test('can drop component', {
  tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`],
}, async ({page}) => {
  await page.goto('/')

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

  await expect(page.locator('.FE_Component_Toolbar').filter({hasText: /^rsCalendar1$/})).toBeVisible()
})
