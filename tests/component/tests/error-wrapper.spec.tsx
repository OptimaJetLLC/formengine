import {buildForm, type ErrorWrapperProps} from '@react-form-builder/core'
import {describe, expect, it} from 'vitest'
import {renderForm} from '../util/renderRsuiteForm'

const form = buildForm().component('testComponent', 'NoSuchComponent').json()

const customErrorWrapper = (props: ErrorWrapperProps) => {
  const {error, children, className} = props
  return (
    <div data-testid="custom-error-wrapper" className={className}>
      {error && <div data-testid="custom-error-message">{error}</div>}
      {children}
    </div>
  )
}

describe('FormViewerProps.errorWrapper tests', () => {
  it('The standard error wrapper should be displayed', async () => {
    const {findByText} = renderForm(form)

    expect(await findByText('"Type \'NoSuchComponent\' is not found!"')).toBeInTheDocument()
  })

  it('The custom error wrapper should be displayed', async () => {
    const {findByTestId, findByText} = renderForm(form, {errorWrapper: customErrorWrapper})

    expect(await findByText('"Type \'NoSuchComponent\' is not found!"')).toBeInTheDocument()
    expect(await findByTestId('custom-error-wrapper')).toBeInTheDocument()
  })
})
