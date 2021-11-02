import {Node} from "../Node";
import {store} from "../../stores/Store";

export const findNode = (key: string) => {
    return find(store.tree)

    function find(node: Node): Node | null {
        if (node.key == key) return node

        if (!node.children) return null

        for (let child of node.children) {
            let childNode = find(child)
            if (childNode) return childNode
        }

        return null
    }
}