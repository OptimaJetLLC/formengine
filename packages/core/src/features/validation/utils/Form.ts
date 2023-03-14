import {makeAutoObservable, observable} from 'mobx'
import {ComponentStore} from '../../../stores/ComponentStore'
import {Store} from '../../../stores/Store'
import {calculatePropertyValue} from '../../calculation/propertyCalculator'
import {Model} from '../../define'
import {Field} from './Field'

export class Form {
  fields = new Map<string, Field>()
  state: Record<string, any> = {}

  constructor(readonly store: Store) {
    makeAutoObservable(this, {
      fields: true,
      state: observable.deep
    })
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
      field = new Field(this.store, componentStore.key, model.valuedAn, this.#updateFnValue)
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

  #updateFnValue(component: ComponentStore, key: string): [boolean, any?] {
    const property = component.props[key]
    if (property && property.useFn) {
      const value = calculatePropertyValue(property, this)
      return [true, value]
    }
    return [false]
  }

}
