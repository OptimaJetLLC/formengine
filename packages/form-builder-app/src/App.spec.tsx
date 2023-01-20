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
})
