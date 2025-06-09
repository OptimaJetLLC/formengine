// eslint-disable-next-line import/no-extraneous-dependencies
import {expect, test} from '@playwright/test'

test('has ant button', {
  tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`]
}, async ({page}) => {
  await page.goto('/')

  await expect(page.getByRole('button', {name: /Ant Button/})).toBeVisible()
})
