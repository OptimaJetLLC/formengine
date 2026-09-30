import {fireEvent, waitFor} from '@testing-library/react'
import {renderBuilder} from '../util/renderBuilder'

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
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
}

describe('Toolbar action keyboard access', () => {
  it('reveals the selection in the tree via the named action', async () => {
    const {findByRole, findByTestId} = await renderBuilder(form)

    fireEvent.click(await findByTestId('nestedButton-editable-wrapper'))
    fireEvent.click(await findByRole('button', {name: 'Reveal in tree'}))

    await waitFor(async () => {
      expect(await findByTestId('Tree_Tab')).toHaveAttribute('aria-selected', 'true')
      expect(await findByTestId('nestedButton')).toBeInTheDocument()
    })
  })

  it('opens nearby components via the named action', async () => {
    const {findByRole, findByTestId} = await renderBuilder(form)

    fireEvent.click(await findByTestId('nestedButton-editable-wrapper'))
    fireEvent.click(await findByRole('button', {name: 'Show nearby components'}))

    expect(await findByTestId('nearby-tree-item-Screen')).toBeInTheDocument()
    expect(await findByTestId('nearby-tree-item-nestedButton')).toBeInTheDocument()
  })
})
