import {ComponentType} from 'react'
import {PropertyAnnotations} from './PropertyAnnotations'

export interface ComponentDefinition<T extends object> {
  readonly typeName: string
  readonly view: ComponentType<T>
  readonly props: PropertyAnnotations<T>
}
