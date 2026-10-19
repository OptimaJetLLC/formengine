import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {sortableListComponent} from '@react-form-builder/components-sortable-list'
import type {ComponentData, FormViewerProps, IFormViewer} from '@react-form-builder/core'
import {createView, FormViewer} from '@react-form-builder/core'
import {act, fireEvent, render, waitFor} from '@testing-library/react'
import {useCallback} from 'react'
import {expect} from 'vitest'
import {moveArrayItem} from '../../../packages/views/sortable-list/src/moveArrayItem.ts'
import {resolveValueReorderIndices} from '../../../packages/views/sortable-list/src/resolveValueReorderIndices.ts'

const view = createView([...rSuiteComponents.map(definer => definer.build().model), sortableListComponent.build().model])

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'list',
        type: 'SortableList',
        props: {
          value: {
            value: [{title: 'Alpha'}, {title: 'Beta'}, {title: 'Gamma'}],
          },
        },
        children: [
          {
            key: 'title',
            type: 'RsInput',
          },
        ],
      },
    ],
  },
}

const disabledForm = {
  form: {
    ...form.form,
    children: [
      {
        ...form.form.children[0],
        props: {
          ...form.form.children[0].props,
          disabled: {value: true},
        },
      },
    ],
  },
}

const readOnlyForm = {
  form: {
    ...form.form,
    children: [
      {
        ...form.form.children[0],
        props: {
          ...form.form.children[0].props,
          readOnly: {value: true},
        },
      },
    ],
  },
}

interface SortableListAppProps {
  getForm?: FormViewerProps['getForm']
  viewerRef?: FormViewerProps['viewerRef']
}

const SortableListApp = ({getForm, viewerRef}: SortableListAppProps) => {
  const loadForm = useCallback(() => JSON.stringify(form), [])
  return <FormViewer view={view} getForm={getForm ?? loadForm} viewerRef={viewerRef} />
}

const inputValues = (container: HTMLElement) => [...container.querySelectorAll('input')].map(input => (input as HTMLInputElement).value)

const formTree = (viewer: IFormViewer | null) => viewer?.formData as ComponentData | undefined

describe('moveArrayItem', () => {
  it('moves an item to a new index', () => {
    expect(moveArrayItem(['A', 'B', 'C'], 0, 2)).toEqual(['B', 'C', 'A'])
    expect(moveArrayItem(['A', 'B', 'C'], 2, 0)).toEqual(['C', 'A', 'B'])
  })

  it('returns the same array when the move is a no-op', () => {
    const items = ['A', 'B']
    expect(moveArrayItem(items, 0, 0)).toBe(items)
    expect(moveArrayItem(items, -1, 1)).toBe(items)
    expect(moveArrayItem(items, 0, 5)).toBe(items)
  })
})

describe('resolveValueReorderIndices', () => {
  it('maps visible sortable indices through value indices when a middle row is filtered out', () => {
    // Visible rows keep value indices 0 and 2 (middle item hidden by itemRenderWhen).
    const valueIndices = [0, 2]
    const resolved = resolveValueReorderIndices(valueIndices, 0, 1)
    expect(resolved).toEqual({fromIndex: 0, toIndex: 2})

    const value = [{title: 'Alpha'}, {title: 'Beta'}, {title: 'Gamma'}]
    // Same as legacy DnD: from/to are value indices, not visible-list indices.
    expect(moveArrayItem(value, resolved!.fromIndex, resolved!.toIndex)).toEqual([{title: 'Beta'}, {title: 'Gamma'}, {title: 'Alpha'}])
    // Using raw sortable indices against the full value would corrupt order.
    expect(moveArrayItem(value, 0, 1)).toEqual([{title: 'Beta'}, {title: 'Alpha'}, {title: 'Gamma'}])
  })

  it('returns undefined when a value index is missing', () => {
    expect(resolveValueReorderIndices([0], 0, 1)).toBeUndefined()
  })
})

