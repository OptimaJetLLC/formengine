import React, {ComponentClass, FunctionComponent} from "react";
import _ from "lodash";
import {Checkbox, Form, Input} from "rsuite";
import {store} from "../stores/Store";
import {ComponentStore} from "../stores/ComponentStore";

export class Annotation<T> {
    key!: string
    title?: string;
    type?: string;
    section?: string;
    input!: ComponentClass<PropertyEditProps> | FunctionComponent<PropertyEditProps>;
    initValue: T;
    data?: T[] | Record<string, T>;
    description?: string;

    constructor(initValue: T) {
        this.initValue = initValue
    }

    render() {
        if (!store.currentModel?.data) return null
        if (!this.input) return null
        const Input = this.input
        return (<Input key={this.key} model={store.currentModel.data} annotation={this}/>);
    }
}


//TODO validation? or value by default
export class AnnotationBuilder<T> {
    private template: Annotation<T>;
    private readonly initValue: T

    constructor(initValue: T, obj?: Partial<Omit<Annotation<T>, 'render' | 'initValue'>>) {
        this.template = new Annotation<T>(initValue)
        this.initValue = initValue
        if (obj) Object.assign(this.template, obj)
    }

    /** Create builder with sent template */
    static from<T>(template: Annotation<T>) {
        let builder = new AnnotationBuilder<T>(_.cloneDeep(template.initValue))
        builder.template = _.cloneDeep(template)
        return builder
    }


    /** Create new builder with template assigned with passed object */
    with(obj: Partial<Omit<Annotation<T>, 'render'>>) {
        let builder = AnnotationBuilder.from(this.template)
        Object.assign(builder.template, obj)
        return builder
    }

    /** Create new builder with template assigned with passed object */
    withTitle(title?: string) {
        return this.with({title})
    }

    /** Create new builder with template assigned with passed object */
    withInput(input: FunctionComponent<PropertyEditProps> | ComponentClass<PropertyEditProps>) {
    //withInput(input: FunctionComponent<PropertyEditProps>) {
        return this.with({input})
    }

    //TODO validation?
    /** Create annotation from template settled before. Set key if passed and title from key. */
    build(key?: string) {
        let annotation = _.cloneDeep(this.template)

        if (key) {
            annotation.key = key
            annotation.title = annotation.title ?? _.startCase(key)
        }

        annotation.type = annotation.type ?? typeof annotation.initValue
        annotation.section = annotation.section ?? "main"
        annotation.description = annotation.description ?? ""

        return annotation
    }
}


export const key = new AnnotationBuilder("", {input: KeyInput})

export const string = new AnnotationBuilder("", {input: StringInput})
export const stringOptional = new AnnotationBuilder("" as string | undefined, {input: StringInput})

export const boolean = new AnnotationBuilder(false, {input: BooleanInput})
export const booleanOptional = new AnnotationBuilder(false as boolean | undefined, {input: BooleanInput})


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
