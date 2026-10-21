import {muiDialog} from '@react-form-builder/components-material-ui'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import {useState} from 'react'

const Dialog = muiDialog.build().model.component

/**
 * Controlled dialog that closes via handleClose / onClose, matching FormEngine modal wiring.
 */
const DialogHarness = () => {
  const [open, setOpen] = useState(true)
  const close = () => setOpen(false)

  return (
    <Dialog open={open} handleClose={close} onClose={close}>
      <div data-testid="dialog-body">Dialog body</div>
    </Dialog>
  )
}

const pressEscape = () => {
  const dialog = screen.getByRole('dialog')
  dialog.focus()
  fireEvent.keyDown(dialog, {key: 'Escape', code: 'Escape', keyCode: 27})
}

describe('MuiDialog Escape key behavior', () => {
  it('closes on Escape (Material UI v9 default; no disableEscapeKeyDown prop)', async () => {
    render(<DialogHarness />)

    expect(await screen.findByTestId('dialog-body')).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    pressEscape()

    await waitFor(() => {
      expect(screen.queryByTestId('dialog-body')).not.toBeInTheDocument()
    })
  })
})
