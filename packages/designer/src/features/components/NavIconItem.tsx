import styled from '@emotion/styled'
import {useMemo} from 'react'
import {Nav} from 'rsuite'
import {customizable} from '../customization'
import type {CustomizableKey} from '../customization/types'
import {FaIcon} from './Icons'

/**
 * The React component that displays a navigation element with an icon.
 * @param props the React component properties.
 * @param props.eventKey the tab key for navigation.
 * @param props.customizableKey the customization key.
 * @param props.title the tab title.
 * @param props.icon the tab icon.
 * @param props.props the props for the navigation.
 * @returns the React element.
 */
export const CustomizableTab = ({eventKey, customizableKey, title, icon, props}: {
  eventKey: string,
  customizableKey: CustomizableKey,
  title?: string,
  icon?: any,
  props?: any
}) => {
  const NavItem = useMemo(() => customizable(customizableKey, SNavItem), [customizableKey])

  return <NavItem
    eventKey={eventKey}
    color={props?.color}
    role="tab"
    as="button"
    type="button"
    {...props}
  >
    {icon && <FaIcon icon={icon} {...{size: 1.2, ...props, color: undefined}} tabIndex={-1}/>}
    <span>{title}</span>
  </NavItem>
}

const SNavItem = styled(Nav.Item)`
  display: flex;
  flex-direction: column;
  align-items: center;
  appearance: none;
  outline: none;
  border: none;
  background-color: transparent;
  border-radius: 15px;

  svg, span {
    margin-bottom: 4px;
  }

  svg:focus {
    outline: none;
  }

  &:hover, &:active, &:focus, &.rs-nav-item-active {
    color: ${(props: any) => props.color} !important;
  }

  &:before {
    margin: 0 12px;
    background-color: ${(props: any) => props.color} !important;
  }
`

export const SNav = styled(Nav)`
  margin-bottom: 0.75em;
  display: flex;
  justify-content: center;
`
