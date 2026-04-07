import {antdComponents, antI18nComponentsDescriptions} from '@react-form-builder/components-antd'
import {fastQrComponent, fastQrComponentsDescriptions} from '@react-form-builder/components-fast-qr'
import {googleMapComponent, googleMapComponentsDescriptions} from '@react-form-builder/components-google-map'
import {richTextComponent, richTextEditorComponentsDescriptions} from '@react-form-builder/components-rich-text'
import {RsLocalizationWrapper, rSuiteComponents, rSuiteComponentsDescriptions} from '@react-form-builder/components-rsuite'
import {rSuiteTableComponents, rSuiteTableComponentsDescriptions} from '@react-form-builder/components-rsuite-table'
import {signatureComponent, signatureComponentsDescriptions} from '@react-form-builder/components-signature'
import {BuilderView, loadResource, unloadResource} from '@react-form-builder/core'
import type {StylesProviderProps} from '@react-form-builder/designer'
import {FormBuilder} from '@react-form-builder/designer'
import {IndexedDbFormStorage} from '@react-form-builder/indexed-db-form-storage'
import {useEffect} from 'react'

const components = [
  ...rSuiteComponents,
  ...antdComponents,
  fastQrComponent,
  richTextComponent,
  googleMapComponent,
  signatureComponent,
  ...rSuiteTableComponents,
].map(definer => definer.build())

const view = new BuilderView(components)
  .withViewerWrapper(RsLocalizationWrapper)
  .withComponentLibraryDescription(antI18nComponentsDescriptions)
  .withComponentLibraryDescription(fastQrComponentsDescriptions)
  .withComponentLibraryDescription(googleMapComponentsDescriptions)
  .withComponentLibraryDescription(richTextEditorComponentsDescriptions)
  .withComponentLibraryDescription(signatureComponentsDescriptions)
  .withComponentLibraryDescription(rSuiteTableComponentsDescriptions)
  .withComponentLibraryDescription(rSuiteComponentsDescriptions)

const AppStylesProvider = ({bidi, children}: StylesProviderProps) => {
  useEffect(() => {
    const id = `designer-${bidi}`

    async function load() {
      const href = (await import(`../public/styles.${bidi}.css?url`)).default
      await loadResource(id, href, 'stylesheet')
    }

    load().catch(console.error)
    return () => {
      unloadResource(id)
    }
  }, [bidi])

  return children
}

const formStorage = new IndexedDbFormStorage('csp-db', 'csp-store')

/**
 * @returns the main application component.
 */
export const CspBuilderApp = () => {
  return <FormBuilder view={view} stylesProvider={AppStylesProvider} formStorage={formStorage} />
}
