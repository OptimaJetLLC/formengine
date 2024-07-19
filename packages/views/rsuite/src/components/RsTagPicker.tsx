import {array, define, toLabeledValues} from '@react-form-builder/core'
import {ReactNode, useCallback} from 'react'
import type {TagPickerProps} from 'rsuite'
import {Form, TagPicker} from 'rsuite'
import {pickerProps} from '../commonProperties'
import {LoadDataHandler, useLoadData} from '../hooks'
import {RsLabeledInput} from './components/Labeled'
import {useTouchOnEvent} from './hooks/useTouchOnEvent'
import {SLoader} from './SLoader'

interface RsTagPickerProps extends TagPickerProps {
  label: string
  onLoadData?: LoadDataHandler
}

const RsTagPicker = ({data, label, onLoadData, onSearch, onOpen, value = [], className, ...props}: RsTagPickerProps) => {
  const {loading, ...loadProps} = useLoadData({data, onLoadData, onSearch, onOpen, value})
  const onClean = useTouchOnEvent(props, 'onClean')

  const renderMenu = useCallback((menu: ReactNode) => <>
    {menu}
    {loading && <SLoader/>}
  </>, [loading])

  const isNonEmptyValueAndLabel = function (item: any) {
    return item && item.value && item.label
  }

  const transformedData = Array.isArray(data)
    ? data.filter(isNonEmptyValueAndLabel)
    : toLabeledValues(data || []).filter(isNonEmptyValueAndLabel)

  return (
    <RsLabeledInput className={className}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <TagPicker
        {...props}
        {...loadProps}
        data={transformedData}
        onClean={onClean}
        renderMenu={renderMenu}
      />
    </RsLabeledInput>
  )
}

export const rsTagPicker = define(RsTagPicker, 'RsTagPicker')
  .name('TagPicker')
  .props({
    ...pickerProps,
    value: array.valued.ofString,
    label: pickerProps.label.default('Select'),
    data: array.default(toLabeledValues(['a', 'b', 'c']))
  })
