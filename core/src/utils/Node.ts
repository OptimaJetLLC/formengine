import _ from "lodash";
import {ComponentStore} from "../stores/ComponentStore";

export class Node {
    key: string
    parent?: Node
    children?: Node[]
    item?: ComponentStore

    get isRoot() {
        return _.isEmpty(this.item);
    }

    constructor(item?: ComponentStore, parent?: Node) {
        this.key = item?.key ?? "";
        this.parent = parent;

        if (item) this.item = item

        if (item?.children) {
            this.children = item.children.map(child => new Node(child, this));
        }
    }
}

