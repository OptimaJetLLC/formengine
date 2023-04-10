import styled from '@emotion/styled'
import {Nav} from 'rsuite'
import {FaIcon} from './Icons'
import {LabeledIcon} from './LabeledIcon'

export const NavIconItem = (key: string, title?: string, icon?: any, props?: any) => {

  return <ColoredNavItem eventKey={key} color={props?.color}>
    <LabeledIcon>
      {icon && <FaIcon icon={icon} {...{size: 1.2, ...props, color: undefined}}/>}
      <label>{title}</label>
    </LabeledIcon>
  </ColoredNavItem>
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
