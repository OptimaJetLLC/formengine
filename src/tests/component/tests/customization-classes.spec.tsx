import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {buildForm} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {render} from '@testing-library/react'
import {expect} from 'vitest'

const form = buildForm().json()

const getFormFn = () => form

const App = () => {
  return <FormBuilder
    licenseKey={generatedLicenseKey}
    getForm={getFormFn}
    view={builderViewWithCss}
  />
}

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
