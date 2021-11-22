import _ from "lodash";
import React, {useEffect} from "react";
import {mapper} from "../views";
import {observer} from "mobx-react";
import {ComponentDefinition} from "../api/types";
import {ComponentStore} from "../stores/ComponentStore";
import {transformEvent} from "../features/event/transformEvent";
import {useEvent} from "../features/event/useEvent";
import {useStyle} from "../features/style/useStyle";

interface ComponentProps {
    componentStore: ComponentStore,
    wrapper?: Function
}

export const Component = observer(({componentStore, wrapper}: ComponentProps) => {
    const {props} = componentStore;
    const componentDefinition = mapper[componentStore.type];

    useEffect(() => initDefaultValue(componentStore, componentDefinition), [])

    useEvent(componentStore, componentDefinition);
    useStyle(componentStore);

    props.children = props.children
        || componentStore.children?.map(child =>
            <Component key={child.key} componentStore={child} wrapper={wrapper}/>)

    const element = React.createElement(componentDefinition.view, props);

    return wrapper ? wrapper({componentStore, children: element}) : element;
});

function initDefaultValue(store: ComponentStore, definition: ComponentDefinition<any>) {

    _.forIn(definition.annotations, (value, key) => {
        if (value.isSystem) return

        if (value.isFunction)
            store.props[key] = transformEvent(key, store, definition)
        else
            store.props[key] = store.props[key] ?? value.defaultValue
    })
}

