import {FluentVariable} from '@fluent/bundle/esm/bundle.js'
import {makeAutoObservable} from 'mobx'
import {Store} from '../../../stores/Store'
import {getFluentCompatibleId} from '../../localization/getFluentCompatibleId'
import {isFluentVariable} from '../../localization/isFluentVariable'
import {Field} from './Field'

// todo rename to FormData
/**
 * Form data.
 */
export class Form {
  readonly fields = new Map<string, Field>()
  state: Record<string, any> = {}

  /**
   * Creates an object with form data.
   * @param store the form viewer settings.
   */
  constructor(readonly store: Store) {
    makeAutoObservable(this, {
      fields: true,
    })
  }

  /**
   * @returns the {@link Record} with all the form data.
   */
  get data() {
    const result: Record<string, unknown> = {}
    for (const [key, field] of this.fields) {
      if (field.storeDataInParentForm) {
        const fieldValue: Record<string, any> = field.value || {}
        Object.keys(fieldValue).forEach(i => result[i] = fieldValue[i])
      } else {
        result[key] = field.value
      }
    }
    return result
  }

  /**
   * @returns all the form data that is of the {@link FluentVariable} type.
   * Additionally, the keys of the returned object are converted to the snake case.
   */
  get fluentData() {
    const fluentData: Record<string, FluentVariable> = {}
    for (const [key, value] of Object.entries(this.data)) {
      if (isFluentVariable(value)) {
        fluentData[getFluentCompatibleId(key)] = value
      }
    }
    return fluentData
  }

  /**
   * @returns the {@link Record} with all validation error messages.
   */
  get errors() {
    const result: Record<string, unknown> = {}
    for (const [key, field] of this.fields) {
      if (field.error) result[key] = field.error
    }
    return result
  }

  /**
   * Releases allocated resources, must be used when destroying an object instance.
   */
  dispose() {
    this.fields.forEach(f => f.dispose())
  }

  /**
   * Sets the validation error message for all form data fields.
   * @param message the validation error message.
   */
  setAllErrors(message?: string) {
    this.fields.forEach(f => f.error = message)
  }

  /**
   * Returns the form data field.
   * @param key the key of the form data field.
   * @returns the form data field, undefined, if the form data field is not found.
   */
  get(key: string) {
    return this.fields.get(key)
  }

  /**
   * Validates the data in the form.
   */
  async validate() {
    await Promise.allSettled([...this.fields.values()].map(f => f.validate()))
  }

  /**
   * Sets the form to its default value.
   */
  reset() {
    this.fields.forEach(f => f.reset())
  }

  /**
   * Clears the form data.
   */
  clear() {
    this.fields.forEach(f => f.clear())
  }
}

/**
 * Description of the form type for the code editor.
 */
export const FormDeclaration = `declare class Form {
  fields: Map<string, Field>
  readonly store: Store

  get data(): Record<string, unknown>

  get errors(): Record<string, unknown>
  
  setAllErrors(message?: string)

  get(key: string): Field

  validate(): void

  reset(): void

  clear(): void
}`
