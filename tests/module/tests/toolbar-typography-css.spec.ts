import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {afterEach, describe, expect, it} from 'vitest'

const designerCssPath = resolve(process.cwd(), '../../packages/designer/public/css/formengine-rsuite.css')

const readDesignerBaseCss = () => {
  const css = readFileSync(designerCssPath, 'utf8')
  const whereMatch = css.match(/:where\(([\s\S]*?)\)\s*\{/)
  expect(whereMatch).not.toBeNull()

  const typographyMatch = css.match(/font-family:\s*(Apple-System,[^;]+);\s*font-size:\s*([^;]+);\s*line-height:\s*([^;]+);/)
  expect(typographyMatch).not.toBeNull()

  return {
    selectors: whereMatch![1],
    fontFamily: typographyMatch![1].trim(),
    fontSize: typographyMatch![2].trim(),
    lineHeight: typographyMatch![3].trim(),
  }
}

describe('Designer toolbar typography CSS', () => {
  afterEach(() => {
    document.head.replaceChildren()
    document.body.replaceChildren()
  })

  it('includes [data-fe-toolbar] in the shared base :where selector', () => {
    const {selectors} = readDesignerBaseCss()
    expect(selectors).toContain('.optimajet-formbuilder')
    expect(selectors).toContain('[data-fe-toolbar]')
  })

  it('applies shared base typography to [data-fe-toolbar]', () => {
    const {selectors, fontFamily, fontSize, lineHeight} = readDesignerBaseCss()
    expect(selectors).toContain('[data-fe-toolbar]')
    expect(fontSize).toBe('14px')
    expect(lineHeight).toBe('1.42857143')

    // jsdom cannot parse nested rules from formengine-rsuite.css; apply the shared selectors flat.
    const style = document.createElement('style')
    style.textContent = `:where(${selectors}) {
      font-family: ${fontFamily};
      font-size: ${fontSize};
      line-height: ${lineHeight};
    }`
    document.head.appendChild(style)

    const toolbar = document.createElement('div')
    toolbar.setAttribute('data-fe-toolbar', '')
    document.body.appendChild(toolbar)

    const builder = document.createElement('div')
    builder.className = 'optimajet-formbuilder'
    document.body.appendChild(builder)

    const plain = document.createElement('div')
    document.body.appendChild(plain)

    const toolbarStyle = getComputedStyle(toolbar)
    const builderStyle = getComputedStyle(builder)
    const plainStyle = getComputedStyle(plain)

    expect(toolbarStyle.fontSize).toBe(fontSize)
    expect(toolbarStyle.lineHeight).toBe(lineHeight)
    expect(toolbarStyle.fontFamily).toBe(builderStyle.fontFamily)
    expect(toolbarStyle.fontSize).toBe(builderStyle.fontSize)
    expect(toolbarStyle.lineHeight).toBe(builderStyle.lineHeight)
    expect(plainStyle.fontSize).not.toBe(fontSize)
  })
})
