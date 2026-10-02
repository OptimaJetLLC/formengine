// eslint-disable-next-line import/no-extraneous-dependencies
import {expect, test} from '@playwright/test'

test('has hello input', {
  tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`],
}, async ({page}) => {
  await page.goto('/')

  await expect(page.locator('label:text-is("Title") + input')).toHaveValue('Hello! Hello!')
})
