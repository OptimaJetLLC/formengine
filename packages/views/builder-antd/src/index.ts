import {Definition} from 'form-builder'
import {AntButton} from './components/AntButton'

const components = [
  AntButton
]

components.forEach(c => {
  const prefix = 'Ant'
  if (!c.type.startsWith(prefix)) {
    throw new Error(`The component type must start with '${prefix}', type: '${c.type}'`)
  }
})

export const antdComponents: Definition<any>[] = components
