import {ComponentStore} from "../../stores/ComponentStore";

export const treeMap = (data: ComponentStore[], callback: Function) => {
    data.forEach((node: ComponentStore) => {
        callback(node);
        if (node.children) treeMap(node.children, callback);
    });
};