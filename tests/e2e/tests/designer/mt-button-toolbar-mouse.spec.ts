// eslint-disable-next-line import/no-extraneous-dependencies
import type {Page} from '@playwright/test'
import {expect, test} from '@playwright/test'

/** Exact reproduction form from https://github.com/OptimaJetLLC/formengine/pull/41#issuecomment-7223970503 */
const form = {
  version: '1',
  tooltipType: 'MtTooltip',
  modalType: 'MtDialog',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'mtButton1',
        type: 'MtButton',
        props: {},
      },
    ],
  },
  languages: [
    {
      code: 'en',
      dialect: 'US',
      name: 'English',
      description: 'American English',
      bidi: 'ltr',
    },
  ],
  defaultLanguage: 'en-US',
}

const selectedClass = /(^|\s)selected(\s|$)/

const uploadForm = async (page: Page) => {
  await page.locator('.FE_MainMenu_Button').first().click({force: true})
  const chooser = page.waitForEvent('filechooser')
  await page.getByRole('menuitem', {name: 'Upload'}).click({force: true})
  await (await chooser).setFiles({
    name: 'mt-button-toolbar.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(form)),
  })
  await expect(page.getByTestId('mtButton1-editable-wrapper')).toBeVisible()
}

const selectButton = async (page: Page) => {
  await page.getByTestId('mtButton1-editable-wrapper').click()
  await expect(page.getByTestId('mtButton1-editable-wrapper')).toHaveClass(selectedClass)
  const toolbar = page.locator('[data-fe-toolbar]')
  await expect(toolbar).toHaveAttribute('data-fe-toolbar-ready', '')
  const actionsButton = toolbar.getByTestId('toolbar-actions-button')
  if ((await actionsButton.count()) > 0) await actionsButton.hover()
}

test.describe('MtButton floating toolbar mouse actions', {
  tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`],
}, () => {
  test.describe.configure({mode: 'serial'})

  test('clones mtButton1 with a real mouse click on Clone', async ({page}) => {
    await page.goto('/')
    await uploadForm(page)
    await selectButton(page)

    await page.getByTestId('tree-clone-button').click()

    await expect(page.getByTestId('mtButton1-editable-wrapper')).toBeVisible()
    await expect(page.getByTestId('mtButton2-editable-wrapper')).toBeVisible()
    await expect(page.getByTestId('Screen-editable-wrapper')).not.toHaveClass(selectedClass)
  })

  test('removes mtButton1 with a real mouse click on Remove', async ({page}) => {
    await page.goto('/')
    await uploadForm(page)
    await selectButton(page)

    await page.getByTestId('toolbar-remove-button').click()

    await expect(page.getByTestId('mtButton1-editable-wrapper')).toHaveCount(0)
    await expect(page.locator('[data-fe-toolbar]').filter({hasText: 'mtButton1'})).toHaveCount(0)
  })

  test('opens Add menu for mtButton1 with a real mouse click', async ({page}) => {
    await page.goto('/')
    await uploadForm(page)
    await selectButton(page)

    await page.locator('[data-fe-toolbar] .add-button').click()

    await expect(page.getByRole('button', {name: 'After'})).toBeVisible()
    await expect(page.getByTestId('mtButton1-editable-wrapper')).toHaveClass(selectedClass)
    await expect(page.getByTestId('Screen-editable-wrapper')).not.toHaveClass(selectedClass)
  })
})
