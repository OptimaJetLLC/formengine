import {fastQrComponent, fastQrComponentsDescriptions} from '@react-form-builder/components-fast-qr'
import {googleMapComponent, googleMapComponentsDescriptions} from '@react-form-builder/components-google-map'
import {richTextComponent, richTextEditorComponentsDescriptions} from '@react-form-builder/components-rich-text'
import {
  formEngineRsuiteCssLoader,
  ltrCssLoader,
  RsLocalizationWrapper,
  rSuiteComponents,
  rSuiteComponentsDescriptions,
  rtlCssLoader,
} from '@react-form-builder/components-rsuite'
import {rSuiteTableComponents, rSuiteTableComponentsDescriptions} from '@react-form-builder/components-rsuite-table'
import {signatureComponent, signatureComponentsDescriptions} from '@react-form-builder/components-signature'
import {BiDi, isUndefined} from '@react-form-builder/core'
import type {CustomizationMap, GenerateJsonFormSchemaOptions, IPresetComponentOptions, PresetComponent} from '@react-form-builder/designer'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {IndexedDbFormStorage, IndexedDbPresetStorage} from '@react-form-builder/indexed-db-form-storage'
import {createSchema} from '@react-form-builder/json-schema-generator'
import {observer} from 'mobx-react'
import {useEffect, useState} from 'react'
import config from './utils/config.json'
import {getFormFromJson, initialForms} from './utils/getFormFromJson'
import {generatedLicenseKey} from './utils/license'

const initialData = {}

const components = [
  ...rSuiteComponents,
  fastQrComponent,
  richTextComponent,
  googleMapComponent,
  signatureComponent,
  ...rSuiteTableComponents,
].map(definer => definer.build())

const view = new BuilderView(components)
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withCssLoader('common', formEngineRsuiteCssLoader)
  .withComponentLibraryDescription(fastQrComponentsDescriptions)
  .withComponentLibraryDescription(googleMapComponentsDescriptions)
  .withComponentLibraryDescription(richTextEditorComponentsDescriptions)
  .withComponentLibraryDescription(signatureComponentsDescriptions)
  .withComponentLibraryDescription(rSuiteTableComponentsDescriptions)
  .withComponentLibraryDescription(rSuiteComponentsDescriptions)

const sampleFormName = 'SampleForm'

const indexedDbExists = !!globalThis.indexedDB
const formStorage = indexedDbExists ? new IndexedDbFormStorage('demo-db', 'demo-store') : undefined

async function getForm(name?: string): Promise<string> {
  if (!formStorage) throw new Error('IndexedDB not supported')
  if (isUndefined(name)) throw new Error('Form name is not defined')
  return await formStorage.getForm(name)
}

const getFormFn = (formName?: string) => {
  const name = !formName || isUndefined(formName) ? sampleFormName : formName
  return indexedDbExists ? getForm(name) : getFormFromJson(name)
}

const initDatabase = async (dbFormStorage: IndexedDbFormStorage) => {
  let cleanDatabase = true
  const accessDateKey = 'accessDate'
  const formNameKey = 'formName'

  try {
    const accessDate = localStorage.getItem(accessDateKey)
    if (accessDate && config.releaseDate === Number(accessDate)) cleanDatabase = false
  } catch (e) {
    console.error(e)
  }

  if (cleanDatabase) {
    localStorage.removeItem(formNameKey)
    localStorage.setItem(accessDateKey, `${config.releaseDate}`)
  }
  return await dbFormStorage.init(initialForms)
}

const presetStorage = indexedDbExists ? new IndexedDbPresetStorage('demo-presets-db', 'presets') : undefined

const getPresetOptions = (): IPresetComponentOptions | undefined => {
  if (!indexedDbExists) return undefined

  return {
    onCreate: (preset: PresetComponent) => {
      presetStorage?.savePreset(preset).catch(console.error)
    },
    onRemove: (name: string) => {
      presetStorage?.removePreset(name).catch(console.error)
    },
  }
}

const versionStyle = {
  marginInlineStart: 10,
  color: 'var(--rs-text-secondary)',
}

const customization: CustomizationMap = {
  Header_Toolbar: {
    customRenderer: defaultElement => {
      return (
        <div>
          {defaultElement}
          <span style={versionStyle}>{config.version}</span>
        </div>
      )
    },
  },
}

const generateJsonFormSchema = (options: GenerateJsonFormSchemaOptions) => {
  const {components, descriptions} = options
  const schema = createSchema(components, descriptions)
  return JSON.stringify(schema, undefined, 2)
}

const FormBuilderApp = observer(() => {
  const [indexedDbInitialized, setIndexedDbInitialized] = useState(false)
  const [presetOptions, setPresetOptions] = useState(getPresetOptions)

  useEffect(() => {
    async function initDb() {
      const presetComponents = await presetStorage?.loadPresets()
      if (!isUndefined(presetComponents)) {
        setPresetOptions({
          ...getPresetOptions(),
          components: presetComponents,
        })
      }

      if (!formStorage) return
      await initDatabase(formStorage)
    }

    initDb()
      .catch(e => console.error(e))
      .finally(() => setIndexedDbInitialized(true))
  }, [])

  if (!indexedDbInitialized) return null

  return (
    <FormBuilder
      licenseKey={generatedLicenseKey}
      getForm={getFormFn}
      formName={sampleFormName}
      view={view}
      initialData={initialData}
      formStorage={formStorage}
      presetComponentOptions={presetOptions}
      customization={customization}
      generateJsonFormSchema={generateJsonFormSchema}
    />
  )
})

/**
 * @returns the main application component.
 */
const DemoApp = () => <FormBuilderApp />

export default DemoApp
