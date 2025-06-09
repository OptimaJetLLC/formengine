// eslint-disable-next-line import/no-extraneous-dependencies
import {expect, test} from '@playwright/test'

test('it starts', {
  tag: ['@viewer', `@${process.env['TEST_TEMPLATE']}`]
}, async ({page}) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Form Viewer/)
})
