import {rsErrorMessage, rsTooltip, rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {IndexedDbFormStorage} from '@react-form-builder/indexed-db-form-storage'
import {observer} from 'mobx-react'
import {useEffect, useState} from 'react'
import config from './utils/config.json'
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

const components = rSuiteComponents.map(definer => definer.build())
const view = new BuilderView(components)
  .withErrorMeta(rsErrorMessage.build())
  .withTooltipMeta(rsTooltip.build())
  .withTemplates([])

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

  try {
    const accessDate = localStorage.getItem(accessDateKey)
    if (accessDate && config.releaseDate === Number(accessDate)) cleanDatabase = false
  } catch (e) {
    console.error(e)
  }

  if (cleanDatabase) {
    await dbFormStorage.clear()
    localStorage.setItem(accessDateKey, `${config.releaseDate}`)
  }
  return await dbFormStorage.init(initialForms)
}

const FormBuilderApp = observer(() => {
  const [indexedDbInitialized, setIndexedDbInitialized] = useState(false)

  useEffect(() => {
    if (!formStorage) {
      setIndexedDbInitialized(true)
      return
    }
    initDatabase(formStorage)
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
