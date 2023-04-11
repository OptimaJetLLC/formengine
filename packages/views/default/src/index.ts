import {BuilderView, createView} from 'form-builder'
import {myButton} from './components/MyButton'

const definitions = [
  myButton,
]

definitions.forEach(c => {
  const prefix = 'My'
  if (!c.getType().startsWith(prefix)) {
    throw new Error(`The component type must start with '${prefix}', type: '${c.type}'`)
  }
})

const components = definitions.map(def => def.build())
export const models = components.map(({model}) => model)

export const builderView = new BuilderView(components)
export const view = createView(...models)
