import {boolean, define, string} from '@react-form-builder/builder/view'
import EyeIcon from '@rsuite/icons/legacy/Eye'
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash'
import {useState} from 'react'
import {Input, InputGroup, InputProps} from 'rsuite'
import {inputProps} from '../commonProperties'
import {RsLabeledInput, RsRtlLabel} from './components/Labeled'

interface RsInputProps extends InputProps {
  label: string
  passwordMask?: boolean
}

const RsInput = ({style, className, label, passwordMask, ...props}: RsInputProps) => {
  const [visible, setVisible] = useState(false)

  const input = passwordMask
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
  .type('RsInput')
  .name('Input')
  .props({
    label: string.default('Input').hinted('Input label'),
    ...inputProps,
    value: string.default('').valued,
    passwordMask: boolean
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
