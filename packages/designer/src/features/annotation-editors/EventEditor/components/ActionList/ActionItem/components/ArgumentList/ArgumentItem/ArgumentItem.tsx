import {namedObserver} from '@react-form-builder/core'
import type {ReactNode} from 'react'
import {Rows} from '../../../../../../../../components/Containers'
import {InputBoolean} from './components/InputBoolean'
import {InputFunction} from './components/InputFunction'
import {InputNumber} from './components/InputNumber'
import {InputString} from './components/InputString'
import type {Parameter} from './Parameter'

interface ActionArgumentProps {
  data: Parameter
}

const RawArgumentItem = ({data: [name, type]}: ActionArgumentProps) => {
  let input: ReactNode = null

  switch (type) {
    case 'string':
      input = <InputString name={name} />
      break
    case 'number':
      input = <InputNumber name={name} />
      break
    case 'boolean':
      input = <InputBoolean name={name} />
      break
    case 'function':
      input = <InputFunction name={name} />
      break
    default:
      break
  }

  return (
    <Rows>
      <label>{name}</label>
      {input}
    </Rows>
  )
}

export const ArgumentItem = namedObserver('ArgumentItem', RawArgumentItem)
