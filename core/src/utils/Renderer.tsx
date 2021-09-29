import React from "react";
import {observer} from "mobx-react-lite";
import {store} from "../stores/Store";
import ComponentDefinition from "./constants";
import {components, mapper} from "../views";
import _ from "lodash";
import {ComponentStore} from "../stores/ComponentStore";
import {autorun, computed, makeObservable, observable} from "mobx";
import {ItemDataType} from "rsuite/esm/@types/common";

export class Renderer {
    root: Node = new Node();

    render(): JSX.Element[] {

        return store.models.map(store => {
            let definition = mapper[store.type]

            let component = hoc(definition.view)

            const ObservableComponent = observer(component);

            return <ObservableComponent key={store.key} {...store.props} />
        })
    }

    find(key: string): Node | null {
        return Renderer.find(key, this.root);
    }

    private static find(key: string, node: Node): Node | null {
        if (node.key == key) return node

        if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                let item = this.find(key, node.children[i])

                if (item) return item
            }
        }

        return null
    }

    //TODO remove any and set clear description and logic
    /*reduce<U>(
        callback: (temp: U, accumulator: accumulator<any>, node: Node, depthLevel: number, rootNode: Node) => U,
        initialValue?: U): U {
        let accumulator: accumulator<any> = {};
        let result;
        return Tree.reduce(result, accumulator, this.root, 0, this.root, callback, initialValue);
        //
    }

    private static reduce<U>(
        result: U | undefined, accumulator: accumulator<any>, node: Node, depthLevel: number, root: Node,
        callback: (temp: any, accumulator: any, node: Node, depthLevel: number, rootNode: Node) => U,
        initialValue?: U): U {


        /!*if (initialValue)
            accumulator = callback(initialValue, node, 0, 0, root);*!/


        result = callback(result, accumulator, node, depthLevel, root);

        if (node.children) {
            let currentDepth = depthLevel + 1
            for (let i = 0; i < node.children.length; i++) {
                result = Tree.reduce(result, accumulator, node.children[i], currentDepth, root, callback, initialValue)
            }
        }

        if (!result) throw TypeError()

        return result;
    }*/
}

export class Node implements ItemDataType {
    key: string
    parent?: Node
    children?: Node[]
    data?: ComponentStore
    constructor(data?: ComponentStore, parent?: Node) {
        this.key = data?.key ?? "";

        if (data) {
            this.data = data
        }

        this.parent = parent;

        if (data?.children) {
            this.children = data.children.map(child => new Node(child, this));
        }
    }

    get isRoot(): boolean {
        return _.isNull(this.key);
    }
}

export function hoc<T extends object>(WrappedComponent: React.ComponentType<T>) {
    const ComponentWithTheme = (props: T) => <WrappedComponent {...props} />;

    return ComponentWithTheme;
}
