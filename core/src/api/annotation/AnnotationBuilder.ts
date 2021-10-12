import _ from "lodash";
import {Annotation, Type} from "./Annotation";
import {PropertyEditorProps} from "../Types";
import {ComponentClass, FunctionComponent} from "react";

//TODO validation? or value by default
export class AnnotationBuilder<T> {
    private template: Annotation<T>;
    //private readonly initValue: T

    get isRequired() {
        //let builder = this.with({})
        //builder.template.types.delete(Type.undefined)
        //return builder
        let builder = AnnotationBuilder.from<NonNullable<T>>(this.template as unknown as Annotation<NonNullable<T>>)
        return builder
    }

    constructor(obj?: Partial<Omit<Annotation<T>, 'render'>>) {
        this.template = new Annotation<T>()
        //this.initValue = initValue
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
    withInput(input: FunctionComponent<PropertyEditorProps<T>> | ComponentClass<PropertyEditorProps<T>>) {
    //withInput(input: FunctionComponent<PropertyEditorProps>) {
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

        //annotation.type = annotation.type ?? typeof annotation.initValue
        annotation.section = annotation.section ?? "main"
        annotation.description = annotation.description ?? ""

        return annotation
    }
}


