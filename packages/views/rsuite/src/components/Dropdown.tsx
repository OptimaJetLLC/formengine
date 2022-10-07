import {Form, InputPicker} from 'rsuite'
import {CSSProperties} from 'react'
import {boolean, string, define} from 'fb-core'

interface DropdownProps {
  label: string,
  data: { label: string, value: string }[]
  placeholder: string
  style: CSSProperties | undefined
  className: string
  block: boolean
}

const Dropdown = ({label, ...props}: DropdownProps) => {
  let {data, ...otherProps} = props;
  data = data ?? []
  return (
    <div>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <InputPicker {...otherProps} data={data}/>
    </div>
  )
}

export const dropdown = define(Dropdown)
  .props({
    'block': boolean.default(false),
    'data': undefined,
    'label': string.default(''),
    'placeholder': string.default(''),

  })

