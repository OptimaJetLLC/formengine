import {boolean, define, string} from '@react-form-builder/core'
import {EyeClose as EyeSlashIcon, Visible as EyeIcon} from '@rsuite/icons'
import {useState} from 'react'
import type {InputProps} from 'rsuite'
import {Input, InputGroup} from 'rsuite'
import {inputProps} from '../commonProperties'
import {RsLabeledInput, RsRtlLabel} from './components/Labeled'

interface RsInputProps extends InputProps {
  label: string
  passwordMask?: boolean
}

const RsInput = ({style, className, label, passwordMask, value, ...props}: RsInputProps) => {
  const [visible, setVisible] = useState(false)

  const input = passwordMask
    ? <InputGroup inside>
      <Input type={visible ? 'text' : 'password'} value={value ?? ''} {...props}/>
      <InputGroup.Button onClick={() => setVisible(!visible)}>
        {visible ? <EyeIcon/> : <EyeSlashIcon/>}
      </InputGroup.Button>
    </InputGroup>
    : <Input value={value ?? ''} {...props}/>

  return <RsLabeledInput style={style} className={className}>
    <RsRtlLabel>{label}</RsRtlLabel>
    {input}
  </RsLabeledInput>
}
export const rsInput = define(RsInput, 'RsInput')
  .name('Input')
  .props({
    label: string.default('Input').hinted('Input label'),
    ...inputProps,
    value: string.valued,
    passwordMask: boolean.default(false)
  })
