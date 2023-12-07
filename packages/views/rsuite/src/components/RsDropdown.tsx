import styled from '@emotion/styled'
import {array, define, string, toLabeledValues} from '@react-form-builder/core'
import type {ReactNode} from 'react'
import type {InputPickerProps} from 'rsuite'
import {Form, InputPicker, Loader} from 'rsuite'
import {pickerProps} from '../commonProperties'
import {LoadDataHandler, useLoadData} from '../hooks'
import {RsLabeledInput} from './components/Labeled'

interface RsDropdownProps extends InputPickerProps {
  label: string
  onLoadData?: LoadDataHandler
}

const RsDropdown = ({data, label, onLoadData, onSearch, onOpen, value = '', className, ...props}: RsDropdownProps) => {
  const {loading, ...loadProps} = useLoadData({data, onLoadData, onSearch, onOpen, value})

  const renderMenu = (menu: ReactNode) => <>
    {menu}
    {loading && <SLoader/>}
  </>

  return (
    <RsLabeledInput className={className}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <InputPicker {...props} {...loadProps} renderMenu={renderMenu}/>
    </RsLabeledInput>
  )
}

const SLoader = styled(Loader)`
  && {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    background: var(--rs-bg-overlay);
    width: 100%;
    padding-block: 10px
  }
`

export const rsDropdown = define(RsDropdown)
  .type('RsDropdown')
  .name('Dropdown')
  .props({
    ...pickerProps,
    label: string.default('Select'),
    data: array.default(toLabeledValues(['a', 'b', 'c']))
  })
