import {boolean, define, disabled, oneOf, string} from '@react-form-builder/core'
import {Input} from 'antd'
import type {InputProps} from 'antd/es/input/Input'
import {ChangeEvent, useCallback} from 'react'

interface AntInputProps extends InputProps {
  onChange?: (value: any) => void
}

const AntInput = (props: AntInputProps) => {
  const {onChange, ...otherProps} = props

  const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
  }, [])

  return <Input {...otherProps} onChange={onChangeHandler}/>
}

export const antInput = define(AntInput, 'AntInput')
  .name('Ant Input')
  .props({
    disabled: disabled,
    showCount: boolean,
    status: oneOf('error', 'warning'),
    size: oneOf('large', 'middle', 'small'),
    value: string.valued,
    variant: oneOf('outlined', 'borderless', 'filled', 'underlined').default('outlined'),
  })
