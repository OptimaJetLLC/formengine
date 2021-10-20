import {PropertyEditorProps} from "../Types";
import React, {ComponentClass, FunctionComponent} from "react";
import {store} from "../../stores/Store";
import {observer} from "mobx-react";

export class Annotation<T> {
    key!: string
    title?: string;
    //type: string = Type.string;
    section?: string;
    input!: FunctionComponent<PropertyEditorProps<T>> | ComponentClass<PropertyEditorProps<T>>;
    defaultValue?: T;
    data?: T[] | Record<string, T>;
    description?: string;
    isSystem: boolean = false
    isRequired: boolean = false
    isFunction: boolean = false

    constructor() {
        //this.initValue = initValue
        //this.types.add(Type.undefined)
    }

    render(): JSX.Element | null {
        if (!store.currentNode?.data) return null
        if (!this.input) return null
        const Input = observer(this.input)
        return (<Input key={this.key} model={store.currentNode.data} annotation={this}/>);
    }
}

