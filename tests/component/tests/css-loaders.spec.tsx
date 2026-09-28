import {BiDi, createView} from '@react-form-builder/core'
import {waitFor} from '@testing-library/react'
import {renderForm} from '../util/renderForm'

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

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

describe('CSS loaders tests', () => {
  it('CSS loaders have to be executed sequentially', async () => {
    const order: string[] = []

    const ltrLoader = async () => {
      order.push('ltr start')
      await sleep(200)
      order.push('ltr end')
    }

    const rtlLoader = async () => {
      order.push('rtl start')
      await sleep(220)
      order.push('rtl end')
    }

    const view = createView([]).withCssLoader(BiDi.LTR, ltrLoader).withCssLoader(BiDi.RTL, rtlLoader)

    renderForm(form, {view, language: 'ar-EG'})

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

    const {unmount} = renderForm(form, {view, language: 'ar-EG'})

    await waitFor(() => expect(order).toHaveLength(1))
    expect(order).toStrictEqual(['ltr loaded'])

    unmount()
    await waitFor(() => expect(order).toHaveLength(2))
    expect(order).toStrictEqual(['ltr loaded', 'ltr unloaded'])
  })
})
