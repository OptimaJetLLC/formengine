import {
  formEngineRsuiteCssLoader,
  ltrCssLoader,
  rsButton,
  rsContainer,
  rsDatePicker,
  rsDropdown,
  rsErrorMessage,
  rsHeader,
  rsInput,
  RsLocalizationWrapper,
  rsTextArea,
  rsTimePicker,
  rsUploader,
} from '@react-form-builder/components-rsuite'
import {signatureComponent} from '@react-form-builder/components-signature'
import {BiDi, createView, FormViewer} from '@react-form-builder/core'
import form from './form.json?raw'

const components = [
  rsContainer,
  rsInput,
  rsButton,
  rsDatePicker,
  rsErrorMessage,
  rsHeader,
  rsDropdown,
  rsTimePicker,
  rsTextArea,
  rsUploader,
  signatureComponent,
].map(def => def.build().model)

const viewWithCss = createView(components)
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader('common', formEngineRsuiteCssLoader)

const getForm = () => form

/**
 * @returns the App element.
 */
export const BundleSizeApp = () => {
  return <FormViewer view={viewWithCss} getForm={getForm} />
}
