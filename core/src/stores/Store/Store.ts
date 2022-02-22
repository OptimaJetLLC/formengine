import _ from "lodash";
import { action, autorun, computed, makeObservable, observable, reaction, toJS } from 'mobx';
import {ComponentStore} from "../ComponentStore";
import {Node} from "../../utils/Node";
import {Action, ComponentMove, EventName, FullActionDefinition, Modifiers, OverArgs} from "../../utils/Types";
import {toWeakEvent} from "./utils/toWeakEvent";
import {FormikContextType} from "formik";
import {DefineRegistry} from "../../utils/DefineRegistry";
import {screen} from "../../components/Screen";
import {DndStore} from "../DndStore";
import {findLanguage, getFullLangCode, onI18nInit, onLanguageChange} from '../../features/localization/utils';
import {getKey} from "../../utils/getKey";
import {defaultLanguage} from "../../features/localization/consts";

export class Store {
    readonly view: DefineRegistry

    readonly dnd: DndStore = new DndStore()

    currentNode: Node | null = null
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

    language = defaultLanguage;

    validateForm() {
        _.values(this.registeredFields).forEach(value => value())
    }

    get tree(): Node {
        let componentStore = new ComponentStore(screen.name, screen.name)
        let root = new Node(this, componentStore)
        componentStore.children = this.model.components
        root.children = this.model.components.map(child => new Node(this, child, root));
        return root
    }

    //TODO set in provider
    //TODO new instance for each form view
    constructor(view: DefineRegistry) {
        this.view = view

        makeObservable(this, {
            allEvents: observable.deep,
            currentNode: observable.ref,
            formContext: observable.ref,
            isBuilderMode: observable.ref,
            showRightPanel: observable.ref,
            showLeftPanel: observable.ref,
            model: observable,
            tree: computed,
            clear: action.bound,
            language: observable.ref
        })

        autorun(() => {
            this.allEvents.forEach(toWeakEvent)
        });

        onI18nInit((language: string) => {
            let foundLanguage = findLanguage(language);
            if (getFullLangCode(foundLanguage) !== getFullLangCode(this.language)) {
                this.language = foundLanguage;
            }
        });

        reaction(() => this.language, onLanguageChange);
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

    //TODO clone for inner components without removing
    clone(source: ComponentMove) {
        const clone = _.cloneDeep(source.componentStore)
        clone.key =  clone.key + " " + getKey();

        this.treeMap(clone?.children, (child: ComponentStore) => {
            child.key = child.key  + " " + getKey();
        })

        this.move({
            componentStore: clone,
        }, source, false)
    }

    //TODO definition для этих методов не нужен, создать еще тип, в котором он не обязателен?
    move(source: ComponentMove, target: ComponentMove, isBefore: boolean = true) {
        this.remove(source)
        const index = getIndexToPush(target, isBefore)
        push(source, target, index)


        function push(source: ComponentMove, target: ComponentMove, index: number) {
            let purpose = target.parent ||  target.componentStore
            purpose.children ??= []
            purpose.children?.splice(index, 0, source.componentStore)
        }

        function getIndexToPush(target: ComponentMove, isBefore: boolean) {
            const index = Store.getIndexInParent(target)
            return isBefore ? index : index + 1
        }
    }

    remove(source: ComponentMove) {
        const index = Store.getIndexInParent(source)
        source.parent?.children?.splice(index, 1)
    }

    static getIndexInParent(node: ComponentMove){
        const child = node.componentStore
        const parent = node.parent
        if (!parent) return 0

        return parent.children!.indexOf(child)
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
