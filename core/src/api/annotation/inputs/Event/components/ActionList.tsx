import {observer} from "mobx-react";
import {List} from "rsuite";
import ActionItem from "./ActionItem";
import {useEffect, useState} from "react";
import {FullActionDefinition} from "../../../../../utils/Types";
import {autorun, toJS} from "mobx";
import {store} from "../../../../../stores/Store";
import {ComponentStore} from "../../../../../stores/ComponentStore";

const ActionList = ({eventKey, componentStore} : {eventKey: string, componentStore: ComponentStore}) => {
    const [state, setState] = useState<undefined | FullActionDefinition[]>()

    useEffect(() => {
        autorun(() => {
            setState(store.allEvents.get(componentStore)?.[eventKey])
            console.log(toJS(store.allEvents.get(componentStore)?.[eventKey]))
        })
    }, [])

    /*TODO Draggable List*/
    return <List>
        {state?.map(data => <ActionItem key={data.action.name} data={data}/>)}
    </List>
}

export default observer(ActionList)