import {fastQrComponent} from '@react-form-builder/components-fast-qr'
import fastQrSchema from '@react-form-builder/components-fast-qr/schemas/fast-qr-components.schema.json'
import googleMapSchema from '@react-form-builder/components-google-map/schemas/google-map-components.schema.json'
import {muiButton} from '@react-form-builder/components-material-ui'
import materialUiSchema from '@react-form-builder/components-material-ui/schemas/material-ui-components.schema.json'
import richTextSchema from '@react-form-builder/components-rich-text/schemas/rich-text-components.schema.json'
import {
  ltrCssLoader,
  RsLocalizationWrapper,
  rSuiteComponents,
  rtlCssLoader
} from '@react-form-builder/components-rsuite'
import rsuiteTableSchema from '@react-form-builder/components-rsuite-table/schemas/rsuite-table-components.schema.json'
import rsuiteSchema from '@react-form-builder/components-rsuite/schemas/rsuite-components.schema.json'
import {signatureComponent} from '@react-form-builder/components-signature'
import signatureSchema from '@react-form-builder/components-signature/schemas/signature-components.schema.json'
import uploaderSchema from '@react-form-builder/components-uploader/schemas/uploader-components.schema.json'
import {BiDi, buildForm} from '@react-form-builder/core'
import corePackageJson from '@react-form-builder/core/package.json'
import schema from '@react-form-builder/core/schemas/persisted-form.schema.json'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {IndexedDbFormStorage} from '@react-form-builder/indexed-db-form-storage'
import {useEffect, useState} from 'react'

// styles
import '@react-form-builder/components-google-map/assets/styles.css'
import '@react-form-builder/components-rich-text/assets/styles.css'
import '@react-form-builder/components-rsuite/assets/styles.ltr.css'
import '@react-form-builder/components-signature/assets/styles.css'
import '@react-form-builder/components-uploader/assets/styles.css'

// just to test import
console.info('persisted-form.schema.json', schema)
console.info('package.json', corePackageJson)

// schemas import
console.info('fastQrSchema', fastQrSchema)
console.info('googleMapSchema', googleMapSchema)
console.info('materialUiSchema', materialUiSchema)
console.info('richTextSchema', richTextSchema)
console.info('rsuiteSchema', rsuiteSchema)
console.info('rsuiteTableSchema', rsuiteTableSchema)
console.info('signatureSchema', signatureSchema)
console.info('uploaderSchema', uploaderSchema)

const components = [...rSuiteComponents, fastQrComponent, signatureComponent, muiButton]
  .map(definer => definer.build())
const view = new BuilderView(components)
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)

const formStorage = new IndexedDbFormStorage('example-db', 'example-store')

function MyDesignerApp() {
  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {
    formStorage.init({
      example: buildForm().json()
    }).then(() => {
      setReady(true)
    }).catch(console.error)
  }, [])

  if (!ready) return null

  return <FormBuilder view={view} formStorage={formStorage} formName="example"/>
}

export default MyDesignerApp
