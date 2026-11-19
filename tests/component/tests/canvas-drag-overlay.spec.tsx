import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {rSuiteTableComponents} from '@react-form-builder/components-rsuite-table'
import {BuilderView} from '@react-form-builder/core'
import {fireEvent, waitFor} from '@testing-library/react'
import {describe, expect, it, vi} from 'vitest'
import {renderBuilder} from '../util/renderBuilder'

const view = new BuilderView([
  ...rSuiteComponents.map(definer => definer.build()),
  ...rSuiteTableComponents.map(definer => definer.build()),
])

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'minHeightInput',
        type: 'RsInput',
        props: {
          label: {value: 'minHeight'},
          value: {value: '200'},
        },
        css: {any: {string: '  width: 130px;'}},
      },
      {
        key: 'tableHeightTable',
        type: 'RsTable',
        props: {
          height: {value: 200},
          data: {value: [{id: 1, name: 'A'}]},
        },
        children: [
          {
            key: 'idColumn',
            type: 'RsColumn',
            props: {width: {value: 70}},
            children: [
              {key: 'idHeaderCell', type: 'RsHeaderCell', props: {children: {value: 'Id'}}},
              {key: 'idCell', type: 'RsCell', props: {dataKey: {value: 'id'}}},
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

describe('Canvas drag overlay hit targets', () => {
  it('starts an HTML5 drag from the component container', async () => {
    const {findByTestId} = await renderBuilder(form, {view})
    const wrap = await findByTestId('minHeightInput-editable-wrapper')
    const dragStart = vi.fn()
    wrap.addEventListener('dragstart', dragStart)

    fireEvent.dragStart(wrap)

    expect(dragStart).toHaveBeenCalled()
  })

  it('selects a sibling without the table overlay stealing the click', async () => {
    const {findByTestId} = await renderBuilder(form, {view})
    const input = await findByTestId('minHeightInput-editable-wrapper')
    const table = await findByTestId('tableHeightTable-editable-wrapper')

    fireEvent.click(overlayOf(table))
    await waitFor(() => expect(table.className).toMatch(/selected/))

    fireEvent.click(input)
    await waitFor(() => {
      expect(input.className).toMatch(/selected/)
      expect(table.className).not.toMatch(/selected/)
    })
  })

  it('selects a nested column without selecting the parent table', async () => {
    const {findByTestId} = await renderBuilder(form, {view})
    const table = await findByTestId('tableHeightTable-editable-wrapper')
    const column = await findByTestId('idColumn-editable-wrapper')

    fireEvent.click(overlayOf(column))

    expect(column.className).toMatch(/selected/)
    expect(table.className).not.toMatch(/selected/)
  })
})
