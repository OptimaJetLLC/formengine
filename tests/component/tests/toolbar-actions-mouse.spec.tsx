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

/** Presses a toolbar control the way a real mouse does (mousedown → mouseup → click). */
const pressToolbarControl = (control: HTMLElement) => {
  fireEvent.mouseDown(control, {button: 0})
  fireEvent.mouseUp(control, {button: 0})
  fireEvent.click(control, {button: 0})
}

describe('Toolbar actions with real mouse press', () => {
  it('removes the selected component when Remove is pressed with the mouse', async () => {
    const {findByTestId, queryByTestId} = await renderBuilder(form)

    fireEvent.click(await findByTestId('nestedButton-editable-wrapper'))
    await openToolbarActions()

    pressToolbarControl(await findByTestId('toolbar-remove-button'))

    await waitFor(() => expect(queryByTestId('nestedButton-editable-wrapper')).not.toBeInTheDocument())
  })
})
