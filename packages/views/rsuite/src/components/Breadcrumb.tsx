import {array, define, event, number, oneOf, string} from 'fb-core'
import {CheckCell, InputCell} from 'fb-core/src/features/ui/CustomCells'
import {Breadcrumb as RBreadcrumb, BreadcrumbProps as RBreadcrumbProps} from 'rsuite'

interface BreadcrumbItemProps {
  active?: boolean
  href?: string
  title?: string
}

const makeItems = (data: string[]) => data.map(title => ({title, href: title}))

interface BreadcrumbProps extends RBreadcrumbProps {
  items: BreadcrumbItemProps[]
  justifyContent: string
  onItemClick: (item: BreadcrumbItemProps) => {}
}

const columns = [
  {name: 'title', input: InputCell},
  {name: 'href', title: 'Url', input: InputCell},
  {name: 'active', input: CheckCell}
]

const Breadcrumb = ({items, onItemClick, ...props}: BreadcrumbProps) => (
  <RBreadcrumb {...props} style={{display: 'flex'}}>
    {items?.map(item => {
        const {title = '', ...itemProps} = item
        const handleClick = () => onItemClick?.(item)
        return (
          <RBreadcrumb.Item {...itemProps} onClick={handleClick} key={title}>
            {title}
          </RBreadcrumb.Item>)
      }
    )}
  </RBreadcrumb>
)

export const breadcrumb = define(Breadcrumb)
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
