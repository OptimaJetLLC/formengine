import {Parameter, ParameterName, ParameterType} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {ComponentType} from 'react'
import {Rows} from '../../../../../../../../components/Containers'
import {InputBoolean} from './components/InputBoolean'
import {InputNumber} from './components/InputNumber'
import {InputString} from './components/InputString'
import {InputProps} from './InputProps'

const extractArgumentData = (data: Parameter): [ParameterName, ParameterType] =>
  typeof data === 'string' ? [data, 'string'] : data

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

export const ArgumentItem = observer(({data}: ActionArgumentProps) => {
  const [name, type] = extractArgumentData(data)
  const ArgumentInput = getArgumentInputByType(type)

  return <Rows>
    <label>{name}</label>
    <ArgumentInput name={name}/>
  </Rows>
})

