import {ComponentStore} from "../../stores/ComponentStore";
import {ComponentDefinition} from "../annotation/types";
import {useEffect} from "react";
import {autorun} from "mobx";
import _ from "lodash";
import {transformEvent} from "./transformEvent";
import {useLocalObservable} from "mobx-react";
import {useStore} from "../../utils/contexts/StoreContext";
import {useComponentData} from "../../utils/contexts/ComponenDataContext";

//TODO Optimize?
export function useEvent() {
    const store = useStore()
    const eventMap = useLocalObservable<Record<string, any>>(() => ({}))
    const eventActionMap = useLocalObservable<Record<string, any[]>>(() => ({}))
    const {componentStore, definition} = useComponentData()

    useEffect(() => {
        let disposer = autorun(() => {
            let events = componentStore.events

            if (_.isEmpty(events)) return

            _.forIn(events, (value, key) => {
                const [handle, actions] = transformEvent(store, key, componentStore, definition)
                eventMap[key] = handle
                eventActionMap[key] = actions
            })
        })

        return () => disposer();
    }, []);

    return [eventMap, eventActionMap]
}