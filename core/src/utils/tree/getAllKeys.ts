import {Node} from "../Node";
import {store} from "../../stores/Store";

export const getAllKeys = () => {
    const keys: string[] = []
    getKey(store.tree)
    return keys

    function getKey(node: Node) {
        if (node.key) keys.push(node.key)

        if (node.children) node.children.map(getKey)
    }
}