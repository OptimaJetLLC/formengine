import {muiButton} from '@react-form-builder/components-material-ui/button'
import {muiCheckbox} from '@react-form-builder/components-material-ui/checkbox'
import {muiContainer} from '@react-form-builder/components-material-ui/container'
import {muiErrorWrapper} from '@react-form-builder/components-material-ui/error-wrapper'
import {muiTextField} from '@react-form-builder/components-material-ui/text-field'
import {buildForm, type CustomActions, createView, FormViewer} from '@react-form-builder/core'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

const components = [muiContainer, muiTextField, muiButton, muiErrorWrapper, muiCheckbox].map(def => def.build().model)

const view = createView(components)

const loginForm = buildForm({errorType: 'MuiErrorWrapper'})
  .component('container', 'MuiContainer')
  .children(builder =>
    builder
      .component('email', 'MuiTextField')
      .prop('label', 'Email')
      .prop('placeholder', 'Enter your email')
      .validation('required')
      .validation('email')

      // TODO FIXME zod exception on validation
      .component('password', 'MuiTextField')
      .prop('label', 'Password')
      .prop('placeholder', 'Enter your password')
      .prop('type', 'password')
      .validation('required')
      .validation('min')
      .args({limit: 6})
  )

  .component('rememberMe', 'MuiCheckbox')
  .prop('label', 'Remember me')
  .prop('checked', true)

  .component('submit', 'MuiButton')
  .prop('children', 'Login')
  .prop('variant', 'contained')
  .prop('color', 'primary')
  .event('onClick')
  .commonAction('validate')
  .args({failOnError: true})
  .customAction('onSubmit')

  .json()

const getForm = () => loginForm

export const actions: CustomActions = {
  onSubmit: (e: {data: unknown}) => {
    console.warn('Login data', e.data)
  },
}

const App = () => {
  return <FormViewer view={view} getForm={getForm} actions={actions} />
}

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
