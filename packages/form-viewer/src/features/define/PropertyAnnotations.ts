import {PropertyAnnotation} from './PropertyAnnotation'
import {Ancestor} from './types'

export type PropertyAnnotations<T> = {
  [key in keyof T]: PropertyAnnotation<T[key] | Ancestor<T[key]>>
}
