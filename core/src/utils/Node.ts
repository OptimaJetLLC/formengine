import _ from "lodash";
import {ComponentStore} from "../stores/ComponentStore";
import {ComponentDefinition} from "../api/Types";
import {mapper} from "../views";
import {computed} from "mobx";
import {getAllNodes} from "../stores/Store";

export class Node {
    key: string
    /** Don't exists only for virtual root in tree */
    parent?: Node
    children?: Node[]
    /** Don't exists only for virtual root in tree*/
    data?: ComponentStore
    definition?: ComponentDefinition<any>

    get isRoot() {
        return _.isEmpty(this.data);
    }

    constructor(data?: ComponentStore, parent?: Node) {
        this.key = data?.key ?? "";
        this.parent = parent;

        this.data = data
        this.definition = mapper[this.data?.type ?? ""]

        if (data?.children) {
            this.children = data.children.map(child => new Node(child, this));
        }
    }
}

