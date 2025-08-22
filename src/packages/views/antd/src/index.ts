import {createView, Definer} from '@react-form-builder/core'
import {antButton} from './components/AntButton'
import {antInput} from './components/AntInput'
import {antModal} from './components/AntModal'
import {antTooltip} from './components/AntTooltip'

const definitions = [
  antButton,
  antModal,
  antInput,
  antTooltip
]

const prefix = 'Ant'
definitions.forEach(c => {
  if (!c.getType().startsWith(prefix)) {
    throw new Error(`The component type must start with '${prefix}', type: '${c.getType()}'`)
  }
  c.category('Ant Design components')
})

export const antdComponents: Definer<any>[] = definitions

export {antModal, antTooltip}

const components = antdComponents.map(def => def.build())
export const models = components.map(({model}) => model)

export const view = createView(models)
