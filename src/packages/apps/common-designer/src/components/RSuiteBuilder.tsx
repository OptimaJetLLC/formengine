import {ltrCssLoader, RsLocalizationWrapper, rtlCssLoader} from '@react-form-builder/components-rsuite'
import {BiDi, namedObserver} from '@react-form-builder/core'
import {BuilderView} from '@react-form-builder/designer'
import type {FormBuilderAppProps} from '../utils/types'
import {RSuiteBuilderShared} from './RSuiteBuilderShared'
import {
  designerComponents,
  fastQrComponentsDescriptions,
  googleMapComponentsDescriptions,
  richTextEditorComponentsDescriptions,
  rSuiteComponentsDescriptions,
  rSuiteTableComponentsDescriptions,
  signatureComponentsDescriptions,
} from './rsuiteDesignerComponents'

const view = new BuilderView(designerComponents)
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withComponentLibraryDescription(fastQrComponentsDescriptions)
  .withComponentLibraryDescription(googleMapComponentsDescriptions)
  .withComponentLibraryDescription(richTextEditorComponentsDescriptions)
  .withComponentLibraryDescription(signatureComponentsDescriptions)
  .withComponentLibraryDescription(rSuiteTableComponentsDescriptions)
  .withComponentLibraryDescription(rSuiteComponentsDescriptions)

function RSuiteBuilderView(props: FormBuilderAppProps) {
  return <RSuiteBuilderShared view={view} {...props} />
}

export const RSuiteBuilder = namedObserver('RSuiteBuilder', RSuiteBuilderView)
