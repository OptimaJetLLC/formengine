import {observer} from 'mobx-react'
import {IReactComponent} from 'mobx-react/dist/types/IReactComponent'
import {ComponentStore} from '../stores/ComponentStore'

export function isFunction(fn: any): fn is Function {
  return typeof fn === 'function'
}

export function isString(value: any): value is string {
  return typeof value === 'string'
}

export function namedObserver<T extends IReactComponent>(displayName: string, component: T) {
  const observerComponent = observer(component)
  observerComponent.displayName = displayName
  return observerComponent
}

export const emptyComponentStore = new ComponentStore('', '')
