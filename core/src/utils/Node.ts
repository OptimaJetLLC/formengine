import _ from "lodash";
import {ComponentStore} from "../stores/ComponentStore";

export class Node {
    key: string
    /** Don't exists only for virtual root in tree */
    parent?: Node
    children?: Node[]
    /** Don't exists only for virtual root in tree*/
    data?: ComponentStore

    get isRoot() {
        return _.isEmpty(this.data);
    }

    constructor(item?: ComponentStore, parent?: Node) {
        this.key = item?.key ?? "";
        this.parent = parent;

        if (item) this.data = item

        if (item?.children) {
            this.children = item.children.map(child => new Node(child, this));
        }
    }
}

