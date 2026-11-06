import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import {useState} from 'react'
import {afterEach, describe, expect, it, vi} from 'vitest'
import {EditableTable, type EditableTableProps} from '../../../packages/designer/src/features/components/EditableTable/EditableTable'

const Harness = () => {
  const [data, setData] = useState<EditableTableProps['data']>([])
  const onChange = ((next: EditableTableProps['data']) => {
    setData(next)
  }) as unknown as EditableTableProps['onChange']

  return <EditableTable data={data} onChange={onChange} />
}

describe('EditableTable', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('scrolls the new row into view after adding', async () => {
    Element.prototype.scrollIntoView = () => undefined
    const scrollIntoView = vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => undefined)
    render(<Harness />)

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled())
    const row = scrollIntoView.mock.instances.find(node => node instanceof HTMLElement && node.classList.contains('rs-table-row'))
    expect(row).toBeInstanceOf(HTMLElement)
    expect(scrollIntoView.mock.calls.at(-1)?.[0]).toEqual({block: 'nearest', inline: 'nearest'})
  })
})
