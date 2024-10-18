import {render} from '@testing-library/react'
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import {expect} from 'vitest'
import App from './App'

i18n.use(initReactI18next).init({resources: {}})

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
