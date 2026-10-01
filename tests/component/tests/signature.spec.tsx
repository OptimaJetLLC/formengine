import {fireEvent, waitFor, within} from '@testing-library/react'
import {Canvas, Image as SkiaImage} from 'skia-canvas'
import {afterAll, beforeAll, describe, expect, it, vi} from 'vitest'
import {asyncAct} from '../../common/lib/asyncAct'
import {isBrowserMode} from '../config/isBrowserMode'
import {renderForm} from '../util/renderForm'

const signatureKey = 'signature1'
const testId = 'signature'
const darkChannelThreshold = 120
const inkAlphaThreshold = 20

/**
 * A minimal canvas context that is enough to draw the test signature.
 */
interface StrokableContext {
  strokeStyle: string
  lineWidth: number
  beginPath(): void
  moveTo(x: number, y: number): void
  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void
  stroke(): void
}

/**
 * Replaces the browser Image so that signature_pad can restore data URLs in jsdom.
 * The real image is decoded by skia-canvas and passed to the canvas drawing context.
 */
class MockImage {
  onload: (() => void) | null = null
  onerror: ((error: unknown) => void) | null = null
  crossOrigin: string | null = null
  skiaImage: SkiaImage | null = null

  set src(dataUrl: string) {
    try {
      const image = new SkiaImage()
      image.src = Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64')
      this.skiaImage = image
      queueMicrotask(() => this.onload?.())
    } catch (error) {
      queueMicrotask(() => this.onerror?.(error))
    }
  }
}

const canvasBackings = new WeakMap<HTMLCanvasElement, Canvas>()

const buildForm = (props: Record<string, unknown> = {}, schema?: object) => ({
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: signatureKey,
        type: 'RsSignature',
        props: {
          label: {value: 'Signature'},
          clearButtonText: {value: 'Clear'},
          ...props,
        },
        ...(schema ? {schema} : {}),
        htmlAttributes: [{name: 'data-testid', value: testId}],
      },
    ],
  },
})

const getCanvas = (container: HTMLElement): HTMLCanvasElement => {
  const canvas = container.querySelector('canvas')
  if (!canvas) throw new Error('The signature canvas is not found')
  return canvas
}

const getWindow = (canvas: HTMLCanvasElement): Window => {
  const view = canvas.ownerDocument.defaultView
  if (!view) throw new Error('The window is not available')
  return view
}

const drawStroke = (canvas: HTMLCanvasElement, offset = 0) => {
  const view = getWindow(canvas)
  const pointer = {pointerId: 1, isPrimary: true}

  fireEvent.pointerDown(canvas, {...pointer, buttons: 1, clientX: 20 + offset, clientY: 20 + offset})
  fireEvent.pointerMove(view, {...pointer, buttons: 1, clientX: 70 + offset, clientY: 70 + offset})
  fireEvent.pointerMove(view, {...pointer, buttons: 1, clientX: 120 + offset, clientY: 40 + offset})
  fireEvent.pointerUp(view, {...pointer, buttons: 0, clientX: 120 + offset, clientY: 40 + offset})
}

const getCanvasPng = (canvas: HTMLCanvasElement) => {
  if (isBrowserMode()) return canvas.toDataURL('png')

  const backing = canvasBackings.get(canvas)
  if (!backing) throw new Error('The canvas backing is not found')
  return backing.toDataURL('png')
}

const getImagePixels = async (dataUrl: string) => {
  if (isBrowserMode()) {
    const image = new Image()
    image.src = dataUrl
    await image.decode()
    const canvas = document.createElement('canvas')
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    const context = canvas.getContext('2d')
    if (!context) throw new Error('The 2d context is not available')
    context.drawImage(image, 0, 0)
    return context.getImageData(0, 0, canvas.width, canvas.height).data
  }

  const image = new SkiaImage()
  image.src = Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64')
  const canvas = new Canvas(image.width, image.height)
  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)
  return context.getImageData(0, 0, image.width, image.height).data
}

const countPenPixels = async (dataUrl: string) => {
  const pixels = await getImagePixels(dataUrl)
  let count = 0

  for (let i = 0; i < pixels.length; i += 4) {
    if (
      pixels[i] < darkChannelThreshold &&
      pixels[i + 1] < darkChannelThreshold &&
      pixels[i + 2] < darkChannelThreshold &&
      pixels[i + 3] > inkAlphaThreshold
    ) {
      count++
    }
  }

  return count
}

const createSignatureDataUrl = () => {
  const draw = (context: StrokableContext) => {
    context.strokeStyle = 'black'
    context.lineWidth = 3
    context.beginPath()
    context.moveTo(30, 30)
    context.bezierCurveTo(100, 150, 240, 20, 330, 120)
    context.stroke()
  }

  if (isBrowserMode()) {
    const canvas = document.createElement('canvas')
    canvas.width = 370
    canvas.height = 200
    const context = canvas.getContext('2d')
    if (!context) throw new Error('The 2d context is not available')
    draw(context as unknown as StrokableContext)
    return canvas.toDataURL('png')
  }

  const canvas = new Canvas(370, 200)
  draw(canvas.getContext('2d') as unknown as StrokableContext)
  return canvas.toDataURL('png')
}

