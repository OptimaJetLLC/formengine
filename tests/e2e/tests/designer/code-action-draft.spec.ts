// eslint-disable-next-line import/no-extraneous-dependencies
import type {Locator, Page} from '@playwright/test'
import {expect, test} from '@playwright/test'

const actionName = 'draftAction'
const savedCode = "console.log('saved');"
const draftCode = "console.log('draft');"
const functionSignature = 'async function Action'

const monacoLines = (page: Page) => page.locator('.monaco-editor .view-lines').first()

const normalizeMonacoLine = (line: string) => line.replace(/\u00a0/g, ' ')

const editableBodyStartIndex = (lines: string[]) => {
  const signatureIndex = lines.findIndex(line => normalizeMonacoLine(line).includes(functionSignature))
  expect(signatureIndex).toBeGreaterThanOrEqual(0)
  return signatureIndex + 1
}

const editableBodyLines = async (editorLines: Locator) => {
  const lines = await editorLines.locator('.view-line').allTextContents()
  return lines.slice(editableBodyStartIndex(lines), -1)
}

const firstEditableBodyLine = async (editorLines: Locator) => {
  const lines = await editorLines.locator('.view-line').allTextContents()
  return editorLines.locator('.view-line').nth(editableBodyStartIndex(lines))
}

const replaceCode = async (page: Page, code: string) => {
  await page.locator('.monaco-editor').first().click()
  // Monaco chooses its key bindings from the emulated browser platform.
  const isMac = await page.evaluate(() => navigator.userAgent.includes('Macintosh'))
  await page.keyboard.press(isMac ? 'Meta+A' : 'Control+A')
  if (code) {
    await page.keyboard.insertText(code)
  } else {
    await page.keyboard.press('Backspace')
  }
}

const saveAndReopenAction = async (page: Page) => {
  await page.getByTestId('save-code-action-button').click()
  await page.getByRole('button', {name: 'Close', exact: true}).click()
  await page.getByTestId(`edit-action-${actionName}`).click()
  await expect(monacoLines(page)).toContainText(functionSignature, {timeout: 30000})
}

