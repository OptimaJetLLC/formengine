import {createView} from '@react-form-builder/core'
import {myButton} from './components/MyButton'

const definitions = [
  myButton,
]

const components = definitions.map(def => def.build())
export const models = components.map(({model}) => model)

export const view = createView(models)
