import {autorun, makeAutoObservable, observable} from 'mobx'
import {ComponentStore} from '../../../stores/ComponentStore'
import {Store} from '../../../stores/Store'
import {nameAutorun, nameObservable} from '../../../utils/observableNaming'
import {Model} from '../../define'
import type {FormViewerProps} from '../../form-viewer'
import {DataValidator} from './DataValidator'
import {Field} from './Field'
import {validatorsResolver} from './validatorsResolver'

/**
 * Type for the function that disposes resources.
 */
export type Disposer = () => void

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
  dataValidator?: DataValidator
  readonly #disposers: Disposer[]

  /**
   * Creates the field with form data for the component.
   * @param store the form viewer settings.
   * @param props the form viewer React component properties.
   * @param componentStore the component settings.
   * @param model the component metadata for the form viewer.
   * @param valueCalculator the function to get a calculated value for the field.
   */
  constructor(
    readonly store: Store,
    props: Readonly<FormViewerProps>,
    readonly componentStore: ComponentStore,
    readonly model: Model,
    readonly valueCalculator: (component: ComponentStore, key: string) => [boolean, any?]
  ) {
    if (!model.valued) throw new Error(`'model.valued' is falsy`)
    this.valued = model.valued

    const className = 'SimpleField'

    makeAutoObservable(this, {
      model: false,
      valueCalculator: false,
      dataValidator: observable.ref
    }, {name: nameObservable(className, {key: componentStore.key})})

    this.#disposers = [
      autorun(
        () => this.dataValidator = DataValidator.create(
          store,
          validatorsResolver,
          componentStore.schema,
          error => this.error = error)
        , {name: nameAutorun(className, 'setValidator', {key: componentStore.key})}),
      autorun(
        () => {
          const [calculated, value] = this.valueCalculator(componentStore, this.valued)
          if (calculated) {
            this.value = value
            return
          }
          this.value = props.data?.[componentStore.key] ?? this.initialValue
        }
        , {name: nameAutorun(className, 'setValue', {'key': componentStore.key})}),
      () => this.dataValidator?.dispose()
    ]
  }

  /**
   * @returns the initial value for the field.
   */
  get initialValue() {
    return this.componentStore.props[this.valued]?.value ?? this.defaultValue
  }

  /**
   * @returns the default value for the field.
   */
  get defaultValue() {
    return this.model.defaultProps?.[this.valued]
  }

  /**
   * @inheritDoc
   */
  dispose() {
    this.#disposers.forEach(dispose => dispose())
  }

  /**
   * @inheritDoc
   */
  setValue(value: unknown) {
    //TODO Transformation
    //this.value = (this.autoTransform && this.schema?.parse(value)) || value
    this.value = value
    if (this.componentStore.schema?.autoValidate !== false) this.validate()
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
  async validate() {
    await this.dataValidator?.validate?.(this.value)
  }

  /**
   * @inheritDoc
   */
  reset() {
    this.value = this.initialValue ?? this.defaultValue
    this.error = undefined
  }

  /**
   * @inheritDoc
   */
  clear() {
    this.value = this.defaultValue
    this.touched = false
    this.error = undefined
  }
}
