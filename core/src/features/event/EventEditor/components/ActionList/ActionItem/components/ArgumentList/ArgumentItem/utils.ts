import {ComponentType} from 'react'
import {InputBindableText} from '../../../../../../../../substitution/components/InputBindableText'
import {Arg, ArgumentName, ArgumentType} from '../../../../../../../types'
import {InputProps} from './ArgumentItem'
import {InputBoolean} from './components/InputBoolean'
import {InputNumber} from './components/InputNumber'

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
