import {googleMapModel} from '@react-form-builder/components-google-map'
import {richTextModel} from '@react-form-builder/components-rich-text'
import {models} from '@react-form-builder/components-rsuite'
import {signatureModel} from '@react-form-builder/components-signature'
import {createView, type FormViewerProps} from '@react-form-builder/core'
import {renderViewerForm} from './renderViewerForm'

/** RSuite plus Signature, GoogleMap, and RichText — enough for aria/WCAG valued-component suites. */
const view = createView([...models, signatureModel, googleMapModel, richTextModel])

export const renderForm = (form: object | string, props?: Partial<FormViewerProps>) => {
  return renderViewerForm(view, form, props)
}
