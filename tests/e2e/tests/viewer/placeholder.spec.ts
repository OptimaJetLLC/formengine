// eslint-disable-next-line import/no-extraneous-dependencies
import {expect, test} from '@playwright/test'

test('has input with placeholder', {
  tag: ['@viewer', `@${process.env['TEST_TEMPLATE']}`],
}, async ({page}) => {
  await page.goto('/')
  await expect(page.locator('label:text-is("Name") + input')).toHaveAttribute('placeholder', 'Enter your name')
})
