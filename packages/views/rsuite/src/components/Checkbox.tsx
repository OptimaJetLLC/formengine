import {boolean, define, event, string} from 'fb-core'
import {Checkbox as RCheckbox, CheckboxProps as RCheckboxProps} from 'rsuite'

interface CheckboxProps extends RCheckboxProps {
  label: string,
}

const Checkbox = ({label, ...props}: CheckboxProps) => (
  <RCheckbox {...props}>{label}</RCheckbox>
)

export const checkbox = define(Checkbox)
  .props({
    label: string.default('Checkbox'),
    checked: boolean,
    indeterminate: boolean,
    disabled: boolean,

    onChange: event,
  })
