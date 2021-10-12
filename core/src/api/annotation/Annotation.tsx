import {PropertyEditorProps} from "../Types";
import React, {ComponentClass, FunctionComponent} from "react";
import {store} from "../../stores/Store";
import {observer} from "mobx-react";

export class Annotation<T> {
    key!: string
    title?: string;
    // Допустимые типы значений //TODO?
    types: Set<Type> = new Set<Type>();
    section?: string;
    input!: FunctionComponent<PropertyEditorProps<T>> | ComponentClass<PropertyEditorProps<T>>;
    //input!: FunctionComponent<PropertyEditorProps>;
    initValue!: T;
    data?: T[] | Record<string, T>;
    description?: string;

    constructor() {
        //this.initValue = initValue
        this.types.add(Type.undefined)
    }

    render(): JSX.Element | null {
        if (!store.currentNode?.data) return null
        if (!this.input) return null
        const Input = observer(this.input)
        return (<Input key={this.key} model={store.currentNode.data} annotation={this}/>);
    }
}

export enum Type {
    undefined ="undefined",
    object ="object",
    boolean ="boolean",
    number ="number",
    string ="string",
    function ="function",
    symbol ="symbol",
    bigint ="bigint",
}
