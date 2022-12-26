import {makeAutoObservable} from 'mobx'
import {ComponentStore} from '../../../stores/ComponentStore'
import {Store} from '../../../stores/Store'
import {Annotation} from '../../annotation/utils/annotations/Annotation'
import {Model} from '../../define'
import {Field} from './Field'

export class Form {
  fields = new Map<string, Field>()

  constructor(readonly store: Store) {
    makeAutoObservable(this)
  }

  get data() {
    let result: Record<string, unknown> = {}
    for (let [key, field] of this.fields) {
      result[key] = field.value
    }
    return result
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

  set(componentStore: ComponentStore, model: Model<any>) {
    if (!model.valuedAn) return

    let field = this.fields.get(componentStore.key)
    if (!field) {
      field = new Field(this, componentStore.key, model.valuedAn)
      this.fields.set(componentStore.key, field)
    }
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
