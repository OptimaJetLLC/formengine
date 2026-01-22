import {TextField} from '@mui/material'
import {boolean, define, number, oneOfStrict, readOnly, string} from '@react-form-builder/core'
import type {ComponentProps} from 'react'
import {inputsCategory} from './categories'
import {formControlProperties} from './internal/FormControl/defineFormControl'
import {useFormControlProps} from './internal/FormControl/FormControl'
import {useReadOnlySlotProp} from './internal/useReadOnlySlotProp'

/**
 * Props for the MuiTextField component.
 */
export type MuiTextFieldProps = ComponentProps<typeof TextField> & {
  /**
   * If true, the form control will be read-only.
   */
  readOnly?: boolean
  /**
   * Callback function when the text field value changes.
   */
  onChange?: (value: string) => void
}

/**
 * Material-UI TextField component for form builder.
 * @param props component properties.
 * @returns text field component.
 */
const MuiTextField = (props: MuiTextFieldProps) => {
  const [formControlProps, componentProps] = useFormControlProps(props)
  const slotProps = useReadOnlySlotProp(props.readOnly)
  return <TextField {...formControlProps} {...componentProps} slotProps={slotProps}/>
}

export const muiTextField = define(MuiTextField, 'MuiTextField')
  .icon('Input')
  .category(inputsCategory)
  .props({
    value: string.valued.uncontrolledValue(''),
    multiline: boolean,
    maxRows: number,
    ...formControlProperties,
    readOnly: readOnly,
    size: oneOfStrict('small', 'medium'),
    margin: oneOfStrict('dense', 'normal', 'none')
  })
