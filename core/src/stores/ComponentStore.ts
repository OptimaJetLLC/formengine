import {autorun, intercept, makeAutoObservable, observe, reaction} from "mobx";
import {ComponentDefinition} from "../utils/Types";
import _ from "lodash";
import {store} from "./Store";

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

autorun(() => {
    store.form.components.map(value => observe(value.props, change => {
        //debugger
        //TODO
        /*if (!change.newValue) {
            // Ignore attempts to unset the background color.
            return null
        }
        if (change.newValue.length === 6) {
            // Correct missing '#' prefix.
            change.newValue = "#" + change.newValue
            return change
        }
        if (change.newValue.length === 7) {
            // This must be a properly formatted color code!
            return change
        }
        if (change.newValue.length > 10) {
            // Stop intercepting future changes.
            disposer()
        }
        throw new Error("This doesn't look like a color at all: " + change.newValue)*/
    }))
})

function initDefaultValue(store: ComponentStore, definition: ComponentDefinition<any>) {
    Object.keys(definition.annotations).filter(value => value.includes(".")).forEach(key => {
        _.set(store.props, key, definition.annotations[key]?.initValue )
    })
}
