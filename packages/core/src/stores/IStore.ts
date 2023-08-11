import {ComponentStore} from './ComponentStore'
import {Form} from './Form'

/**
 * The form viewer settings interface.
 */
export interface IStore {
  form: Form

  /**
   * @returns the slice of the initial data in accordance with the Store hierarchy.
   */
  get initialDataSlice(): Record<string, unknown> | undefined

  /**
   * Performs the callback function on each element of the component tree, accumulates the return values.
   * @param callback the function that calculates the value for the accumulator.
   * @param initialValue the initial value for the accumulator.
   * @returns the accumulated value.
   */
  reduceScreen: <T>(callback: (accumulator: T, current: ComponentStore) => T, initialValue: T) => T

  /**
   * Correctly clears allocated resources, the function must be called when destroying an instance of the class.
   */
  dispose: () => void
}