beforeAll(() => {
  if (isBrowserMode()) return

  vi.stubGlobal('Image', MockImage)

  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(function (this: HTMLCanvasElement) {
    const skiaCanvas = new Canvas(this.width, this.height)
    canvasBackings.set(this, skiaCanvas)
    const context = skiaCanvas.getContext('2d')
    const drawImage = context.drawImage as unknown as (image: unknown, ...args: unknown[]) => void
    const boundDrawImage = drawImage.bind(context)

    Object.defineProperty(context, 'drawImage', {
      configurable: true,
      value: (image: {skiaImage?: SkiaImage | null}, ...args: unknown[]) => boundDrawImage(image?.skiaImage ?? image, ...args),
    })

    return context as unknown as CanvasRenderingContext2D
  })

  vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockImplementation(function (this: HTMLCanvasElement) {
    return getCanvasPng(this)
  })
})

afterAll(() => {
  if (isBrowserMode()) return

  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('Signature component', () => {
  it('renders the label, the canvas with the configured size and a disabled clear button', async () => {
    const {container, findByTestId, getByText} = renderForm(buildForm({width: {value: 260}, height: {value: 130}}))
    const root = await findByTestId(testId)
    const canvas = getCanvas(container)

    expect(getByText('Signature')).toBeInTheDocument()
    expect(canvas.width).toBe(260)
    expect(canvas.height).toBe(130)
    expect(within(root).getByRole('button', {name: 'Clear'})).toBeDisabled()
  })

  it('stores the drawn stroke as a PNG data URL in the form data and enables the clear button', async () => {
    const {container, findByTestId, formData} = renderForm(buildForm())
    const root = await findByTestId(testId)
    const canvas = getCanvas(container)

    drawStroke(canvas)

    await waitFor(() => expect(formData.data[signatureKey]).toMatch(/^data:image\/png;base64,/))
    expect(await countPenPixels(formData.data[signatureKey] as string)).toBeGreaterThan(0)
    expect(within(root).getByRole('button', {name: 'Clear'})).toBeEnabled()
  })

  it('accumulates strokes and refreshes the stored value on every stroke', async () => {
    const {container, findByTestId, formData} = renderForm(buildForm())
    await findByTestId(testId)
    const canvas = getCanvas(container)

    drawStroke(canvas)
    await waitFor(() => expect(formData.data[signatureKey]).toMatch(/^data:image\/png;base64,/))
    const firstValue = formData.data[signatureKey] as string

    drawStroke(canvas, 60)
    await waitFor(() => expect(formData.data[signatureKey]).not.toBe(firstValue))
    expect(await countPenPixels(formData.data[signatureKey] as string)).toBeGreaterThan(0)
  })

  it('clears the form data and the canvas when the clear button is clicked', async () => {
    const {container, findByTestId, formData} = renderForm(buildForm())
    const root = await findByTestId(testId)
    const canvas = getCanvas(container)

    drawStroke(canvas)
    await waitFor(() => expect(formData.data[signatureKey]).toBeDefined())

    fireEvent.click(within(root).getByRole('button', {name: 'Clear'}))

    expect(formData.data[signatureKey]).toBeUndefined()
    expect(await countPenPixels(getCanvasPng(canvas))).toBe(0)
    expect(within(root).getByRole('button', {name: 'Clear'})).toBeDisabled()
  })

  it('ignores pointer input in the read-only mode and does not render the clear button', async () => {
    const {container, findByTestId, formData} = renderForm(buildForm({readOnly: {value: true}}))
    const root = await findByTestId(testId)
    const canvas = getCanvas(container)

    drawStroke(canvas)
    await asyncAct(async () => Promise.resolve())

    expect(formData.data[signatureKey]).toBeUndefined()
    expect(await countPenPixels(getCanvasPng(canvas))).toBe(0)
    expect(within(root).queryByRole('button')).toBeNull()
  })

  it('restores the signature from the initial form data', async () => {
    const initialValue = createSignatureDataUrl()
    const {container, findByTestId, formData} = renderForm(buildForm(), {initialData: {[signatureKey]: initialValue}})
    const root = await findByTestId(testId)
    const canvas = getCanvas(container)

    await waitFor(async () => expect(await countPenPixels(getCanvasPng(canvas))).toBeGreaterThan(0))

    expect(formData.data[signatureKey]).toBe(initialValue)
    expect(within(root).getByRole('button', {name: 'Clear'})).toBeEnabled()
  })

  it('clears the canvas when the form data is cleared externally', async () => {
    const initialValue = createSignatureDataUrl()
    const {container, findByTestId, formData} = renderForm(buildForm(), {initialData: {[signatureKey]: initialValue}})
    await findByTestId(testId)
    const canvas = getCanvas(container)

    await waitFor(async () => expect(await countPenPixels(getCanvasPng(canvas))).toBeGreaterThan(0))

    await asyncAct(async () => formData.clear())

    expect(formData.data[signatureKey]).toBeUndefined()
    await waitFor(async () => expect(await countPenPixels(getCanvasPng(canvas))).toBe(0))
  })

  it('passes the required validation after the signature is drawn', async () => {
    const schema = {validations: [{key: 'required', args: {message: 'Signature is required'}}]}
    const {container, findByTestId, formData} = renderForm(buildForm({}, schema))
    await findByTestId(testId)
    const canvas = getCanvas(container)

    const initialErrors = await asyncAct(async () => formData.validate())
    expect(initialErrors).toStrictEqual({[signatureKey]: 'Signature is required'})

    drawStroke(canvas)
    await waitFor(() => expect(formData.data[signatureKey]).toBeDefined())

    const errors = await asyncAct(async () => formData.validate())
    expect(errors).toStrictEqual({})
  })
})
