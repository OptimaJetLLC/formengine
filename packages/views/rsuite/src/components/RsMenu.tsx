import {InputCell} from '@react-form-builder/builder'
import {array, define, useComponentData} from '@react-form-builder/builder/view'
import ResponsiveNav from '@rsuite/responsive-nav'
import {NavProps} from 'rsuite/esm/Nav/Nav'
import {navProps} from '../commonProperties'

type MenuItem = {
  href?: string
  title?: string
}

const makeItems = (data: string[]) => data.map(title => ({title, href: title}))

interface RsMenuProps extends NavProps {
  items?: MenuItem[]
}

const RsMenu = ({onSelect, items, ...props}: RsMenuProps) => {
  const {store} = useComponentData()
  if (!items?.length) return null
  const onNavSelect: NavProps['onSelect'] = (eventKey, event) => {
    store.props.activeKey = {value: eventKey}
    onSelect?.(eventKey, event)
  }

  return <ResponsiveNav onSelect={onNavSelect} {...props}>
    {items.map(({title, href}, index) =>
      <ResponsiveNav.Item key={index} href={href} eventKey={title} active={title === props.activeKey}>
        {title}
      </ResponsiveNav.Item>)
    }
  </ResponsiveNav>
}

const columns = [
  {name: 'title', input: InputCell},
  {name: 'href', title: 'Url', input: InputCell}
]

const {activeKey, ...props} = navProps

export const rsMenu = define(RsMenu)
  .type('RsMenu')
  .props({
    activeKey: activeKey.default('Home'),
    ...props,
    items: array
      .default(makeItems(['Home', 'News', 'Products']))
      .withEditorProps({columns}),
  })

