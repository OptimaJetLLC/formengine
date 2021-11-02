import _ from "lodash";
import {action, autorun, computed, makeObservable, observable, toJS} from "mobx";
import {ComponentStore} from "../ComponentStore";
import {Node} from "../../utils/Node";
import {doNeatly} from "../../components/Component";
import {Action, EventName, FullActionDefinition, Modifiers, OverArgs} from "../../utils/Types";
import {toWeakEvent} from "./utils/toWeakEvent";
import {mapper} from "../../views";
import {moveArrayItem} from "../../utils/moveArrayItem";
import {findNode, treeMap} from "../../utils/tree";


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
        let store = new ComponentStore("")
        let root = new Node(store)
        store.children = this.mould.components
        root.children = this.mould.components.map(child => new Node(child, root));
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

    add(name: string, targetKey: string, index: number = 0) {
        const componentDefinition = mapper[name];
        if (!componentDefinition) return
        const key = name + (Math.random() + 1).toString(36).substring(7);
        const component = new ComponentStore(key, componentDefinition);
        this.mould.components.push(component);
        this.move(key, targetKey, index);
    }

    cleanReactChildrens() {
        console.log(toJS(this.mould.components))
        treeMap(this.mould.components, (componentStore: ComponentStore) => {
            if (typeof componentStore.props.children !== typeof "")
                delete componentStore.props.children;
        })
    }

    move(sourceKey: string, targetKey: string, index: number = 0) {
        const sourceNode = findNode(sourceKey);
        const targetNode = findNode(targetKey);

        if (!sourceNode || !targetNode) return;

        const sourceParent = sourceNode.parent?.data.children!;
        const targetParent = targetNode.parent?.data.children!;

        const sourceIndex = sourceParent.indexOf(sourceNode.data);
        const targetIndex = targetParent.indexOf(targetNode.data);

        if (targetParent == sourceParent) {
            moveArrayItem(targetParent, sourceIndex, targetIndex + index);
        } else {
            const [removed] = sourceParent.splice(sourceIndex, 1)
            targetParent.splice(targetIndex + index, 0, removed);
        }
        this.cleanReactChildrens();
    }
}

export {Store}
