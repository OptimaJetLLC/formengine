import {createNonNullableContext} from '@react-form-builder/core'
import type {CanAddComponentFunction, CanAddComponentResult} from '../stores/BuilderStore'

/**
 * Normalizes a can-add result to a structured value.
 * @param result the can-add result.
 * @returns whether the component can be added and an optional hint key.
 */
export function resolveCanAddComponentResult(result: CanAddComponentResult): {
  canAdd: boolean
  disableHintKey?: string
} {
  if (typeof result === 'boolean') {
    return {canAdd: result}
  }
  return result
}

const [
  /**
   * **Internal use only.**
   */
  useCanAddComponent,
  /**
   * **Internal use only.**
   */
  CanAddComponentProvider,
] = createNonNullableContext<CanAddComponentFunction>('CanAddComponentContext', () => true)

export {useCanAddComponent, CanAddComponentProvider}
