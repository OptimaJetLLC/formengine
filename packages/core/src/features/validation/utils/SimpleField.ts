import {autorun, makeAutoObservable, observable, untracked} from 'mobx'
import type {ComponentStore} from '../../../stores/ComponentStore'
import {needRender} from '../../../utils/needRender'
import {nameAutorun, nameObservable} from '../../../utils/observableNaming'
import type {Model} from '../../define'
import type {SchemaType} from '../types/SchemaType'
import type {ValidationMessages} from '../types/ValidationResult'
import {autoConvertField} from './autoConvertField'
import {dataPart} from './dataPart'
import type {DataValidator} from './DataValidator'
import type {Disposer} from './Disposer'
import type {Field} from './Field'
import type {FieldType} from './FieldType'
import type {IDataContext} from './IDataContext'

/**
 * Field with form data, contains only one value. **Internal use only.**
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
   * @param dataContext the data context for this field.
   * @param componentStore the component settings.
   * @param model the component metadata for the form viewer.
   * @param deferFieldCalculation if true, then the calculated field must be explicitly initialized.
   */
  constructor(
    readonly dataContext: IDataContext,
    readonly componentStore: ComponentStore,
    readonly model: Model,
    public deferFieldCalculation: boolean,
  ) {
    if (!model.valued) throw new Error(`'model.valued' is falsy`)
    if (!model.valueType) throw new Error(`'model.typeOfValue' is undefined`)
    this.valued = model.valued
    this.valueType = model.valueType

    const className = 'SimpleField'

    makeAutoObservable(this, {
      model: false,
      dataValidator: observable.ref,
      dataContext: observable.ref
    }, {name: nameObservable(className, {key: componentStore.key}), autoBind: true})

    this.#disposers = [
      autorun(
        () => {
          this.dataValidator = this.dataContext.createDataValidator(
            componentStore,
            this.valueType,
            error => this.error = error
          )
          untracked(() => {
            this.#oldDataValidator?.dispose()
            this.#oldDataValidator = this.dataValidator
          })
        }
        , {name: nameAutorun(className, 'setValidator', {key: componentStore.key})}),
      autorun(
        () => {
          const initialData = dataPart(this.dataContext.initialData, componentStore.key)
          const simpleValue = initialData ?? this.initialValue
          if (this.deferFieldCalculation) {
            this.value = simpleValue
            return
          }
          const [calculated, value] = this.dataContext.calculateValue(componentStore, this.valued)
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
  get fieldType(): FieldType {
    return 'simple'
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
  async getValidationResult() {
    if (!this.needValidate) return
    const result = await this.dataValidator?.getValidationResult?.(this.value)
    return result?.map(({message}) => message) as ValidationMessages
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
    return needRender(this.componentStore, this.dataContext.dataRoot)
  }

  /**
   * Clears the error message for this field.
   */
  clearError() {
    this.error = undefined
  }

  /**
   * Sets the error value.
   * @param error the error value to be set. If the error is `undefined` or `null`, the error value will be reset to `undefined`.
   * @throws {Error} throws an error if the provided value is not a string, undefined, or null.
   */
  setError = (error: unknown) => {
    if (typeof error === 'string') {
      this.error = error
    } else if (typeof error === 'undefined' || error === null) {
      this.error = undefined
    } else {
      throw new Error(`Expected 'string | undefined | null' type, got '${typeof error}'`)
    }
  }
}
