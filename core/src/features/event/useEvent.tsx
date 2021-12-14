import {ComponentStore} from "../../stores/ComponentStore";
import {ComponentDefinition} from "../annotation/types";
import {useContext, useEffect} from "react";
import {autorun} from "mobx";
import _ from "lodash";
import {transformEvent} from "./transformEvent";
import {useLocalObservable} from "mobx-react";
import {useStore} from "../../utils/StoreContext";

//TODO Optimize?
export function useEvent(componentStore: ComponentStore, componentDefinition: ComponentDefinition<any>) {
    const store = useStore()
    const eventToActionsMap = useLocalObservable<Record<string, any[]>>(() => ({}))

    useEffect(() => {
        let disposer = autorun(() => {
            let events = componentStore.events

            if (_.isEmpty(events)) return

            _.forIn(events, (value, key) => {
                const [handle, actions] = transformEvent(store, key, componentStore, componentDefinition)
                componentStore.props[key] = handle
                eventToActionsMap[key] = actions
            })
        })

        return () => disposer();
    }, []);

    return eventToActionsMap
}