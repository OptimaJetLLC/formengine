import {render} from '@testing-library/react'
import {expect} from 'vitest'
import App from './App'

describe(`Component: ${App.name}`, function () {

  it('should render', () => {
    render(<App/>)
  })

  it('should support pass data', async () => {
    const {getByDisplayValue} = render(<App/>)
    expect(getByDisplayValue(/Hello! Hello!/)).toBeInTheDocument()
  })

  it('should support custom actions execution on did mount', async () => {
    const {findByRole} = render(<App/>)
    expect(await findByRole('button', {name: /Current weather/}, {timeout: 15000})).toBeInTheDocument()
  })
})
