import {ReactNode} from "react";
import {makeAutoObservable} from "mobx";
import ComponentDefinition from "../utils/constants";
import _ from "lodash";

export class ComponentStore {
    key: string = ""
    type: string = ""
    props: { [key: string]: any } = {}
    //props: T
    children?: ComponentStore[]

    constructor(key: string, definition: ComponentDefinition<any>) {
        initDefaultValue(this, definition)
        this.key = key
        this.type = definition.type
        //this.props = props
        makeAutoObservable(this);
    }
}

function initDefaultValue(store: ComponentStore, definition: ComponentDefinition<any>) {
    Object.keys(definition.description).filter(value => value.includes(".")).forEach(key => {
        _.set(store.props, key, definition.description[key]?.defaultValue )
    })
}
