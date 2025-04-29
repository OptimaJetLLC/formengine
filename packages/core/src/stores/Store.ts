import {assign} from 'lodash-es'
import {makeObservable, observable} from 'mobx'
import type {Model} from '../features/define'
import type {ActionData, ActionDefinition, ActionType} from '../features/event'
import {createActionValuesFromObject} from '../features/event'
import {commonActions} from '../features/event/consts/actions'
import type {IFormViewer} from '../features/form-viewer'
import {globalDefaultLanguage} from '../features/localization/default'
import {localizeErrorMessage, localizeProperties} from '../features/localization/localizer'
import {Language} from '../features/localization/types'
import {createTemplateModel} from '../features/template'
import {buildInternalErrorModel, buildInternalErrorStore} from '../features/ui/internalErrorModel'
import {screenModel} from '../features/ui/screenModel'
import {getTemplateName, isTemplateType} from '../features/ui/templateUtil'
import type {SchemaType} from '../features/validation'
import {DataValidator} from '../features/validation'
import type {ValidationResult} from '../features/validation/types/ValidationResult'
import {calculateProperty} from '../features/validation/utils/calculateProperty'
import {ZodValidationRules} from '../features/validation/utils/consts'
import {dataPart} from '../features/validation/utils/dataPart'
import {getDefaultErrorMessage} from '../features/validation/utils/DataValidator'
import type {IComponentDataFactory} from '../features/validation/utils/IComponentDataFactory'
import type {IDataContext} from '../features/validation/utils/IDataContext'
import {RepeaterField} from '../features/validation/utils/RepeaterField'
import {SimpleField} from '../features/validation/utils/SimpleField'
import {TemplateField} from '../features/validation/utils/TemplateField'
import {isStoreDataInParentForm} from '../features/validation/utils/util'
import {typedValidatorsResolver} from '../features/validation/utils/validatorsResolver'
import type {Setter, ViewMode} from '../types'
import {isNumber, isPromise, isRecord, isString} from '../utils'
import {ComponentData} from '../utils/contexts/ComponentDataContext'
import type {IFormData} from '../utils/IFormData'
import {nameObservable} from '../utils/observableNaming'
import {ComponentStore} from './ComponentStore'
import {Form} from './Form'
import type {FormViewerPropsStore} from './FormViewerPropsStore'
import type {FormViewerValidationRules} from './FormViewerValidationRules'
import type {IComponentState} from './IComponentState'
import type {IStore} from './IStore'
import type {LocalizationType} from './LocalizationStore'
import {LocalizationStore} from './LocalizationStore'
import type {PersistedForm} from './PersistedForm'
import {PersistedFormVersion} from './PersistedForm'

const propertiesToFix: Record<string, string[]> = {
  'RsDatePicker': ['calendarDefaultDate', 'defaultValue', 'value'],
  'RsCalendar': ['defaultValue', 'value'],
}

/**
 * Reduction function type.
 */
type ReduceCallback<U, T> = (accumulator: T, current: U) => T

/**
 * Type for a tree object.
 */
type Tree<T, U extends keyof T> = T & { [K in U]: Tree<T, K>[] | undefined }

function reduceTree<U extends object, T, K extends keyof U>(tree: Tree<U, K>,
                                                            callback: ReduceCallback<Tree<U, K>, T>,
                                                            initialValue: T, childKey: K) {
  let accumulator = callback(initialValue, tree)
  tree[childKey]?.forEach((child: Tree<U, K>) => {
    accumulator = reduceTree(child, callback, accumulator, childKey)
  })
  return accumulator
}

/**
 * The root data context for the form viewer.
 */
class StoreFormContext implements IDataContext {

  /**
   * Create the data context for the store.
   * @param store the store.
   */
  constructor(readonly store: Store) {
  }

  private get dataRoot() {
    return this.store.form.componentTree
  }

  /**
   * @inheritDoc
   */
  get initialData() {
    return this.store.initialDataSlice
  }

