import type {Page} from '@playwright/test'
import {expect, test} from '@playwright/test'

type Edge = 'top' | 'right' | 'bottom' | 'left'

type Box = {left: number; top: number; right: number; bottom: number}

const edges: Edge[] = ['top', 'right', 'bottom', 'left']
const columnCount = 30
const middleColumn = 15

const column = (index: number) => ({
  key: `col${index}`,
  type: 'RsColumn',
  children: [
    {key: `header${index}`, type: 'RsHeaderCell', props: {children: {value: `H${index}`}}},
    {key: `cell${index}`, type: 'RsCell'},
  ],
})

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'wideButton',
        type: 'RsButton',
        props: {children: {value: 'Wide'}},
        css: {any: {object: {width: '100%'}}},
      },
      {
        key: 'narrowButton',
        type: 'RsButton',
        props: {children: {value: 'N'}},
        wrapperCss: {any: {object: {width: '48px', marginInlineStart: '520px'}}},
      },
      {
        key: 'above',
        type: 'RsContainer',
        css: {any: {object: {minHeight: '1400px'}}},
      },
      {
        key: 'row',
        type: 'RsContainer',
        css: {any: {object: {flexDirection: 'row', width: 'max-content'}}},
        children: [
          {
            key: 'leftSpace',
            type: 'RsContainer',
            css: {any: {object: {minWidth: '1600px', minHeight: '48px'}}},
          },
          {
            key: 'anchorButton',
            type: 'RsButton',
            props: {children: {value: 'Anchor'}},
          },
          {
            key: 'rightSpace',
            type: 'RsContainer',
            css: {any: {object: {minWidth: '1600px', minHeight: '48px'}}},
          },
        ],
      },
      {
        key: 'rsTable1',
        type: 'RsTable',
        children: Array.from({length: columnCount}, (_, index) => column(index)),
      },
      {
        key: 'below',
        type: 'RsContainer',
        css: {any: {object: {minHeight: '1400px'}}},
      },
    ],
  },
}

const uploadForm = async (page: Page) => {
  await page.locator('.FE_MainMenu_Button').first().click()
  const chooser = page.waitForEvent('filechooser')
  await page.getByRole('menuitem', {name: 'Upload'}).click()
  await (await chooser).setFiles({
    name: 'form.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(form)),
  })
  await expect(page.getByTestId('wideButton-editable-wrapper')).toBeVisible()
  await expect(page.getByTestId(`header${middleColumn}-editable-wrapper`)).toBeAttached()
}

const center = async (page: Page, testId: string) => {
  await page.evaluate(testId => {
    document.querySelector(`[data-testid="${testId}"]`)?.scrollIntoView({block: 'center', inline: 'center'})
  }, testId)
}

const scrollOutsideCanvas = async (page: Page, testId: string, edge: Edge) => {
  await page.evaluate(
    ({testId, edge}) => {
      const target = document.querySelector(`[data-testid="${testId}"]`) as HTMLElement | null
      const canvas = document.querySelector('[data-fe-canvas]') as HTMLElement | null
      if (!target || !canvas) return
      const scrolls = (value: string) => value === 'auto' || value === 'scroll'
      let scroller = canvas
      let parent = target.parentElement
      while (parent && parent !== canvas) {
        const style = getComputedStyle(parent)
        const axis = edge === 'left' || edge === 'right' ? style.overflowX : style.overflowY
        if (scrolls(axis)) {
          scroller = parent
          break
        }
        parent = parent.parentElement
      }
      const rect = canvas.getBoundingClientRect()
      const canvasLeft = rect.left + canvas.clientLeft
      const canvasTop = rect.top + canvas.clientTop
      const canvasRight = canvasLeft + canvas.clientWidth
      const canvasBottom = canvasTop + canvas.clientHeight
      const box = target.getBoundingClientRect()
      const margin = 32
      if (edge === 'top') scroller.scrollTop += box.bottom - canvasTop + margin
      if (edge === 'bottom') scroller.scrollTop += box.top - canvasBottom - margin
      if (edge === 'left') scroller.scrollLeft += box.right - canvasLeft + margin
      if (edge === 'right') scroller.scrollLeft += box.left - canvasRight - margin
    },
    {testId, edge}
  )
}

const layout = (page: Page, testId: string) =>
  page.evaluate(testId => {
    const border = (element: HTMLElement): Box => {
      const rect = element.getBoundingClientRect()
      return {left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom}
    }
    const canvasEl = document.querySelector('[data-fe-canvas]') as HTMLElement | null
    const toolbarEl = document.querySelector('[data-fe-toolbar]') as HTMLElement | null
    const targetEl = document.querySelector(`[data-testid="${testId}"]`) as HTMLElement | null
    if (!canvasEl || !toolbarEl || !targetEl) return null
    const rect = canvasEl.getBoundingClientRect()
    const left = rect.left + canvasEl.clientLeft
    const top = rect.top + canvasEl.clientTop
    return {
      ready: toolbarEl.hasAttribute('data-fe-toolbar-ready'),
      canvas: {left, top, right: left + canvasEl.clientWidth, bottom: top + canvasEl.clientHeight},
      toolbar: border(toolbarEl),
      target: border(targetEl),
    }
  }, testId)

