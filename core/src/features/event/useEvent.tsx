import {ComponentStore} from "../../stores/ComponentStore";
import {ComponentDefinition} from "../annotation/types";
import {useEffect} from "react";
import {autorun} from "mobx";
import _ from "lodash";
import {transformEvent} from "./transformEvent";
import {useLocalObservable} from "mobx-react";
import {useStore} from "../../utils/StoreContext";
import {useComponentData} from "../../utils/ComponenDataContext";

//TODO Optimize?
export function useEvent(componentDefinition: ComponentDefinition<any>) {
    const store = useStore()
    const eventMap = useLocalObservable<Record<string, any>>(() => ({}))
    const eventActionMap = useLocalObservable<Record<string, any[]>>(() => ({}))
    const {componentStore} = useComponentData()

    useEffect(() => {
        let disposer = autorun(() => {
            let events = componentStore.events

            if (_.isEmpty(events)) return

            _.forIn(events, (value, key) => {
                const [handle, actions] = transformEvent(store, key, componentStore, componentDefinition)
                eventMap[key] = handle
                eventActionMap[key] = actions
            })
        })

        return () => disposer();
    }, []);

    return [eventMap, eventActionMap]
}