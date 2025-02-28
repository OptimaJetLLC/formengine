import {render} from '@testing-library/react'
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import {expect} from 'vitest'
import App from '../../common/lib/designer/App'

describe(`Component: ${App.name}`, function () {
  beforeAll(() => {
    i18n.use(initReactI18next).init({resources: {}}).catch(console.error)
  })

  it('should apply classes to components group', () => {
    const {container} = render(<App/>)

    expect(container.querySelector('.FE_Palette_ComponentGroup.FE_fields')).toBeInTheDocument()
  })

  it('should apply classes to single component', () => {
    const {container} = render(<App/>)

    expect(container.querySelector('.FE_Palette_Component.FE_RsCalendar.FE_Calendar')).toBeInTheDocument()
  })
})
