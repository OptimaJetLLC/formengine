import {observer} from "mobx-react";
import ActionItem from "./ActionItem";
import {useEffect, useState} from "react";
import {FullActionDefinition} from "../../../utils/Types";
import {autorun} from "mobx";
import {store} from "../../../stores/Store";
import {ComponentStore} from "../../../stores/ComponentStore";
import {Rows} from "../../../components/UI/Containers"

const ActionList = ({eventKey, componentStore} : {eventKey: string, componentStore: ComponentStore}) => {
    const [state, setState] = useState<undefined | FullActionDefinition[]>()

    useEffect(() => {
        autorun(() => {
            setState(store.allEvents.get(componentStore)?.[eventKey])
        })
    }, []);

    /*TODO Draggable List*/
    return <Rows margin={5}
        //style={{maxHeight: 500, overflowY: "auto"}}
    >{state?.map(data => <ActionItem key={data.action?.name} data={data}/>)}</Rows>
}

export default observer(ActionList)