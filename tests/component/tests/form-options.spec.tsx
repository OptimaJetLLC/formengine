import {fireEvent, render, waitFor} from '@testing-library/react'
import {FormManager} from '../components/forms-with-versions/FormManager'

const defaultFormOptions = {formName: 'a', formVersion: 1}

describe('The formOptions prop', () => {
  it('should be sent to the getForm function after the first render', async () => {
    const mockFunction = vi.fn()
    render(<FormManager initialFormOptions={defaultFormOptions} onLoadForm={mockFunction} />)
    await waitFor(() => expect(mockFunction).toHaveBeenCalledWith(defaultFormOptions))
  })

  it('it should be sent to the getForm function after selecting the form name and version', async () => {
    const mockFunction = vi.fn()
    const {container, findByTestId} = render(<FormManager initialFormOptions={defaultFormOptions} onLoadForm={mockFunction} />)

    await waitFor(() => expect(container.querySelector('.FE_Forms_Tab')).toBeInTheDocument())
    fireEvent.click(container.querySelector('.FE_Forms_Tab')!)

    fireEvent.click(await findByTestId('form-list-open-item-b'))
    await waitFor(() => expect(mockFunction).toHaveBeenCalledWith({formName: 'b', formVersion: 1}))

    fireEvent.click(await findByTestId('version-list-open-item-2'))
    await waitFor(() => expect(mockFunction).toHaveBeenCalledWith({formName: 'b', formVersion: 2}))
  })
})
