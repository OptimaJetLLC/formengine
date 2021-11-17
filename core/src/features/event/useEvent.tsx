import {ComponentStore} from "../../stores/ComponentStore";
import {ComponentDefinition} from "../../api/types";
import {useEffect} from "react";
import {autorun} from "mobx";
import _ from "lodash";
import {transformEvent} from "./transformEvent";

//TODO Optimize?
export function useEvent(componentStore: ComponentStore, componentDefinition: ComponentDefinition<any>) {
    useEffect(() => {
        let disposer = autorun(() => {
            let events = componentStore.events
            if (_.isEmpty(events)) return
            _.forIn(events, (value, key) => {
                componentStore.props[key] = transformEvent(key, componentStore, componentDefinition)
            })
        })

        return () => disposer();
    }, []);
}