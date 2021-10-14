import _ from "lodash";
import React, {useEffect} from "react";
import {mapper} from "../views";
import {observer} from "mobx-react";
import {Node} from "../utils/Node";
import {ComponentDefinition} from "../api/Types";
import {ComponentStore} from "../stores/ComponentStore";


export const Component = observer(({node, wrapper}: { node: Node, wrapper?: Function }) => {
    if (!node.data) return null

    const {props} = node.data;
    const componentDefinition = mapper[node.data.type];

    useEffect(() => initDefaultValue(node.data!, componentDefinition), [])

    //TODO start using feng shui principal? Now exists extra re-rendering. Look on dependence
    useEffect(() => {
        if (!node.children) return

        if (isDifferent(node.children, props.children))
            props.children = node.children.map(childNode =>
            <Component key={childNode.key} node={childNode} wrapper={wrapper}/>)

    }, [node.children])

    const element = React.createElement(componentDefinition.view, props);

    return wrapper ? wrapper({node, children: element}) : element;
});

function isDifferent(nodes: Node[], propsChildren: any) {
    if (nodes.length !== propsChildren?.length) return true

    for (let i = 0; i < nodes.length; i++)
        if (nodes[i].key !== propsChildren[i].key) return true

    return false
}

//Функция для инициализации значений по умолчанию

function initDefaultValue(store: ComponentStore, definition: ComponentDefinition<any>) {

    _.forIn(definition.annotations, (value, key) => {
        if (value.isSystem) return

        store.props[key] = store.props[key] ?? value.defaultValue
    })
}

export function doNeatly(store: ComponentStore) {
    const definition = mapper[store.type];

    _.forIn(definition.annotations, (value, key) => {
        if (value.isSystem) return

        //TODO delete react element
        if (store.props[key] === value.defaultValue) store.props[key] = undefined
    })

    if (store.children)
        store.children.map(doNeatly)
}
