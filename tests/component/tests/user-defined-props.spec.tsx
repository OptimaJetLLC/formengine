import {fireEvent} from '@testing-library/react'
import {renderForm} from '../util/renderRsuiteForm'
import form from './forms/user-defined-props-change-form.json'

describe('User defined properties test', () => {
  it('User defined properties should be accessible in ActionEventArgs', async () => {
    const {findByTestId} = renderForm(form)

    const button = await findByTestId('button1')
    expect(button).toHaveTextContent('Button')

    fireEvent.click(button)
    expect(button).toHaveTextContent('New caption1')

    fireEvent.click(button)
    expect(button).toHaveTextContent('New caption11')
  })
})
