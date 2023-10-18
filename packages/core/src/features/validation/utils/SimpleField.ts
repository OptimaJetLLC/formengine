import {autorun, makeAutoObservable, observable, untracked} from 'mobx'
import {ComponentStore} from '../../../stores/ComponentStore'
import type {FormViewerValidationRules} from '../../../stores/FormViewerValidationRules'
import type {IStore} from '../../../stores/IStore'
import {needRender} from '../../../utils/needRender'
import {nameAutorun, nameObservable} from '../../../utils/observableNaming'
import {Model} from '../../define'
import type {SchemaType} from '../types/SchemaType'
import {autoConvertField} from './autoConvertField'
import {DataValidator} from './DataValidator'
import {Field} from './Field'
import {typedValidatorsResolver} from './validatorsResolver'

/**
 * Type for the function that disposes resources.
 */
export type Disposer = () => void

/**
 * Field with form data, contains only one value.
 */
export class SimpleField implements Field {

  #oldDataValidator?: DataValidator

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
   * The type of the field value.
   */
  valueType: SchemaType
  dataValidator?: DataValidator
  readonly #disposers: Disposer[]

  /**
   * Creates the field with form data for the component.
   * @param store the form viewer settings.
   * @param componentStore the component settings.
   * @param model the component metadata for the form viewer.
   * @param valueCalculator the function to get a calculated value for the field.
   * @param getValidationRules the function to get validation rules for the field.
   * @param deferFieldCalculation if true, then the calculated field must be explicitly initialized.
   */
  constructor(
    readonly store: IStore,
    readonly componentStore: ComponentStore,
    readonly model: Model,
    readonly valueCalculator: (component: ComponentStore, key: string) => [boolean, any?],
    readonly getValidationRules: (valueType: SchemaType) => FormViewerValidationRules,
    public deferFieldCalculation: boolean,
  ) {
    if (!model.valued) throw new Error(`'model.valued' is falsy`)
    if (!model.valueType) throw new Error(`'model.typeOfValue' is undefined`)
    this.valued = model.valued
    this.valueType = model.valueType

    const className = 'SimpleField'

    makeAutoObservable(this, {
      model: false,
      valueCalculator: false,
      dataValidator: observable.ref
    }, {name: nameObservable(className, {key: componentStore.key})})

    this.#disposers = [
      autorun(
        () => {
          this.dataValidator = DataValidator.create(
            store,
            typedValidatorsResolver(this.getValidationRules(this.valueType)),
            componentStore.schema,
            error => this.error = error,
            store.localizeErrorMessages.bind(store, componentStore))
          untracked(() => {
            this.#oldDataValidator?.dispose()
            this.#oldDataValidator = this.dataValidator
          })
        }
        , {name: nameAutorun(className, 'setValidator', {key: componentStore.key})}),
      autorun(
        () => {
          const simpleValue = store.initialDataSlice?.[componentStore.key] ?? this.initialValue
          if (this.deferFieldCalculation) {
            this.value = simpleValue
            return
          }
          const [calculated, value] = this.valueCalculator(componentStore, this.valued)
          if (calculated) {
            this.value = value
            return
          }
          this.value = simpleValue
        }
        , {name: nameAutorun(className, 'setValue', {'key': componentStore.key})}),
      () => this.dataValidator?.dispose()
    ]
  }

  /**
   * @inheritDoc
   */
  init() {
    this.deferFieldCalculation = false
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
    this.value = autoConvertField(value, this.valueType)
    if (!this.needValidate) {
      this.clearError()
      return
    }
    if (this.componentStore.schema?.autoValidate !== false) {
      this.dataValidator?.sendValidationEvent?.(this.value)
    }
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
    if (!this.needValidate) {
      this.clearError()
      return
    }
    await this.dataValidator?.validate?.(this.value)
  }

  /**
   * @inheritDoc
   */
  reset() {
    this.value = this.initialValue ?? this.defaultValue
    this.clearError()
  }

  /**
   * @inheritDoc
   */
  clear() {
    this.value = this.defaultValue
    this.touched = false
    this.clearError()
  }

  /**
   * @returns true if the field should be validated, false otherwise.
   */
  get needValidate() {
    return needRender(this.componentStore, this.store.form.componentTree)
  }

  /**
   * Clears the error message for this field.
   */
  clearError() {
    this.error = undefined
  }

  /**
   * @inheritDoc
   */
  setError = (error: unknown) => {
    if (typeof error !== 'string') {
      throw new Error(`Expected 'string' type, got '${typeof error}'`)
    }
    this.error = error
  }
}
