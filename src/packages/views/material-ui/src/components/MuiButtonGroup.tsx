import {ButtonGroup} from '@mui/material'
import {boolean, define, disabled, node, oneOfStrict, string} from '@react-form-builder/core'
import {inputsCategory} from './categories'

export const muiButtonGroup = define(ButtonGroup, 'MuiButtonGroup')
  .icon('Button')
  .category(inputsCategory)
  .props({
    children: node,
    color: string,
    fullWidth: boolean,
    orientation: oneOfStrict('vertical', 'horizontal'),
    disabled: disabled,
    variant: oneOfStrict('outlined', 'standard', 'filled')
  })
