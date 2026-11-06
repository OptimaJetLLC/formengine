// eslint-disable-next-line import/no-extraneous-dependencies
import {expect, test} from '@playwright/test'

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'input',
        type: 'RsInput',
        props: {label: {value: 'Input'}},
        htmlAttributes: [
          {name: 'title', value: 'Saved title'},
          {name: 'id', value: 'saved-id'},
        ],
      },
    ],
  },
}

test.describe('HTML attribute row deletion', {
  tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`],
}, () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/')
    await page.locator('.FE_MainMenu_Button').first().click()
    const chooser = page.waitForEvent('filechooser')
    await page.getByRole('menuitem', {name: 'Upload'}).click()
    await (await chooser).setFiles({
      name: 'attributes.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(form)),
    })
    await page.getByTestId('input-editable-wrapper').click()
  })

  test('removes a newly added row before Apply', async ({page}) => {
    const editor = page.getByTestId('htmlAttributes-labeled-wrapper').locator('..')
    const rows = editor.locator('.rs-table-body-row-wrapper [role="row"]')
    await editor.getByRole('button').last().click()
    await expect(rows).toHaveCount(3)
    // Pending resize and scroll updates can otherwise repaint a mutated array and mask the regression.
    await page.waitForTimeout(250)

    await rows.last().getByRole('button').click()

    await expect(rows).toHaveCount(2)
    await expect(rows.first().locator('input').last()).toHaveValue('Saved title')
    await expect(rows.last().locator('input').last()).toHaveValue('saved-id')
  })

  test('removes consecutive saved rows while Apply is pending', async ({page}) => {
    const editor = page.getByTestId('htmlAttributes-labeled-wrapper').locator('..')
    const rows = editor.locator('.rs-table-body-row-wrapper [role="row"]')
    await expect(rows).toHaveCount(2)
    await page.waitForTimeout(250)
    await rows.first().getByRole('button').click()
    await expect(rows).toHaveCount(1)
    await page.waitForTimeout(250)

    await rows.first().getByRole('button').click()

    await expect(rows).toHaveCount(0)
    await editor.getByRole('button', {name: 'Apply', exact: true}).click()
    await expect(page.getByTestId('input-editable-wrapper').locator('[title="Saved title"]')).toHaveCount(0)
    await expect(page.locator('#saved-id')).toHaveCount(0)
  })
})
