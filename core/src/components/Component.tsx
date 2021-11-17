import _ from "lodash";
import React, {useEffect} from "react";
import {mapper} from "../views";
import {observer} from "mobx-react";
import {ComponentDefinition} from "../api/Types";
import {ComponentStore} from "../stores/ComponentStore";
import {autorun} from "mobx";
import {TransformativeType} from "../utils/Types";
import {findNode} from "../utils/tree";

interface ComponentProps {
    componentStore: ComponentStore,
    wrapper?: Function
}

export const Component = observer(({componentStore, wrapper}: ComponentProps) => {
    const {props} = componentStore;
    const componentDefinition = mapper[componentStore.type];

    useEffect(() => initDefaultValue(componentStore, componentDefinition), [])

    //TODO
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

    props.children = props.children
        || componentStore.children?.map(child =>
            <Component key={child.key} componentStore={child} wrapper={wrapper}/>)

    const element = React.createElement(componentDefinition.view, props);

    return wrapper ? wrapper({componentStore, children: element}) : element;
});

function transformEvent(key: string, store: ComponentStore, definition: ComponentDefinition<any>) {
    let event = store.events[key]
    if (!event) return
    let actions = event.map(value => {
        let action = definition.actions?.find((val) => val.name === value.actionName)
        if (!action) return

        //TODO трансформировать непосредственно перед вызовом
        let args = _.transform(value.overArgs, (result, value, key) => {
            if (typeof value === "object" && value.type === TransformativeType.Foreign) {
                let node = findNode(value.key)
                if (node?.data?.props[value.prop])
                    result[key] = node?.data?.props[value.prop]
                return
            }

            result[key] = value
        }, {} as Record<string, any>)

        if (value.targetKey) {
            let node = findNode(value.targetKey);
            if (node) args.target = node?.data;
        }
        return _.bind(action.func as (...args: any[]) => any, null, args)
    })

    let func = function (...arg: any[]) {
        //TODO use object for arg (eventArgs)
        arg.push(store);
        actions.forEach(value => {
            value?.(arg)
        })
    }

    return func
}

function initDefaultValue(store: ComponentStore, definition: ComponentDefinition<any>) {

    _.forIn(definition.annotations, (value, key) => {
        if (value.isSystem) return

        if (value.isFunction)
            store.props[key] = transformEvent(key, store, definition)
        else
            store.props[key] = store.props[key] ?? value.defaultValue
    })
}

export function doNeatly(store: ComponentStore) {
    const definition = mapper[store.type];

    _.forIn(definition.annotations, (value, key) => {
        if (value.isSystem) return

        //TODO delete react element
        if (typeof value === "function" || store.props[key] === value.defaultValue) store.props[key] = undefined
    })

    if (store.children)
        store.children.map(doNeatly)
}
