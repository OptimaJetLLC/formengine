import {createView, Definer} from '@react-form-builder/builder/view'
import {antButton} from './components/AntButton'
import {antTooltip} from './components/AtnTooltip'

const definitions = [
  antButton,
  antTooltip
]

definitions.forEach(c => {
  const prefix = 'Ant'
  if (!c.getType().startsWith(prefix)) {
    throw new Error(`The component type must start with '${prefix}', type: '${c.getType()}'`)
  }
  c.category('Ant Design components')
})

export const antdComponents: Definer<any>[] = definitions

export {antTooltip}

const components = antdComponents.map(def => def.build())
export const models = components.map(({model}) => model)

export const view = createView(...models)
