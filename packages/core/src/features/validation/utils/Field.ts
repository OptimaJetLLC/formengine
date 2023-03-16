import {autorun, makeAutoObservable} from 'mobx'
import {ComponentStore} from '../../../stores/ComponentStore'
import {Store} from '../../../stores/Store'
import {Annotation} from '../../annotation/types/annotations/Annotation'
import {parseSchema} from './parseSchema'

export class Field {
  error?: string
  touched = false
  value: unknown = undefined

  constructor(
    readonly store: Store,
    readonly key: string,
    readonly valuedAn: Annotation,
    readonly valueCalculator: (component: ComponentStore, key: string) => [boolean, any?]
  ) {
    makeAutoObservable(this, {
      valuedAn: false,
      valueCalculator: false
    })
    const disposer = autorun(() => {
      const component = this.store.findComponent(this.key)
      if (!component) {
        // dispose async
        setTimeout(() => disposer(), 0)
        return
      }

      const [calculated, value] = this.valueCalculator(component, this.valuedAn.key)
      if (calculated) {
        this.value = value
        return
      }

      this.value = this.store.props.data?.[component.key] ?? this.initialValue
    })
  }

  get schema() {
    return parseSchema(this.componentStore.schema, this.valuedAn)
  }

  get initialValue() {
    return this.componentStore.props[this.valuedAn.key]?.value ?? this.valuedAn.schema?.getDefault()
  }

  get componentStore() {
    return this.store.getComponent(this.key)
  }

  get autoTransform() {
    return this.componentStore.schema?.autoTransform
  }

  setValue(value: unknown) {
    this.value = (this.autoTransform && this.schema?.cast(value)) || value
    this.validate()
  }

  setTouched() {
    this.touched = true
  }

  validate() {
    this.schema?.validate(this.value)
      .then(value => {
        return this.error = undefined
      })
      .catch(reason => {
        return this.error = reason.errors[0]
      })
  }

  reset() {
    this.value = this.initialValue ?? this.schema?.getDefault()
  }

  clear() {
    this.value = this.schema?.getDefault()
    this.touched = false
    this.error = undefined
  }
}
