import {autorun, makeAutoObservable, observable, runInAction, untracked} from 'mobx'
import {ComponentStore} from '../../../stores/ComponentStore'
import type {FormViewerValidationRules} from '../../../stores/FormViewerValidationRules'
import type {IStore} from '../../../stores/IStore'
import type {Setter} from '../../../types'
import {isRecord} from '../../../utils'
import type {ComponentData, IComponentDataProvider} from '../../../utils/contexts/ComponentDataContext'
import {needRender} from '../../../utils/needRender'
import {nameAutorun, nameObservable} from '../../../utils/observableNaming'
import type {Model} from '../../define'
import type {SchemaType} from '../types/SchemaType'
import type {SchemaTypeMap} from '../types/SchemaTypeMap'
import type {ValidationMessages} from '../types/ValidationResult'
import {calculateProperty} from './calculateProperty'
import {dataPart} from './dataPart'
import {DataValidator} from './DataValidator'
import type {Disposer} from './Disposer'
import type {Field} from './Field'
import type {FieldType} from './FieldType'
import type {IComponentDataFactory} from './IComponentDataFactory'
import type {IDataContext} from './IDataContext'
import {typedValidatorsResolver} from './validatorsResolver'

/**
 * Field with repeater data. **Internal use only.**
 */
export class RepeaterField implements Field, IComponentDataProvider {

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
  valued: string
  /**
   * The type of the field value.
   */
  valueType: SchemaType
  dataValidator?: DataValidator
  readonly #disposers: Disposer[]

  initialData: unknown

  /**
   * Creates the field with repeater data for the component.
   * @param dataContext the context for working with data.
   * @param componentDataFactory the factory for creating ComponentData instances.
   * @param store the form viewer settings.
   * @param getValidationRules the function to get the validation rules.
   * @param componentStore the component settings.
   * @param model the component metadata for the form viewer.
   * @param deferFieldCalculation if true, then the calculated field must be explicitly initialized.
   */
  constructor(
    readonly dataContext: IDataContext,
    readonly componentDataFactory: IComponentDataFactory,
    readonly store: IStore,
    readonly getValidationRules: (type: SchemaType) => FormViewerValidationRules,
    readonly componentStore: ComponentStore,
    readonly model: Model,
    public deferFieldCalculation: boolean,
  ) {
    if (!model.valued) throw new Error(`'model.valued' is falsy`)
    if (!model.valueType) throw new Error(`'model.typeOfValue' is undefined`)
    this.valued = model.valued
    this.valueType = model.valueType

    const className = 'RepeaterField'

    makeAutoObservable(this, {
      model: false,
      dataValidator: observable.ref
    }, {name: nameObservable(className, {key: componentStore.key}), autoBind: true})

    this.#disposers = [
      autorun(
        () => {
          this.dataValidator = this.dataContext.createDataValidator(
            componentStore,
            this.valueType,
            error => this.error = error,
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
            this.initialData = simpleValue
            return
          }
          const [calculated, value] = this.dataContext.calculateValue(componentStore, this.valued)
          if (calculated) {
            this.initialData = value
            return
          }
          this.initialData = simpleValue
        }
        , {name: nameAutorun(className, 'setValue', {'key': componentStore.key})}),
      () => this.dataValidator?.dispose()
    ]
  }

  /**
   * @inheritDoc
   */
  get fieldType(): FieldType {
    return 'repeater'
  }

  /**
   * @inheritDoc
   */
  init() {
    this.deferFieldCalculation = false
    this.initFields(this.componentData)
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
  get value() {
    const result: any[] = []
    this.componentData.forEach(cd => {
      result.push(cd.data)
    })
    return result
  }

  /**
   * @inheritDoc
   */
  setValue(value: unknown) {
    if (value === null || typeof value === 'undefined' || Array.isArray(value)) {
      this.initialData = value
      return
    }
    // todo implement, autoValidate is not working correctly
    // if (this.componentStore.schema?.autoValidate !== false) {
    //   this.dataValidator?.sendValidationEvent?.(this.value)
    // }
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
    const promises = this.componentData.map(cd => cd.validate())
    await Promise.allSettled(promises)
    await this.dataValidator?.validate?.(this.value)
  }

  /**
   * @inheritDoc
   */
  async getValidationResult() {
    if (!this.needValidate) return
    const result: ValidationMessages[] = []
    for (let i = 0; i < this.componentData.length; i++) {
      const cd = this.componentData[i]
      const messages = await cd.getValidationResult()
      result.push(messages)
    }
    return result
    // await this.dataValidator?.getValidationResult?.(this.value)
    // return this.getRepeaterError(result)
    // return {
    //   [this.componentStore.key]: result,
    //   [this.errorFieldName]: this.error
    // }
  }

  /**
   * @inheritDoc
   */
  reset() {
    this.setValue(this.initialValue)
    this.componentData.forEach(cd => {
      cd.fields.forEach(field => field.reset())
    })
    this.clearError()
  }

  /**
   * @inheritDoc
   */
  clear() {
    this.setValue(this.defaultValue)
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
    this.componentData.forEach(cd => {
      cd.fields.forEach(field => field.setError(undefined))
    })
  }

  /**
   * @inheritDoc
   */
  get errors() {
    let hasErrors = false
    const result: Array<Record<string, unknown>> = []
    this.componentData.forEach(cd => {
      result.push(cd.errors)
      hasErrors = hasErrors || cd.hasErrors
    })
    if (!hasErrors && this.error) return
    return result
  }

  /**
   * @inheritDoc
   */
  setError = (error: unknown) => {
    if (typeof error === 'undefined' || error === null) {
      this.clearError()
      return
    }

    if (!isRecord(error)) throw new Error(`Expected 'object' type, got '${typeof error}'`)

    this.error = error[this.errorFieldName] as string

    const itemErrors = error[this.componentStore.key] as Array<Record<string, unknown>>
    this.componentData.forEach((cd, index) => {
      const item = itemErrors?.[index]
      cd.fields.forEach((field, name) => field.setError(item?.[name]))
    })
  }

  /**
   * @returns the component settings for the RepeaterItem component.
   */
  get repeaterItemStore() {
    const componentStore = JSON.parse(JSON.stringify(this.componentStore))
    const repeaterItem = new ComponentStore(this.componentStore.key, 'RepeaterItem')
    repeaterItem.type = 'RepeaterItem'
    repeaterItem.children = componentStore.children
    repeaterItem.renderWhen = componentStore.props?.itemRenderWhen
    return repeaterItem
  }

  /**
   * @returns the number of elements in the repeater.
   */
  get itemsCount() {
    if (!this.initialData || !Array.isArray(this.initialData)) return 0
    return this.initialData.length
  }

  /**
   * @inheritDoc
   */
  get componentData(): ComponentData[] {
    // read memoized values before performing an action
    const itemsCount = this.itemsCount
    const originalStore = this.repeaterItemStore
    const repeaterKey = this.componentStore.key

    return runInAction(() => {
      const result: ComponentData[] = []
      for (let i = 0; i < itemsCount; i++) {
        // first, create an element that will be the parent for the context
        const contextStore = new ComponentStore(`${repeaterKey}-context-item-${i}`, 'Fragment')
        const contextData = this.componentDataFactory.createComponentData(contextStore, false)
        contextData.index = i
        contextData.parent = this.dataContext.dataRoot

        // then we create a data context
        const repeaterFormContext = new RepeaterFormContext(this, this.store, this.getValidationRules, this.dataContext, contextData, i)

        // now create the root element of the inner form, it is necessary for correct work of itemRenderWhen property
        const rootStore = new ComponentStore(`${repeaterKey}-root-item-${i}`, 'Fragment')
        const rootData = this.componentDataFactory.createComponentData(rootStore, false, undefined, repeaterFormContext)
        rootData.setParent(contextData)

        // finally create a repeater element
        const cs = ComponentStore.createFromObject(originalStore)
        cs.key = `${repeaterKey}-item-${i}`
        const repeaterItem = this.componentDataFactory.createComponentData(cs, true, undefined, repeaterFormContext)
        repeaterItem.setParent(rootData)

        result.push(contextData)
      }
      if (!this.deferFieldCalculation) this.initFields(result)
      return result
    })
  }

  private initFields(components: ComponentData[]) {
    components.map(cd => {
      cd.fields.forEach(field => field.init())
    })
  }

  private get errorFieldName() {
    return `${this.componentStore.key}Error`
  }
}

