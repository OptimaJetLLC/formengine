import {fireEvent} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {renderBuilder} from '../util/renderBuilder'
import {switchToViewerMode} from './designerUtils'

const codeActionsForm = {
  modalType: 'RsModal',
  actions: {
    myAction: {body: ''},
  },
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'button',
        type: 'RsButton',
        events: {
          onClick: [{name: 'myAction', type: 'code'}],
        },
      },
      {
        key: 'modal',
        type: 'Modal',
        modal: {
          events: {
            onOpen: [{name: 'myAction', type: 'code'}],
            onClose: [{name: 'myAction', type: 'code'}],
          },
        },
      },
    ],
  },
}

describe('Modal actions test', () => {
  it("The renamed action with the code should be re-attached to the component's event list", async () => {
    const {findByTestId} = await renderBuilder(codeActionsForm)
    const modal = await findByTestId('modal-template-not-specified')
    fireEvent.click(modal)

    const actionsTab = await findByTestId('Actions_Tab')
    fireEvent.click(actionsTab)

    expect(await findByTestId('bound-action-onOpen-code-myAction')).toBeInTheDocument()
    expect(await findByTestId('bound-action-onClose-code-myAction')).toBeInTheDocument()

    const editButton = await findByTestId('edit-action-onOpen-code-myAction')
    fireEvent.click(editButton)

    const formControlWrapper = await findByTestId('form-control-wrapper')
    const actionNameInput = formControlWrapper.querySelector('input')
    expect(actionNameInput).not.toBeNull()
    if (!actionNameInput) {
      throw new Error(`Cannot find action name input for action: myAction`)
    }

    fireEvent.change(actionNameInput, {target: {value: 'myAction2'}})
    fireEvent.click(await findByTestId('save-code-action-button'))

    expect(await findByTestId('edit-action-onOpen-code-myAction2')).toBeInTheDocument()
    expect(await findByTestId('edit-action-onClose-code-myAction2')).toBeInTheDocument()
  })

  it("The renamed action from the settings tab should be re-attached to the component's event list", async () => {
    const {findByTestId} = await renderBuilder(codeActionsForm)

    fireEvent.click(await findByTestId('Settings_Tab'))
    fireEvent.click(await findByTestId('edit-action-myAction'))

    const modal = await findByTestId('modal-template-not-specified')
    fireEvent.click(modal)

    const actionsTab = await findByTestId('Actions_Tab')
    fireEvent.click(actionsTab)

    expect(await findByTestId('bound-action-onOpen-code-myAction')).toBeInTheDocument()
    expect(await findByTestId('bound-action-onClose-code-myAction')).toBeInTheDocument()

    const formControlWrapper = await findByTestId('form-control-wrapper')
    const actionNameInput = formControlWrapper.querySelector('input')
    expect(actionNameInput).not.toBeNull()
    if (!actionNameInput) {
      throw new Error(`Cannot find action name input for action: myAction`)
    }

    fireEvent.change(actionNameInput, {target: {value: 'myAction3'}})
    fireEvent.click(await findByTestId('save-code-action-button'))

    expect(await findByTestId('edit-action-onOpen-code-myAction3')).toBeInTheDocument()
    expect(await findByTestId('edit-action-onClose-code-myAction3')).toBeInTheDocument()
  })

  it('Removing the action should detach the action from the modal events', async () => {
    const {findByTestId, queryByTestId} = await renderBuilder(codeActionsForm)

    fireEvent.click(await findByTestId('Settings_Tab'))

    const modal = await findByTestId('modal-template-not-specified')
    fireEvent.click(modal)

    const actionsTab = await findByTestId('Actions_Tab')
    fireEvent.click(actionsTab)

    expect(await findByTestId('bound-action-onOpen-code-myAction')).toBeInTheDocument()

    fireEvent.click(await findByTestId('remove-action-myAction'))

    expect(await findByTestId('onOpen-add-button')).toBeInTheDocument()
    expect(queryByTestId('bound-action-onOpen-code-myAction')).not.toBeInTheDocument()
  })

  it('A new code action should be added to the event after creation', async () => {
    const {findByTestId} = await renderBuilder(codeActionsForm)

    const modal = await findByTestId('modal-template-not-specified')
    fireEvent.click(modal)

    const actionsTab = await findByTestId('Actions_Tab')
    fireEvent.click(actionsTab)

    expect(await findByTestId('bound-action-onClose-code-myAction')).toBeInTheDocument()

    fireEvent.click(await findByTestId('onClose-add-button'))
    fireEvent.click(await findByTestId('dropdown-menu-code-actions'))
    fireEvent.click(await findByTestId('dropdown-item-add-code-action'))

    const formControlWrapper = await findByTestId('form-control-wrapper')
    const actionNameInput = formControlWrapper.querySelector('input')
    expect(actionNameInput).not.toBeNull()
    if (!actionNameInput) {
      throw new Error(`Cannot find action name input for action: myAction`)
    }

    fireEvent.change(actionNameInput, {target: {value: 'newAction'}})
    fireEvent.click(await findByTestId('save-code-action-button'))

    expect(await findByTestId('edit-action-onClose-code-newAction')).toBeInTheDocument()
  })

  it('Should show a warning in preview when modalTemplate is missing', async () => {
    const {findByText, findByTestId} = await renderBuilder(codeActionsForm)

    expect(await findByTestId('modal-template-not-specified')).toBeInTheDocument()

    await switchToViewerMode(findByText)

    expect(await findByTestId('modal-template-not-specified')).toBeInTheDocument()
  })
})
