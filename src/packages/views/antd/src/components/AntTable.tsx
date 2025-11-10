import {array, boolean, define, event, oneOf, string} from '@react-form-builder/core'
import type {TableProps} from 'antd'
import {Table} from 'antd'

const AntTable = (props: TableProps) => {
  return <Table {...props}/>
}

export const antTable = define(AntTable, 'AntTable')
  .category('antd')
  .props({
    columns: array.setup({editor: 'arrayOfObject'}),
    bordered: boolean,
    dataSource: array.valued.hideEditor(),
    loading: boolean,
    rowKey: string.default('key'),
    rowHoverable: boolean,
    showHeader: boolean.default(true),
    showSorterTooltip: boolean,
    size: oneOf('large', 'middle', 'small'),
    sticky: boolean,
    onChange: event,
  })
  .overrideEventHandlers({})
