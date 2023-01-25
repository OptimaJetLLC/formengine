import {Definition} from 'form-builder'
import {antButton} from './components/AntButton'

const components = [
  antButton,
]

components.forEach(c => {
  const prefix = 'Ant'
  if (!c.type.startsWith(prefix)) {
    throw new Error(`The component type must start with '${prefix}', type: '${c.type}'`)
  }
})

export const antdComponents: Definition<any>[] = components
