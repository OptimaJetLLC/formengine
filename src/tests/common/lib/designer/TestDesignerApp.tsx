import {formEngineRsuiteCssLoader, ltrCssLoader, RsLocalizationWrapper, rtlCssLoader} from '@react-form-builder/components-rsuite'
import {
  ActionDefinition,
  BiDi,
  ComponentStore,
  FormValidators,
  IFormViewer,
  isUndefined,
  Language,
  Validators
} from '@react-form-builder/core'
import type {AnnotationEditorProps, CustomizationMap, FormBuilderI18n, FormBuilderTheme, IFormBuilder} from '@react-form-builder/designer'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {IndexedDbFormStorage} from '@react-form-builder/indexed-db-form-storage'
import {useEffect, useState, version} from 'react'
import {frFR, trTR} from 'rsuite/esm/locales/index.js'
import {allComponentsBuilder} from '../all-components'
import {CustomErrorWrapper} from './components/CustomErrorWrapper'
import {getFormFromJson, initialForms} from './utils/getFormFromJson'
import {generatedLicenseKey} from './utils/license'
import {useRefWithLog} from './utils/useRefWithLog'

const data = {
  comment: `React version: ${version}`,
  title: 'Hello! Hello!',
  login: '1',
  password: 'ok',
  'Template:Test form 1': {login: 'tortuga', password: 'man!', agreeCheckbox: false},
  'Agreement Title': 'Data in agreement template',
  'Input in template': 'Data in template level 1',
  ['last name']: 'Bret',
  agreeCheckbox: true,
  mainRepeater: [
    {
      repeater1: [
        {},
        {rsDatePicker1: new Date()},
      ]
    },
    {rsInput1: 'initial data in repeater'},
  ],
  repeater1: [
    {
      rsDatePicker1: new Date(),
      repeater2: [
        {
          rsToggle1: false
        },
        {
          rsToggle1: true,
          repeater3: [
            {
              rsDropdown1: ['A']
            },
            {
              rsDropdown1: ['A'],
              rsNumberFormat1: 1
            }
          ]
        }
      ]
    },
    {
      rsDatePicker7: new Date(1901, 2, 4)
    },
    {
      rsDatePicker6: new Date(2001, 4, 6),
      repeater2: [
        {
          rsToggle1: false
        },
      ]
    },
  ]
}

const view = new BuilderView(allComponentsBuilder)
  .withTemplates(['template', 'agreement', 'login form'])
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withCssLoader('common', formEngineRsuiteCssLoader)

function localizer(componentStore: ComponentStore, language: Language): Record<string, any> {
  return componentStore.key === 'comment'
    ? {'placeholder': `${language?.fullCode || 'default language'} ${Math.random()}`}
    : {}
}

const useCustomLocalizer = false
const localizeFn = useCustomLocalizer ? localizer : undefined
const logEvents = false
const cycleThroughThemes = false

const indexedDbExists = !!globalThis.indexedDB
const formStorage = indexedDbExists
  ? new IndexedDbFormStorage('form-builder-store', 'form-store')
  : undefined

const sampleFormName = 'SampleForm'

async function getForm(name?: string): Promise<string> {
  if (!formStorage) throw new Error('IndexedDB not supported')
  if (isUndefined(name)) throw new Error('Form name is not defined')
  return await formStorage.getForm(name)
}

const customValidators: Validators = {
  'string': {
    'isHex': {
      validate: value => /^[0-9A-F]*$/i.test(value)
    },
    'isHappy': {
      params: [],
      validate: value => value === 'Happy'
    },
    'equals': {
      params: [
        {key: 'value', type: 'string', required: false, default: 'Ring'},
        {key: 'message', type: 'string', required: false, default: 'Value must be equals to '}
      ],
      validate: (value, _, args) => {
        const errorMessage = args?.['message'] as string
        const checkedValue = args?.['value'] as string
        const errorResult = errorMessage ? errorMessage + checkedValue : false
        return value !== args?.['value'] ? errorResult : true
      }
    }
  },
  'number': {},
  'boolean': {
    'onlyTrue': {
      validate: value => value === true
    }
  },
}

const formValidators: FormValidators = [
  async (data) => {
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
    if (((data['Template:Test form 1'] as any)?.['Template:agreement 1'])?.agreeCheckbox === false) {
      result['Template:Test form 1'] ??= {}
      result['Template:Test form 1']['Template:agreement 1'] ??= {}
      result['Template:Test form 1']['Template:agreement 1'].agreeCheckbox = 'Agree checkbox must be checked'
    }
    if (data.comment === 'weird') {
      result.comment = 'Comment is weird'
    }
    return result
  }
]

