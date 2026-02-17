import {FormBuilderApp} from '@react-form-builder/apps-common-designer'
import React from 'react'
// eslint-disable-next-line import/extensions
import {createRoot} from 'react-dom/client'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <FormBuilderApp appName="demo" />
  </React.StrictMode>
)
