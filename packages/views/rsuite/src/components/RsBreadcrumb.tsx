import styled from '@emotion/styled'
import {array, define, event, number, oneOf, string} from 'form-builder/view'
import {Breadcrumb, BreadcrumbProps, Checkbox, Input, Table} from 'rsuite'

interface RsBreadcrumbItemProps {
  active?: boolean
  href?: string
  title?: string
}

const {Cell} = Table

const SCell = styled(Cell)`
  padding: 0;

  & .rs-table-cell-content {
    padding: 9px 3px;
  }
`

interface InputCellProps extends Record<string, any> {
  onChange?: (value?: any, dataKey?: string, rowIndex?: number) => void
  dataKey: string
}

const InputCell = ({rowData, dataKey, rowIndex, ...props}: InputCellProps) => {
  const onChange = (value: any) => {
    rowData[dataKey] = value
    props.onChange?.(value, dataKey, rowIndex)
  }
  return (
    <SCell {...props}>
      <Input value={rowData[dataKey] ?? ''} onChange={onChange} size="sm"/>
    </SCell>
  )
}

const SCheckbox = styled(Checkbox)`
  & .rs-checkbox-wrapper {
    left: 4px;
    top: 6px;
  }
`

export const CheckCell = ({rowData, dataKey, rowIndex, onChange, ...props}: InputCellProps) => {
  const handleChange = (value: any, checked: boolean) => {
    rowData[dataKey] = checked
    onChange?.(checked, dataKey, rowIndex)
  }
  return (
    <SCell {...props}>
      <SCheckbox inline checked={rowData[dataKey] ?? false} onChange={handleChange}/>
    </SCell>
  )
}

const makeItems = (data: string[]) => data.map(title => ({title, href: title}))

interface RsBreadcrumbProps extends BreadcrumbProps {
  items: RsBreadcrumbItemProps[]
  onItemClick: (item: RsBreadcrumbItemProps) => {}
}

const columns = [
  {name: 'title', input: InputCell},
  {name: 'href', title: 'Url', input: InputCell},
  {name: 'active', input: CheckCell}
]

const RsBreadcrumb = ({items, onItemClick, ...props}: RsBreadcrumbProps) => (
  <Breadcrumb {...props} style={{display: 'flex'}}>
    {items?.map(item => {
        const {title = '', ...itemProps} = item
        const handleClick = () => onItemClick?.(item)
        return (
          <Breadcrumb.Item {...itemProps} onClick={handleClick} key={title}>
            {title}
          </Breadcrumb.Item>)
      }
    )}
  </Breadcrumb>
)

export const rsBreadcrumb = define(RsBreadcrumb)
  .props({
    separator: string.default('/'),
    maxItems: number
      .withEditorProps({min: 0})
      .hinted('Set the maximum number of breadcrumbs to display'),
    items: array
      .default(makeItems(['one', 'two', 'three']))
      .withEditorProps({columns}),
    onItemClick: event,
    onExpand: event
  })
  .css({
    justifyContent: oneOf('left', 'center', 'right')
      .default('left').radio().named('Alignment'),
  })
