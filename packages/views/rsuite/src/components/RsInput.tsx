import EyeIcon from '@rsuite/icons/legacy/Eye'
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash'
import {boolean, define, event, string} from 'form-builder/view'
import {useState} from 'react'
import {Input, InputGroup, InputProps} from 'rsuite'
import {readOnly, size} from '../commonProperties'
import {RsLabeledInput, RsRtlLabel} from './components/Labeled'

export interface RsInputProps extends InputProps {
  label: string
  masked?: boolean
}

// todo этот компонент должен поддерживать numeric input only (number format в старом фб)
export const RsInput = ({style, className, label, masked, ...props}: RsInputProps) => {
  const [visible, setVisible] = useState(false)

  const input = masked
    ? <InputGroup inside>
      <Input type={visible ? 'text' : 'password'} {...props}/>
      <InputGroup.Button onClick={() => setVisible(!visible)}>
        {visible ? <EyeIcon/> : <EyeSlashIcon/>}
      </InputGroup.Button>
    </InputGroup>
    : <Input {...props}/>

  return <RsLabeledInput style={style} className={className}>
    <RsRtlLabel>{label}</RsRtlLabel>
    {input}
  </RsLabeledInput>
}
export const rsInput = define(RsInput)
  .props({
    label: string.default('Input').hinted('Input label'),
    value: string.default('').valued,
    placeholder: string.default('').hinted('Input placeholder'),
    size,
    disabled: boolean.hinted('Disabled component'),
    masked: boolean.hinted('Use masked input'),
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
