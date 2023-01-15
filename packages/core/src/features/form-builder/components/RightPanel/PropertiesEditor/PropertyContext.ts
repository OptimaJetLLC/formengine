import {ComponentStore} from '../../../../../stores/ComponentStore'
import {createContext} from '../../../../../utils/createContextHook'
import {Annotation} from '../../../../annotation/utils/annotations/Annotation'

export type PropertyData = {
  readonly componentKey: string
  readonly useFn?: boolean
  readonly fnSource?: string

  readonly componentStore: ComponentStore
  readonly annotation: Annotation
}

export type PropertyContextValue = {
  property?: PropertyData
  setCurrentProperty: (componentStore: ComponentStore, annotation: Annotation) => void
  clear: () => void
}

const [usePropertyContext, PropertyContextProvider] = createContext<PropertyContextValue>('PropertyDataContext')

export {usePropertyContext, PropertyContextProvider}
