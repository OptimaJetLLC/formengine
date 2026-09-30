// eslint-disable-next-line import/no-extraneous-dependencies
import type {Page} from '@playwright/test'
import {expect, test} from '@playwright/test'

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'rsTable1',
        type: 'RsTable',
        children: [
          {
            key: 'rsColumn1',
            type: 'RsColumn',
            children: [
              {key: 'filledHeader', type: 'RsHeaderCell', props: {children: {value: 'Name'}}},
              {
                key: 'filledCell',
                type: 'RsCell',
                children: [{key: 'cellInput', type: 'RsInput', props: {label: {value: 'Name'}}}],
              },
            ],
          },
        ],
      },
    ],
  },
}

const selectedClass = /(^|\s)selected(\s|$)/

const uploadForm = async (page: Page) => {
  await page.locator('.FE_MainMenu_Button').first().click()
  const chooser = page.waitForEvent('filechooser')
  await page.getByRole('menuitem', {name: 'Upload'}).click()
  await (await chooser).setFiles({
    name: 'form.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(form)),
  })
  await expect(page.getByTestId('filledCell-editable-wrapper')).toBeVisible()
}

test(
  'selects a component inside a table cell and the cell around it',
  {
    tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`],
  },
  async ({page}) => {
    await page.goto('/')
    await uploadForm(page)

    const cell = page.getByTestId('filledCell-editable-wrapper')
    const input = page.getByTestId('cellInput-editable-wrapper')
    const header = page.getByTestId('filledHeader-editable-wrapper')

    await input.click()
    await expect(input).toHaveClass(selectedClass)
    await expect(cell).not.toHaveClass(selectedClass)

    await cell.click({position: {x: 4, y: 4}})
    await expect(cell).toHaveClass(selectedClass)
    await expect(input).not.toHaveClass(selectedClass)

    await header.click()
    await expect(header).toHaveClass(selectedClass)
    await expect(cell).not.toHaveClass(selectedClass)
  }
)
