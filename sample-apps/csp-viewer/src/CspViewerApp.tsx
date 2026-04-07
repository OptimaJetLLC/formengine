import {googleMapComponent} from '@react-form-builder/components-google-map'
import {richTextComponent} from '@react-form-builder/components-rich-text'
import {RsLocalizationWrapper, rSuiteComponents} from '@react-form-builder/components-rsuite'
import {rSuiteTableComponents} from '@react-form-builder/components-rsuite-table'
import {signatureComponent} from '@react-form-builder/components-signature'
import {createView, FormViewer} from '@react-form-builder/core'
import form from './form.json'

const components = [
  ...rSuiteComponents,
  richTextComponent,
  googleMapComponent,
  signatureComponent,
  ...rSuiteTableComponents,
].map(definer => definer.build().model)

const view = createView(components)
  .withViewerWrapper(RsLocalizationWrapper)

const getForm = () => JSON.stringify(form)

/**
 * @returns the main application component.
 */
export const CspViewerApp = () => {
  return <FormViewer view={view} getForm={getForm} />
}
