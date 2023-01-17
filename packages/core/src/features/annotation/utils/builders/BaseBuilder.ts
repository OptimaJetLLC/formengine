import _, {assign} from 'lodash'
import {ReactNode} from 'react'
import {AnnotationMap} from '../../consts'
import {PreAnnotation} from '../../types'
import {Annotation} from '../annotations/Annotation'
import {Options} from '../Options'

export class BaseBuilder<T> {
  annotation!: PreAnnotation
  options = new Options()

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

  setup(options: Partial<PreAnnotation & Options>): this {
    const {type, autoName, ...annotation} = options
    const clone = this.clone()
    clone.options.type = type ?? clone.options.type
    clone.options.autoName = autoName ?? clone.options.autoName
    _.assign(clone.annotation, annotation)
    return clone
  }

  clone(): this {
    const clone = _.clone(this)
    clone.options = _.clone(this.options)
    clone.annotation = _.clone(this.annotation)
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
    _.assign(clone.annotation, {editorProps: props})
    return clone
  }

  protected getName(key: string) {
    return this.annotation.name ?? (this.options.autoName ? _.startCase(key) : key)
  }
}

