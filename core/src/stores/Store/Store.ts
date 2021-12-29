import _ from "lodash";
import {action, autorun, computed, makeObservable, observable, toJS} from "mobx";
import {ComponentStore} from "../ComponentStore";
import {Node} from "../../utils/Node";
import {Action, EventName, FullActionDefinition, Modifiers, OverArgs} from "../../utils/Types";
import {toWeakEvent} from "./utils/toWeakEvent";
import {moveArrayItem} from "../../utils/moveArrayItem";
import {FormikContextType} from "formik";
import {DefineRegistry} from "../../utils/DefineRegistry";
import {page} from "../../features/Page";


class Store {
    currentNode: Node | null = null
    isDragging: boolean = false
    draggingOverKey?: string
    draggingElementKey?: string
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

    registeredFields: Record<string, () => void> = {}

    validateForm() {
        _.values(this.registeredFields).forEach(value => value())
    }

    get tree(): Node {
        let componentStore = new ComponentStore(page.name, page.name)
        let root = new Node(this, componentStore)
        componentStore.children = this.model.components
        root.children = this.model.components.map(child => new Node(this, child, root));
        return root
    }

    //TODO init in constructor?
    readonly view: DefineRegistry

    //TODO set in provider
    //TODO new instance for each form view
    constructor(view: DefineRegistry) {
        this.view = view
        makeObservable(this, {
            allEvents: observable.deep,
            currentNode: observable.ref,
            formContext: observable.ref,
            isDragging: observable.ref,
            isBuilderMode: observable.ref,
            showRightPanel: observable.ref,
            showLeftPanel: observable.ref,
            draggingOverKey: observable.ref,
            draggingElementKey: observable.ref,
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
        return JSON.stringify(this.model, null, 2)
    }

    //TODO post processing
    parseForm(text: string) {
        this.model = JSON.parse(text);
    }

    remove(targetKey: string) {
        const targetNode = this.findNode(targetKey);
        if (!targetNode) return;

        const targetParent = targetNode.parent?.data?.children;
        const targetIndex = targetParent?.indexOf(targetNode.data);

        if (_.isUndefined(targetIndex)) return;
        targetNode.parent?.data?.children?.splice(targetIndex, 1);
    }

    add(name: string, targetKey: string, index: number = 0, combine?: boolean) {
        const key = this._generateKey(name);
        const component = new ComponentStore(key, name);
        this.model.components.push(component);
        this.move(key, targetKey, index, combine);
    }

    clone(sourceKey: string) {
        const sourceNode = this.findNode(sourceKey);
        if (!sourceNode) return;

        const clonedComponent = _.cloneDeep(sourceNode.data);
        clonedComponent.key = this._generateKey(sourceNode.definition.name);
        this.treeMap(clonedComponent?.children, (componentStore: ComponentStore) => {
            componentStore.key = this._generateKey(componentStore.type);
        })

        this.model.components.push(clonedComponent);
        this.move(clonedComponent.key, sourceKey, 1);
    }

    move(sourceKey: string, targetKey: string, index: number = 0, combine?: boolean) {
        const sourceNode = this.findNode(sourceKey);
        const targetNode = this.findNode(targetKey);

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
        this.currentNode = sourceNode;
    }

    private _generateKey(name: string) {
        return name + " " + (Math.random() + 1).toString(36).substring(7);
    }

    findNode(key?: string) {
        return find(this.tree)

        function find(node: Node): Node | null {
            if (node.key === key) return node

            if (!node.children) return null

            for (let child of node.children) {
                let childNode = find(child)
                if (childNode) return childNode
            }

            return null
        }
    }

    getAllKeys() {
        const keys: string[] = []
        getKey(this.tree)
        return keys

        function getKey(node: Node) {
            if (node.key) keys.push(node.key)

            if (node.children) node.children.map(getKey)
        }
    }

    getAllNodes() {
        const nodes: Node[] = []
        getKey(this.tree)
        return nodes

        function getKey(node: Node) {
            if (node.key) nodes.push(node)

            if (node.children) node.children.map(getKey)
        }
    }

    treeMap(data?: ComponentStore[], callback?: Function) {
        data?.forEach((node: ComponentStore) => {
            callback?.(node);
            if (node.children) this.treeMap(node.children, callback);
        });
    }

    download = () => {
        const data = "data:text/json;charset=utf-8," + encodeURIComponent(this.stringifyForm());

        const link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', "form.json");
        document.body.appendChild(link);
        link.onclick = () => {
            document.body.removeChild(link);
        };
        link.click();
    };

    upload = () => {
        const input = document.createElement('input');
        input.type = 'file';

        input.onchange = e => {

            const target = e.target as HTMLInputElement;
            const file: File = (target.files as FileList)[0];

            // setting up the reader
            const reader = new FileReader();
            reader.readAsText(file, 'UTF-8');

            // here we tell the reader what to do when it's done reading...
            reader.onload = readerEvent => {
                const content: string = readerEvent.target?.result as string ?? ""; // this is the content!

                this.parseForm(content)
            }

        }

        input.click();
    };

}

export {Store}
