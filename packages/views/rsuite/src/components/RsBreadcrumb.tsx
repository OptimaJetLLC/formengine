import {array, define, event, number, oneOf, string} from 'fb-core'
import {CheckCell, InputCell} from 'fb-core/src/features/ui/CustomCells'
import {Breadcrumb, BreadcrumbProps} from 'rsuite'

interface RsBreadcrumbItemProps {
  active?: boolean
  href?: string
  title?: string
}

const makeItems = (data: string[]) => data.map(title => ({title, href: title}))

interface RsBreadcrumbProps extends BreadcrumbProps {
  items: RsBreadcrumbItemProps[]
  justifyContent: string
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
    justifyContent: oneOf('left', 'center', 'right')
      .default('left').radio().named('Alignment'),
    items: array
      .default(makeItems(['one', 'two', 'three']))
      .withEditorProps({columns}),
    onItemClick: event,
    onExpand: event
  })
