import type {ReactNode} from 'react'
import type {SelectPickerProps} from 'rsuite'
import {SelectPicker} from 'rsuite'
import type {ItemDataType} from 'rsuite/esm/internals/types'
import type {ViewType} from './BuilderViewContext'
import {useBuilderView} from './BuilderViewContext'
import {material, rsuite} from './icons'

type Labeled = {value: ViewType; label: string; icon?: ReactNode}

const items: Labeled[] = [
  {value: 'rsuite', label: 'RSuite UI', icon: rsuite},
  {value: 'mui', label: 'Material UI', icon: material},
]

const iconItemStyle = {
  display: 'flex',
  gap: 8,
  alignItems: 'center',
}

const renderItem = (_: unknown, {label, icon}: ItemDataType) => {
  return (
    <div style={iconItemStyle}>
      {icon}
      {label}
    </div>
  )
}

/**
 * Component for selecting the builder view type (RSuite or Material UI).
 * @returns the React element.
 */
export const BuilderViewPicker = () => {
  const {view, setView} = useBuilderView()
  return (
    <SelectPicker
      data={items}
      value={view}
      onChange={setView as SelectPickerProps['onChange']}
      renderMenuItem={renderItem}
      renderValue={renderItem}
      size={'sm'}
      searchable={false}
      cleanable={false}
      className={'subtle-style'}
    />
  )
}
