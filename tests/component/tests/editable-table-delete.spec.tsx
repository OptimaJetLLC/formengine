import {EditableTable, type EditableTableProps} from '@react-form-builder/designer'
import {fireEvent, render, screen, waitFor, within} from '@testing-library/react'
import {useCallback, useState} from 'react'
import {Table} from 'rsuite'

const columns = [
  <Table.Column key="name" width={120}>
    <Table.HeaderCell>Name</Table.HeaderCell>
    <Table.Cell dataKey="name" />
  </Table.Column>,
]

const Harness = ({trackChanges}: {trackChanges: boolean}) => {
  const [data, setData] = useState<EditableTableProps['data']>([{name: 'Alpha'}, {name: 'Beta'}, {name: 'Gamma'}])
  const [changed, setChanged] = useState(false)
  const handleChange = useCallback(
    (next: EditableTableProps['data']) => {
      setData(next)
      if (trackChanges) setChanged(true)
    },
    [trackChanges]
  )

  return (
    <>
      <output>{changed ? 'Modified' : 'Saved'}</output>
      <EditableTable data={data} columns={columns} onChange={handleChange as unknown as EditableTableProps['onChange']} />
    </>
  )
}

describe('EditableTable row deletion', () => {
  it('keeps controlled rows until the parent accepts the deletion', () => {
    const data = [{name: 'Alpha'}, {name: 'Beta'}, {name: 'Gamma'}]
    const onChange = vi.fn()
    render(<EditableTable data={data} columns={columns} onChange={onChange} />)

    const firstRow = screen.getByText('Alpha').closest('[role="row"]')!
    fireEvent.click(within(firstRow as HTMLElement).getByRole('button'))

    expect(onChange).toHaveBeenCalledWith([{name: 'Beta'}, {name: 'Gamma'}])
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(data).toEqual([{name: 'Alpha'}, {name: 'Beta'}, {name: 'Gamma'}])
  })

  it.each([false, true])('removes consecutive rows with change tracking set to %s', async trackChanges => {
    render(<Harness trackChanges={trackChanges} />)

    const firstRow = screen.getByText('Alpha').closest('[role="row"]')!
    fireEvent.click(within(firstRow as HTMLElement).getByRole('button'))

    await waitFor(() => expect(screen.queryByText('Alpha')).not.toBeInTheDocument())
    if (trackChanges) expect(screen.getByText('Modified')).toBeInTheDocument()

    const secondRow = screen.getByText('Beta').closest('[role="row"]')!
    fireEvent.click(within(secondRow as HTMLElement).getByRole('button'))

    await waitFor(() => expect(screen.queryByText('Beta')).not.toBeInTheDocument())
    expect(screen.getByText('Gamma')).toBeInTheDocument()
  })
})
