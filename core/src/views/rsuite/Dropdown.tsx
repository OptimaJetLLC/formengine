import {CSSProperties} from 'react'
import {Form, InputPicker} from 'rsuite'
import {boolean, string} from '../../features/annotation'
import {define} from '../../features/annotation/utils/define'

interface DropdownProps {
  label: string,
  data: { label: string, value: string }[]
  placeholder: string
  style: CSSProperties | undefined
  className: string
  block: boolean
}

const Dropdown = ({label, ...props}: DropdownProps) => {

  return (
    <div>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <InputPicker {...props}/>
    </div>
  )
}

export const dropdown = define(Dropdown)
  .props({
    'block': boolean.isRequired(false),
    'data': undefined,
    'label': string.isRequired(''),
    'placeholder': string.isRequired(''),

  })

