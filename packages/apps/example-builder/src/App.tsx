import {ComponentStore} from 'fb-core'
import {FormBuilder} from 'form-builder'
import {BuilderView} from 'form-builder/view'
import {assign} from 'lodash-es'
import {observer} from 'mobx-react'
import {antdComponents} from 'view-antd'
import {rsErrorMessage, rsTooltip, rSuiteComponents} from 'view-rsuite'
import {getSampleForm, sampleComponentStore, sampleFormName} from './utils/getSampleForm'
import {IndexedDbFormStorage} from './utils/IndexedDbFormStorage'

const data = {title: 'Hello! Hello!'}

const components = [...rSuiteComponents, ...antdComponents].map(definer => definer.build())
const view = new BuilderView(components)
  .withErrorMeta(rsErrorMessage.build())
  .withTooltipMeta(rsTooltip.build())

const indexedDbExists = !!window.indexedDB
const formStorage = indexedDbExists
  ? new IndexedDbFormStorage()
  : undefined

async function getForm(name?: string): Promise<ComponentStore> {
  if (!formStorage) throw new Error('IndexedDB not supported')
  try {
    const form = await formStorage.getForm(name || formStorage.formName)
    const componentStore = JSON.parse(form)
    return assign(new ComponentStore('', ''), componentStore)
  } catch (e) {
    if (name === sampleFormName) {
      formStorage.formName = name
      return sampleComponentStore()
    }
    throw e
  }
}

// tests don't wait for promises now
const getFormFn = indexedDbExists ? getForm : getSampleForm

const FormBuilderApp = observer(() =>
  <FormBuilder
    getForm={getFormFn}
    formName={formStorage?.formName || sampleFormName}
    view={view}
    data={data}
    formStorage={formStorage}
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
  />)

const App = () => <FormBuilderApp/>

export default App
