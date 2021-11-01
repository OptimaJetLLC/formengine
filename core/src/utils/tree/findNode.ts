import {Node} from "../Node";
import {store} from "../../stores/Store";

export const findNode = (key: string) => {
    return find(store.tree);

    function find(node: Node): Node | null {
        if (node.key == key) return node

        let childNode = node.children?.find(find)
        if (childNode) return childNode

        return null
    }
}