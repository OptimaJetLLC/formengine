import cx from 'clsx'
import {useMemo} from 'react'
import {Nav} from 'rsuite'
import type {NavProps} from 'rsuite/esm/Nav/Nav'
import type {NavItemProps} from 'rsuite/esm/Nav/NavItem'
import {customizable} from '../customization/customizable'
import type {CustomizableKey} from '../customization/types'
import {FaIcon} from './Icons'
import styles from './NavIconItem.module.css'

const SNavItem = ({color, className, style, ...props}: NavItemProps) => {
  return (
    <Nav.Item
      {...props}
      className={cx(styles.navItem, className)}
    />
  )
}

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

  return (
    <NavItem
      eventKey={eventKey}
      role="tab"
      as="button"
      type="button"
      data-testid={customizableKey}
      {...props}
    >
      {icon && <FaIcon icon={icon} {...{size: 1.2, ...props, color: undefined}} tabIndex={-1}/>}
      <span>{title}</span>
    </NavItem>
  )
}

/**
 * Styled Nav component.
 * @param props {@link NavProps}
 * @param props.className css class name.
 * @returns React component.
 */
export const SNav = ({className, ...props}: NavProps) => (
  <Nav {...props} className={cx(styles.nav, className)}/>
)
