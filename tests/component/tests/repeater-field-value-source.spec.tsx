import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {sortableListComponent} from '@react-form-builder/components-sortable-list'
import type {ComponentData, FormViewerProps, IFormViewer} from '@react-form-builder/core'
import {createView, FormViewer} from '@react-form-builder/core'
import {act, fireEvent, render, waitFor} from '@testing-library/react'
import {useCallback} from 'react'
import {expect} from 'vitest'

type ViewerStore = IFormViewer & {
  formViewerPropsStore: {initialData: Record<string, unknown>}
}

const view = createView([...rSuiteComponents.map(definer => definer.build().model), sortableListComponent.build().model])

const sortableForm = {
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
      {
        key: 'marker',
        type: 'RsInput',
        props: {},
      },
    ],
  },
}

const computedListForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'source',
        type: 'RsInput',
        props: {
          value: {value: '[{"title":"A"},{"title":"B"}]'},
        },
      },
      {
        key: 'list',
        type: 'SortableList',
        props: {
          value: {
            value: [],
            computeType: 'function',
            fnSource: 'return JSON.parse(form.data.source ?? "[]")',
          },
        },
        children: [
          {
            key: 'title',
            type: 'RsInput',
          },
        ],
      },
      {
        key: 'add',
        type: 'RsButton',
        props: {
          children: {value: 'Add'},
        },
        events: {
          onClick: [{name: 'addRow', type: 'common', args: {dataKey: 'list'}}],
        },
      },
    ],
  },
}

interface AppProps {
  form?: Record<string, unknown>
  initialData?: FormViewerProps['initialData']
  viewerRef?: FormViewerProps['viewerRef']
}

const App = ({form = sortableForm, initialData, viewerRef}: AppProps) => {
  const getForm = useCallback(() => JSON.stringify(form), [form])
  return <FormViewer view={view} getForm={getForm} initialData={initialData} viewerRef={viewerRef} />
}

const formTree = (viewer: IFormViewer | null) => viewer?.formData as ComponentData | undefined

const inputValues = (container: HTMLElement) => [...container.querySelectorAll('input')].map(input => (input as HTMLInputElement).value)

