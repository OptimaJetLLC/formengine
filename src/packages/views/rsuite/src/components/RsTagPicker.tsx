import {array, define, toLabeledValues} from '@react-form-builder/core'
import type {ReactNode} from 'react'
import {useCallback} from 'react'
import type {TagPickerProps} from 'rsuite'
import {TagPicker} from 'rsuite'
import {pickerProps} from '../commonProperties'
import type {LoadDataProps} from '../hooks'
import {useLoadData} from '../hooks'
import {Labeled} from './components/Labeled'
import {useTouchOnEvent} from './hooks/useTouchOnEvent'
import {SLoader} from './SLoader'

interface RsTagPickerProps extends TagPickerProps, LoadDataProps {
  label: string
}

const RsTagPicker = ({
                       data,
                       label,
                       onLoadData,
                       onSearch,
                       onOpen,
                       value = [],
                       className,
                       disableVirtualized,
                       ...props
                     }: RsTagPickerProps) => {
  const {loading, ...loadProps} = useLoadData({data, onLoadData, onSearch, onOpen, value, disableVirtualized})
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
    <Labeled label={label} className={className}>
      <TagPicker
        {...props}
        {...loadProps}
        data={transformedData}
        onClean={onClean}
        renderMenu={renderMenu}
      />
    </Labeled>
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
