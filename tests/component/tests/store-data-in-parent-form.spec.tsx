import {fireEvent, render} from '@testing-library/react'
import {expect} from 'vitest'
import App from '../../common/lib/designer/App'

describe(`storeDataInParentForm test`, function () {
  it('Data should be updated when `storeDataInParentForm` setting is changed', async () => {
    const {findByText, getByTestId} = render(<App/>)

    fireEvent.click(await findByText('Preview'))

    expect(getByTestId('template-login')).toHaveValue('1')
    expect(getByTestId('template-password')).toHaveValue('ok')

    fireEvent.click(await findByText('Edit'))

    // select the component in the component tree
    fireEvent.click(await findByText('Tree'))
    fireEvent.click(await findByText('Template:Test form 1', {selector: 'div'}))

    // change the component property
    fireEvent.click(await findByText('Main'))
    fireEvent.click(await findByText('Store data in parent form'))

    fireEvent.click(await findByText('Preview'))

    expect(getByTestId('template-login')).toHaveValue('tortuga')
    expect(getByTestId('template-password')).toHaveValue('man!')
  }, 10000)
})
