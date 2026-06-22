import {agreement, getFormFromJson, RSuiteForm, template} from '@react-form-builder/apps-common'
import {antdComponents, antI18nComponentsDescriptions} from '@react-form-builder/components-antd'
import {fastQrComponent, fastQrComponentsDescriptions} from '@react-form-builder/components-fast-qr'
import {googleMapComponent, googleMapComponentsDescriptions} from '@react-form-builder/components-google-map'
import {richTextComponent, richTextEditorComponentsDescriptions} from '@react-form-builder/components-rich-text'
import {
  ltrCssLoader,
  RsLocalizationWrapper,
  rSuiteComponents,
  rSuiteComponentsDescriptions,
  rtlCssLoader,
} from '@react-form-builder/components-rsuite'
import {rSuiteTableComponents, rSuiteTableComponentsDescriptions} from '@react-form-builder/components-rsuite-table'
import {signatureComponent, signatureComponentsDescriptions} from '@react-form-builder/components-signature'
import {uploaderComponent, uploaderComponentsDescriptions} from '@react-form-builder/components-uploader'
import type {Arguments, ComponentStore, FormValidators, FormViewerProps, IFormData, IFormViewer, Validators} from '@react-form-builder/core'
import {ActionDefinition, BiDi, definePreset, isUndefined, Language} from '@react-form-builder/core'
import type {FormBuilderI18n, FormBuilderTheme, GenerateJsonFormSchemaOptions, IFormBuilder} from '@react-form-builder/designer'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {IndexedDbFormStorage} from '@react-form-builder/indexed-db-form-storage'
import {createSchema} from '@react-form-builder/json-schema-generator'
import {useCallback, useEffect, useState} from 'react'
import {frFR, trTR} from 'rsuite/esm/locales/index.js'
import {CustomErrorWrapper} from './components/CustomErrorWrapper'
import {debugData} from './components/debug/DebugData'
import {notRemovable} from './components/debug/NotRemovable'
import {throwErrorComponent} from './components/ThrowErrorComponent'
import {customization} from './customization'
import {Designer} from './Designer'
import data from './initialFormData'
import initialPresets from './preset-components.json'
import {generatedLicenseKey} from './utils/license'
import {useRefWithLog} from './utils/useRefWithLog'

const presets = initialPresets.map(preset => {
  return definePreset(preset.name, preset.components as ComponentStore[]).category('Presets')
})

const components = [
  ...rSuiteComponents,
  ...antdComponents,
  ...presets,
  throwErrorComponent,
  fastQrComponent,
  richTextComponent,
  googleMapComponent,
  signatureComponent,
  debugData,
  ...rSuiteTableComponents,
  notRemovable,
  uploaderComponent,
].map(definer => definer.build())

const view = new BuilderView(components)
  .withTemplates(['template', 'agreement', 'login form'])
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withComponentLibraryDescription(antI18nComponentsDescriptions)
  .withComponentLibraryDescription(fastQrComponentsDescriptions)
  .withComponentLibraryDescription(googleMapComponentsDescriptions)
  .withComponentLibraryDescription(richTextEditorComponentsDescriptions)
  .withComponentLibraryDescription(signatureComponentsDescriptions)
  .withComponentLibraryDescription(rSuiteTableComponentsDescriptions)
  .withComponentLibraryDescription(rSuiteComponentsDescriptions)
  .withComponentLibraryDescription(uploaderComponentsDescriptions)

function localizer(componentStore: ComponentStore, language: Language): Record<string, any> {
  return componentStore.key === 'comment' ? {placeholder: `${language?.fullCode || 'default language'} ${Math.random()}`} : {}
}

const generateJsonFormSchema = (options: GenerateJsonFormSchemaOptions) => {
  const {components, descriptions} = options
  const schema = createSchema(components, descriptions)
  return JSON.stringify(schema, undefined, 2)
}

const useCustomLocalizer = false
const localizeFn = useCustomLocalizer ? localizer : undefined
const logEvents = false
const cycleThroughThemes = false

