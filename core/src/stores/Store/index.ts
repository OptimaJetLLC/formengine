import _ from "lodash";
import {action, autorun, computed, makeObservable, observable, toJS} from "mobx";
import {ComponentStore} from "../ComponentStore";
import {Node} from "../../utils/Node";
import {doNeatly} from "../../components/Component";
import {Action, EventName, FullActionDefinition, Modifiers, OverArgs} from "../../utils/Types";
import {toWeakEvent} from "./utils/toWeakEvent";
import {findNode} from "../../utils/tree/findNode";
import {treeMap} from "../../utils/tree/treeMap";
import {mapper} from "../../views";


class Store {
    currentNode: Node | null = null
    isDragging: boolean = false
    isResizing?: boolean
    isMoving?: boolean
    isBuilderMode: boolean = true

    allEvents = new Map<ComponentStore, Record<EventName, FullActionDefinition[]>>()

    mould = {
        //name?
        //common style?
        components: new Array<ComponentStore>()
    }

    get tree(): Node {
        let root = new Node()
        root.children = this.mould.components.map(child => new Node(child));
        return root
    }

    constructor() {
        makeObservable(this, {
            allEvents: observable.deep,
            currentNode: observable.ref,
            isDragging: observable.ref,
            isBuilderMode: observable.ref,
            mould: observable,
            tree: computed,
            clear: action.bound,
            add: action.bound,
        })

        autorun(() => {
            this.allEvents.forEach(toWeakEvent)
        })
    }

    toggleBuilderMode() {
        this.isBuilderMode = !this.isBuilderMode;
        this.cleanReactChildrens();
    }

    addEvent(eventKey: string, action: Action, args: OverArgs, source: ComponentStore, target: ComponentStore, modifiers?: Modifiers) {
        let event = this.allEvents.get(source) ?? {[eventKey]: []}

        event[eventKey].push({action, overArgs: args, target, modifiers})

        this.allEvents.set(source, event)
    }

    clear() {
        this.mould.components = [];
    }

    stringifyForm() {
        let clone = _.cloneDeep(toJS(this.mould))
        clone.components.forEach(doNeatly)

        return JSON.stringify(clone, removeReactChildren, 2)

        function removeReactChildren(key: any, value: any) {
            if (key === "children" && value?.[0] && value[0].$$typeof === Symbol.for('react.element')) {
                return undefined
            }

            return value;
        }
    }

    //TODO post processing
    parseForm(text: string) {
        this.mould = JSON.parse(text);
    }

    add(name: string, targetKey?: string, index: number = 0) {
        const componentDefinition = mapper[name];
        const key = name + (Math.random() + 1).toString(36).substring(7);
        const component = new ComponentStore(key, componentDefinition);
        this.mould.components.push(component);
        this.move(key, targetKey, index);
    }

    cleanReactChildrens() {
        treeMap(this.mould.components, (node: ComponentStore) => {
            if (typeof node.props.children !== typeof "")
                delete node.props.children;
        })
    }

    move(sourceKey?: string, targetKey?: string, index: number = 0) {
        if (!sourceKey) return;
        if (!targetKey) return;

        const sourceNode = findNode(sourceKey);
        const targetNode = findNode(targetKey);
        if (!sourceNode?.data || !targetNode?.data) return;

        const targetParent = targetNode.parent?.data?.children || this.mould.components;
        const sourceParent = sourceNode.parent?.data?.children || this.mould.components;
        const targetIndex = targetParent?.indexOf(targetNode?.data);
        const sourceIndex = sourceParent?.indexOf(sourceNode?.data);
        if (targetParent == sourceParent) {
            moveArrayElement(targetParent, sourceIndex, targetIndex + index);
        } else {
            targetParent?.splice(targetIndex + index, 0, sourceNode.data);
            sourceParent?.splice(sourceIndex, 1);
        }
        this.cleanReactChildrens();
    }
}

const moveArrayElement = (arr: any[], fromIndex: number, toIndex: number) => {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

export const store = new Store()
