import {Nav as RNav} from "rsuite";
import {NavIconItem} from "./NavIconItem";
import * as faCircle from "@fortawesome/free-solid-svg-icons/faCircle";
import * as faPaintBrush from "@fortawesome/free-solid-svg-icons/faPaintBrush";
import * as faBolt from "@fortawesome/free-solid-svg-icons/faBolt";
import * as faSpellCheck from "@fortawesome/free-solid-svg-icons/faSpellCheck";
import React from "react";
import {Section} from "../Section";
import {store} from "../../../../stores/Store";
import {observer} from "mobx-react";

interface NavProps {
    activeTab: Section,
    setActiveTab: (activeTab: Section) => void
}

export const NavTab = observer(({activeTab, setActiveTab}: NavProps) => {
    if (!store.currentNode) return null

    return <RNav appearance="subtle" activeKey={activeTab} onSelect={setActiveTab}>
        {NavIconItem(Section.Main, faCircle, {color: "var(--rs-navs-selected)"})}
        {NavIconItem(Section.Style, faPaintBrush, {color: "#f67f1f"})}
        {NavIconItem(Section.Actions, faBolt, {color: "blueviolet"})}
        {NavIconItem(Section.Validate, faSpellCheck, {color: "green"})}
    </RNav>
})