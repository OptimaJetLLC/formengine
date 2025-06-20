import {fastQrComponent} from '@react-form-builder/components-fast-qr'
import {
  formEngineRsuiteCssLoader,
  ltrCssLoader,
  rsErrorMessage,
  RsLocalizationWrapper,
  rsTooltip,
  rSuiteComponents,
  rtlCssLoader
} from '@react-form-builder/components-rsuite'
import {signatureComponent} from '@react-form-builder/components-signature'
import {BiDi} from '@react-form-builder/core'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import React from 'react'

const components = [...rSuiteComponents, fastQrComponent, signatureComponent]
  .map(definer => definer.build())
const view = new BuilderView(components)
  .withErrorMeta(rsErrorMessage.build())
  .withTooltipMeta(rsTooltip.build())
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withCssLoader('common', formEngineRsuiteCssLoader)

  .withErrorMeta(rsErrorMessage.build())
  .withTooltipMeta(rsTooltip.build())

function App() {
  return <FormBuilder view={view}/>
}

export default App
