import styled from '@emotion/styled'
import {boolean, define, event, string} from 'fb-core'
import {Input as RInput, InputProps as RInputProps} from 'rsuite'
import {size} from '../commonProperties'

export interface InputProps extends RInputProps {
  label: string
  className: string
}

export enum Size {
  XSmall = 'xs',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
}

// todo этот компонент должен поддерижвать numeric input only (number format в старом фб)

const RtlLabel = styled.label`
  text-align: left;
`
const LabeledInput = styled.div`
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
export const Input = ({style, className, label, ...props}: InputProps) => {

  return (
    <LabeledInput style={style} className={className}>
      <RtlLabel>{label}</RtlLabel>
      <RInput {...props}/>
    </LabeledInput>
  )
}

export const input = define(Input)
  .props({
    disabled: boolean,
    label: string.default('Input'),
    placeholder: string,
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



