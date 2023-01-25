import {PropertyAnnotationBuilder} from './PropertyAnnotationBuilder'
import {Ancestor} from './types'

export type PropertyAnnotationBuilders<T extends object> = {
  [key in keyof T]: PropertyAnnotationBuilder<T[key] | Ancestor<T[key]>>
}
