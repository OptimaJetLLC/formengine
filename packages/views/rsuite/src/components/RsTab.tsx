import {boolean, define, node, string, useComponentData} from 'fb-core'
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

const RsTab = (props: RsTabProps) => {
  const {componentStore} = useComponentData()

  //TODO доделаю в рамках задачи об аннотациях
  useEffect(() => {
    if (!componentStore.props.items) {
      componentStore.props.items = ['Item1', 'Item2', 'Item3']
      componentStore.props.active = _.first(componentStore.props.items)
    }
  }, [])

  const setActive = useCallback((eventKey: string) => componentStore.props.active = eventKey, [])

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

export const rsTab = define(RsTab)
  .props({
    active: string,
    //items: reactElements.expandable(navItem, navDropdown)
    //onSelect: set("active")

    children: undefined//TODO node.setup({bindTo: 'active'}),
  })

export const rsNav = define(Nav)
  .props({
    children: node,
    activeKey: string,
    appearance: string,
  })

export const rsNavItem = define(Nav.Item)
  .named('NavItem')
  .props({
    active: boolean,
    disabled: boolean,
    eventKey: string,
    children: string,
    //onSelect:
    //as
  })

export const rsNavDropdown = define(Nav.Dropdown)
  .named('NavDropdown')
  .props({
    eventKey: string,
    children: string,
  })
