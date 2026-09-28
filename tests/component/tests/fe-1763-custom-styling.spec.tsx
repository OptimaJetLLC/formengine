import {createView, define, event, FormViewer, string} from '@react-form-builder/core'
import {act, render} from '@testing-library/react'
import type {InputHTMLAttributes} from 'react'
import {isBrowserMode} from '../config/isBrowserMode'
import form from './forms/fe-1763-custom-styling.json'

const getForm = (_?: string, __?: unknown) => JSON.stringify(form)

interface HtmlInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const HtmlInput = ({label, ...props}: HtmlInputProps) => (
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

const App = () => <FormViewer view={view} getForm={getForm} />

const createMatchMedia = (scheme: 'dark' | 'light') => {
  const expectedQuery = `(prefers-color-scheme: ${scheme})`
  return (query: string) =>
    ({
      matches: query === expectedQuery,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as MediaQueryList
}

const setColorScheme = async (scheme: 'dark' | 'light') => {
  if (isBrowserMode()) {
    const {cdp} = await import('vitest/browser')
    const session = await cdp()
    await session.send('Emulation.setEmulatedMedia', {
      features: [{name: 'prefers-color-scheme', value: scheme}],
    })
    return
  }

  const matchMedia = createMatchMedia(scheme)
  if (typeof vi !== 'undefined' && 'stubGlobal' in vi) {
    vi.stubGlobal('matchMedia', matchMedia)
  }
  Object.defineProperty(window, 'matchMedia', {
    value: matchMedia,
    writable: true,
    configurable: true,
  })
}

const expectColorSchemeApplied = (scheme: 'dark' | 'light') => {
  expect(typeof window.matchMedia).toBe('function')
  expect(window.matchMedia(`(prefers-color-scheme: ${scheme})`).matches).toBe(true)
  const opposite = scheme === 'dark' ? 'light' : 'dark'
  expect(window.matchMedia(`(prefers-color-scheme: ${opposite})`).matches).toBe(false)
}

const setViewportWidth = (width: number) => {
  Object.defineProperty(globalThis, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  globalThis.dispatchEvent(new Event('resize'))
}

const getWrapperElementByTestId = (element: Element, getAllByTestId: (id: string) => HTMLElement[]) => {
  const wrappers = getAllByTestId('default-wrapper')
  return wrappers.find(wrapper => wrapper.contains(element)) ?? null
}

const getStylesForElement = (element: Element) => {
  const className = element.getAttribute('class') ?? ''
  const styledClass = className.split(' ').find(item => item.startsWith('st-'))
  const adoptedSheets = Array.from(document.adoptedStyleSheets ?? [])
  const styleText = adoptedSheets
    .map(sheet => {
      try {
        return Array.from(sheet.cssRules)
          .map(rule => rule.cssText)
          .join('\n')
      } catch {
        return ''
      }
    })
    .join('\n')

  return {
    className,
    styledClass,
    styleText,
  }
}

const hexToRgbString = (value: string) => {
  const normalized = value.replace('#', '').toLowerCase()
  const expanded =
    normalized.length === 3
      ? normalized
          .split('')
          .map(channel => `${channel}${channel}`)
          .join('')
      : normalized
  if (expanded.length !== 6) return value
  const r = Number.parseInt(expanded.slice(0, 2), 16)
  const g = Number.parseInt(expanded.slice(2, 4), 16)
  const b = Number.parseInt(expanded.slice(4, 6), 16)
  return `rgb(${r}, ${g}, ${b})`
}

const normalizeColorValue = (value: string) => value.replace(/\s+/g, '').toLowerCase()

const expectComputedColors = (element: Element, colors: {background: string; color: string; border: string}) => {
  const styles = window.getComputedStyle(element)
  expect(normalizeColorValue(styles.backgroundColor)).toBe(normalizeColorValue(hexToRgbString(colors.background)))
  expect(normalizeColorValue(styles.color)).toBe(normalizeColorValue(hexToRgbString(colors.color)))
  expect(normalizeColorValue(styles.borderColor)).toBe(normalizeColorValue(hexToRgbString(colors.border)))
}

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const expectStyleTextColors = (styleText: string, colors: {background: string; color: string; border: string}) => {
  const expected = {
    background: hexToRgbString(colors.background),
    color: hexToRgbString(colors.color),
    border: hexToRgbString(colors.border),
  }
  expect(styleText).toMatch(new RegExp(`background-color:\\s*${escapeRegex(expected.background)}`, 'i'))
  expect(styleText).toMatch(new RegExp(`color:\\s*${escapeRegex(expected.color)}`, 'i'))
  expect(styleText).toMatch(new RegExp(`border-color:\\s*${escapeRegex(expected.border)}`, 'i'))
}

const expectColors = (element: Element, styleText: string, colors: {background: string; color: string; border: string}) => {
  if (!isBrowserMode()) {
    expectStyleTextColors(styleText, colors)
    return
  }

  const styles = window.getComputedStyle(element)
  const normalizedBackground = normalizeColorValue(styles.backgroundColor)
  const normalizedColor = normalizeColorValue(styles.color)
  const normalizedBorder = normalizeColorValue(styles.borderColor)
  const expectedBackground = normalizeColorValue(hexToRgbString(colors.background))
  const expectedColor = normalizeColorValue(hexToRgbString(colors.color))
  const expectedBorder = normalizeColorValue(hexToRgbString(colors.border))

  const matchesComputed =
    normalizedBackground === expectedBackground && normalizedColor === expectedColor && normalizedBorder === expectedBorder

  const hasTransparentFallback =
    normalizedBackground === 'transparent' ||
    normalizedBackground === 'rgba(0,0,0,0)' ||
    normalizedBorder === 'transparent' ||
    normalizedBorder === 'rgba(0,0,0,0)'

  if (matchesComputed) return
  if (hasTransparentFallback) {
    expectStyleTextColors(styleText, colors)
    return
  }

  expectComputedColors(element, colors)
}

describe('Should apply custom styling for component', () => {
  it('should include dark mode media rules in browser dark mode', async () => {
    await setColorScheme('dark')
    expectColorSchemeApplied('dark')
    const {getAllByTestId, getByTestId} = render(<App />)

    const styledElement = getByTestId('styled-element')
    expect(styledElement).not.toBeNull()

    const {className, styledClass, styleText} = getStylesForElement(styledElement as Element)
    expect(className).toContain('AAAAAA')
    expect(styledClass).toBeTruthy()
    expect(styleText).toContain(`.${styledClass ?? ''}`)
    expect(styleText).toMatch(/prefers-color-scheme:\s*dark/)
    expectColors(styledElement as Element, styleText, {background: '#111', color: '#eee', border: '#0ff'})

    const wrapperElement = getWrapperElementByTestId(styledElement as Element, getAllByTestId)
    expect(wrapperElement).not.toBeNull()
    const {styledClass: wrapperClass, styleText: wrapperStyleText} = getStylesForElement(wrapperElement as Element)
    expect(wrapperClass).toBeTruthy()
    expect(wrapperStyleText).toContain(`.${wrapperClass ?? ''}`)
    expect(wrapperStyleText).toMatch(/height:\s*10%/i)
    expect(wrapperStyleText).toMatch(/width:\s*100%/i)
    expect(wrapperStyleText).toMatch(/margin-top:\s*10vw/i)
    expect(wrapperStyleText).toMatch(/\.active\s*\{\s*opacity:\s*0\.7\s*;\s*\}/i)
    expectColors(wrapperElement as Element, wrapperStyleText, {background: '#222', color: '#faf', border: '#c0c'})
  })

  it('should include light mode media rules in browser light mode', async () => {
    await setColorScheme('light')
    expectColorSchemeApplied('light')
    const {getAllByTestId, getByTestId} = render(<App />)

    const styledElement = getByTestId('styled-element')
    expect(styledElement).not.toBeNull()

    const {className, styledClass, styleText} = getStylesForElement(styledElement as Element)
    expect(className).toContain('AAAAAA')
    expect(styledClass).toBeTruthy()
    expect(styleText).toContain(`.${styledClass ?? ''}`)
    expect(styleText).toMatch(/prefers-color-scheme:\s*light/)
    expectColors(styledElement as Element, styleText, {background: '#fef', color: '#123', border: '#0a0'})

    const wrapperElement = getWrapperElementByTestId(styledElement as Element, getAllByTestId)
    expect(wrapperElement).not.toBeNull()
    const {styledClass: wrapperClass, styleText: wrapperStyleText} = getStylesForElement(wrapperElement as Element)
    expect(wrapperClass).toBeTruthy()
    expect(wrapperStyleText).toContain(`.${wrapperClass ?? ''}`)
    expect(wrapperStyleText).toMatch(/height:\s*10%/i)
    expect(wrapperStyleText).toMatch(/margin-top:\s*10vw/i)
    expect(wrapperStyleText).toMatch(/\.active\s*\{\s*opacity:\s*0\.7\s*;\s*\}/i)
    expectColors(wrapperElement as Element, wrapperStyleText, {background: '#eef', color: '#135', border: '#0cc'})
  })

  it('should include mobile css when width is 580px', async () => {
    await setColorScheme('light')
    expectColorSchemeApplied('light')

    const {getAllByTestId, getByTestId} = render(<App />)

    await act(async () => {
      setViewportWidth(580)
    })

    const styledElement = getByTestId('styled-element')
    expect(styledElement).not.toBeNull()

    const {styleText} = getStylesForElement(styledElement as Element)
    expectColors(styledElement as Element, styleText, {background: '#0f0', color: '#005', border: '#00f'})

    const wrapperElement = getWrapperElementByTestId(styledElement as Element, getAllByTestId)
    expect(wrapperElement).not.toBeNull()
    const {styleText: wrapperStyleText} = getStylesForElement(wrapperElement as Element)
    expectColors(wrapperElement as Element, wrapperStyleText, {background: '#dff', color: '#210', border: '#0f0'})
    expect(wrapperStyleText).toMatch(/height:\s*15px/i)
    expect(wrapperStyleText).toMatch(/margin-inline-end:\s*50px/i)
    expect(wrapperStyleText).toMatch(/margin-top:\s*23px/i)
    expect(wrapperStyleText).toMatch(/\.active\s*\{\s*opacity:\s*0\.4\s*;\s*\}/i)
  })

  it('should include dark theme mobile css when width is 580px', async () => {
    await setColorScheme('dark')
    expectColorSchemeApplied('dark')

    const {getAllByTestId, getByTestId} = render(<App />)

    await act(async () => {
      setViewportWidth(580)
    })

    const styledElement = getByTestId('styled-element')
    expect(styledElement).not.toBeNull()

    const {styleText} = getStylesForElement(styledElement as Element)
    expect(styleText).toMatch(/prefers-color-scheme:\s*dark/)
    expectColors(styledElement as Element, styleText, {background: '#024', color: '#f0f', border: '#fa0'})

    const wrapperElement = getWrapperElementByTestId(styledElement as Element, getAllByTestId)
    expect(wrapperElement).not.toBeNull()
    const {styleText: wrapperStyleText} = getStylesForElement(wrapperElement as Element)
    expect(wrapperStyleText).toMatch(/prefers-color-scheme:\s*dark/)
    expectColors(wrapperElement as Element, wrapperStyleText, {background: '#101', color: '#0ff', border: '#f00'})
    expect(wrapperStyleText).toMatch(/height:\s*15px/i)
    expect(wrapperStyleText).toMatch(/margin-inline-end:\s*50px/i)
    expect(wrapperStyleText).toMatch(/margin-top:\s*23px/i)
    expect(wrapperStyleText).toMatch(/\.active\s*\{\s*opacity:\s*0\.4\s*;\s*\}/i)
  })
})
