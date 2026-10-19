import {antdComponents, antI18nComponentsDescriptions} from '@react-form-builder/components-antd'
import {fastQrComponent, fastQrComponentsDescriptions} from '@react-form-builder/components-fast-qr'
import {googleMapComponent, googleMapComponentsDescriptions} from '@react-form-builder/components-google-map'
import {printComponents, printComponentsDescriptions} from '@react-form-builder/components-print'
import {richTextComponent, richTextEditorComponentsDescriptions} from '@react-form-builder/components-rich-text'
import {RsViewWrapper, rSuiteComponents, rSuiteComponentsDescriptions} from '@react-form-builder/components-rsuite'
import {rSuiteTableComponents, rSuiteTableComponentsDescriptions} from '@react-form-builder/components-rsuite-table'
import {signatureComponent, signatureComponentsDescriptions} from '@react-form-builder/components-signature'
import {sortableListComponent, sortableListComponentsDescriptions} from '@react-form-builder/components-sortable-list'
import {BuilderView, loadResource, unloadResource} from '@react-form-builder/core'
import type {GenerateJsonFormSchemaOptions, StylesProviderProps} from '@react-form-builder/designer'
import {FormBuilder} from '@react-form-builder/designer'
import {IndexedDbFormStorage} from '@react-form-builder/indexed-db-form-storage'
import {createSchema} from '@react-form-builder/json-schema-generator'
import {useEffect} from 'react'

const components = [
  ...rSuiteComponents,
  ...antdComponents,
  fastQrComponent,
  richTextComponent,
  googleMapComponent,
  signatureComponent,
  sortableListComponent,
  ...printComponents,
  ...rSuiteTableComponents,
].map(definer => definer.build())

const view = new BuilderView(components)
  .withViewerWrapper(RsViewWrapper)
  .withComponentLibraryDescription(antI18nComponentsDescriptions)
  .withComponentLibraryDescription(fastQrComponentsDescriptions)
  .withComponentLibraryDescription(googleMapComponentsDescriptions)
  .withComponentLibraryDescription(richTextEditorComponentsDescriptions)
  .withComponentLibraryDescription(signatureComponentsDescriptions)
  .withComponentLibraryDescription(sortableListComponentsDescriptions)
  .withComponentLibraryDescription(printComponentsDescriptions)
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

const generateJsonFormSchema = (options: GenerateJsonFormSchemaOptions) => {
  const {components, descriptions} = options
  const schema = createSchema(components, descriptions)
  return JSON.stringify(schema, undefined, 2)
}

/**
 * @returns the main application component.
 */
export const CspBuilderApp = () => {
  return (
    <FormBuilder view={view} stylesProvider={AppStylesProvider} formStorage={formStorage} generateJsonFormSchema={generateJsonFormSchema} />
  )
}
