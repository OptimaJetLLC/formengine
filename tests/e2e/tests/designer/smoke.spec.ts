// eslint-disable-next-line import/no-extraneous-dependencies
import {expect, test} from '@playwright/test'

test('it starts', {
  tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`],
}, async ({page}) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Form Builder/)
})