const stuck = (edge: Edge, canvas: Box, toolbar: Box, target: Box): string => {
  const slack = 2
  const inside =
    toolbar.left >= canvas.left - slack &&
    toolbar.top >= canvas.top - slack &&
    toolbar.right <= canvas.right + slack &&
    toolbar.bottom <= canvas.bottom + slack
  if (!inside) return 'toolbar-outside-canvas'
  if (edge === 'top' && target.bottom <= canvas.top && Math.abs(toolbar.top - canvas.top) <= slack) return 'ok'
  if (edge === 'bottom' && target.top >= canvas.bottom && Math.abs(toolbar.bottom - canvas.bottom) <= slack) return 'ok'
  if (edge === 'left' && target.right <= canvas.left && Math.abs(toolbar.left - canvas.left) <= slack) return 'ok'
  if (edge === 'right' && target.left >= canvas.right && Math.abs(toolbar.right - canvas.right) <= slack) return 'ok'
  return 'not-on-border'
}

const expectToolbarOnBorder = async (page: Page, testId: string, edge: Edge) => {
  await expect
    .poll(async () => {
      const box = await layout(page, testId)
      if (!box?.ready) return 'not-ready'
      return stuck(edge, box.canvas, box.toolbar, box.target)
    })
    .toBe('ok')
}

const select = async (page: Page, testId: string) => {
  await center(page, testId)
  await page.getByTestId(testId).click()
  await expect(page.locator('[data-fe-toolbar]')).toHaveAttribute('data-fe-toolbar-ready', '')
}

test.describe('canvas toolbar', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/')
    await uploadForm(page)
  })

  test(
    'keeps the toolbar on the canvas border when a selected component scrolls out of the canvas',
    {tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`]},
    async ({page}) => {
      const anchor = 'anchorButton-editable-wrapper'
      await select(page, anchor)
      for (const edge of edges) {
        await center(page, anchor)
        await scrollOutsideCanvas(page, anchor, edge)
        await expectToolbarOnBorder(page, anchor, edge)
      }
    }
  )

  test(
    'keeps the toolbar on the canvas border when a selected table cell scrolls out of the canvas',
    {tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`]},
    async ({page}) => {
      const header = `header${middleColumn}-editable-wrapper`
      await select(page, header)
      for (const edge of edges) {
        await center(page, header)
        await scrollOutsideCanvas(page, header, edge)
        await expectToolbarOnBorder(page, header, edge)
      }
    }
  )

  test(
    'opens the toolbar when the selection border is wide enough and uses the hamburger when it is not',
    {tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`]},
    async ({page}) => {
      await page.getByTestId('wideButton-editable-wrapper').click()
      await expect(page.getByTestId('toolbar-actions-button')).toHaveCount(0)
      await expect(page.getByTestId('toolbar-remove-button')).toBeVisible()

      await page.getByTestId('narrowButton-editable-wrapper').click()
      await expect(page.getByTestId('toolbar-actions-button')).toBeVisible()
      await expect(page.getByTestId('toolbar-remove-button')).toBeHidden()

      const wide = 'wideButton-editable-wrapper'
      await page.getByTestId(wide).click()
      await page.evaluate(testId => {
        const target = document.querySelector(`[data-testid="${testId}"]`) as HTMLElement
        const canvas = document.querySelector('[data-fe-canvas]') as HTMLElement
        const rect = canvas.getBoundingClientRect()
        const canvasLeft = rect.left + canvas.clientLeft
        const box = target.getBoundingClientRect()
        canvas.scrollLeft += box.right - canvasLeft - 24
      }, wide)
      await expect(page.getByTestId('toolbar-actions-button')).toBeVisible()
      await expect(page.getByTestId('toolbar-remove-button')).toBeHidden()
      await expect
        .poll(async () => {
          const box = await layout(page, wide)
          if (!box?.ready) return false
          return (
            box.toolbar.left >= box.canvas.left - 2 &&
            box.toolbar.right <= box.canvas.right + 2 &&
            box.target.right > box.canvas.left &&
            box.target.left < box.canvas.left
          )
        })
        .toBe(true)
    }
  )

  test(
    'keeps the toolbar end fixed when the action strip opens',
    {tag: ['@designer', `@${process.env['TEST_TEMPLATE']}`]},
    async ({page}) => {
      await page.getByTestId('narrowButton-editable-wrapper').click()
      const toolbar = page.locator('[data-fe-toolbar]')
      await expect(toolbar).toHaveAttribute('data-fe-toolbar-ready', '')
      const before = await toolbar.boundingBox()
      await page.getByTestId('toolbar-actions-button').hover()
      await expect
        .poll(async () => {
          const after = await toolbar.boundingBox()
          if (!before || !after) return 999
          return Math.abs(after.x + after.width - (before.x + before.width))
        })
        .toBeLessThanOrEqual(1)
    }
  )
})
