import {array, boolean, define, event, string, toLabeledValues} from '@react-form-builder/builder/view'
import type {InputPickerProps} from 'rsuite'
import {Form, InputPicker} from 'rsuite'
import {placement, readOnly, size} from '../commonProperties'

interface RsDropdownProps extends InputPickerProps {
  label: string,
  placeholder: string
}

const RsDropdown = ({label, ...props}: RsDropdownProps) => {
  const {data, ...otherProps} = props
  const pickerData = data ?? []
  return (
    <div>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <InputPicker {...otherProps} data={pickerData}/>
    </div>
  )
}

export const rsDropdown = define(RsDropdown)
  .type('RsDropdown')
  .name('Dropdown')
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
    disabled: boolean.hinted('Whether or not component is disabled'),
    readOnly,
    groupBy: string.default(''),

    onSelect: event,
    onClean: event,
    onClose: event,
    onCreate: event,
    onChange: event,
    onSearch: event,
  })

