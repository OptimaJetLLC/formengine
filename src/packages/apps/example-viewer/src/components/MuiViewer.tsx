import {view} from '@react-form-builder/components-material-ui'
import {buildForm, FormViewer} from '@react-form-builder/core'

const simpleForm = buildForm({errorType: 'MuiErrorWrapper'})
  .component('container', 'MuiBox')
  .children(builder =>
    builder
      .component('firstName', 'MuiTextField')
      .prop('placeholder', 'Enter your first name')
      .prop('label', 'First Name')
      .validation('required')

      .component('lastName', 'MuiTextField')
      .prop('placeholder', 'Enter your last name')
      .prop('label', 'Last Name')
      .validation('required')
  )

  .component('submit', 'MuiButton')
  .prop('children', 'Submit')
  .prop('variant', 'contained')
  .json()

const getForm = () => simpleForm

/**
 * @returns the MUI Form builder.
 */
export const MuiViewer = () => {
  return <FormViewer view={view} getForm={getForm} />
}
