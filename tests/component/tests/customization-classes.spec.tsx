import {render} from '@testing-library/react'
import {expect} from 'vitest'
import App from '../../common/lib/designer/App'

describe(`Component: ${App.name}`, function () {
  it('should apply classes to components group', () => {
    const {container} = render(<App/>)

    expect(container.querySelector('.FE_Palette_ComponentGroup.FE_fields')).toBeInTheDocument()
  })

  it('should apply classes to single component', () => {
    const {container} = render(<App/>)

    expect(container.querySelector('.FE_Palette_Component.FE_RsCalendar.FE_Calendar')).toBeInTheDocument()
  })
})
