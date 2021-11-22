import {FaIcon} from "./Icons";
import React from "react";
import styled from "@emotion/styled";
import {Nav} from "rsuite";
import {LabeledIcon} from "./Labels";

export const NavIconItem = (label: string, icon?: any, props?: any) => {
    return <ColoredNavItem eventKey={label} color={props?.color}>
        <LabeledIcon>
            {icon && <FaIcon icon={icon} {...{size: 1.2, ...props, color: undefined}}/>}
            <label>{label}</label>
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