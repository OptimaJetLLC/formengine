import {observer} from 'mobx-react'
import {IReactComponent} from 'mobx-react/dist/types/IReactComponent'
import {ComponentStore} from '../stores/ComponentStore'

// todo rename 'fn' parameter to 'value'
/**
 * Type predicate, asserts that the value is a function.
 * @param fn the value.
 * @returns true if the value is a function, false otherwise.
 */
export function isFunction(fn: any): fn is Function {
  return typeof fn === 'function'
}

/**
 * Type predicate, asserts that the value is a string.
 * @param value the value.
 * @returns true if the value is a string, false otherwise.
 */
export function isString(value: any): value is string {
  return typeof value === 'string'
}

/**
 * Creates the observable React component.
 * @param displayName the displayName value of the React component.
 * @param component the React component.
 * @returns the observable React component.
 */
export function namedObserver<T extends IReactComponent>(displayName: string, component: T) {
  const observerComponent = observer(component)
  observerComponent.displayName = displayName
  return observerComponent
}

export const emptyComponentStore = new ComponentStore('', '')
