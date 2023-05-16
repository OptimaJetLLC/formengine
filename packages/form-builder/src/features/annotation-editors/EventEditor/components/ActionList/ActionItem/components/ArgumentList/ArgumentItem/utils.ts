import {Parameter, ParameterName, ParameterType} from '@react-form-builder/core'
import {ComponentType} from 'react'
import {InputBindableText} from '../../../../../../../../substitution/InputBindableText'
import {InputBoolean} from './components/InputBoolean'
import {InputNumber} from './components/InputNumber'
import {InputProps} from './InputProps'

export const extractArgumentData = (data: Parameter): [ParameterName, ParameterType] =>
  typeof data === 'string' ? [data, 'string'] : data

export const getArgumentInputByType = (type: ParameterType): ComponentType<InputProps> => {
  switch (type) {
    case 'string':
      return InputBindableText
    case 'number':
      return InputNumber
    case 'boolean':
      return InputBoolean
  }
}
