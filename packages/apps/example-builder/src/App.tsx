import {FormBuilder} from '@react-form-builder/builder'
import {BuilderView} from '@react-form-builder/builder/view'
import {antdComponents} from '@react-form-builder/components-antd'
import {rsErrorMessage, rsTooltip, rSuiteComponents} from '@react-form-builder/components-rsuite'
import {ComponentStore, Language, PersistedForm} from '@react-form-builder/core'
import {useEffect, useState} from 'react'
import {getFormFromJson} from './utils/getFormFromJson'
import {IndexedDbFormStorage} from './utils/IndexedDbFormStorage'

const data = {
  title: 'Hello! Hello!',
  login: '1',
  password: 'ok',
  'Template:Test form 1': {login: 'tortuga', password: 'man!', agreement: false},
  'Agreement Title': 'Data in agreement template',
  'Input in template': 'Data in template level 1',
  ['last name']: 'Bret',
}

const components = [...rSuiteComponents, ...antdComponents].map(definer => definer.build())
const view = new BuilderView(components)
  .withErrorMeta(rsErrorMessage.build())
  .withTooltipMeta(rsTooltip.build())
  .withTemplates(['template', 'agreement', 'login form'])

function localizer(componentStore: ComponentStore, language: Language): Record<string, any> {
  return componentStore.key === 'comment'
    ? {'placeholder': `${language?.fullCode || 'default language'} ${Math.random()}`}
    : {}
}

const useExternalLocalizer = false
const localizeFn = useExternalLocalizer ? localizer : undefined

const indexedDbExists = false//!!window.indexedDB
const formStorage = indexedDbExists
  ? new IndexedDbFormStorage()
  : undefined

const sampleFormName = 'SampleForm'

async function getForm(name?: string): Promise<PersistedForm> {
  if (!formStorage) throw new Error('IndexedDB not supported')
  try {
    const form = await formStorage.getForm(name || formStorage.formName)
    return JSON.parse(form) as PersistedForm
  } catch (e) {
    if (!name) throw e
    // fallback
    const formFromJson = getFormFromJson(name)
    formStorage.formName = name
    return formFromJson
  }
}

// tests don't wait for promises now
const getFormFn = indexedDbExists ? getForm : getFormFromJson

const FormBuilderApp = () => {
  const [initialData, setInitialData] = useState(data)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setInitialData(Object.assign({}, data, {currentTime: new Date().toUTCString()}))
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [])

  return <FormBuilder
    getForm={getFormFn}
    formName={formStorage?.formName || sampleFormName}
    view={view}
    data={initialData}
    formStorage={formStorage}
    localize={localizeFn}
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
