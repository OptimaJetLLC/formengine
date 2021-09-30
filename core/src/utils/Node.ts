import _ from "lodash";
import {ComponentStore} from "../stores/ComponentStore";
import {ItemDataType} from "rsuite/esm/@types/common";


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
        return _.isEmpty(this.key);
    }
}

