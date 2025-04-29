import {render} from '@testing-library/react'
import React from 'react'
import {expect} from 'vitest'
import App from '../../common/lib/designer/App'

console.log('REACT VERSION IN TEST:', React.version)

describe(`Component: ${App.name}`, function () {
  it('should render', async () => {
    const {findByText} = render(<App/>)
    // check that the component is rendered
    expect(await findByText('Preview')).toBeInTheDocument()
  })

  it('should support pass data', async () => {
    const {getByDisplayValue, findByText} = render(<App/>)

    // check that the component is rendered
    expect(await findByText('Preview')).toBeInTheDocument()
    expect(getByDisplayValue(/Hello! Hello!/)).toBeInTheDocument()
  })

  it('should support custom actions execution on did mount', async () => {
    const {findByRole, findByText} = render(<App/>)

    // check that the component is rendered
    expect(await findByText('Preview')).toBeInTheDocument()
    expect(await findByRole('button', {name: /Current weather/})).toBeInTheDocument()
  })
})
