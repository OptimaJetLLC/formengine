import {observer} from 'mobx-react'
import {Suspense} from 'react'
import {Loader} from 'rsuite'
import {FormBuilder} from './Builder/FormBuilder'
import {getSampleForm} from './utils/getSampleForm'
import {rsuite} from './views/rsuite'

const App = observer(() => {
  return (
    <Suspense fallback={<Loader size={'md'} content="loading..." center/>}>
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
    </Suspense>
  )
})

export default App
