import {view} from '@react-form-builder/components-mantine'
import {FormViewerProps} from '@react-form-builder/core'

import '@mantine/core/styles.css'
import {renderViewerForm} from './renderViewerForm'

export const renderForm = (form: object | string, props?: Partial<FormViewerProps>) => {
  return renderViewerForm(view, form, props)
}
