import {Nav as RNav} from "rsuite";
import {NavIconItem} from "../../../../components/UI/NavIconItem";
import * as faCircle from "@fortawesome/free-solid-svg-icons/faCircle";
import * as faPaintBrush from "@fortawesome/free-solid-svg-icons/faPaintBrush";
import * as faBolt from "@fortawesome/free-solid-svg-icons/faBolt";
import * as faSpellCheck from "@fortawesome/free-solid-svg-icons/faSpellCheck";
import React from "react";
import {Section} from "../Section";
import {observer} from "mobx-react";

interface NavProps {
    activeTab: Section,
    setActiveTab: (activeTab: Section) => void
}

export const NavTab = observer(({activeTab, setActiveTab}: NavProps) => {
    return <RNav appearance="subtle" activeKey={activeTab} onSelect={setActiveTab}
                 style={{marginBottom: 10}}>
        {NavIconItem(Section.Main, faCircle, {color: "var(--rs-navs-selected)"})}
        {NavIconItem(Section.Style, faPaintBrush, {color: "#f67f1f"})}
        {NavIconItem(Section.Actions, faBolt, {color: "blueviolet"})}
        {NavIconItem(Section.Validation, faSpellCheck, {color: "green"})}
    </RNav>
})