test.describe('Code action drafts', {
  tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`],
}, () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/')
    await page.getByTestId('Settings_Tab').click()
    await page.getByRole('button', {name: 'Add a code action', exact: true}).click()
    await page.locator('input[name="name"]').fill(actionName)
    await expect(monacoLines(page)).toContainText(functionSignature, {timeout: 30000})
  })

  test('preserves unsaved code through parameter changes and saves the current draft', async ({page}) => {
    const editorLines = monacoLines(page)
    await replaceCode(page, savedCode)
    await saveAndReopenAction(page)
    await expect(editorLines).toContainText(savedCode)
    await replaceCode(page, draftCode)
    await expect(editorLines).toContainText(draftCode)
    await expect(editorLines).not.toContainText(savedCode)

    await page.getByRole('button', {name: 'Add', exact: true}).click()
    await expect(editorLines).toContainText('prop1: string')
    await expect(editorLines).toContainText(draftCode)
    await expect(editorLines).not.toContainText(savedCode)

    await page.getByText('prop1: string', {exact: true}).click()
    await page.getByRole('textbox', {name: 'Name', exact: true}).fill('message')
    await expect(editorLines).toContainText('message: string')
    await expect(editorLines).toContainText(draftCode)

    await page.getByRole('combobox', {name: 'Type', exact: true}).click()
    await page.getByRole('option', {name: 'number', exact: true}).click()
    await expect(editorLines).toContainText('message: number')
    await expect(editorLines).toContainText(draftCode)

    await page.getByRole('button', {name: 'Add', exact: true}).click()
    const extraParameter = page.getByText('prop1: string', {exact: true})
    await expect(editorLines).toContainText('message: number, prop1: string')
    await extraParameter.locator('..').locator('svg[aria-label="close"]').click()
    await expect(extraParameter).not.toBeVisible()
    await expect(editorLines).toContainText('message: number')
    await expect(editorLines).not.toContainText('prop1: string')
    await expect(editorLines).toContainText(draftCode)

    const finalCode = "console.log(args.message, 'final draft');"
    await replaceCode(page, finalCode)
    await saveAndReopenAction(page)
    await expect(editorLines).toContainText(finalCode)
    await expect(editorLines).not.toContainText(savedCode)
    await expect(editorLines).toContainText('message: number')
    await expect(page.getByText('message: number', {exact: true})).toBeVisible()
  })

  test('preserves a multiline new action draft before its first save', async ({page}) => {
    const editorLines = monacoLines(page)
    await replaceCode(page, `\n${draftCode}\nconsole.log('second line');\n`)
    const bodyLines = await editableBodyLines(editorLines)
    await page.getByRole('button', {name: 'Add', exact: true}).click()
    await expect(editorLines).toContainText(draftCode)
    await expect(editorLines).toContainText('prop1: string')
    await expect.poll(() => editableBodyLines(editorLines)).toEqual(bodyLines)
    await saveAndReopenAction(page)
    await expect(editorLines).toContainText(draftCode)
    await expect(editorLines).toContainText("console.log('second line');")
    await expect(page.getByText('prop1: string', {exact: true})).toBeVisible()
  })

  test('preserves an intentionally empty draft when parameters change', async ({page}) => {
    const editorLines = monacoLines(page)
    await replaceCode(page, savedCode)
    await saveAndReopenAction(page)
    await expect(editorLines).toContainText(savedCode)
    await replaceCode(page, '')
    await expect(await firstEditableBodyLine(editorLines)).toHaveText('')
    await page.getByRole('button', {name: 'Add', exact: true}).click()
    await expect(editorLines).toContainText('prop1: string')
    await expect(editorLines).not.toContainText(savedCode)
    await expect(await firstEditableBodyLine(editorLines)).toHaveText('')
    await saveAndReopenAction(page)
    await expect(editorLines).not.toContainText(savedCode)
    await expect(await firstEditableBodyLine(editorLines)).toHaveText('')
  })

  test('preserves the draft after removing every parameter', async ({page}) => {
    const editorLines = monacoLines(page)
    await replaceCode(page, draftCode)
    await page.getByRole('button', {name: 'Add', exact: true}).click()
    const parameter = page.getByText('prop1: string', {exact: true})
    await expect(editorLines).toContainText('prop1: string')
    await expect(editorLines).toContainText(draftCode)
    await parameter.locator('..').locator('svg[aria-label="close"]').click()
    await expect(parameter).not.toBeVisible()
    await expect(editorLines).not.toContainText('prop1: string')
    await expect(editorLines).toContainText('@param {} args')
    await expect(editorLines).toContainText(draftCode)
  })

  test('discards an unsaved draft when the action is closed without saving', async ({page}) => {
    const editorLines = monacoLines(page)
    await replaceCode(page, savedCode)
    await saveAndReopenAction(page)
    await replaceCode(page, draftCode)
    await expect(editorLines).toContainText(draftCode)
    await page.getByRole('button', {name: 'Close', exact: true}).click()
    await page.getByTestId(`edit-action-${actionName}`).click()
    await expect(editorLines).toContainText(functionSignature, {timeout: 30000})
    await expect(editorLines).toContainText(savedCode)
    await expect(editorLines).not.toContainText(draftCode)
  })

  test('preserves the draft when the action is renamed before save', async ({page}) => {
    const renamedAction = 'renamedDraftAction'
    const editorLines = monacoLines(page)
    await replaceCode(page, draftCode)
    await page.locator('input[name="name"]').fill(renamedAction)
    await expect(editorLines).toContainText(draftCode)
    await page.getByTestId('save-code-action-button').click()
    await page.getByRole('button', {name: 'Close', exact: true}).click()
    await page.getByTestId(`edit-action-${renamedAction}`).click()
    await expect(editorLines).toContainText(functionSignature, {timeout: 30000})
    await expect(editorLines).toContainText(draftCode)
    await expect(page.locator('input[name="name"]')).toHaveValue(renamedAction)
  })
})
