import type {ParameterType} from '@react-form-builder/core'
import {namedObserver} from '@react-form-builder/core'
import type {ComponentType} from 'react'
import {Rows} from '../../../../../../../../components/Containers'
import {InputBoolean} from './components/InputBoolean'
import {InputNumber} from './components/InputNumber'
import {InputString} from './components/InputString'
import type {InputProps} from './InputProps'
import type {Parameter} from './Parameter'

const getArgumentInputByType = (type: ParameterType): ComponentType<InputProps> => {
  switch (type) {
    case 'string':
      return InputString
    case 'number':
      return InputNumber
    case 'boolean':
      return InputBoolean
  }
}

interface ActionArgumentProps {
  data: Parameter
}

const RawArgumentItem = ({data}: ActionArgumentProps) => {
  const [name, type] = data
  const ArgumentInput = getArgumentInputByType(type)

  return <Rows>
    <label>{name}</label>
    <ArgumentInput name={name}/>
  </Rows>
}

export const ArgumentItem = namedObserver('ArgumentItem', RawArgumentItem)
