import {assign, clone as lodashClone, startCase} from 'lodash-es'
import {ReactNode} from 'react'
import {AnnotationMap} from '../../consts'
import {Annotation} from '../../types/annotations/Annotation'
import {BuilderOptions} from '../../types/BuilderOptions'

export type PreAnnotation = Partial<Omit<Annotation, 'key'>> & Pick<Annotation, 'editor'>

//TODO add constructor
export class BaseBuilder<T> {
  annotation!: PreAnnotation
  options = new BuilderOptions()

  /**
   * The main property of a component that used like form data and for validation rules.
   */
  get valued() {
    return this.setup({valued: true})
  }

  named(name: string) {
    return this.setup({name})
  }

  hinted(hint: ReactNode) {
    return this.setup({hint})
  }

  calculable(calculable: boolean) {
    return this.setup({calculable})
  }

  setup(options: Partial<PreAnnotation & BuilderOptions>): this {
    const {type, autoName, ...annotation} = options
    const clone = this.clone()
    clone.options.type = type ?? clone.options.type
    clone.options.autoName = autoName ?? clone.options.autoName
    assign(clone.annotation, annotation)
    return clone
  }

  clone(): this {
    const clone = lodashClone(this)
    clone.options = lodashClone(this.options)
    clone.annotation = lodashClone(this.annotation)
    clone.annotation ??= {} as PreAnnotation
    return clone
  }

  build(key: string): Annotation {
    const name = this.getName(key)
    const annotation = new AnnotationMap[this.options.type](key, name)
    assign(annotation, this.annotation)
    return annotation
  }

  withEditorProps(props: any): this {
    const clone = this.clone()
    assign(clone.annotation, {editorProps: props})
    return clone
  }

  protected getName(key: string) {
    return this.annotation.name ?? (this.options.autoName ? startCase(key) : key)
  }
}

