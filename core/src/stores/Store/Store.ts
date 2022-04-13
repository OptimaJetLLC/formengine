import _ from "lodash";
import {action, computed, makeObservable, observable, reaction} from 'mobx';
import {ComponentStore} from "../ComponentStore";
import {Node} from "../../utils/Node";
import {ComponentMove} from "../../utils/types";
import {FormikContextType} from "formik";
import {DefineRegistry} from "../../utils/DefineRegistry";
import {screen} from "../../components/Screen";
import {findLanguage, getFullLangCode, onI18nInit, onLanguageChange} from '../../features/localization/utils';
import {getKey} from "../../utils/getKey";
import {defaultLanguage} from "../../features/localization/consts";
import {EventBus} from "../../features/event/utils/EventBus";
import {ActionDefinition} from "../../features/event/types";
import {setProperty, validate} from "../../features/event/actions";
import { treeFind } from "../../utils";

export class Store {
    readonly view: DefineRegistry

    isResizing: boolean = false

    isBuilderMode: boolean = true
    showRightPanel: boolean = true
    showLeftPanel: boolean = true
    styles?: any
    formContext?: FormikContextType<any>

    //TODO lazy initializing?
    readonly eventBus = new EventBus()

    actions: ActionDefinition[] = [setProperty, validate]

    screen: ComponentStore = new ComponentStore(screen.name, screen.name)

    registeredFields: Record<string, () => void> = {}

    language = defaultLanguage;

    validateForm() {
        _.values(this.registeredFields).forEach(value => value())
    }

    selected: Node | null = null

    get tree(): Node {
        return new Node(this, this.screen)
    }

    //TODO set in provider
    //TODO new instance for each form view
    constructor(view: DefineRegistry) {
        this.view = view

        makeObservable(this, {
            //allEvents: observable.deep,
            selected: observable.ref,
            isResizing: observable,
            formContext: observable.ref,
            isBuilderMode: observable.ref,
            showRightPanel: observable.ref,
            showLeftPanel: observable.ref,
            screen: observable.deep,
            tree: computed,
            clear: action.bound,
            language: observable.ref
        })

        onI18nInit((language: string) => {
            let foundLanguage = findLanguage(language);
            if (getFullLangCode(foundLanguage) !== getFullLangCode(this.language)) {
                this.language = foundLanguage;
            }
        });

        reaction(() => this.language, onLanguageChange);
    }

    clear() {
        this.screen = new ComponentStore(screen.name, screen.name)
    }

    stringifyForm() {
        return JSON.stringify(this.screen, null, 2)
    }

    //TODO post processing
    parseForm(text: string) {
        this.screen = JSON.parse(text);
    }

    //TODO clone for inner components without removing
    clone(source: ComponentMove) {
        const clone = _.cloneDeep(source.componentStore)

        this.treeMap(clone, (child) => child.key = child.key + " " + getKey())

        this.move({
            componentStore: clone,
        }, source, false)
    }

    move(source: ComponentMove, target: ComponentMove, isBefore: boolean = true) {
        this.remove(source)
        const index = getIndexToPush(target, isBefore)
        push(source, target, index)


        function push(source: ComponentMove, target: ComponentMove, index: number) {
            let purpose = target.parent || target.componentStore
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

    static getIndexInParent(node: ComponentMove) {
        const child = node.componentStore
        const parent = node.parent
        if (!parent) return 0

        return parent.children!.indexOf(child)
    }

    findComponent(key: string) {
        const result = treeFind(this.screen, key)

        if (!result)
            throw Error(`Component ${key} didn't found!`)

        return result
    }

    findAction(actionName: string, targetKey?: string) {
        const target = targetKey ? this.findComponent(targetKey) : undefined
        const actionList = target ? this.view.get(target.type).actions : this.actions
        const action = actionList?.find((val) => val.name === actionName)

        if (!action)
            throw Error(`Action ${actionName} didn't found!`)

        return action;
    }

    findNode = (key?: string) => treeFind(this.tree, key);

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

    treeMap(store: ComponentStore, callback: (store: ComponentStore) => void) {
        callback(store);
        store.children?.forEach((child: ComponentStore) => this.treeMap(child, callback));
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