const indexedDbExists = !!globalThis.indexedDB
const formStorage = indexedDbExists ? new IndexedDbFormStorage('form-builder-store', 'form-store') : undefined

const sampleFormName = 'RSuiteForm'

async function getForm(name?: string): Promise<string> {
  if (!formStorage) throw new Error('IndexedDB not supported')
  if (isUndefined(name)) throw new Error('Form name is not defined')
  return await formStorage.getForm(name)
}

const customValidators: Validators = {
  string: {
    isHex: {
      validate: value => /^[0-9A-F]*$/i.test(value),
    },
    isHappy: {
      params: [],
      validate: value => value === 'Happy',
    },
    equals: {
      params: [
        {key: 'value', type: 'string', required: false, default: 'Ring'},
        {key: 'message', type: 'string', required: false, default: 'Value must be equals to '},
      ],
      validate: (value, _, args) => {
        const errorMessage = args?.['message'] as string
        const checkedValue = args?.['value'] as string
        const errorResult = errorMessage ? errorMessage + checkedValue : false
        return value !== args?.['value'] ? errorResult : true
      },
    },
  },
  number: {},
  boolean: {
    onlyTrue: {
      validate: value => value === true,
    },
  },
}

const formValidators: FormValidators = [
  // eslint-disable-next-line @typescript-eslint/require-await
  async data => {
    const result: any = {}
    if (data.login === 'sun') {
      result.login = 'Login already exists - sun'
    }
    if (data.agreeCheckbox === false) {
      result.agreeCheckbox = 'Agree checkbox must be checked'
    }
    if ((data['Template:Test form 1'] as any)?.login === 'sun') {
      result['Template:Test form 1'] ??= {}
      result['Template:Test form 1'].login = 'Login already exists - sun'
    }
    if ((data['Template:Test form 1'] as any)?.agreeCheckbox === false) {
      result['Template:Test form 1'] ??= {}
      result['Template:Test form 1'].agreeCheckbox = 'Agree checkbox must be checked'
    }
    if ((data['Template:agreement 1'] as any)?.agreeCheckbox === false) {
      result['Template:agreement 1'] ??= {}
      result['Template:agreement 1'].agreeCheckbox = 'Agree checkbox must be checked'
    }
    if ((data['Template:Test form 1'] as any)?.['Template:agreement 1']?.agreeCheckbox === false) {
      result['Template:Test form 1'] ??= {}
      result['Template:Test form 1']['Template:agreement 1'] ??= {}
      result['Template:Test form 1']['Template:agreement 1'].agreeCheckbox = 'Agree checkbox must be checked'
    }
    if (data.comment === 'weird') {
      result.comment = 'Comment is weird'
    }
    return result
  },
]

const enableCustomLanguages = false

const builderLanguages: FormBuilderI18n = {
  languages: [new Language('fr', 'FR', 'French', 'Français'), new Language('tr', 'TR', 'Turkish', 'Türkçe')],
  // eslint-disable-next-line @typescript-eslint/require-await
  getData: async languageFullCode => {
    if (languageFullCode === 'tr-TR') {
      return {
        data: {leftMenu: {menu: 'Menü'}},
        componentsLocale: trTR,
      }
    }
    return {
      data: {leftMenu: {menu: 'Menu'}},
      componentsLocale: frFR,
    }
  },
}

