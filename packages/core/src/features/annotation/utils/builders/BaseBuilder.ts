import _ from 'lodash'
import {AnnotationMap} from '../../consts'
import {Annotation} from '../annotations/Annotation'
import {Options} from '../Options'

export  class BaseBuilder<T> {
  options!: Options

  named(name: string) {
    return this.setup({name})
  }

  setup(options: Partial<Options>): this {
    const clone = this.clone()
    _.assign(clone.options, options)
    return clone
  }

  clone(): this {
    const clone = _.clone(this)
    clone.options = _.clone(this.options)
    clone.options ??= {} as Options
    return clone
  }

  build(key: string): Annotation {
    const name = this.getName(key)
    const Annotation = AnnotationMap[this.options.type]
    return new Annotation(key, name, this.options.editor, this.options.scheme, this.options.description, this.options.section)
  }

  protected getName(key: string) {
    return this.options.name ?? (this.options.autoName ? _.startCase(key) : key)
  }
}

