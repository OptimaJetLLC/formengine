import {webcrypto} from 'node:crypto'
import {Canvas} from 'skia-canvas'
import {beforeAll, vi} from 'vitest'
import {mockAdoptedStyles} from './adoptedStylesheets'
import {addMatchMediaFunctionToWindow} from './matchMedia'

// VM contexts use jsdom's Crypto, which does not implement SubtleCrypto.
if (!globalThis.crypto?.subtle) {
  Object.defineProperty(globalThis, 'crypto', {
    configurable: true,
    value: webcrypto,
  })
}

addMatchMediaFunctionToWindow()

Object.defineProperty(Element.prototype, 'scrollIntoView', {
  configurable: true,
  writable: true,
  value: vi.fn(),
})

// @dnd-kit/dom reads these at module load and drag start.
if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(_callback: ResizeObserverCallback) {}
  } as unknown as typeof ResizeObserver
}

if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver = class IntersectionObserver {
    root = null
    rootMargin = ''
    thresholds: number[] = []
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    takeRecords = () => []

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
  } as unknown as typeof IntersectionObserver
}

const originalGetComputedStyle = globalThis.getComputedStyle
vi.spyOn(globalThis, 'getComputedStyle').mockImplementation(elem => originalGetComputedStyle(elem))

mockAdoptedStyles()

beforeAll(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => {
    const canvas = new Canvas()
    return canvas.getContext('2d') as unknown as CanvasRenderingContext2D
  })
})
