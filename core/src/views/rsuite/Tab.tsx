import {define} from "../../features/annotation/define";
import {Nav} from "rsuite";
import {ReactNode, useCallback, useEffect, useState} from "react";
import {boolean, reactElements, string} from "../../features/annotation";
import {useComponentData} from "../../utils/ComponenDataContext";


interface TabProps {
    active?: string,
    onSelect?: Function
    items?: string[] //TODO поддержку ReactNode {key: string, label: ReactNode}?
    children: ReactNode
}

type Item = {
    key: string
    label: ReactNode
    type: string //"Dropdown"
}

const Tab = (props: TabProps) => {
    const {componentStore} = useComponentData()

    useEffect(() => {
        if (!componentStore.props.items)
            componentStore.props.items = ['Home', 'News', 'About']
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
    );
}

export const tab = define("Tab", Tab, {
    active: string,
    //items: reactElements.expandable(navItem, navDropdown)
    //onSelect: set("active")

    children: reactElements.with({bindTo: "active"}),
})

export const nav = define("Nav", Nav, {
    children: reactElements,
    activeKey: string,
    appearance: string,
})

export const navItem = define("NavItem", Nav.Item, {
    active: boolean,
    disabled: boolean,
    eventKey: string,
    children: string,
    //onSelect:
    //as
})

export const navDropdown = define("NavDropdown", Nav.Dropdown, {
    eventKey: string,
    children: string,
})