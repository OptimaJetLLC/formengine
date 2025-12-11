import type {SelectProps} from '@mui/material'
import {MenuItem, Select} from '@mui/material'
import type {LabeledValue} from '@react-form-builder/core'
import {array, string, toLabeledValues} from '@react-form-builder/core'
import {defineFormControl} from './internal/FormControl/defineFormControl'

interface MuiSelectProps extends Omit<SelectProps<string>, 'onChange'> {
  items?: LabeledValue[]
  value?: string
}

const MuiSelect = ({items = [], ...props}: MuiSelectProps) => (
  <Select {...props}>
    {items.map(item => (
      <MenuItem key={item.value} value={item.value}>
        {item.label}
      </MenuItem>
    ))}
  </Select>
)

export const muiSelect = defineFormControl<MuiSelectProps>(MuiSelect, 'MuiSelect', {
  value: string.valued.uncontrolledValue(''),
  items: array.default(toLabeledValues(['Item1', 'Item2', 'Item3']))
})
  .icon('Dropdown')
