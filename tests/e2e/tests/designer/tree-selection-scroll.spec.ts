// eslint-disable-next-line import/no-extraneous-dependencies
import {expect, type Locator, test} from '@playwright/test'

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      ...Array.from({length: 50}, (_, index) => ({
        key: `button${index + 1}`,
        type: 'RsButton',
        props: {children: {value: `Button ${index + 1}`}},
      })),
      {
        key: 'parentContainer',
        type: 'RsContainer',
        children: [{key: 'nestedButton', type: 'RsButton', props: {children: {value: 'Nested button'}}}],
      },
    ],
  },
}

/** True when the row intersects its nearest vertical overflow ancestor (the tree scrollport). */
async function isInsideTreeScrollport(row: Locator) {
  return row.evaluate(el => {
    let parent = el.parentElement
    while (parent) {
      const {overflowY} = getComputedStyle(parent)
      if (/(auto|scroll|overlay)/.test(overflowY) && parent.scrollHeight > parent.clientHeight) {
        const port = parent.getBoundingClientRect()
        const box = el.getBoundingClientRect()
        return box.bottom > port.top && box.top < port.bottom
      }
      parent = parent.parentElement
    }
    return false
  })
}

test('scrolls the tree to the component selected on the canvas', {
  tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`],
}, async ({page}) => {
  await page.goto('/')
  await page.locator('.FE_MainMenu_Button').first().click()
  const chooser = page.waitForEvent('filechooser')
  await page.getByRole('menuitem', {name: 'Upload'}).click()
  await (await chooser).setFiles({
    name: 'form.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(form)),
  })

  await page.getByTestId('Tree_Tab').click()
  await page.getByRole('button', {name: 'Expand all', exact: true}).click()

  const nestedButton = page.getByTestId('nestedButton-editable-wrapper')
  const nestedRow = page.getByTestId('nestedButton')
  await expect.poll(() => isInsideTreeScrollport(nestedRow)).toBe(false)

  await nestedButton.click()
  await expect(nestedButton).toHaveClass(/\bselected\b/)
  await expect(nestedRow).toHaveClass(/\bselected\b/)
  await expect.poll(() => isInsideTreeScrollport(nestedRow)).toBe(true)

  await page.getByTestId('button1-editable-wrapper').click()
  await expect.poll(() => isInsideTreeScrollport(page.getByTestId('button1'))).toBe(true)

  await page.getByRole('button', {name: 'Collapse all', exact: true}).click()
  await expect(nestedRow).not.toBeAttached()
  await nestedButton.click()
  await expect.poll(() => isInsideTreeScrollport(nestedRow)).toBe(true)

  await page.getByTestId('Components_Tab').click()
  await page.getByTestId('button1-editable-wrapper').click()
  await expect(page.getByTestId('Components_Tab')).toHaveAttribute('aria-selected', 'true')
})
