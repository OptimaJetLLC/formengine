import {makeAutoObservable} from "mobx";
import ComponentDefinition from "../utils/constants";
import _ from "lodash";

export class ComponentStore {
    key: string = ""
    type: string = ""
    props: Record<string, any> = {}
    children?: ComponentStore[]

    constructor(key: string, definition: ComponentDefinition<any>) {
        initDefaultValue(this, definition)
        this.key = key
        this.type = definition.type
        makeAutoObservable(this);
    }
}

function initDefaultValue(store: ComponentStore, definition: ComponentDefinition<any>) {
    Object.keys(definition.annotations).filter(value => value.includes(".")).forEach(key => {
        _.set(store.props, key, definition.annotations[key]?.initValue )
    })
}
