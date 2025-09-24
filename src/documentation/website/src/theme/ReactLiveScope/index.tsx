import {viewWithCss} from '@react-form-builder/components-rsuite'
import {buildForm} from '@react-form-builder/core'
import {FormViewer} from '@site/src/components/FormViewer'
import React from 'react'

// Add react-live imports you need here
const ReactLiveScope: unknown = {
  React,
  ...React,
  viewWithCss,
  buildForm,
  FormViewer
}

export default ReactLiveScope
