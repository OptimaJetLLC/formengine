import {createView, Definer} from '@react-form-builder/core'
import {antButton} from './components/AntButton'
import {antCol} from './components/AntCol'
import {antInput} from './components/AntInput'
import {antModal} from './components/AntModal'
import {antRow} from './components/AntRow'
import {antTable} from './components/AntTable'
import {antTooltip} from './components/AntTooltip'

const definitions = [
  antButton,
  antCol,
  antModal,
  antInput,
  antRow,
  antTable,
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
