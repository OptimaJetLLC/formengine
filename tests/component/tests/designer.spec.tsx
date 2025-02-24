import {render} from '@testing-library/react'
import i18n from 'i18next'
import React from 'react'
import {initReactI18next} from 'react-i18next'
import {expect} from 'vitest'
import App from '../../common/lib/designer/App'

i18n.use(initReactI18next).init({resources: {}})

console.log('REACT VERSION IN TEST:', React.version)

describe(`Component: ${App.name}`, function () {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation((msg, b, c) => {
      console.log('ERROR:', msg)
      // debugger
    })
  })

  it('should render', () => {
    render(<App/>)
  })

  it('should support pass data', () => {
    const {getByDisplayValue} = render(<App/>)

    expect(getByDisplayValue(/Hello! Hello!/)).toBeInTheDocument()
  })

  it('should support custom actions execution on did mount', async () => {
    const {findByRole} = render(<App/>)

    expect(await findByRole('button', {name: /Current weather/})).toBeInTheDocument()
  })
})
