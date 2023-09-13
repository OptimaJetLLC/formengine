import {FormBuilder, FormBuilderI18n} from '@react-form-builder/builder'
import {BuilderView} from '@react-form-builder/builder/view'
import {antdComponents, antTooltip} from '@react-form-builder/components-antd'
import {rsErrorMessage, rsTooltip, rSuiteComponents} from '@react-form-builder/components-rsuite'
import {ActionDefinition, ComponentStore, ExternalValidators, IFormViewer, Language} from '@react-form-builder/core'
import {IndexedDbFormStorage} from '@react-form-builder/indexed-db-form-storage'
import {useEffect, useRef, useState} from 'react'
import {frFR, trTR} from 'rsuite/esm/locales/index.js'
import {getFormFromJson, initialForms} from './utils/getFormFromJson'

const data = {
  title: 'Hello! Hello!',
  login: '1',
  password: 'ok',
  'Template:Test form 1': {login: 'tortuga', password: 'man!', agreeCheckbox: false},
  'Agreement Title': 'Data in agreement template',
  'Input in template': 'Data in template level 1',
  ['last name']: 'Bret',
  agreeCheckbox: true
}

const components = [...rSuiteComponents, ...antdComponents].map(definer => definer.build())
const view = new BuilderView(components)
  .withErrorMeta(rsErrorMessage.build())
  .withTooltipMeta(rsTooltip.build())
  .withTooltipMeta(antTooltip.build())
  .withTemplates(['template', 'agreement', 'login form'])

function localizer(componentStore: ComponentStore, language: Language): Record<string, any> {
  return componentStore.key === 'comment'
    ? {'placeholder': `${language?.fullCode || 'default language'} ${Math.random()}`}
    : {}
}

const useExternalLocalizer = false
const localizeFn = useExternalLocalizer ? localizer : undefined
const logEvents = false

const indexedDbExists = !!window.indexedDB
const formStorage = indexedDbExists
  ? new IndexedDbFormStorage()
  : undefined

const sampleFormName = 'SampleForm'

async function getForm(name?: string): Promise<string> {
  if (!formStorage) throw new Error('IndexedDB not supported')
  if (typeof name === 'undefined') throw new Error('Form name is not defined')
  return await formStorage.getForm(name)
}

const externalValidators: ExternalValidators = {
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
        return value !== args?.['value'] ? errorMessage ?? false : true
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

const enableExternalLanguages = false

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

// tests don't wait for promises now
const getFormFn = (formName?: string) => {
  const name = formName ?? sampleFormName
  return indexedDbExists ? getForm(name) : getFormFromJson(name)
}

const FormBuilderApp = () => {
  const ref = useRef<IFormViewer>(null)
  const [initialData, setInitialData] = useState(data)
  const [indexedDbInitialized, setIndexedDbInitialized] = useState(false)

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
    if (logEvents && ref.current) {
      console.log('Viewer', ref.current)
    }
  }, [ref.current])

  if (!indexedDbInitialized) return null

  return <FormBuilder
    getForm={getFormFn}
    formName={sampleFormName}
    view={view}
    initialData={initialData}
    formStorage={formStorage}
    localize={localizeFn}
    onDataChange={({data, errors}) => {
      if (logEvents) console.log('onDataChange', {data, errors})
    }}
    viewerRef={ref}
    externalValidators={externalValidators}
    i18n={enableExternalLanguages ? builderLanguages : undefined}
    externalActions={{
      logEventArgs: e => console.log(e),
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
    /*event={(stream) => {
      stream.listen(value => {
        let a = 4
      })

      //stream.types('onDidMount').listen(value => console.log(value.sender.key, 'did mount'))
      //stream.types('onWillUnmount').listen(value => console.log(value.sender.key, 'will Unmount'))

      const countObserver = {
        count: 1,
        next(e: ActionEventArgs) {
          console.log(`The 'onChange' event called: ${this.count++} times`)
        },
        error() {
          // We actually could just remove this method,
          // since we do not really care about errors right now.
        },
        complete() {
          // We never complete this stream now, but can do it on will mount?
        }
      }
      //stream.types('onChange').listen(countObserver)

      stream
        .keys('title')
        .types('onChange')
        .listen(e => {
          //alert(e.value)
          let a = 4
        })

      stream
        .keys('title')
        .listen(e => {
          //alert(e.value)
          let a = 4
        })
    }}*/
  />
}

const App = () => <FormBuilderApp/>

export default App
