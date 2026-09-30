import {CellInfoContextProvider, define, node, string, useBuilderComponent} from '@react-form-builder/core'
import cx from 'clsx'
import type {ReactNode} from 'react'
import {Children, useMemo} from 'react'
import type {CellProps} from 'rsuite'
import {Popover, Table, Whisper} from 'rsuite'
import style from './Table.module.css'
import {tableComponentsCategory} from './tableComponentsCategory'
import {rsCellTypeName} from './typeNames'

const CellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
    <rect x="6" y="6" width="12" height="12" stroke="currentColor" strokeWidth="1.5" rx="1" />
    <rect x="6" y="6" width="12" height="12" fill="currentColor" fillOpacity="0.1" rx="1" />
  </svg>
)

const {Cell} = Table

const RsBuilderCell = (props: CellProps<Record<string, unknown>>) => {
  const speaker = useMemo(
    () => <Popover className={style.cellPopover}>{`Cell dataKey: ${props.dataKey ?? 'not defined'}`}</Popover>,
    [props.dataKey]
  )

  return (
    <Whisper placement="top" trigger="hover" speaker={speaker}>
      <div className={cx(props.className, style.cell)}>
        {Children.map(props.children, child => (
          <div className={style.nested}>{child}</div>
        ))}
      </div>
    </Whisper>
  )
}

const RsViewerCell = (props: CellProps<Record<string, unknown>>) => {
  const {dataKey, rowIndex, rowData, children, ...otherProps} = props

  const contextValue = useMemo(() => {
    return {dataKey, rowIndex, rowData}
  }, [dataKey, rowData, rowIndex])

  return (
    <Cell {...otherProps} rowIndex={rowIndex}>
      <CellInfoContextProvider value={contextValue}>{children ?? (rowData?.[dataKey as string] as ReactNode)}</CellInfoContextProvider>
    </Cell>
  )
}

const RsCell = (props: CellProps<Record<string, unknown>>) => {
  return useBuilderComponent(RsBuilderCell, RsViewerCell, props)
}

export const rsCell = define(RsCell, rsCellTypeName)
  .name('Cell')
  .category(tableComponentsCategory)
  .icon(CellIcon)
  .props({
    dataKey: string,
    children: node,
  })
  .showInlineStylesEditor(true)
  .showClassNameStylesEditor(false)
  .hideTooltipEditor()
  .hideActionEditors()
