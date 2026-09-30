import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {rSuiteTableComponents} from '@react-form-builder/components-rsuite-table'
import {BuilderView} from '@react-form-builder/core'
import {fireEvent} from '@testing-library/react'
import {renderBuilder} from '../util/renderBuilder'

const view = new BuilderView([...rSuiteComponents, ...rSuiteTableComponents].map(definer => definer.build()))

const column = (index: number) => ({
  key: `rsColumn${index}`,
  type: 'RsColumn',
  children: [
    {
      key: `rsHeaderCell${index}`,
      type: 'RsHeaderCell',
      props: {
        children: {value: `Column ${index}`},
      },
    },
    {key: `rsCell${index}`, type: 'RsCell'},
  ],
})

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
            key: 'rsColumnGroup1',
            type: 'RsColumnGroup',
            children: [column(1), column(2)],
          },
          column(3),
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

describe('ColumnGroup canvas selection', () => {
  it('selects the column group on the canvas', async () => {
    const {findByTestId} = await renderBuilder(form, {view})
    const group = await findByTestId('rsColumnGroup1-editable-wrapper')

    fireEvent.click(group)

    expect(group.className).toContain('selected')
  })

  it('selects a nested column inside the group without selecting the group', async () => {
    const {findByTestId} = await renderBuilder(form, {view})
    const group = await findByTestId('rsColumnGroup1-editable-wrapper')
    const nested = await findByTestId('rsColumn1-editable-wrapper')

    fireEvent.click(overlayOf(nested))

    expect(nested.className).toMatch(/selected/)
    expect(group.className).not.toMatch(/selected/)
  })

  it('selects a sibling column outside the group', async () => {
    const {findByTestId} = await renderBuilder(form, {view})
    const group = await findByTestId('rsColumnGroup1-editable-wrapper')
    const sibling = await findByTestId('rsColumn3-editable-wrapper')

    fireEvent.click(overlayOf(sibling))

    expect(sibling.className).toMatch(/selected/)
    expect(group.className).not.toMatch(/selected/)
  })
})
