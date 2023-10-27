import {debounceTime, map, Subject, switchMap} from 'rxjs'
import type {IStore} from '../../../stores/IStore'
import type {Setter} from '../../../types'
import type {ValidationResult} from '../types/ValidationResult'

/**
 * A function that localizes validation error messages.
 * @param value the results of the validation.
 * @returns the localization result or undefined.
 */
export type ErrorMessageLocalizer = (value: ValidationResult[] | undefined) => string | undefined

/**
 * The function that validates a value and returns the validation result.
 * @param value the validated value.
 * @param store the form viewer settings.
 * @returns the Promise with the results of the validation.
 */
export type ResolvedValidator = (value: any, store: IStore) => Promise<ValidationResult[] | undefined>

/**
 * The validation function factory.
 * @param value the validated value.
 * @template T the validation function factory arguments.
 * @returns the function that validates a value.
 */
export type SchemaResolver<T> = (value: T) => ResolvedValidator

/**
 * Returns the default error message for the validation result.
 * @param result the validation result.
 * @returns the default error message for the validation result.
 */
export function getDefaultErrorMessage(result: ValidationResult) {
  return result.message ?? `Validation failed: ${result.settings.key}`
}

function concatErrorMessages(value: ValidationResult[] | undefined) {
  if (!value) return undefined
  return value?.map(getDefaultErrorMessage).join(' ')
}

/**
 * Binds all parts of the validation and performs the validation.
 */
export class DataValidator {
  readonly #subject = new Subject<any>()
  readonly #subscriptions
  readonly #stream

  private constructor(
    store: IStore,
    validator: ResolvedValidator,
    setter: Setter<string | undefined>,
    errorMessageLocalizer?: ErrorMessageLocalizer
  ) {
    const localizer = errorMessageLocalizer ?? concatErrorMessages
    this.#stream = this.#subject
      .pipe(
        debounceTime(200),
        map(value => validator(value, store)),
        switchMap(promise => promise),
        map(localizer),
      )
    this.#subscriptions = [
      this.#stream.subscribe(setter),
    ]
  }

  /**
   * Creates a DataValidator instance.
   * @param store the form viewer settings
   * @param resolver the validation function factory.
   * @param args the validation function factory arguments.
   * @param setter the callback function called to set a validation error.
   * @param localizer the function that localizes validation error messages.
   * @template T the validation function factory arguments.
   * @returns the DataValidator instance.
   */
  static create = <T>(store: IStore, resolver: SchemaResolver<T>, args: T,
                      setter: Setter<string | undefined>, localizer?: ErrorMessageLocalizer) => {
    return new DataValidator(store, resolver(args), setter, localizer)
  }

  /**
   * Generates an event to perform validation.
   * @param value the validated value.
   */
  sendValidationEvent = (value: any) => {
    this.#subject.next(value)
  }

  /**
   * Performs a validation of the value.
   * @param value the validated value.
   * @returns the Promise with the result of the validation.
   */
  validate = (value: any) => {
    const promise = new Promise<string | undefined>(resolve => {
      const subscribe = this.#stream.subscribe(next => {
        resolve(next)
        subscribe.unsubscribe()
      })
    })
    this.sendValidationEvent(value)
    return promise
  }

  /**
   * Releases allocated resources, must be used when destroying an object instance.
   */
  dispose = () => {
    this.#subscriptions.forEach(s => s.unsubscribe())
  }
}
