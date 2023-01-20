import {array, boolean, define, event, LabeledValue, string, toLabeledValues} from 'form-builder'
import {CSSProperties} from 'react'
import {Form, InputPicker} from 'rsuite'
import {InputPickerProps} from 'rsuite/esm/InputPicker/InputPicker'
import {placement, size} from '../commonProperties'

interface RsDropdownProps extends InputPickerProps {
  label: string,
  data: LabeledValue[]
  placeholder: string
  style: CSSProperties | undefined
  className: string
}

const RsDropdown = ({label, ...props}: RsDropdownProps) => {
  let {data, ...otherProps} = props
  data = data ?? []
  return (
    <div>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <InputPicker {...otherProps} data={data}/>
    </div>
  )
}

export const rsDropdown = define(RsDropdown)
  .props({
    label: string.default('Select'),
    placement,
    size,
    defaultValue: string,
    value: string.valued,
    placeholder: string,
    data: array.default(toLabeledValues(['a', 'b', 'c']))
      .named('Items')
      .hinted('Dropdown items'),

    block: boolean.default(true),
    cleanable: boolean.default(false),
    creatable: boolean.default(false),
    disabled: boolean,
    groupBy: string.default(''),

    onSelect: event,
    onClean: event,
    onClose: event,
    onCreate: event,
    onChange: event,
    onSearch: event,
  })