/**
 * The context for the RepeaterField. **Internal use only.**
 */
export class RepeaterFormContext implements IDataContext {

  /**
   * Creates the context for the RepeaterField.
   * @param repeaterField the RepeaterField instance.
   * @param store the form viewer settings.
   * @param getValidationRules the function to get the validation rules.
   * @param parentContext the parent data context.
   * @param root the root component data.
   * @param index the index of the current item in the repeater.
   */
  constructor(readonly repeaterField: RepeaterField,
              readonly store: IStore,
              readonly getValidationRules: (type: SchemaType) => FormViewerValidationRules,
              readonly parentContext: IDataContext,
              readonly root: ComponentData,
              readonly index: number) {
  }

  /**
   * @inheritDoc
   */
  get initialData() {
    const initialData = this.repeaterField.initialData
    if (Array.isArray(initialData)) return initialData[this.index]
    return undefined
  }

  /**
   * @inheritDoc
   */
  calculateValue(component: ComponentStore, key: string) {
    return calculateProperty(
      component,
      key,
      this.dataRoot,
      (type, componentStore) => this.store.localizeComponent(type, this.dataRoot, componentStore)
    )
  }

  /**
   * @inheritDoc
   */
  get dataRoot(): ComponentData {
    return this.root
  }

  /**
   * @inheritDoc
   */
  createDataValidator(componentStore: ComponentStore, valueType: keyof SchemaTypeMap, onError: Setter<string | undefined>) {
    const validationRules = this.getValidationRules(valueType)
    return DataValidator.create(
      this.store,
      typedValidatorsResolver(validationRules),
      componentStore.schema,
      onError,
      this.store.localizeErrorMessages.bind(this.store, this.dataRoot, componentStore)
    )
  }
}
