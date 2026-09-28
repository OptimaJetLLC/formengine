// eslint-disable-next-line import/no-extraneous-dependencies
import type {Locator, Page} from '@playwright/test'
import {expect, test} from '@playwright/test'

const componentCss = 'outline: 3px solid magenta;'
const wrapperCss = 'outline: 3px dashed lime;'

type StyleCodeEditorKind = {
  testId: 'css-editor' | 'style-editor'
  cleanButtonTestId: 'css-editor-clean-button' | 'style-editor-clean-button'
  contextLine: string
}

const cssEditorKind: StyleCodeEditorKind = {
  testId: 'css-editor',
  cleanButtonTestId: 'css-editor-clean-button',
  contextLine: 'element.style',
}

const styleEditorKind: StyleCodeEditorKind = {
  testId: 'style-editor',
  cleanButtonTestId: 'style-editor-clean-button',
  contextLine: 'style {',
}

const openStyleCodeEditor = async (page: Page, selectComponent: () => Promise<void>, kind: StyleCodeEditorKind) => {
  await selectComponent()
  await page.getByTestId('Style_Tab').click({force: true})

  const editor = page.getByTestId(kind.testId)
  await expect(editor).toBeVisible({timeout: 15000})
  await expect(editor.locator('.monaco-editor').first()).toBeVisible({timeout: 30000})
  await expect(editor.locator('.view-lines').first()).toContainText(kind.contextLine, {timeout: 30000})

  return editor
}

const monacoLines = (editor: Locator) => editor.locator('.monaco-editor .view-lines').first()

const editorTab = (editor: Locator, name: 'Component' | 'Wrapper') => editor.getByRole('radiogroup').getByText(name, {exact: true})

const typeCssInMonaco = async (editor: Locator, page: Page, css: string) => {
  await editor.locator('.monaco-editor').first().click()
  await page.keyboard.press('ControlOrMeta+A')
  await page.keyboard.type(css)
  await expect(monacoLines(editor)).toContainText(css)
}

const selectTitleInput = async (page: Page) => {
  await page.getByTestId('title-input').click({force: true})
}

const selectStyledBox = async (page: Page) => {
  await page.getByPlaceholder('Search...').fill('StyledBox')
  await page
    .locator('div')
    .filter({hasText: /^StyledBox$/})
    .last()
    .hover()
  await page.mouse.down()
  await page
    .locator('div')
    .filter({hasText: /^one\/two\/three$/})
    .locator('div')
    .first()
    .hover()
  await page.mouse.up()
  await page.getByText(/ \(StyledBox\)$/).click({force: true})
}

const expectResetClearsCurrentTab = async (page: Page, editor: Locator, kind: StyleCodeEditorKind, css: string, contextLine: string) => {
  await typeCssInMonaco(editor, page, css)
  await page.getByTestId(kind.cleanButtonTestId).click({force: true})
  await expect(monacoLines(editor)).not.toContainText(css)
  await expect(monacoLines(editor)).toContainText(contextLine)
}

const expectResetKeepsOtherTab = async (page: Page, editor: Locator, kind: StyleCodeEditorKind, wrapperContextLine: string) => {
  await typeCssInMonaco(editor, page, componentCss)
  await editorTab(editor, 'Wrapper').click()
  await expect(monacoLines(editor)).not.toContainText(componentCss)
  await typeCssInMonaco(editor, page, wrapperCss)

  await page.getByTestId(kind.cleanButtonTestId).click({force: true})
  await expect(monacoLines(editor)).not.toContainText(wrapperCss)
  await expect(monacoLines(editor)).not.toContainText(componentCss)
  await expect(monacoLines(editor)).toContainText(wrapperContextLine)

  await editorTab(editor, 'Component').click()
  await expect(monacoLines(editor)).toContainText(componentCss)
  await expect(monacoLines(editor)).not.toContainText(wrapperCss)
}

test.describe(
  'Style code editor reset',
  {
    tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`],
  },
  () => {
    test('clears CSS monaco content immediately when reset is clicked', async ({page}) => {
      await page.goto('/')
      const editor = await openStyleCodeEditor(page, () => selectTitleInput(page), cssEditorKind)
      await expectResetClearsCurrentTab(page, editor, cssEditorKind, componentCss, 'element.style')
    })

    test('resets only the current CSS tab in monaco', async ({page}) => {
      await page.goto('/')
      const editor = await openStyleCodeEditor(page, () => selectTitleInput(page), cssEditorKind)
      await expectResetKeepsOtherTab(page, editor, cssEditorKind, 'element.style')
    })

    test('clears inline style monaco content immediately when reset is clicked', async ({page}) => {
      await page.goto('/')
      const editor = await openStyleCodeEditor(page, () => selectStyledBox(page), styleEditorKind)
      await expectResetClearsCurrentTab(page, editor, styleEditorKind, componentCss, 'style {')
    })

    test('resets only the current inline style tab in monaco', async ({page}) => {
      await page.goto('/')
      const editor = await openStyleCodeEditor(page, () => selectStyledBox(page), styleEditorKind)
      await expectResetKeepsOtherTab(page, editor, styleEditorKind, 'wrapperStyle {')
    })
  }
)
