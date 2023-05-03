import {autorun, makeAutoObservable} from 'mobx'
import {ComponentStore} from '../../../stores/ComponentStore'
import {Store} from '../../../stores/Store'
import {Model} from '../../define'
import {FormViewerProps} from '../../form-viewer'
import {parseSchema} from './parseSchema'

export class Field {
  readonly #props: Readonly<FormViewerProps>

  error?: string
  touched = false
  value: unknown = undefined
  valued: string

  constructor(
    readonly store: Store,
    props: Readonly<FormViewerProps>,
    readonly key: string,
    readonly model: Model,
    readonly valueCalculator: (component: ComponentStore, key: string) => [boolean, any?]
  ) {
    this.#props = props
    if (!model.valued) throw new Error(`'model.valued' is falsy`)
    this.valued = model.valued

    makeAutoObservable(this, {
      model: false,
      valueCalculator: false
    })

    const disposer = autorun(() => {
      const component = this.store.findComponent(this.key)
      if (!component) {
        // dispose async
        setTimeout(() => disposer(), 0)
        return
      }

      const [calculated, value] = this.valueCalculator(component, this.valued)
      if (calculated) {
        this.value = value
        return
      }
      this.value = this.#props.data?.[component.key] ?? this.initialValue
    })
  }

  get schema() {
    // if data contains a component that is not on the form
    if (!this.store.findComponent(this.key)) return
    return parseSchema(this.componentStore.schema)
  }

  get initialValue() {
    return this.componentStore.props[this.valued]?.value ?? this.model.defaultProps?.[this.valued]
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
      .then(() => {
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
