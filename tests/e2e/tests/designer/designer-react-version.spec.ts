import {expect, test} from '@playwright/test'

test('Check React version', {
  tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`, `@${process.env['TEST_REACT_VERSION']}`],
}, async ({page}) => {
  await page.goto('/')

  const expectedText = `React version: ${process.env['TEST_REACT_VERSION'] ?? '17.0.2'}`
  await expect(page.getByTestId('reactVersion')).toContainText(expectedText)
})
