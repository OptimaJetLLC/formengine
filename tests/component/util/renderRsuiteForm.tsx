import {view} from '@react-form-builder/components-rsuite'
import type {FormViewerProps} from '@react-form-builder/core'
import {renderViewerForm} from './renderViewerForm'

export const renderForm = (form: object | string, props?: Partial<FormViewerProps>) => {
  return renderViewerForm(view, form, props)
}