describe('RepeaterField value source (Approach A)', () => {
  it('setValue drives row order and form data', async () => {
    const viewerRef: {current: IFormViewer | null} = {current: null}
    const {findAllByDisplayValue, container} = render(<App viewerRef={viewerRef} />)
    await findAllByDisplayValue('Alpha')

    const listField = formTree(viewerRef.current)?.findByKey('list')?.field
    expect(listField).toBeDefined()

    const next = [{title: 'One'}, {title: 'Two'}]
    await act(async () => {
      listField!.setValue(next)
    })

    await waitFor(() => {
      expect(inputValues(container).slice(0, 2)).toEqual(['One', 'Two'])
      expect(viewerRef.current?.formData.data.list).toEqual([{title: 'One'}, {title: 'Two'}])
    })

    await act(async () => {
      listField!.setValue([{title: 'One-patched'}, {title: 'Two'}])
    })
    await waitFor(() => {
      expect(viewerRef.current?.formData.data.list).toEqual([{title: 'One-patched'}, {title: 'Two'}])
    })
  })

  it('writes child cell edits into the owned value array', async () => {
    const viewerRef: {current: IFormViewer | null} = {current: null}
    const {findAllByDisplayValue, container} = render(<App viewerRef={viewerRef} />)
    await findAllByDisplayValue('Alpha')

    const firstInput = container.querySelector('input') as HTMLInputElement
    fireEvent.change(firstInput, {target: {value: 'Alpha-edited'}})

    await waitFor(() => {
      const list = viewerRef.current?.formData.data.list as Array<{title: string}>
      expect(list[0].title).toBe('Alpha-edited')
    })

    const listField = formTree(viewerRef.current)?.findByKey('list')?.field
    expect((listField!.value as Array<{title: string}>)[0].title).toBe('Alpha-edited')
  })

  it('keeps reorder on field.value after a sibling write without mirroring into form viewer initialData', async () => {
    const viewerRef: {current: IFormViewer | null} = {current: null}
    const {container, findAllByDisplayValue, findByDisplayValue} = render(<App viewerRef={viewerRef} />)
    await findAllByDisplayValue('Alpha')

    const listField = formTree(viewerRef.current)?.findByKey('list')?.field
    const reordered = [{title: 'Gamma'}, {title: 'Alpha'}, {title: 'Beta'}]
    await act(async () => {
      listField!.setValue(reordered)
    })

    await waitFor(() => {
      expect(inputValues(container).slice(0, 3)).toEqual(['Gamma', 'Alpha', 'Beta'])
    })

    const store = viewerRef.current as ViewerStore
    expect(store.formViewerPropsStore.initialData.list).not.toEqual(reordered)

    const marker = formTree(viewerRef.current)?.findByKey('marker')?.field
    await act(async () => {
      marker!.setValue('touched')
    })
    await findByDisplayValue('touched')

    expect(inputValues(container).slice(0, 3)).toEqual(['Gamma', 'Alpha', 'Beta'])
    expect(viewerRef.current?.formData.data.list).toEqual(reordered)
  })

  it('addRow and removeRow mutate the owned value array', async () => {
    const formWithActions = {
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: 'list',
            type: 'SortableList',
            props: {
              value: {value: [{title: 'Only'}]},
            },
            children: [{key: 'title', type: 'RsInput'}],
          },
          {
            key: 'add',
            type: 'RsButton',
            props: {children: {value: 'Add'}},
            events: {onClick: [{name: 'addRow', type: 'common', args: {dataKey: 'list'}}]},
          },
          {
            key: 'remove',
            type: 'RsButton',
            props: {children: {value: 'Remove'}},
            events: {onClick: [{name: 'removeRow', type: 'common', args: {dataKey: 'list', index: 0}}]},
          },
        ],
      },
    }

    const viewerRef: {current: IFormViewer | null} = {current: null}
    const {findByText, findByDisplayValue} = render(<App form={formWithActions} viewerRef={viewerRef} />)
    await findByDisplayValue('Only')

    fireEvent.click(await findByText('Add'))
    await waitFor(() => {
      expect(viewerRef.current?.formData.data.list).toHaveLength(2)
    })

    fireEvent.click(await findByText('Remove'))
    await waitFor(() => {
      expect(viewerRef.current?.formData.data.list).toHaveLength(1)
    })
  })

  it('clear sets the owned value to the model default (no rows)', async () => {
    const formWithClear = {
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: 'list',
            type: 'SortableList',
            props: {
              value: {value: [{title: 'A'}, {title: 'B'}]},
            },
            children: [{key: 'title', type: 'RsInput'}],
          },
          {
            key: 'clear',
            type: 'RsButton',
            props: {children: {value: 'Clear'}},
            events: {onClick: [{name: 'clear', type: 'common'}]},
          },
        ],
      },
    }

    const viewerRef: {current: IFormViewer | null} = {current: null}
    const {findByText, findAllByDisplayValue, queryAllByDisplayValue} = render(<App form={formWithClear} viewerRef={viewerRef} />)
    await findAllByDisplayValue('A')
    expect(viewerRef.current?.formData.data.list).toHaveLength(2)

    fireEvent.click(await findByText('Clear'))
    await waitFor(() => {
      // SortableList has no model default for value; clear() sets modelValue (undefined).
      const list = viewerRef.current?.formData.data.list
      expect(list == null || (Array.isArray(list) && list.length === 0)).toBe(true)
      expect(queryAllByDisplayValue('A')).toHaveLength(0)
    })
  })

  it('hydrates owned value from controlled initialData updates', async () => {
    const viewerRef: {current: IFormViewer | null} = {current: null}
    const {findAllByDisplayValue, rerender} = render(<App initialData={{list: [{title: 'First'}]}} viewerRef={viewerRef} />)
    await findAllByDisplayValue('First')
    expect(viewerRef.current?.formData.data.list).toEqual([{title: 'First'}])

    rerender(<App initialData={{list: [{title: 'Second'}, {title: 'Third'}]}} viewerRef={viewerRef} />)
    await findAllByDisplayValue('Second')
    await waitFor(() => {
      expect(viewerRef.current?.formData.data.list).toEqual([{title: 'Second'}, {title: 'Third'}])
    })
  })

  it('keeps computed repeaters expression-driven and still allows ephemeral addRow', async () => {
    // Matches existing booking-form behavior: computeType function seeds rows; addRow can append
    // even though the expression itself returns a fixed array.
    const emptyComputedForm = {
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: 'list',
            type: 'SortableList',
            props: {
              value: {
                value: [],
                computeType: 'function',
                fnSource: 'return []',
              },
            },
            children: [{key: 'title', type: 'RsInput'}],
          },
          {
            key: 'add',
            type: 'RsButton',
            props: {children: {value: 'Add'}},
            events: {onClick: [{name: 'addRow', type: 'common', args: {dataKey: 'list'}}]},
          },
        ],
      },
    }

    const viewerRef: {current: IFormViewer | null} = {current: null}
    const {findByText, queryAllByDisplayValue} = render(<App form={emptyComputedForm} viewerRef={viewerRef} />)

    expect(queryAllByDisplayValue(/.+/).length).toBe(0)
    expect(viewerRef.current?.formData.data.list).toEqual([])

    fireEvent.click(await findByText('Add'))
    await waitFor(() => {
      expect(viewerRef.current?.formData.data.list).toHaveLength(1)
    })
  })

  it('recomputes computed repeater rows when the expression input changes', async () => {
    const viewerRef: {current: IFormViewer | null} = {current: null}
    const {findByDisplayValue, findAllByDisplayValue} = render(<App form={computedListForm} viewerRef={viewerRef} />)
    await findByDisplayValue('A')
    expect(await findAllByDisplayValue(/^[AB]$/)).toHaveLength(2)

    const source = formTree(viewerRef.current)?.findByKey('source')?.field
    await act(async () => {
      source!.setValue('[{"title":"X"}]')
    })

    await waitFor(() => {
      expect(viewerRef.current?.formData.data.list).toEqual([{title: 'X'}])
    })
  })
})