  /**
   * @inheritDoc
   */
  createDataValidator(componentStore: ComponentStore, valueType: SchemaType,
                      onError: Setter<string | undefined>) {
    const validationRules = this.store.getValidationRules(valueType)
    return DataValidator.create(
      this.store,
      typedValidatorsResolver(validationRules),
      componentStore.schema,
      onError,
      this.store.localizeErrorMessages.bind(this.store, this.dataRoot, componentStore)
    )
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
}

/**
 * The component state factory that calculates the properties of the form viewer component.
 * @param data the data needed to display the component.
 * @param store the form viewer settings.
 * @returns the component property calculator.
 */
export type ComponentStateFactory = (data: ComponentData, store: Store) => IComponentState

/**
 * The form viewer settings. **Internal use only.**
 */
export class Store implements IStore, IFormViewer, IComponentDataFactory {

  /**
   * The currently selected language.
   */
  selectedLanguage?: Language

  /**
   * Current display resolution type.
   */
  viewMode: ViewMode = 'desktop'

  /**
   * The form.
   */
  form: Form

  /**
   * Models for templates that have not been explicitly defined.
   */
  #templateMap = new Map<string, Model>()

  /**
   * The context for working with data. **Internal use only**.
   */
  dataContext: IDataContext

  /**
   * The loading form error.
   */
  formLoadError?: string

  /**
   * Creates form viewer settings.
   * @param formViewerPropsStore the form viewer store settings.
   * @param componentStateFactory the factory for creating component states.
   * @param parentStore the form viewer settings, used in templates.
   * @param parentComponentStore the parent component settings.
   * @param parentStoreContext the parent store data context.
   */
  constructor(public formViewerPropsStore: FormViewerPropsStore,
              public readonly componentStateFactory: ComponentStateFactory,
              public readonly parentStore?: Store,
              public readonly parentComponentStore?: ComponentStore,
              public readonly parentStoreContext?: IDataContext) {
    const componentTree = this.createComponentData(new ComponentStore(screenModel.name, screenModel.type))
    const localization = new LocalizationStore()
    this.form = new Form(componentTree, localization, {}, [], globalDefaultLanguage)
    this.dataContext = new StoreFormContext(this)

    makeObservable(this, {
      form: observable,
      viewMode: true,
      selectedLanguage: true,
      clear: true,
      parentStore: observable.ref,
      parentComponentStore: observable.ref,
      parentStoreContext: observable.ref,
      initialDataSlice: true,
      formLoadError: true
    }, {name: nameObservable(`ViewerStore`)})
  }

  /**
   * @returns the Record with the common actions.
   */
  get commonActions() {
    return commonActions
  }

  /**
   * Returns an action by the specified action name and action type.
   * @param name the action name.
   * @param type the action type.
   * @returns the action.
   */
  getAction(name: string, type: ActionType) {
    let action: ActionDefinition | undefined = undefined
    switch (type) {
      case 'common':
        action = this.commonActions[name]
        break
      case 'code':
        action = this.form.actions[name]
        break
      case 'custom':
        action = this.formViewerPropsStore.actions?.[name]
        break
    }

    if (!action) throw Error(`Action '${name}' with type '${type}' not found!`)
    return action
  }

  /**
   * @inheritDoc
   */
  get formData() {
    return this.form.componentTree
  }

  /**
   * Clears the form in Form Viewer.
   */
  clear() {
    const oldForm = this.form
    const componentTree = this.createComponentData(new ComponentStore(screenModel.name, screenModel.type))
    const localization = new LocalizationStore()
    this.form = new Form(componentTree, localization, {}, oldForm.languages, oldForm.defaultLanguage)
    oldForm.dispose()
  }

  /**
   * @inheritDoc
   */
  dispose() {
    this.form.dispose()
  }

