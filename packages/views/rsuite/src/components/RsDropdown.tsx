import {array, boolean, define, string, toLabeledValues} from '@react-form-builder/core'
import type {ReactNode} from 'react'
import {useCallback} from 'react'
import type {InputPickerProps} from 'rsuite'
import {Form, InputPicker} from 'rsuite'
import {pickerProps} from '../commonProperties'
import type {LoadDataHandler} from '../hooks'
import {useLoadData} from '../hooks'
import {RsLabeledInput} from './components/Labeled'
import {useTouchOnEvent} from './hooks/useTouchOnEvent'
import {SLoader} from './SLoader'

interface RsDropdownProps extends InputPickerProps {
  label: string
  onLoadData?: LoadDataHandler
  preload?: boolean
}

const RsDropdown = ({data, label, onLoadData, onSearch, onOpen, value = '', className, preload, ...props}: RsDropdownProps) => {
  const {loading, ...loadProps} = useLoadData({data, onLoadData, onSearch, onOpen, value, preload})
  const onClean = useTouchOnEvent(props, 'onClean')

  const renderMenu = useCallback((menu: ReactNode) => <>
    {menu}
    {loading && <SLoader/>}
  </>, [loading])

  return (
    <RsLabeledInput className={className}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <InputPicker
        {...props}
        {...loadProps}
        onClean={onClean}
        renderMenu={renderMenu}
      />
    </RsLabeledInput>
  )
}

export const rsDropdown = define(RsDropdown, 'RsDropdown')
  .name('Dropdown')
  .props({
    ...pickerProps,
    preload: boolean.default(false),
    label: string.default('Select'),
    data: array.default(toLabeledValues(['a', 'b', 'c']))
  })
