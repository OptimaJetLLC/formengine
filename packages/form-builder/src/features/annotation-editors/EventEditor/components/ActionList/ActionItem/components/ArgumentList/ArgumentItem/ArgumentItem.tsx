import {Parameter} from 'fb-core'
import {observer} from 'mobx-react'
import {LabeledInput} from '../../../../../../../../components/Containers'
import {extractArgumentData, getArgumentInputByType} from './utils'

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

