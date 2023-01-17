import {ComponentType} from 'react'
import * as yup from 'yup'
import {Enum} from '../../types'
import {BaseBuilder} from './BaseBuilder'
import {OneOfBuilder} from './OneOfBuilder'
import {FromYup, SchemedBuilder} from './SchemedBuilder'

export class AnnotationBuilder<T> extends BaseBuilder<T> {
  constructor(editor: ComponentType) {
    super()
    this.annotation = {editor}
  }

  static create = <T>(editor: ComponentType) => new this<T>(editor)

  schemed<T extends yup.AnySchema>(schema: T) {
    return new SchemedBuilder<FromYup<T>>().setup({...this.options, ...this.annotation, schema: schema})
  }

  oneOf<U extends string | number, D extends [U, ...U[]]>(...values: D) {
    const result = new OneOfBuilder<Enum<D>>().setup({...this.options, ...this.annotation, schema: yup.mixed().oneOf(values)})
    result.values = values
    return result
  }
}
