import {FormBuilder} from 'fb-core'
import {rSuite} from 'fb-rsuite'
import {getSampleForm} from './utils/getSampleForm'

const data = {title: 'Hello! Hello!'}

const App = () => {
  return (
      <FormBuilder
        getForm={getSampleForm}
        view={rSuite}
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
