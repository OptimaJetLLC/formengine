import {useStore} from "../../../../utils/contexts/StoreContext";
import _ from "lodash";
import {Node} from "../../../../utils/Node";

export const useGroups = () => {
    const store = useStore()
    const nodes = store.getAllNodes().filter(node => !_.isEmpty(node.definition?.actions))
    return nodes.reduce((groups: Record<string, Node[]>, node: Node) => {
        const group: Node[] = (groups[node.definition.name] || []);
        group.push(node);
        groups[node.definition.name] = group;
        return groups;
    }, {})
}