import {observer} from "mobx-react";
import React, {useState} from "react";
import {store} from "../../stores/Store";
import {mapper} from "../../views";
import _ from "lodash";
import {Nav} from "rsuite";
import {FaIcon} from "../../components/Icons";
import * as faBolt from '@fortawesome/free-solid-svg-icons/faBolt';
import * as faPaintBrush from '@fortawesome/free-solid-svg-icons/faPaintBrush';
import * as faCircle from '@fortawesome/free-solid-svg-icons/faCircle';
import * as faSpellCheck from '@fortawesome/free-solid-svg-icons/faSpellCheck';
import {Rows} from "../../components/GroupItems";
import styled from "@emotion/styled";

const PropertiesEditor = () => {
    const [activeTab, setActiveTab] = useState('Main');
    const currentModel = store.currentNode?.data

    if (!currentModel) return null

    const annotations = mapper[currentModel.type].annotations;

    let a = <Rows margin={2}>
        {
            _.values(annotations).map(annotation => {
                return annotation.section == activeTab
                    ? annotation.render()
                    : null;
            })
        }
    </Rows>

    return (
        <Rows style={{margin: 0}}>
            <Nav appearance="subtle" activeKey={activeTab} onSelect={setActiveTab}>
                {NavItemIcon("Main", faCircle, {color: "var(--rs-navs-selected)"})}
                {NavItemIcon("Style", faPaintBrush, {color: "#f67f1f"})}
                {NavItemIcon("Actions", faBolt, {color: "blueviolet"})}
                {NavItemIcon("Validate", faSpellCheck, {color: "green"})}
            </Nav>
            <div style={{flex: 1, overflowY: "auto", marginBottom: 10}}>
                {a}
            </div>
        </Rows>
    )
};

const NavItemIcon = (label: string, icon?: any, props?: any) => {
    return <ColoredNavItem eventKey={label} color={props?.color}>
        <LabeledIcon>
            {
                icon && <FaIcon icon={icon} {...{size: 1.2, ...props, color: undefined}}/>
            }
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

const LabeledIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & :first-child {
    margin-bottom: 2px;
  }

  & label {
      //color: ${(props: any) => props.color ?? "var(--rs-btn-default-text)"};
  }
`

export default observer(PropertiesEditor)