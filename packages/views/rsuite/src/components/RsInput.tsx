import styled from '@emotion/styled'
import {boolean, define, event, string} from 'fb-core'
import {Input, InputProps} from 'rsuite'
import {size} from '../commonProperties'

export interface RsInputProps extends InputProps {
  label: string
  className: string
}

// todo этот компонент должен поддерижвать numeric input only (number format в старом фб)

const RsRtlLabel = styled.label`
  text-align: left;
`
const RsLabeledInput = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  label {
    margin-left: 5px;
  }

  input, div {
    margin-top: 2px;
  }
`
export const RsInput = ({style, className, label, ...props}: RsInputProps) =>
  <RsLabeledInput style={style} className={className}>
    <RsRtlLabel>{label}</RsRtlLabel>
    <Input {...props}/>
  </RsLabeledInput>

export const rsInput = define(RsInput)
  .props({
    disabled: boolean,
    label: string.default('Input').hinted('Input label'),
    placeholder: string.default('').hinted('Input placeholder'),
    readOnly: boolean,
    size,
    onChange: event,
    value: string.default('').valued,
  })
  .actions((props, def) => {
    return {
      action1: def('Action2', ({name, value, isActive}, eventArgs) => {
        console.log({name, value, isActive}, eventArgs)
      }, ['name', 'value', 'isActive']),
      valueLogger: def('Value console logger', e => console.log(e.value)),
      setLabel: e => props.label = e.value,
    }
  })



