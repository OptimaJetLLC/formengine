import * as yup from 'yup'

export interface PropertyAnnotation<T> {
  readonly key: string
  readonly schema?: yup.AnySchema
  readonly valued: boolean
  readonly defaultValue: T
}