const enableCustomLanguages = false

const builderLanguages: FormBuilderI18n = {
  languages: [
    new Language('fr', 'FR', 'French', 'Français'),
    new Language('tr', 'TR', 'Turkish', 'Türkçe'),
  ],
  getData: async languageFullCode => {
    if (languageFullCode === 'tr-TR') {
      return {
        data: {leftMenu: {menu: 'Menü'}},
        componentsLocale: trTR
      }
    }
    return {
      data: {leftMenu: {menu: 'Menu'}},
      componentsLocale: frFR
    }
  }
}

const StringEditor = ({value, onChange, componentData, annotation}: AnnotationEditorProps) => {
  const label = componentData.store.props.label?.value ?? componentData.model.defaultProps?.label ?? 'Default placeholder'
  const placeholder = annotation.key === 'placeholder' ? label : undefined

  return <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}/>
}

// tests don't wait for promises now
const getFormFn = (formName?: string) => {
  const name = formName ?? sampleFormName
  return indexedDbExists ? getForm(name) : getFormFromJson(name)
}

const useCustomErrorWrapper = false

type FormBuilderAppProps = {
  customization?: CustomizationMap
  license?: string
}

const TestDesignerApp = ({license, customization}: FormBuilderAppProps) => {
  const viewerRef = useRefWithLog<IFormViewer>('ViewerRef', logEvents)
  const builderRef = useRefWithLog<IFormBuilder>('BuilderRef', logEvents, builder => {
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
    formStorage.init(initialForms)
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

  if (!indexedDbInitialized) return null

  return <FormBuilder
    propertyEditors={{
      string: StringEditor
    }}
    customization={customization}
    licenseKey={license ?? generatedLicenseKey}
    getForm={getFormFn}
    formName={sampleFormName}
    theme={cycleThroughThemes ? theme : undefined}
    view={view}
    initialData={initialData}
    formStorage={formStorage}
    localize={localizeFn}
    onFormDataChange={async (formData) => {
      const {data, errors} = formData
      if (logEvents) console.log('onFormDataChange', {data, errors})
      const silentValidationResult = await formData.getValidationResult()
      formData.state.isValid = !silentValidationResult
    }}
    onFormSchemaChange={(formSchema) => {
      if (logEvents) console.log('onFormSchemaChange', formSchema)
    }}
    onFormElementAdd={(payload) => {
      const sourceType = payload?.source && typeof payload.source === 'object' && 'model' in payload.source
        ? (payload.source as { model?: { type?: string } }).model?.type
        : undefined
      const targetKey = payload?.target && typeof payload.target === 'object' && 'key' in payload.target
        ? (payload.target as { key?: string }).key
        : undefined
      if (typeof globalThis !== 'undefined') {
        const w = globalThis as { __formBuilderAddCalls?: Array<{ sourceType?: string; targetKey?: string }> }
        w.__formBuilderAddCalls = w.__formBuilderAddCalls ?? []
        w.__formBuilderAddCalls.push({sourceType, targetKey})
      }
    }}
    onFormElementRemove={(payload) => {
      const sourceKey = payload?.source && typeof payload.source === 'object' && 'key' in payload.source
        ? (payload.source as { key?: string }).key
        : undefined
      if (typeof globalThis !== 'undefined') {
        const w = globalThis as { __formBuilderRemoveCalls?: Array<{ sourceKey?: string }> }
        w.__formBuilderRemoveCalls = w.__formBuilderRemoveCalls ?? []
        w.__formBuilderRemoveCalls.push({sourceKey})
      }
    }}
    viewerRef={viewerRef}
    builderRef={builderRef}
    validators={customValidators}
    formValidators={formValidators}
    i18n={enableCustomLanguages ? builderLanguages : undefined}
    errorWrapper={useCustomErrorWrapper ? CustomErrorWrapper : undefined}
    actions={{
      logEventArgs: e => {
        console.info(e.type, e.sender.key, e.sender.id, (+new Date() + '').substr(-4))
      },
      assertArgs: ActionDefinition.functionalAction((e, args) => {
        if (!e) throw new Error(`'e' is undefined`)
        if (!args) throw new Error(`'args' is args`)
        if (args.p1 !== 'testValue') console.error(`args.p1 !== 'testValue'`, args.p1)
        if (!args.p2) console.error(`args.p2 !== true`, args.p2)
        if (args.p3 !== 6.62607015) console.error(`args.p3 !== 6.62607015`, args.p3)
      }, {
        p1: 'string',
        p2: 'boolean',
        p3: 'number'
      })
    }}
  />
}

export default TestDesignerApp
