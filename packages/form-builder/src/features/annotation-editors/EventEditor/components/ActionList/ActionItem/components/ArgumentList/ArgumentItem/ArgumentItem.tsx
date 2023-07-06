import {Parameter, ParameterName, ParameterType} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {ComponentType} from 'react'
import {LabeledInput} from '../../../../../../../../components/Containers'
import {InputBindableText} from '../../../../../../../../substitution/InputBindableText'
import {InputBoolean} from './components/InputBoolean'
import {InputNumber} from './components/InputNumber'
import {InputProps} from './InputProps'

const extractArgumentData = (data: Parameter): [ParameterName, ParameterType] =>
  typeof data === 'string' ? [data, 'string'] : data

const getArgumentInputByType = (type: ParameterType): ComponentType<InputProps> => {
  switch (type) {
    case 'string':
      return InputBindableText
    case 'number':
      return InputNumber
    case 'boolean':
      return InputBoolean
  }
}

interface ActionArgumentProps {
  data: Parameter
}

export const ArgumentItem = observer(({data}: ActionArgumentProps) => {
  const [name, type] = extractArgumentData(data)
  const ArgumentInput = getArgumentInputByType(type)

  return <LabeledInput style={{display: 'flex', flexDirection: 'column', flex: 1}}>
    <label>{name}</label>
    <ArgumentInput name={name}/>
  </LabeledInput>
})

