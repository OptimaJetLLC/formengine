import {boolean, define, event, node, oneOf, string, useComponentData} from 'fb-core'
import _ from 'lodash/fp'
import {ReactNode, useCallback, useEffect} from 'react'
import {Nav} from 'rsuite'

interface RsTabProps {
  active?: string,
  onSelect?: Function
  items?: string[] //TODO поддержку ReactNode {key: string, label: ReactNode}?
  children: ReactNode
}

type RsItem = {
  key: string
  label: ReactNode
  type: string //"Dropdown"
}

const RsNav = (props: RsTabProps) => {
  const {componentStore} = useComponentData()

  //TODO доделаю в рамках задачи об аннотациях
  useEffect(() => {
    if (!componentStore.props.items) {
      componentStore.props.items = {value: ['Item1', 'Item2', 'Item3']}
      componentStore.props.active = {value: _.first(componentStore.props.items.value)}
    }
  }, [])

  const setActive = useCallback((eventKey: string) => componentStore.props.active = {value: eventKey}, [])

  return (
    <>
      <Nav activeKey={props.active} onSelect={setActive}>
        {props.items?.map((value, index) =>
          <Nav.Item key={value} eventKey={value}> {value} </Nav.Item>
        )}
      </Nav>
      <div>
        {props.children}
      </div>
    </>
  )
}

export const rsTab = define(RsNav)
  .props({
    active: string,
    //items: reactElements.expandable(navItem, navDropdown)
    //onSelect: set("active")

    children: undefined//TODO node.setup({bindTo: 'active'}),
  })

export const rsNav = define(Nav)
  .typed('RsNav')
  .props({
    activeKey: string.hinted('Active key, corresponding to eventKey in <Nav.item>'),
    appearance: oneOf('default', 'tabs', 'subtle')
      .default('default')
      .hinted('A navigation can have different appearances'),
    children: node,
    justified: boolean.hinted('Justified navigation'),
    // todo onSelect 	(eventKey: string, event) => void 	Callback function triggered after selection
    pullRight: boolean.hinted('Appears on the right'),
    reversed: boolean.hinted('Reverse Direction of tabs/subtle'),
    vertical: boolean.hinted('Stacked navigation')
  })

const RsNavItemPreview = () => <Nav><Nav.Item>NavItem</Nav.Item></Nav>

export const rsNavItem = define(Nav.Item)
  .typed('RsNavItem')
  .props({
    active: boolean.hinted('Activation status'),
    // todo as ElementType ('a') 	You can use a custom element type for this component.
    children: string.default('NavItem').hinted('The contents of the component'),
    disabled: boolean.hinted('Disabled status'),
    divider: boolean.hinted('Divider for nav item'),
    eventKey: string.hinted('The value of the current option'),
    href: string.hinted('Providing a `href` will render an `<a>` element'),
    // todo icon Element<typeof Icon> 	Sets the icon for the component
    onSelect: event.hinted('Select the callback function that the event triggers'),
    panel: boolean.hinted('Display panel')
  })
  .preview(<RsNavItemPreview/>)

export const rsNavMenu = define(Nav.Menu)
  .named('NavMenu')
  .props({
    eventKey: string,
    children: string,
  })
