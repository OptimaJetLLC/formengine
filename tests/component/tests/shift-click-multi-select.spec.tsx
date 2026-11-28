import {fireEvent} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {renderBuilder} from '../util/renderBuilder'

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {key: 'rsLabel1', type: 'RsLabel', props: {children: {value: 'One'}}},
      {key: 'rsLabel2', type: 'RsLabel', props: {children: {value: 'Two'}}},
    ],
  },
}

const overlayOf = (wrapper: HTMLElement): HTMLElement => {
  const overlay = wrapper.querySelector(':scope > [data-fe-drag-overlay]')
  if (!(overlay instanceof HTMLElement)) throw new Error('Expected a drag overlay')
  return overlay
}

/** Primary-button press: mousedown then click (real browsers fire both). */
const mouseActivate = (el: Element, init: MouseEventInit = {}) => {
  fireEvent.mouseDown(el, {button: 0, ...init})
  fireEvent.click(el, init)
}

describe('shift-click multi-select', () => {
  it('keeps both canvas components selected after Shift+click', async () => {
    const {findByTestId} = await renderBuilder(form)
    const first = await findByTestId('rsLabel1-editable-wrapper')
    const second = await findByTestId('rsLabel2-editable-wrapper')

    mouseActivate(overlayOf(first))
    expect(first.className).toMatch(/selected/)

    mouseActivate(overlayOf(second), {shiftKey: true})

    expect(first.className).toMatch(/selected/)
    expect(second.className).toMatch(/selected/)
  })

  it('keeps both tree nodes selected after Shift+click', async () => {
    const {findByTestId} = await renderBuilder(form)

    fireEvent.click(await findByTestId('Tree_Tab'))
    const first = await findByTestId('rsLabel1')
    const second = await findByTestId('rsLabel2')

    mouseActivate(first)
    expect(first.className).toMatch(/selected/)

    mouseActivate(second, {shiftKey: true})

    expect(first.className).toMatch(/selected/)
    expect(second.className).toMatch(/selected/)
  })
})
