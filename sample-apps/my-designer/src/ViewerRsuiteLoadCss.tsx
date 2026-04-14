import {ltrCssLoader, RsLocalizationWrapper, rSuiteComponents, rtlCssLoader} from '@react-form-builder/components-rsuite'
import {BiDi, createView, FormViewer, FormViewerProps} from '@react-form-builder/core'

import '@react-form-builder/core/assets/styles.css'
import '@react-form-builder/components-rsuite/assets/styles.ltr.css'

import rsuiteViewerForm from './rsuiteViewerForm.json'

const components = rSuiteComponents.map((definer) => definer.build().model)

const view = createView(components)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withViewerWrapper(RsLocalizationWrapper)

const formJson = JSON.stringify(rsuiteViewerForm)

const actions: FormViewerProps['actions'] = {
  onSubmit: (e) => {
    alert('Form data: ' + JSON.stringify(e.data))
  }
}

/**
 * Form viewer with RSuite components and a small sample form (inputs and validate button).
 */
export const ViewerRsuiteLoadCss = () => {
  return (
    <div style={{maxWidth: 480, minHeight: 400, padding: 16, border: '1px solid #ccc'}}>
      <FormViewer getForm={() => formJson} view={view} actions={actions}/>
    </div>
  )
}