  /**
   * @inheritDoc
   */
  get initialDataSlice(): unknown {
    if (!this.parentStoreContext || !this.parentComponentStore) return this.formViewerPropsStore.initialData
    const dataSlice = this.parentStoreContext.initialData
    if (isStoreDataInParentForm(this.parentComponentStore)) return dataSlice
    const projection = dataPart(dataSlice, this.parentComponentStore.key)
    return (Array.isArray(projection) || isRecord(projection)) ? projection : undefined
  }

  /**
   * @inheritDoc
   */
  get showAllValidationErrors(): boolean | undefined {
    return this.formViewerPropsStore?.showAllValidationErrors
  }

  /**
   * @inheritDoc
   */
  reduceScreen<T>(callback: (accumulator: T, current: ComponentData) => T, initialValue: T) {
    return reduceTree(this.form.componentTree, callback, initialValue, 'children')
  }

  /**
   * Searches for an action, returns definition for the found action.
   * @param actionData the action's data.
   * @returns the action definition.
   * @throws Error, if action was not found.
   */
  findAction(actionData: ActionData) {
    return this.getAction(actionData.name, actionData.type)
  }

  /**
   * Returns model for the specified type.
   * @param type the component type.
   * @returns the model for the specified type.
   */
  getModel(type: string) {
    const model = this.formViewerPropsStore.view.find(type)
    if (model) return model
    if (isTemplateType(type)) {
      const templateModel = this.#templateMap.get(type)
      return templateModel ?? this.addTemplateModel(type)
    }
    return buildInternalErrorModel(`Type '${type}' is not found!`)
  }

  private addTemplateModel(type: string) {
    // we don't change the view properties to add a template
    const templateName = getTemplateName(type)
    const templateModel = createTemplateModel(templateName)
    this.#templateMap.set(templateModel.type, templateModel)
    return templateModel
  }

  /**
   * Loads a form by form name and sets that form in the form viewer.
   * @param getForm the function that loads the form.
   * @param formName the form name.
   */
  loadForm(getForm?: (name?: string) => string | Promise<string>, formName?: string) {
    if (!getForm) return

    try {
      const form = getForm(formName)
      if (isPromise<string>(form)) {
        form
          .then(this.applyStringForm.bind(this))
          .catch(this.#onLoadError.bind(this))
        return
      }
      this.applyStringForm(form)
    } catch (e) {
      this.#onLoadError(e)
    }
  }

  /**
   * @inheritDoc
   */
  createComponentData(componentStore: ComponentStore, deferFieldCalculation = false, model?: Model,
                      dataContext?: IDataContext): ComponentData {
    dataContext ??= this.dataContext
    model ??= this.getModel(componentStore.type)
    const factory = (cs: ComponentStore) => this.createComponentData(cs, deferFieldCalculation, undefined, dataContext)
    const componentData = new ComponentData(componentStore, model, factory, this.formViewerPropsStore.formValidators)
    componentData.field = this.createField(componentData, dataContext, deferFieldCalculation)
    componentData.componentState = this.componentStateFactory(componentData, this)
    return componentData
  }

  /**
   * Returns the object with validators for the specified value type.
   * @param type the value type.
   * @returns the object with validators for the specified value type.
   */
  getValidationRules(type: SchemaType): FormViewerValidationRules {
    return {
      custom: this.formViewerPropsStore.validators?.[type],
      internal: ZodValidationRules[type]
    }
  }

  private createField(componentData: ComponentData, dataContext: IDataContext,
                      deferFieldCalculation: boolean) {
    const {model, store: componentStore} = componentData
    if (model.kind === 'repeater') {
      return new RepeaterField(componentData, dataContext, this, this, this.getValidationRules.bind(this),
        deferFieldCalculation)
    }

    if (!model.valued) return

    if (!isTemplateType(model.type)) {
      return new SimpleField(componentData, dataContext, deferFieldCalculation)
    }

    const childStore = new Store(this.formViewerPropsStore.clone(), this.componentStateFactory, this, componentStore, dataContext)
    return new TemplateField(componentStore, childStore)
  }

  /**
   * Changes the form to the component with an error description.
   * @param e the error.
   */
  #onLoadError(e: any) {
    console.error(e)
    this.formLoadError = e?.message ?? e
    const componentStore = buildInternalErrorStore(e)
    this.applyPersistedForm({
      form: componentStore,
      localization: {},
      defaultLanguage: globalDefaultLanguage.fullCode,
      languages: []
    })
  }

