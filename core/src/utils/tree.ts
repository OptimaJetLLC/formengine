import {store} from "../stores/Store";
import {Node} from "./Node";
import {ComponentStore} from "../stores/ComponentStore";

export const findNode = (key?: string) => {
    return find(store.tree)

    function find(node: Node): Node | null {
        if (node.key === key) return node

        if (!node.children) return null

        for (let child of node.children) {
            let childNode = find(child)
            if (childNode) return childNode
        }

        return null
    }
}

export const getAllKeys = () => {
    const keys: string[] = []
    getKey(store.tree)
    return keys

    function getKey(node: Node) {
        if (node.key) keys.push(node.key)

        if (node.children) node.children.map(getKey)
    }
}

export const getAllNodes = () => {
    const nodes: Node[] = []
    getKey(store.tree)
    return nodes

    function getKey(node: Node) {
        if (node.key) nodes.push(node)

        if (node.children) node.children.map(getKey)
    }
}

export const treeMap = (data?: ComponentStore[], callback?: Function) => {
    data?.forEach((node: ComponentStore) => {
        callback?.(node);
        if (node.children) treeMap(node.children, callback);
    });
};