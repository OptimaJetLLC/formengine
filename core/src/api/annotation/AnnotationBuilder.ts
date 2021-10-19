import _ from "lodash";
import {Annotation} from "./Annotation";


//TODO validation? or value by default
export class AnnotationBuilder<T> {
    private template: Annotation<T>;

    isRequired(defaultValue: NonNullable<T>) {
        let builder = AnnotationBuilder.from<NonNullable<T>>(this.template as unknown as Annotation<NonNullable<T>>)
        builder.template.isRequired = true
        builder.template.defaultValue = defaultValue
        return builder
    }

    constructor(obj?: Partial<Omit<Annotation<T>, 'render'>>) {
        this.template = new Annotation<T>()
        if (obj) Object.assign(this.template, obj)
    }

    /** Create builder with sent template */
    static from<T>(template: Annotation<T>) {
        let cloneTemplate = _.cloneDeep(template)
        let builder = new AnnotationBuilder<T>(cloneTemplate)
        return builder
    }

    /** Create new builder with template assigned with passed object */
    with(obj: Partial<Omit<Annotation<T>, 'render'>>) {
        let builder = AnnotationBuilder.from(this.template)
        Object.assign(builder.template, obj)
        return builder
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


