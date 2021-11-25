import {ComponentStore} from "../../stores/ComponentStore";
import {ComponentDefinition} from "../annotation/types";
import {useEffect} from "react";
import {autorun} from "mobx";
import _ from "lodash";
import {transformEvent} from "./transformEvent";
import {useLocalObservable} from "mobx-react";

//TODO Optimize?
export function useEvent(componentStore: ComponentStore, componentDefinition: ComponentDefinition<any>) {
    const eventToActionsMap = useLocalObservable<Record<string, any[]>>(() => ({}))

    useEffect(() => {
        let disposer = autorun(() => {
            let events = componentStore.events

            if (_.isEmpty(events)) return

            _.forIn(events, (value, key) => {
                const [handle, actions] = transformEvent(key, componentStore, componentDefinition)
                componentStore.props[key] = handle
                eventToActionsMap[key] = actions
            })
        })

        return () => disposer();
    }, []);

    return eventToActionsMap
}