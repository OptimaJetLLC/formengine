import {createView, FormViewerProps} from '@react-form-builder/core'
import {allComponentsViewer} from '@react-form-builder/tests-common/lib/all-components'

import {renderViewerForm} from './renderViewerForm'

const view = createView(allComponentsViewer)

export const renderForm = (form: object | string, props?: Partial<FormViewerProps>) => {
  return renderViewerForm(view, form, props)
}
