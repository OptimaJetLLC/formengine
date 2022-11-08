import {ComponentType} from 'react'
import * as yup from 'yup'
import {Enum, PropertyEditorProps} from '../../types'
import {Options} from '../Options'
import {BaseBuilder} from './BaseBuilder'
import {OneOfBuilder} from './OneOfBuilder'
import {FromYup, SchemedBuilder} from './SchemedBuilder'

export class AnnotationBuilder<T> extends BaseBuilder<T> {
  options: Options

  constructor(editor: ComponentType<PropertyEditorProps>) {
    super()
    this.options = new Options(editor)
  }

  static create = <T>(editor: ComponentType<PropertyEditorProps>) => new this<T>(editor)

  schemed<T extends yup.AnySchema>(scheme: T) {
    return new SchemedBuilder<FromYup<T>>().setup({...this.options, scheme})
  }

  oneOf<U extends string | number, D extends [U, ...U[]]>(...values: D) {
    const result = new OneOfBuilder<Enum<D>>().setup({...this.options, scheme: yup.mixed().oneOf(values)})
    result.values = values
    return result
  }
}
