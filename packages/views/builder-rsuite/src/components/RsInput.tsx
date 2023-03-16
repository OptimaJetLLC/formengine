import {boolean, define, event, string} from 'fb-core'
import {Input, InputProps} from 'rsuite'
import {readOnly, size} from '../commonProperties'
import {RsLabeledInput, RsRtlLabel} from './components/Labeled'

export interface RsInputProps extends InputProps {
  label: string
  className: string
}

// todo этот компонент должен поддерживать numeric input only (number format в старом фб)
export const RsInput = ({style, className, label, ...props}: RsInputProps) =>
  <RsLabeledInput style={style} className={className}>
    <RsRtlLabel>{label}</RsRtlLabel>
    <Input {...props}/>
  </RsLabeledInput>

export const rsInput = define(RsInput)
  .props({
    label: string.default('Input').hinted('Input label'),
    value: string.default('').valued,
    placeholder: string.default('').hinted('Input placeholder'),
    size,
    disabled: boolean.hinted('Disabled component'),
    readOnly,
    onChange: event,
  })
  .actions((props, def) => {
    return {
      action1: def('Action2', ({name, value, isActive}, eventArgs) => {
        console.log({name, value, isActive}, eventArgs)
      }, ['name', 'value', 'isActive']),
      valueLogger: def('Value console logger', e => console.log(e.value)),
      setLabel: e => props.label.value = e.value,
    }
  })



