import _ from "lodash";
import {action, autorun, computed, makeObservable, observable, toJS} from "mobx";
import {ComponentStore} from "../ComponentStore";
import {Node} from "../../utils/Node";
import {Action, EventName, FullActionDefinition, Modifiers, OverArgs} from "../../utils/Types";
import {toWeakEvent} from "./utils/toWeakEvent";
import {mapper} from "../../views";
import {moveArrayItem} from "../../utils/moveArrayItem";
import {findNode, treeMap} from "../../utils/tree";
import {removeEventAndDefaultValue} from "./utils/removeEventAndDefaultValue";
import {FormikContextType} from "formik";


class Store {
    currentNode: Node | null = null
    isDragging: boolean = false
    draggingOverKey?: string
    isResizing?: boolean
    isMoving?: boolean
    isBuilderMode: boolean = true
    showRightPanel: boolean = true
    showLeftPanel: boolean = true
    styles?: any
    formContext?: FormikContextType<any>

    allEvents = new Map<ComponentStore, Record<EventName, FullActionDefinition[]>>()

    model = {
        //name?
        //common style?
        components: new Array<ComponentStore>()
    }

    get tree(): Node {
        let store = new ComponentStore("")
        let root = new Node(store)
        store.children = this.model.components
        root.children = this.model.components.map(child => new Node(child, root));
        return root
    }

    constructor() {
        makeObservable(this, {
            allEvents: observable.deep,
            currentNode: observable.ref,
            formContext: observable.ref,
            isDragging: observable.ref,
            isBuilderMode: observable.ref,
            showRightPanel: observable.ref,
            showLeftPanel: observable.ref,
            draggingOverKey: observable.ref,
            model: observable,
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
        this.cleanReactChildren();
    }

    addEvent(
        eventKey: string, action: Action | null, args: OverArgs,
        source: ComponentStore, target: ComponentStore | null,
        modifiers?: Modifiers) {

        let event = this.allEvents.get(source) ?? {}

        if (!event[eventKey]) event[eventKey] = [];
        event[eventKey].push({action, overArgs: args, target, modifiers})

        this.allEvents.set(source, event)
    }

    clear() {
        this.model.components = [];
    }

    stringifyForm() {
        let clone = _.cloneDeep(toJS(this.model))
        clone.components.forEach(removeEventAndDefaultValue)

        return JSON.stringify(clone, removeRedundantProps, 2)

        function removeRedundantProps(key: any, value: any) {
            if (key === "children" && value?.[0] && value[0].$$typeof === Symbol.for('react.element')) {
                return undefined
            }

            if (key === "style") {
                return undefined
            }


            return value;
        }
    }

    //TODO post processing
    parseForm(text: string) {
        this.model = JSON.parse(text);
    }

    remove(targetKey: string) {
        const targetNode = findNode(targetKey);
        if (!targetNode) return;

        const targetParent = targetNode.parent?.data?.children;
        const targetIndex = targetParent?.indexOf(targetNode.data);

        if (_.isUndefined(targetIndex)) return;
        targetNode.parent?.data?.children?.splice(targetIndex, 1);
        this.cleanReactChildren();
    }

    add(name: string, targetKey: string, index: number = 0, combine?: boolean) {
        const componentDefinition = mapper[name];
        if (!componentDefinition) return
        const key = this._generateKey(name);
        const component = new ComponentStore(key, componentDefinition);
        this.model.components.push(component);
        this.move(key, targetKey, index, combine);
    }

    clone(sourceKey: string) {
        const sourceNode = findNode(sourceKey);
        if (!sourceNode) return;

        const clonedComponent = _.cloneDeep(sourceNode.data);
        clonedComponent.key = this._generateKey(sourceNode.definition.name);
        treeMap(clonedComponent?.children, (componentStore: ComponentStore) => {
            componentStore.key = this._generateKey(componentStore.type);
        })

        this.model.components.push(clonedComponent);
        this.move(clonedComponent.key, sourceKey, 1);
        this.cleanReactChildren();
    }

    cleanReactChildren() {
        treeMap(this.model.components, (componentStore: ComponentStore) => {
            if (typeof componentStore.props.children !== typeof "")
                delete componentStore.props.children;
        })
    }

    move(sourceKey: string, targetKey: string, index: number = 0, combine?: boolean) {
        const sourceNode = findNode(sourceKey);
        const targetNode = findNode(targetKey);

        if (!sourceNode || !targetNode?.key?.length) return;

        const sourceParent = sourceNode.parent?.data.children!;
        const targetData = combine
            ? targetNode.data!
            : targetNode.parent?.data!;

        if (!targetData.children) targetData.children = [];
        const targetParent = targetData.children;

        const sourceIndex = sourceParent.indexOf(sourceNode.data);
        const targetIndex = targetParent?.indexOf(targetNode.data);

        if (targetParent === sourceParent) {
            moveArrayItem(targetParent, sourceIndex, targetIndex + index);
        } else {
            const [removed] = sourceParent.splice(sourceIndex, 1)
            targetParent.splice(targetIndex + index, 0, removed);
        }
        this.cleanReactChildren();
    }

    private _generateKey(name: string) {
        return name + (Math.random() + 1).toString(36).substring(7);
    }
}

export {Store}
