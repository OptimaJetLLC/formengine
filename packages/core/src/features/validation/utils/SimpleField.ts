import {autorun, makeAutoObservable} from 'mobx'
import {ComponentStore} from '../../../stores/ComponentStore'
import {Store} from '../../../stores/Store'
import {Model} from '../../define'
import {FormViewerProps} from '../../form-viewer'
import {Field} from './Field'
import {parseSchema} from './parseSchema'

/**
 * Field with form data, contains only one value.
 */
export class SimpleField implements Field {

  /**
   * @inheritDoc
   */
  error?: string

  /**
   * @inheritDoc
   */
  touched = false

  /**
   * @inheritDoc
   */
  value: unknown = undefined

  /**
   * @inheritDoc
   */
  valued: string

  /**
   * Creates the field with form data for the component.
   * @param store the form viewer settings.
   * @param props the form viewer React component properties.
   * @param key the component key.
   * @param model the component metadata for the form viewer.
   * @param valueCalculator the function to get a calculated value for the field.
   */
  constructor(
    readonly store: Store,
    props: Readonly<FormViewerProps>,
    readonly key: string,
    readonly model: Model,
    readonly valueCalculator: (component: ComponentStore, key: string) => [boolean, any?]
  ) {
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
      this.value = props.data?.[component.key] ?? this.initialValue
    })
  }

  /**
   * @returns the validation scheme for the field data.
   */
  get schema() {
    // if data contains a component that is not on the form
    if (!this.store.findComponent(this.key)) return
    return parseSchema(this.componentStore.schema)
  }

  /**
   * @returns the initial value for the field.
   */
  get initialValue() {
    return this.componentStore.props[this.valued]?.value ?? this.model.defaultProps?.[this.valued]
  }

  /**
   * @returns the component settings for the field.
   */
  get componentStore() {
    return this.store.getComponent(this.key)
  }

  /**
   * @returns true if the field can be automatically transformed.
   * @internal
   */
  get autoTransform() {
    return this.componentStore.schema?.autoTransform
  }

  /**
   * @inheritDoc
   */
  setValue(value: unknown) {
    this.value = (this.autoTransform && this.schema?.cast(value)) || value
    this.validate()
  }

  /**
   * @inheritDoc
   */
  setTouched() {
    this.touched = true
  }

  /**
   * @inheritDoc
   */
  validate() {
    this.schema?.validate(this.value)
      .then(() => {
        return this.error = undefined
      })
      .catch(reason => {
        return this.error = reason.errors[0]
      })
  }

  /**
   * @inheritDoc
   */
  reset() {
    this.value = this.initialValue ?? this.schema?.getDefault()
    this.error = undefined
  }

  /**
   * @inheritDoc
   */
  clear() {
    this.value = this.schema?.getDefault()
    this.touched = false
    this.error = undefined
  }
}
