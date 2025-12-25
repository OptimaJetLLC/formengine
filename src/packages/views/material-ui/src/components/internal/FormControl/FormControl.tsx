import type {FormControlProps} from '@mui/material'
import {FormControl, FormHelperText, InputLabel} from '@mui/material'
import {useComponentData} from '@react-form-builder/core'
import type {ChangeEvent, ComponentType} from 'react'
import {useCallback, useMemo} from 'react'
import {useRequired} from './useRequired'

/**
 * Props for the Material-UI FormControl component.
 */
export interface MuiFormControlProps extends FormControlProps {
  /**
   * The label for the form control.
   */
  label?: string
  /**
   * The id for the label element.
   */
  labelId?: string
  /**
   * If true, the form control will be disabled.
   */
  disabled?: boolean
  /**
   * If true, the form control will be required.
   */
  required?: boolean
  /**
   * The error message for the form control.
   */
  helperText?: string
}

const ErrorMessage = ({errorMessage}: { errorMessage?: string }) => {
  if (!errorMessage) return null
  return <FormHelperText>{errorMessage}</FormHelperText>
}

const FormControlWrapper = (props: MuiFormControlProps) => {
const { children, label, labelId, helperText, ...otherProps } = props
  return <FormControl {...otherProps} fullWidth>
    {!!label &&  <InputLabel id={labelId}>{label}</InputLabel>}
    {children}
    <ErrorMessage errorMessage={helperText}/>
  </FormControl>
}

/**
 * Hook that provides form control props for Material-UI components.
 * @param props component props.
 * @returns tuple containing form control props and component props.
 */
export const useFormControlProps = (props: any): [MuiFormControlProps, any] => {
  const {fullWidth, label, onChange, error: errorProp, helperText: helperTextProp, ...otherProps} = props
  const {field} = useComponentData()

  const helperText = field?.error ?? helperTextProp
  const error = field?.error !== undefined || errorProp
  const required = useRequired()
  const handleChange = useCallback((event: ChangeEvent<any>) => {
    onChange?.(event.target.value)
  }, [onChange])

  return [
    {fullWidth, label, error, helperText, required},
    {onChange: handleChange, label, ...otherProps}
  ]
}


/**
 * HOC that wraps a component with a Material-UI FormControl.
 * @param Component the component to wrap.
 * @returns the wrapped component.
 */
export const withFormControl = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: any) => {
    const [formControlProps, componentProps] = useFormControlProps(props)
    const {key} = useComponentData()
    const labelId = useMemo(() => `${key}-label`, [key])

    return <FormControlWrapper {...formControlProps} labelId={labelId}>
      <Component {...componentProps} id={key} labelId={labelId}/>
    </FormControlWrapper>
  }

  WrappedComponent.displayName = `withFormControl(${Component.displayName || Component.name})`
  return WrappedComponent
}
