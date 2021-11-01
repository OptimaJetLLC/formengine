import {EventName, FullActionDefinition, WeakActionDefinition} from "../../../utils/Types";
import {ComponentStore} from "../../ComponentStore";
import _ from "lodash";
import {createTransformer} from "mobx-utils";

export const toWeakEvent = (value: Record<EventName, FullActionDefinition[]>, key: ComponentStore) => {
    let result = {} as Record<EventName, WeakActionDefinition[]>

    _.forIn(value, (actions, eventName) => {
        result[eventName] = actions.map(eventTransformer)
    })

    key.events = result
}

const eventTransformer = createTransformer((event: FullActionDefinition): WeakActionDefinition => ({
    targetKey: event.target?.key ?? null,
    actionName: event.action.name,
    overArgs: event.overArgs,
    modifiers: event.modifiers,
}));