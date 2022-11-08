import {assign} from 'lodash'
import {makeAutoObservable} from 'mobx'
import {Field} from './Field'

export class Form {
  fields = new Map<string, Field>()

  constructor() {
    makeAutoObservable(this)
  }

  get data() {
    let result: Record<string, unknown> = {}
    for (let [key, field] of this.fields) {
      result[key] = field.value
    }
    return result
  }

  set data(data) {
    for (let [key, value] of Object.entries(data)) {
      let field = this.set(key, {value})
      field.initialValue ??= value
    }
  }

  get errors() {
    let result: Record<string, unknown> = {}
    for (let [key, field] of this.fields) {
      if (field.error) result[key] = field.error
    }
    return result
  }

  get(key: string) {
    return this.fields.get(key)
  }

  set(key: string, props: Partial<Field>) {
    let field = this.fields.get(key)
    if (!field) {
      field = new Field(this)
      this.fields.set(key, field)
    }

    assign(field, props)
    return field
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
