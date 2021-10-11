import {PropertyEditorProps} from "./Types";
import React, {ComponentClass, FunctionComponent} from "react";
import {store} from "../stores/Store";
import {observer} from "mobx-react-lite";

export class Annotation<T> {
    key!: string
    title?: string;
    type?: string;
    section?: string;
    //input!: ComponentClass<PropertyEditorProps> | FunctionComponent<PropertyEditorProps>;
    input!: FunctionComponent<PropertyEditorProps>;
    initValue: T;
    data?: T[] | Record<string, T>;
    description?: string;

    constructor(initValue: T) {
        this.initValue = initValue
    }

    render(): JSX.Element | null {
        if (!store.currentNode?.data) return null
        if (!this.input) return null
        const Input = observer(this.input)
        return (<Input key={this.key} model={store.currentNode.data} annotation={this}/>);
    }
}
