import {BiDi, createView} from '@react-form-builder/core'
import {act, waitFor} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {renderViewerForm} from '../util/renderViewerForm'

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
  },
  languages: [
    {
      code: 'en',
      dialect: 'US',
      name: 'English',
      description: 'American English',
      bidi: 'ltr',
    },
    {
      code: 'ar',
      dialect: 'EG',
      name: 'عرب',
      description: 'Arabic (Egypt)',
      bidi: 'rtl',
    },
  ],
  defaultLanguage: 'en-US',
}

describe('CSS loaders tests', () => {
  it('CSS loaders have to be executed sequentially', async () => {
    const order: string[] = []
    let finishLtr: (() => void) | undefined = undefined
    let finishRtl: (() => void) | undefined = undefined
    const ltrReady = new Promise<void>(resolve => {
      finishLtr = resolve
    })
    const rtlReady = new Promise<void>(resolve => {
      finishRtl = resolve
    })

    const ltrLoader = async () => {
      order.push('ltr start')
      await ltrReady
      order.push('ltr end')
    }

    const rtlLoader = async () => {
      order.push('rtl start')
      await rtlReady
      order.push('rtl end')
    }

    const view = createView([]).withCssLoader(BiDi.LTR, ltrLoader).withCssLoader(BiDi.RTL, rtlLoader)

    renderViewerForm(view, form, {language: 'ar-EG'})

    await waitFor(() => expect(order).toStrictEqual(['ltr start']))
    await act(async () => finishLtr?.())
    await waitFor(() => expect(order).toStrictEqual(['ltr start', 'ltr end', 'rtl start']))
    await act(async () => finishRtl?.())
    await waitFor(() => expect(order).toHaveLength(4))
    expect(order).toStrictEqual(['ltr start', 'ltr end', 'rtl start', 'rtl end'])
  })

  it('The CSS loader should be unloaded on unmount', async () => {
    const order: string[] = []

    const ltrLoader = async () => {
      order.push('ltr loaded')
      return () => {
        return new Promise<void>(resolve => {
          order.push('ltr unloaded')
          resolve()
        })
      }
    }

    const view = createView([]).withCssLoader(BiDi.LTR, ltrLoader)

    const {unmount} = renderViewerForm(view, form, {language: 'ar-EG'})

    await waitFor(() => expect(order).toHaveLength(1))
    expect(order).toStrictEqual(['ltr loaded'])

    unmount()
    await waitFor(() => expect(order).toHaveLength(2))
    expect(order).toStrictEqual(['ltr loaded', 'ltr unloaded'])
  })
})
