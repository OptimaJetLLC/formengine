import React, {ClassicComponent, Component, ComponentClass, FunctionComponent, ReactNode} from "react";
import _ from "lodash";
import {Checkbox, Form, Input} from "rsuite";
import {store} from "../stores/Store";
import {ComponentStore} from "../stores/ComponentStore";
import {observer} from "mobx-react-lite";

/*export class Builder<T> {
    constructor(private creator: Annotation<string>) {
    }

    with<K extends keyof T>(obj: Pick<T, K>): this & Pick<T, K> {
        return Object.assign(this, obj);
    }

    build(this: this & T): T {
        return new this.creator(this);
    }
}*/

export class Annotation<T> {
    key!: string
    title?: string;
    type?: string;
    section?: string;
    input!: FunctionComponent<PropertyEditProps>;
    initValue: T;
    data?: T[] | Record<string, T>;
    description?: string;

    constructor(initValue: T, override?: Partial<Omit<Annotation<T>, "initValue">>) {
        this.initValue = initValue
    }
    /*constructor(builder: Builder<Annotation<T>> & Annotation<T>) {
        this.key = builder.key;
        this.title = builder.title;
        this.type = builder.type;
        this.section = builder.section;
        this.input = builder.input;
        this.initValue = builder.initValue
        this.data = builder.data;
        this.description = builder.description;
    }*/

    render() {
        if (!store.currentModel?.data) return null
        if (!this.input) return null
        const Input1 = this.input

        return (<Input1 key={this.key} model={store.currentModel.data} annotation={this}/>);
        //return observer(React.createElement(this.input, {key:this.key, model:store.currentModel.data, annotation:this}))
    }
}


//TODO validation? or value by default
export class AnnotationBuilder<T> {
    private annotation: Annotation<T>;
    private readonly initValue: T

    constructor(initValue: T) {
        this.annotation = new Annotation<T>(initValue)
        this.initValue = initValue
    }

    static from<T>(template: Annotation<T>) {
        let builder = new AnnotationBuilder<T>(_.cloneDeep(template.initValue))
        builder.annotation = _.cloneDeep(template)
        return builder
    }

    setTitle(title: string) {
        this.annotation.title = title
        return this
    }

    set() {

        return this
    }

    //setInput(input: FunctionComponent<PropertyEditProps> | ComponentClass<PropertyEditProps>) {
    setInput(input: FunctionComponent<PropertyEditProps>) {
        this.annotation.input = observer(input)
        return this
    }

    build(key: string) {
        let builtAnnotation = new Annotation<T>(this.initValue)

        this.annotation.key = key
        //this.annotation.title = this.annotation.title || _.startCase(key)
        this.annotation.title = _.startCase(key)
        this.annotation.type = this.annotation.type ?? typeof this.annotation.initValue
        this.annotation.section = this.annotation.section ?? "main"
        //TODO validation
        //this.annotation.input = this.annotation.input ?? ""
        //value.data = value.data ?? ""
        this.annotation.description = this.annotation.description ?? ""

        //return this.annotation
        return _.cloneDeep(this.annotation)
        //return builtAnnotation
    }

}


const keyTemplate = new AnnotationBuilder("").setInput(KeyInput).build("")
export const key = AnnotationBuilder.from(keyTemplate)

const stringTemplate = new AnnotationBuilder("").setInput(StringInput).build("")
export const string = AnnotationBuilder.from(stringTemplate)
export const stringOptional = AnnotationBuilder.from<string | undefined>(stringTemplate)

const booleanTemplate = new AnnotationBuilder(false).setInput(BooleanInput).build("")
export const boolean = AnnotationBuilder.from(booleanTemplate)
export const booleanOptional = AnnotationBuilder.from<boolean | undefined>(booleanTemplate)



interface PropertyEditProps {
    model: ComponentStore
    annotation: Annotation<any>
}

function KeyInput({model, annotation}: PropertyEditProps) {

    return (
        <div>
            <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
            <Input
                value={model.key}
                onChange={value => model.key = value as string}
            />
        </div>
    )
}

function StringInput({model, annotation}: PropertyEditProps) {

    //debugger

    return (
        <div>
            <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
            <Input
                value={model.props[annotation.key]}
                onChange={value => model.props[annotation.key] = value as string}
            />
        </div>
    )
}


function BooleanInput({model, annotation}: PropertyEditProps) {

    return (
        <div>
            <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
            <Checkbox
                value={model.props[annotation.key]}
                onChange={value => model.props[annotation.key] = value}
            />
        </div>
    )
}
