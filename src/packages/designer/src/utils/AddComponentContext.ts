import {createNonNullableContext} from '@react-form-builder/core'
import type {CanAddComponentFunction} from '../stores/BuilderStore'

const [
  /**
   * **Internal use only.**
   */
  useCanAddComponent,
  /**
   * **Internal use only.**
   */
  CanAddComponentProvider] = createNonNullableContext<CanAddComponentFunction>('CanAddComponentContext', () => true)

export {useCanAddComponent, CanAddComponentProvider}
