import {action, autorun, computed, intercept, makeObservable, observable, toJS} from "mobx";
import {ComponentStore} from "./ComponentStore";
import {Node} from "../utils/Node";
import _ from "lodash";
import React from "react";
import {Component} from "../components/Component";


class Store {
    currentNode: Node | null = null
    isDragging?: boolean
    isResizing?: boolean
    isMoving?: boolean
    wrapper?: Function

    form = {
        //name?
        //IRL
        components: new Array<ComponentStore>()
    }

    get tree(): Node {
        let root = new Node()
        root.children = this.form.components.map(child => new Node(child));
        return root
    }

    get render() {
        //Костыль. Надеюсь временный. Заставляет перерендерить кмопоненты :)
        let a = _.values(store.currentNode?.data?.props)[0] && null
        //for (let a in store.currentNode?.item?.props) break
        return this.tree.children?.map(node => React.createElement(Component, {key: node.key, node, wrapper: this.wrapper}))
    }

    constructor() {
        makeObservable(this, {
            currentNode: observable.ref,
            form: observable,
            render: computed,
            tree: computed,
            clear: action.bound,
            add: action.bound,
        })
        /*autorun(() => {
            debugger
        })*/
    }

    clear() {
        this.form.components = [];
    }

    stringifyForm() {
        return JSON.stringify(toJS(this.form), removeReactChildren, 2)

        function removeReactChildren(key: any, value: any) {
            if (key === "children" && value?.[0] && value[0].$$typeof === Symbol.for('react.element')) {
                return undefined
            }
            if (key === "parent" && value && value.key && value.type && value.props){
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
}

export const store = new Store()