  /**
   * Populates the value of this store with the values of the saved form.
   * @param text saved form value.
   */
  applyStringForm(text: string) {
    try {
      const persistedForm = JSON.parse(text) as PersistedForm
      this.fixPropertyTypes(persistedForm.form)
      this.applyPersistedForm(persistedForm)
      this.formLoadError = undefined
    } catch (e) {
      this.formLoadError = (e as Error)?.message ?? e
      console.error(e)
    }
  }

  private fixPropertyTypes(componentStore: ComponentStore) {
    if (!componentStore.props) {
      componentStore.props = {}
    }

    // workaround, we need to restore the ComponentStore along with metadata information
    const properties = propertiesToFix[componentStore.type]
    properties?.forEach(property => this.fixDateProperty(componentStore, property))
    componentStore.children?.forEach(child => this.fixPropertyTypes(child))
  }

  private fixDateProperty(componentStore: ComponentStore, property: string) {
    const value = componentStore.props[property]?.value
    if (isString(value) || isNumber(value)) {
      componentStore.props[property].value = new Date(value)
    }
  }

  /**
   * Populates the value of this store with the values of the saved form.
   * @param persistedForm saved form value.
   */
  applyPersistedForm(persistedForm: PersistedForm) {
    const oldForm = this.form

    const version = persistedForm.version
    if (typeof version !== 'undefined' && version !== PersistedFormVersion.version1) {
      console.warn(`An unsupported version of form '${version}' has been detected. An attempt will be made to upload` +
        ` the form as version '${PersistedFormVersion.version1}'.`)
    }

    const componentStore = ComponentStore.createFromObject(persistedForm.form)

    const componentData = this.createComponentData(componentStore, true)
    const localization = new LocalizationStore(assign({}, persistedForm.localization))

    const languages = persistedForm.languages?.map(Language.clone) ?? []
    const defaultLanguage = languages.find(l => l.fullCode === persistedForm.defaultLanguage) ?? globalDefaultLanguage

    const actions = createActionValuesFromObject(persistedForm.actions)

    this.form = new Form(componentData, localization, actions, languages, defaultLanguage)

    this.form.errorProps = persistedForm.errorProps ?? {}
    this.form.tooltipType = persistedForm.tooltipType
    this.form.errorType = persistedForm.errorType

    // here we initialize the fields after the form is created, since the calculated field values are depends on 'this.form'
    this.form.initFields()
    oldForm.dispose()
  }

  /**
   * @returns the current display language.
   */
  get displayedLanguage(): Language {
    if (this.parentStore) return this.parentStore.displayedLanguage
    if (this.formViewerPropsStore.propsLanguage) {
      const propsLanguage = this.form.languages.find(l => l === this.formViewerPropsStore.propsLanguage)
      if (propsLanguage) return propsLanguage
    }
    return this.selectedLanguage ?? this.form.defaultLanguage
  }

  /**
   * @inheritDoc
   */
  localizeComponent(type: LocalizationType, formData: IFormData, componentStore: ComponentStore) {
    if (this.formViewerPropsStore.localizer) return this.formViewerPropsStore.localizer(componentStore, this.displayedLanguage)
    return localizeProperties(this.form, formData, this.displayedLanguage, componentStore, type)
  }

  /**
   * @inheritDoc
   */
  localizeErrorMessages(formData: IFormData, componentStore: ComponentStore, validationResults?: ValidationResult[]) {
    if (!validationResults) return
    return validationResults.map(result => {
      const errorMessage = localizeErrorMessage(this.form, formData, this.displayedLanguage, componentStore, result.settings.key)
      return errorMessage ?? getDefaultErrorMessage(result)
    }).join(' ')
  }
}
