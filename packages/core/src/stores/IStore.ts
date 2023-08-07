import {ComponentData} from '../utils/contexts/ComponentDataContext'
import {ComponentStore} from './ComponentStore'

/**
 * The form viewer settings interface.
 */
export interface IStore {
  rootComponentData: ComponentData

  /**
   * Initial data of the form.
   */
  initialData?: Record<string, unknown>

  /**
   * Performs the callback function on each element of the component tree, accumulates the return values.
   * @param callback the function that calculates the value for the accumulator.
   * @param initialValue the initial value for the accumulator.
   * @returns the accumulated value.
   */
  reduceScreen: <T>(callback: (accumulator: T, current: ComponentStore) => T, initialValue: T) => T
}
