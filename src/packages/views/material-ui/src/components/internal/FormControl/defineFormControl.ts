import type {Annotations} from '@react-form-builder/core'
import {boolean, define, disabled, event, oneOfStrict, required, string} from '@react-form-builder/core'
import type {ComponentType} from 'react'
import {inputsCategory} from '../../categories'
import {withFormControl} from './FormControl'
import type {MuiControlProps} from './types'

export const formControlProperties: Partial<Record<keyof MuiControlProps, any>> = {
  label: string,
  required: required,
  disabled: disabled,
  variant: oneOfStrict('outlined', 'standard', 'filled'),
  fullWidth: boolean,
  size: oneOfStrict('small', 'medium', 'large'),
  error: boolean,
  helperText: string,
  onChange: event,
}

/**
 * Define a form control component.
 * @param Component React component to wrap with form control.
 * @param name component name for the form builder.
 * @param props additional component properties and annotations.
 * @returns form control component definition.
 */
export const defineFormControl = <T extends object>(Component: ComponentType<T>, name: string, props: Annotations<T>) => define(withFormControl(Component), name)
  .category(inputsCategory)
  .props({
    ...formControlProperties,
    ...props
  })
