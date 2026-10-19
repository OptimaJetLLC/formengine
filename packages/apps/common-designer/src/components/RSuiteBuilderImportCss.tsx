import {RsViewWrapper} from '@react-form-builder/components-rsuite'
import {namedObserver} from '@react-form-builder/core'
import {BuilderView} from '@react-form-builder/designer'
import type {FormBuilderAppProps} from '../utils/types'
import {RSuiteBuilderShared} from './RSuiteBuilderShared'
import {
  designerComponents,
  fastQrComponentsDescriptions,
  googleMapComponentsDescriptions,
  printComponentsDescriptions,
  richTextEditorComponentsDescriptions,
  rSuiteComponentsDescriptions,
  rSuiteTableComponentsDescriptions,
  signatureComponentsDescriptions,
  sortableListComponentsDescriptions,
} from './rsuiteDesignerComponents'

import '@react-form-builder/core/assets/styles.css'
import '@react-form-builder/components-rsuite/assets/styles.ltr.css'

const view = new BuilderView(designerComponents)
  .withViewerWrapper(RsViewWrapper)
  .withComponentLibraryDescription(fastQrComponentsDescriptions)
  .withComponentLibraryDescription(googleMapComponentsDescriptions)
  .withComponentLibraryDescription(richTextEditorComponentsDescriptions)
  .withComponentLibraryDescription(signatureComponentsDescriptions)
  .withComponentLibraryDescription(printComponentsDescriptions)
  .withComponentLibraryDescription(sortableListComponentsDescriptions)
  .withComponentLibraryDescription(rSuiteTableComponentsDescriptions)
  .withComponentLibraryDescription(rSuiteComponentsDescriptions)

function RSuiteBuilderImportCssView(props: FormBuilderAppProps) {
  return <RSuiteBuilderShared view={view} {...props} />
}

export const RSuiteBuilderImportCss = namedObserver('RSuiteBuilderImportCss', RSuiteBuilderImportCssView)
