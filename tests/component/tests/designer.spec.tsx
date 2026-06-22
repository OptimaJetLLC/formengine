import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormBuilder} from '@react-form-builder/designer'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {render, RenderResult} from '@testing-library/react'
import React from 'react'
import {expect} from 'vitest'
import form from './forms/designer-form.json'

const getFormFn = () => JSON.stringify(form)

const designerReady = async ({findByTestId}: RenderResult) => {
  return expect(await findByTestId('mainScreen')).toBeInTheDocument()
}

const App = () => {
  return <FormBuilder
    initialData={{title: 'Hello! Hello!'}}
    licenseKey={generatedLicenseKey}
    getForm={getFormFn}
    view={builderViewWithCss}
  />
}

console.log('REACT VERSION IN TEST:', React.version)

describe(`Component: ${App.name}`, function () {
  it('should render', async () => {
    const app = render(<App/>)
    const {findByText} = app

    await designerReady(app)

    // check that the component is rendered
    expect(await findByText('Preview')).toBeInTheDocument()
  })

  it('should support pass data', async () => {
    const app = render(<App/>)
    const {getByDisplayValue, findByTestId} = app

    await designerReady(app)

    // check that the component is rendered
    expect(await findByTestId('title-input')).toBeInTheDocument()
    expect(getByDisplayValue(/Hello! Hello!/)).toBeInTheDocument()
  })

  it('should support custom actions execution on did mount', async () => {
    const app = render(<App/>)
    const {findByRole, findByText} = app

    await designerReady(app)

    // check that the component is rendered
    expect(await findByText('Preview')).toBeInTheDocument()
    expect(await findByRole('button', {name: /Current weather/})).toBeInTheDocument()
  })
})
