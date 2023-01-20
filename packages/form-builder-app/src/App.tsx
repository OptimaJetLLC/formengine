import {antdComponents} from 'builder-antd'
import {rsErrorMessage, rSuiteComponents} from 'builder-rsuite'
import {createView, FormBuilder} from 'form-builder'
import {getSampleForm} from './utils/getSampleForm'

const data = {title: 'Hello! Hello!'}

const components = [...rSuiteComponents, ...antdComponents]
const view = createView(...components).withError(rsErrorMessage)

const App = () => {
  return (
    <FormBuilder
      getForm={getSampleForm}
      view={view}
      data={data}
      event={(bus) => {
        bus.listen((e) => {
          //alert(e.value)
          let a = 4
        }, {type: 'onChange', target: 'title'})

        bus.listen((e) => {
          let a = 4
        }, {target: 'title'})

        bus.listen((e) => {
          let a = 4
        })
      }}
    />
  )
}

export default App
