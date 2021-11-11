import {PropertyEditorProps} from "../Types";
import React, {ComponentType} from "react";
import {observer} from "mobx-react";
import {Section} from "../../Builder/components/PropertiesEditor/Section";

export class Annotation<T> {
    private _component!: ComponentType<PropertyEditorProps<T>>;

    key!: string
    //TODO title to get with transformation if empty
    title!: string;
    //type: string = Type.string;
    section?: Section;
    defaultValue?: T;
    data?: T[] | Record<string, T>;
    description?: string;
    isSystem: boolean = false
    isRequired: boolean = false
    isFunction: boolean = false

    get component(): React.ComponentType<PropertyEditorProps<T>> {
        //TODO set input in constructor?
        if (!this._component) throw Error("Input is required")

        return observer(this._component);
    }

    set component(value: React.ComponentType<PropertyEditorProps<T>>) {
        this._component = value;
    }

    constructor() {
        //this.initValue = initValue
        //this.types.add(Type.undefined)
    }
}

