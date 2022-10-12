import {FormBuilder} from 'fb-core'
import {getSampleForm} from './utils/getSampleForm'
import {rsuite} from 'fb-rsuite'

const App = () => {
  return (
      <FormBuilder
        getForm={getSampleForm}
        view={rsuite}
        event={(bus) => {
          bus.listen((e) => {
            //alert(e.value)
            let a = 4
          }, {eventName: 'onChange', target: 'title'})

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
