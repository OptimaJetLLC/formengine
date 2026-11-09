import {rsAccordionPanel} from '@react-form-builder/components-rsuite'
import {cfDisableToolbarAdd} from '@react-form-builder/core'
import {fireEvent, waitFor} from '@testing-library/react'
import {openToolbarActions} from '../util/openToolbarActions'
import {renderBuilder} from '../util/renderBuilder'

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'accordion',
        type: 'RsAccordion',
        children: [
          {
            key: 'panel1',
            type: 'RsAccordionPanel',
            props: {header: {value: 'Panel 1'}, eventKey: {value: '1'}},
          },
        ],
      },
    ],
  },
}

describe('RsAccordionPanel toolbar', () => {
  it('opts out of toolbar add for accordion panels', () => {
    expect(rsAccordionPanel.build().model.isFeatureEnabled(cfDisableToolbarAdd)).toBe(true)
  })

  it('removes a panel without offering add placement', async () => {
    const {findByRole, findByTestId, queryByRole, queryByTestId} = await renderBuilder(form)

    fireEvent.click(await findByTestId('panel1-editable-wrapper'))
    await openToolbarActions()

    expect(queryByRole('button', {name: 'Add'})).toBeNull()

    fireEvent.click(await findByRole('button', {name: 'Remove component'}))

    await waitFor(() => expect(queryByTestId('panel1-editable-wrapper')).not.toBeInTheDocument())
  })
})
