import {observer} from 'mobx-react'
import {IReactComponent} from 'mobx-react/dist/types/IReactComponent'
import {ComponentStore} from '../stores/ComponentStore'

export function isFunction(fn: any): fn is Function {
  return typeof fn === 'function'
}

export function isString(value: any): value is string {
  return typeof value === 'string'
}

export function isObject(value: any): value is Object {
  return value !== null && typeof value === 'object'
}

export function treeFind<T extends { key: string, children?: T[] }>(value: T, key?: string): T | undefined {
  if (value.key === key) return value

  if (!value.children) return

  for (const child of value.children) {
    const childNode = treeFind(child, key)
    if (childNode) return childNode
  }

  return
}

export function namedObserver<T extends IReactComponent>(displayName: string, component: T) {
  const observerComponent = observer(component)
  observerComponent.displayName = displayName
  return observerComponent
}

export const emptyComponentStore = new ComponentStore('', '')
