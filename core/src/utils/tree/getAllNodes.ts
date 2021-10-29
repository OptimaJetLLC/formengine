import {Node} from "../Node";
import {store} from "../../stores/Store";

export const getAllNodes = () => {
    const nodes: Node[] = []
    getKey(store.tree)
    return nodes

    function getKey(node: Node) {
        if (node.key) nodes.push(node)

        if (node.children) node.children.map(getKey)
    }
}