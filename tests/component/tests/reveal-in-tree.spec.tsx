import {fireEvent, waitFor} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {openToolbarActions} from '../util/openToolbarActions'
import {renderBuilder} from '../util/renderBuilder'

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'parentContainer',
        type: 'RsContainer',
        children: [
          {
            key: 'nestedButton',
            type: 'RsButton',
            props: {
              children: {
                value: 'Nested',
              },
            },
          },
        ],
      },
    ],
  },
}

const containerWithChildrenForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'containerA',
        type: 'RsContainer',
        children: [
          {
            key: 'containerB',
            type: 'RsContainer',
            children: [
              {
                key: 'nestedInput',
                type: 'RsInput',
              },
            ],
          },
        ],
      },
    ],
  },
}

describe('Reveal in tree', () => {
  it('should expand ancestors of a selected container that has children', async () => {
    const {findByTestId, queryByTestId, findByText} = await renderBuilder(containerWithChildrenForm)

    fireEvent.click(await findByTestId('containerB-editable-wrapper'))
    fireEvent.click(await findByTestId('Tree_Tab'))
    fireEvent.click(await findByText('Expand all'))
    expect(await findByTestId('containerB')).toBeInTheDocument()

    fireEvent.click(await findByText('Collapse all'))
    await waitFor(() => expect(queryByTestId('containerB')).not.toBeInTheDocument())

    fireEvent.click(await findByTestId('Components_Tab'))
    await openToolbarActions()
    await waitFor(() => expect(queryByTestId('reveal-in-tree-button')).toBeInTheDocument())
    fireEvent.click(await findByTestId('reveal-in-tree-button'))

    expect(await findByTestId('Tree_Tab')).toHaveAttribute('aria-selected', 'true')
    expect(await findByTestId('containerB')).toBeInTheDocument()
  })

  it('should switch to the tree tab, expand ancestors, and show the selected component', async () => {
    const {findByTestId, queryByTestId, findByText} = await renderBuilder(form)

    fireEvent.click(await findByTestId('nestedButton-editable-wrapper'))
    await openToolbarActions()
    fireEvent.click(await findByTestId('reveal-in-tree-button'))

    expect(await findByTestId('Tree_Tab')).toHaveAttribute('aria-selected', 'true')
    expect(await findByTestId('nestedButton')).toBeInTheDocument()

    fireEvent.click(await findByText('Collapse all'))
    await waitFor(() => expect(queryByTestId('nestedButton')).not.toBeInTheDocument())

    await openToolbarActions()
    fireEvent.click(await findByTestId('reveal-in-tree-button'))
    expect(await findByTestId('nestedButton')).toBeInTheDocument()
  })
})
