import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material'
import {view as muiView} from '@react-form-builder/components-material-ui'
import {viewWithCss} from '@react-form-builder/components-rsuite'
import {
  array,
  boolean,
  buildForm,
  className,
  color,
  createView,
  date,
  define,
  disabled,
  event,
  fn,
  node,
  number,
  object,
  oneOf,
  readOnly,
  required,
  size,
  someOf,
  string,
  time,
  useAriaErrorMessage,
  useComponentData,
  useErrorMessage
} from '@react-form-builder/core'
import {FormViewer} from '@site/src/components/FormViewer'
import React from 'react'

const rSuiteView = viewWithCss

// Add react-live imports you need here
const ReactLiveScope: unknown = {
  React,
  ...React,
  viewWithCss,
  muiView,
  buildForm,
  FormViewer,
  define,
  event,
  string,
  boolean,
  number,
  size,
  date,
  time,
  array,
  color,
  className,
  node,
  object,
  oneOf,
  someOf,
  readOnly,
  disabled,
  fn,
  createView,
  useComponentData,
  useAriaErrorMessage,
  useErrorMessage,
  required,
  rSuiteView,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
}

export default ReactLiveScope
