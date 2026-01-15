import {createView, define, event, FormViewer, string} from '@react-form-builder/core'
import {act, render} from '@testing-library/react'
import type {InputHTMLAttributes} from 'react'

import form from './forms/fe-1763-custom-styling.json'

const getForm = (_?: string, __?: unknown) => JSON.stringify(form)

interface HtmlInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const HtmlInput = ({label, ...props}: HtmlInputProps) =>
  (
    <div>
      {label ? <label>{label}</label> : null}
      <input type={'text'} {...props} />
    </div>
  )

const htmlInput = define(HtmlInput, 'HtmlInput')
  .name('HTML Input')
  .props({
    label: string.named('Label'),
    onChange: event,
    value: string.valued.uncontrolledValue(''),
  })

const componentsMetadata = [htmlInput].map(definer => definer.build().model)
const view = createView(componentsMetadata)

const App = () => <FormViewer view={view} getForm={getForm}/>

const mockColorScheme = (scheme: 'dark' | 'light') => {
  const expectedQuery = `(prefers-color-scheme: ${scheme})`
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query === expectedQuery,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

const setViewportWidth = (width: number) => {
  Object.defineProperty(globalThis, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  globalThis.dispatchEvent(new Event('resize'))
}

const getWrapperElementByTestId = (
  element: Element,
  getAllByTestId: (id: string) => HTMLElement[]
) => {
  const wrappers = getAllByTestId('default-wrapper')
  return wrappers.find(wrapper => wrapper.contains(element)) ?? null
}

const getStylesForElement = (element: Element) => {
  const className = element.getAttribute('class') ?? ''
  const styledClass = className.split(' ').find(item => item.startsWith('css-'))
  const styleTags = Array.from(document.querySelectorAll('style'))
  const styleText = styleTags.map(tag => tag.textContent ?? '').join('\n')

  return {
    className,
    styledClass,
    styleText,
  }
}

describe('Should apply custom styling for component', () => {
  it('should include dark mode media rules in browser dark mode', () => {
    mockColorScheme('dark')
    const {getAllByTestId, getByTestId} = render(<App/>)

    const styledElement = getByTestId('styled-element')
    expect(styledElement).not.toBeNull()

    const {className, styledClass, styleText} = getStylesForElement(styledElement as Element)
    expect(className).toContain('AAAAAA')
    expect(styledClass).toBeTruthy()
    expect(styleText).toContain(`.${styledClass ?? ''}`)
    expect(styleText).toMatch(/prefers-color-scheme:\s*dark/)
    expect(styleText).toMatch(/background-color:\s*#111/i)
    expect(styleText).toMatch(/color:\s*#eee/i)
    expect(styleText).toMatch(/border-color:\s*#0ff/i)

    const wrapperElement = getWrapperElementByTestId(styledElement as Element, getAllByTestId)
    expect(wrapperElement).not.toBeNull()
    const {styledClass: wrapperClass, styleText: wrapperStyleText} = getStylesForElement(wrapperElement as Element)
    expect(wrapperClass).toBeTruthy()
    expect(wrapperStyleText).toContain(`.${wrapperClass ?? ''}`)
    expect(wrapperStyleText).toMatch(/height:\s*10%/i)
    expect(wrapperStyleText).toMatch(/margin-top:\s*10vw/i)
    expect(wrapperStyleText).toMatch(/\.active\s*\{\s*opacity:\s*0\.7\s*;\s*\}/i)
    expect(wrapperStyleText).toMatch(/background-color:\s*#222/i)
    expect(wrapperStyleText).toMatch(/color:\s*#faf/i)
    expect(wrapperStyleText).toMatch(/border-color:\s*#c0c/i)
  })

  it('should include light mode media rules in browser light mode', () => {
    mockColorScheme('light')
    const {getAllByTestId, getByTestId} = render(<App/>)

    const styledElement = getByTestId('styled-element')
    expect(styledElement).not.toBeNull()

    const {className, styledClass, styleText} = getStylesForElement(styledElement as Element)
    expect(className).toContain('AAAAAA')
    expect(styledClass).toBeTruthy()
    expect(styleText).toContain(`.${styledClass ?? ''}`)
    expect(styleText).toMatch(/prefers-color-scheme:\s*light/)
    expect(styleText).toMatch(/background-color:\s*#fef/i)
    expect(styleText).toMatch(/color:\s*#123/i)
    expect(styleText).toMatch(/border-color:\s*#0a0/i)

    const wrapperElement = getWrapperElementByTestId(styledElement as Element, getAllByTestId)
    expect(wrapperElement).not.toBeNull()
    const {styledClass: wrapperClass, styleText: wrapperStyleText} = getStylesForElement(wrapperElement as Element)
    expect(wrapperClass).toBeTruthy()
    expect(wrapperStyleText).toContain(`.${wrapperClass ?? ''}`)
    expect(wrapperStyleText).toMatch(/height:\s*10%/i)
    expect(wrapperStyleText).toMatch(/margin-top:\s*10vw/i)
    expect(wrapperStyleText).toMatch(/\.active\s*\{\s*opacity:\s*0\.7\s*;\s*\}/i)
    expect(wrapperStyleText).toMatch(/background-color:\s*#eef/i)
    expect(wrapperStyleText).toMatch(/color:\s*#135/i)
    expect(wrapperStyleText).toMatch(/border-color:\s*#0cc/i)
  })

  it('should include mobile css when width is 580px', async () => {
    mockColorScheme('light')

    const {getAllByTestId, getByTestId} = render(<App/>)

    await act(async () => {
      setViewportWidth(580)
    })

    const styledElement = getByTestId('styled-element')
    expect(styledElement).not.toBeNull()

    const {styleText} = getStylesForElement(styledElement as Element)
    expect(styleText).toMatch(/background-color:\s*#0f0/i)
    expect(styleText).toMatch(/color:\s*#005/i)
    expect(styleText).toMatch(/border-color:\s*#00f/i)

    const wrapperElement = getWrapperElementByTestId(styledElement as Element, getAllByTestId)
    expect(wrapperElement).not.toBeNull()
    const {styleText: wrapperStyleText} = getStylesForElement(wrapperElement as Element)
    expect(wrapperStyleText).toMatch(/background-color:\s*#dff/i)
    expect(wrapperStyleText).toMatch(/color:\s*#210/i)
    expect(wrapperStyleText).toMatch(/border-color:\s*#0f0/i)
    expect(wrapperStyleText).toMatch(/height:\s*15px/i)
    expect(wrapperStyleText).toMatch(/margin-inline-end:\s*50px/i)
    expect(wrapperStyleText).toMatch(/margin-top:\s*23px/i)
    expect(wrapperStyleText).toMatch(/\.active\s*\{\s*opacity:\s*0\.4\s*;\s*\}/i)
  })

  it('should include dark theme mobile css when width is 580px', async () => {
    mockColorScheme('dark')

    const {getAllByTestId, getByTestId} = render(<App/>)

    await act(async () => {
      setViewportWidth(580)
    })

    const styledElement = getByTestId('styled-element')
    expect(styledElement).not.toBeNull()

    const {styleText} = getStylesForElement(styledElement as Element)
    expect(styleText).toMatch(/prefers-color-scheme:\s*dark/)
    expect(styleText).toMatch(/background-color:\s*#024/i)
    expect(styleText).toMatch(/color:\s*#f0f/i)
    expect(styleText).toMatch(/border-color:\s*#fa0/i)

    const wrapperElement = getWrapperElementByTestId(styledElement as Element, getAllByTestId)
    expect(wrapperElement).not.toBeNull()
    const {styleText: wrapperStyleText} = getStylesForElement(wrapperElement as Element)
    expect(wrapperStyleText).toMatch(/prefers-color-scheme:\s*dark/)
    expect(wrapperStyleText).toMatch(/background-color:\s*#101/i)
    expect(wrapperStyleText).toMatch(/color:\s*#0ff/i)
    expect(wrapperStyleText).toMatch(/border-color:\s*#f00/i)
    expect(wrapperStyleText).toMatch(/height:\s*15px/i)
    expect(wrapperStyleText).toMatch(/margin-inline-end:\s*50px/i)
    expect(wrapperStyleText).toMatch(/margin-top:\s*23px/i)
    expect(wrapperStyleText).toMatch(/\.active\s*\{\s*opacity:\s*0\.4\s*;\s*\}/i)
  })
})
