import {fireEvent, waitFor} from '@testing-library/react'
import {openToolbarActions} from '../util/openToolbarActions'
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

const removeSelectedViaToolbar = async (findByTestId: (id: string) => Promise<HTMLElement>) => {
  fireEvent.click(await findByTestId('nestedButton-editable-wrapper'))
  await openToolbarActions()
  fireEvent.click(await findByTestId('toolbar-remove-button'))
}

describe('Toolbar RTL expansion', () => {
  it('removes the selected component through the RTL action strip', async () => {
    const {findByTestId, queryByTestId} = await renderBuilder(form, {defaultBuilderLanguage: 'ar-EG'})

    await removeSelectedViaToolbar(findByTestId)

    await waitFor(() => expect(queryByTestId('nestedButton-editable-wrapper')).not.toBeInTheDocument())
  })

  it('removes the selected component through the LTR action strip', async () => {
    const {findByTestId, queryByTestId} = await renderBuilder(form)

    await removeSelectedViaToolbar(findByTestId)

    await waitFor(() => expect(queryByTestId('nestedButton-editable-wrapper')).not.toBeInTheDocument())
  })
})
