import {ComponentType} from 'react'
import {InputBindableText} from '../../../../../../../../substitution/components/InputBindableText'
import {Arg, ArgumentName, ArgumentType} from '../../../../../../../args'
import {InputBoolean} from './components/InputBoolean'
import {InputNumber} from './components/InputNumber'
import {InputProps} from './InputProps'

export const extractArgumentData = (data: Arg): [ArgumentName, ArgumentType] =>
  typeof data === 'string' ? [data, 'string'] : data

export const getArgumentInputByType = (type: ArgumentType): ComponentType<InputProps> => {
  switch (type) {
    case 'string':
      return InputBindableText
    case 'number':
      return InputNumber
    case 'boolean':
      return InputBoolean
  }
}
