import {observer} from 'mobx-react'
import type {ComponentType} from 'react'
import {customizable} from './customizable'
import type {CustomizableKey} from './types'

/**
 * Creates the customizable observer component. **Internal use only.**
 * @param key the key of the customizable component. It is also set to the displayName and add to the className.
 * @param component the React component.
 * @template T the component property type.
 * @returns the customizable observer component.
 */
export const customizableObserver = <T = any>(key: CustomizableKey, component: ComponentType<T>): ComponentType<T> => {
  return customizable(key, observer(component))
}
