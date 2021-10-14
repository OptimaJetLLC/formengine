import {action,  computed, makeObservable, observable, toJS} from "mobx";
import {ComponentStore} from "./ComponentStore";
import {Node} from "../utils/Node";
import _ from "lodash";
import {doNeatly} from "../components/Component";


class Store {
    currentNode: Node | null = null
    isDragging?: boolean
    isResizing?: boolean
    isMoving?: boolean

    form = {
        //name?
        components: new Array<ComponentStore>()
    }

    get tree(): Node {
        let root = new Node()
        root.children = this.form.components.map(child => new Node(child));
        return root
    }

    constructor() {
        makeObservable(this, {
            currentNode: observable.ref,
            isDragging: observable.ref,
            form: observable,
            tree: computed,
            clear: action.bound,
            add: action.bound,
        })
    }

    clear() {
        this.form.components = [];
    }

    stringifyForm() {
        let clone = _.cloneDeep(toJS(this.form))
        clone.components.forEach(doNeatly)

        return JSON.stringify(clone, removeReactChildren, 2)

        function removeReactChildren(key: any, value: any) {
            if (key === "children" && value?.[0] && value[0].$$typeof === Symbol.for('react.element')) {
                return undefined
            }

            return value;
        }
    }

    //TODO Fix it
    parseForm(text: string) {
        this.form = JSON.parse(text);
    }

    add(type: string) {
        console.log(type)
        //console.log(Control[Control[type]])
        //let modelType = this.ModelType[type as any];
        //let key = (Math.random() + 1).toString(36).substring(7);
        //let model = new modelType(key)
        //this.models.push(model)
    }

    move(sourceKey: string, targetKey: string, index: number = 0 ) {
        const sourceNode = treeSearch(this.tree.children, sourceKey);
        const targetNode = treeSearch(this.tree.children, targetKey);
        if (!sourceNode?.data || !targetNode?.data) return;

        const targetParent = targetNode.parent?.data?.children || this.form.components;
        const sourceParent = sourceNode.parent?.data?.children || this.form.components;
        const targetIndex = targetParent?.indexOf(targetNode?.data);
        const sourceIndex = sourceParent?.indexOf(sourceNode?.data);
        if (targetParent == sourceParent) {
            moveArrayElement(targetParent, sourceIndex, targetIndex - 1 + index);
        }
        else {
            targetParent?.splice(targetIndex + index, 0, sourceNode.data);
            sourceParent?.splice(sourceIndex, 1);
        }
    }
}

const treeSearch: (data?: Node[], key?: string, found?: {node?: Node}) => Node | undefined = (data, key, found = {}) => {
    if (key && data) {
        data.find((node: Node) => {
            if (node.key == key) {
                found.node = node;
                return node;
            }
            if (node.children) return treeSearch(node.children, key, found);
        });
        return found.node;
    }
    return found.node;
};

const moveArrayElement = (arr: any[], fromIndex: number, toIndex: number) =>  {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

export const store = new Store()
