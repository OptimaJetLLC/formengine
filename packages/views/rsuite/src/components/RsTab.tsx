import {array, boolean, define, event, node, oneOf, string, toLabeledValues, useComponentData} from 'form-builder/view'
import React, {ReactNode} from 'react'
import {Nav} from 'rsuite'

type RsItem = {
  label: string
  value: string
}

interface RsTabProps {
  activeKey?: string
  appearance?: 'default' | 'subtle' | 'tabs'
  onSelect?: Function
  items?: RsItem[]
  showNavigation?: boolean
  pane: ReactNode,
  justified?: boolean
  pullRight?: boolean
  reversed?: boolean
  vertical?: boolean
}

const RsTab = (props: RsTabProps) => {
  const {store} = useComponentData()

  if (!props.items?.length) return null

  const {pane, onSelect, showNavigation, ...otherProps} = props
  const onNavSelect = (eventKey: string, event: React.SyntheticEvent) => {
    store.props.activeKey = {value: eventKey}
    onSelect?.(eventKey, event)
  }

  const activeKey = props.activeKey ?? props.items?.[0].value
  const items = props.items.map((item, index) =>
    <Nav.Item key={index} eventKey={item.value} active={item.value === activeKey}>
      {item.label}
    </Nav.Item>)

  return <>
    {showNavigation === true && <Nav onSelect={onNavSelect} {...otherProps}>{items}</Nav>}
    <div>{pane}</div>
  </>
}

const RsNavItemPreview = () => <Nav><Nav.Item>NavItem</Nav.Item></Nav>

export const rsTab = define(RsTab)
  .props({
    activeKey: string.hinted('Active key, corresponding to one of items value').default('Item1'),
    appearance: oneOf('default', 'tabs', 'subtle')
      .default('default')
      .hinted('A navigation can have different appearances'),
    items: array.default(toLabeledValues(['Item1', 'Item2', 'Item3'])),
    pane: node.setup({bindConditionBuilder: props => `return parentProps.activeKey === '${props.activeKey?.value ?? props.activeKey}'`}),
    justified: boolean.hinted('Justified navigation'),
    onSelect: event,
    pullRight: boolean.hinted('Appears on the right'),
    reversed: boolean.hinted('Reverse Direction of tabs/subtle'),
    vertical: boolean.hinted('Stacked navigation'),
    showNavigation: boolean.hinted('Show or hide navigation').default(true),
  })
  .preview(<RsNavItemPreview/>)
