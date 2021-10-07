import {action, computed, makeObservable, observable, toJS} from "mobx";
import {ComponentStore} from "./ComponentStore";
import {Node} from "../utils/Node";
import _ from "lodash";
import React from "react";
import {Component} from "../components/Component";


class Store {
    currentModel: Node | null = null

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

    constructor() {
        makeObservable(this, {
            currentModel: observable.ref,
            form: observable,
            render: computed,
            tree: computed,
            clear: action.bound,
            add: action.bound,

        })

    }

    get render() {
        //Костыль. Надеюсь временный. Заставляет перерендерить кмопоненты :)
        let a = _.values(store.currentModel?.data?.props)[0] && null
        return  this.form.components.map(store => React.createElement(Component, {key: store.key, store}))
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