const actions = {
  logEventArgs: (e: any) => {
    // eslint-disable-next-line no-console
    if (logEvents) console.info(e.type, e.sender.key, e.sender.id, `${new Date().getTime()}`.substr(-4))
  },
  assertArgs: ActionDefinition.functionalAction(
    (e, args) => {
      if (!e) throw new Error(`'e' is undefined`)
      if (!args) throw new Error(`'args' is args`)
      if (args.p1 !== 'testValue') console.error(`args.p1 !== 'testValue'`, args.p1)
      if (!args.p2) console.error(`args.p2 !== true`, args.p2)
      if (args.p3 !== 6.62607015) console.error(`args.p3 !== 6.62607015`, args.p3)
    },
    {
      p1: 'string',
      p2: 'boolean',
      p3: 'number',
    }
  ),
  funcArgs: ActionDefinition.functionalAction(
    async (e, args: Arguments) => {
      const {fnArg, fnArg1, fnArg2, fnArg3} = args
      // @ts-ignore for test
      const r = await fnArg?.('foo', 123)
      // @ts-ignore for test
      const r1 = await fnArg1?.('bar', 234)
      // @ts-ignore for test
      const r2 = await fnArg2?.('baz', 345)
      // @ts-ignore for test
      const r3 = await fnArg3?.('boo', 567)
      // eslint-disable-next-line no-console
      if (logEvents) console.log('funcArgs', {r, r1, r2, r3})
    },
    {
      fnArg: 'function',
      fnArg1: 'function',
      fnArg2: 'function',
      fnArg3: 'function',
    }
  ),
}

const onFormSchemaChange = (formSchema: unknown) => {
  // eslint-disable-next-line no-console
  if (logEvents) console.log('onFormSchemaChange', formSchema)
}

// tests don't wait for promises now
const getFormFn = (formName?: string) => {
  const name = formName ?? sampleFormName
  return indexedDbExists ? getForm(name) : getFormFromJson(name)
}

const useCustomErrorWrapper = false

const FormBuilderApp = () => {
  const viewerRef = useRefWithLog<IFormViewer>('ViewerRef', logEvents)
  const builderRef = useRefWithLog<IFormBuilder>('BuilderRef', logEvents, builder => {
    // eslint-disable-next-line no-console
    if (builder) console.log(builder.formAsString)
  })

  const [initialData, setInitialData] = useState(data)
  const [indexedDbInitialized, setIndexedDbInitialized] = useState(false)
  const [theme, setTheme] = useState<FormBuilderTheme>('light')

  useEffect(() => {
    if (!formStorage) {
      setIndexedDbInitialized(true)
      return
    }
    formStorage
      .init({RSuiteForm, template, agreement})
      .then(() => setIndexedDbInitialized(true))
      .catch(e => console.error(e))
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setInitialData(Object.assign({}, data, {currentTime: new Date().toUTCString()}))
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (!cycleThroughThemes) return
    const themes: FormBuilderTheme[] = ['light', 'dark', 'system']
    let index = 0
    const intervalId = setInterval(() => {
      setTheme(themes[index])
      index = (index + 1) % themes.length
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const customOnFormDataChange: FormViewerProps['onFormDataChange'] = useCallback(async (formData: IFormData) => {
    const {data, errors} = formData
    // eslint-disable-next-line no-console
    if (logEvents) console.log('onFormDataChange', {data, errors})
    const silentValidationResult = await formData.getValidationResult()
    formData.state.isValid = !silentValidationResult
  }, [])

  if (!indexedDbInitialized) {
    return null
  }

  return (
    <FormBuilder
      customization={customization}
      licenseKey={generatedLicenseKey}
      getForm={getFormFn}
      formName={sampleFormName}
      theme={cycleThroughThemes ? theme : undefined}
      view={view}
      initialData={initialData}
      formStorage={formStorage}
      localize={localizeFn}
      onFormDataChange={customOnFormDataChange}
      onFormSchemaChange={onFormSchemaChange}
      viewerRef={viewerRef}
      builderRef={builderRef}
      validators={customValidators}
      formValidators={formValidators}
      i18n={enableCustomLanguages ? builderLanguages : undefined}
      errorWrapper={useCustomErrorWrapper ? CustomErrorWrapper : undefined}
      actions={actions}
      generateJsonFormSchema={generateJsonFormSchema}
      localStoragePrefix="example-rsuite"
    />
  )
}

const showDocumentationExample = false

/**
 * @returns the main application component.
 */
export const RSuiteBuilder = () => (showDocumentationExample ? <Designer /> : <FormBuilderApp />)
