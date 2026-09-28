import {printSettings} from '@react-form-builder/components-print'
import {cfNonVisual, cfSingleton} from '@react-form-builder/core'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {fireEvent, render, within} from '@testing-library/react'
import {expect} from 'vitest'

const view = new BuilderView([printSettings.build()])

const emptyForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [],
  },
}

const formWithSettings = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [{key: 'printSettings', type: 'PrintSettings'}],
  },
}

const App = ({form}: {form: object}) => <FormBuilder licenseKey={generatedLicenseKey} getForm={() => JSON.stringify(form)} view={view} />

describe('Singleton palette component', () => {
  it('marks PrintSettings with the singleton feature', () => {
    expect(printSettings.build().model.isFeatureEnabled(cfSingleton)).toBe(true)
  })

  it('disables the palette item with a hint once an instance is on the form', async () => {
    const {findByTestId, unmount} = render(<App form={emptyForm} />)
    fireEvent.click(await findByTestId('Components_Tab'))

    const enabled = await findByTestId('PrintSettings-palette-component')
    expect(enabled).not.toHaveClass('disabled')
    expect(enabled).not.toHaveAttribute('title')
    unmount()

    const next = render(<App form={formWithSettings} />)
    expect(await next.findByTestId('PrintSettings-non-visual-chip')).toBeInTheDocument()
    fireEvent.click(await next.findByTestId('Components_Tab'))

    const disabled = await next.findByTestId('PrintSettings-palette-component')
    expect(disabled).toHaveClass('disabled')
    fireEvent.mouseOver(disabled)
    expect(await next.findByRole('tooltip')).toHaveTextContent('Only one instance of this component is allowed on the form.')
  })

  it('shows the singleton hint in the components modal', async () => {
    const {findByTestId, findByRole, findByText} = render(<App form={formWithSettings} />)
    fireEvent.click(await findByTestId('add-button'))

    const modalTitle = await findByText('Click to add control')
    const modal = modalTitle.closest('.rs-modal') as HTMLElement
    const disabled = await within(modal).findByTestId('PrintSettings-palette-component')
    expect(disabled).toHaveClass('disabled')
    fireEvent.mouseOver(disabled)
    expect(await findByRole('tooltip')).toHaveTextContent('Only one instance of this component is allowed on the form.')
  })
})

describe('Non-visual components', () => {
  it('marks PrintSettings as non-visual', () => {
    expect(printSettings.build().model.isFeatureEnabled(cfNonVisual)).toBe(true)
  })

  it('shows non-visual instances in the bottom bar and tree group, not on the canvas', async () => {
    const {findByTestId, queryByTestId} = render(<App form={formWithSettings} />)

    expect(await findByTestId('non-visual-bar')).toBeInTheDocument()
    expect(await findByTestId('PrintSettings-non-visual-chip')).toBeInTheDocument()
    expect(queryByTestId('print-settings-placeholder')).not.toBeInTheDocument()

    fireEvent.click(await findByTestId('Tree_Tab'))
    expect(await findByTestId('non-visual-tree-group')).toHaveTextContent('Non-visual')
    expect(await findByTestId('printSettings')).toBeInTheDocument()
  })
})
