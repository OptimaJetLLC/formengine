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
import {BiDi, isUndefined, namedObserver} from '@react-form-builder/core'
import type {CustomizationMap, IFormBuilder, IPresetComponentOptions, PresetComponent} from '@react-form-builder/designer'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {IndexedDbFormStorage, IndexedDbPresetStorage} from '@react-form-builder/indexed-db-form-storage'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Button, ButtonGroup} from 'rsuite'
import config from './utils/config.json'
import {getFormFromJson, initialForms} from './utils/getFormFromJson'
import {generatedLicenseKey} from './utils/license'

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
  marginInlineEnd: 10,
  color: 'var(--rs-text-secondary)',
}

const rootDivCentralPanelStyle = {display: 'flex', width: '100%', flexDirection: 'column'} as const
const buttonDivStyle = {display: 'flex', width: '100%', justifyContent: 'center', marginTop: 5} as const

const RawFormBuilderApp = () => {
  const [indexedDbInitialized, setIndexedDbInitialized] = useState(false)
  const [presetOptions, setPresetOptions] = useState(getPresetOptions)
  const builderRef = useRef<IFormBuilder>(null)

  const setRef = useCallback((builder: IFormBuilder | null) => {
    if (builder) builderRef.current = builder
  }, [])

  const pasteFormFromClipboard = useCallback(() => {
    const iFormBuilder = builderRef.current
    if (!iFormBuilder) return

    navigator.clipboard
      .readText()
      .then(text => {
        iFormBuilder.parseForm(text)
      })
      .catch(console.error)
  }, [])

  const copyFormToClipboard = useCallback(() => {
    const iFormBuilder = builderRef.current
    if (!iFormBuilder) return

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(iFormBuilder.formAsString).catch(console.error)
    }
  }, [])

  const customization: CustomizationMap = useMemo(
    () => ({
      CentralPanel: {
        customRenderer: defaultElement => {
          return (
            <div style={rootDivCentralPanelStyle}>
              <div style={buttonDivStyle}>
                <ButtonGroup>
                  <Button appearance={'ghost'} onClick={copyFormToClipboard}>
                    Copy form&#39;s JSON
                  </Button>
                  <Button appearance={'ghost'} onClick={pasteFormFromClipboard}>
                    Paste form&#39;s JSON
                  </Button>
                </ButtonGroup>
              </div>
              {defaultElement}
            </div>
          )
        },
      },
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
    }),
    [copyFormToClipboard, pasteFormFromClipboard]
  )

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
      formStorage={formStorage}
      presetComponentOptions={presetOptions}
      customization={customization}
      builderRef={setRef}
    />
  )
}

export const FormBuilderApp = namedObserver('FormBuilderApp', RawFormBuilderApp)
