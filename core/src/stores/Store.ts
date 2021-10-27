import {action, autorun, computed, makeObservable, observable, toJS} from "mobx";
import {ComponentStore} from "./ComponentStore";
import {Node} from "../utils/Node";
import _ from "lodash";
import {doNeatly} from "../components/Component";
import {Action, FullEvent, ArgDef, Args, WeakEvent, EventName, Modifiers} from "../utils/Types";
import {createTransformer} from "mobx-utils";

const eventTransformer = createTransformer((event: FullEvent): WeakEvent => ({
    targetKey: event.target?.key ?? null,
    actionName: event.action.name,
    args: event.args,
    modifiers: event.modifiers
}))

class Store {
    currentNode: Node | null = null
    isDragging?: boolean
    isResizing?: boolean
    isMoving?: boolean

    allEvents = new Map<ComponentStore, Record<EventName, FullEvent[]>>()

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
            allEvents: observable.deep,
            currentNode: observable.ref,
            isDragging: observable.ref,
            form: observable,
            tree: computed,
            clear: action.bound,
            add: action.bound,
        })

        autorun(() => {
            this.allEvents.forEach(toWeak)
        })


        function toWeak(value: Record<EventName, FullEvent[]>, key: ComponentStore) {
            let result = {} as Record<EventName, WeakEvent[]>

            _.forIn(value, (actions, eventName) => {
                result[eventName] = actions.map(eventTransformer)
            })

            key.events = result
        }
    }

    addEvent(action: Action, eventKey: string, args: Args, source: ComponentStore, target: ComponentStore, modifiers?: Modifiers) {
        //this.allEvents.push({action, name: eventName, args, source, target})
        let event = this.allEvents.get(source)
        if (!event) {
            event = {}
        }
        if (!event[eventKey]) event[eventKey] = []
        event[eventKey].push({action, args, target, modifiers})

        this.allEvents.set(source, event)
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
        //console.log(Control[Control[type]])
        //let modelType = this.ModelType[type as any];
        //let key = (Math.random() + 1).toString(36).substring(7);
        //let model = new modelType(key)
        //this.models.push(model)
    }

    move(sourceKey?: string, targetKey?: string, index: number = 0) {
        if (!sourceKey) return;
        if (!targetKey) return;

        const sourceNode = findNode(sourceKey);
        const targetNode = findNode(targetKey);
        if (!sourceNode?.data || !targetNode?.data) return;

        const targetParent = targetNode.parent?.data?.children || this.form.components;
        const sourceParent = sourceNode.parent?.data?.children || this.form.components;
        const targetIndex = targetParent?.indexOf(targetNode?.data);
        const sourceIndex = sourceParent?.indexOf(sourceNode?.data);
        if (targetParent == sourceParent) {
            moveArrayElement(targetParent, sourceIndex, targetIndex - 1 + index);
        } else {
            targetParent?.splice(targetIndex + index, 0, sourceNode.data);
            sourceParent?.splice(sourceIndex, 1);
        }
        treeMap(this.form.components, (node: ComponentStore) => {
            if (typeof node.props.children !== typeof "")
                delete node.props.children;
        })
    }
}

export const findNode = (key: string) => {
    return find(store.tree);

    function find(node: Node): Node | null {
        if (node.key == key) return node

        let childNode = node.children?.find(find)
        if (childNode) return childNode

        return null
    }
}

export const getAllNodes = () => {
    const nodes: Node[] = []
    getKey(store.tree)
    return nodes

    function getKey(node: Node) {
        if (node.key) nodes.push(node)

        if (node.children) node.children.map(getKey)
    }
}

export const getAllKeys = () => {
    const keys: string[] = []
    getKey(store.tree)
    return keys

    function getKey(node: Node) {
        if (node.key) keys.push(node.key)

        if (node.children) node.children.map(getKey)
    }
}

const treeMap = (data: ComponentStore[], callback: Function) => {
    data.forEach((node: ComponentStore) => {
        callback(node);
        if (node.children) treeMap(node.children, callback);
    });
};

const moveArrayElement = (arr: any[], fromIndex: number, toIndex: number) => {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

export const store = new Store()
