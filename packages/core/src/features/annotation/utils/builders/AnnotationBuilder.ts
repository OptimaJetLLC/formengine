import * as yup from 'yup'
import {EditorType, Enum} from '../../types'
import {BaseBuilder} from './BaseBuilder'
import {OneOfBuilder} from './OneOfBuilder'
import {FromYup, SchemedBuilder} from './SchemedBuilder'
import {SomeOfBuilder} from './SomeOfBuilder'

export class AnnotationBuilder<T> extends BaseBuilder<T> {
  constructor(editor: EditorType) {
    super()
    this.annotation = {editor}
  }

  static create = <T>(editor: EditorType) => new this<T>(editor)

  schemed<T extends yup.AnySchema>(schema: T) {
    return new SchemedBuilder<FromYup<T>>().setup({...this.options, ...this.annotation, schema: schema})
  }

  oneOf<U extends string | number, D extends [U, ...U[]]>(...values: D) {
    const result = new OneOfBuilder<Enum<D>>().setup({...this.options, ...this.annotation, schema: yup.mixed()})
    result.values = values
    return result
  }

  someOf<U extends string | number, D extends [U, ...U[]]>(...values: D) {
    const result = new SomeOfBuilder<Enum<D>>().setup({...this.options, ...this.annotation, schema: yup.mixed()})
    result.values = values
    return result
  }
}
