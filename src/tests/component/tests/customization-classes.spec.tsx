import {render} from '@testing-library/react'
import {expect} from 'vitest'
import App from '../../common/lib/designer/App'

describe(`Component: ${App.name}`, function () {
  it('should apply classes to components group', async () => {
    const {container, findByText} = render(<App/>)

    // check that the component is rendered
    expect(await findByText('Preview')).toBeInTheDocument()
    expect(container.querySelector('.FE_Palette_ComponentGroup.FE_fields')).toBeInTheDocument()
  })

  it('should apply classes to single component', async () => {
    const {container, findByText} = render(<App/>)

    // check that the component is rendered
    expect(await findByText('Preview')).toBeInTheDocument()
    expect(container.querySelector('.FE_Palette_Component.FE_RsCalendar.FE_Calendar')).toBeInTheDocument()
  })
})
