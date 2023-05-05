import {ChangeEvent, ChangeEventHandler} from 'react'
import {Input, InputProps} from 'rsuite'

export const WrappedInput = ({onChange, ...props}: InputProps) => {
  const handleChange = (value: any, event: any) => onChange?.(event, value)
  return <Input onChange={handleChange} {...props}/>
}

export const onChangeWrapped = (onChange?: ChangeEventHandler<HTMLInputElement>) => {
  return (e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target?.value as any)
}
