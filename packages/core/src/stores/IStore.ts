import type {ValidationResult} from '../features/validation/types/ValidationResult'
import {ComponentData} from '../utils/contexts/ComponentDataContext'
import {ComponentStore} from './ComponentStore'
import {Form} from './Form'

/**
 * The form viewer settings interface.
 */
export interface IStore {
  /**
   * The displayed form.
   */
  form: Form

  /**
   * @returns the slice of the initial data in accordance with the Store hierarchy. **Internal use only.**
   */
  get initialDataSlice(): Record<string, unknown> | undefined

  /**
   * Performs the callback function on each element of the component tree, accumulates the return values.
   * @param callback the function that calculates the value for the accumulator.
   * @param initialValue the initial value for the accumulator.
   * @template T the return value type.
   * @returns the accumulated value.
   */
  reduceScreen: <T>(callback: (accumulator: T, current: ComponentData) => T, initialValue: T) => T

  /**
   * The function to localize the validation error message.
   * @param componentStore the component settings.
   * @param validationResults the results of the validation.
   * @returns the result of localization or undefined.
   */
  localizeErrorMessages: (componentStore: ComponentStore, validationResults?: ValidationResult[]) => string | undefined

  /**
   * Correctly clears allocated resources, the function must be called when destroying an instance of the class.
   */
  dispose: () => void
}
