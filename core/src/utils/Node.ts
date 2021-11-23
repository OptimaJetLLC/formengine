import _ from "lodash";
import {ComponentStore} from "../stores/ComponentStore";
import {ComponentDefinition} from "../features/annotation/types";
import {mapper} from "../views";

export class Node {
    key: string
    /** Don't exists only for virtual root in tree */
    parent?: Node
    children?: Node[]
    data: ComponentStore
    definition: ComponentDefinition<any>

    get isRoot() {
        return _.isEmpty(this.key);
    }

    constructor(data: ComponentStore, parent?: Node) {
        this.key = data.key;
        this.parent = parent;

        this.data = data
        this.definition = mapper[this.data.type]

        this.children = data.children?.map(child => new Node(child, this));
    }
}