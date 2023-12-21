import {array, define, useComponentData} from '@react-form-builder/core'
import type {NavProps} from 'rsuite'
import {Nav} from 'rsuite'
import {navProps} from '../commonProperties'
import {InputCell} from './components/InputCell'

type MenuItem = {
  href?: string
  title?: string
}

const makeItems = (data: string[]) => data.map(title => ({title, href: title}))

interface RsMenuProps extends NavProps {
  items?: MenuItem[]
}

const RsMenu = ({onSelect, items, ...props}: RsMenuProps) => {
  const componentData = useComponentData()
  if (!items?.length) return null

  const onNavSelect: NavProps['onSelect'] = (eventKey, event) => {
    componentData.userDefinedProps ??= {}
    componentData.userDefinedProps.activeKey = eventKey
    onSelect?.(eventKey, event)
  }

  return <Nav onSelect={onNavSelect} {...props}>
    {items.map(({title, href}, index) =>
      <Nav.Item key={index} href={href} eventKey={title} active={title === props.activeKey}>
        {title}
      </Nav.Item>)
    }
  </Nav>
}

const columns = [
  {name: 'title', input: InputCell},
  {name: 'href', title: 'Url', input: InputCell}
]

const {activeKey, ...props} = navProps

export const rsMenu = define(RsMenu, 'RsMenu')
  .name('Menu')
  .props({
    activeKey: activeKey.default('Home'),
    ...props,
    items: array
      .default(makeItems(['Home', 'News', 'Products']))
      .withEditorProps({columns}),
  })

