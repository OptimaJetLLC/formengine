import {fireEvent, waitFor, within} from '@testing-library/react'
import {addSiblingLabelFromToolbar} from '../util/openToolbarActions'
import {renderBuilder} from '../util/renderBuilder'

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'grandparent',
        type: 'RsContainer',
        props: {},
        children: [
          {
            key: 'parent',
            type: 'RsContainer',
            props: {},
            children: [
              {
                key: 'current',
                type: 'RsContainer',
                props: {},
                children: [
                  {
                    key: 'childA',
                    type: 'RsInput',
                    props: {},
                  },
                  {
                    key: 'childB',
                    type: 'RsInput',
                    props: {},
                  },
                ],
              },
              {
                key: 'sibling',
                type: 'RsInput',
                props: {},
              },
            ],
          },
        ],
      },
    ],
  },
}

const compactToolbar = (): HTMLElement => {
  const toolbar = document.querySelector('[data-fe-toolbar].compact')
  if (!(toolbar instanceof HTMLElement)) throw new Error('Expected the compact tree toolbar')
  return toolbar
}

const hoverTreeRow = async (
  findByTestId: (id: string) => Promise<HTMLElement>,
  findByText: (text: string) => Promise<HTMLElement>,
  nodeKey: string
) => {
  fireEvent.click(await findByTestId('Tree_Tab'))
  fireEvent.click(await findByText('Expand all'))
  const row = (await findByTestId(nodeKey)).parentElement
  if (!(row instanceof HTMLElement)) throw new Error(`Expected a tree row for ${nodeKey}`)
  fireEvent.mouseEnter(row)
  await waitFor(() => expect(document.querySelector('[data-fe-toolbar].compact [data-testid="tree-clone-button"]')).toBeTruthy())
  return row
}

const cloneFromCompactToolbar = async () => {
  fireEvent.click(within(compactToolbar()).getByTestId('tree-clone-button'))
}

describe('Nearby component tree button', () => {
  it('selects a nearby node without switching to the tree tab', async () => {
    const {findByTestId, queryByTestId} = await renderBuilder(form)

    fireEvent.click(await findByTestId('current-editable-wrapper'))
    fireEvent.click(await findByTestId('nearby-tree-button'))

    expect(await findByTestId('nearby-tree-item-childA')).toBeInTheDocument()
    expect(queryByTestId('nearby-tree-item-sibling')).not.toBeInTheDocument()

    const treeTabSelected = (await findByTestId('Tree_Tab')).getAttribute('aria-selected')
    fireEvent.click(await findByTestId('nearby-tree-item-childA'))

    await waitFor(async () => {
      expect(await findByTestId('childA-editable-wrapper')).toHaveClass('selected')
    })
    expect((await findByTestId('Tree_Tab')).getAttribute('aria-selected')).toBe(treeTabSelected)
  })

  it('adds a sibling from the canvas toolbar', async () => {
    const {findByRole, findByTestId} = await renderBuilder(form)

    fireEvent.click(await findByTestId('current-editable-wrapper'))
    await addSiblingLabelFromToolbar({findByRole, findByTestId})
  })

  it('clones from the tree toolbar without nearby navigation', async () => {
    const {findByTestId, findByText} = await renderBuilder(form)

    await hoverTreeRow(findByTestId, findByText, 'current')

    const toolbar = compactToolbar()
    expect(within(toolbar).queryByRole('button', {name: 'Show nearby components'})).toBeNull()
    expect(within(toolbar).queryByTestId('toolbar-actions-button')).toBeNull()
    expect(within(toolbar).queryByText('current')).toBeNull()
    await cloneFromCompactToolbar()

    await waitFor(async () => expect(await findByTestId('rsContainer1-editable-wrapper')).toBeInTheDocument())
  })

  it('keeps tree toolbar actions usable after the pointer moves onto the toolbar', async () => {
    const {findByTestId, findByText} = await renderBuilder(form)

    const row = await hoverTreeRow(findByTestId, findByText, 'current')
    fireEvent.mouseLeave(row, {relatedTarget: compactToolbar()})
    await cloneFromCompactToolbar()

    await waitFor(async () => expect(await findByTestId('rsContainer1-editable-wrapper')).toBeInTheDocument())
  })
})

describe('Tree row toolbar during a drag', () => {
  const dragTreeRow = async (findByTestId: (id: string) => Promise<HTMLElement>, findByText: (text: string) => Promise<HTMLElement>) => {
    const row = await hoverTreeRow(findByTestId, findByText, 'current')
    const draggable = row.parentElement
    if (!(draggable instanceof HTMLElement)) throw new Error('Expected a draggable tree node')

    fireEvent.dragStart(draggable)
    await waitFor(() => expect(document.querySelector('[data-fe-toolbar].compact')).toBeNull())

    return {row, draggable}
  }

  it('hides the row toolbar while a drag is in progress and shows it again when the drag ends', async () => {
    const {findByTestId, findByText} = await renderBuilder(form)
    const {draggable} = await dragTreeRow(findByTestId, findByText)

    fireEvent.dragEnd(draggable)
    await waitFor(() => expect(within(compactToolbar()).getByTestId('tree-clone-button')).toBeTruthy())
  })

  it('restores the row toolbar when the pointer moves over the row again', async () => {
    const {findByTestId, findByText} = await renderBuilder(form)
    const {row, draggable} = await dragTreeRow(findByTestId, findByText)

    // After a drag the browsers do not reliably deliver mouse enter events to the row, so the pointer is also tracked by the mouse move.
    fireEvent.mouseOut(row, {relatedTarget: document.body})
    fireEvent.dragEnd(draggable)
    expect(document.querySelector('[data-fe-toolbar].compact')).toBeNull()

    fireEvent.mouseMove(row)
    await waitFor(() => expect(within(compactToolbar()).getByTestId('tree-clone-button')).toBeTruthy())
  })
})
