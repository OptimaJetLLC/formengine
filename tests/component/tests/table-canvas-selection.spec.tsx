import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {rSuiteTableComponents} from '@react-form-builder/components-rsuite-table'
import {BuilderView} from '@react-form-builder/core'
import {fireEvent, waitFor} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {renderBuilder} from '../util/renderBuilder'

const view = new BuilderView([
  ...rSuiteComponents.map(definer => definer.build()),
  ...rSuiteTableComponents.map(definer => definer.build()),
])

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'rsTable1',
        type: 'RsTable',
        children: [
          {
            key: 'rsColumn1',
            type: 'RsColumn',
            children: [
              {key: 'rsHeaderCell1', type: 'RsHeaderCell', props: {children: {value: 'A'}}},
              {key: 'rsCell1', type: 'RsCell'},
            ],
          },
        ],
      },
    ],
  },
}

const overlayOf = (wrapper: HTMLElement): HTMLElement => {
  const overlay = wrapper.querySelector(':scope > [class*="draggableBody"]')
  if (!(overlay instanceof HTMLElement)) throw new Error('Expected a drag overlay')
  return overlay
}

describe('RsTable canvas selection', () => {
  it('selects the table when its drag overlay is clicked', async () => {
    const {findByTestId} = await renderBuilder(form, {view})
    const table = await findByTestId('rsTable1-editable-wrapper')
    const screen = await findByTestId('Screen-editable-wrapper')

    fireEvent.click(overlayOf(table))

    expect(table.className).toMatch(/selected/)
    expect(screen.className).not.toMatch(/selected/)
  })

  it('selects the column when its drag overlay is clicked', async () => {
    const {findByTestId} = await renderBuilder(form, {view})
    const table = await findByTestId('rsTable1-editable-wrapper')
    const column = await findByTestId('rsColumn1-editable-wrapper')

    fireEvent.click(overlayOf(column))

    expect(column.className).toMatch(/selected/)
    expect(table.className).not.toMatch(/selected/)
  })

  it('moves selection from the table to a nested column', async () => {
    const {findByTestId} = await renderBuilder(form, {view})
    const table = await findByTestId('rsTable1-editable-wrapper')
    const column = await findByTestId('rsColumn1-editable-wrapper')

    fireEvent.click(overlayOf(table))
    await waitFor(() => expect(table.className).toMatch(/selected/))

    fireEvent.click(overlayOf(column))
    await waitFor(() => {
      expect(column.className).toMatch(/selected/)
      expect(table.className).not.toMatch(/selected/)
    })
  })
})
