import {ComponentClass, FunctionComponent} from "react";
import _ from "lodash";
import {PropertyEditorProps} from "../Types";
import {Annotation} from "./Annotation";

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


    isRequired() {
        //return
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
    //withInput(input: FunctionComponent<PropertyEditorProps> | ComponentClass<PropertyEditorProps>) {
    withInput(input: FunctionComponent<PropertyEditorProps>) {
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


