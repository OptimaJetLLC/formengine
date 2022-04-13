import {ComponentStore} from "../../../../../stores/ComponentStore";
import {NewActionData} from "../../../types";

function initEvent(componentStore: ComponentStore, eventKey: string) {
    componentStore.events ??= {}
    componentStore.events[eventKey] ??= []
}

function addActionToEvent(componentStore: ComponentStore, eventKey: string, {action, target}: NewActionData) {
    componentStore.events![eventKey].push({
        actionName: action.name,
        targetKey: target?.key,
    })
}

export {initEvent, addActionToEvent}