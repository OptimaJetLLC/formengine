import {fastQrComponent} from '@react-form-builder/components-fast-qr'
import {googleMapComponent} from '@react-form-builder/components-google-map'
import {richTextComponent} from '@react-form-builder/components-rich-text'
import {
  formEngineRsuiteCssLoader,
  ltrCssLoader,
  RsLocalizationWrapper,
  rSuiteComponents,
  rtlCssLoader
} from '@react-form-builder/components-rsuite'
import {signatureComponent} from '@react-form-builder/components-signature'
import {BiDi, namedObserver} from '@react-form-builder/core'
import type {CustomizationMap, IPresetComponentOptions, PresetComponent} from '@react-form-builder/designer'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {IndexedDbFormStorage, IndexedDbPresetStorage} from '@react-form-builder/indexed-db-form-storage'
import {useEffect, useState} from 'react'
import config from './utils/config.json'
import {getFormFromJson, initialForms} from './utils/getFormFromJson'
import {generatedLicenseKey} from './utils/license'

const components = [...rSuiteComponents, fastQrComponent, richTextComponent, googleMapComponent, signatureComponent]
  .map(definer => definer.build())
const view = new BuilderView(components)
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withCssLoader('common', formEngineRsuiteCssLoader)

const sampleFormName = 'SampleForm'

const indexedDbExists = !!window.indexedDB
const formStorage = indexedDbExists
  ? new IndexedDbFormStorage('demo-db', 'demo-store')
  : undefined

async function getForm(name?: string): Promise<string> {
  if (!formStorage) throw new Error('IndexedDB not supported')
  if (typeof name === 'undefined') throw new Error('Form name is not defined')
  return await formStorage.getForm(name)
}

const getFormFn = (formName?: string) => {
  const name = !formName || formName === 'undefined' ? sampleFormName : formName
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

const presetStorage = indexedDbExists
  ? new IndexedDbPresetStorage('demo-presets-db', 'presets')
  : undefined

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
  marginLeft: 10,
  color: 'var(--rs-text-secondary)',
}

const customization: CustomizationMap = {
  Header_Toolbar: {
    customRenderer: (defaultElement) => {
      return <div>
        {defaultElement}
        <span style={versionStyle}>{config.version}</span>
      </div>
    }
  }
}

const RawFormBuilderApp = () => {
  const [indexedDbInitialized, setIndexedDbInitialized] = useState(false)
  const [presetOptions, setPresetOptions] = useState(getPresetOptions)

  useEffect(() => {
    async function initDb() {
      const presetComponents = await presetStorage?.loadPresets()
      if (typeof presetComponents !== 'undefined') {
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

  return <FormBuilder
    licenseKey={generatedLicenseKey}
    getForm={getFormFn}
    formName={sampleFormName}
    view={view}
    formStorage={formStorage}
    presetComponentOptions={presetOptions}
    customization={customization}
  />
}

export const FormBuilderApp = namedObserver('FormBuilderApp', RawFormBuilderApp)
