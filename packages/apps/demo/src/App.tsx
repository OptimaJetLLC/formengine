import {FormBuilder} from '@react-form-builder/builder'
import {BuilderView} from '@react-form-builder/builder/view'
import {antdComponents} from '@react-form-builder/components-antd'
import {rsErrorMessage, rsTooltip, rSuiteComponents} from '@react-form-builder/components-rsuite'
import {IndexedDbFormStorage} from '@react-form-builder/indexed-db-form-storage'
import {observer} from 'mobx-react'
import {useEffect, useState} from 'react'
import {getFormFromJson, initialForms} from './utils/getFormFromJson'

const initialData = {
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
  .withTemplates([])

const sampleFormName = 'SampleForm'

const indexedDbExists = !!window.indexedDB
const formStorage = indexedDbExists
  ? new IndexedDbFormStorage()
  : undefined

async function getForm(name?: string): Promise<string> {
  if (!formStorage) throw new Error('IndexedDB not supported')
  if (typeof name === 'undefined') throw new Error('Form name is not defined')
  return await formStorage.getForm(name)
}

const getFormFn = (formName?: string) => {
  // todo temporary fix
  const name = !formName || formName === 'undefined' ? sampleFormName : formName
  return indexedDbExists ? getForm(name) : getFormFromJson(name)
}

const FormBuilderApp = observer(() => {
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

  if (!indexedDbInitialized) return null

  return <FormBuilder
    getForm={getFormFn}
    formName={sampleFormName}
    view={view}
    initialData={initialData}
    formStorage={formStorage}
  />
})

const App = () => <FormBuilderApp/>

export default App
