import {debounceTime, map, Subject, switchMap} from 'rxjs'
import type {IStore} from '../../../stores/IStore'
import type {Setter} from '../../../types'
import type {ValidationResult} from '../types/ValidationResult'

/**
 * A function that localizes validation error messages.
 */
export type ErrorMessageLocalizer = (value: ValidationResult[] | undefined) => string | undefined

/**
 * The function that validates a value and returns the validation result.
 */
export type ResolvedValidator = (value: any, store: IStore) => Promise<ValidationResult[] | undefined>

/**
 * The validation function factory.
 */
export type SchemaResolver<T> = (value: T) => ResolvedValidator

function concatErrorMessages(value: ValidationResult[] | undefined) {
  if (!value) return undefined
  return value?.map(result => result.message ?? `Validation failed: ${result.settings.key}`)
    .join('; ')
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

  static create = <T>(store: IStore, resolver: SchemaResolver<T>, args: T, setter: Setter<string | undefined>) => {
    return new DataValidator(store, resolver(args), setter)
  }

  sendValidationEvent = (value: any) => {
    this.#subject.next(value)
  }

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

  dispose = () => this.#subscriptions.forEach(s => s.unsubscribe())
}
