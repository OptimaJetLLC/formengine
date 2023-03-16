import * as yup from 'yup'
import {Ancestor, PropertyAnnotation} from '../types'

export class PropertyAnnotationBuilder<T> {
  schema?: yup.AnySchema
  hasValue: boolean = false
  defaultValue?: T

  schemed = <T extends yup.AnySchema>(schema?: T) => this.#with({schema})

  valued = (hasValue: boolean) => this.#with({hasValue})

  default = (defaultValue?: T) => {
    this.schema = this.schema?.default(defaultValue)
    return this.#with({defaultValue})
  }

  build(key: string): PropertyAnnotation<T> {
    return {
      key: key,
      schema: this.schema,
      valued: this.hasValue,
      defaultValue: this.defaultValue
    } as PropertyAnnotation<T>
  }

  #with(value: Partial<PropertyAnnotationBuilder<T>>) {
    return Object.assign(this, value)
  }
}

export const createProperty = <T>() => new PropertyAnnotationBuilder<T>()

export type PropertyAnnotationBuilders<T extends object> = {
  [key in keyof T]: PropertyAnnotationBuilder<T[key] | Ancestor<T[key]>>
}
