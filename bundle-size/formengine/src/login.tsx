import {rsButton} from '@react-form-builder/components-rsuite/button'
import {rsContainer} from '@react-form-builder/components-rsuite/container'
import {rsErrorMessage} from '@react-form-builder/components-rsuite/error-message'
import {rsInput} from '@react-form-builder/components-rsuite/input'
import {buildForm, type CustomActions, createView, FormViewer} from '@react-form-builder/core'
import {StrictMode} from 'react'

import '@react-form-builder/components-rsuite/css/rsuite-no-reset.min.css'
import '@react-form-builder/components-rsuite/css/formengine-rsuite.css'
import {createRoot} from 'react-dom/client'

const components = [rsContainer, rsInput, rsButton, rsErrorMessage].map(def => def.build().model)

const viewWithCss = createView(components)

const loginForm = buildForm({errorType: 'RsErrorMessage'})
  .component('email', 'RsInput')
  .prop('label', 'Email')
  .prop('placeholder', 'Enter your email')
  .validation('required')
  .validation('email')

  // TODO FIXME zod exception on validation
  .component('password', 'RsInput')
  .prop('label', 'Password')
  .prop('placeholder', 'Enter your password')
  .prop('passwordMask', true)
  .validation('required')
  .validation('min')
  .args({limit: 6})

  .component('rememberMe', 'RsInput')
  .prop('type', 'checkbox')
  .prop('label', 'Remember me')
  .prop('value', true)

  .component('submit', 'RsButton')
  .prop('children', 'Login')
  .prop('color', 'blue')
  .prop('appearance', 'primary')
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
  return <FormViewer view={viewWithCss} getForm={getForm} actions={actions} />
}

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
