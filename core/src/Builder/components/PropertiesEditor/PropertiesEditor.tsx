import {observer} from "mobx-react";
import React, {useState} from "react";
import {NavTab} from "./components/NavTab";
import {Section} from "./Section";
import {Properties} from "./components/Properties";

const PropertiesEditor = () => {
    const [activeTab, setActiveTab] = useState(Section.Main);

    return <div>
        <NavTab activeTab={activeTab} setActiveTab={setActiveTab}/>
        <Properties activeTab={activeTab}/>
    </div>
};

export default observer(PropertiesEditor)