import * as yup from 'yup'
import {BaseBuilder} from './BaseBuilder'

export type FromYup<T extends yup.AnySchema> = yup.TypeOf<T>

export class SchemedBuilder<T> extends BaseBuilder<T> {
  get required(): SchemedBuilder<NonNullable<T>> {
    return this.setup({scheme: this.options.scheme?.required()})
  }

  default(value: T): this {
    return this.setup({scheme: this.options.scheme?.default(value)})
  }
}
