import {fastQrComponent} from '@react-form-builder/components-fast-qr'
import {
  formEngineRsuiteCssLoader,
  ltrCssLoader,
  RsLocalizationWrapper,
  rSuiteComponents,
  rtlCssLoader
} from '@react-form-builder/components-rsuite'
import {signatureComponent} from '@react-form-builder/components-signature'
import {BiDi} from '@react-form-builder/core'
import corePackageJson from '@react-form-builder/core/package.json'
import schema from '@react-form-builder/core/schemas/persisted-form.schema.json'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import React from 'react'

// just to test import
console.info('persisted-form.schema.json', schema)
console.info('package.json', corePackageJson)

const components = [...rSuiteComponents, fastQrComponent, signatureComponent]
  .map(definer => definer.build())
const view = new BuilderView(components)
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withCssLoader('common', formEngineRsuiteCssLoader)

function MyDesignerApp() {
  return <FormBuilder view={view}/>
}

export default MyDesignerApp
