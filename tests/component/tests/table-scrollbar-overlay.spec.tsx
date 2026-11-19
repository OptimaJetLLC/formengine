import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {rSuiteTableComponents} from '@react-form-builder/components-rsuite-table'
import {BuilderView, cfUncoverOverflowScrollbar, define} from '@react-form-builder/core'
import {fireEvent} from '@testing-library/react'
import type {ReactNode} from 'react'
import {describe, expect, it} from 'vitest'
import {isBrowserMode} from '../config/isBrowserMode'
import {renderBuilder} from '../util/renderBuilder'

const OverlayProbe = ({children}: {children?: ReactNode}) => <div>{children}</div>

const overlayProbeGap = define(OverlayProbe, 'OverlayProbeGap').uncoverOverflowScrollbar().build()
const overlayProbeFull = define(OverlayProbe, 'OverlayProbeFull').build()

const view = new BuilderView([
  ...rSuiteComponents.map(definer => definer.build()),
  ...rSuiteTableComponents.map(definer => definer.build()),
  overlayProbeGap,
  overlayProbeFull,
])

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
        children: [1, 2, 3, 4, 5, 6].map(column),
      },
    ],
  },
}

const overlayOf = (wrapper: HTMLElement): HTMLElement | null => wrapper.querySelector(':scope > [class*="draggableBody"]')

describe('Table DnD overlay and overflow scrollbar', () => {
  it('selects a nested column under an overflowing table', async () => {
    const {findByTestId} = await renderBuilder(form, {view})
    const table = await findByTestId('rsTable1-editable-wrapper')
    const column = await findByTestId('rsColumn1-editable-wrapper')

    fireEvent.click(overlayOf(column)!)

    expect(column.className).toMatch(/selected/)
    expect(table.className).not.toMatch(/selected/)
  })

  it('selects the table from its drag overlay', async () => {
    const {findByTestId} = await renderBuilder(form, {view})
    const table = await findByTestId('rsTable1-editable-wrapper')

    fireEvent.click(overlayOf(table)!)

    expect(table.className).toMatch(/selected/)
  })

  it('keeps horizontal overflow scrollable on the table', async () => {
    if (!isBrowserMode()) return

    const {findByTestId} = await renderBuilder(form, {view})
    const table = await findByTestId('rsTable1-editable-wrapper')
    table.style.width = '320px'

    const scrollContainer = table.querySelector('[class*="_table_"]')
    if (!(scrollContainer instanceof HTMLElement)) throw new Error('Expected the table scroll container')

    expect(scrollContainer.scrollWidth).toBeGreaterThan(scrollContainer.clientWidth)
    scrollContainer.scrollLeft = 60
    expect(scrollContainer.scrollLeft).toBeGreaterThan(0)

    const column = await findByTestId('rsColumn1-editable-wrapper')
    fireEvent.click(overlayOf(column)!)
    expect(column.className).toMatch(/selected/)
  })

  it('opts into uncover-overflow only when the feature is declared', () => {
    expect(overlayProbeGap.model.isFeatureEnabled(cfUncoverOverflowScrollbar)).toBe(true)
    expect(overlayProbeFull.model.isFeatureEnabled(cfUncoverOverflowScrollbar)).toBe(false)
  })
})
