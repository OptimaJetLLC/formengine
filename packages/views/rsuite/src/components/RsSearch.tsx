import styled from '@emotion/styled'
import {define, string} from '@react-form-builder/core'
import {Search} from '@rsuite/icons'
import type {ReactNode} from 'react'
import {Form, InputPicker, InputPickerProps, Loader} from 'rsuite'
import {pickerProps} from '../commonProperties'
import {LoadDataHandler, useLoadData} from '../hooks'
import {RsLabeledInput} from './components/Labeled'

interface RsSearchProps extends InputPickerProps {
  label: string
  onLoadData?: LoadDataHandler
}

const RsSearch = ({data, label, onLoadData, onSearch, value, className, ...props}: RsSearchProps) => {
  const {loading, onOpen, ...loadProps} = useLoadData({data, onLoadData, onSearch, value})
  const renderMenu = (menu: ReactNode) => loadProps.data?.length ? menu : null

  const Icon = loading ? Loader : Search

  return (
    <RsLabeledInput className={className}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <Container>
        <SInputPicker {...props} {...loadProps} renderMenu={renderMenu}/>
        <Icon className={'search-icon'}/>
      </Container>
    </RsLabeledInput>
  )
}

const Container = styled.div`
  display: flex;

  .search-icon {
    margin-left: -28px;
    margin-top: 10px;
    z-index: 10;
  }

  .rs-loader .rs-loader-spin, .rs-loader .rs-loader-spin:after, .rs-loader .rs-loader-spin:before {
    height: 16px !important;
    width: 16px !important;
  }
`

const SInputPicker = styled(InputPicker)`
  .rs-picker-toggle-caret.rs-icon {
    display: none;
  }
`

export const rsSearch = define(RsSearch)
  .type('RsSearch')
  .name('Search')
  .props({
    ...pickerProps,
    label: string.default('Search'),
    placeholder: string.default('Search')
  })
