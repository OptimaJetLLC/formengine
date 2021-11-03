import {observer} from "mobx-react";
import React, {useState} from "react";
import {store} from "../../stores/Store";
import {mapper} from "../../views";
import _ from "lodash";
import {Nav} from "rsuite";

const PropertiesEditor = () => {
    const [activeTab, setActiveTab] = useState('main');
    const currentModel = store.currentNode?.data

    if (!currentModel) return null

    const annotations = mapper[currentModel.type].annotations

    let a = _.values(annotations).map(value => value.render())

    return (
        <>
            <Nav appearance="subtle" activeKey={activeTab} onSelect={setActiveTab}
                 style={{width: 150, marginBottom: 10}}>
                <Nav.Item eventKey={"main"} children={"Main"}/>
                <Nav.Item eventKey={"design"} children={"Design"}/>
                <Nav.Item eventKey={"other"} children={"Other"}/>
            </Nav>
            <div>
                {a}
            </div>
        </>
    )
};

export default observer(PropertiesEditor)