describe('SortableList', () => {
  it('registers as a repeater-kind component', () => {
    const {model} = sortableListComponent.build()
    expect(model.type).toBe('SortableList')
    expect(model.kind).toBe('repeater')
  })

  it('renders a drag handle for each row', async () => {
    const {findAllByTestId, findAllByDisplayValue} = render(<SortableListApp />)
    expect(await findAllByDisplayValue('Alpha')).toHaveLength(1)
    expect(await findAllByDisplayValue('Beta')).toHaveLength(1)
    expect(await findAllByDisplayValue('Gamma')).toHaveLength(1)
    const handles = await findAllByTestId('sortable-list-handle')
    expect(handles).toHaveLength(3)
    expect(handles[0]).toHaveAttribute('aria-label', 'Reorder row')
  })

  it('does not show drag handles when disabled', async () => {
    const getForm = () => JSON.stringify(disabledForm)
    const {findAllByDisplayValue, queryAllByTestId} = render(<SortableListApp getForm={getForm} />)
    expect(await findAllByDisplayValue('Alpha')).toHaveLength(1)
    expect(queryAllByTestId('sortable-list-handle')).toHaveLength(0)
  })

  it('does not show drag handles when readOnly', async () => {
    const getForm = () => JSON.stringify(readOnlyForm)
    const {findAllByDisplayValue, queryAllByTestId} = render(<SortableListApp getForm={getForm} />)
    expect(await findAllByDisplayValue('Alpha')).toHaveLength(1)
    expect(queryAllByTestId('sortable-list-handle')).toHaveLength(0)
  })

  it('keeps focus on a row input while typing', async () => {
    const {findByDisplayValue} = render(<SortableListApp />)
    const input = (await findByDisplayValue('Alpha')) as HTMLInputElement
    input.focus()
    expect(document.activeElement).toBe(input)

    fireEvent.change(input, {target: {value: 'Alpha edited'}})

    await waitFor(() => {
      expect(input.value).toBe('Alpha edited')
    })
    expect(document.activeElement).toBe(input)
  })

  it('updates row order when the repeater field value is reordered', async () => {
    const viewerRef: {current: IFormViewer | null} = {current: null}
    const {container, findAllByDisplayValue} = render(<SortableListApp viewerRef={viewerRef} />)
    await findAllByDisplayValue('Alpha')

    expect(inputValues(container)).toEqual(['Alpha', 'Beta', 'Gamma'])

    const listField = formTree(viewerRef.current)?.findByKey('list')?.field
    expect(listField).toBeDefined()
    await act(async () => {
      listField!.setValue([{title: 'Beta'}, {title: 'Gamma'}, {title: 'Alpha'}])
    })

    await waitFor(() => {
      expect(inputValues(container)).toEqual(['Beta', 'Gamma', 'Alpha'])
    })
    expect(viewerRef.current?.formData.data.list).toEqual([{title: 'Beta'}, {title: 'Gamma'}, {title: 'Alpha'}])
  })

  it('keeps reordered repeater data after another field updates form initial data', async () => {
    // A sibling valued field write mutates formViewerPropsStore.initialData and re-runs
    // RepeaterField's data-change reaction. Without setInitialData in setValue, that reaction
    // would restore the schema value and snap the list order back.
    const formWithMarker = {
      form: {
        ...form.form,
        children: [
          form.form.children[0],
          {
            key: 'marker',
            type: 'RsInput',
            props: {},
          },
        ],
      },
    }
    const viewerRef: {current: IFormViewer | null} = {current: null}
    const getForm = () => JSON.stringify(formWithMarker)
    const {container, findAllByDisplayValue, findByDisplayValue} = render(<SortableListApp getForm={getForm} viewerRef={viewerRef} />)
    await findAllByDisplayValue('Alpha')

    const listField = formTree(viewerRef.current)?.findByKey('list')?.field
    expect(listField).toBeDefined()
    const reordered = [{title: 'Gamma'}, {title: 'Alpha'}, {title: 'Beta'}]
    await act(async () => {
      listField!.setValue(reordered)
    })

    await waitFor(() => {
      expect(inputValues(container).slice(0, 3)).toEqual(['Gamma', 'Alpha', 'Beta'])
    })

    const marker = formTree(viewerRef.current)?.findByKey('marker')?.field
    expect(marker).toBeDefined()
    await act(async () => {
      marker!.setValue('touched')
    })

    await findByDisplayValue('touched')
    expect(inputValues(container).slice(0, 3)).toEqual(['Gamma', 'Alpha', 'Beta'])
    expect(viewerRef.current?.formData.data.list).toEqual(reordered)
  })
})
