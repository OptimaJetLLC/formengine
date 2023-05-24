import {makeAutoObservable} from 'mobx'
import {Store} from '../../../stores/Store'
import {Field} from './Field'

export class Form {
  readonly fields = new Map<string, Field>()
  state: Record<string, any> = {}

  constructor(readonly store: Store) {
    makeAutoObservable(this, {
      fields: true,
    })
  }

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

  get errors() {
    const result: Record<string, unknown> = {}
    for (const [key, field] of this.fields) {
      if (field.error) result[key] = field.error
    }
    return result
  }

  setAllErrors(message?: string) {
    this.fields.forEach(f => f.error = message)
  }

  get(key: string) {
    return this.fields.get(key)
  }

  validate() {
    this.fields.forEach(f => f.validate())
  }

  reset() {
    this.fields.forEach(f => f.reset())
  }

  clear() {
    this.fields.forEach(f => f.clear())
  }
}

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
