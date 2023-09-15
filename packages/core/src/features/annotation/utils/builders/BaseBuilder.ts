import {assign, clone as lodashClone, startCase} from 'lodash-es'
import {ReactNode} from 'react'
import {AnnotationMap} from '../../consts'
import {AnnotationType} from '../../types'
import {Annotation} from '../../types/annotations/Annotation'

class BuilderOptions {
  annotationType: AnnotationType = 'Module'
  autoName = true
}

/**
 * Type for component property metadata without the 'key' property, but with the 'editor' property.
 */
export type PreAnnotation = Partial<Omit<Annotation, 'key'>> & Pick<Annotation, 'editor'>

/**
 * The type representing custom options for the component's property metadata builder.
 */
export type BuilderSetup = Partial<PreAnnotation & BuilderOptions>

//TODO add constructor
/**
 * The base builder class to define the metadata property of the form builder component.
 */
export class BaseBuilder<T> {
  annotation!: PreAnnotation
  options = new BuilderOptions()

  /**
   * @returns the main component property that is used as form data and for validation rules.
   */
  get valued() {
    return this.setup({valued: true})
  }

  /**
   * @returns the component property that can be localized.
   */
  get localize() {
    return this.setup({localizable: true})
  }

  /**
   * @returns the non-localizable component property.
   */
  get notLocalize() {
    return this.setup({localizable: false})
  }

  /**
   * Specifies the name of the component property.
   * @param name the property name.
   * @returns the modified instance of the builder.
   */
  named(name: string) {
    return this.setup({name})
  }

  /**
   * Adds the hint to the property name of the component.
   * @param hint the hint.
   * @returns the modified instance of the builder.
   */
  hinted(hint: ReactNode) {
    return this.setup({hint})
  }

  // todo rename all calculable to computable???
  /**
   * Marks the component property as calculable.
   * @param calculable true if the property is calculable.
   * @returns the modified instance of the builder.
   */
  calculable(calculable: boolean) {
    return this.setup({calculable})
  }

  /**
   * Modifies the component property metadata builder with custom options.
   * @param options the custom options.
   * @returns the modified instance of the builder.
   */
  setup(options: BuilderSetup): this {
    const {annotationType, autoName, ...annotation} = options
    const clone = this.clone()
    clone.options.annotationType = annotationType ?? clone.options.annotationType
    clone.options.autoName = autoName ?? clone.options.autoName
    assign(clone.annotation, annotation)
    return clone
  }

  /**
   * Clones the instance of the builder.
   * @returns the cloned instance of the builder.
   */
  clone(): this {
    const clone = lodashClone(this)
    clone.options = lodashClone(this.options)
    clone.annotation = lodashClone(this.annotation)
    clone.annotation ??= {} as PreAnnotation
    return clone
  }

  /**
   * Creates component property metadata for the form builder.
   * @param key the unique key of the component property.
   * @returns the instance of the component property metadata for the form builder.
   */
  build(key: string): Annotation {
    const name = this.getName(key)
    const annotation = new AnnotationMap[this.options.annotationType](key, name)
    assign(annotation, this.annotation)
    return annotation
  }

  /**
   * Sets custom properties for the component's property editor.
   * @param props the custom properties
   * @returns the modified instance of the builder.
   */
  withEditorProps(props: any): this {
    const clone = this.clone()
    assign(clone.annotation, {editorProps: props})
    return clone
  }

  protected getName(key: string) {
    return this.annotation.name ?? (this.options.autoName ? startCase(key) : key)
  }
}

