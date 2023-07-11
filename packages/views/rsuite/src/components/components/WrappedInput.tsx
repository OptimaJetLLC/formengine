import {ChangeEvent, ChangeEventHandler} from 'react'
import {Input, InputProps} from 'rsuite'

/**
 * The React component that wraps the Input component.
 * @param props the React component properties.
 * @param props.onChange the onChange event of the Input.
 * @param props.props the other wrapped properties of the component.
 * @returns the React element.
 */
export const WrappedInput = ({onChange, ...props}: InputProps) => {
  const handleChange = (value: any, event: any) => onChange?.(event, value)
  return <Input onChange={handleChange} {...props}/>
}

/**
 * Creates the wrapper function to handle data changes in the wrapped input.
 * @param onChange the function to be wrapped.
 * @returns the wrapper function.
 */
export const onChangeWrapped = (onChange?: ChangeEventHandler<HTMLInputElement>) => {
  return (e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target?.value as any)
}
