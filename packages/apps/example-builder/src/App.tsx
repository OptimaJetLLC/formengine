import {antdComponents} from 'builder-antd'
import {rsErrorMessage, rsTooltip, rSuiteComponents} from 'builder-rsuite'
import {createView} from 'fb-core'
import {FormBuilder} from 'form-builder'
import {getSampleForm} from './utils/getSampleForm'

const data = {title: 'Hello! Hello!'}

const components = [...rSuiteComponents, ...antdComponents]
const view = createView(...components).withError(rsErrorMessage).withTooltip(rsTooltip)

const App = () => {
  return (
    <FormBuilder
      getForm={getSampleForm}
      view={view}
      data={data}
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
  )
}

export default App
