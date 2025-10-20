// eslint-disable-next-line import/no-extraneous-dependencies
import {expect, test} from '@playwright/test'

// https://github.com/microsoft/playwright/issues/19892
// https://stackoverflow.com/questions/64718915/playwright-drag-and-drop
// https://playwright.dev/docs/input#drag-and-drop

test('can drop component', {
  tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`]
}, async ({page}) => {
  await page.goto('/')

  await page.locator('div').filter({hasText: /^Calendar$/}).nth(1).hover()
  await page.mouse.down()
  await page.locator('div').filter({hasText: /^one\/two\/three$/}).locator('div').first().hover()
  await page.mouse.up()

  await expect(page.locator('div').filter({hasText: /^rsCalendar1 \(RsCalendar\)$/})).toBeVisible()
})
