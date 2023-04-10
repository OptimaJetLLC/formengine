import {createView} from 'fb-core'
import {BuilderView, Definer} from 'form-builder'
import {antButton} from './components/AntButton'

const definitions = [
  antButton,
]

definitions.forEach(c => {
  const prefix = 'Ant'
  if (!c.getType().startsWith(prefix)) {
    throw new Error(`The component type must start with '${prefix}', type: '${c.type}'`)
  }
})

export const antdComponents: Definer<any>[] = definitions

const components = antdComponents.map(def => def.build())
export const models = components.map(([model]) => model)
export const metas = components.map(([_, meta]) => meta)

export const builderView = new BuilderView(models, metas)
export const view = createView(...models)
