import {autorun, makeAutoObservable} from 'mobx'
import {ComponentStore} from '../../../stores/ComponentStore'
import {calculatePropertyValue} from '../../../utils/propertyCalculator'
import {Annotation} from '../../annotation/utils/annotations/Annotation'
import {Form} from './Form'
import {parseSchema} from './parseSchema'

export class Field {
  error?: string
  touched = false
  value: unknown = undefined

  get schema() {
    return parseSchema(this.componentStore.schema, this.valuedAn)
  }

  get initialValue() {
    return this.componentStore.props[this.valuedAn.key]?.value ?? this.valuedAn.schema?.getDefault()
  }

  get componentStore() {
    return this.form.store.getComponent(this.key)
  }

  get autoTransform() {
    return this.componentStore.schema?.autoTransform
  }

  constructor(
    readonly form: Form,
    readonly key: string,
    readonly valuedAn: Annotation
  ) {
    makeAutoObservable(this, {
      valuedAn: false
    })
    const disposer = autorun(() => {
      const component = this.form.store.findComponent(this.key)
      if (!component) {
        // dispose async
        setTimeout(() => disposer(), 0)
        return
      }

      if (this.updateFnValue(component)) {
        return
      }

      this.value = this.form.store.props.data?.[component.key] ?? this.initialValue
    })
  }

  updateFnValue(component: ComponentStore) {
    const property = component.props[this.valuedAn.key]
    if (property && property.useFn) {
      this.value = calculatePropertyValue(component, property, this.form)
      return true
    }
    return false
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
