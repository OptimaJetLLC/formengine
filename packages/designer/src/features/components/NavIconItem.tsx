import styled from '@emotion/styled'
import {Nav} from 'rsuite'
import {customizable} from '../customization'
import type {CustomizableKey} from '../customization/types'
import {FaIcon} from './Icons'
import {LabeledIcon} from './LabeledIcon'

/**
 * The React component that displays a navigation element with an icon.
 * @param key the key of the navigation element.
 * @param customizableKey the customizable key of the component.
 * @param title the text of the navigation element.
 * @param icon the icon of the navigation element.
 * @param props the other properties of the component.
 * @returns the React Component.
 */
export const customizableTab = (key: string, customizableKey: CustomizableKey, title?: string, icon?: any, props?: any) => {
  const NavItem = customizable(customizableKey, ColoredNavItem)
  return <NavItem eventKey={key} color={props?.color}>
    <LabeledIcon>
      {icon && <FaIcon icon={icon} {...{size: 1.2, ...props, color: undefined}}/>}
      <label>{title}</label>
    </LabeledIcon>
  </NavItem>
}

const ColoredNavItem = styled(Nav.Item)`
  &:hover, &:active, &:focus, &.rs-nav-item-active {
    color: ${(props: any) => props.color} !important;
  }

  &:before {
    border-radius: 2px;
    height: 3px !important;
    margin: 0 12px;
    background-color: ${(props: any) => props.color} !important;
  }
`

export const SNav = styled(Nav)`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;

  .rs-nav-item {
    border-radius: 15px;
  }
`
