import {RSuiteForm} from '@react-form-builder/apps-common'
import {fastQrComponent, fastQrComponentsDescriptions} from '@react-form-builder/components-fast-qr'
import {googleMapComponent, googleMapComponentsDescriptions} from '@react-form-builder/components-google-map'
import {printComponents, printComponentsDescriptions} from '@react-form-builder/components-print'
import {richTextComponent, richTextEditorComponentsDescriptions} from '@react-form-builder/components-rich-text'
import {rSuiteComponents, rSuiteComponentsDescriptions} from '@react-form-builder/components-rsuite'
import {rSuiteTableComponents, rSuiteTableComponentsDescriptions} from '@react-form-builder/components-rsuite-table'
import {signatureComponent, signatureComponentsDescriptions} from '@react-form-builder/components-signature'

/**
 * Component stores used by the shared RSuite designer (FormBuilderApp).
 */
export const designerComponents = [
  ...rSuiteComponents,
  fastQrComponent,
  richTextComponent,
  googleMapComponent,
  signatureComponent,
  ...printComponents,
  ...rSuiteTableComponents,
].map(definer => definer.build())

export const forms = {RSuiteForm}
export const sampleFormName = 'RSuiteForm'

export {
  fastQrComponentsDescriptions,
  googleMapComponentsDescriptions,
  printComponentsDescriptions,
  richTextEditorComponentsDescriptions,
  signatureComponentsDescriptions,
  rSuiteTableComponentsDescriptions,
  rSuiteComponentsDescriptions,
}
