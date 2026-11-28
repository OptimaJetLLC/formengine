// eslint-disable-next-line import/no-extraneous-dependencies
import type {Page} from '@playwright/test'
import {expect, test} from '@playwright/test'

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
        children: [
          {
            key: 'mtCheckbox1',
            type: 'MtCheckbox',
            props: {},
            slot: 'leftSection',
          },
        ],
      },
      {
        key: 'mtContainer1',
        type: 'MtContainer',
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
    name: 'mt-button-nested.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(form)),
  })
  await expect(page.getByTestId('mtCheckbox1-editable-wrapper')).toBeVisible()
  await expect(page.getByTestId('mtContainer1-editable-wrapper')).toBeVisible()
}

test.describe('MtButton nested slot drag', {
  tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`],
}, () => {
  test.describe.configure({mode: 'serial'})

  test('keeps nested checkbox selected after mouseup', async ({page}) => {
    await page.goto('/')
    await uploadForm(page)

    const button = page.getByTestId('mtButton1-editable-wrapper')
    const checkbox = page.getByTestId('mtCheckbox1-editable-wrapper')
    const overlay = checkbox.locator(':scope > [data-fe-drag-overlay]')

    await overlay.hover()
    await page.mouse.down()
    await page.mouse.up()

    await expect(checkbox).toHaveClass(selectedClass)
    await expect(button).not.toHaveClass(selectedClass)
  })

  test('drags nested leftSection checkbox into a sibling container with the mouse', async ({page}) => {
    await page.goto('/')
    await uploadForm(page)

    const button = page.getByTestId('mtButton1-editable-wrapper')
    const checkbox = page.getByTestId('mtCheckbox1-editable-wrapper')
    const container = page.getByTestId('mtContainer1-editable-wrapper')
    const innerDrop = container.getByTestId('inner-dropzone')

    await expect(button.getByTestId('mtCheckbox1-editable-wrapper')).toBeVisible()

    // Real HTML5 mouse drag — parent MtButton must not steal the gesture.
    // Retarget after dragstart: during drag the designer inserts before/after zones that
    // shift layout, so the pre-drag inner-dropzone center is no longer valid.
    const sourceBox = await checkbox.boundingBox()
    if (!sourceBox) throw new Error('missing checkbox')
    const sx = sourceBox.x + sourceBox.width / 2
    const sy = sourceBox.y + sourceBox.height / 2
    await page.mouse.move(sx, sy)
    await page.mouse.down()
    await page.mouse.move(sx + 12, sy + 12, {steps: 5})
    const dropBox = await innerDrop.boundingBox()
    if (!dropBox) throw new Error('missing inner dropzone')
    await page.mouse.move(dropBox.x + dropBox.width / 2, dropBox.y + dropBox.height * 0.7, {
      steps: 10,
    })
    await page.mouse.up()

    await expect(container.getByTestId('mtCheckbox1-editable-wrapper')).toBeVisible()
    await expect(button.getByTestId('mtCheckbox1-editable-wrapper')).toHaveCount(0)
    // Parent button must stay on the canvas (not dragged into the container).
    await expect(page.getByTestId('mtButton1-editable-wrapper')).toBeVisible()
    await expect(container.getByTestId('mtButton1-editable-wrapper')).toHaveCount(0)

    // Page must stay interactive after the drop (no disarm/rAF hang).
    await button.click()
    await expect(button).toHaveClass(selectedClass)
  })
})
